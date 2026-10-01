---
name: autonomous-trading
description: Build and operate a scheduled, autonomous paper-trading system (stock screening → multi-model consensus → Alpaca paper orders → Telegram alerts) with hard safety limits, dry-run mode and an emergency stop. Use when setting up continuous background trading, stock screening/selection, APScheduler trading jobs, or Telegram notifications and controls for autonomous trades.
---

# Autonomous Trading Skill

Paper trading only. Every order path in this skill goes through one gate (`RiskGate`) and one executor (`Executor`). Do not add a code path that submits an order without passing the gate.

## When to use

- Setting up autonomous / continuous background trading
- Stock screening and selection from a fixed universe
- Scheduled trading jobs (pre-market, open, mid-day, close)
- Telegram notifications and remote control (`/stop`, `/resume`, `/status`)

## Before you build: gates the user must accept

1. **Paper only.** The app must refuse to start unless `ALPACA_PAPER=true`. Going live is a separate, explicit decision, not a config flip.
2. **Consensus is not edge.** Agreement between LLM "analysts" is not evidence of alpha. Treat the system as an experiment: log every decision, benchmark against buy-and-hold `QQQ` over the same window, and require **≥ 8 weeks / ≥ 50 closed trades** of paper results before anyone discusses real money. Report net-of-slippage returns, not gross.
3. **Dry run first.** `DRY_RUN_MODE=true` is the default. Switch it off only after a week of clean dry-run logs.

## Architecture

```
APScheduler (US/Eastern, Mon-Fri, skips market holidays via Alpaca clock)
  09:00 pre_market_screening  → build watchlist
  09:35 market_open_trading   → analyze → gate → execute   (5 min after open: skip the opening auction noise)
  12:00 mid_day_review        → positions + P&L message
  16:05 market_close_summary  → daily P&L, trades, leaderboard
        │
        ▼
Screener (universe → filters → score → top N)
        ▼
ModelOrchestrator (N models in parallel → votes → consensus)
        ▼
RiskGate (kill switch, daily loss, trade count, sizing, cash reserve, price/volume)
        ▼
Executor (DRY_RUN log OR Alpaca paper order) → SQLite trade log → Telegram
```

Layout:

```
src/autonomous/
  config.py            # env + SAFETY_LIMITS + AUTONOMOUS_CONFIG
  state.py             # kill switch, daily counters
  stock_screener.py
  risk_gate.py
  executor.py
  trading_loop.py
  telegram_notifier.py
  telegram_commands.py
  trade_log.py         # SQLite
  main.py
```

## 1. Config and state

```python
# src/autonomous/config.py
import os

def env_bool(name: str, default: bool) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {"1", "true", "yes"}

DRY_RUN_MODE = env_bool("DRY_RUN_MODE", True)       # default SAFE
ALPACA_PAPER = env_bool("ALPACA_PAPER", True)

SAFETY_LIMITS = {
    "max_daily_trades": 20,
    "max_position_size_pct": 15.0,   # of portfolio value, per ticker, incl. existing holding
    "max_daily_loss_pct": 5.0,       # halt when equity < last_equity * (1 - 5%)
    "min_cash_reserve_pct": 20.0,    # cash after the trade must stay >= 20% of equity
    "max_stock_price": 1000.0,
    "min_avg_volume": 1_000_000,
}

# Week-1 profile. Loosen deliberately, not by accident.
AUTONOMOUS_CONFIG = {
    "max_stocks_per_day": 2,
    "position_size_pct": 0.02,       # base risk per position (2%)
    "max_position_size_pct": 0.05,   # cap after consensus scaling
    "min_consensus": 0.80,           # fraction of models agreeing
}

SCREEN = {
    "min_avg_volume": 1_000_000,
    "min_abs_change_pct": 2.0,
    "top_n": 10,
}
```

