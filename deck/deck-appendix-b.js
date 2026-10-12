// deck-appendix-b.js: Appendix 15–28 and references. Data: file 02 v4.1, file 03 v2.1, model-v4 output.
const { P, PILLAR, FONT, W, M, text, card, gradient, badge, table, banner, chart, sub } = require("./deck-lib");

const line = (s, pres, x, y, w, h, color = P.mid, width = 1, o = {}) =>
  s.addShape(pres.shapes.LINE, { x, y, w, h, flipH: !!o.flipH, line: { color, width, dashType: o.dash ? "dash" : "solid", endArrowType: o.arrow ? "triangle" : undefined }, objectName: "line" });

const B = [];

// ---------- Appendix 15: gap analysis and governing cause ----------
B.push({ n: "15", title: "Gap analysis and governing cause: current against ideal, tested against Telkom's \"Maximize LTV\"", source: "File 02 §11.1, §6.7; Telkom 1H26 Info Memo p.43, p.47 (S04); Telkomsel web (S65); Bisnis on targets (S62)", build: async (s, pres) => {
  table(s, 0.3, 0.95, 6.2, [
    ["#", "Dimension", "Current condition", "Ideal condition"],
    ["1", "Product roles", "Roles by tier and network; no routing tool on 5 pages; Orbit and EZnet Wireless sell one job two ways; Orbit counted as mobile", "Every home routed by need and location, with a visible path between products"],
    ["2", "Entry terms", "0.8–1.2M inactive accounts (59–88% of 18 months' net adds); activation-paid incentives; postpaid, no deposit", "Every new account a paying household, on terms that surface non-payment early"],
    ["3", "Entry channel", "1H25 net growth almost all in homes without a Telkomsel line; 26–36M unconnected homes are Telkomsel families est.", "New homes come mainly through the mobile relationship"],
    ["4", "Value per household", "Average home −2.5% to +8.4% vs the entry price; speed lent 180–360 days", "Spend rises through things the family values and pays for"],
    ["5", "Convergence", "59% → 65% overlap, mostly a denominator effect; bundle at best a small saving", "Converging is the better deal; depth is measured"],
    ["6", "Paths", "EZnet → IndiHome only in an FAQ; boost expiry not designed", "Each household has a designed next step"],
    ["7", "Experience", "1 of 50 urban award slots; 7th download, 8th upload, 4th consistent quality", "At or above rivals where they compete"],
    ["8", "Cost to serve", "Per-line wholesale fee on a ~40%-utilised network; Orbit heavy packs at average cost per GB est.", "Technology and price matched to usage and spare capacity"],
  ], { colW: [0.25, 0.95, 2.65, 2.35], fontSize: 5.8, rowH: 0.42 });
  sub(s, "Is it an org chart or a measurement problem?", 6.7, 0.92, 3.0);
  card(s, pres, 6.7, 1.15, 3.0, 1.45, { fill: P.light, shadow: false, name: "evidence" });
  text(s, "**Evidence it is measurement:** Orbit counted as mobile, IndiHome as fixed, EZnet inside IndiHome · targets in lines (800k–1M a year) · convergence measured as overlap · fiber leased per line.\n**Evidence against an org-chart problem:** one VP for home broadband and FMC marketing already exists.",
    { x: 6.78, y: 1.18, w: 2.85, h: 1.4, fontSize: 6, valign: "top", paraSpaceAfter: 2 });
  sub(s, "Falsification test: would a household-managed Telkomsel show…", 6.7, 2.68, 3.0, { h: 0.3 });
  const ft = [["Routing in its channels", "✖", "✖"], ["A bundle that rewards converging", "✖", "✖"], ["Targets in paying homes", "✔ billing-linked incentives", "✖"]];
  table(s, 6.7, 3.02, 3.0, [["Expected sign", "In the 2026 plan", "On the web"], ...ft, ["**Score**", "**1 of 3**", "**0 of 3**"]], { colW: [1.3, 0.95, 0.75], fontSize: 5.9, rowH: 0.27, align: ["left", "center", "center"] });
  card(s, pres, 6.7, 4.45, 3.0, 0.72, { fill: P.paper, line: P.accent, dash: true, shadow: false, name: "ltv" });
  text(s, "Telkom already names **\"Maximize LTV\"** for IndiHome; the levers and published KPIs still work product by product. If stores and 188 route consistently (Phase 0 mystery shop), the cause narrows to measurement.", { x: 6.78, y: 4.47, w: 2.85, h: 0.68, fontSize: 5.9, valign: "middle" });
}});

// ---------- Appendix 16: prioritisation ----------
B.push({ n: "16", title: "Prioritisation: one value tree, scoring rules and how the ranking holds under 69 tests", source: "File 02 §13: year-3 run-rate of a 5% step on each driver's own lever; scores by stated rules; sensitivity by script", build: async (s, pres) => {
  sub(s, "Weighted score by driver (0–5)", 0.3, 0.92, 3.9);
  chart(s, pres, "bar", 0.25, 1.12, 4.0, 2.3, [{ name: "Score", labels: ["Roles by network and tier", "Experience where contested", "No designed path", "Acquisition outside mobile", "Extras given away or lent", "Bundle gives little reason"], values: [4.05, 3.8, 3.8, 3.65, 3.6, 3.0] }],
    { dir: "bar", colors: [P.accent], min: 0, max: 5, major: 1, fmt: "0.00", gap: 40, catFont: 6, extra: { catAxisOrientation: "maxMin" } });
  text(s, "Unscored (size unknown): entry terms 3.15–4.35; cost not matched to usage 2.20–3.40.", { x: 0.3, y: 3.45, w: 3.9, h: 0.2, fontSize: 5.9, italic: true, color: P.slate });
  table(s, 0.3, 3.7, 3.9, [["Score band", "5", "4", "3", "2"], ["Significance (year-3 value)", "≥ Rp1T", "Rp0.25–1T", "Rp0.1–0.25T", "< Rp0.1T"], ["Urgency", "Exploited now", "≤ 12 months", "1–3 years", "None"], ["Controllability", "Own levers", "Mostly own", "Shared", "Outside"], ["Evidence", "Primary, quantified", "Primary, partial", "Estimated", "Hypothesis"]],
    { colW: [1.3, 0.65, 0.65, 0.65, 0.65], fontSize: 5.8, rowH: 0.27, align: ["left", "center", "center", "center", "center"] });
  sub(s, "Driver values and scores (weights 40 / 25 / 20 / 15)", 4.45, 0.92, 5.25);
  table(s, 4.45, 1.15, 5.25, [
    ["Driver", "Year-3 value est.", "Sig.", "Urg.", "Ctrl.", "Evid.", "Score"],
    ["Roles by network and tier", "Rp64–235bn", "3", "5", "5", "4", "**4.05**"],
    ["Experience where contested", "Rp464–696bn", "4", "4", "3", "4", "**3.80**"],
    ["No designed path", "Rp264bn", "4", "3", "5", "3", "**3.80**"],
    ["Acquisition outside mobile", "−Rp22bn to +Rp256bn", "3", "4", "5", "3", "**3.65**"],
    ["Extras given away or lent", "Rp154bn", "3", "4", "4", "4", "**3.60**"],
    ["Bundle gives little reason", "Rp92bn", "2", "3", "5", "3", "**3.00**"],
  ], { colW: [1.6, 1.15, 0.45, 0.45, 0.45, 0.45, 0.7], fontSize: 5.9, rowH: 0.26, align: ["left", "center", "center", "center", "center", "center", "center"] });
  sub(s, "Does the ranking survive? 69 tests", 4.45, 3.1, 5.25);
  table(s, 4.45, 3.33, 5.25, [["Test", "Top driver", "Role and entry branch first?"], ["5 weight sets", "Roles in 4 of 5", "5 of 5"], ["48 one-point changes", "Roles alone in 41", "48 of 48"], ["12 two-band significance changes", "Roles in 7 of 12", "12 of 12"], ["4 cases of acquisition value", "Roles in all 4", "Yes"], ["Unscored drivers at their extremes (20)", "n/a", "17 of 20 (3 exceptions, significance-heavy)"]],
    { colW: [2.0, 1.25, 2.0], fontSize: 5.9, rowH: 0.25, align: ["left", "center", "center"] });
}});

