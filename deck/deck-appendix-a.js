// deck-appendix-a.js: Appendix 1–14 (evidence for the problem and the analysis). Data: file 01 v1.7, file 02 v4.1, file 03 v2.1.
const { P, PILLAR, FONT, W, M, text, card, gradient, badge, table, banner, chart, sub } = require("./deck-lib");

const line = (s, pres, x, y, w, h, color = P.mid, width = 1, o = {}) =>
  s.addShape(pres.shapes.LINE, { x, y, w, h, flipH: !!o.flipH, line: { color, width, dashType: o.dash ? "dash" : "solid", endArrowType: o.arrow ? "triangle" : undefined }, objectName: "line" });
const pillTag = (s, pres, x, y, w, h, str, fill, fs = 6.2) => {
  card(s, pres, x, y, w, h, { fill, radius: Math.min(h / 2, 0.15), shadow: false, name: "pill" });
  text(s, "**" + str + "**", { x, y, w, h, fontSize: fs, color: P.paper, align: "center", valign: "middle" });
};

const A = [];

// ---------- Appendix 1 (1/2): case requirements ----------
A.push({ n: "1 (1/2)", title: "Case requirements: every clause of the case question mapped to where the deck answers it", source: "Case book (S01, p.3–4); guidebook (S02)", build: async (s, pres) => {
  const reqs = [
    ["One integrated household strategy", "P7 · A19"], ["Priority customer segments", "P8 · A12"], ["Each segment's connectivity needs", "P5, P8 · A11, A12"], ["Role of IndiHome and Orbit per segment", "P8 · A18"],
    ["Products not treated as interchangeable", "P5, P8 · A11"], ["Balance of acquisition, affordability, retention, monetisation, experience, differentiation", "P7 · A25 (2/2)"], ["Levers: positioning, migration paths, cross-sell, bundling, FMC, digital services, partnerships", "P7, P8 · A19"], ["Commercially feasible in Indonesia", "P10 · A22, A24"],
    ["Operationally feasible", "P9 · A25"], ["Implementation roadmap", "P9 · A20"], ["Risks and mitigation", "P9 · A25"], ["Measurable KPIs", "P9, P10 · A20"],
    ["Business impact: conversion, ARPU uplift, retention, FMC adoption, incremental revenue", "P10 · A22"], ["Without relying primarily on price competition", "P8, P10 · A24"], ["Stronger long-term household value", "P10 · A21, A24"], ["Increasingly diverse household needs", "P5 · A11, A12"],
  ];
  reqs.forEach(([r, w], i) => {
    const x = 0.3 + (i % 4) * 2.37, y = 0.95 + Math.floor(i / 4) * 0.8;
    card(s, pres, x, y, 2.3, 0.72, { fill: P.paper, line: P.line, radius: 0.05, name: "req " + i });
    s.addShape(pres.shapes.OVAL, { x: x + 0.07, y: y + 0.08, w: 0.24, h: 0.24, fill: { color: P.accent }, line: { type: "none" }, objectName: "check" });
    text(s, "✔", { x: x + 0.07, y: y + 0.08, w: 0.24, h: 0.24, fontSize: 7.5, bold: true, color: P.paper, align: "center", valign: "middle" });
    text(s, "**" + r + "**", { x: x + 0.37, y: y + 0.04, w: 1.88, h: 0.42, fontSize: 6.3, valign: "middle" });
    text(s, "→ " + w, { x: x + 0.37, y: y + 0.47, w: 1.88, h: 0.2, fontSize: 6.2, color: P.accent, valign: "middle" });
  });
  await banner(s, 0.3, 4.22, 9.4, 0.3, "The four Key Questions for participants", { fontSize: 7.5 });
  const kq = [["KQ1 Which segments, with what needs", "P8 (priority households) · A12"], ["KQ2 The role of IndiHome and Orbit", "P8 (check and roles) · A18"], ["KQ3 Acquire, engage, retain, grow", "P7 (H, O, M) · A19"], ["KQ4 Implement and measure", "P9, P10 · A20–A24"]];
  kq.forEach(([q, w], i) => {
    const x = 0.3 + i * 2.37;
    card(s, pres, x, 4.58, 2.3, 0.62, { fill: P.light, shadow: false, radius: 0.05, name: "kq " + i });
    text(s, "**" + q + "**\n→ " + w, { x: x + 0.08, y: 4.58, w: 2.16, h: 0.62, fontSize: 6.4, valign: "middle", paraSpaceAfter: 1 });
  });
}});

// ---------- Appendix 1 (2/2): scoring matrix ----------
A.push({ n: "1 (2/2)", title: "Scoring matrix: where each criterion is answered, weighted as the judges weight it", source: "Guidebook, scoring matrix (S02, p.10)", build: async (s, pres) => {
  const rows = [
    ["Executive Summary", 5, "Concise summary; problem, solution and outcomes communicated", "P1 (SCSI matrix, number row)"],
    ["Problem Identification", 15, "Clear problem; depth of understanding; issues prioritised by significance and impact", "P3 (issue tree, scores), P6; A3–A5, A14–A16"],
    ["Analysis and Research", 25, "Relevant research; quality of data, tools and methods; opportunities, risks, threats and strengths", "P2, P4, P5; A2–A13, A17"],
    ["Solution Quality", 30, "Critical, strategic reasoning; creative solutions consistent with the analysis", "P6 bridge, P7, P8; A18, A19, A26"],
    ["Feasibility and Risk", 20, "Realistic, sequenced plan; sound financial model tied to operations; risks, trade-offs, contingencies", "P9, P10; A20–A25, A27"],
    ["Formatting", 5, "Format compliance; clear professional business English", "10 core pages, 16:9 PDF, English, references (R1–R3)"],
  ];
  rows.forEach(([c, wgt, d, where], i) => {
    const y = 0.98 + i * 0.68;
    card(s, pres, 0.3, y, 9.4, 0.6, { fill: i % 2 ? P.paper : P.light, shadow: false, radius: 0.05, name: "score row" });
    text(s, "**" + c + "**", { x: 0.4, y, w: 1.5, h: 0.6, fontSize: 7.5, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.95, y: y + 0.2, w: wgt / 30 * 1.6, h: 0.2, fill: { color: wgt >= 25 ? P.accent : wgt >= 15 ? P.dark : P.mid }, line: { type: "none" }, objectName: "weight bar" });
    text(s, "**" + wgt + "%**", { x: 1.95 + wgt / 30 * 1.6 + 0.05, y, w: 0.45, h: 0.6, fontSize: 8, valign: "middle" });
    text(s, d, { x: 4.15, y, w: 2.75, h: 0.6, fontSize: 6.3, color: P.slate, valign: "middle" });
    text(s, "**" + where + "**", { x: 7.0, y, w: 2.6, h: 0.6, fontSize: 6.4, color: P.dark, valign: "middle" });
  });
  text(s, "Half the marks (Solution 30% + Feasibility 20%) sit on the answer and its execution, so the solution is built from the analysis (P6) and every model figure ties to a gate (P9) and an appendix page (A21–A24).", { x: 0.3, y: 5.1, w: 9.4, h: 0.18, fontSize: 6.2, italic: true, color: P.slate });
}});