```python
# src/autonomous/state.py
import asyncio
from dataclasses import dataclass, field
from datetime import date

@dataclass
class TradingState:
    enabled: bool = True
    trades_today: int = 0
    day: date = field(default_factory=date.today)
    watchlist: list = field(default_factory=list)
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)

    def roll_day(self, today: date) -> None:
        if today != self.day:
            self.day, self.trades_today, self.watchlist = today, 0, []

STATE = TradingState()   # single shared instance; never use a bare global bool
```

## 2. Stock screening

Blocking SDK calls (`yfinance`, Alpaca REST) must run in a thread (`asyncio.to_thread`) or they stall the scheduler and the Telegram handlers.

Score components are normalized to comparable scales (the naïve "volume / 10M" term makes volume dominate or vanish). Use **relative volume** (latest day vs 20-day average) so a stock is flagged for being unusually active, not just big.

```python
# src/autonomous/stock_screener.py
import asyncio
import yfinance as yf
from .config import SCREEN

# Full list lives in refs/AI-Trader/agent/base_agent/base_agent.py (lines 44-56).
STOCK_UNIVERSE = [
    "NVDA", "MSFT", "AAPL", "GOOG", "GOOGL", "AMZN", "META", "AVGO", "TSLA",
    "NFLX", "PLTR", "COST", "ASML", "AMD", "CSCO", "AZN", "TMUS", "MU",
]

def _score_ticker(ticker: str) -> dict | None:
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1mo")
    if len(hist) < 6:
        return None
    last, prev = hist["Close"].iloc[-1], hist["Close"].iloc[-2]
    change_pct = (last - prev) / prev * 100
    avg_vol = hist["Volume"].tail(20).mean()
    rel_vol = hist["Volume"].iloc[-1] / avg_vol if avg_vol else 0.0

    if avg_vol < SCREEN["min_avg_volume"] or abs(change_pct) < SCREEN["min_abs_change_pct"]:
        return None

    try:
        has_news = bool(stock.news)          # yfinance news shape changes; treat failure as "no news"
    except Exception:
        has_news = False

    # Each term roughly 0-10 so weights mean what they say.
    score = (
        min(abs(change_pct), 10) * 0.4
        + min(rel_vol, 3) / 3 * 10 * 0.3
        + (10 if has_news else 0) * 0.3
    )
    return {"ticker": ticker, "price": float(last), "price_change_pct": float(change_pct),
            "volume": float(avg_vol), "rel_volume": float(rel_vol),
            "has_news": has_news, "opportunity_score": float(score)}

class AutonomousStockScreener:
    async def screen_stocks(self) -> list[dict]:
        results = await asyncio.gather(
            *(asyncio.to_thread(self._safe_score, t) for t in STOCK_UNIVERSE)
        )
        candidates = sorted((r for r in results if r),
                            key=lambda r: r["opportunity_score"], reverse=True)
        return candidates[: SCREEN["top_n"]]

    @staticmethod
    def _safe_score(ticker):
        try:
            return _score_ticker(ticker)
        except Exception as e:
            print(f"screen error {ticker}: {e}")
            return None
```

## 3. Risk gate (the part that must not be skipped)

Every limit in `SAFETY_LIMITS` is enforced here. Returns `(ok, reason)` so the reason can go to Telegram and the log.