// ---------- Appendix 17: SWOT and TOWS ----------
B.push({ n: "17", title: "SWOT with a so-what and the TOWS moves mapped to H, O and M", source: "File 02 §15; Opensignal (S14); Telkom 1H26 Info Memo (S04); Surge (S48, S58, S60); MPA (S24); Komdigi (S21)", build: async (s, pres) => {
  const q = [
    ["Strengths", P.dark, "Widest reach; only scale ISP in Maluku–Papua (30 of 30) · 153.5M mobile customers; 26–36M of their families unconnected est. · largest new 2.6 GHz block (80 MHz) · one bill and MyTelkomsel · CVM data at scale · group fiber ~40% utilised + ~1.2M released ports · EZnet Wireless proves cheap heavy wireless"],
    ["Weaknesses", P.slate, "No cross-product routing; nine overlapping offers · acquisition outside the mobile base; 0.8–1.2M inactive · 1 of 50 urban award slots, upload last · Orbit quota-priced, device upfront, \"for everyone\" · bundle saves little · thin margin, wholesale dependence est. · four VAT bases · capital rationed"],
    ["Opportunities", P.accent, "≈58–60M unconnected homes; ≈36M aspiring middle est. · policy 50% by 2029 · household outcomes (Wi-Fi, safety, gaming) · idle fiber to refill · migration paths (Globe benchmark) · 3.345M homes without a Telkomsel line · new spectrum from 2027 · the boost expiry as a designed moment"],
    ["Threats", P.ink, "Surge: 2.36M fixed customers, ~165k adds a month · HiFi Air and MyRepublic Air at ~Rp100k · quality-led fiber rivals in cities · regulatory price pressure · weaker 2026 consumer confidence · speed is a commodity · cheap fiber moving up-market · a rival connecting a Telkomsel family takes ≈Rp58–109k a month est."],
  ];
  q.forEach(([h, c, t], i) => {
    const x = 0.3 + (i % 2) * 2.95, y = 0.95 + Math.floor(i / 2) * 1.68;
    card(s, pres, x, y, 2.85, 1.6, { fill: P.paper, line: c, lineWidth: 1, radius: 0.06, name: "swot " + h });
    card(s, pres, x, y, 2.85, 0.26, { fill: c, radius: 0.06, shadow: false, name: "swot head" });
    text(s, "**" + h + "**", { x, y, w: 2.85, h: 0.26, fontSize: 7.5, color: P.paper, align: "center", valign: "middle" });
    text(s, t, { x: x + 0.07, y: y + 0.29, w: 2.71, h: 1.28, fontSize: 5.9, valign: "top" });
  });
  await banner(s, 0.3, 4.33, 5.8, 0.82, "So what: Telkomsel's rare strengths are household assets (reach, the family's phones, spectrum, data, idle fiber); its weaknesses sit in how homes are routed, acquired, priced and rewarded; the threats are price-led. Respond fit-led and relationship-led, with what rivals need years to copy; a price move is the one response they can always undercut.", { fontSize: 6.4, align: "left" });
  sub(s, "TOWS: the option space, mapped to the pillars", 6.3, 0.92, 3.4);
  const tows = [
    ["SO", "Use the mobile base and data to reach families already spending on phone data", "H"], ["SO", "Reach, idle fiber and new spectrum for fiber-dark and first-time homes, with a path to fiber", "H"], ["SO", "Sell household outcomes on top of reach", "O"],
    ["ST", "Make convergence the reward that keeps the family", "O"], ["ST", "Where rivals are absent, invest in quality and hold price", "M"], ["ST", "Defend mobile families before a rival connects their home", "H"],
    ["WO", "One routing logic across five products; distinct roles for Orbit and EZnet Wireless", "H"], ["WO", "Turn the boost expiry into a priced upgrade moment", "O"], ["WO", "Refill idle fiber through migration", "M"],
    ["WT", "Avoid a Rp100k headline price war; acquire only paying homes", "H"], ["WT", "Close the measured gap where rivals are strongest, inside the home first", "M"], ["WT", "One VAT-inclusive price everywhere", "H"],
  ];
  tows.forEach(([t, d, l], i) => {
    const y = 1.15 + i * 0.335;
    card(s, pres, 6.3, y, 3.4, 0.3, { fill: i % 2 ? P.paper : P.light, shadow: false, radius: 0.03, name: "tows" });
    text(s, "**" + t + "**", { x: 6.34, y, w: 0.3, h: 0.3, fontSize: 6, color: P.slate, valign: "middle" });
    text(s, d, { x: 6.64, y, w: 2.7, h: 0.3, fontSize: 5.7, valign: "middle" });
    badge(s, pres, 9.4, y + 0.04, 0.22, l, PILLAR[l].solid, 8);
  });
}});

// ---------- Appendix 18: roles and routing tree ----------
B.push({ n: "18", title: "Product roles and the routing tree: the job of each product and the five questions in order", source: "File 03 §3–4; usage crossover (Appendix 11); Telkomsel web (S65); case book (S01)", build: async (s, pres) => {
  table(s, 0.3, 0.95, 9.4, [
    ["Product", "Its job", "The household", "The promise", "How it differs (not price)"],
    ["**Orbit**", "**The flexible start**", "New, moving, renting or light homes (up to ~125 GB a month)", "Connected today; no installation; take it with you", "Portable; no contract; credit toward fiber when the home settles"],
    ["**EZnet Wireless**", "**The wireless home for heavy use**", "Heavy-use homes with no fiber, or not staying 12 months", "A large allowance (350 GB) on a monthly plan, modem lent", "Fixed location and a large allowance, unlike Orbit's portable packs"],
    ["**EZnet**", "**The settled light fiber home**", "Homes staying 12+ months, with fiber and light use", "Unlimited fiber at entry speed", "The first step on the fiber path"],
    ["**IndiHome**", "**The family's home hub**", "Settled homes with heavy use, TV streaming, work or gaming", "The whole home connected: every room, safe for children, fixed fast", "Whole-home Wi-Fi, parental controls, fix-time promise, performance tiers"],
    ["**Household plan** (Telkomsel One, reframed)", "**What ties the roles to the family**", "Families with 2+ Telkomsel lines on any home product", "One bill, shared family quota, household services", "Each added line adds quota and services; standalone installation terms"],
  ], { colW: [1.35, 1.45, 2.2, 2.15, 2.25], fontSize: 6, rowH: 0.38 });
  sub(s, "The check, in a fixed order", 0.3, 3.38, 4.6);
  table(s, 0.3, 3.6, 4.6, [["Step", "Question", "Answer → next"], ["1", "Stay at this address 12+ months?", "No → wireless only · Yes → step 2"], ["2", "Fiber available, with a spare port?", "No → wireless · Yes → fiber"], ["3", "How much will the home use?", "From consented phone data, or a short quiz"], ["4", "How many devices; how big is the home?", "6+ devices → Wi-Fi check, mesh or FTTR"], ["5", "How many Telkomsel lines?", "2+ → household plan"]],
    { colW: [0.35, 2.1, 2.15], fontSize: 5.9, rowH: 0.25, align: ["center", "left", "left"] });
  sub(s, "How a household moves between them", 5.1, 3.38, 4.6);
  const mv = [["Mobile-only family, rival nearby", "Orbit start → EZnet or IndiHome when use > ~125 GB or it settles"], ["Renting, heavy use", "EZnet Wireless → IndiHome when it settles and fiber arrives"], ["Settled, fiber, light use", "EZnet → IndiHome as use and family grow"], ["Any home + 2 Telkomsel lines", "Household plan: shared quota, safety, one bill"], ["Any home about to leave", "A better-fitting plan, offered only to keep it"]];
  mv.forEach(([a, b], i) => {
    const y = 3.6 + i * 0.31;
    card(s, pres, 5.1, y, 1.65, 0.27, { fill: P.dark, radius: 0.04, shadow: false, name: "mv" });
    text(s, "**" + a + "**", { x: 5.14, y, w: 1.57, h: 0.27, fontSize: 5.6, color: P.paper, valign: "middle" });
    line(s, pres, 6.75, y + 0.135, 0.15, 0, P.mid, 1, { arrow: true });
    text(s, b, { x: 6.95, y, w: 2.75, h: 0.27, fontSize: 5.9, valign: "middle" });
  });
}});