// ---------- Appendix 2: revenue, base and ARPU ----------
A.push({ n: "2", title: "Household revenue, base and ARPU: revenue fell in 2025 and 1H26 while the reported base shrank 5.4%", source: "Telkomsel AR 2025 (S03); Telkom info memos FY24–1H26 (S04–S08); our calculation", build: async (s, pres) => {
  sub(s, "Household revenue a quarter (Rp bn)", 0.3, 0.92, 3.1);
  chart(s, pres, "bar", 0.25, 1.12, 3.2, 1.9, [{ name: "Revenue", labels: ["1Q25", "2Q25", "3Q25", "4Q25", "1Q26", "2Q26"], values: [6683, 6599, 6490, 6396, 6370, 6410] }], { colors: [P.accent], min: 6000, max: 6800, major: 200, gap: 50 });
  sub(s, "Reported base, thousands of homes", 3.6, 0.92, 3.1);
  chart(s, pres, "bar", 3.55, 1.12, 3.2, 1.9, [{ name: "Base", labels: ["4Q24", "1Q25", "2Q25", "3Q25", "4Q25", "1Q26", "2Q26"], values: [9612, 9842, 10061, 10261, 10324, 10327, 9513] }], { colors: [P.dark], min: 9000, max: 10600, major: 400, gap: 45 });
  sub(s, "Revenue bridge 2024 → 2025 (Rp bn)", 6.9, 0.92, 2.8);
  table(s, 6.9, 1.15, 2.8, [["Step", "Rp bn"], ["FY2024 revenue", "26,606"], ["+ volume (avg base 9.153M → 9.968M)", "**+2,369**"], ["− price and mix (Rp242.2k → Rp218.8k)", "**−2,807**"], ["FY2025 revenue", "**26,168** (−1.6%)"]], { colW: [1.95, 0.85], fontSize: 6.2, rowH: 0.27, align: ["left", "right"] });
  sub(s, "ARPU on three bases, 2Q26 (Rp k a month)", 0.3, 3.12, 6.4);
  table(s, 0.3, 3.35, 6.4, [
    ["Base", "ARPU", "vs cheapest standalone plan ex-VAT (Rp216.2k)", "Basis"],
    ["As reported (implies ≈10.14M accounts)", "**210.8**", "**−2.5%**", "Telkom 1H26 Info Memo"],
    ["On the 9.513M closing base", "**224.6**", "**+3.9%**", "our calculation"],
    ["On a paying base under the 0.8M reading (≈9.11M)", "**234.5**", "**+8.4%**", "estimate"],
  ], { colW: [2.35, 0.7, 2.15, 1.2], fontSize: 6.3, rowH: 0.28, align: ["left", "center", "center", "left"] });
  card(s, pres, 6.9, 2.75, 2.8, 2.42, { fill: P.light, shadow: false, name: "annual" });
  text(s, "**Annual series**\nARPU **Rp253k → Rp237.6k → Rp213.5k** (2023–2025), −15.6% in two years.\nRevenue **Rp26.6T → Rp26.2T** (2024–2025); 1H26 **Rp12.78T, −3.8%** YoY.\nMobile ARPU fell **3.1%** in 2025 but rose **9.0%** YoY in 2Q26; mobile revenue **+5.6%** in 1H26.\n**2Q26 +0.6% QoQ** is helped by removing inactive accounts and World Cup marketing: one quarter is not a turn.",
    { x: 7.0, y: 2.8, w: 2.6, h: 2.32, fontSize: 6.3, valign: "top", paraSpaceAfter: 3 });
  text(s, "Reading: whichever base is used, the average IndiHome home pays between 2.5% below and 8.4% above Jakarta Selatan's cheapest standalone plan, so upsell depth is shallow.", { x: 0.3, y: 4.62, w: 6.4, h: 0.4, fontSize: 6.4, italic: true, color: P.slate, valign: "middle" });
}});

// ---------- Appendix 3: cleansing ----------
A.push({ n: "3", title: "The 2Q26 cleansing: two readings of its size, and where the net fall sat", source: "Telkom 1H26 Info Memo p.43 (S04); BRI Danareksa, 5 Aug 2026 (S09); Telkom info memos (S05–S08); our calculation", build: async (s, pres) => {
  sub(s, "Two readings of the same event", 0.3, 0.92, 4.6);
  table(s, 0.3, 1.15, 4.6, [
    ["", "Telkom's memo", "BRI Danareksa"],
    ["What it says", "\"~1.2 Mn · inactive, non-revenue-contributing customers with a LoS of >12 months\"; one-off ~Rp130bn non-cash adjustment", "\"cleansed ~800k of non-contributing subs\"; phased cleansing; FY26F base 9.124M"],
    ["Implied 2Q26 underlying net adds", "**+386k** (vs +3k in 1Q26)", "**−14k**, in line with 1Q26"],
    ["Inactive accounts still in 9.513M", "~0", "**~0.4M**"],
    ["Share of net adds Jan 2024–Jun 2025 (1.367M)", "**87.8%**", "**58.5%** removed so far"],
    ["Share of the 1Q26 base", "**11.6%** (1 in 9)", "**7.7%** (1 in 13)"],
  ], { colW: [1.3, 1.65, 1.65], fontSize: 6, rowH: 0.3 });
  text(s, "The slide does not say the accounts never paid; it says they were older than 12 months and brought in no revenue. The deck carries both readings as a range: **0.8–1.2M**.", { x: 0.3, y: 3.75, w: 4.6, h: 0.45, fontSize: 6.4, italic: true, color: P.slate });
  sub(s, "Quarterly change in homes (thousands): converged vs without a Telkomsel line", 5.1, 0.92, 4.6);
  chart(s, pres, "bar", 5.05, 1.12, 4.65, 2.6, [
    { name: "Converged homes", labels: ["1Q25", "2Q25", "3Q25", "4Q25", "1Q26", "2Q26"], values: [-38, 52, 151, 420, 19, 85] },
    { name: "Homes without a Telkomsel line", labels: ["1Q25", "2Q25", "3Q25", "4Q25", "1Q26", "2Q26"], values: [268, 167, 48, -357, -16, -899] },
  ], { colors: [P.dark, P.mid], legend: true, min: -1000, max: 500, major: 250, gap: 40, labelFont: 5.8 });
  card(s, pres, 5.1, 3.8, 4.6, 1.38, { fill: P.light, shadow: false, name: "reading" });
  text(s, "**What the series shows**\n· In 1H25 almost all net growth was in homes **without** a Telkomsel line (+449k base, ≈+13k converged).\n· In 2Q26 the net fall sat in that pool: **−899k vs +85k** converged (net; which accounts were removed is not published).\n· The 4Q25 jump (+420k converged on +63k net adds) may be better matching after one bill; 3Q25 is derived from a rounded rate.",
    { x: 5.18, y: 3.83, w: 4.45, h: 1.32, fontSize: 6.1, valign: "top" });
}});

