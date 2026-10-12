// deck-slides-core2.js: core pages P2..P10. Numbers from the deck ledger, file 02 v4.1, file 03 v2.1 and model-v4 output.
const { P, PILLAR, FONT, W, M, text, card, gradient, badge, zone, chrome, shadow, table, banner, chevron, chart, sub } = require("./deck-lib");

const newSlide = (pres) => { const s = pres.addSlide(); s.background = { color: P.paper }; return s; };
const line = (s, pres, x, y, w, h, color = P.mid, width = 1, o = {}) =>
  s.addShape(pres.shapes.LINE, { x, y, w, h, flipH: !!o.flipH, line: { color, width, dashType: o.dash ? "dash" : "solid", endArrowType: o.arrow ? "triangle" : undefined }, objectName: "line" });

// ---------------- P2 Background ----------------
async function p2(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Background",
    title: "Background: Telkomsel leads home broadband, yet household revenue is falling while **Rp100k fiber** takes most of the market's growth",
    section: "Background", page: 2,
    source: "[1] Telkom 1H26 Info Memo · [2] Telkomsel AR 2025 · [3] Opensignal, Nov 2025 · [4] Starlite and Internet Rakyat pricing (Bisnis, Kontan) · [5] Media Partners Asia; Komdigi · [6] Surge (WIFI) disclosures · [7] Telkomsel app and website, 10 Oct 2026 · [8] Case book · Appendix 2, 6",
  });
  // Zone 1: market
  zone(s, pres, 1, 0.3, 0.95, 3.0, "**Market:** where household connectivity is heading", { fontSize: 8 });
  sub(s, "New fixed homes in 12 months (millions)", 0.3, 1.38, 3.0, { fontSize: 7, color: P.slate });
  const bars = [["Whole market, a year (forecast) [5]", 1.28, P.mid], ["Surge alone, 2Q25 → 2Q26 [6]", 1.98, P.accent]];
  bars.forEach(([l, v, c], i) => {
    const y = 1.62 + i * 0.36;
    text(s, l, { x: 0.3, y, w: 3.0, h: 0.14, fontSize: 6.5, color: P.slate });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: y + 0.15, w: v * 1.15, h: 0.16, fill: { color: c }, line: { type: "none" }, objectName: "bar " + l });
    text(s, "**+" + v.toFixed(2) + "M**", { x: 0.3 + v * 1.15 + 0.05, y: y + 0.13, w: 0.6, h: 0.2, fontSize: 7.5, color: c === P.accent ? P.accent : P.ink, valign: "middle" });
  });
  card(s, pres, 0.3, 2.45, 3.0, 0.7, { fill: P.light, shadow: false, name: "unconnected" });
  text(s, "**≈58–60M**", { x: 0.4, y: 2.5, w: 1.3, h: 0.6, fontSize: 16, color: P.accent, valign: "middle" });
  text(s, "homes still have **no fixed broadband**: penetration is only **18–21%** of 73M households [5]", { x: 1.65, y: 2.5, w: 1.6, h: 0.6, fontSize: 7, valign: "middle" });
  card(s, pres, 0.3, 3.25, 3.0, 1.15, { line: P.accent, dash: true, shadow: false, name: "anchor" });
  text(s, "**The Rp100k anchor** [4]\n**Starlite** fiber (since 2025) and licensed **1.4 GHz** fixed wireless (since Feb 2026) sell **100–200 Mbps for Rp100k**, VAT included, with a free modem. IndiHome's entry plan costs **2.4×** that.",
    { x: 0.4, y: 3.3, w: 2.8, h: 1.05, fontSize: 7, valign: "middle", paraSpaceAfter: 2 });

  // Zone 2: portfolio ladder
  zone(s, pres, 2, 3.45, 0.95, 3.1, "**Telkomsel's household portfolio:** five propositions", { fontSize: 8 });
  sub(s, "Nine offers between ≈Rp130k and ≈Rp390k a month [7]", 3.45, 1.38, 3.1, { fontSize: 7, color: P.slate });
  const ladder = [
    ["Telkomsel One Easy (Orbit)", 133, P.ink], ["Orbit 125 GB pack", 176, P.ink], ["EZnet 20 Mbps", 188.7, P.slate], ["EZnet Wireless 50 Mbps", 188.7, P.slate],
    ["IndiHome 75 Mbps", 240, P.accent], ["Telkomsel One Dynamic 50", 300, P.dark], ["IndiHome 100 + Netflix", 300, P.accent], ["IndiHome Movie Complete", 380, P.accent], ["Telkomsel One 100 Mbps", 389, P.dark],
  ];
  ladder.forEach(([l, v, c], i) => {
    const y = 1.62 + i * 0.235;
    text(s, l, { x: 3.45, y, w: 1.32, h: 0.2, fontSize: 6.3, color: P.ink, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: 4.8, y: y + 0.035, w: v / 389 * 1.3, h: 0.13, fill: { color: c }, line: { type: "none" }, objectName: "ladder " + l });
    text(s, (v % 1 ? "≈" : "") + "Rp" + (v % 1 ? v.toFixed(1) : v) + "k", { x: 4.8 + v / 389 * 1.3 + 0.04, y, w: 0.6, h: 0.2, fontSize: 6.3, color: P.slate, valign: "middle" });
  });
  text(s, "VAT included, Jakarta Selatan, Oct 2026. Priced per GB, per Mbps or per bundle, on prepaid, monthly or 12-month terms.", { x: 3.45, y: 3.76, w: 3.1, h: 0.26, fontSize: 6, italic: true, color: P.slate });
  [["**153.5M**", "mobile customers [1]"], ["**≈67%**", "of fixed broadband connections [3]"]].forEach(([v, l], i) => {
    const x = 3.45 + i * 1.58;
    card(s, pres, x, 4.05, 1.5, 0.38, { fill: P.light, shadow: false, name: "stat " + i });
    text(s, v, { x: x + 0.06, y: 4.05, w: 0.62, h: 0.38, fontSize: 10, color: P.dark, valign: "middle" });
    text(s, l, { x: x + 0.66, y: 4.05, w: 0.82, h: 0.38, fontSize: 6.3, valign: "middle" });
  });

  // Zone 3: performance
  zone(s, pres, 3, 6.7, 0.95, 3.0, "**Performance:** customers and revenue", { fontSize: 8 });
  sub(s, "Household revenue a quarter (Rp bn) [1]", 6.7, 1.38, 3.0, { fontSize: 7, color: P.slate });
  chart(s, pres, "line", 6.62, 1.55, 3.12, 1.42, [{ name: "Revenue", labels: ["1Q25", "2Q25", "3Q25", "4Q25", "1Q26", "2Q26"], values: [6683, 6599, 6490, 6396, 6370, 6410] }],
    { colors: [P.accent], min: 6200, max: 6800, major: 200, labelPos: "t" });
  card(s, pres, 8.45, 1.7, 1.25, 0.32, { fill: P.paper, line: P.accent, shadow: false, name: "uptick" });
  text(s, "**+0.6% QoQ** in 2Q26: a fragile turn", { x: 8.48, y: 1.7, w: 1.2, h: 0.32, fontSize: 6.2, align: "center", valign: "middle" });
  const perf = [
    "Base **9.513M** homes in 2Q26, **−5.4%** YoY [1]",
    "2025: **+0.7M** customers reported, yet **−Rp0.44T** of revenue [2]",
    "**0.8–1.2M** 'inactive, non-revenue-contributing' accounts removed or identified [1]",
  ];
  perf.forEach((t, i) => {
    const y = 3.05 + i * 0.46;
    s.addShape(pres.shapes.OVAL, { x: 6.72, y: y + 0.12, w: 0.14, h: 0.14, fill: { color: i === 2 ? P.accent : P.dark }, line: { type: "none" }, objectName: "dot" });
    text(s, t, { x: 6.95, y, w: 2.75, h: 0.4, fontSize: 7, valign: "middle" });
  });

  // Key Question band
  await gradient(s, 0.3, 4.52, 9.4, 0.66, P.ink, P.dark, { radius: 0.06, name: "KQ band" });
  text(s, "**The case's Key Question** [8]", { x: 0.42, y: 4.52, w: 1.3, h: 0.66, fontSize: 7.5, color: P.paper, valign: "middle", markerColor: P.line });
  text(s, "\"As household connectivity needs become increasingly diverse, how should Telkomsel **differentiate and position IndiHome and Orbit across customer segments** to unlock stronger **long-term household value** without relying primarily on price competition?\"",
    { x: 1.75, y: 4.52, w: 7.85, h: 0.66, fontSize: 7.6, italic: true, color: P.paper, valign: "middle" });
}