// ---------- Appendix 19: initiatives and owners ----------
B.push({ n: "19", title: "Initiatives and owners: what each pillar changes, who delivers it and when it starts", source: "File 03 §5, §7.5; VP titles as reported (S11, S30, S62); other functions generic", build: async (s, pres) => {
  const cols = [
    ["H", [["Household-fit check in every channel", "Build Nov 2026–Jan 2027; pilot 1H27"], ["Stated roles; fewer overlapping offers", "Phase 0 quick win"], ["Targeted, opt-in home check for Telkomsel families", "Pilot 1H27"], ["Pay sales on homes paying at 3 and 12 months", "1H27"]]],
    ["O", [["Designed paths: Orbit → fiber with modem trade-in, EZnet → IndiHome, single → family", "2H27"], ["Boost-end choice: keep the speed for a fee, take an outcome pack, or return to base, with 30 days' notice", "Randomised test from Jan 2027"], ["Household plan: each added line adds shared quota and services", "2H27"]]],
    ["M", [["Home Wi-Fi promise: Wi-Fi check, mesh for 75k at-risk homes a year, fix-time promise", "Pilot 1H27; contested cities 2028"], ["Retention triggers with a 10–20% random hold-out", "Pilot 1H27; national 2H27"], ["Port fill and capacity-aware routing with the group", "2028 (not in the model's value)"]]],
    ["E", [["One household identity (consent)", "1H27"], ["Household KPIs and targets; an Orbit baseline", "2027 KPI contracts"], ["One owner of household value; shared bonus pool", "Named in Phase 0"]]],
  ];
  for (let c = 0; c < 4; c++) {
    const [l, items] = cols[c];
    const x = 0.3 + c * 2.37;
    await gradient(s, x, 0.95, 2.3, 0.3, PILLAR[l].from, PILLAR[l].to, { radius: 0.05, name: "head " + l });
    text(s, "**" + l + " · " + PILLAR[l].word + "**", { x, y: 0.95, w: 2.3, h: 0.3, fontSize: 7, color: P.paper, align: "center", valign: "middle" });
    items.forEach(([t, when], i) => {
      const y = 1.32 + i * 0.6;
      card(s, pres, x, y, 2.3, 0.54, { fill: P.paper, line: P.line, radius: 0.04, name: "init" });
      text(s, t, { x: x + 0.06, y: y + 0.02, w: 2.18, h: 0.34, fontSize: 5.9, valign: "middle" });
      text(s, "**" + when + "**", { x: x + 0.06, y: y + 0.36, w: 2.18, h: 0.16, fontSize: 5.6, color: P.accent, valign: "middle" });
    });
  }
  sub(s, "Who does what (RACI, short form)", 0.3, 3.75, 9.4);
  table(s, 0.3, 3.97, 9.4, [
    ["Initiative", "Accountable", "Delivers", "Consulted"],
    ["Fit check; stated roles", "VP Home Broadband & FMC Consumer Marketing", "Digital channels; product marketing", "InfraNexia (port data); legal"],
    ["Home check; triggers; paths", "VP Household Consumer Business Strategy Management", "CVM", "Data protection officer"],
    ["Pay on paying homes", "Head of sales and channels", "Sales operations", "Finance"],
    ["Boost-end choice; household plan", "VP Home Broadband & FMC Consumer Marketing", "Billing and IT; product marketing (FMC)", "Legal (consumer notice); mobile marketing"],
    ["Wi-Fi promise; port fill", "Network and CPE operations", "Field operations; InfraNexia", "Finance"],
    ["Household identity, KPIs, owner", "Household P&L owner (CEO office)", "IT and data; finance", "Telkom reporting"],
  ], { colW: [2.0, 3.0, 2.3, 2.1], fontSize: 5.7, rowH: 0.17 });
}});

// ---------- Appendix 20: gates and KPIs ----------
B.push({ n: "20", title: "Gates and KPIs: pass marks at 60% of plan, randomised tests and targets for 2028 and 2031", source: "File 03 §7.3–7.4; model-v4 output: 55% of plan = zero life value, 60% = +Rp45bn", build: async (s, pres) => {
  sub(s, "Gate ladder: one unit for model and gate", 0.3, 0.92, 5.6);
  table(s, 0.3, 1.15, 5.6, [
    ["Gate", "KPI (model's unit)", "Plan", "Pass mark", "Measured by"],
    ["Gate 1 · Jun 2027", "Expiring homes choosing to pay at boost end", "8%", "**≥ 4.8%**", "National randomised test"],
    ["", "Home-check opt-in × conversion", "10% × 10%", "**≥ 0.6%**", "Pilot areas"],
    ["", "New homes paying at 3 months", "quality", "**≥ 95%**", "Pilot billing"],
    ["", "Save rate on triggered homes vs hold-out", "10%", "**≥ 6%**", "Hold-out"],
    ["", "EZnet → IndiHome / single → family steps a year", "3% / 0.5%", "**≥ 1.8% / 0.3%**", "Randomised offer vs hold-out"],
    ["", "Lines added a year in homes without one", "2%", "**≥ 1.2%**", "Randomised offer vs hold-out"],
    ["Gate 1b · Dec 2027 / Jun 2028", "Churn in Wi-Fi-promise and triggered homes vs hold-out", "−1pp", "**≥ −0.6pp**", "50k–150k homes per arm"],
    ["Gate 2 · Dec 2028", "Household KPIs monthly; Orbit baseline; programme EBITDA run-rate", "Rp65bn (2029)", "**≥ 0**", "Finance; cost cap in tranches"],
  ], { colW: [1.05, 2.0, 0.75, 0.8, 1.0], fontSize: 5.7, rowH: 0.32, fills: { 1: { 0: "FDECEF" }, 2: { 0: "FDECEF" }, 3: { 0: "FDECEF" }, 4: { 0: "FDECEF" }, 5: { 0: "FDECEF" }, 6: { 0: "FDECEF" } } });
  card(s, pres, 0.3, 4.15, 5.6, 1.02, { fill: P.light, shadow: false, name: "why 60" });
  text(s, "**Why 60%:** if every take-up input lands at **55% of plan**, the life-of-homes value is zero; at 60% it is **+Rp45bn**. The pass mark is joint (switching off any one lever still leaves the value positive). At the pass mark the 5-year NPV is −Rp197bn; it reaches zero only at **112% of plan**. If Gate 1 fails, national spend stops with about **Rp98bn** of cash spent.",
    { x: 0.4, y: 4.17, w: 5.42, h: 0.98, fontSize: 6.1, valign: "middle" });
  sub(s, "KPI targets (net stocks after churn) est.", 6.1, 0.92, 3.6);
  table(s, 6.1, 1.15, 3.6, [["KPI", "Today", "2028", "2031"], ["Paying homes won through fit", "0", "73k", "**213k**"], ["Homes kept", "0", "59k", "**204k**"], ["Homes paying for a chosen extra at boost end", "0", "114k", "**114k**"], ["Telkomsel lines added in homes without one", "0", "67k", "**197k**"], ["Orbit starts moved to fiber", "0", "1k", "**22k**"], ["EZnet → IndiHome and single → family steps", "0", "90k", "**267k**"], ["Household value per paying home", "Not measured", "Baseline", "Rising"]],
    { colW: [1.85, 0.6, 0.55, 0.6], fontSize: 5.9, rowH: 0.3, align: ["left", "center", "center", "center"] });
  card(s, pres, 6.1, 3.75, 3.6, 1.42, { fill: P.paper, line: P.accent, dash: true, shadow: false, name: "case kpis" });
  text(s, "**The case's own impact terms** (est., 2031)\n· Subscriber conversion: **22k** Orbit homes on fiber; **267k** ladder steps\n· ARPU uplift: **Rp415bn** a year from paths, boost-end choice and the plan\n· Retention: **204k** homes kept; **−1pp** churn in contested cities\n· FMC adoption: **197k** lines added\n· Incremental revenue: **Rp1,134bn** a year",
    { x: 6.2, y: 3.78, w: 3.45, h: 1.37, fontSize: 6, valign: "top" });
}});

// ---------- Appendix 21 (1/2): model structure ----------
B.push({ n: "21 (1/2)", title: "Financial model: structure, comparator and the contribution logic", source: "File 03 §8.1; model-v4 (base case identical to model-v3)", build: async (s, pres) => {
  const flow = [["Inputs", "Pools, take-up rates, prices, acquisition costs, churn 20%, programme costs"], ["Stocks", "Yearly cohorts of homes, payers and lines; churn 20% a year, boost payers lapse 15%"], ["Revenue", "Each lever on its own pool; offload netted where the family would stay mobile-only"], ["Contribution", "Each revenue type earns the margin of the costs that move with it"], ["Cash", "EBITDA − capex − tax at 22% (capex over five years)"], ["Value", "5-year NPV and life-of-homes NPV at 10%"]];
  flow.forEach(([h, t], i) => {
    const x = 0.3 + i * 1.57;
    s.addShape(i === 0 ? pres.shapes.PENTAGON : pres.shapes.CHEVRON, { x, y: 0.98, w: 1.6, h: 0.42, fill: { color: [P.ink, P.slate, P.dark, P.accent, P.dark, P.ink][i] }, line: { type: "none" }, objectName: "flow" });
    text(s, "**" + h + "**", { x: x + 0.15, y: 0.98, w: 1.3, h: 0.42, fontSize: 7.5, color: P.paper, align: "center", valign: "middle" });
    card(s, pres, x + 0.05, 1.47, 1.45, 0.95, { fill: P.light, shadow: false, radius: 0.04, name: "flow text" });
    text(s, t, { x: x + 0.1, y: 1.5, w: 1.35, h: 0.89, fontSize: 5.9, valign: "middle", align: "center" });
  });
  sub(s, "Contribution margins by revenue type", 0.3, 2.55, 4.6);
  table(s, 0.3, 2.78, 4.6, [["Revenue type", "Margin", "Why"], ["New fiber homes and homes kept", "**21.5%**", "Household EBITDA margin; the fiber fee is paid per line"], ["Orbit starts", "**21.5%** (15–49% tested)", "Conservative placeholder; no per-line fiber fee"], ["Upgrades on an existing line", "**70%**", "Little extra cost; network ~40% utilised"], ["Content, TV and outcome packs", "**40%**", "Net of content revenue share"], ["Added mobile lines", "**53%** less 10% for plan benefits", "Mobile EBITDA margin"]],
    { colW: [1.55, 1.1, 1.95], fontSize: 5.9, rowH: 0.3 });
  sub(s, "Comparator, horizon and ramps", 5.1, 2.55, 4.6);
  card(s, pres, 5.1, 2.78, 4.6, 2.38, { fill: P.paper, line: P.line, shadow: false, name: "comparator" });
  text(s, "**Do-nothing comparator:** the household base stays at today's run-rate, boosts revert silently, no price change; continued erosion would favour the plan.\n**Horizon:** programme years 2027–2031 carry new homes, take-up and all costs; run-off 2032–2041 keeps only homes already won as they churn off (no new homes, IT running cost only): a conservative alternative to a perpetual terminal value.\n**Ramps follow the plan:** fit 26.5% in 2027, 80% in 2028, 100% from 2029; paths, plan and triggers from 2H27; Wi-Fi promise 5% in 2027, 60% in 2028; the boost-end test covers 75% of the 2027 legacy cohort.\n**Money:** Rp bn ex-VAT; discount rate 10% (9–12% tested); 2027 tax credit offset against Telkomsel's profit.",
    { x: 5.2, y: 2.81, w: 4.42, h: 2.32, fontSize: 5.9, valign: "top", paraSpaceAfter: 2 });
}});

