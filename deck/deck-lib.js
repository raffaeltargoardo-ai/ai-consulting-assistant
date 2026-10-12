// deck-lib.js: palette, fonts, chrome and helpers for the Telkomsel H.O.M.E. deck.
// Canvas 720 x 405 pt (10 x 5.625 in), blank layout, composed shapes only. Style: see STYLE.md.
const sharp = require("sharp");

const P = {
  accent: "E4002B", // Telkomsel red (strategy)
  dark: "A50021",   // bands, badges
  ink: "1F2937",
  slate: "475569",
  mid: "94A3B8",
  line: "CBD5E1",
  light: "F1F5F9",
  paper: "FFFFFF",
};
// One colour per pillar, used everywhere (gradient from -> to)
const PILLAR = {
  H: { solid: P.accent, from: P.accent, to: P.dark, word: "Household fit" },
  O: { solid: P.dark, from: P.dark, to: P.ink, word: "Offer a path up" },
  M: { solid: P.ink, from: P.ink, to: P.slate, word: "Make staying better" },
  E: { solid: P.dark, from: P.dark, to: P.accent, word: "Evaluate household value" },
};
const FONT = "Segoe UI";
const W = 10, H = 5.625, M = 0.3;
const SECTIONS = ["Background", "Analysis", "Solution", "Implementation", "Projection"];

// Rich text: **bold**, ^accent^, ~grey~ (for "est."), [n] footnote markers (superscript).
function rich(str, base = {}) {
  const runs = [];
  let bold = false, acc = false, grey = false, buf = "";
  const push = () => {
    if (!buf) return;
    const o = { ...base };
    delete o.markerColor; delete o.plainMarkers; delete o.accentColor; delete o.greyColor;
    if (bold) o.bold = true;
    if (acc) o.color = base.accentColor || P.accent;
    if (grey) { o.color = base.greyColor || P.mid; o.bold = false; }
    runs.push({ text: buf, options: o });
    buf = "";
  };
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "*" && str[i + 1] === "*") { push(); bold = !bold; i++; continue; }
    if (c === "^") { push(); acc = !acc; continue; }
    if (c === "~") { push(); grey = !grey; continue; }
    if (c === "\n") { push(); runs.push({ text: "", options: { breakLine: true } }); continue; }
    if (c === "[") {
      const m = str.slice(i).match(/^\[(\d+(?:[,–-]\s?\d+)*)\]/);
      if (m) {
        push();
        const mo = { ...base, color: base.markerColor || P.slate, bold: false };
        delete mo.markerColor; delete mo.plainMarkers; delete mo.accentColor; delete mo.greyColor;
        mo.superscript = true;
        runs.push({ text: m[0], options: mo });
        i += m[0].length - 1;
        continue;
      }
    }
    buf += c;
  }
  push();
  const out = [];
  for (const r of runs) {
    if (r.text === "" && r.options.breakLine) {
      if (out.length) out[out.length - 1].options = { ...out[out.length - 1].options, breakLine: true };
    } else out.push(r);
  }
  return out;
}

function text(slide, str, opts) {
  const base = { fontFace: FONT, color: opts.color || P.ink, fontSize: opts.fontSize || 8 };
  for (const k of ["bold", "italic", "markerColor", "accentColor", "greyColor"]) if (opts[k]) base[k] = opts[k];
  const o = { margin: 0, valign: "top", isTextBox: true, fontFace: FONT, ...opts };
  for (const k of ["color", "bold", "italic", "markerColor", "accentColor", "greyColor"]) delete o[k];
  slide.addText(rich(str, base), o);
}

const shadow = () => ({ type: "outer", blur: 4, offset: 1.5, angle: 90, color: "000000", opacity: 0.18 });

function card(slide, pres, x, y, w, h, opts = {}) {
  const o = {
    x, y, w, h, rectRadius: opts.radius ?? 0.06,
    fill: { color: opts.fill || P.paper },
    line: opts.line ? { color: opts.line, width: opts.lineWidth || 0.75, dashType: opts.dash ? "dash" : "solid" } : { type: "none" },
    objectName: opts.name || "card",
  };
  if (opts.shadow !== false) o.shadow = shadow();
  slide.addShape(opts.square ? pres.shapes.RECTANGLE : pres.shapes.ROUNDED_RECTANGLE, o);
}