// ---------------- P3 Problem Identification ----------------
async function p3(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Problem Identification",
    title: "Problem identification: IndiHome and Orbit are placed by network and price tier, and household value leaks at **entry**, in **spend** and in **delivery**",
    section: "Analysis", page: 3,
    source: "[1] Telkom 1H26 Info Memo · [2] Appendix 3, 4 (cleansing, scenarios) · [3] Appendix 14 (issue tree) · [4] Appendix 16 (scoring and sensitivity)",
  });
  // Left: the problem, stated twice
  sub(s, "The problem, stated twice", 0.3, 0.92, 2.55);
  card(s, pres, 0.3, 1.16, 2.55, 1.12, { fill: P.light, shadow: false, name: "symptoms" });
  text(s, "**Symptoms** [1]\nIn 2025 Telkomsel reported **0.7M more** household customers but lost **Rp0.44T** of household revenue; in 2026 it began removing **0.8–1.2M** inactive accounts, and revenue was still **3.8% lower** in 1H26.",
    { x: 0.4, y: 1.2, w: 2.35, h: 1.04, fontSize: 6.9, valign: "middle", paraSpaceAfter: 2 });
  await gradient(s, 0.3, 2.36, 2.55, 0.9, P.dark, P.ink, { radius: 0.05, name: "kq" });
  text(s, "**Key Question**\nWhy is Telkomsel losing value per household in a growing market, and how much of it comes from the way **IndiHome and Orbit are positioned**?",
    { x: 0.4, y: 2.38, w: 2.35, h: 0.86, fontSize: 6.9, color: P.paper, valign: "middle", paraSpaceAfter: 2 });
  card(s, pres, 0.3, 3.34, 2.55, 1.82, { line: P.accent, lineWidth: 1, name: "causes" });
  text(s, "**Causes, after the analysis** [3]\nProducts are assigned by **network and price tier**, the extras that should raise spend are **lent**, and the premium is **unproven where rivals compete**. Underneath, LTV is Telkom's stated aim, yet **no one is measured on what a household is worth** across IndiHome, Orbit and mobile.",
    { x: 0.4, y: 3.38, w: 2.35, h: 1.74, fontSize: 6.9, valign: "middle", paraSpaceAfter: 2 });

  // Centre: issue tree with scores
  sub(s, "Issue tree: 3 branches, 8 drivers, each scored [3][4]", 3.0, 0.92, 4.5);
  await gradient(s, 3.0, 1.2, 0.72, 3.48, P.ink, P.dark, { radius: 0.05, dir: "v", name: "root" });
  text(s, "**Household value leaks**", { x: 3.02, y: 1.2, w: 0.68, h: 3.48, fontSize: 7, color: P.paper, align: "center", valign: "middle" });
  const branches = [
    { name: "Role and entry", avg: "avg **3.82**", fill: P.accent, drivers: [["Roles set by network and tier, no routing", "4.05", "top"], ["Acquisition outside the mobile relationship", "3.65", "3"], ["Entry terms", "size unknown, being fixed by Telkom", "u"]] },
    { name: "Spend", avg: "avg **3.47**", fill: P.dark, drivers: [["No designed path between products", "3.80", "2"], ["Extras given away or lent", "3.60", "3"], ["Bundle gives little reason to add lines", "3.00", "4"]] },
    { name: "Delivery and cost", avg: "avg **3.30**", fill: P.ink, drivers: [["Experience below rivals where contested", "3.80", "2"], ["Cost not matched to usage", "size unknown", "u"]] },
  ];
  const tierFill = { top: P.accent, 2: P.dark, 3: P.slate, 4: P.mid };
  let y = 1.2;
  const rowH = 0.37, rowGap = 0.05, brGap = 0.1;
  branches.forEach((b) => {
    const bh = b.drivers.length * rowH + (b.drivers.length - 1) * rowGap;
    line(s, pres, 3.72, y + bh / 2, 0.12, 0, P.mid, 1);
    card(s, pres, 3.84, y, 0.98, bh, { fill: b.fill, radius: 0.04, name: "branch " + b.name });
    text(s, "**" + b.name + "**\n" + b.avg, { x: 3.88, y, w: 0.9, h: bh, fontSize: 6.9, color: P.paper, align: "center", valign: "middle", paraSpaceAfter: 1 });
    b.drivers.forEach(([d, sc, tier], j) => {
      const dy = y + j * (rowH + rowGap);
      line(s, pres, 4.82, dy + rowH / 2, 0.1, 0, P.mid, 1);
      card(s, pres, 4.92, dy, 1.78, rowH, { fill: P.paper, line: P.line, radius: 0.04, shadow: false, name: "driver " + d.slice(0, 15) });
      text(s, d, { x: 4.98, y: dy, w: 1.68, h: rowH, fontSize: 6.4, valign: "middle", bold: tier === "top" });
      if (tier === "u") {
        card(s, pres, 6.75, dy, 0.78, rowH, { fill: P.paper, line: P.mid, dash: true, radius: 0.04, shadow: false, name: "chip unscored" });
        text(s, sc, { x: 6.77, y: dy, w: 0.74, h: rowH, fontSize: 5.6, color: P.slate, align: "center", valign: "middle" });
      } else {
        card(s, pres, 6.75, dy, 0.78, rowH, { fill: tierFill[tier], radius: 0.04, shadow: false, name: "chip " + sc });
        text(s, "**" + sc + "**" + (tier === "top" ? " top" : ""), { x: 6.77, y: dy, w: 0.74, h: rowH, fontSize: 8, color: P.paper, align: "center", valign: "middle" });
      }
    });
    y += bh + brGap;
  });
  text(s, "**Role and entry ranks first** in every test with the unscored drivers at their midpoints (**17 of 20** tests at their extremes). Score = significance 40% · urgency 25% · controllability 20% · evidence 15% [4]",
    { x: 3.0, y: 4.74, w: 4.53, h: 0.42, fontSize: 6.3, color: P.slate, valign: "middle" });

  // Right: robustness box
  sub(s, "What holds in every reading", 7.68, 0.92, 2.02);
  card(s, pres, 7.68, 1.16, 2.02, 4.0, { fill: P.light, shadow: false, name: "robustness" });
  text(s, "**−0.7% to −10.8%**", { x: 7.78, y: 1.25, w: 1.85, h: 0.36, fontSize: 12.5, color: P.accent, valign: "middle" });
  text(s, "change in revenue per **paying** household in every timing scenario for the inactive accounts est. [2]", { x: 7.78, y: 1.62, w: 1.85, h: 0.62, fontSize: 6.8 });
  line(s, pres, 7.8, 2.32, 1.8, 0, P.line, 0.75);
  text(s, "**−899k vs +85k**", { x: 7.78, y: 2.4, w: 1.85, h: 0.36, fontSize: 12.5, color: P.dark, valign: "middle" });
  text(s, "2Q26 net change: homes **without** a Telkomsel line vs **converged** homes (net figures; the removed accounts are not published) [1]", { x: 7.78, y: 2.77, w: 1.85, h: 0.75, fontSize: 6.8 });
  line(s, pres, 7.8, 3.6, 1.8, 0, P.line, 0.75);
  text(s, "**So the solution order follows the ranking:** fix the roles of IndiHome and Orbit first, then keep homes and build paths up, all measured on household value.",
    { x: 7.78, y: 3.68, w: 1.85, h: 1.4, fontSize: 6.8, valign: "top" });
}