// ---------- Appendix 21 (2/2): inputs ----------
B.push({ n: "21 (2/2)", title: "Financial model: inputs, the pool each applies to, test values and anchors", source: "File 03 §8.2–8.3; Telkom 1H26 Info Memo (S04); Telkomsel app and web (S45, S65); MPA (S24); BRI Danareksa (S61)", build: async (s, pres) => {
  table(s, 0.3, 0.92, 9.4, [
    ["Input", "Pool it applies to", "Base", "Test values", "Basis"],
    ["Home-check invitations a year", "Telkomsel families without fixed broadband (26–36M)", "6.0M", "3.0–9.0M", "assumption: a fifth of the pool a year"],
    ["Opt-in × conversion", "Invited families", "10% × 10%", "5–15% each", "assumption; measured in the pilot"],
    ["Better fit with other families", "Non-Telkomsel new homes (1.28M × 47.5%)", "+2 points", "1–3", "assumption; market growth (MPA)"],
    ["Home-check families who would stay mobile-only", "Home-check homes", "30%", "20–50%", "assumption; targeted at rival areas"],
    ["Start product and price", "Fit homes", "50% Orbit Rp90.1k; 50% fiber Rp190k", "Orbit Rp59.5–120k; fiber Rp170–216.2k", "Telkomsel prices, ex-VAT"],
    ["Acquisition cost: Orbit / fiber via mobile / other channels", "New homes", "Rp150k / 400k / 750k", "100–250 / 250–600 / 500–1,000", "assumption; no public figure"],
    ["Offload per affected family", "Mobile-only counterfactual homes", "Rp83.6k a month", "Rp58.3–108.9k", "estimate"],
    ["Routing-down leakage", "500k normal new homes a year", "2%", "1–10%", "assumption; price fences"],
    ["Boost cohorts expiring", "Legacy 2027 / recurring from 2028", "20% of base / 500k a year", "10–35% / 250–750k", "assumption; sized in Phase 0"],
    ["Boost-end paid take-up / lapse", "Expiring homes / payers", "8% / 15% a year", "4–12% / 10–25%", "assumption; randomised test"],
    ["Orbit → fiber a year; trade-in", "Orbit starts", "15%; Rp150k + Rp50k refurbishment", "8–25%", "assumption"],
    ["EZnet → IndiHome / single → family a year", "EZnet homes (15% of base) / the base", "3% / 0.5%", "1.5–5% / 0.25–1%", "assumption; steps Rp46.2k / Rp125k"],
    ["Lines added a year", "3.345M homes without a Telkomsel line", "2%", "1–3%", "assumption"],
    ["Wi-Fi promise churn effect", "Contested cities, 35% of base", "−1pp", "−0.5 to −1.5pp", "assumption; Gate 1b"],
    ["Triggers: reach × would-leave × save", "The base", "10% × 40% × 10%", "reach and save 5–15%", "assumption; hold-out"],
    ["Annual churn; discount rate", "All stocks; cash flows", "20%; 10%", "15–25%; 9–12%", "assumption"],
    ["Capex 2027–2031", "Fit check Rp80bn, data platform Rp80bn, mesh Rp135bn", "**Rp295bn**", "data Rp60–120bn; mesh Rp500–800k a home", "bottom-up estimate"],
    ["Running costs", "Marketing Rp40bn (half reallocated), IT Rp15bn, office Rp5bn a year", "≈Rp60bn a year", "marketing Rp25–75bn", "bottom-up estimate"],
  ], { colW: [2.0, 2.45, 1.6, 1.6, 1.75], fontSize: 5.6, rowH: 0.225 });
}});

// ---------- Appendix 22: results ----------
B.push({ n: "22", title: "Financial results: yearly cash flow, scenarios and the gate valued as an option", source: "Model-v4 output (file 03 §8.4–8.5); every figure is an estimate on stated assumptions", build: async (s, pres) => {
  sub(s, "Base case by year (Rp bn) est.", 0.3, 0.92, 9.4);
  table(s, 0.3, 1.15, 9.4, [
    ["Year", "Fit homes (net)", "Homes kept (net)", "EBITDA: fit", "Paths", "Boost-end", "Household plan", "Keep", "Programme costs", "EBITDA", "Capex", "Free cash flow", "Cumulative"],
    ["2027", "19k", "11k", "−4", "3", "10", "2", "−1", "−86", "**−75**", "80", "**−135**", "−135"],
    ["2028", "73k", "59k", "−10", "20", "20", "10", "8", "−60", "**−11**", "95", "**−96**", "−231"],
    ["2029", "131k", "119k", "−4", "52", "20", "22", "35", "−60", "**65**", "55", "**6**", "−225"],
    ["2030", "177k", "166k", "5", "84", "20", "34", "62", "−60", "**145**", "55", "**71**", "−154"],
    ["2031", "213k", "204k", "12", "111", "20", "43", "84", "−60", "**210**", "10", "**167**", "**12**"],
  ], { colW: [0.5, 0.85, 0.85, 0.7, 0.55, 0.7, 0.85, 0.55, 0.95, 0.65, 0.55, 0.9, 0.75], fontSize: 6, rowH: 0.26, align: Array(13).fill("center") });
  text(s, "2031 revenue **Rp1,134bn**: fit Rp328bn less Rp49bn of offloaded mobile data · paths Rp278bn · boost-end Rp37bn · household plan Rp100bn · keep Rp441bn, about 4.4% of today's ≈Rp25.6T household revenue. Tax: −20 (2027), −10, 4, 19, 33. Components are rounded in the model output, so some rows differ from their totals by Rp1bn.", { x: 0.3, y: 2.78, w: 9.4, h: 0.3, fontSize: 6.1, color: P.slate, valign: "middle" });
  sub(s, "Scenarios (Rp bn)", 0.3, 3.12, 5.0);
  table(s, 0.3, 3.35, 5.0, [["Measure", "Base", "Every input at its worse end (ungated)", "Every input at its better end"], ["5-year NPV (2027–2031)", "**−46**", "−618", "1,301"], ["NPV over the life of the homes won", "**394**", "−655", "3,597"], ["Cash payback", "**2031**", "Not reached", "2028"], ["Lowest cumulative cash", "**−231** (2028)", "−823", "n/a"], ["IRR / B/C, life-of-homes cash flows", "**35.1% / 2.95**", "", ""]],
    { colW: [1.6, 0.85, 1.45, 1.1], fontSize: 6, rowH: 0.25, align: ["left", "center", "center", "center"] });
  sub(s, "The gate as an option: expected life-of-homes NPV", 5.5, 3.12, 4.2);
  chart(s, pres, "bar", 5.45, 3.3, 4.25, 1.85, [{ name: "Expected NPV", labels: ["40% chance of passing", "60%", "80%", "Base (pass)"], values: [116, 208, 301, 394] }],
    { colors: [P.accent], min: 0, max: 450, major: 100, gap: 50 });
  text(s, "If Gate 1 fails: Rp98bn of cash (PV −Rp69bn after tax); at most Rp133bn if all 2027 capex and training had gone first.", { x: 0.3, y: 5.06, w: 5.0, h: 0.16, fontSize: 5.8, italic: true, color: P.slate });
}});