// ---------- Appendix 4: paying households ----------
A.push({ n: "4", title: "Paying households: revenue per paying home fell in every timing scenario, and the timing test with its break-even", source: "Telkomsel AR 2025 (S03); Telkom info memos (S04–S08); press timing (S10); our calculation and simulation", build: async (s, pres) => {
  sub(s, "Change in revenue per household, 2024 → 2025, by when the inactive stock built up (%)", 0.3, 0.92, 4.4);
  chart(s, pres, "bar", 0.25, 1.12, 4.5, 2.1, [{ name: "Change", labels: ["Reported view", "Built in 1H25", "Built Jan 2024–Jun 2025", "Constant legacy stock"], values: [-9.7, -0.7, -2.9, -10.8] }],
    { colors: [P.accent], min: -12, max: 0, major: 3, fmt: "0.0", labelPos: "outEnd", gap: 60, catFont: 6 });
  table(s, 0.3, 3.3, 4.4, [
    ["Scenario", "Paying growth", "Per paying home", "Volume / price-mix (Rp bn)"],
    ["Reported view", "+8.9%", "−9.7%", "+2,369 / −2,807"],
    ["Built in 1H25", "−0.9%", "−0.7%", "−247 / −191"],
    ["Built Jan 2024 → Jun 2025", "+1.3%", "−2.9%", "+350 / −788"],
    ["Constant legacy stock", "+10.2%", "−10.8%", "+2,727 / −3,165"],
  ], { colW: [1.4, 0.8, 0.9, 1.3], fontSize: 6.1, rowH: 0.24, align: ["left", "center", "center", "center"] });
  text(s, "Every row adds to the same −Rp438bn. Scenarios use the 1.2M stock; 0.8M narrows the spread.", { x: 0.3, y: 4.85, w: 4.4, h: 0.3, fontSize: 6, italic: true, color: P.slate });
  sub(s, "Timing-based test: stock held constant from mid-2025", 4.95, 0.92, 4.75);
  table(s, 4.95, 1.15, 4.75, [["Quarter", "Revenue (Rp bn)", "Per paying home, 1.2M stock", "Same, 0.8M stock"], ["3Q25", "6,490", "Rp241.4k", "Rp231.1k"], ["4Q25", "6,396", "Rp234.5k", ""], ["1Q26", "6,370", "Rp232.7k", "Rp222.9k"], ["Change 3Q25 → 1Q26", "", "**−3.6%**", "**−3.5%**"]],
    { colW: [1.25, 1.0, 1.4, 1.1], fontSize: 6.2, rowH: 0.27, align: ["left", "center", "center", "center"] });
  card(s, pres, 4.95, 2.65, 4.75, 1.0, { fill: P.paper, line: P.accent, dash: true, shadow: false, name: "breakeven" });
  text(s, "**0.33M**", { x: 5.05, y: 2.65, w: 1.0, h: 1.0, fontSize: 16, color: P.accent, valign: "middle" });
  text(s, "new non-payers between 3Q25 and 1Q26 would erase the fall (0.33–0.34M by stock); provisions were still rising in 1H26, so the test is **evidence that falls short of proof**.", { x: 6.1, y: 2.65, w: 3.5, h: 1.0, fontSize: 6.6, valign: "middle" });
  card(s, pres, 4.95, 3.75, 4.75, 1.4, { fill: P.light, shadow: false, name: "holds" });
  text(s, "**What holds in every reading**\n· Household revenue fell: **−1.6%** in 2025, **−3.8%** in 1H26.\n· Revenue per paying household fell in all three timing scenarios (**−0.7% to −10.8%**).\n· The likeliest timing (built Jan 2024 → Jun 2025) means little real volume growth (+1.3%) and a moderate price-mix fall (−2.9%).\n· The cleansing is a robustness check; the headline is the role mismatch.",
    { x: 5.05, y: 3.78, w: 4.58, h: 1.35, fontSize: 6.1, valign: "top" });
}});

// ---------- Appendix 5: rival explanations (two pages) ----------
const rivals = [
  ["Macro squeeze", "All household telecom spend falling", "2025: mobile ARPU also fell 3.1%; 2026: mobile ARPU +9.0%, mobile revenue +5.6% while household revenue fell 3.8%", "Not for 2026", P.ink],
  ["A price war", "IndiHome cutting headline prices", "No headline cut (100 Mbps Rp270k, below rival fiber at Rp345–482k); speed and content added at the same price; Starlite at Rp100k since 2025", "Trigger only", P.ink],
  ["Accounting: only the cleansing", "Revenue flat, only counts and ARPU moving", "Revenue fell −1.6% (2025) and −3.8% (1H26); per paying home −3.5% in two quarters with the stock constant", "Rejected as whole story", P.mid],
  ["Saturation", "Few new fixed homes anywhere", "Penetration 18–21%; market +1.28M a year; IndiHome + Surge added 2.2–2.6M in 12 months", "Rejected", P.mid],
  ["Shift to fixed wireless", "New homes choosing wireless", "78.3% of Surge's base is fiber; fiber is >90–94% of connections; Surge cut its wireless target from 3M to 1M", "Rejected", P.mid],
  ["Industry-wide ARPU slide", "Rivals' ARPU falling alike", "Surge's blended ARPU is Rp70–108k; XLSmart and Indosat fixed ARPU not published", "Partial", P.dark],
  ["IndiHome is a worse network", "Losses where the quality gap is largest", "1 of 50 urban vs 18 of 45 rural vs 30 of 30 Maluku–Papua award slots; 4th of 8 on urban consistent quality; churn by area not public", "Plausible for urban", P.dark],
  ["Hidden churn", "Non-payers spread across tenure and home types", "Stock built during a volume push with activation-paid incentives and no deposit; gross adds not disclosed", "Partly true", P.dark],
  ["Bundle revenue allocation", "IndiHome ARPU falling fastest where convergence is highest", "Pattern fits (mobile up, fixed down, 59–65% converged) but the allocation rule is not disclosed", "Not testable", P.slate],
  ["Convergence follows engagement", "Converged counts jump when matching changes", "4Q25: +420k converged on +63k net adds; the 2Q26 split cannot tell the stories apart", "Cannot rule out", P.slate],
  ["Shift to single-play", "Revenue per home falls with mix", "Each 2P → 1P move is −Rp125k a month; ~525k moves a year would explain the likeliest price-mix fall", "Partly true, in spend", P.dark],
];
[[0, 6, "(1/2)"], [6, 11, "(2/2)"]].forEach(([a, b, part]) => {
  A.push({ n: "5 " + part, title: "Rival explanations: eleven alternatives tested against the evidence " + part, source: "File 02 §3: Telkomsel AR 2025 (S03); Telkom 1H26 Info Memo (S04); Opensignal (S14); Surge disclosures (S48, S58, S60); MPA (S24)", build: async (s, pres) => {
    text(s, "**Explanation**", { x: 0.3, y: 0.9, w: 1.7, h: 0.2, fontSize: 6.6, color: P.slate });
    text(s, "**If it were the cause, we would see…**", { x: 2.05, y: 0.9, w: 2.0, h: 0.2, fontSize: 6.6, color: P.slate });
    text(s, "**What the numbers show**", { x: 4.1, y: 0.9, w: 4.0, h: 0.2, fontSize: 6.6, color: P.slate });
    text(s, "**Verdict**", { x: 8.2, y: 0.9, w: 1.5, h: 0.2, fontSize: 6.6, color: P.slate, align: "center" });
    rivals.slice(a, b).forEach(([nm, pred, ev, ver, col], i) => {
      const y = 1.14 + i * 0.66;
      card(s, pres, 0.3, y, 9.4, 0.58, { fill: i % 2 ? P.paper : P.light, line: P.line, radius: 0.05, shadow: false, name: "rival " + nm });
      text(s, "**R" + (a + i + 1) + " · " + nm + "**", { x: 0.38, y, w: 1.65, h: 0.58, fontSize: 6.8, valign: "middle" });
      text(s, pred, { x: 2.05, y, w: 2.0, h: 0.58, fontSize: 6.3, color: P.slate, valign: "middle" });
      text(s, ev, { x: 4.1, y, w: 4.0, h: 0.58, fontSize: 6.3, valign: "middle" });
      pillTag(s, pres, 8.2, y + 0.16, 1.42, 0.26, ver, col, 6);
    });
    if (part === "(2/2)") text(s, "**Conclusion:** external forces set the Rp100k price point and squeezed 2025 spending, yet none explains the combination of 0.8–1.2M inactive accounts outside the mobile relationship, homes paying near the entry price, a bundle with little saving and no routing across five propositions. Those four are internal and controllable.", { x: 0.3, y: 4.5, w: 9.4, h: 0.6, fontSize: 6.6, valign: "middle" });
  }});
});