```python
# src/autonomous/risk_gate.py
from .config import SAFETY_LIMITS as L, AUTONOMOUS_CONFIG as C
from .state import STATE

def size_shares(portfolio_value: float, price: float, consensus: float) -> int:
    """2% base, +1pp per 10pp of consensus above the threshold, capped."""
    bump = max(0.0, consensus - C["min_consensus"]) * 0.10
    pct = min(C["position_size_pct"] + bump, C["max_position_size_pct"])
    return int(portfolio_value * pct / price)

def check_safety_limits(*, side: str, ticker: str, shares: int, price: float,
                        avg_volume: float, account, positions) -> tuple[bool, str]:
    equity = float(account.equity)
    last_equity = float(account.last_equity)
    cash = float(account.cash)
    held = next((p for p in positions if p.symbol == ticker), None)
    held_value = abs(float(held.market_value)) if held else 0.0
    value = shares * price

    if not STATE.enabled:
        return False, "kill switch active"
    if shares < 1:
        return False, "position size < 1 share"
    if STATE.trades_today >= L["max_daily_trades"]:
        return False, "max daily trades reached"
    if last_equity and (equity - last_equity) / last_equity * 100 <= -L["max_daily_loss_pct"]:
        STATE.enabled = False                       # circuit breaker: stays off until /resume
        return False, "daily loss limit hit - trading halted"
    if price > L["max_stock_price"]:
        return False, f"price {price:.2f} above max {L['max_stock_price']}"
    if avg_volume < L["min_avg_volume"]:
        return False, "avg volume below minimum"

    if side == "buy":
        if (held_value + value) / equity * 100 > L["max_position_size_pct"]:
            return False, "position would exceed max size"
        if (cash - value) / equity * 100 < L["min_cash_reserve_pct"]:
            return False, "would breach cash reserve"
    else:
        if not held or float(held.qty) < shares:
            return False, "no/insufficient position to sell (no shorting)"
    return True, "ok"
```

## 4. Executor

SELL closes the **held** quantity (or a fraction of it), never a freshly risk-sized number. DRY_RUN is wired in here, in one place.

```python
# src/autonomous/executor.py
import asyncio
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce
from .config import DRY_RUN_MODE
from .risk_gate import size_shares, check_safety_limits
from .state import STATE
from . import trade_log

class Executor:
    def __init__(self, alpaca, notifier):
        self.alpaca, self.bot = alpaca, notifier

    async def execute(self, stock: dict, action: str, analysis: dict) -> None:
        ticker, side = stock["ticker"], action.lower()
        async with STATE.lock:                                   # one order decision at a time
            account = await asyncio.to_thread(self.alpaca.get_account)
            positions = await asyncio.to_thread(self.alpaca.get_all_positions)
            price = stock["price"]                               # refresh via latest quote in prod

            if side == "buy":
                shares = size_shares(float(account.portfolio_value), price,
                                     analysis["consensus_level"])
            else:
                held = next((p for p in positions if p.symbol == ticker), None)
                shares = int(float(held.qty)) if held else 0     # close the held position

            ok, reason = check_safety_limits(
                side=side, ticker=ticker, shares=shares, price=price,
                avg_volume=stock["volume"], account=account, positions=positions)
            if not ok:
                await self.bot.send_notification(f"⛔ {ticker} {action} blocked: {reason}")
                trade_log.record(ticker, action, shares, price, analysis, status=f"blocked:{reason}")
                return

            if DRY_RUN_MODE:
                await self.bot.send_notification(
                    f"🧪 [DRY RUN] would {action} {shares} {ticker} @ ${price:.2f}")
                trade_log.record(ticker, action, shares, price, analysis, status="dry_run")
                STATE.trades_today += 1
                return

            try:
                order = await asyncio.to_thread(
                    self.alpaca.submit_order,
                    MarketOrderRequest(symbol=ticker, qty=shares,
                                       side=OrderSide.BUY if side == "buy" else OrderSide.SELL,
                                       time_in_force=TimeInForce.DAY))
            except Exception as e:
                await self.bot.send_notification(f"❌ Trade failed {ticker}: {e}")
                trade_log.record(ticker, action, shares, price, analysis, status=f"error:{e}")
                return

            STATE.trades_today += 1
            trade_log.record(ticker, action, shares, price, analysis,
                             status="submitted", order_id=str(order.id))
            await self.bot.send_notification(
                f"✅ *Order submitted*\n{action} {shares} {ticker} @ ~${price:.2f}\n"
                f"Value: ${shares * price:,.2f}\nConsensus: {analysis['consensus_level']:.0%}\n"
                f"Order: `{order.id}` (submitted, not yet filled)")
```