// ---------- Appendix 23: sensitivity ----------
B.push({ n: "23", title: "Sensitivity: the inputs that move NPV most, the break-evens and the known biases", source: "Model-v4 output: tornado on the 5-year NPV (base −Rp46bn), each input alone at its worse and better test value; break-evens one input at a time", build: async (s, pres) => {
  sub(s, "Tornado on the 5-year NPV (Rp bn), sorted by absolute swing", 0.3, 0.92, 5.9);
  const t = [["Margin on new fiber and kept homes (12–31%)", -132, 41], ["Single → family steps (0.25–1%)", -94, 50], ["Incremental marketing (Rp75–25bn)", -137, -7], ["Trigger deadweight (10–0%)", -129, -46], ["Routing-down leakage (10–1%)", -104, -38], ["Content and pack margin (30–50%)", -77, -14], ["EZnet → IndiHome steps (1.5–5%)", -72, -11], ["Lines added (1–3%)", -76, -16], ["Trigger save rate (5–15%)", -74, -18], ["Trigger reach (5–15%)", -74, -18], ["Wi-Fi promise effect (−0.5 to −1.5pp)", -74, -18], ["Boost-end take-up (4–12%)", -72, -19], ["Orbit margin (15–49%)", -55, -5], ["Mesh cost per home (Rp800–500k)", -76, -31], ["Data platform capex (Rp120–60bn)", -75, -31], ["Annual churn (25–15%)", -66, -24]];
  const ax0 = 4.75, kk = 0.0185, base = -46; // x for NPV = 0, inches per Rp bn
  const xOf = (v) => ax0 + v * kk;
  line(s, pres, xOf(base), 1.15, 0, 3.9, P.ink, 1);
  line(s, pres, xOf(0), 1.15, 0, 3.9, P.line, 0.75, { dash: true });
  text(s, "base −46", { x: xOf(base) - 0.4, y: 5.05, w: 0.8, h: 0.13, fontSize: 5.6, color: P.ink, align: "center" });
  text(s, "0", { x: xOf(0) - 0.2, y: 5.05, w: 0.4, h: 0.13, fontSize: 5.6, color: P.slate, align: "center" });
  t.forEach(([l, w0, b0], i) => {
    const y = 1.17 + i * 0.24;
    text(s, l, { x: 0.3, y, w: 1.4, h: 0.22, fontSize: 5.4, valign: "middle", align: "right" });
    s.addShape(pres.shapes.RECTANGLE, { x: xOf(w0), y: y + 0.04, w: (base - w0) * kk, h: 0.15, fill: { color: P.mid }, line: { type: "none" }, objectName: "worse" });
    if (b0 > base) s.addShape(pres.shapes.RECTANGLE, { x: xOf(base), y: y + 0.04, w: (b0 - base) * kk, h: 0.15, fill: { color: P.accent }, line: { type: "none" }, objectName: "better" });
    text(s, String(w0), { x: xOf(w0) - 0.42, y, w: 0.4, h: 0.22, fontSize: 5.4, color: P.slate, align: "right", valign: "middle" });
    text(s, String(b0), { x: xOf(Math.max(b0, base)) + 0.03, y, w: 0.4, h: 0.22, fontSize: 5.4, color: P.ink, valign: "middle" });
  });
  sub(s, "Break-evens (5-year NPV = 0, one input at a time)", 6.4, 0.92, 3.3);
  table(s, 6.4, 1.15, 3.3, [["Input", "Plan", "Break-even"], ["Boost-end take-up", "8%", "14.9%"], ["Trigger save rate", "10%", "18.2%"], ["Wi-Fi promise effect", "1pp", "1.82pp"], ["Margin on new and kept homes", "21.5%", "25.8%"], ["Lines added a year", "2%", "3.54%"], ["EZnet steps a year", "3%", "5.62%"], ["Single → family a year", "0.5%", "0.74%"], ["Incremental marketing", "Rp40bn", "Rp22bn"]],
    { colW: [1.7, 0.75, 0.85], fontSize: 5.8, rowH: 0.23, align: ["left", "center", "center"] });
  card(s, pres, 6.4, 3.35, 3.3, 1.82, { fill: P.light, shadow: false, name: "biases" });
  text(s, "**Life-of-homes view and known biases**\n· Value stays positive down to a **4.2%** margin and to **55% of plan** on every take-up at once.\n· Conservative: Orbit at the fixed-line margin (at 35%, life NPV **Rp435bn**).\n· Optimistic: 5% deadweight and saved homes churning at 30% → **Rp272bn**; half of step-ups would happen anyway → **Rp227bn** (Rp164bn with half the lines too). Step rates are therefore measured as lift over a hold-out.\n· Leakage breaks the case only at **28%**.",
    { x: 6.48, y: 3.38, w: 3.15, h: 1.77, fontSize: 5.8, valign: "top" });
}});

// ---------- Appendix 24: value split ----------
B.push({ n: "24", title: "Value split: what each pillar is worth, the reconciliation, and the price-led comparator", source: "Model-v4 output: value = life-of-homes NPV lost with the move switched off; reconciliation; price comparator (9.513M × Rp10k × 12, ex-VAT)", build: async (s, pres) => {
  sub(s, "From the moves to the total (life-of-homes NPV, Rp bn) est.", 0.3, 0.92, 6.0);
  const st = [["Fit", 53, P.accent], ["Paths: single → family", 213, P.dark], ["Paths: EZnet → IndiHome", 121, P.dark], ["Paths: Orbit → fiber", 4, P.dark], ["Household plan", 125, "C2566C"], ["Boost-end choice", 71, "E58C9C"], ["Keep", 174, P.ink], ["Costs no move owns", -363, P.mid], ["Interaction", -4, P.mid], ["Total", 394, P.accent]];
  const base = 4.55, k = 3.1 / 761, bw = 0.46, gap = 0.12;
  let lvl = 0;
  st.forEach(([l, v, c], i) => {
    const x = 0.35 + i * (bw + gap);
    const lo = l === "Total" ? 0 : Math.min(lvl, lvl + v), hi = l === "Total" ? v : Math.max(lvl, lvl + v);
    s.addShape(pres.shapes.RECTANGLE, { x, y: base - hi * k, w: bw, h: Math.max((hi - lo) * k, 0.012), fill: { color: c }, line: { type: "none" }, objectName: "wf " + l });
    text(s, "**" + (v > 0 && l !== "Total" ? "+" : "") + (v < 0 ? "−" + -v : v) + "**", { x: x - 0.1, y: base - hi * k - 0.17, w: bw + 0.2, h: 0.15, fontSize: 6.3, align: "center" });
    text(s, l, { x: x - 0.06, y: base + 0.03, w: bw + 0.12, h: 0.42, fontSize: 5.5, align: "center", color: P.slate });
    if (l !== "Total") lvl += v;
  });
  line(s, pres, 0.3, base, 5.8, 0, P.ink, 0.75);
  sub(s, "Reconciliation", 6.5, 0.92, 3.2);
  table(s, 6.5, 1.15, 3.2, [["Item", "Rp bn"], ["Fit", "53"], ["Paths (ladder 334 + Orbit 4)", "338"], ["Household plan", "125"], ["Boost-end choice", "71"], ["Keep", "174"], ["**Sum of moves**", "**761**"], ["Costs no move owns (platforms, marketing, office)", "−363"], ["Interaction", "−4"], ["**Total**", "**394**"]],
    { colW: [2.4, 0.8], fontSize: 6, rowH: 0.24, align: ["left", "right"] });
  await gradient(s, 6.5, 3.75, 3.2, 1.42, P.ink, P.dark, { radius: 0.06, name: "comparator" });
  text(s, "**The price-led alternative, in one line**\nEvery **Rp10k** off IndiHome across the base costs **≈Rp1,142bn a year**, nearly all of it margin because a price cut saves no cost: over five times the **Rp210bn** of EBITDA a year this plan adds by 2031. Holding price while meeting the Rp100k front with Orbit's flexible start is the core of \"without relying primarily on price competition\".",
    { x: 6.6, y: 3.78, w: 3.02, h: 1.36, fontSize: 6, color: P.paper, valign: "middle" });
}});