// ---------------- P4 Analysis 1: market and competition ----------------
async function p4(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Analysis: Market and Competition",
    title: "Market and competition: Rp100k fiber took the growth, with **Surge adding 1.98M homes** in a year while IndiHome's reported base fell by **0.55M**",
    section: "Analysis", page: 4,
    source: "[1] Surge (WIFI) disclosures; Samuel and BCA Sekuritas · [2] Telkom 1H26 Info Memo · [3] Opensignal, Jan–Mar 2026 · Appendix 5, 7, 8",
  });
  zone(s, pres, 1, 0.3, 0.95, 4.3, "**Same-window growth**, 2Q25 → 2Q26 (homes)", { fontSize: 8 });
  // manual diverging bars, scale -0.6..2.0 M over 3.6 in
  const x0 = 2.55, k = 1.0; // inches per million
  line(s, pres, x0, 1.45, 0, 1.75, P.ink, 1);
  text(s, "0", { x: x0 - 0.1, y: 1.3, w: 0.2, h: 0.14, fontSize: 6, color: P.slate, align: "center" });
  const rows = [
    ["IndiHome, reported [2]", -0.55, P.mid, "**−0.55M**"],
    ["IndiHome, removed accounts added back", null, P.dark, "**+0.25M to +0.65M**"],
    ["Surge (WIFI) [1]", 1.98, P.accent, "**+1.98M**"],
  ];
  rows.forEach(([l, v, c, lab], i) => {
    const y = 1.55 + i * 0.55;
    text(s, l, { x: 0.3, y, w: 1.62, h: 0.4, fontSize: 6.6, valign: "middle", align: "right" });
    if (v === null) {
      s.addShape(pres.shapes.RECTANGLE, { x: x0, y: y + 0.1, w: 0.25 * k, h: 0.2, fill: { color: P.dark }, line: { type: "none" }, objectName: "range solid" });
      s.addShape(pres.shapes.RECTANGLE, { x: x0 + 0.25 * k, y: y + 0.1, w: 0.4 * k, h: 0.2, fill: { color: "E9D0D6" }, line: { color: P.dark, width: 0.75, dashType: "dash" }, objectName: "range band" });
      text(s, lab, { x: x0 + 0.65 * k + 0.05, y, w: 1.3, h: 0.4, fontSize: 7.5, color: P.dark, valign: "middle" });
    } else if (v < 0) {
      s.addShape(pres.shapes.RECTANGLE, { x: x0 + v * k, y: y + 0.1, w: -v * k, h: 0.2, fill: { color: c }, line: { type: "none" }, objectName: "bar neg" });
      text(s, lab, { x: x0 + 0.05, y, w: 0.8, h: 0.4, fontSize: 7.5, color: P.slate, valign: "middle" });
    } else {
      s.addShape(pres.shapes.RECTANGLE, { x: x0, y: y + 0.1, w: v * k, h: 0.2, fill: { color: c }, line: { type: "none" }, objectName: "bar pos" });
      text(s, lab, { x: x0 + v * k - 0.75, y, w: 0.72, h: 0.4, fontSize: 7.5, color: P.paper, align: "right", valign: "middle" });
    }
  });
  text(s, "78% of Surge's base is fiber; its growth was ≈3–8× IndiHome's underlying growth (Appendix 7)", { x: 0.3, y: 3.22, w: 4.3, h: 0.24, fontSize: 6.2, italic: true, color: P.slate, align: "right" });
  card(s, pres, 0.3, 3.55, 4.3, 1.6, { fill: P.light, shadow: false, name: "so what market" });
  text(s, "**So what: a two-front squeeze** [1][3]\n**Price front (≈Rp100k):** Starlite fiber, Internet Rakyat, MyRepublic Air, HiFi Air. Surge **cut its 2026 wireless target from 3M to 1M** and moved up-market (**500 Mbps for Rp168k, 2 Gbps for Rp250k**), so the low-price threat is fiber more than wireless.\n**Quality front (Rp345–482k):** XL SATU, Indosat HiFi, Biznet, Oxygen.id win measured experience in their strongholds. IndiHome sits in between, with **reach** as its distinct ground.",
    { x: 0.42, y: 3.6, w: 4.08, h: 1.5, fontSize: 6.7, valign: "middle", paraSpaceAfter: 2 });

  // Zone 2: measured experience
  zone(s, pres, 2, 4.8, 0.95, 4.9, "**Measured experience in cities** (Opensignal, urban view) [3]", { fontSize: 8 });
  const hdrY = 1.4;
  text(s, "**Metric**", { x: 4.85, y: hdrY, w: 1.3, h: 0.18, fontSize: 6.5, color: P.slate });
  text(s, "**IndiHome**", { x: 6.1, y: hdrY, w: 0.8, h: 0.18, fontSize: 6.5, color: P.slate });
  text(s, "**Rank of 8 ISPs** (1 = best)", { x: 6.95, y: hdrY, w: 1.75, h: 0.18, fontSize: 6.5, color: P.slate });
  text(s, "**vs leader**", { x: 8.85, y: hdrY, w: 0.8, h: 0.18, fontSize: 6.5, color: P.slate, align: "right" });
  const exp = [["Download speed", "26.4 Mbps", 7, "−35.3%"], ["Upload speed", "13.3 Mbps", 8, "−56.4%"], ["Consistent quality", "58.8%", 4, "−15.9%"]];
  exp.forEach(([m, v, r, g], i) => {
    const y = 1.62 + i * 0.36;
    card(s, pres, 4.8, y, 4.9, 0.3, { fill: i % 2 ? P.paper : P.light, shadow: false, radius: 0.03, name: "exp row" });
    text(s, m, { x: 4.88, y, w: 1.25, h: 0.3, fontSize: 7, valign: "middle" });
    text(s, "**" + v + "**", { x: 6.1, y, w: 0.85, h: 0.3, fontSize: 7, valign: "middle" });
    for (let d = 1; d <= 8; d++) {
      const on = d === r;
      s.addShape(pres.shapes.OVAL, { x: 6.97 + (d - 1) * 0.22, y: y + 0.07, w: 0.16, h: 0.16, fill: { color: on ? P.accent : P.paper }, line: { color: on ? P.accent : P.line, width: 0.75 }, objectName: "rank dot" });
      if (on) text(s, String(r), { x: 6.97 + (d - 1) * 0.22, y: y + 0.07, w: 0.16, h: 0.16, fontSize: 6, bold: true, color: P.paper, align: "center", valign: "middle" });
    }
    text(s, "**" + g + "**", { x: 8.85, y, w: 0.8, h: 0.3, fontSize: 7.5, color: P.accent, align: "right", valign: "middle" });
  });
  const slots = [["**1 of 50**", "urban award slots outside Maluku–Papua", P.accent], ["**18 of 45**", "rural award slots outside Maluku–Papua", P.dark], ["**30 of 30**", "award slots in Maluku–Papua: the only scale ISP", P.ink]];
  slots.forEach(([v, l, c], i) => {
    const x = 4.8 + i * 1.66;
    card(s, pres, x, 2.78, 1.58, 0.55, { fill: c, shadow: false, radius: 0.05, name: "slot " + i });
    text(s, v, { x: x + 0.06, y: 2.78, w: 0.62, h: 0.55, fontSize: 9.5, color: P.paper, valign: "middle" });
    text(s, l, { x: x + 0.66, y: 2.78, w: 0.88, h: 0.55, fontSize: 6, color: P.paper, valign: "middle" });
  });

  // Zone 3: rival explanations
  zone(s, pres, 3, 4.8, 3.48, 4.9, "**Could something else explain it?** Four of eleven rival explanations", { fontSize: 8 });
  const rivals = [
    ["Macro squeeze", "Does not explain 2026: mobile revenue **+5.6%** while household revenue fell [2]", P.ink],
    ["Bundle revenue allocation", "Cannot be tested with public data", P.mid],
    ["Convergence follows engagement", "Cannot be ruled out, so the acquisition-channel driver **stays a hypothesis**", P.mid],
    ["Shift to single-play", "Partly true, a mechanism **inside spend**", P.dark],
  ];
  rivals.forEach(([r, v, c], i) => {
    const y = 3.92 + i * 0.29;
    card(s, pres, 4.8, y, 1.55, 0.25, { fill: c, radius: 0.12, shadow: false, name: "pill " + r });
    text(s, "**" + r + "**", { x: 4.84, y, w: 1.47, h: 0.25, fontSize: 6.3, color: P.paper, align: "center", valign: "middle" });
    text(s, v, { x: 6.42, y, w: 3.28, h: 0.25, fontSize: 6.4, valign: "middle" });
  });
  text(s, "All 11 explanations are tested in Appendix 5", { x: 4.8, y: 5.08, w: 4.9, h: 0.14, fontSize: 6, italic: true, color: P.slate, align: "right" });
}