// ---------- Appendix 6: market sizing and value pools ----------
A.push({ n: "6", title: "Market sizing and value pools: where the unconnected homes are and what each pool is worth", source: "Media Partners Asia (S24); Komdigi (S21); BPS via GoodStats and Mandiri Institute (S50, S51); Telkom 1H26 Info Memo (S04); our calculation and estimate", build: async (s, pres) => {
  sub(s, "Households (millions)", 0.3, 0.92, 3.6);
  const bars = [["All households", 73, 73, P.ink, "73M"], ["Without fixed broadband", 58, 60, P.accent, "≈58–60M"], ["Telkomsel mobile families without fixed broadband", 26, 36, P.dark, "26–36M est."], ["With fixed broadband", 13.0, 15.3, P.slate, "13.0–15.3M"], ["Telkomsel paying base", 9.1, 9.5, P.mid, "9.1–9.5M"]];
  bars.forEach(([l, lo, hi, c, lab], i) => {
    const y = 1.15 + i * 0.44;
    text(s, l, { x: 0.3, y, w: 3.6, h: 0.16, fontSize: 6.3, color: P.slate });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: y + 0.17, w: lo / 73 * 2.6, h: 0.17, fill: { color: c }, line: { type: "none" }, objectName: "pool bar" });
    if (hi > lo) s.addShape(pres.shapes.RECTANGLE, { x: 0.3 + lo / 73 * 2.6, y: y + 0.17, w: (hi - lo) / 73 * 2.6, h: 0.17, fill: { color: c, transparency: 60 }, line: { type: "none" }, objectName: "pool range" });
    text(s, "**" + lab + "**", { x: 0.35 + hi / 73 * 2.6, y: y + 0.15, w: 0.9, h: 0.2, fontSize: 6.6, valign: "middle" });
  });
  card(s, pres, 0.3, 3.4, 3.6, 1.75, { fill: P.light, shadow: false, name: "class" });
  text(s, "**Who the next homes are** (est.)\nToday's fixed market is roughly the middle and upper classes (≈12.9M homes). The next ~20M homes must come mostly from the **aspiring middle class (≈36.0M)**, whose budgets sit near the **Rp100–150k** the regulator uses as the rural household telecom budget. Policy targets **50% by 2029** (≈5.3M homes a year) against a market forecast of **+1.28M a year**.",
    { x: 0.4, y: 3.44, w: 3.42, h: 1.68, fontSize: 6.3, valign: "top" });
  sub(s, "Value pools Telkomsel could capture", 4.1, 0.92, 5.6);
  table(s, 4.1, 1.15, 5.6, [
    ["Pool", "Size", "Value signal", "Right to win", "Appeal"],
    ["Telkomsel mobile families without fixed broadband", "26–36M est.", "≈Rp117–156k a month of phone data, 50–70% of which moves to home Wi-Fi", "High", "High"],
    ["Fair share of market growth", "794–934k homes a year", "≈Rp2.0–2.4T a year at today's revenue per account", "Medium", "High"],
    ["Convergence depth in existing homes", "3.345M homes without a line", "Up to ≈Rp1.85T a year, higher margin", "High", "High"],
    ["Reactivation of removed homes", "0.8–1.2M, already wired", "Not sized", "Medium", "Medium"],
    ["Idle fiber", "~40% utilised; ~1.2M released ports", "Lower cost per extra home if terms allow", "High (group)", "Medium"],
    ["Household outcomes (Wi-Fi, safety, gaming)", "86% of 1,000 parents interested in controls", "≈Rp183–337bn a year per 1% FTTR attach", "Medium-high", "Medium"],
    ["Home micro-businesses", "IndiBiz 756k", "Not sized", "Medium", "Route out"],
  ], { colW: [1.45, 1.05, 1.75, 0.75, 0.6], fontSize: 5.8, rowH: 0.3 });
  text(s, "Rp100k anchor: a Rp100k fiber line pays only below ≈Rp90k of incremental cost; budget homes are a cost-to-serve question, served selectively (P8).", { x: 4.1, y: 4.65, w: 5.6, h: 0.45, fontSize: 6.2, italic: true, color: P.slate, valign: "middle" });
}});

// ---------- Appendix 7: competitors ----------
A.push({ n: "7", title: "Competitors: prices, measured quality and same-window growth of the main rivals", source: "Surge disclosures (S48, S49, S58, S60, S70); Indosat (S29, S68); XLSmart (S16, S69); Opensignal (S14); price comparisons (S28); Telkomsel app (S45)", build: async (s, pres) => {
  sub(s, "Surge (WIFI) customers, millions", 0.3, 0.92, 3.2);
  chart(s, pres, "bar", 0.25, 1.12, 3.3, 2.1, [
    { name: "2Q25", labels: ["Starlite fiber", "Internet Rakyat (FWA)"], values: [0.39, 0] },
    { name: "2Q26", labels: ["Starlite fiber", "Internet Rakyat (FWA)"], values: [1.85, 0.513] },
  ], { colors: [P.mid, P.accent], legend: true, min: 0, max: 2.2, major: 0.5, fmt: "0.00", gap: 50 });
  card(s, pres, 0.3, 3.3, 3.2, 1.85, { fill: P.light, shadow: false, name: "surge" });
  text(s, "**Surge in one view**\n**+1.98M** homes in 12 months: 3.0× (1.2M reading) to 7.8× (0.8M reading) IndiHome's underlying growth.\nTake-up ~61% of homes passed (fiber), ~57% (FWA); ~165k adds a month.\n2026 guidance **2.1M fiber + 1M FWA** (cut from 3M), ~8M by 2028; blended ARPU **Rp70–108k**.\nMoving up-market: **Prime 500 Mbps Rp168k**, **Super 2 Gbps Rp250k**, Combo fiber + FWA.",
    { x: 0.4, y: 3.34, w: 3.02, h: 1.78, fontSize: 6.2, valign: "top", paraSpaceAfter: 2 });
  sub(s, "Who competes for the home connection", 3.7, 0.92, 6.0);
  table(s, 3.7, 1.15, 6.0, [
    ["Rival", "Model", "Price (monthly)", "Measured experience", "Scale"],
    ["Surge: Starlite, Internet Rakyat", "Fiber + licensed 1.4 GHz FWA", "Rp100k for 200 Mbps fiber or 100 Mbps FWA, VAT incl.", "Not in Opensignal panel", "2.36M (Jun 2026)"],
    ["Indosat: HiFi, HiFi Air", "Fiber + self-install FWA", "HiFi 100 Mbps Rp345k*; HiFi Air 125 GB Rp100k", "Best consistent quality (69.7%)", "~400k homes; 1M HiFi Air target"],
    ["XLSmart: XL SATU, First Media", "Fiber + mobile (converged)", "Joy 100 Mbps Rp350k*; XL Home Biz Rp419k", "Best reliability (496.8)", "~1.0M fixed"],
    ["Biznet", "Fiber specialist", "100 Mbps Rp375k; ~Rp150k in small cities", "Fastest download (41.0 Mbps)", "City by city"],
    ["Oxygen.id / MyRepublic", "Fiber; MyRepublic Air FWA", "Nova 100 Mbps Rp482k*; Air from Rp100k", "Fastest upload (29.6 Mbps)", "Merging"],
    ["IndiHome (Telkomsel)", "Fiber, widest reach", "100 Mbps Rp270k (Jakarta Selatan, app)", "Reliability 351.1, 7th of 8", "9.513M"],
    ["Informal and satellite", "RT/RW Net; Starlink", "Very cheap / premium remote", "n/a", "Tens of thousands of resellers"],
  ], { colW: [1.25, 1.05, 1.55, 1.15, 1.0], fontSize: 5.7, rowH: 0.32 });
  text(s, "* older press prices; VAT basis unclear. The low-price front is fiber more than wireless; the quality front is regional (XL SATU in West Java, Kalimantan, Sulawesi; HiFi in Jakarta; GlobalXtreme in Bali-Nusra).", { x: 3.7, y: 4.8, w: 6.0, h: 0.35, fontSize: 6, italic: true, color: P.slate, valign: "middle" });
}});