// ---------- Appendix 25 (1/2): risks ----------
B.push({ n: "25 (1/2)", title: "Risks: twelve risks with early warnings, triggers and the actions they set off", source: "File 03 §9; NPV at stake from the model-v4 tornado", build: async (s, pres) => {
  const risks = [
    ["1", "Routing down cannibalises revenue", "M · H", "Revenue per paying home, pilot vs control", "Leakage > 5% → tighten price fences; Orbit not shown to settled heavy homes with fiber", "Rp46bn life value at 5%"],
    ["2", "Boost-end backlash", "M · M", "Complaints, churn in the test arm", "Take-up < 4.8% at month 3 → outcome packs as default; never a silent cut", "Rp53bn"],
    ["3", "Rival price response", "H · M", "Churn where a rival builds", "Rival build detected → triggers and Wi-Fi checks there first; no headline cut", "Rp56bn"],
    ["4", "Data protection (PDP law)", "M · H", "Opt-in rate; complaints", "Opt-in < 5% → simplify consent; no location data without a lawful basis", "Home-check volume"],
    ["5", "Wholesale cost makes budget fiber uneconomic", "M · M", "Incremental cost per budget home", "Above ≈Rp90k → budget homes to Orbit only", "Not modelled"],
    ["6", "Teams resist household KPIs", "H · H", "KPI adoption in reviews", "Not in 2027 KPI contracts → Phase 0 does not exit; escalate", "All levers"],
    ["7", "Billing or IT slips", "M · M", "Test start date", "Slip > 1 month → run the test by SMS on one cohort", "Rp53bn"],
    ["8", "InfraNexia port data withheld", "M · M", "Agreement signed in Phase 0", "Not signed → availability only; EZnet where field teams confirm ports", "Fit volume"],
    ["9", "Agents ignore the fit check", "M · M", "Share of agent sales through the check", "< 60% → incentives only on sales made through it", "Fit volume"],
    ["10", "Offload larger than assumed", "H · M", "Mobile data revenue per converged family", "> Rp100k a month → target rival areas only", "Rp48bn"],
    ["11", "Capital rationing", "M · L", "Gate decisions", "Capex in tranches; mesh can slip a year", "Rp45bn (mesh)"],
    ["12", "Reallocated marketing not released", "M · M", "Budget transfers signed in Phase 0", "Not signed → P&L owner funds within the cap; roll-out waits", "Rp130bn swing"],
  ];
  table(s, 0.3, 0.92, 9.4, [["#", "Risk", "Likelihood · impact", "Early warning", "Trigger → action", "NPV at stake"], ...risks],
    { colW: [0.3, 2.0, 0.85, 1.85, 3.25, 1.15], fontSize: 5.8, rowH: 0.32, align: ["center", "left", "center", "left", "left", "left"], fills: { 6: { 2: "F8D3DA" }, 3: { 2: "FBEFD3" }, 10: { 2: "FBEFD3" } } });
}});

// ---------- Appendix 25 (2/2): feasibility and trade-offs ----------
B.push({ n: "25 (2/2)", title: "Feasibility and trade-offs: the constraint check and how the six objectives are balanced", source: "File 03 §10, §2–§9; Telkomsel AR 2025 cash flow (S03)", build: async (s, pres) => {
  sub(s, "Constraint check", 0.3, 0.92, 4.6);
  table(s, 0.3, 1.15, 4.6, [["Constraint", "Verdict", "Why"], ["Capital", "Feasible", "Rp295bn capex over five years, after the gates; 2025 free cash flow Rp22.5T, financing outflows Rp22.9T, so spend is phased"], ["Regulation", "With care", "Consent-based offers (PDP law); one VAT-inclusive price; notice before a boost ends"], ["Wholesale and group", "Partly ours", "Port-fill terms need the group; the plan works without them"], ["Technology", "Feasible", "Channel logic; household linking on existing CVM analytics"], ["Organisation", "Hardest part", "One P&L owner, KPI contracts, shared bonus pool"], ["Time", "Feasible", "Quick wins in weeks; boost-end test from Jan 2027; national by 2028"], ["Competition", "Defensible", "Fit, family relationship and reach are harder to copy than a price; XL SATU can copy convergence"]],
    { colW: [1.05, 0.8, 2.75], fontSize: 5.8, rowH: 0.42, fills: { 5: { 1: "F8D3DA" }, 2: { 1: "FBEFD3" }, 3: { 1: "FBEFD3" } } });
  sub(s, "Trade-offs between the case's six objectives, and how the plan sets them", 5.1, 0.92, 4.6);
  const tr = [["Acquisition vs margin", "Home Wi-Fi offloads phone data, so the home check targets families a rival is about to connect (they pay from month one)"], ["Affordability vs monetisation", "Orbit gives a no-commitment start; price fences keep routing-down leakage under 5% of new homes"], ["Retention vs monetisation", "Cheaper plans only to save a leaving home; a random hold-out measures the deadweight"], ["Experience vs capital", "Mesh only for 75k at-risk homes a year in contested cities, released in tranches after Gate 1b"], ["Differentiation vs simplicity", "Five products keep five distinct jobs; the nine overlapping offers are cut back"], ["Growth vs prudence", "Gates at 60% of plan: a failed pilot stops at about Rp98bn of cash"]];
  tr.forEach(([h, t], i) => {
    const y = 1.15 + i * 0.66;
    card(s, pres, 5.1, y, 4.6, 0.58, { fill: i % 2 ? P.paper : P.light, line: P.line, shadow: false, radius: 0.04, name: "tr" });
    text(s, "**" + h + "**", { x: 5.18, y, w: 1.35, h: 0.58, fontSize: 6.4, color: P.dark, valign: "middle" });
    text(s, t, { x: 6.55, y, w: 3.1, h: 0.58, fontSize: 6, valign: "middle" });
  });
}});

// ---------- Appendix 26: theme ----------
B.push({ n: "26", title: "Theme: how the solution creates lasting value responsibly, with a target for each commitment", source: "File 03 §6.2; file 02 §19; tSurvey in Telkomsel AR 2025 p.12 (S03); modem refurbishment p.159 (S03); PDP law UU 27/2022", build: async (s, pres) => {
  const th = [
    ["Fair terms", "Sales paid on homes that keep paying; no silent end to a boost", "Share of new homes paying at 12 months", "≥ 90% by 2028"],
    ["Price transparency", "One VAT-inclusive price everywhere", "Channels quoting the same price (mystery shop)", "100% by the end of Phase 0"],
    ["Digital inclusion", "A first connection without commitment; wireless homes where fiber is absent", "Orbit starts and the first-time share", "≈36k Orbit starts a year est.; first-time share in the fiber-dark pilot ≥ 60% of the Phase 0 estimate"],
    ["Child online safety", "Parental controls in the household plan (86% of 1,000 surveyed interested)", "Homes with active parental controls", "25% of household-plan homes by 2029"],
    ["Circularity", "Orbit modems traded in and refurbished on the path to fiber, beside 83.49 t of ONTs refurbished in 2025", "Devices refurbished", "Every traded-in modem (≈22k converted homes in 2031 est.)"],
    ["Data protection", "Consent-based household identity and offers", "Opt-in rate; data complaints", "Reported quarterly; zero data findings"],
    ["Lasting value", "Household lifetime value as the operating metric", "Household value per paying home", "Baseline 2027; rising every year"],
  ];
  th.forEach(([h, d, k, tg], i) => {
    const x = 0.3 + (i % 4) * 2.37, y = 0.95 + Math.floor(i / 4) * 2.1;
    card(s, pres, x, y, 2.3, 1.98, { fill: P.paper, line: P.line, radius: 0.06, name: "theme " + h });
    card(s, pres, x, y, 2.3, 0.3, { fill: [P.accent, P.dark, P.ink, P.slate][i % 4], radius: 0.06, shadow: false, name: "head" });
    text(s, "**" + h + "**", { x, y, w: 2.3, h: 0.3, fontSize: 7.2, color: P.paper, align: "center", valign: "middle" });
    text(s, d, { x: x + 0.08, y: y + 0.36, w: 2.14, h: 0.62, fontSize: 6, valign: "top" });
    text(s, "**KPI:** " + k, { x: x + 0.08, y: y + 1.0, w: 2.14, h: 0.38, fontSize: 5.9, color: P.slate, valign: "top" });
    card(s, pres, x + 0.08, y + 1.42, 2.14, 0.48, { fill: "FDECEF", radius: 0.04, shadow: false, name: "target" });
    text(s, "**Target:** " + tg, { x: x + 0.12, y: y + 1.42, w: 2.06, h: 0.48, fontSize: 5.9, valign: "middle" });
  });
  card(s, pres, 7.41, 3.05, 2.29, 1.98, { fill: P.light, shadow: false, radius: 0.06, name: "so what" });
  text(s, "**Do well and do good point the same way.** Homes on the right product, on fair terms, stay longer and step up: in the model, keeping homes and the paths up are worth **Rp512bn** over the life of the homes.", { x: 7.5, y: 3.08, w: 2.12, h: 1.92, fontSize: 6.3, valign: "middle" });
}});

