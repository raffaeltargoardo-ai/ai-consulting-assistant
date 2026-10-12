// deck-slides-core.js: cover (P0) and core pages P1..P10. Every number comes from the deck ledger.
const { P, PILLAR, FONT, W, M, text, card, gradient, badge, wordmark, chrome, shadow } = require("./deck-lib");

// ---------------- P0 Cover (not counted) ----------------
async function p0(pres) {
  const s = pres.addSlide();
  s.background = { color: P.ink };

  // ribbon motif (accent family), partly off-canvas
  s.addShape(pres.shapes.BLOCK_ARC, { x: -2.2, y: -4.6, w: 11.5, h: 5.6, angleRange: [15, 165], arcThicknessRatio: 0.035, fill: { color: P.slate }, line: { type: "none" }, objectName: "ribbon top" });
  s.addShape(pres.shapes.BLOCK_ARC, { x: 4.9, y: 0.2, w: 6.6, h: 6.6, angleRange: [222, 330], arcThicknessRatio: 0.06, fill: { color: P.dark }, line: { type: "none" }, objectName: "ribbon right" });
  s.addShape(pres.shapes.BLOCK_ARC, { x: -1.9, y: 3.1, w: 4.2, h: 4.2, angleRange: [250, 20], arcThicknessRatio: 0.09, fill: { color: P.accent }, line: { type: "none" }, objectName: "ribbon left" });

  wordmark(s, pres);

  // title block: edge pill + H.O.M.E. badges with each letter's word below
  await gradient(s, 0.42, 0.95, 0.09, 2.15, P.accent, P.dark, { radius: 0.045, dir: "v", name: "title pill" });
  const letters = ["H", "O", "M", "E"];
  const bx = 0.72, by = 0.95, bs = 0.74, step = 1.2;
  letters.forEach((l, i) => {
    const x = bx + i * step;
    badge(s, pres, x, by, bs, l, P.accent, 30);
    if (i < 3) s.addShape(pres.shapes.OVAL, { x: x + bs + 0.17, y: by + bs - 0.13, w: 0.11, h: 0.11, fill: { color: P.paper }, line: { type: "none" }, objectName: "dot " + i });
    text(s, "**" + PILLAR[l].word + "**", { x: x - 0.14, y: by + bs + 0.08, w: bs + 0.28, h: 0.34, fontSize: 7.5, color: P.line, align: "center" });
  });
  text(s, "**Managing the home, not the line:** positioning **IndiHome** and **Orbit** by **household need** to grow **long-term household value**",
    { x: 0.72, y: 2.22, w: 5.0, h: 0.95, fontSize: 14.5, color: P.paper, accentColor: "FF8A9B" });

  // hub-and-satellites house motif: IndiHome as the hub, Orbit as satellites
  const hx = 6.55, hy = 0.62, hw = 2.75;
  s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x: hx, y: hy, w: hw, h: 0.85, fill: { color: P.ink }, line: { color: P.paper, width: 1.75 }, objectName: "house roof" });
  s.addShape(pres.shapes.RECTANGLE, { x: hx + 0.28, y: hy + 0.85, w: hw - 0.56, h: 1.95, fill: { color: "273244" }, line: { color: P.paper, width: 1.75 }, objectName: "house body" });
  const cx = hx + hw / 2, cy = hy + 1.72;
  const sats = [[-0.72, -0.5], [0.72, -0.5], [0, 0.66], [-1.45, 0.3], [1.45, 0.3]];
  sats.forEach(([dx, dy], i) => {
    s.addShape(pres.shapes.LINE, { x: Math.min(cx, cx + dx), y: Math.min(cy, cy + dy), w: Math.abs(dx) || 0.001, h: Math.abs(dy) || 0.001, flipH: (dx < 0) !== (dy < 0), line: { color: P.mid, width: 1, dashType: "dash" }, objectName: "spoke " + i });
  });
  s.addShape(pres.shapes.OVAL, { x: cx - 0.46, y: cy - 0.46, w: 0.92, h: 0.92, fill: { color: P.accent }, line: { type: "none" }, shadow: shadow(), objectName: "hub IndiHome" });
  s.addText("IndiHome", { x: cx - 0.46, y: cy - 0.46, w: 0.92, h: 0.92, fontFace: FONT, fontSize: 8.5, bold: true, color: P.paper, align: "center", valign: "middle", margin: 0, isTextBox: true });
  sats.forEach(([dx, dy], i) => {
    s.addShape(pres.shapes.OVAL, { x: cx + dx - 0.25, y: cy + dy - 0.25, w: 0.5, h: 0.5, fill: { color: P.ink }, line: { color: P.paper, width: 1.25 }, objectName: "satellite Orbit " + i });
    s.addText("Orbit", { x: cx + dx - 0.25, y: cy + dy - 0.25, w: 0.5, h: 0.5, fontFace: FONT, fontSize: 6.5, bold: true, color: P.paper, align: "center", valign: "middle", margin: 0, isTextBox: true });
  });
  text(s, "IndiHome as the family's home hub; Orbit as the flexible start, in and beyond the home", { x: hx - 0.1, y: hy + 2.88, w: hw + 0.2, h: 0.3, fontSize: 6.5, color: P.line, align: "center", italic: true });

  // bottom band: proposed by, team, competition, member placeholders
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.3, y: 4.3, w: 9.4, h: 1.05, rectRadius: 0.28, fill: { color: P.paper }, line: { type: "none" }, shadow: shadow(), objectName: "bottom band" });
  text(s, "**Proposed by:**", { x: 0.65, y: 4.42, w: 4, h: 0.18, fontSize: 7.5 });
  text(s, "**Team [name]**", { x: 0.65, y: 4.6, w: 4, h: 0.3, fontSize: 14 });
  text(s, "Connecting Every Home: Optimizing Telkomsel's Household Connectivity Portfolio · DWDG ITS Mini Case Competition 2026",
    { x: 0.65, y: 4.92, w: 5.3, h: 0.34, fontSize: 7.5, color: P.slate });
  [0, 1, 2].forEach((i) => {
    const x = 6.55 + i * 1.05;
    s.addShape(pres.shapes.OVAL, { x, y: 3.98, w: 0.66, h: 0.66, fill: { color: P.light }, line: { color: P.line, width: 1 }, shadow: shadow(), objectName: "member photo " + i });
    s.addText("[photo]", { x, y: 3.98, w: 0.66, h: 0.66, fontFace: FONT, fontSize: 6, color: P.mid, align: "center", valign: "middle", margin: 0, isTextBox: true });
    text(s, "**[member " + (i + 1) + "]**", { x: x - 0.2, y: 4.72, w: 1.06, h: 0.3, fontSize: 6.5, align: "center" });
  });
}