// ---------- Appendix 8: measured experience ----------
A.push({ n: "8", title: "Measured experience: Opensignal award slots and IndiHome's urban profile against seven rivals", source: "Opensignal, Indonesia Fixed Broadband Experience, 1 Jan–31 Mar 2026 (S14); award slots counted by script", build: async (s, pres) => {
  sub(s, "Award slots won by IndiHome", 0.3, 0.92, 3.6);
  const sl = [["National views", 0, 10], ["Urban, outside Maluku–Papua", 1, 50], ["Rural, outside Maluku–Papua", 18, 45], ["Maluku and Papua", 30, 30]];
  sl.forEach(([l, w2, t], i) => {
    const y = 1.2 + i * 0.62;
    text(s, l, { x: 0.3, y, w: 3.6, h: 0.18, fontSize: 6.6 });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: y + 0.2, w: 2.7, h: 0.2, fill: { color: P.light }, line: { color: P.line, width: 0.5 }, objectName: "slot total" });
    if (w2 > 0) s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: y + 0.2, w: 2.7 * w2 / t, h: 0.2, fill: { color: i === 3 ? P.ink : P.accent }, line: { type: "none" }, objectName: "slot won" });
    text(s, "**" + w2 + " of " + t + "**", { x: 3.05, y: y + 0.18, w: 0.85, h: 0.24, fontSize: 7.5, valign: "middle" });
  });
  text(s, "Rural wins outside Maluku–Papua: all five in Banten and Yogyakarta, some in five more regions; Banten rural has IndiHome as the only ISP measured.", { x: 0.3, y: 3.75, w: 3.6, h: 0.5, fontSize: 6.1, italic: true, color: P.slate });
  sub(s, "Rank and gap to the leader (8 ISPs)", 4.1, 0.92, 5.6);
  const mets = [
    ["National reliability (points)", "351.1", "496.8 (XL SATU)", 7, "−29%"], ["National consistent quality", "57.8%", "69.7% (Indosat HiFi)", 5, "−11.9 pts"], ["National download", "26.2 Mbps", "41.0 (Biznet)", 7, "−36%"], ["National upload", "12.9 Mbps", "29.6 (Oxygen.id)", 8, "−56%"], ["National video (0–100)", "66.0", "70.3 (Oxygen.id)", 6, "−4.3 pts"],
    ["Urban consistent quality", "58.8%", "69.9%", 4, "−15.9%"], ["Urban download", "26.4 Mbps", "40.8", 7, "−35.3%"], ["Urban upload", "13.3 Mbps", "30.5", 8, "−56.4%"],
  ];
  mets.forEach(([m, v, ld, r, g], i) => {
    const y = 1.15 + i * 0.4;
    card(s, pres, 4.1, y, 5.6, 0.34, { fill: i % 2 ? P.paper : P.light, shadow: false, radius: 0.03, name: "met" });
    text(s, m, { x: 4.17, y, w: 1.55, h: 0.34, fontSize: 6.3, valign: "middle", bold: i >= 5 });
    text(s, "**" + v + "**", { x: 5.72, y, w: 0.72, h: 0.34, fontSize: 6.4, valign: "middle" });
    for (let d = 1; d <= 8; d++) {
      const on = d === r;
      s.addShape(pres.shapes.OVAL, { x: 6.48 + (d - 1) * 0.19, y: y + 0.09, w: 0.15, h: 0.15, fill: { color: on ? P.accent : P.paper }, line: { color: on ? P.accent : P.line, width: 0.5 }, objectName: "dot" });
    }
    text(s, ld, { x: 8.05, y, w: 1.05, h: 0.34, fontSize: 5.8, color: P.slate, valign: "middle" });
    text(s, "**" + g + "**", { x: 9.05, y, w: 0.6, h: 0.34, fontSize: 6.3, color: P.accent, align: "right", valign: "middle" });
  });
  card(s, pres, 4.1, 4.4, 5.6, 0.75, { fill: P.paper, line: P.line, shadow: false, name: "caveat" });
  text(s, "**Reading:** averages reflect the plan mix (many low-speed legacy plans), but reliability and consistency depend less on plan speed. The gap splits between the network (group fiber) and the home (router, Wi-Fi coverage, ONT), where Telkomsel can act alone and already sells fixes (ONT upgrades, Ultra Mesh, FTTR).",
    { x: 4.18, y: 4.42, w: 5.45, h: 0.71, fontSize: 6.2, valign: "middle" });
}});

// ---------- Appendix 9: digital mystery shop ----------
A.push({ n: "9", title: "Digital mystery shop: what five Telkomsel product pages tell a household about which product fits", source: "Telkomsel web pages read 10 Oct 2026: /indihome, /orbit, /eznet, /eznet-wireless, /one (S65); MyTelkomsel app (S45)", build: async (s, pres) => {
  const pg = [
    ["IndiHome", "None: \"Cek Jangkauan\" returns IndiHome plans only", "Device counts per card (1–6 … 1–12)", "Double Speed 200 on 100 Mbps Rp280k … 500 on 300 Mbps Rp500k; **180 or 360 days**; Rp50k installation promo", "The boost is time-limited; plan names mix boosted and base speeds"],
    ["Orbit", "None: \"lihat modem Telkomsel Orbit lainnya\" points to other Orbit modems", "\"Paket modem WiFi spesial **untuk semua**\"", "Devices Rp445k–Rp2,339k; 30-day packs 45 GB Rp82k to 300 GB Rp410k; prices vary by location", "No target household named"],
    ["EZnet", "One path: FAQ says upgrade by moving to IndiHome", "\"Internet rumah murah dan mudah **untuk semua**\"", "Card 20 Mbps Rp170k; FAQ still 10 Mbps Rp150k; ex-VAT; 12 months, Rp1M exit fee", "Contradicts itself; shows an expired promotion"],
    ["EZnet Wireless", "None: no comparison with Orbit, IndiHome or EZnet", "\"Fleksibel tanpa kontrak jangka panjang\"", "50 Mbps Rp170k + admin fee, ex-VAT; 350 GB then 5 Mbps; modem lent; postpaid", "The opposite model to Orbit for the same household job"],
    ["Telkomsel One", "None: one line for the whole brand", "\"Untuk keluarga\"", "Dynamic Rp270k / Rp350k; Complete Rp405–730k; Easy Rp120k; installation Rp150k; VAT basis not stated", "No Double Speed; device for the Orbit quota not stated"],
  ];
  pg.forEach(([nm, guide, who, shows, note], i) => {
    const x = 0.3 + i * 1.89;
    await_gradient_header(s, x, nm);
    card(s, pres, x, 1.24, 1.82, 3.15, { fill: P.paper, line: P.line, radius: 0.05, name: "page card " + nm });
    text(s, "**Cross-product guidance**\n" + guide + "\n**Who it says it is for**\n" + who + "\n**What it shows**\n" + shows + "\n**Notable**\n" + note,
      { x: x + 0.07, y: 1.28, w: 1.68, h: 3.08, fontSize: 5.9, valign: "top", paraSpaceAfter: 1.5 });
    text(s, "✖ no routing tool", { x: x + 0.07, y: 4.42, w: 1.68, h: 0.18, fontSize: 6.3, bold: true, color: P.accent, align: "center" });
  });
  function await_gradient_header(slide, x, nm) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 0.92, w: 1.82, h: 0.28, rectRadius: 0.05, fill: { color: P.dark }, line: { type: "none" }, objectName: "head " + nm });
    text(slide, "**" + nm + "**", { x, y: 0.92, w: 1.82, h: 0.28, fontSize: 7.5, color: P.paper, align: "center", valign: "middle" });
  }
  card(s, pres, 0.3, 4.66, 9.4, 0.52, { fill: P.light, shadow: false, name: "so what" });
  text(s, "**So what:** none of the five pages routes a household between products; two say \"for everyone\"; two wireless products sell the same job on opposite models; prices appear on four VAT bases; bundle installation terms change by campaign (Rp150k vs a Rp50k standalone promo).",
    { x: 0.4, y: 4.66, w: 9.2, h: 0.52, fontSize: 6.4, valign: "middle" });
}});