// ---------------- P5 Analysis 2: households and portfolio ----------------
async function p5(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Analysis: Households and Portfolio",
    title: "Households and portfolio: Orbit is Telkomsel's cheapest home option only up to about **125 GB** a month, yet no product page routes a family to it",
    section: "Analysis", page: 5,
    source: "[1] Telkomsel website and app (10 Oct 2026) · [2] Rival price pages: Starlite, Internet Rakyat (Bisnis, Kontan) · [3] Telkom 1H26 Info Memo (data yield) · [4] Netflix Help Center · Appendix 9, 11, 13",
  });
  zone(s, pres, 1, 0.3, 0.95, 5.6, "**What each option costs a household a month**, by monthly use (Rp k) [1][2]", { fontSize: 8 });
  chart(s, pres, "line", 0.25, 1.36, 5.7, 2.25, [
    { name: "Orbit (cheapest pack mix)", labels: ["25 GB", "50 GB", "100 GB", "150 GB", "250 GB", "450 GB"], values: [66, 100, 176, 232, 352, 642] },
    { name: "IndiHome entry", labels: ["25 GB", "50 GB", "100 GB", "150 GB", "250 GB", "450 GB"], values: [240, 240, 240, 240, 240, 240] },
    { name: "EZnet fiber / EZnet Wireless", labels: ["25 GB", "50 GB", "100 GB", "150 GB", "250 GB", "450 GB"], values: [188.7, 188.7, 188.7, 188.7, 188.7, 188.7] },
    { name: "Starlite / Internet Rakyat", labels: ["25 GB", "50 GB", "100 GB", "150 GB", "250 GB", "450 GB"], values: [100, 100, 100, 100, 100, 100] },
  ], { colors: [P.accent, P.ink, P.slate, P.mid], legend: true, legendPos: "t", showValue: false, min: 0, max: 700, major: 100 });
  const marks = [
    ["1", "Orbit costs more than **EZnet** above **95–125 GB** a month"],
    ["2", "Orbit costs more than **IndiHome** above **~155 GB**"],
    ["3", "At 450 GB Orbit costs **Rp642k, 2.7× IndiHome**"],
  ];
  marks.forEach(([n, t], i) => {
    const x = 0.3 + i * 1.88;
    card(s, pres, x, 3.66, 1.8, 0.42, { fill: P.light, shadow: false, name: "mark " + n });
    s.addShape(pres.shapes.OVAL, { x: x + 0.05, y: 3.75, w: 0.22, h: 0.22, fill: { color: P.accent }, line: { type: "none" }, objectName: "mark dot" });
    text(s, n, { x: x + 0.05, y: 3.75, w: 0.22, h: 0.22, fontSize: 7, bold: true, color: P.paper, align: "center", valign: "middle" });
    text(s, t, { x: x + 0.31, y: 3.66, w: 1.45, h: 0.42, fontSize: 6.4, valign: "middle" });
  });
  text(s, "Phone data alone costs **Rp78k at 25 GB** and **Rp465k at 150 GB** at Telkomsel's average yield, so a home line pays from ~25–35 GB [3]. EZnet Wireless slows to 5 Mbps above 350 GB.",
    { x: 0.3, y: 4.12, w: 5.6, h: 0.28, fontSize: 6.2, italic: true, color: P.slate, valign: "middle" });

  // Right column: family use and offload
  zone(s, pres, 2, 6.1, 0.95, 3.6, "**The family that matters most**", { fontSize: 8 });
  card(s, pres, 6.1, 1.4, 3.6, 0.95, { fill: P.light, shadow: false, name: "family use" });
  text(s, "**≈110–255 GB**", { x: 6.2, y: 1.45, w: 1.35, h: 0.85, fontSize: 13, color: P.accent, valign: "middle" });
  text(s, "a month for a streaming family of 4–6 on a conservative build-up est. [3][4]: **above Orbit's cheap zone**, yet Orbit's page says it is \"for everyone\" [1]",
    { x: 7.55, y: 1.45, w: 2.1, h: 0.85, fontSize: 6.6, valign: "middle" });
  await gradient(s, 6.1, 2.45, 3.6, 1.95, P.dark, P.ink, { radius: 0.06, name: "offload" });
  text(s, "**Home Wi-Fi moves phone data off the network whoever connects the home**", { x: 6.22, y: 2.5, w: 3.36, h: 0.36, fontSize: 7.2, color: P.paper, valign: "middle" });
  [["≈Rp117–156k", "a month of phone data in a 3–4-line Telkomsel family est."], ["50–70%", "of it moves to home Wi-Fi once the home is connected est."], ["≈Rp58–109k", "a month of mobile revenue lost when a rival connects the family est."]].forEach(([v, l], i) => {
    const y = 2.9 + i * 0.48;
    text(s, "**" + v + "**", { x: 6.22, y, w: 1.25, h: 0.42, fontSize: 10, color: P.paper, valign: "middle" });
    text(s, l, { x: 7.48, y, w: 2.15, h: 0.42, fontSize: 6.4, color: P.line, valign: "middle", greyColor: P.mid });
  });

  // Bottom strip: the routing check
  sub(s, "The routing check: five Telkomsel product pages, read 10 Oct 2026 [1]", 0.3, 4.36, 9.4);
  const pages = [["IndiHome", "\"Cek Jangkauan\" shows IndiHome plans only"], ["Orbit", "\"Paket modem WiFi spesial untuk semua\""], ["EZnet", "\"Internet rumah murah dan mudah untuk semua\""], ["EZnet Wireless", "No comparison with Orbit, its twin job"], ["Telkomsel One", "\"Untuk keluarga\", with no plan-to-family match"]];
  pages.forEach(([n, q], i) => {
    const x = 0.3 + i * 1.89;
    card(s, pres, x, 4.6, 1.82, 0.58, { fill: P.paper, line: P.line, radius: 0.05, name: "page " + n });
    text(s, "**" + n + "**", { x: x + 0.08, y: 4.62, w: 1.2, h: 0.2, fontSize: 7, valign: "middle" });
    text(s, "**✖ no cross-product tool**", { x: x + 0.08, y: 4.8, w: 1.7, h: 0.15, fontSize: 5.8, color: P.accent, valign: "middle" });
    text(s, q, { x: x + 0.08, y: 4.95, w: 1.7, h: 0.22, fontSize: 5.8, italic: true, color: P.slate, valign: "middle" });
  });
}