// Gradient fill (rendered to PNG; pptxgenjs has no native gradients). dir: "h" or "v".
const gradCache = new Map();
async function gradient(slide, x, y, w, h, from, to, { radius = 0, dir = "h", name = "gradient" } = {}) {
  const key = [w, h, from, to, radius, dir].join("|");
  let data = gradCache.get(key);
  if (!data) {
    const ppi = 120, pw = Math.max(2, Math.round(w * ppi)), ph = Math.max(2, Math.round(h * ppi)), r = radius * ppi;
    const [x2, y2] = dir === "h" ? ["100%", "0%"] : ["0%", "100%"];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}"><defs><linearGradient id="g" x1="0%" y1="0%" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="#${from}"/><stop offset="100%" stop-color="#${to}"/></linearGradient></defs><rect x="0" y="0" width="${pw}" height="${ph}" rx="${r}" ry="${r}" fill="url(#g)"/></svg>`;
    const buf = await sharp(Buffer.from(svg)).png().toBuffer();
    data = "image/png;base64," + buf.toString("base64");
    gradCache.set(key, data);
  }
  slide.addImage({ data, x, y, w, h, altText: name });
}

// Letter badge (H, O, M, E)
function badge(slide, pres, x, y, s, letter, fill = P.accent, fontSize, textColor = P.paper) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: s, h: s, rectRadius: s * 0.2, fill: { color: fill }, line: { type: "none" }, shadow: shadow(), objectName: "badge " + letter });
  slide.addText(letter, { x, y, w: s, h: s, fontFace: FONT, fontSize: fontSize || s * 40, bold: true, color: textColor, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

// Numbered zone header: circle badge + heading sentence + thin accent rule
function zone(slide, pres, n, x, y, w, heading, { fontSize = 9.5 } = {}) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: 0.3, h: 0.3, fill: { color: P.dark }, line: { type: "none" }, shadow: shadow(), objectName: "zone badge " + n });
  slide.addText(String(n), { x, y, w: 0.3, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: P.paper, align: "center", valign: "middle", margin: 0, isTextBox: true });
  text(slide, heading, { x: x + 0.38, y: y - 0.02, w: w - 0.38, h: 0.36, fontSize, valign: "middle" });
  slide.addShape(pres.shapes.LINE, { x: x + 0.38, y: y + 0.36, w: w - 0.38, h: 0, line: { color: P.dark, width: 1.25 }, objectName: "zone rule " + n });
}

// White rounded tab with the text wordmark, top-right (no logos)
function wordmark(slide, pres) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: W - 2.0, y: -0.12, w: 1.85, h: 0.5, rectRadius: 0.1, fill: { color: P.paper }, line: { color: P.line, width: 0.5 }, shadow: shadow(), objectName: "wordmark tab" });
  slide.addText([
    { text: "Telkomsel", options: { bold: true, color: P.accent } },
    { text: " · IndiHome · Orbit", options: { color: P.ink } },
  ], { x: W - 2.0, y: 0.06, w: 1.85, h: 0.26, fontFace: FONT, fontSize: 7.5, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

// Left-edge pill (top-left)
async function pill(slide) {
  await gradient(slide, -0.14, 0.1, 0.27, 0.66, P.accent, P.dark, { radius: 0.12, dir: "v", name: "edge pill" });
}

// Core-page chrome. dark: true for the dark pages (executive summary).
async function chrome(slide, pres, { label, title, section, page, source, dark = false }) {
  await pill(slide);
  wordmark(slide, pres);
  const fg = dark ? P.paper : P.ink;
  slide.addText(label, { x: M, y: 0.12, w: 6, h: 0.2, fontFace: FONT, fontSize: 9, bold: true, italic: true, color: dark ? P.paper : P.ink, margin: 0, isTextBox: true });
  text(slide, title, { x: M, y: 0.33, w: W - M - 2.15, h: 0.5, fontSize: 12.5, color: fg, valign: "top", accentColor: dark ? "FF8A9B" : P.accent });
  if (source) text(slide, "Source: " + source, { x: M, y: 5.27, w: 5.55, h: 0.28, fontSize: 6, italic: true, color: dark ? P.line : P.slate, valign: "bottom", markerColor: dark ? P.line : P.slate });
  // breadcrumb, bottom-right, then bar + page number
  const bx = 5.95, bw = 3.35, cw = bw / SECTIONS.length;
  SECTIONS.forEach((s, i) => {
    const cur = s === section;
    slide.addText(s, { x: bx + i * cw, y: 5.38, w: cw, h: 0.16, fontFace: FONT, fontSize: 6.5, bold: cur, color: cur ? fg : (dark ? P.mid : P.mid), align: "center", margin: 0, isTextBox: true });
  });
  slide.addShape(pres.shapes.LINE, { x: 9.38, y: 5.33, w: 0, h: 0.24, line: { color: fg, width: 1 }, objectName: "page bar" });
  slide.addText(String(page), { x: 9.42, y: 5.33, w: 0.32, h: 0.24, fontFace: FONT, fontSize: 9, bold: true, color: fg, align: "left", valign: "middle", margin: 0, isTextBox: true });
}

module.exports = { P, PILLAR, FONT, W, H, M, SECTIONS, rich, text, card, gradient, badge, zone, wordmark, pill, chrome, shadow };