// ---------- Appendix 10: spend ----------
A.push({ n: "10", title: "Spend: the price ladder, Telkomsel One against its parts, and what Double Speed lends", source: "Telkomsel app and web (S45, S46, S65); user-reported Super Seru pack prices (S47); OTT retail prices (S67, weak); Telkom 1H26 Info Memo (S04); our calculation", build: async (s, pres) => {
  sub(s, "Telkomsel One against IndiHome + a mobile pack, by VAT reading (% cheaper or dearer)", 0.3, 0.92, 5.0);
  const ax = 3.0, k = 0.12; // inches per percentage point
  line(s, pres, ax, 1.2, 0, 1.75, P.ink, 0.75);
  text(s, "cheaper ←", { x: ax - 1.2, y: 1.2, w: 1.15, h: 0.15, fontSize: 5.8, color: P.slate, align: "right" });
  text(s, "→ dearer", { x: ax + 0.05, y: 1.2, w: 1.0, h: 0.15, fontSize: 5.8, color: P.slate });
  const rr = [["50 Mbps + 15 GB, prices incl. VAT", -11.5, -10.0, P.dark], ["50 Mbps + 15 GB, web prices ex-VAT", -1.7, -0.1, P.mid], ["100 Mbps + 30 GB, prices incl. VAT", -4.1, -2.8, P.dark], ["100 Mbps + 30 GB, web prices ex-VAT", 6.4, 7.9, P.accent]];
  rr.forEach(([l, a, b, c], i) => {
    const y = 1.4 + i * 0.38;
    text(s, l, { x: 0.3, y, w: 1.25, h: 0.32, fontSize: 5.9, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: ax + a * k, y: y + 0.08, w: (b - a) * k, h: 0.16, fill: { color: c }, line: { type: "none" }, objectName: "range" });
    text(s, "**" + (a > 0 ? "+" : "") + a.toFixed(1) + " to " + (b > 0 ? "+" : "") + b.toFixed(1) + "%**", { x: 4.15, y, w: 1.15, h: 0.32, fontSize: 6.3, align: "left", valign: "middle", color: a > 0 ? P.accent : P.ink });
  });
  text(s, "Robust in both readings: at best a small saving, for less speed than standalone IndiHome with Double Speed, and a Rp150k installation fee against Rp50k standalone.", { x: 0.3, y: 2.98, w: 5.0, h: 0.3, fontSize: 6.1, italic: true, color: P.slate });
  sub(s, "From charging for extras to giving them away", 0.3, 3.33, 5.0);
  table(s, 0.3, 3.55, 5.0, [["Period", "What Telkomsel did with extras", "Effect"], ["2023–2024", "Triple-play as the norm; ARPU Rp253k → Rp238k", "Bundled extras carried ARPU"], ["2025", "Internet-only spreads; \"Higher Speed More Price\"; tiered OTT", "ARPU −10.1%; mix moves to 1P"], ["2026", "\"High Speed Same Price\": Double Speed for 180 or 360 days; Viu, Prime Video, Vision+ included", "Speed and some content free; Netflix +Rp30k, FTTR +Rp160–295k still paid"]],
    { colW: [0.7, 2.6, 1.7], fontSize: 5.9, rowH: 0.3 });
  sub(s, "What the base plan now contains", 5.5, 0.92, 4.2);
  const st = [["180 / 360 days", "Double Speed on 100–150 Mbps / 200–300 Mbps bases: a renewal cliff at month 6 or 12 unless designed as a choice"], ["≈Rp109–132k", "retail value of the three services in a Double Speed plan, 45–55% of the Rp240k price est."], ["−2.5% to +8.4%", "what the average home pays against the cheapest standalone plan, by base"], ["Rp27.0k", "one speed step ex-VAT (Rp240k → Rp270k incl. VAT), the unit the boost-end choice prices"]];
  st.forEach(([v, l], i) => {
    const y = 1.15 + i * 0.68;
    card(s, pres, 5.5, y, 4.2, 0.6, { fill: i % 2 ? P.paper : P.light, line: P.line, shadow: false, radius: 0.05, name: "st" });
    text(s, "**" + v + "**", { x: 5.58, y, w: 1.3, h: 0.6, fontSize: 9.5, color: P.accent, valign: "middle" });
    text(s, l, { x: 6.9, y, w: 2.75, h: 0.6, fontSize: 6.2, valign: "middle" });
  });
  card(s, pres, 5.5, 3.95, 4.2, 1.2, { fill: P.paper, line: P.accent, dash: true, shadow: false, name: "so what" });
  text(s, "**So what:** the things that could raise household spend (convergence, whole-home Wi-Fi, safety, content, a second location) are priced as add-ons per product, lent for a period, or not sold as household outcomes. Management chose HSSP \"to defend premium base\"; the issue is that its end is not designed.",
    { x: 5.6, y: 3.97, w: 4.02, h: 1.16, fontSize: 6.3, valign: "middle" });
}});