// ---------- Appendix 27: assumptions (two pages) ----------
const asm = [
  ["Super Seru promo packs represent what a family pays for separate mobile data", "15 GB ≈Rp60–65k; 30 GB ≈Rp90–95k", "Match the Rp3.1k per GB yield", "Another pack benchmark"],
  ["Telkomsel's mobile EBITDA margin", "50–56%", "Splits household from mobile margin (12–31%)", "Segment disclosure"],
  ["When the inactive stock built up", "Three timing scenarios", "Bounds the paying-household restatement", "Cohort data"],
  ["Family size and Telkomsel lines", "4–6 members; 3–4 lines", "Usage build-up, offload, household value", "Phase 0 survey"],
  ["TV streaming time in a family home", "2 hours a day, SD to HD", "Usage build-up", "Survey; Orbit usage"],
  ["Content in Double Speed plans worth its retail price", "Prime Video Rp59k, Viu Rp30–53k, Vision+ Rp20k", "Content inside the plan", "Included tiers; willingness to pay"],
  ["People's class shares apply to households", "8.6 / 24.4 / 49.3 / 17.3 / 0.5%", "Class sizing", "Household-level class data"],
  ["EZnet fiber is unlimited at 20 Mbps", "No quota", "Usage crossover", "EZnet terms"],
  ["Scoring rules and weights", "40 / 25 / 20 / 15", "Prioritisation (tested 69 ways)", "Sensitivity, Appendix 16"],
  ["Share of a family's phone data that moves to home Wi-Fi", "50–70%", "Offload", "Phase 0 survey"],
  ["Annual churn of the base", "15–25% (20% base)", "No public benchmark", "Churn disclosure"],
  ["Telkomsel families' share of homes", "45–60%", "45% = share of mobile subscriptions", "Survey; household data"],
  ["Home-check invitations a year", "6.0M (3–9M)", "About a fifth of the 26–36M pool", "Phase 0 app reach"],
  ["Opt-in and conversion of invited families", "10% and 10% (5–15%)", "No benchmark; conservative for a free check", "Pilot"],
  ["Better fit raises the win rate with other families", "+2 points (1–3)", "Small effect of the check alone", "Pilot vs control"],
  ["Home-check homes that would stay mobile-only", "30% (20–50%)", "Home check targets rival areas", "Pilot targeting data"],
];
const asm2 = [
  ["Acquisition cost per home by route", "Rp150k / 400k / 750k", "No public figure; the household buys the Orbit device", "Pilot cost per paying home"],
  ["Routing-down leakage", "2% (1–5%) of 500k new homes a year", "The tree routes down only light users", "Pilot revenue per home"],
  ["Boost cohorts expiring", "20% of base in 2027; 500k a year from 2028", "HSSP began in 2026 with 180/360-day boosts", "Phase 0 cohort data"],
  ["Paid take-up at boost end; lapse; fee-induced churn", "8% (4–12%); 15%; 0 (0–1%)", "A clear choice with notice", "Randomised test"],
  ["Orbit → fiber a year; trade-in; refurbishment", "15% (8–25%); Rp150k; Rp50k", "Usage-triggered offers with a modem credit", "Pilot"],
  ["EZnet share of base; EZnet → IndiHome; single → family", "15%; 3% (1.5–5%); 0.5% (0.25–1%)", "Small, usage-triggered steps", "Pilot"],
  ["Lines added in homes without a Telkomsel line", "2% a year (1–3%)", "Plan benefits, no discount", "Pilot"],
  ["The do-nothing comparator", "Base at run-rate; silent reverts; no price change", "Static; continued erosion would favour the plan", "n/a"],
  ["Contested cities' share of base; churn effect", "35% (25–45%); −1pp (−0.5 to −1.5)", "Urban areas where IndiHome trails", "Gate 1b hold-out"],
  ["Triggers: reach, would-leave, save rate; offer cost", "10%, 40%, 10%; Rp150k a save", "Standard retention logic", "Hold-out"],
  ["Margins on upgrades and content", "70% (60–80%); 40% (30–50%)", "Spare capacity; content share", "Finance"],
  ["Discount rate (WACC)", "10% (9–12%)", "Not published for Telkomsel", "Telkom disclosure"],
  ["Programme costs", "Bottom-up (Appendix 21)", "Channel logic, data linking, targeted mesh", "Vendor quotes; budgets"],
  ["Probability of passing Gate 1", "40–80%", "Shown as a range", "Gate 1"],
  ["Theme targets", "Appendix 26", "Set as commitments", "Annual review"],
];
[[asm, "(1/2)", 1], [asm2, "(2/2)", 17]].forEach(([rows, part, start]) => {
  B.push({ n: "27 " + part, title: "Assumptions register: every assumption, its value, rationale and how Phase 0 will measure it " + part, source: "File 02 §21.1; file 03 §13. These are the only numbers in the deck that are not sourced or calculated from sources", build: async (s, pres) => {
    table(s, 0.3, 0.92, 9.4, [["#", "Assumption", "Value (test range)", "Rationale", "Measured by"], ...rows.map((r, i) => [String(start + i), ...r])],
      { colW: [0.3, 3.2, 2.1, 2.2, 1.6], fontSize: 5.8, rowH: 0.245, align: ["center", "left", "left", "left", "left"] });
  }});
});

// ---------- Appendix 28: parked ----------
B.push({ n: "28", title: "Considered and parked: five ideas kept for later, and why each waits", source: "File 03 §14, §8.9; Telkom 1H26 Info Memo p.36 (S04); file 02 §4.4", build: async (s, pres) => {
  const ideas = [
    ["Orbit as the household's \"satellite\"", "A child's kos room or campus, a worker away from home, the mudik trip, a second home, on the household plan with IndiHome as the hub", "No data on multi-location families", "Test with Phase 1 families; KPI: Orbit devices per IndiHome home"],
    ["Win-back of removed homes on fair terms", "0.8–1.2M homes already wired; Telkom names \"targeted retention & reactivation\"", "They stopped paying once; terms must change first", "Phase 2 pilot after pay-on-paying-homes"],
    ["Paid whole-home add-ons", "FTTR, mesh rental, safety packs: ≈Rp183–337bn a year per 1% FTTR attach", "Device cost and take-up unknown", "Price test in performance and premium homes"],
    ["Government housing programme", "3 million homes: volume and inclusion", "Price-capped; terms unknown", "Watch"],
    ["Lower churn on the family's mobile lines", "Telkomsel reports \"significantly lower churn propensity\" for converged homes", "No number published", "Measure through household KPIs"],
  ];
  ideas.forEach(([h, why, wait, next], i) => {
    const y = 0.95 + i * 0.8;
    card(s, pres, 0.3, y, 9.4, 0.72, { fill: i % 2 ? P.paper : P.light, line: P.line, radius: 0.06, shadow: false, name: "idea" });
    card(s, pres, 0.38, y + 0.16, 2.2, 0.4, { fill: P.dark, radius: 0.2, shadow: false, name: "pill" });
    text(s, "**" + h + "**", { x: 0.42, y: y + 0.16, w: 2.12, h: 0.4, fontSize: 6.3, color: P.paper, align: "center", valign: "middle" });
    text(s, "**Why promising:** " + why, { x: 2.7, y, w: 3.1, h: 0.72, fontSize: 6, valign: "middle" });
    text(s, "**Why parked:** " + wait, { x: 5.9, y, w: 1.75, h: 0.72, fontSize: 6, valign: "middle" });
    text(s, "**Next step:** " + next, { x: 7.75, y, w: 1.9, h: 0.72, fontSize: 6, color: P.dark, valign: "middle" });
  });
  text(s, "None of these is counted in the model; each would add value.", { x: 0.3, y: 5.0, w: 9.4, h: 0.2, fontSize: 6.2, italic: true, color: P.slate });
}});