Note: a market order being *submitted* is not a *fill*. Report fills from order status/`trade_updates`, and compute P&L from fills.

## 5. Trading loop

```python
# src/autonomous/trading_loop.py
import asyncio, pytz
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from .stock_screener import AutonomousStockScreener
from .executor import Executor
from .config import AUTONOMOUS_CONFIG as C
from .state import STATE
from . import trade_log

class AutonomousTradingLoop:
    def __init__(self, telegram_bot, models_orchestrator, alpaca_client):
        self.bot, self.orchestrator, self.alpaca = telegram_bot, models_orchestrator, alpaca_client
        self.screener = AutonomousStockScreener()
        self.executor = Executor(alpaca_client, telegram_bot)
        self.scheduler = AsyncIOScheduler(timezone=pytz.timezone("US/Eastern"))

    def start(self):
        opts = dict(day_of_week="mon-fri", misfire_grace_time=300, coalesce=True, max_instances=1)
        for fn, h, m in [(self.pre_market_screening, 9, 0), (self.market_open_trading, 9, 35),
                         (self.mid_day_review, 12, 0), (self.market_close_summary, 16, 5)]:
            self.scheduler.add_job(fn, "cron", hour=h, minute=m, **opts)
        self.scheduler.start()

    async def _market_is_open_today(self) -> bool:
        # Alpaca calendar covers holidays and early closes; cron's mon-fri does not.
        from datetime import date
        from alpaca.trading.requests import GetCalendarRequest
        today = date.today()
        cal = await asyncio.to_thread(
            self.alpaca.get_calendar, GetCalendarRequest(start=today, end=today))
        return bool(cal) and cal[0].date == today

    async def pre_market_screening(self):
        STATE.roll_day(__import__("datetime").date.today())
        if not await self._market_is_open_today():
            return
        await self.bot.send_notification("🌅 *Pre-market screening started*")
        STATE.watchlist = (await self.screener.screen_stocks())[: C["max_stocks_per_day"]]
        lines = [f"• *{s['ticker']}* ({s['price_change_pct']:+.2f}%) score {s['opportunity_score']:.1f}"
                 for s in STATE.watchlist] or ["No candidates passed the filters."]
        await self.bot.send_notification("📋 *Today's watchlist*\n" + "\n".join(lines))

    async def market_open_trading(self):
        if not STATE.enabled or not STATE.watchlist:
            return
        await self.bot.send_notification(f"🔔 Market open - analyzing {len(STATE.watchlist)} stocks")
        for stock in STATE.watchlist:
            await self.analyze_and_trade(stock)

    async def analyze_and_trade(self, stock: dict):
        ticker = stock["ticker"]
        results = await self.orchestrator.run_all_models(ticker)       # parallel inside
        agg = self.orchestrator.aggregate_decisions(results)
        await self.bot.send_notification(self._format_analysis(ticker, agg))

        if agg["consensus_level"] < C["min_consensus"]:
            await self.bot.send_notification(
                f"⏭️ Skipping *{ticker}* - consensus {agg['consensus_level']:.0%} "
                f"< {C['min_consensus']:.0%}")
            return
        if agg["majority_decision"] in ("BUY", "SELL"):
            await self.executor.execute(stock, agg["majority_decision"], agg)

    async def mid_day_review(self):
        account = await asyncio.to_thread(self.alpaca.get_account)
        positions = await asyncio.to_thread(self.alpaca.get_all_positions)
        pl = float(account.equity) - float(account.last_equity)
        msg = f"🕛 *Mid-day*\nValue: ${float(account.portfolio_value):,.2f}\nP&L today: ${pl:+,.2f}\n"
        msg += "\n".join(f"{'📈' if float(p.unrealized_pl) > 0 else '📉'} {p.symbol}: "
                         f"{p.qty} sh ({float(p.unrealized_pl):+.2f})" for p in positions) \
               or "No open positions"
        await self.bot.send_notification(msg)

    async def market_close_summary(self):
        account = await asyncio.to_thread(self.alpaca.get_account)
        positions = await asyncio.to_thread(self.alpaca.get_all_positions)
        last = float(account.last_equity)
        pl = float(account.equity) - last
        trades = trade_log.today()
        board = await self.orchestrator.get_leaderboard()
        msg = (f"🏁 *Market close*\nValue: ${float(account.portfolio_value):,.2f}\n"
               f"Daily P&L: ${pl:+,.2f} ({pl / last * 100:+.2f}%)\n\n*Trades: {len(trades)}*\n"
               + "\n".join(f"• {t['action']} {t['ticker']}: {t['shares']} @ ${t['price']:.2f} "
                           f"[{t['status']}]" for t in trades)
               + f"\n\n*Open positions: {len(positions)}*\n"
               + "\n".join(f"{p.symbol}: ${float(p.unrealized_pl):+.2f}" for p in positions)
               + "\n\n*Model leaderboard*\n"
               + "\n".join(f"{i}. {m['model']}: {m['total_return_pct']:+.2f}%"
                           for i, m in enumerate(board[:3], 1)))
        await self.bot.send_notification(msg)

    @staticmethod
    def _format_analysis(ticker: str, agg: dict) -> str:
        emoji = {"BUY": "📈", "SELL": "📉", "HOLD": "⏸️"}
        votes = "\n".join(f"{emoji[r['decision']]} {r['model']}: {r['decision']}"
                          for r in agg["individual_decisions"])
        return (f"📊 *{ticker}*: {emoji[agg['majority_decision']]} {agg['majority_decision']}\n"
                f"Agreement {agg['consensus_level']:.0%} | Confidence {agg['average_confidence']:.0%}\n\n{votes}")
```