// ---------- Appendix 11: usage crossover ----------
A.push({ n: "11", title: "Usage crossover: monthly cost of each option by usage, and how robust the Orbit result is", source: "Telkomsel app and web (S45, S65); HiFi Air (S29); Starlite and Internet Rakyat (S60, S70); data yield (S04); Netflix (S59); PMK 131/2024 (S66); our calculation", build: async (s, pres) => {
  sub(s, "What each option costs a household a month (Rp k); cheapest option shaded", 0.3, 0.92, 9.4);
  const rows = [
    ["Monthly use", "Orbit", "HiFi Air", "EZnet Wireless", "EZnet fiber (card; FAQ)", "IndiHome entry", "Internet Rakyat", "Starlite fiber 200 Mbps", "Mobile data only"],
    ["25 GB", "66", "75", "188.7", "188.7 (166.5)", "240", "100", "100", "78"],
    ["50 GB", "100", "75", "188.7", "188.7 (166.5)", "240", "100", "100", "155"],
    ["100 GB", "176", "100", "188.7", "188.7 (166.5)", "240", "100", "100", "310"],
    ["150 GB", "232", "150", "188.7", "188.7 (166.5)", "240", "100", "100", "465"],
    ["250 GB", "352", "200", "188.7", "188.7 (166.5)", "240", "100", "100", "775"],
    ["450 GB", "642", "250", "188.7, slowed to 5 Mbps above 350 GB", "188.7 (166.5)", "240", "100", "100", "1,395"],
  ];
  const fills = {}; const cheap = { 1: [1], 2: [2], 3: [2, 6, 7], 4: [6, 7], 5: [6, 7], 6: [6, 7] };
  Object.entries(cheap).forEach(([r, cs]) => { fills[r] = {}; cs.forEach((c) => (fills[r][c] = "F8D3DA")); });
  table(s, 0.3, 1.15, 9.4, rows, { colW: [0.8, 0.8, 0.8, 1.45, 1.25, 0.9, 1.0, 1.25, 1.15], fontSize: 6.2, rowH: 0.27, align: ["left", "center", "center", "center", "center", "center", "center", "center", "center"], fills });
  text(s, "IndiHome incl. VAT (app); EZnet and EZnet Wireless Rp170k ex-VAT ×1.11 (EZnet Wireless adds admin and installation fees); Internet Rakyat and Starlite incl. VAT; Orbit and HiFi Air VAT basis not stated; mobile data at Rp3.11 per MB.", { x: 0.3, y: 3.1, w: 9.4, h: 0.28, fontSize: 5.9, italic: true, color: P.slate });
  sub(s, "Does the Orbit result depend on the weak 450–500 GB figure? A conservative family build-up", 0.3, 3.42, 5.4);
  table(s, 0.3, 3.65, 5.4, [["Component", "Basis", "GB a month"], ["Phones on home Wi-Fi", "4–6 members × 12.5 GB per Telkomsel customer", "50–75 est."], ["TV streaming", "2 hours a day × 30 days × 1–3 GB an hour (Netflix SD–HD)", "60–180 est."], ["**Family home, conservative**", "", "**≈110–255** est."]], { colW: [1.4, 2.9, 1.1], fontSize: 6.1, rowH: 0.27, align: ["left", "left", "center"] });
  card(s, pres, 5.9, 3.45, 3.8, 1.7, { fill: P.light, shadow: false, name: "reading" });
  text(s, "**Reading**\n· Within Telkomsel, Orbit is cheapest only up to **95 GB** (vs EZnet's FAQ price) or **125 GB** (vs Rp188.7k).\n· Above ~155 GB Orbit costs more than IndiHome; at 450 GB **2.7×**.\n· EZnet Wireless already sells heavy wireless use at Rp0.54k per GB.\n· So Orbit fits light, flexible or temporary homes: the issue is positioning, and the technology works. An unlimited Orbit plan at Rp150k (2025 press) was not seen on 10 Oct; Phase 0 checks it.",
    { x: 6.0, y: 3.48, w: 3.62, h: 1.64, fontSize: 6, valign: "top" });
}});

// ---------- Appendix 12: households ----------
A.push({ n: "12", title: "Households: needs, product fit and what each household type is worth to Telkomsel", source: "File 02 §8: BPS via GoodStats (S50, S51); tSurvey in Telkomsel AR 2025 (S03); Telkom 1H26 Info Memo (S04); IESPA and Kadin (S54); our calculation and estimate", build: async (s, pres) => {
  sub(s, "Product fit by household need: ✔ good · ~ partial · ✖ poor", 0.3, 0.92, 6.1);
  const hm = [
    ["Need (size)", "Orbit", "EZnet Wireless", "EZnet fiber", "IndiHome", "Telkomsel One", "Best-fit rival today"],
    ["First connection, tight budget (most of ≈58–60M)", "~", "~", "~", "✖", "~", "Starlite / Internet Rakyat"],
    ["Flexible or temporary living (9.29M non-owners)", "✔", "~", "✖", "✖", "~", "HiFi Air"],
    ["Connected families (4–5 people: 46.5%)", "✖", "~", "~", "✔", "~", "HiFi / XL SATU; Starlite Prime"],
    ["Performance: gaming, hybrid work (~68M gamers)", "✖", "✖", "✖", "~", "✖", "Biznet / Oxygen.id"],
    ["Large or premium homes (≈12.9M)", "✖", "✖", "✖", "✔", "~", "XL SATU; Starlite Super"],
    ["Fiber-dark or remote homes", "~", "~", "✖", "✔", "~", "Starlink"],
    ["Home micro-business (66M MSMEs)", "✖", "✖", "✖", "~", "✖", "XL Home Biz"],
  ];
  const map = { "✔": "CFE8D8", "~": "FBEFD3", "✖": "F8D3DA" };
  const fills = {}; hm.forEach((r, ri) => { if (ri) { fills[ri] = {}; r.forEach((c, ci) => { if (map[c]) fills[ri][ci] = map[c]; }); } });
  table(s, 0.3, 1.15, 6.1, hm, { colW: [1.85, 0.55, 0.75, 0.65, 0.65, 0.75, 0.9], fontSize: 5.9, rowH: 0.34, align: ["left", "center", "center", "center", "center", "center", "left"], fills });
  text(s, "Every need has a Telkomsel product that fits at least partly, but the best fit differs by need, two wireless products compete for the same homes, and nothing routes a household to the right one.", { x: 0.3, y: 4.0, w: 6.1, h: 0.36, fontSize: 6.1, italic: true, color: P.slate });
  sub(s, "Revenue to Telkomsel a year (Rp M, ex-VAT)", 6.6, 0.92, 3.1);
  const hv = [["IndiHome 100 Mbps + 3 Telkomsel lines", 4.58, P.accent, "Rp4.58M est."], ["IndiHome 100 Mbps only", 2.92, P.dark, "Rp2.92M"], ["IndiHome 75 Mbps only", 2.59, P.dark, "Rp2.59M"], ["Orbit light user", 1.2, P.slate, "Rp0.79–1.20M"], ["Inactive account", 0, P.mid, "negative"]];
  hv.forEach(([l, v, c, lab], i) => {
    const y = 1.15 + i * 0.5;
    text(s, l, { x: 6.6, y, w: 3.1, h: 0.17, fontSize: 6.2, color: P.slate });
    if (v) s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: y + 0.19, w: v / 4.58 * 2.2, h: 0.18, fill: { color: c }, line: { type: "none" }, objectName: "hv" });
    text(s, "**" + lab + "**", { x: 6.65 + v / 4.58 * 2.2, y: y + 0.17, w: 0.95, h: 0.22, fontSize: 6.6, valign: "middle" });
  });
  card(s, pres, 6.6, 3.7, 3.1, 1.45, { fill: P.light, shadow: false, name: "jtbd" });
  text(s, "**Jobs households describe**\n\"Keep everyone online at once.\" · \"Connect us now, without a contract, while we rent.\" · \"Stop topping up phone data.\" · \"Keep the kids safe online.\" · \"Let me work or game without lag.\" · \"Make the Wi-Fi reach every room.\"\nA converged family is worth **≈1.6–1.8×** a fiber-only home; an inactive account destroys value.",
    { x: 6.68, y: 3.73, w: 2.95, h: 1.4, fontSize: 6, valign: "top" });
  card(s, pres, 0.3, 4.42, 6.1, 0.76, { fill: P.paper, line: P.line, shadow: false, name: "pain" });
  text(s, "**Pain points along the journey:** five brands with no \"which one is for me\" · coverage check shows IndiHome only · four VAT bases · installation Rp150k bundle vs Rp50k standalone, Orbit device Rp385k+ · below rivals on measured experience in cities · a speed cliff when a boost ends · Rp100k unlimited options within reach.",
    { x: 0.38, y: 4.44, w: 5.95, h: 0.72, fontSize: 6.1, valign: "middle" });
}});