// ---------------- P6 Analysis Conclusion ----------------
async function p6(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Analysis Conclusion",
    title: "Analysis conclusion: product roles are the **biggest lever**, with keeping homes and building upgrade paths close behind",
    section: "Analysis", page: 6,
    source: "Appendix 14 (issue tree, five whys), 15 (gap analysis), 16 (prioritisation)",
  });
  card(s, pres, 0.3, 0.92, 9.4, 2.62, { fill: P.light, shadow: false, radius: 0.08, name: "bridge panel" });
  const rows = [
    ["Products placed by network and price tier; none of 5 pages routes a home; 0.8–1.2M inactive accounts, mostly outside the mobile base", "**Role and entry:** wrong product, wrong channel, loose terms", "Every home routed by need to the product that fits, through the mobile relationship, on paying terms"],
    ["Average home pays near the entry price; speed lent for 180–360 days; the bundle is at best a small saving", "**Spend:** extras lent, no designed path up", "Household spend rises because upgrading and adding lines pay off for the family"],
    ["1 of 50 urban award slots; upload last of 8; fixed complaints resolved 94.23% vs 98.37% for mobile", "**Delivery and cost:** premium unproven where rivals compete", "Measured experience at or above rivals where they compete; cost matched to usage"],
    ["ARPU counts inactive accounts; convergence counted as overlap; Orbit reported inside mobile", "**Measurement:** no one owns household value", "Household lifetime value is the operating metric, with one owner"],
  ];
  // headers
  await gradient(s, 0.4, 1.0, 2.55, 0.3, P.ink, P.dark, { radius: 0.04, name: "current head" });
  text(s, "**Current Condition**", { x: 0.4, y: 1.0, w: 2.55, h: 0.3, fontSize: 8, color: P.paper, align: "center", valign: "middle" });
  text(s, "**Key Question**", { x: 3.1, y: 1.0, w: 1.4, h: 0.3, fontSize: 8, color: P.dark, align: "center", valign: "middle" });
  text(s, "**Problem**", { x: 4.62, y: 1.0, w: 2.1, h: 0.3, fontSize: 8, color: P.dark, align: "center", valign: "middle" });
  await gradient(s, 7.05, 1.0, 2.55, 0.3, P.dark, P.ink, { radius: 0.04, name: "ideal head" });
  text(s, "**Ideal Condition**", { x: 7.05, y: 1.0, w: 2.55, h: 0.3, fontSize: 8, color: P.paper, align: "center", valign: "middle" });
  card(s, pres, 3.1, 1.36, 1.4, 2.08, { fill: P.paper, line: P.line, name: "kq box" });
  text(s, "Why is Telkomsel losing **value per household** in a growing market, and how much of it comes from the way **IndiHome and Orbit are positioned**?", { x: 3.16, y: 1.36, w: 1.28, h: 2.08, fontSize: 7, align: "center", valign: "middle" });
  rows.forEach(([c, p, i2], r) => {
    const y = 1.36 + r * 0.53;
    card(s, pres, 0.4, y, 2.55, 0.47, { fill: P.paper, line: P.line, radius: 0.04, shadow: false, name: "cur " + r });
    text(s, c, { x: 0.46, y, w: 2.43, h: 0.47, fontSize: 6.2, valign: "middle" });
    line(s, pres, 2.95, y + 0.235, 0.15, 0, P.mid, 1, { arrow: true });
    line(s, pres, 4.5, y + 0.235, 0.12, 0, P.mid, 1);
    card(s, pres, 4.62, y, 2.1, 0.47, { fill: [P.accent, P.dark, P.ink, P.slate][r], radius: 0.04, shadow: false, name: "prob " + r });
    text(s, p, { x: 4.68, y, w: 1.98, h: 0.47, fontSize: 6.6, color: P.paper, valign: "middle" });
    line(s, pres, 6.72, y + 0.235, 0.33, 0, P.mid, 1, { arrow: true });
    card(s, pres, 7.05, y, 2.55, 0.47, { fill: P.paper, line: P.line, radius: 0.04, shadow: false, name: "ideal " + r });
    text(s, i2, { x: 7.11, y, w: 2.43, h: 0.47, fontSize: 6.2, valign: "middle" });
  });
  // mapping row
  const hy = 3.6;
  text(s, "**Which problems to tackle?**", { x: 0.3, y: hy, w: 2.6, h: 0.2, fontSize: 7.5, color: P.dark });
  text(s, "**Which solutions?**", { x: 2.95, y: hy, w: 2.4, h: 0.2, fontSize: 7.5, color: P.dark });
  text(s, "**Why?**", { x: 5.45, y: hy, w: 4.2, h: 0.2, fontSize: 7.5, color: P.dark });
  const map = [
    ["Role and entry", "H", "Top driver; most urgent; fully in Telkomsel's control"],
    ["Spend", "O", "Upgrade steps carry most of the value"],
    ["Delivery", "M", "Homes kept are the second-largest value"],
    ["Measurement", "E", "Makes the other three judged on household value"],
  ];
  for (let i = 0; i < map.length; i++) {
    const [pb, l, why] = map[i];
    const y = 3.84 + i * 0.335;
    await gradient(s, 0.3, y, 5.05, 0.29, PILLAR[l].from, PILLAR[l].to, { radius: 0.04, name: "map " + l });
    text(s, "**" + pb + "**", { x: 0.4, y, w: 2.4, h: 0.29, fontSize: 7, color: P.paper, valign: "middle" });
    badge(s, pres, 2.95, y + 0.03, 0.23, l, P.paper, 8.5, PILLAR[l].solid);
    text(s, "**" + PILLAR[l].word + "**", { x: 3.25, y, w: 2.05, h: 0.29, fontSize: 7, color: P.paper, valign: "middle" });
    card(s, pres, 5.45, y, 4.25, 0.29, { fill: P.paper, line: P.line, radius: 0.04, shadow: false, name: "why " + l });
    text(s, why, { x: 5.52, y, w: 4.1, h: 0.29, fontSize: 6.8, valign: "middle" });
  }
}

// ---------------- P7 Strategy Overview ----------------
async function p7(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Strategy Overview",
    title: "Strategy overview: H.O.M.E. fits each home to the right product, offers a path up, makes staying better and measures household value",
    section: "Solution", page: 7,
    source: "Appendix 18 (roles), 19 (initiatives), 20 (gates and KPIs), 24 (value split), 26 (theme)",
  });
  // roof band
  await gradient(s, 0.3, 0.9, 9.4, 0.44, P.ink, P.dark, { radius: 0.08, name: "roof" });
  ["H", "O", "M", "E"].forEach((l, i) => badge(s, pres, 0.45 + i * 0.36, 0.96, 0.3, l, P.accent, 12));
  text(s, "**H.O.M.E.: manage the home, not the line**", { x: 2.0, y: 0.9, w: 7.6, h: 0.44, fontSize: 12, color: P.paper, valign: "middle" });
  // rail + columns
  const RX = 0.3, RW = 0.5, CX = 0.9, GAP = 0.1, CW = (W - M - CX - 2 * GAP) / 3;
  const rows = [["What", 1.82, 0.6], ["How", 2.48, 0.84], ["Why", 3.38, 0.5], ["Impact", 3.94, 0.36]];
  rows.forEach(([r, y, h]) => {
    text(s, "**" + r + "**", { x: RX, y, w: RW, h, fontSize: 8, color: P.dark, align: "center", valign: "middle", italic: true });
  });
  const col = {
    H: { what: "Put every home on the product that fits its need, through the family's Telkomsel relationship, on paying terms",
      how: "**Five-question check** in every channel; **stated roles** (Orbit = flexible start, IndiHome = family hub); **opt-in home check**; pay sales on homes **paying at 3 and 12 months**",
      why: "Top driver; a rival-threatened family pays from **month one**", impact: "**213k** paying homes by 2031 est." },
    O: { what: "Give each home a path up that it chooses, so spend rises with the household",
      how: "**Usage-triggered ladder offers**; **boost-end choice** with 30 days' notice; **household plan** that rewards each added line",
      why: "Single → family **Rp213bn**, EZnet → IndiHome **Rp121bn** of life value", impact: "**Rp534bn** life value est." },
    M: { what: "Keep homes where rivals are strongest by fixing the home experience and saving homes before they leave",
      how: "**Wi-Fi check**, mesh for **75k at-risk homes** a year, **fix-time promise**; **triggers with a hold-out**; route down **only to save**",
      why: "Keeping a home is cheaper than winning one", impact: "**204k** homes kept by 2031 est." },
  };
  for (let i = 0; i < 3; i++) {
    const l = ["H", "O", "M"][i];
    const x = CX + i * (CW + GAP);
    await gradient(s, x, 1.42, CW, 0.32, PILLAR[l].from, PILLAR[l].to, { radius: 0.05, name: "col head " + l });
    s.addText([{ text: l, options: { fontSize: 12, bold: true, color: P.paper } }, { text: "  " + PILLAR[l].word, options: { fontSize: 8.5, bold: true, color: P.paper } }],
      { x, y: 1.42, w: CW, h: 0.32, fontFace: FONT, align: "center", valign: "middle", margin: 0, isTextBox: true });
    const c = col[l];
    [["what", 1.82, 0.6], ["how", 2.48, 0.84], ["why", 3.38, 0.5], ["impact", 3.94, 0.36]].forEach(([k, y, h]) => {
      const isImp = k === "impact";
      card(s, pres, x, y, CW, h, { fill: P.paper, line: isImp ? PILLAR[l].solid : P.line, dash: isImp, radius: 0.05, shadow: !isImp, name: k + " " + l });
      text(s, c[k], { x: x + 0.08, y, w: CW - 0.16, h, fontSize: isImp ? 7.5 : 6.6, align: "center", valign: "middle" });
    });
  }
  await gradient(s, CX, 4.38, W - M - CX, 0.32, PILLAR.E.from, PILLAR.E.to, { radius: 0.05, name: "E bar" });
  badge(s, pres, CX + 0.06, 4.41, 0.26, "E", P.paper, 10, P.dark);
  text(s, "**E · Evaluate household value (the foundation):** one household identity (opt-in) · household KPIs in the 2027 KPI contracts · one owner of household value", { x: CX + 0.42, y: 4.38, w: W - M - CX - 0.5, h: 0.32, fontSize: 7, color: P.paper, valign: "middle" });
  // theme band
  card(s, pres, 0.3, 4.78, 9.4, 0.42, { fill: P.light, shadow: false, name: "theme band" });
  text(s, "**Lasting value, responsibly**", { x: 0.38, y: 4.78, w: 1.15, h: 0.42, fontSize: 7, color: P.dark, valign: "middle" });
  const th = ["One VAT-inclusive price everywhere", "No silent end to a boost", "First connection without commitment", "Parental controls in the household plan", "Orbit modems refurbished"];
  th.forEach((t, i) => {
    const x = 1.55 + i * 1.62;
    card(s, pres, x, 4.84, 1.55, 0.3, { fill: P.paper, line: P.line, radius: 0.15, shadow: false, name: "theme " + i });
    text(s, t, { x: x + 0.04, y: 4.84, w: 1.47, h: 0.3, fontSize: 6.2, align: "center", valign: "middle" });
  });
}