// ---------- References ----------
const refs = [
  "S01 DWDG ITS Mini Case Competition 2026: Case \"Telkomsel\" (case book), Oct 2026",
  "S02 Guidebook: DWDG ITS Mini Case Competition 2026, Sep 2026",
  "S03 Telkomsel, Annual Report 2025. assets.telkomsel.com/public/pdf/annual-reports/Annual-Report-Telkomsel-2025-web-EN.pdf",
  "S04 Telkom Indonesia, 1H26 Corporate Presentation & Info Memo, 3 Aug 2026. telkom.co.id",
  "S05 Telkom Indonesia, 1Q26 Corporate Presentation & Info Memo, 2026. telkom.co.id",
  "S06 Telkom Indonesia, 9M25 Info Memo, Oct 2025. telkom.co.id",
  "S07 Telkom Indonesia, 1H25 Info Memo, Jul 2025. telkom.co.id",
  "S08 Telkom Indonesia, FY24 Info Memo, Apr 2025. telkom.co.id",
  "S09 BRI Danareksa Sekuritas, \"Telkom Indonesia: Capex Discipline Eases FCF Concerns\", 5 Aug 2026. link.brights.id",
  "S10 Investortrust, \"Dialing In: How Indonesia's Telkom Engineered a Second-Quarter Comeback\", Aug 2026",
  "S11 Telkomsel press release: new IndiHome and Telkomsel One packages, 5 Aug 2025. telkomsel.com",
  "S12 Telkomsel Orbit product page and FAQ, read 10 Oct 2026. telkomsel.com/orbit",
  "S13 Telkomsel EZnet product page, read 10 Oct 2026. telkomsel.com/eznet",
  "S14 Opensignal, Indonesia Fixed Broadband Experience (1 Jan–31 Mar 2026), Apr 2026. insights.opensignal.com",
  "S15 Opensignal, Nov 2025; Bisnis, \"Laporan OpenSignal: Telkomsel Kuasai 67% Pasar Fixed Broadband RI\", 25 Nov 2025",
  "S16 Bisnis, \"Respons Tenang Biznet-XLSMART Hadapi Paket Internet Rp100.000-an WIFI dan DSSA\", 17 Apr 2026",
  "S17 Bisnis, \"Surge (WIFI) Klaim Pelanggan Internet Rakyat Tembus 209.000 Kuartal I/2026\", 6 May 2026",
  "S18 IDNFinancials, Kabarbursa, Katadata on the Internet Rakyat launch, Feb–May 2026",
  "S19 Investortrust; CNBC Indonesia; Katadata on 1.4 GHz licence obligations (100 Mbps for Rp100k), 2025",
  "S20 Bisnis, \"Telkomsel Sambut Baik Target Komdigi Tekan Harga Broadband 2026\", 23 Jan 2026",
  "S21 Bisnis, \"Komdigi Targetkan Penetrasi Fixed Broadband Naik dari 21% menjadi 50% pada 2029\", 1 Oct 2025",
  "S22 Selular; Detik; Kontan; Bisnis on the 700 MHz and 2.6 GHz auction results, Jul 2026",
  "S23 Surat Edaran Menkomdigi No. 4 Tahun 2025, 9 Oct 2025",
  "S24 Media Partners Asia, Industry Overview in an HKEX draft prospectus (Indonesia), Apr 2026. hkexnews.hk",
  "S25 APJII Indonesia Internet Survey 2025 (via Gizmologi, Detik, Selular, Bisnis), Aug 2025",
  "S26 InfraNexia and SOE fiber consolidation (TechRepublic, DealStreetAsia, Bisnis, Selular), Dec 2025–May 2026",
];
const refs2 = [
  "S27 TLKM 30 strategy (BCA Sekuritas; CNBC Indonesia; Bisnis), 2025–2026",
  "S28 Bisnis, \"Harga Internet Rumah 2026: Internet Rakyat vs MyRepublic vs IndiHome vs XLSATU\", 29 Jan 2026; Bisnis price lists 2024–2025",
  "S29 Indosat HiFi Air launch and the FWA battle (Detik; Investortrust; Bisnis 2 and 9 Mar 2026)",
  "S30 Bisnis, \"Telkomsel Manfaatkan FWA 5G Jangkau Pelanggan Rumah yang Sulit Diakses Kabel FO\", 7 Jul 2026",
  "S31 Telkomsel, IndiHome Fiber to the Room launch, Jun 2025; Selular; Warta Ekonomi",
  "S32 EZnet launch coverage (Antara Kupang; Jatimtimes), 2024; Telkom timeline",
  "S33 Bisnis, \"Telkomsel Orbit Targetkan 5 Juta Pelanggan pada 2025\", 19 Oct 2022",
  "S34 IndiHome spin-off coverage (DailySocial; Selular), 2023",
  "S35 YLKI complaint data via academic and press sources; IndiHome care channels (Detik), 2024–2025",
  "S36 BPS / Mandiri Institute middle-class data; household consumption 2025 (GoodStats; Bisnis), 2026",
  "S37 RT/RW Net coverage (Selular, Oct 2024; Bisnis 2024)",
  "S38 Jio AirFiber coverage (TelecomTalk; Voice&Data; Outlook Business), 2025",
  "S39 T-Mobile 5G Home Internet (BusinessWire 2022; product terms)",
  "S40 Globe At Home (Globe newsroom; Context.ph, Feb 2026)",
  "S41 Convergence benchmarks (TelecomTV; FTI Consulting; CCS Insight), 2024–2026",
  "S43 Bisnis, \"Telkomsel Kalibrasi Pelanggan IndiHome, Kinerja ARPU Semester I/2026 Terdampak\", 4 Aug 2026",
  "S44 Selular, \"Orbit hadirkan skema pascabayar Telkomsel Halo\", Mar 2022",
  "S45 MyTelkomsel app screenshots: Orbit catalogue; IndiHome plans, Jakarta Selatan and Gorontalo, 10 Oct 2026",
  "S46 Telkomsel One web page, Jakarta Selatan: Dynamic, Complete and Easy tabs, 10 Oct 2026",
  "S47 Team's record of Telkomsel \"Super Seru\" promo pack prices in MyTelkomsel, 10 Oct 2026",
  "S48 Surge 1H26 results: BCA Sekuritas; Kabarbursa; Bisnis, \"Penyebab Pendapatan Surge (WIFI) Melonjak 206%\", Jul–Aug 2026",
  "S49 Kontan; Emitennews; BCA Sekuritas on Internet Rakyat sites and targets, Sep–Oct 2026",
  "S50 GoodStats (BPS data) on household structure and renting; BPS housing backlog (Pasardana), 2025–2026",
  "S51 GoodStats, population by economic class 2025 (BPS-based; Mandiri Institute), 2026",
  "S52 Bisnis opinion, \"Penetrasi Home Broadband di RI: Measure What Matters\", Aug 2024 (weak source)",
  "S53 Telkomsel, FUP explainer (fair-usage caps), 2024–2026",
];
const refs3 = [
  "S54 IESPA (~68M gamers, via Kontan) and Kadin (66M MSMEs, via Okezone), 2023–2026",
  "S55 Bisnis, \"Telkomsel Janjikan Koneksi Internet Tanpa Sekat di Rumah lewat IndiHome Ultra Mesh\", 17 Apr 2026",
  "S56 Katadata, \"Hashim Djojohadikusumo Usul Internet Rakyat Sepaket dengan Program 3 Juta Rumah\", 2026",
  "S57 Bisnis, \"FMC Telkomsel (TLKM), ISAT, dan EXCL Berpotensi Dongkrak Tingkat Churn ISP\", 30 Jun 2023",
  "S58 Samuel Sekuritas, \"Solusi Sinergi Digital (WIFI IJ): Better Times Ahead\", 12 Aug 2026. samuel.co.id",
  "S59 Netflix Help Center, \"How to control how much data Netflix uses\", read 10 Oct 2026",
  "S60 Starlite pricing: Bisnis, 16 Jul 2026 and 20 Nov 2025; Kontan, Jul 2026",
  "S61 BRI Danareksa Sekuritas, \"Telkom Indonesia: Mobile and Fixed Broadband to Turn the Corner\", 13 Aug 2025",
  "S62 Bisnis (13 and 17 Sep 2025) and Kontan (Oct 2025) on Telkomsel's 800k–1M new home customers a year",
  "S63 Bisnis, \"Strategi Telkomsel Hadapi Persaingan Internet Murah Rp100.000\", 22 Apr 2026; Selular, Aug 2025",
  "S64 Kontan, \"YLKI catat 106 pengaduan konsumen telekomunikasi sepanjang 2025\", Jan 2026",
  "S65 Digital mystery shop of Telkomsel web pages (/indihome, /orbit, /eznet, /eznet-wireless, /one), read 10 Oct 2026",
  "S66 PMK 131/2024 on VAT (effective 11%), via Antara and DJP, Jan 2025",
  "S67 OTT retail prices: Gizmologi; IDX Channel; Momsmoney; Lapakgaming, 2024–2026 (weak sources)",
  "S68 TelecomReviewAsia, \"Indosat ends 2025 strong…\", Feb 2026",
  "S69 Bisnis (May 2025) and Indotelko (Nov 2025) on XLSmart fixed broadband customers",
  "S70 Bisnis, \"Surge (WIFI) Perluas Internet Rakyat (IRA) 5G ke 10 Kota\", 24 Sep 2026",
  "Method note: figures tagged in the team's working files as primary, secondary, calculated, estimate or assumption; estimates are marked \"est.\" on every page; assumptions are listed in Appendix 27.",
];
[[refs, "R1"], [refs2, "R2"], [refs3, "R3"]].forEach(([list, r]) => {
  B.push({ n: r, label: "References " + r.slice(1) + " of 3", title: "References: sources behind every figure, cited as [n] on the core pages and by source code in the appendix", build: async (s, pres) => {
    list.forEach((t, i) => {
      const y = 0.92 + i * 0.165;
      const [code, ...rest] = t.split(" ");
      const isS = /^S\d+$/.test(code);
      s.addText([
        { text: isS ? code + "  " : "", options: { bold: true, color: P.accent } },
        { text: isS ? rest.join(" ") : t, options: { color: P.ink } },
      ], { x: 0.3, y, w: 9.4, h: 0.16, fontFace: FONT, fontSize: 6.2, margin: 0, valign: "middle", isTextBox: true });
    });
  }});
});

module.exports = B;