// ---------------- P1 Executive Summary (dark page, SCSI panel) ----------------
async function p1(pres) {
  const s = pres.addSlide();
  s.background = { color: P.ink };
  s.addShape(pres.shapes.BLOCK_ARC, { x: -1.6, y: 3.4, w: 3.6, h: 3.6, angleRange: [250, 20], arcThicknessRatio: 0.09, fill: { color: P.accent }, line: { type: "none" }, objectName: "ribbon left" });
  await chrome(s, pres, {
    dark: true,
    label: "Executive Summary",
    title: "Executive summary: fitting each home to the right product, then growing and keeping it, is worth **Rp394bn** over the life of the homes won",
    section: "Background", page: 1,
    source: "[1] Telkom 1H26 Info Memo · [2] Appendix 6 · [3] Surge disclosures, Appendix 7 · [4] Telkomsel website (10 Oct 2026), Appendix 9 · [5] Appendix 10 · [6] Opensignal, Appendix 8 · model: Appendix 21–24",
  });

  // white panel
  const PX = 1.12, PY = 0.92, PW = W - PX - 0.22, PH = 4.28;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: PX, y: PY, w: PW, h: PH, rectRadius: 0.12, fill: { color: P.paper }, line: { type: "none" }, shadow: shadow(), objectName: "panel" });
  const IX = PX + 0.1, IW = PW - 0.2, GAP = 0.08;
  const CW = (IW - 2 * GAP) / 3;
  const colX = (i) => IX + i * (CW + GAP);
  const railLabel = (y, h, label) => text(s, "**" + label + "**", { x: 0.12, y, w: 0.96, h, fontSize: 9.5, color: P.paper, align: "center", valign: "middle" });

  // Situation
  let y = PY + 0.09;
  railLabel(y, 0.4, "Situation");
  card(s, pres, IX, y, IW, 0.4, { fill: P.light, line: P.line, shadow: false, name: "situation" });
  text(s, "Household revenue fell **1.6%** in 2025 and **3.8%** in 1H26 [1] while **≈58–60M** homes are still unconnected [2] and **Rp100k fiber** took the growth: **Surge added 1.98M homes** in 12 months [3].",
    { x: IX + 0.1, y, w: IW - 0.2, h: 0.4, fontSize: 7.8, align: "center", valign: "middle" });

  // Pillar header tabs
  y = PY + 0.55;
  ["H", "O", "M"].forEach((l, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: colX(i), y, w: CW, h: 0.22, fill: { color: PILLAR[l].solid }, line: { type: "none" }, objectName: "tab " + l });
    text(s, "**" + l + " · " + PILLAR[l].word + "**", { x: colX(i), y, w: CW, h: 0.22, fontSize: 7.5, color: P.paper, align: "center", valign: "middle" });
  });

  // Complication
  y = PY + 0.81;
  const hC = 0.6;
  railLabel(y, hC, "Complication");
  const comp = [
    "**Products placed by network and price tier:** none of **5** product pages routes a household across products [4]; **0.8–1.2M** inactive accounts came in on loose terms [1]",
    "**Extras are lent:** Double Speed lasts **180 or 360 days** [4]; the average home pays **2.5% below to 8.4% above** the entry price [5]",
    "In cities IndiHome wins **1 of 50** award slots and is **last of 8** on upload [6]",
  ];
  comp.forEach((t, i) => {
    card(s, pres, colX(i), y, CW, hC, { line: P.line, radius: 0.04, name: "comp " + i });
    text(s, t, { x: colX(i) + 0.08, y: y + 0.04, w: CW - 0.16, h: hC - 0.08, fontSize: 7.2, align: "center", valign: "middle" });
  });

  // Solution: pillar-coloured gradient tiles with an enlarged first letter
  y = PY + 1.49;
  const hS = 1.0;
  railLabel(y, hS, "Solution");
  const sol = [
    "One **five-question check** in app, web, GraPARI, 188 and agents; **Orbit = flexible start**, **IndiHome = family hub**; opt-in **home check** for Telkomsel families a rival is about to connect; sales paid on homes **still paying at 3 and 12 months**",
    "**IndiHome ladder steps** (single → family, EZnet → IndiHome); a **chosen option before each boost ends**; the **household plan** rewards each added line with quota and services, not a discount",
    "**Home Wi-Fi promise** in contested cities; **retention triggers** with a random hold-out; cheaper plans offered **only to save a home**",
  ];
  for (let i = 0; i < 3; i++) {
    const l = ["H", "O", "M"][i];
    await gradient(s, colX(i), y, CW, hS, PILLAR[l].from, PILLAR[l].to, { radius: 0.05, name: "solution tile " + l });
    s.addText([
      { text: l, options: { fontSize: 13, bold: true, color: P.paper } },
      { text: PILLAR[l].word.slice(1), options: { fontSize: 9, bold: true, color: P.paper } },
    ], { x: colX(i) + 0.1, y: y + 0.04, w: CW - 0.2, h: 0.24, fontFace: FONT, margin: 0, valign: "middle", isTextBox: true });
    text(s, sol[i], { x: colX(i) + 0.1, y: y + 0.29, w: CW - 0.2, h: hS - 0.33, fontSize: 6.9, color: P.paper, valign: "top", accentColor: P.paper });
  }

  // Impact per pillar (dashed boxes)
  y = PY + 2.57;
  const hI = 0.36;
  railLabel(y, 1.62, "Impact\n~(est.)~");
  const imp = [
    "**213k** paying homes by 2031 ~est.~",
    "**Rp534bn** over the life of the homes; **Rp415bn** revenue a year by 2031 ~est.~",
    "**204k** homes kept by 2031; **Rp174bn** over the life of the homes ~est.~",
  ];
  imp.forEach((t, i) => {
    card(s, pres, colX(i), y, CW, hI, { line: PILLAR[["H", "O", "M"][i]].solid, dash: true, lineWidth: 1, radius: 0.04, shadow: false, name: "impact " + i });
    text(s, t, { x: colX(i) + 0.07, y, w: CW - 0.14, h: hI, fontSize: 7.2, align: "center", valign: "middle" });
  });

  // E foundation strip
  y = PY + 3.0;
  const hE = 0.36;
  await gradient(s, IX, y, IW, hE, PILLAR.E.from, PILLAR.E.to, { radius: 0.05, name: "E foundation" });
  badge(s, pres, IX + 0.07, y + 0.05, 0.26, "E", P.paper, 11, P.dark);
  text(s, "**E · Evaluate household value:** one **household identity** (opt-in), **household KPIs** in the 2027 KPI contracts, **one owner** of household value. Telkom already states 'Maximize LTV' for IndiHome [1]; E extends it across **Orbit and mobile**.",
    { x: IX + 0.42, y, w: IW - 0.5, h: hE, fontSize: 7, color: P.paper, valign: "middle", markerColor: P.line });

  // Number row (est.): dashed boxes, big value, small label
  y = PY + 3.44;
  const nums = [
    ["Rp394bn", "NPV over the life of the homes won"],
    ["35.1%", "IRR"],
    ["2.95", "B/C"],
    ["2031", "Cash payback"],
    ["−Rp46bn", "5-year NPV"],
    ["Rp295bn", "Capex"],
    ["Rp98bn", "Failed-pilot cash"],
  ];
  const nGap = 0.06, nW = (IW - 6 * nGap) / 7, nH = 0.74;
  nums.forEach(([v, l], i) => {
    const x = IX + i * (nW + nGap);
    card(s, pres, x, y, nW, nH, { line: i === 0 ? P.accent : P.ink, dash: true, lineWidth: 1, radius: 0.03, shadow: false, fill: i === 0 ? "FDECEF" : P.paper, name: "num " + l });
    text(s, "**" + v + "**", { x: x + 0.03, y: y + 0.07, w: nW - 0.06, h: 0.3, fontSize: 12, color: i === 4 ? P.slate : (i === 0 ? P.accent : P.ink), align: "center", valign: "middle" });
    text(s, l + " ~est.~", { x: x + 0.04, y: y + 0.38, w: nW - 0.08, h: 0.32, fontSize: 6.3, color: P.slate, align: "center", valign: "top" });
  });
}

module.exports = { 0: p0, 1: p1 };