// ---------------- P8 Solution H: roles and routing ----------------
async function p8(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Solution · H: Household fit",
    title: "Product roles and routing: Orbit becomes the **flexible start**, IndiHome the **family's home hub**, and one five-question check routes every household",
    section: "Solution", page: 8,
    source: "[1] Telkom 1H26 Info Memo · [2] Opensignal · [3] BPS via GoodStats · Appendix 11 (usage crossover), 13 (household path), 18 (roles and tree)",
  });
  // Left: priority households
  zone(s, pres, 1, 0.3, 0.95, 3.25, "**Priority households** and the product each needs", { fontSize: 7.8 });
  table(s, 0.3, 1.38, 3.25, [
    ["Household need", "Ambition", "Lead product"],
    ["Families of 4–6+, streaming, children (46.5% of homes have 4–5 people [3])", "**Win and grow**", "IndiHome hub + household plan"],
    ["Performance: gaming, hybrid work", "**Grow**", "IndiHome higher tiers + Wi-Fi promise"],
    ["Large or premium homes", "**Grow**", "IndiHome + mesh or FTTR"],
    ["Budget first connection", "**Serve selectively**", "Orbit start; EZnet only where a spare port pays"],
    ["Renting or moving (21% of Jakarta homes rent [3])", "**Serve and keep**", "Orbit; EZnet Wireless for heavy use"],
    ["Fiber-dark homes", "**Serve**", "EZnet Wireless or Orbit, by capacity"],
    ["Home micro-business", "**Route out**", "IndiBiz (756k subscribers [1])"],
  ], { colW: [1.35, 0.72, 1.18], fontSize: 5.9, rowH: 0.2, fills: { 1: { 1: "FDECEF" }, 2: { 1: "FDECEF" }, 3: { 1: "FDECEF" } } });

  card(s, pres, 0.3, 3.3, 3.25, 0.98, { fill: P.light, shadow: false, name: "stop doing" });
  text(s, "**What Telkomsel stops doing**\n· Selling IndiHome, Orbit and EZnet Wireless as interchangeable answers\n· Paying acquisition on activation alone\n· Letting a boost end without a choice\n· Pricing on four VAT bases\n· Offering a cheaper plan to sell, instead of to save a home that is leaving",
    { x: 0.38, y: 3.32, w: 3.1, h: 0.94, fontSize: 6.1, valign: "middle" });

  // Middle: decision tree
  zone(s, pres, 2, 3.72, 0.95, 3.35, "**The five-question household check**", { fontSize: 7.8 });
  const qs = ["Stay at this address 12+ months?", "Fiber with a spare port?", "Usage up to ~125 GB a month?"];
  qs.forEach((q, i) => {
    const x = 3.72 + i * 1.13;
    card(s, pres, x, 1.38, 1.07, 0.42, { fill: P.ink, radius: 0.05, shadow: false, name: "q" + i });
    text(s, "**" + (i + 1) + "** " + q, { x: x + 0.05, y: 1.38, w: 0.97, h: 0.42, fontSize: 6.2, color: P.paper, align: "center", valign: "middle" });
    if (i < 2) line(s, pres, x + 1.07, 1.59, 0.06, 0, P.mid, 1, { arrow: true });
  });
  // grid
  const gx = 3.72, gy = 1.9, lw = 0.95, cw = 1.2, rh = 0.42;
  text(s, "**Up to ~125 GB**", { x: gx + lw, y: gy, w: cw, h: 0.3, fontSize: 6.3, color: P.dark, align: "center", valign: "middle" });
  text(s, "**Above ~125 GB, or streaming, work or gaming**", { x: gx + lw + cw + 0.05, y: gy, w: cw + 0.1, h: 0.3, fontSize: 6, color: P.dark, align: "center", valign: "middle" });
  const prodFill = { Orbit: P.accent, "EZnet Wireless": P.slate, EZnet: P.mid, IndiHome: P.dark };
  const grid = [["Not staying", "Orbit", "EZnet Wireless"], ["Staying, no fiber", "Orbit", "EZnet Wireless"], ["Staying, fiber", "EZnet", "IndiHome"]];
  grid.forEach(([r, a, b], i) => {
    const y = gy + 0.32 + i * (rh + 0.05);
    card(s, pres, gx, y, lw - 0.05, rh, { fill: P.light, radius: 0.04, shadow: false, name: "rowlab" });
    text(s, "**" + r + "**", { x: gx + 0.04, y, w: lw - 0.13, h: rh, fontSize: 6.2, valign: "middle" });
    [[a, gx + lw, cw], [b, gx + lw + cw + 0.05, cw + 0.1]].forEach(([p, x, w]) => {
      card(s, pres, x, y, w, rh, { fill: prodFill[p], radius: 0.04, name: "cell " + p });
      text(s, "**" + p + "**", { x, y, w, h: rh, fontSize: 7.5, color: P.paper, align: "center", valign: "middle" });
    });
  });
  const addY = gy + 0.32 + 3 * (rh + 0.05) + 0.02;
  [["4", "6+ devices or a large home → **Wi-Fi check, mesh or FTTR**"], ["5", "2+ Telkomsel lines → **household plan**"]].forEach(([n, t], i) => {
    const y = addY + i * 0.27;
    card(s, pres, gx, y, 3.35, 0.24, { fill: P.paper, line: P.line, radius: 0.04, shadow: false, name: "addon " + n });
    text(s, "**" + n + "** " + t, { x: gx + 0.06, y, w: 3.25, h: 0.24, fontSize: 6.3, valign: "middle" });
  });
  text(s, "Runs in the app, web, GraPARI, 188 and agents; offers rest on consent (PDP law); one VAT-inclusive price.", { x: gx, y: addY + 0.55, w: 3.35, h: 0.28, fontSize: 5.9, italic: true, color: P.slate });

  // Right: one household's path
  zone(s, pres, 3, 7.22, 0.95, 2.48, "**One household's path**, contribution a month est.", { fontSize: 7.8 });
  table(s, 7.22, 1.38, 2.48, [
    ["Step", "vs staying mobile-only", "vs a rival connecting"],
    ["Orbit start", "**−Rp24.9k**", "**+Rp19.4k**"],
    ["On IndiHome", "**+Rp2.2k**", "**+Rp46.5k**"],
    ["Plus a household-plan line", "**+Rp19.8k**", "**+Rp19.8k**"],
  ], { colW: [0.86, 0.81, 0.81], fontSize: 6.2, rowH: 0.3, align: ["left", "center", "center"], fills: { 1: { 1: "F8E1E5" } } });
  card(s, pres, 7.22, 2.72, 2.48, 1.5, { fill: P.light, shadow: false, name: "path note" });
  text(s, "**So the home check targets families a rival is about to connect.** A Telkomsel family of three lines (Rp138k of mobile revenue) pays from **month one** when a rival would otherwise take the home; the value then comes from the steps up to IndiHome and the added lines.",
    { x: 7.3, y: 2.76, w: 2.32, h: 1.42, fontSize: 6.4, valign: "middle" });

  // Bottom: how Telkomsel wins without price
  sub(s, "How Telkomsel wins without leading on price", 0.3, 4.36, 9.4);
  const wins = [["Fit", "One check across five products; Orbit's no-commitment start"], ["Family relationship", "**153.5M** mobile customers [1]; the household plan"], ["Home experience", "Whole-home Wi-Fi; fix-time promise"], ["Reach", "Widest footprint; the only scale ISP in Maluku–Papua [2]"]];
  wins.forEach(([h, t], i) => {
    const x = 0.3 + i * 2.37;
    card(s, pres, x, 4.6, 2.3, 0.56, { fill: P.paper, line: P.line, radius: 0.05, name: "win " + h });
    s.addShape(pres.shapes.OVAL, { x: x + 0.08, y: 4.72, w: 0.32, h: 0.32, fill: { color: [P.accent, P.dark, P.ink, P.slate][i] }, line: { type: "none" }, objectName: "win dot" });
    text(s, String(i + 1), { x: x + 0.08, y: 4.72, w: 0.32, h: 0.32, fontSize: 9, bold: true, color: P.paper, align: "center", valign: "middle" });
    text(s, "**" + h + "**\n" + t, { x: x + 0.47, y: 4.62, w: 1.78, h: 0.52, fontSize: 6.4, valign: "middle" });
  });
}

