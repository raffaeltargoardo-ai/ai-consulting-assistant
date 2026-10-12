// deck-slides-core.js: cover (P0) and core pages P1..P10. Every number comes from the deck ledger.
const { P, FONT, W, H, M, text, box, badge, wordmark, chrome } = require("./deck-lib");

// ---------------- P0 Cover (not counted) ----------------
function p0(pres) {
  const s = pres.addSlide();
  s.background = { color: P.paper };
  wordmark(s);

  // H.O.M.E. letter badges with each letter's word below
  const letters = [["H", "Household fit"], ["O", "Offer a path up"], ["M", "Make staying better"], ["E", "Evaluate household value"]];
  const bx = 0.55, by = 1.25, bs = 0.78, step = 1.32;
  letters.forEach(([l, word], i) => {
    const x = bx + i * step;
    badge(s, pres, x, by, bs, l, P.accent, 30);
    if (i < 3) s.addShape(pres.shapes.OVAL, { x: x + bs + 0.2, y: by + bs - 0.14, w: 0.12, h: 0.12, fill: { color: P.dark }, line: { type: "none" }, objectName: "dot " + i });
    text(s, "**" + word + "**", { x: x - 0.12, y: by + bs + 0.1, w: bs + 0.24, h: 0.4, fontSize: 8, color: P.ink, align: "center" });
  });

  text(s, "**Managing the home, not the line:** positioning **IndiHome** and **Orbit** by **household need** to grow **long-term household value**",
    { x: 0.55, y: 2.75, w: 5.3, h: 0.9, fontSize: 15, color: P.ink });

  text(s, "Connecting Every Home: Optimizing Telkomsel's Household Connectivity Portfolio · DWDG ITS Mini Case Competition 2026",
    { x: 0.55, y: 3.95, w: 5.3, h: 0.4, fontSize: 8.5, color: P.slate });
  text(s, "**Team [name]** · [members]", { x: 0.55, y: 4.5, w: 5.3, h: 0.22, fontSize: 9, color: P.ink });

  // Hub-and-satellites house motif: IndiHome hub inside the house, Orbit satellites around it
  const hx = 6.35, hy = 1.15, hw = 3.0;
  s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x: hx, y: hy, w: hw, h: 1.05, fill: { color: P.paper }, line: { color: P.accent, width: 2 }, objectName: "house roof" });
  s.addShape(pres.shapes.RECTANGLE, { x: hx + 0.3, y: hy + 1.05, w: hw - 0.6, h: 2.15, fill: { color: P.light }, line: { color: P.accent, width: 2 }, objectName: "house body" });
  const cx = hx + hw / 2, cy = hy + 1.95; // hub centre
  const sats = [[-0.78, -0.55], [0.78, -0.55], [0, 0.74], [-1.6, 0.3], [1.6, 0.3]];
  sats.forEach(([dx, dy], i) => {
    s.addShape(pres.shapes.LINE, { x: Math.min(cx, cx + dx), y: Math.min(cy, cy + dy), w: Math.abs(dx) || 0.001, h: Math.abs(dy) || 0.001, flipH: dx < 0 !== dy < 0 ? true : false, line: { color: P.mid, width: 1, dashType: "dash" }, objectName: "spoke " + i });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 0.5, y: cy - 0.5, w: 1.0, h: 1.0, fill: { color: P.dark }, line: { type: "none" }, objectName: "hub IndiHome" });
  s.addText("IndiHome", { x: cx - 0.5, y: cy - 0.5, w: 1.0, h: 1.0, fontFace: FONT, fontSize: 9, bold: true, color: P.paper, align: "center", valign: "middle", margin: 0, isTextBox: true });
  sats.forEach(([dx, dy], i) => {
    s.addShape(pres.shapes.OVAL, { x: cx + dx - 0.27, y: cy + dy - 0.27, w: 0.54, h: 0.54, fill: { color: P.paper }, line: { color: P.accent, width: 1.25 }, objectName: "satellite Orbit " + i });
    s.addText("Orbit", { x: cx + dx - 0.27, y: cy + dy - 0.27, w: 0.54, h: 0.54, fontFace: FONT, fontSize: 7, bold: true, color: P.accent, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
  text(s, "IndiHome as the family's home hub; Orbit as the flexible start, in and beyond the home", { x: hx, y: hy + 3.35, w: hw, h: 0.3, fontSize: 7, color: P.slate, align: "center", italic: true });
}

// ---------------- P1 Executive Summary ----------------
function p1(pres) {
  const s = pres.addSlide();
  s.background = { color: P.paper };
  chrome(s, pres, {
    label: "Background",
    title: "Executive summary: fitting each home to the right product, then growing and keeping it, is worth **Rp394bn** over the life of the homes won",
    section: "Background", page: 1,
    source: "[1] Telkom 1H26 Info Memo · [2] Appendix 6 · [3] Surge disclosures, Appendix 7 · [4] Telkomsel website (10 Oct 2026), Appendix 9 · [5] Appendix 10 · [6] Opensignal, Appendix 8 · model: Appendix 21–24",
  });

  const RX = M, RW = 0.86, CX = 1.24, GAP = 0.07;
  const CW = (W - M - CX - 2 * GAP) / 3; // column width
  const colX = (i) => CX + i * (CW + GAP);
  const rail = (y, h, label) => {
    box(s, pres, RX, y, RW, h, P.ink, null, "rail " + label);
    text(s, label, { x: RX + 0.06, y, w: RW - 0.12, h, fontSize: 7.5, bold: true, color: P.paper, valign: "middle" });
  };

  // Column headers H, O, M
  let y = 0.93;
  const heads = [["H", "Household fit"], ["O", "Offer a path up"], ["M", "Make staying better"]];
  heads.forEach(([l, w], i) => {
    box(s, pres, colX(i), y, CW, 0.3, P.light, null, "head " + l);
    badge(s, pres, colX(i) + 0.05, y + 0.04, 0.22, l, P.accent, 9.5);
    text(s, "**" + w + "**", { x: colX(i) + 0.34, y, w: CW - 0.4, h: 0.3, fontSize: 8.5, color: P.ink, valign: "middle" });
  });

  // Situation (spans the columns)
  y = 1.27;
  rail(y, 0.38, "Situation");
  box(s, pres, CX, y, W - M - CX, 0.38, P.paper, P.line, "situation");
  text(s, "Household revenue fell **1.6%** in 2025 and **3.8%** in 1H26 [1] while **≈58–60M** homes are still unconnected [2] and **Rp100k fiber** took the growth: **Surge added 1.98M homes** in 12 months [3].",
    { x: CX + 0.08, y, w: W - M - CX - 0.16, h: 0.38, fontSize: 8, valign: "middle" });

  // Complication
  y = 1.69;
  const hC = 0.7;
  rail(y, hC, "Complication");
  const comp = [
    "**Products placed by network and price tier:** none of **5** product pages routes a household across products [4]; **0.8–1.2M** inactive accounts came in on loose terms [1]",
    "**Extras are lent:** Double Speed lasts **180 or 360 days** [4]; the average home pays **2.5% below to 8.4% above** the entry price [5]",
    "In cities IndiHome wins **1 of 50** award slots and is **last of 8** on upload [6]",
  ];
  comp.forEach((t, i) => {
    box(s, pres, colX(i), y, CW, hC, P.paper, P.line, "comp " + i);
    text(s, t, { x: colX(i) + 0.07, y: y + 0.05, w: CW - 0.14, h: hC - 0.1, fontSize: 7.5, valign: "middle" });
  });

  // Solution
  y = 2.43;
  const hS = 0.98;
  rail(y, hS, "Solution");
  const sol = [
    "One **five-question check** in app, web, GraPARI, 188 and agents; **Orbit = flexible start**, **IndiHome = family hub**; opt-in **home check** for Telkomsel families a rival is about to connect; sales paid on homes **still paying at 3 and 12 months**",
    "**IndiHome ladder steps** (single → family, EZnet → IndiHome); a **chosen option before each boost ends**; the **household plan** rewards each added line with quota and services, not a discount",
    "**Home Wi-Fi promise** in contested cities; **retention triggers** with a random hold-out; cheaper plans offered **only to save a home**",
  ];
  sol.forEach((t, i) => {
    box(s, pres, colX(i), y, CW, hS, P.light, null, "sol " + i);
    text(s, t, { x: colX(i) + 0.07, y: y + 0.05, w: CW - 0.14, h: hS - 0.1, fontSize: 7.5, valign: "middle" });
  });

  // Impact
  y = 3.45;
  const hI = 0.4;
  rail(y, hI, "Impact ~(est.)~");
  const imp = [
    "**213k** paying homes by 2031 ~est.~",
    "**Rp534bn** over the life of the homes; **Rp415bn** revenue a year by 2031 ~est.~",
    "**204k** homes kept by 2031; **Rp174bn** over the life of the homes ~est.~",
  ];
  imp.forEach((t, i) => {
    box(s, pres, colX(i), y, CW, hI, P.paper, P.accent, "impact " + i);
    text(s, t, { x: colX(i) + 0.07, y, w: CW - 0.14, h: hI, fontSize: 7.5, color: P.ink, valign: "middle" });
  });

  // E foundation strip (full width, above the number row)
  y = 3.92;
  const hE = 0.42;
  box(s, pres, M, y, W - 2 * M, hE, P.dark, null, "E foundation");
  badge(s, pres, M + 0.08, y + 0.08, 0.26, "E", P.accent, 11);
  text(s, "**E · Evaluate household value:** one **household identity** (opt-in), **household KPIs** in the 2027 KPI contracts, **one owner** of household value. Telkom already states 'Maximize LTV' for IndiHome [1]; E extends it across **Orbit and mobile**.",
    { x: M + 0.44, y, w: W - 2 * M - 0.52, h: hE, fontSize: 7.5, color: P.paper, valign: "middle", markerColor: P.line });

  // Number row (est.)
  y = 4.42;
  const nums = [
    ["Rp394bn", "NPV over the life of the homes won"],
    ["35.1%", "IRR"],
    ["2.95", "B/C"],
    ["2031", "Cash payback"],
    ["−Rp46bn", "5-year NPV"],
    ["Rp295bn", "Capex"],
    ["Rp98bn", "Failed-pilot cash"],
  ];
  const nGap = 0.06, nW = (W - 2 * M - 6 * nGap) / 7, nH = 0.64;
  nums.forEach(([v, l], i) => {
    const x = M + i * (nW + nGap);
    box(s, pres, x, y, nW, nH, i === 0 ? P.light : P.paper, P.line, "num " + l);
    text(s, "**" + v + "**", { x: x + 0.05, y: y + 0.05, w: nW - 0.1, h: 0.28, fontSize: 12.5, color: i === 4 ? P.slate : P.accent, align: "center", valign: "middle" });
    text(s, l + " ~est.~", { x: x + 0.05, y: y + 0.34, w: nW - 0.1, h: 0.27, fontSize: 6.5, color: P.slate, align: "center", valign: "top" });
  });
}

module.exports = { 0: p0, 1: p1 };