Expected orchestrator contract (adapt the real `ModelOrchestrator` to this, don't change the loop):

- `run_all_models(ticker) -> list[dict]` — runs all models in parallel (`asyncio.gather(..., return_exceptions=True)`); a failed model is dropped, not counted as HOLD.
- `aggregate_decisions(results) -> {majority_decision, consensus_level, average_confidence, individual_decisions}` — `consensus_level` = votes for majority / **models that responded**.
- `get_leaderboard() -> list[{model, total_return_pct}]`.

## 6. Telegram: notifier and commands

Use `ParseMode.HTML` (or escape MarkdownV2) if tickers/errors may contain `_`, `*` or `.`: legacy Markdown raises on unbalanced characters and the message is silently lost. If you keep `MARKDOWN`, fall back to plain text on `BadRequest`.

```python
# src/autonomous/telegram_notifier.py
import os
from telegram import Bot
from telegram.constants import ParseMode
from telegram.error import BadRequest

class TelegramNotifier:
    def __init__(self):
        self.bot = Bot(token=os.environ["TELEGRAM_BOT_TOKEN"])
        self.chat_id = int(os.environ["TELEGRAM_CHAT_ID"])

    async def send_notification(self, message: str):
        try:
            await self.bot.send_message(self.chat_id, message, parse_mode=ParseMode.MARKDOWN)
        except BadRequest:
            await self.bot.send_message(self.chat_id, message)       # plain-text fallback
        except Exception as e:
            print(f"telegram send failed: {e}")                       # never crash trading on a notify error
```

Commands. **Authorize by chat id** — anyone who finds the bot username can otherwise `/resume` or read your portfolio.

```python
# src/autonomous/telegram_commands.py
import os
from functools import wraps
from telegram.ext import Application, CommandHandler
from .config import SAFETY_LIMITS, DRY_RUN_MODE
from .state import STATE
from . import trade_log

OWNER = int(os.environ["TELEGRAM_CHAT_ID"])

def owner_only(fn):
    @wraps(fn)
    async def wrapper(update, context):
        if update.effective_chat.id != OWNER:
            return
        return await fn(update, context)
    return wrapper

def build_application(alpaca, loop) -> Application:
    app = Application.builder().token(os.environ["TELEGRAM_BOT_TOKEN"]).build()
    import asyncio

    @owner_only
    async def stop(update, ctx):
        STATE.enabled = False
        await update.message.reply_text(
            "🛑 EMERGENCY STOP. No new orders. Open positions stay open (and unmanaged). /resume to restart.")

    @owner_only
    async def resume(update, ctx):
        STATE.enabled = True
        await update.message.reply_text(f"▶️ Trading resumed. Dry run: {DRY_RUN_MODE}")

    @owner_only
    async def status(update, ctx):
        acct = await asyncio.to_thread(alpaca.get_account)
        pos = await asyncio.to_thread(alpaca.get_all_positions)
        await update.message.reply_text(
            f"enabled={STATE.enabled} dry_run={DRY_RUN_MODE} trades_today={STATE.trades_today}\n"
            f"equity=${float(acct.equity):,.2f} positions={len(pos)}")

    @owner_only
    async def today(update, ctx):
        rows = trade_log.today()
        await update.message.reply_text("\n".join(
            f"{r['action']} {r['ticker']} {r['shares']}@{r['price']:.2f} [{r['status']}]"
            for r in rows) or "No activity today")

    @owner_only
    async def limits(update, ctx):
        await update.message.reply_text("\n".join(f"{k}: {v}" for k, v in SAFETY_LIMITS.items()))

    @owner_only
    async def watchlist(update, ctx):
        await update.message.reply_text(
            "\n".join(f"{s['ticker']} ({s['price_change_pct']:+.2f}%)" for s in STATE.watchlist)
            or "Watchlist empty")

    @owner_only
    async def models(update, ctx):
        board = await loop.orchestrator.get_leaderboard()
        await update.message.reply_text("\n".join(
            f"{i}. {m['model']}: {m['total_return_pct']:+.2f}%" for i, m in enumerate(board, 1)))

    for name, fn in [("stop", stop), ("resume", resume), ("status", status), ("today", today),
                     ("limits", limits), ("watchlist", watchlist), ("models", models)]:
        app.add_handler(CommandHandler(name, fn))
    return app
```

Commands: `/status` `/today` `/models` `/stop` `/resume` `/limits` `/watchlist`.

## 7. Trade log (SQLite)

Persist every decision, including blocked and dry-run ones. This is the dataset for the evaluation gate above.

```python
# src/autonomous/trade_log.py
import json, sqlite3, os
from datetime import datetime, timezone

DB = os.getenv("TRADE_DB", "trades.db")

def _conn():
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    c.execute("""CREATE TABLE IF NOT EXISTS trades(
        id INTEGER PRIMARY KEY, ts TEXT, ticker TEXT, action TEXT, shares INT,
        price REAL, status TEXT, order_id TEXT, analysis TEXT)""")
    return c

def record(ticker, action, shares, price, analysis, status, order_id=None):
    with _conn() as c:
        c.execute("INSERT INTO trades(ts,ticker,action,shares,price,status,order_id,analysis) "
                  "VALUES(?,?,?,?,?,?,?,?)",
                  (datetime.now(timezone.utc).isoformat(), ticker, action, shares, price,
                   status, order_id, json.dumps(analysis, default=str)))

def today():
    prefix = datetime.now(timezone.utc).date().isoformat()
    with _conn() as c:
        return [dict(r) for r in c.execute("SELECT * FROM trades WHERE ts LIKE ?", (prefix + "%",))]
```

On Railway/Docker the container filesystem is ephemeral — mount a volume for `TRADE_DB` or use Postgres.

## 8. Entry point

```python
# src/autonomous/main.py
import asyncio, os
from alpaca.trading.client import TradingClient
from src.orchestrator.model_manager import ModelOrchestrator
from .config import ALPACA_PAPER, DRY_RUN_MODE
from .telegram_notifier import TelegramNotifier
from .telegram_commands import build_application
from .trading_loop import AutonomousTradingLoop

async def main():
    if not ALPACA_PAPER:
        raise SystemExit("Refusing to start: ALPACA_PAPER must be true.")

    telegram = TelegramNotifier()
    alpaca = TradingClient(os.environ["ALPACA_API_KEY"], os.environ["ALPACA_SECRET_KEY"], paper=True)
    loop = AutonomousTradingLoop(telegram, ModelOrchestrator(), alpaca)

    app = build_application(alpaca, loop)
    await app.initialize(); await app.start(); await app.updater.start_polling()
    loop.start()

    await telegram.send_notification(
        f"🤖 *Autonomous trading online* (paper, dry_run={DRY_RUN_MODE}). /stop halts all new orders.")
    try:
        await asyncio.Event().wait()
    finally:
        await telegram.send_notification("🛑 Trading system stopped.")
        await app.updater.stop(); await app.stop(); await app.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
```

## Deployment (24/7)

```
# Procfile (Railway)
web: uvicorn src.main:app --host 0.0.0.0 --port $PORT
worker: python -m src.autonomous.main
```

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
COPY .claude/ ./.claude/
CMD ["python", "-m", "src.autonomous.main"]
```

Run **exactly one** worker instance. Two instances means duplicate orders.

Environment variables:

```
AUTONOMOUS_MODE=true
DRY_RUN_MODE=true            # flip to false only after a clean dry-run week
ALPACA_PAPER=true
ALPACA_API_KEY=...           # paper keys
ALPACA_SECRET_KEY=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...         # numeric; also used as the command allow-list
TRADE_DB=/data/trades.db
```

Never commit these. Keep them in the platform's secret store.

## Rollout

1. Dry run, 2 stocks/day, 2% positions, consensus ≥ 80% (the defaults above).
2. Review the trade log daily for week 1: blocked reasons, consensus distribution, model failures.
3. `DRY_RUN_MODE=false` on the paper account. Keep week-1 limits for another week.
4. Loosen one limit at a time (`max_stocks_per_day` → `min_consensus` → sizing), never several at once.
5. Evaluate against the gate: ≥ 8 weeks, ≥ 50 closed trades, net of slippage, vs. buy-and-hold `QQQ`.

## Test checklist

- [ ] App exits when `ALPACA_PAPER=false`
- [ ] `/stop` blocks the next order; `/resume` re-enables; non-owner chat is ignored
- [ ] Each `SAFETY_LIMITS` key has a unit test that trips it (`check_safety_limits` is a pure function)
- [ ] Daily loss ≥ 5% flips `STATE.enabled` off and survives until `/resume`
- [ ] SELL with no position is blocked, never shorts
- [ ] Market holiday → no screening, no orders
- [ ] Orchestrator with 1 of 5 models failing still produces a consensus on 4
- [ ] Telegram outage does not crash the loop
- [ ] Restart mid-day does not double-submit (check the trade log / open orders before ordering)

## Code references

- AI-Trader BaseAgent: `refs/AI-Trader/agent/base_agent/base_agent.py` (universe at lines 44-56)
- TradingAgents graph: `refs/TradingAgents/tradingagents/graph/trading_graph.py`
- Scheduling: APScheduler `AsyncIOScheduler`

## Best practices

1. Dry run first; paper only; one worker.
2. Every order passes `check_safety_limits`. No exceptions, no bypass flag.
3. Small positions (2–5%), high consensus (≥ 80% at first; ≥ 70% only after evidence).
4. Keep ≥ 20% cash; cap daily trades; keep `/stop` reachable.
5. Log every decision, including the ones not taken.
6. Judge the system by net paper returns vs. a passive benchmark, not by how busy the Telegram feed is.