// ---------------- P9 Implementation ----------------
async function p9(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Implementation",
    title: "Implementation: **eight weeks** to validate, **six months** of randomised tests, and national scale only after each gate's pass mark is met",
    section: "Implementation", page: 9,
    source: "Appendix 19 (initiatives and RACI), 20 (gates and KPIs), 25 (risks and feasibility). VP titles as reported in Bisnis; other functions generic.",
  });
  // Left: governance
  zone(s, pres, 1, 0.3, 0.95, 2.75, "**Who owns what**", { fontSize: 8 });
  card(s, pres, 0.3, 1.4, 2.75, 0.46, { fill: P.accent, radius: 0.05, name: "owner" });
  text(s, "**Household P&L owner** (CEO office)\nhousehold KPIs, one budget, shared bonus pool", { x: 0.36, y: 1.4, w: 2.63, h: 0.46, fontSize: 6.4, color: P.paper, align: "center", valign: "middle" });
  line(s, pres, 1.675, 1.86, 0, 0.12, P.mid, 1);
  [["**VP Home Broadband & FMC Consumer Marketing**", "fit check, roles, boost-end choice, household plan"], ["**VP Household Consumer Business Strategy Mgmt**", "home check, ladder offers, triggers (with CVM)"]].forEach(([h, t], i) => {
    const y = 1.98 + i * 0.6;
    card(s, pres, 0.3, y, 2.75, 0.52, { fill: P.dark, radius: 0.05, name: "vp " + i });
    text(s, h + "\n" + t, { x: 0.36, y, w: 2.63, h: 0.52, fontSize: 6.2, color: P.paper, align: "center", valign: "middle" });
  });
  line(s, pres, 1.675, 3.1, 0, 0.1, P.mid, 1);
  [["Billing and IT", "boost-end test"], ["Network and CPE", "Wi-Fi promise, mesh"], ["InfraNexia", "port data, port fill"], ["Finance", "household KPIs, cost cap"]].forEach(([h, t], i) => {
    const x = 0.3 + (i % 2) * 1.4, y = 3.22 + Math.floor(i / 2) * 0.46;
    card(s, pres, x, y, 1.35, 0.4, { fill: P.paper, line: P.line, radius: 0.05, name: "fn " + h });
    text(s, "**" + h + "**\n" + t, { x: x + 0.04, y, w: 1.27, h: 0.4, fontSize: 6, align: "center", valign: "middle" });
  });
  card(s, pres, 0.3, 4.18, 2.75, 0.98, { fill: P.light, shadow: false, name: "critical path" });
  text(s, "**Critical path:** Phase 0 decisions (KPI contracts, P&L owner, InfraNexia data) → **one household identity** → home check, household plan and triggers. In parallel: the fit check and the **boost-end test**, which needs only billing changes and starts first.",
    { x: 0.38, y: 4.2, w: 2.6, h: 0.94, fontSize: 6.2, valign: "middle" });

  // Right top: timeline with swimlanes
  zone(s, pres, 2, 3.22, 0.95, 6.48, "**Roadmap** with gates in the model's own units", { fontSize: 8 });
  const LX = 3.22, LW = 0.32;
  const phases = [["Phase 0 · Nov–Dec 2026", 0.95, P.slate], ["Phase 1 · Jan–Jun 2027", 1.45, P.accent], ["Phase 2 · Jul 2027–Dec 2028", 2.0, P.dark], ["Phase 3 · 2029–2031", 1.66, P.ink]];
  let px = LX + LW + 0.05;
  const pxs = [];
  phases.forEach(([n, w, c], i) => { chevron(s, pres, px, 1.38, w, 0.26, n, c, { first: i === 0, fontSize: 5.9 }); pxs.push([px, w]); px += w + 0.02; });
  const lanes = {
    H: ["Mystery shop; stated roles; one price", "Fit and home check pilot: Jakarta Selatan + a fiber-dark area", "National fit and home check", "Thresholds tuned on real use"],
    O: ["Size the expiring boost cohorts", "National randomised boost-end test; ladder and plan offers vs hold-out", "Paths and household plan nationwide", "Household value in targets"],
    M: ["Household survey", "Wi-Fi promise pilot; triggers vs hold-out", "Wi-Fi promise in contested cities from 2028", "Port-fill terms with the group"],
    E: ["KPI contracts; P&L owner; InfraNexia data; consent", "Household identity build", "Household KPIs monthly; Orbit baseline", "Household value in pay"],
  };
  ["H", "O", "M", "E"].forEach((l, r) => {
    const y = 1.7 + r * 0.3;
    badge(s, pres, LX + 0.02, y + 0.01, 0.24, l, PILLAR[l].solid, 9);
    lanes[l].forEach((t, i) => {
      const [x, w] = pxs[i];
      card(s, pres, x, y, w, 0.26, { fill: i === 0 ? P.light : (l === "E" ? "F4E0E4" : P.light), radius: 0.04, shadow: false, name: "lane " + l + i });
      text(s, t, { x: x + 0.03, y, w: w - 0.06, h: 0.26, fontSize: 5.5, valign: "middle", align: "center" });
    });
  });
  // gates
  const gates = [["Gate 1\nJun 2027", pxs[1][0] + pxs[1][1]], ["Gate 1b\nDec 2027 / Jun 2028", pxs[2][0] + pxs[2][1] * 0.5], ["Gate 2\nDec 2028", pxs[2][0] + pxs[2][1]]];
  gates.forEach(([g, x], i) => {
    s.addShape(pres.shapes.DIAMOND, { x: x - 0.08, y: 2.9, w: 0.16, h: 0.16, fill: { color: P.accent }, line: { color: P.paper, width: 0.75 }, objectName: "gate " + i });
    text(s, "**" + g + "**", { x: x - 0.5, y: 3.06, w: 1.0, h: 0.2, fontSize: 5.4, color: P.accent, align: "center" });
  });
  card(s, pres, LX, 3.29, 6.48, 0.34, { fill: "FDECEF", shadow: false, radius: 0.04, name: "gate1 marks" });
  text(s, "**Gate 1 pass mark: every take-up KPI ≥ 60% of plan**, e.g. boost-end take-up ≥ **4.8%** · save rate ≥ **6%** · opt-in × conversion ≥ **0.6%** · ladder steps ≥ **1.8% / 0.3%** · lines ≥ **1.2%**. If it fails, national spend stops.",
    { x: LX + 0.08, y: 3.29, w: 6.32, h: 0.34, fontSize: 6.1, valign: "middle" });

  // Right bottom: risks
  zone(s, pres, 3, 3.22, 3.7, 6.48, "**Top risks and triggers**", { fontSize: 8 });
  const mx = 3.5, my = 4.12, cs = 0.33;
  const heat = [["F7D6DC", "F0AEB9", P.accent], ["F1F5F9", "F7D6DC", "F0AEB9"], ["F1F5F9", "F1F5F9", "F7D6DC"]];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s.addShape(pres.shapes.RECTANGLE, { x: mx + c * cs, y: my + r * cs, w: cs, h: cs, fill: { color: heat[r][c] }, line: { color: P.paper, width: 1 }, objectName: "heat" });
  text(s, "Impact", { x: 3.0, y: my + 0.35, w: 0.45, h: 0.3, fontSize: 5.8, color: P.slate, align: "center", rotate: 270 });
  text(s, "Likelihood →", { x: mx, y: my + 3 * cs + 0.01, w: 3 * cs, h: 0.14, fontSize: 5.8, color: P.slate, align: "center" });
  const dots = [[1, 2, 0], [2, 1, 0], [3, 1, 1], [4, 2, 1]];
  dots.forEach(([n, c, r]) => {
    s.addShape(pres.shapes.OVAL, { x: mx + c * cs + 0.06, y: my + r * cs + 0.06, w: 0.21, h: 0.21, fill: { color: P.ink }, line: { color: P.paper, width: 0.75 }, objectName: "risk dot " + n });
    text(s, String(n), { x: mx + c * cs + 0.06, y: my + r * cs + 0.06, w: 0.21, h: 0.21, fontSize: 6.5, bold: true, color: P.paper, align: "center", valign: "middle" });
  });
  table(s, 4.62, 4.1, 5.08, [
    ["#", "Risk", "Trigger → action"],
    ["1", "Organisation resists household KPIs", "Not in 2027 KPI contracts → Phase 0 does not exit; escalate to the CEO office"],
    ["2", "Cannibalisation (routing down)", "Leakage > 5% of new homes → tighten price fences"],
    ["3", "Boost-end backlash", "Take-up < 4.8% at month 3 → switch to outcome packs; never a silent cut"],
    ["4", "Rival price moves", "Rival build detected → triggers and Wi-Fi checks there first; no price cut"],
  ], { colW: [0.2, 1.55, 3.33], fontSize: 5.9, rowH: 0.205, align: ["center", "left", "left"] });
}