// ---------- Appendix 13: offload and one household's path ----------
A.push({ n: "13", title: "Offload: what a first home connection is worth to Telkomsel, and one household's path in rupiah", source: "Telkom 1H26 Info Memo, data yield and payload (S04); file 02 §5.5; file 03 §8.7; model output; our estimate", build: async (s, pres) => {
  sub(s, "A 3–4-line Telkomsel family, Rp k a month (est.)", 0.3, 0.92, 4.5);
  const wf = [["Phone data today", 117, 156, P.ink], ["Moves to home Wi-Fi (50–70%)", 58, 109, P.accent], ["Stays on mobile", 59, 47, P.mid]];
  wf.forEach(([l, a, b, c], i) => {
    const y = 1.2 + i * 0.52;
    text(s, l, { x: 0.3, y, w: 1.6, h: 0.42, fontSize: 6.5, valign: "middle" });
    s.addShape(pres.shapes.RECTANGLE, { x: 1.95, y: y + 0.1, w: Math.max(a, b) / 156 * 2.2, h: 0.22, fill: { color: c }, line: { type: "none" }, objectName: "wf" });
    text(s, "**" + (i === 2 ? "≈Rp47–59k" : "≈Rp" + a + "–" + b + "k") + "**", { x: 2.0 + Math.max(a, b) / 156 * 2.2, y, w: 0.85, h: 0.42, fontSize: 6.6, valign: "middle" });
  });
  table(s, 0.3, 2.85, 4.5, [["Who connects the home", "Effect on Telkomsel per family a month"], ["A rival (e.g. Rp100k Starlite)", "**Loses ≈Rp58–109k** of mobile data revenue, gains nothing"], ["Telkomsel at a Rp100k price (Rp90.1k ex-VAT)", "**Net ≈−Rp19k to +Rp32k**"], ["Telkomsel at IndiHome's entry price (Rp216.2k ex-VAT)", "**Net ≈+Rp107k to +Rp158k**, if the family pays it"]],
    { colW: [2.0, 2.5], fontSize: 6.2, rowH: 0.3 });
  text(s, "Offload happens whoever connects the home, so winning the home protects the home revenue and, by Telkomsel's account, the family's lines; it does not protect phone-data spend.", { x: 0.3, y: 4.15, w: 4.5, h: 0.45, fontSize: 6.1, italic: true, color: P.slate });
  sub(s, "One household's path, contribution a month (est.)", 5.0, 0.92, 4.7);
  table(s, 5.0, 1.15, 4.7, [["Step", "Revenue vs mobile-only", "Contribution vs mobile-only", "Contribution vs a rival connecting"], ["Orbit start (Rp90.1k)", "+Rp6.5k (Rp90.1k − Rp83.6k offload)", "**−Rp24.9k**", "**+Rp19.4k**"], ["Moves to IndiHome (Rp216.2k)", "+Rp132.6k", "**+Rp2.2k**", "**+Rp46.5k**"], ["Adds one line on the household plan", "", "**+Rp19.8k**", "**+Rp19.8k**"]],
    { colW: [1.3, 1.3, 1.0, 1.1], fontSize: 6.1, rowH: 0.34, align: ["left", "center", "center", "center"] });
  card(s, pres, 5.0, 2.65, 4.7, 1.0, { fill: P.light, shadow: false, name: "orbit econ" });
  text(s, "**Orbit's own economics:** per 100k Orbit starts, **≈37.9k** move to fiber within five years at the base conversion rate, each paying back its trade-in and installation through the higher fiber price. An Orbit start breaks even against a mobile-only family at a **49%** margin (the model uses 21.5%).",
    { x: 5.08, y: 2.67, w: 4.55, h: 0.96, fontSize: 6.2, valign: "middle" });
  card(s, pres, 5.0, 3.75, 4.7, 1.4, { fill: P.paper, line: P.accent, dash: true, shadow: false, name: "so what" });
  text(s, "**So what for the solution**\n· The home check targets Telkomsel families **a rival is about to connect**: they pay from month one.\n· Connecting a family that would stay mobile-only pays only once it reaches IndiHome and adds lines.\n· The value comes after the first connection: ladder steps, family lines and homes kept.",
    { x: 5.1, y: 3.78, w: 4.52, h: 1.35, fontSize: 6.3, valign: "top" });
}});

// ---------- Appendix 14: root cause ----------
A.push({ n: "14", title: "Root cause: issue tree, five whys and fishbone converge on one governing cause", source: "File 02 §11: issue tree on the household value equation, five whys, fishbone", build: async (s, pres) => {
  sub(s, "Five whys: three routes to one mechanism", 0.3, 0.92, 9.4);
  const chains = [
    ["Through pricing: why did value per household fall?", ["ARPU −15.6% in two years; per paying home −3.5% in two quarters after the stock stopped growing", "Mix moved to internet-only and entry tiers; speed and content added at the same price", "Each product's price point defended against Rp100k by giving more (HSSP)", "Each product judged on its own ARPU and line count", "No one measured on what the household pays across products and over time"]],
    ["Through targets: why did inactive accounts pile up?", ["0.8–1.2M accounts brought in no revenue and were removed", "Acquired on activation-paid incentives, postpaid with no deposit, mostly outside the mobile relationship", "Growth targets set in lines (800k–1M a year), with no paying-home test", "Inherited line economics: fiber bought per line, growth reported in lines", "No household-level measure for targets and incentives to follow"]],
    ["Through channels: why are rivals winning the new homes?", ["Rp100k fiber and FWA undercut on price; better-rated fiber wins in cities", "IndiHome's margin is thin and urban experience trails; Orbit priced for light use", "Roles follow network and tier; no offer built around a household leaving phone data", "The mobile relationship was not the acquisition channel", "Fixed and mobile run and counted separately; no one owns the household with both"]],
  ];
  for (let c = 0; c < 3; c++) {
    const x = 0.3 + c * 3.17;
    await banner(s, x, 1.15, 3.07, 0.32, chains[c][0], { fontSize: 6.6, from: [P.accent, P.dark, P.ink][c], to: [P.dark, P.ink, P.slate][c] });
    chains[c][1].forEach((t, i) => {
      const y = 1.53 + i * 0.5;
      card(s, pres, x, y, 3.07, 0.44, { fill: i === 4 ? "FDECEF" : P.paper, line: i === 4 ? P.accent : P.line, radius: 0.04, shadow: false, name: "why" });
      text(s, (i === 0 ? "" : "**Why?** ") + t, { x: x + 0.07, y, w: 2.93, h: 0.44, fontSize: 6, valign: "middle", bold: i === 4 });
    });
  }
  await gradient(s, 0.3, 4.08, 9.4, 0.5, P.ink, P.dark, { radius: 0.05, name: "governing" });
  text(s, "**Governing cause:** Telkomsel runs households on inherited line economics (targets in lines, KPIs per product, fiber bought per line) while the market has repriced a line at Rp100k. No one is measured on what a household is worth across products and over time.",
    { x: 0.4, y: 4.08, w: 9.2, h: 0.5, fontSize: 6.6, color: P.paper, valign: "middle" });
  table(s, 0.3, 4.65, 9.4, [["Fishbone", "Product", "Price", "Place and channel", "People and process", "Technology", "Measurement", "Policy and market"], ["Lands in", "Role and entry", "Spend; role", "Entry; role", "Entry; delivery", "Delivery and cost", "Governing cause", "Context"]],
    { colW: [0.9, 1.15, 1.1, 1.25, 1.25, 1.25, 1.25, 1.25], fontSize: 5.9, rowH: 0.24, align: ["left", "center", "center", "center", "center", "center", "center", "center"] });
}});

module.exports = A;