// ---------------- P10 Projection ----------------
async function p10(pres) {
  const s = newSlide(pres);
  await chrome(s, pres, {
    label: "Financial Projection",
    title: "Financial projection: cash pays back in **2031** and the homes won are worth **Rp394bn** after all capex, while a failed pilot stops at about **Rp98bn**",
    section: "Projection", page: 10,
    source: "Model in Appendix 21–24: incremental to a do-nothing base, Rp bn ex-VAT, 10% discount rate, 22% tax, life of homes won = 2027–2041 run-off with no new homes after 2031",
  });
  // Panel 1
  zone(s, pres, 1, 0.3, 0.95, 4.55, "**Cash and value**, Rp bn est.", { fontSize: 8 });
  sub(s, "Cumulative free cash flow against the do-nothing base", 0.3, 1.36, 4.55, { fontSize: 6.8, color: P.slate });
  chart(s, pres, "bar", 0.25, 1.55, 4.6, 1.75, [{ name: "Cumulative cash", labels: ["2027", "2028", "2029", "2030", "2031"], values: [-135, -231, -225, -154, 12] }],
    { colors: [P.accent], invert: [P.mid], min: -300, max: 100, major: 100, labelPos: "outEnd", gap: 70 });
  card(s, pres, 0.62, 1.66, 2.75, 0.26, { fill: P.paper, line: P.accent, shadow: false, radius: 0.05, name: "gate callout" });
  text(s, "◆ **Gate 1 (Jun 2027):** if it fails, stop with **Rp98bn** of cash spent", { x: 0.67, y: 1.66, w: 2.67, h: 0.26, fontSize: 6.2, valign: "middle" });
  const met = [["NPV, life of homes won", "Rp394bn"], ["IRR", "35.1%"], ["B/C", "2.95"], ["BEP (cash)", "2031"], ["5-year NPV", "−Rp46bn"], ["Capex 2027–31", "Rp295bn"]];
  met.forEach(([l, v], i) => {
    const x = 0.3 + (i % 3) * 1.53, y = 3.4 + Math.floor(i / 3) * 0.44;
    card(s, pres, x, y, 0.78, 0.38, { fill: P.dark, radius: 0.03, shadow: false, name: "metric label" });
    text(s, "**" + l + "**", { x: x + 0.03, y, w: 0.72, h: 0.38, fontSize: 5.9, color: P.paper, align: "center", valign: "middle" });
    card(s, pres, x + 0.78, y, 0.7, 0.38, { fill: P.paper, line: P.dark, radius: 0.03, shadow: false, name: "metric value" });
    text(s, "**" + v + "**", { x: x + 0.78, y, w: 0.7, h: 0.38, fontSize: 8.5, color: i === 4 ? P.slate : P.ink, align: "center", valign: "middle" });
  });

  // Panel 2: waterfall
  zone(s, pres, 2, 5.0, 0.95, 4.7, "**Where the value comes from** and how robust it is est.", { fontSize: 8 });
  sub(s, "Life-of-homes NPV by pillar, Rp bn", 5.0, 1.36, 4.7, { fontSize: 6.8, color: P.slate });
  const base = 3.15, k = 1.45 / 761; // inches per Rp bn
  const steps = [
    { l: "H", v: 53, from: 0, segs: [[53, P.accent]] },
    { l: "O", v: 534, from: 53, segs: [[338, P.dark], [125, "C2566C"], [71, "E58C9C"]] },
    { l: "M", v: 174, from: 587, segs: [[174, P.ink]] },
    { l: "Shared costs", v: -363, from: 761, segs: [[363, P.mid]] },
    { l: "Interaction", v: -4, from: 398, segs: [[4, P.mid]] },
    { l: "Total", v: 394, from: 0, segs: [[394, P.accent]] },
  ];
  const bw = 0.52, gapx = 0.22;
  steps.forEach((st, i) => {
    const x = 5.15 + i * (bw + gapx);
    let lo = st.v >= 0 ? st.from : st.from + st.v;
    let acc = lo;
    st.segs.forEach(([v, c]) => {
      s.addShape(pres.shapes.RECTANGLE, { x, y: base - (acc + v) * k, w: bw, h: Math.max(v * k, 0.012), fill: { color: c }, line: { type: "none" }, objectName: "wf " + st.l });
      acc += v;
    });
    const top = base - Math.max(st.from, st.from + st.v, st.v >= 0 ? st.from + st.v : st.from) * k;
    text(s, "**" + (st.v > 0 && i < 5 ? "+" : "") + (st.v < 0 ? "−" + Math.abs(st.v) : st.v) + "**", { x: x - 0.1, y: top - 0.17, w: bw + 0.2, h: 0.15, fontSize: 6.8, align: "center", color: st.v < 0 ? P.slate : P.ink });
    text(s, st.l, { x: x - 0.12, y: base + 0.03, w: bw + 0.24, h: 0.15, fontSize: 6.2, align: "center", color: P.slate, bold: ["H", "O", "M"].includes(st.l) });
    if (i < steps.length - 1) {
      const lvl = st.v >= 0 ? st.from + st.v : st.from + st.v;
      line(s, pres, x + bw, base - lvl * k, gapx, 0, P.line, 0.5, { dash: true });
    }
  });
  line(s, pres, 5.1, base, 4.55, 0, P.ink, 0.75);
  s.addText([
    { text: "O = ", options: { color: P.slate } },
    { text: "■ ", options: { color: P.dark } }, { text: "paths Rp338bn", options: { bold: true, color: P.ink } }, { text: " (ladder steps 334 + Orbit → fiber 4) · ", options: { color: P.slate } },
    { text: "■ ", options: { color: "C2566C" } }, { text: "lines Rp125bn", options: { bold: true, color: P.ink } }, { text: " · ", options: { color: P.slate } },
    { text: "■ ", options: { color: "E58C9C" } }, { text: "boost-end Rp71bn", options: { bold: true, color: P.ink } },
    { text: ". Shared costs = platforms, marketing, programme office.", options: { color: P.slate } },
  ], { x: 5.0, y: 3.36, w: 4.7, h: 0.26, fontFace: FONT, fontSize: 5.9, italic: true, margin: 0, valign: "top", isTextBox: true });
  [["**Robust:** value falls to zero only if every take-up input lands at **55% of plan** at once; Gate 1 passes at 60%.", 5.0], ["**Gated:** expected NPV **Rp208bn** at a 60% chance of passing Gate 1.", 7.38]].forEach(([t, x]) => {
    card(s, pres, x, 3.66, 2.32, 0.46, { fill: P.light, shadow: false, radius: 0.04, name: "robust" });
    text(s, t, { x: x + 0.06, y: 3.66, w: 2.2, h: 0.46, fontSize: 6.2, valign: "middle" });
  });
  text(s, "**Price-led comparator:** every **Rp10k** cut across the base costs **≈Rp1,142bn a year**, nearly all of it margin, over five times the **Rp210bn** of EBITDA a year this plan adds by 2031.", { x: 5.0, y: 4.14, w: 4.7, h: 0.3, fontSize: 6.2, valign: "middle" });

  // Bottom: KPIs and conclusion
  await gradient(s, 0.3, 4.5, 9.4, 0.7, P.ink, P.dark, { radius: 0.06, name: "kpi band" });
  text(s, "**Measured by** (net stocks est.), 2028 → 2031", { x: 0.4, y: 4.52, w: 1.3, h: 0.36, fontSize: 6.5, color: P.paper, valign: "middle", greyColor: P.line });
  const kpis = [["73k → 213k", "paying homes won"], ["59k → 204k", "homes kept"], ["67k → 197k", "Telkomsel lines added"], ["90k → 267k", "ladder steps"], ["Rp1,134bn", "revenue a year by 2031 (≈4.4%)"]];
  kpis.forEach(([v, l], i) => {
    const x = 1.75 + i * 1.6;
    text(s, "**" + v + "**", { x, y: 4.52, w: 1.55, h: 0.2, fontSize: 8.5, color: P.paper, valign: "middle" });
    text(s, l, { x, y: 4.71, w: 1.55, h: 0.16, fontSize: 5.9, color: P.line, valign: "middle" });
  });
  text(s, "**Conclusion:** H.O.M.E. answers the case without a price war: each home gets the product that fits, a path up it chooses and a reason to stay, all judged on household value and released only through gates.",
    { x: 0.4, y: 4.88, w: 9.2, h: 0.3, fontSize: 6.6, color: P.paper, valign: "middle" });
}

module.exports = { 2: p2, 3: p3, 4: p4, 5: p5, 6: p6, 7: p7, 8: p8, 9: p9, 10: p10 };
