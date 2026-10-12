// deck-lib.js: palette, fonts, chrome and helpers for the Telkomsel H.O.M.E. deck.
// Canvas 720 x 405 pt (10 x 5.625 in), blank layout, composed shapes only.

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
const FONT = "Segoe UI";
const W = 10, H = 5.625, M = 0.3;
const SECTIONS = ["Background", "Analysis", "Solution", "Implementation", "Projection"];

// Rich text: **bold**, ^accent^, ~grey~ (for "est."), [n] footnote markers (superscript, slate).
function rich(str, base = {}) {
  const runs = [];
  let bold = false, acc = false, grey = false, buf = "";
  const push = () => {
    if (!buf) return;
    const o = { ...base };
    if (bold) o.bold = true;
    if (acc) o.color = P.accent;
    if (grey) { o.color = P.mid; o.bold = false; }
    runs.push({ text: buf, options: o });
    buf = "";
  };
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "*" && str[i + 1] === "*") { push(); bold = !bold; i++; continue; }
    if (c === "^") { push(); acc = !acc; continue; }
    if (c === "~") { push(); grey = !grey; continue; }
    if (c === "\n") { push(); runs.push({ text: "", options: { ...base, breakLine: true } }); continue; }
    if (c === "[") {
      const m = str.slice(i).match(/^\[(\d+(?:[,–-]\s?\d+)*)\]/);
      if (m) {
        push();
        const mo = { ...base, color: base.markerColor || P.slate, bold: false };
        if (!base.plainMarkers) mo.superscript = true;
        runs.push({ text: m[0], options: mo });
        i += m[0].length - 1;
        continue;
      }
    }
    buf += c;
  }
  push();
  // breakLine markers: attach to the previous run instead of empty runs
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
  if (opts.markerColor) base.markerColor = opts.markerColor;
  if (opts.plainMarkers) base.plainMarkers = true;
  if (opts.bold) base.bold = true;
  if (opts.italic) base.italic = true;
  const o = { margin: 0, valign: "top", isTextBox: true, fontFace: FONT, ...opts };
  delete o.color; delete o.bold; delete o.italic; delete o.markerColor; delete o.plainMarkers;
  slide.addText(rich(str, base), o);
}

function box(slide, pres, x, y, w, h, fill, lineColor, name, radius) {
  const shape = radius ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE;
  const o = { x, y, w, h, fill: { color: fill }, line: lineColor ? { color: lineColor, width: 0.75 } : { type: "none" }, objectName: name };
  if (radius) o.rectRadius = radius;
  slide.addShape(shape, o);
}

// Letter badge (H, O, M, E)
function badge(slide, pres, x, y, s, letter, fill = P.accent, fontSize) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: s, h: s, rectRadius: s * 0.18, fill: { color: fill }, line: { type: "none" }, objectName: "badge " + letter });
  slide.addText(letter, { x, y, w: s, h: s, fontFace: FONT, fontSize: fontSize || s * 40, bold: true, color: P.paper, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

function wordmark(slide) {
  slide.addText("Telkomsel · IndiHome · Orbit", { x: W - M - 3, y: 0.12, w: 3, h: 0.16, fontFace: FONT, fontSize: 7, color: P.slate, align: "right", margin: 0, isTextBox: true });
}

// Core-page chrome: italic section label (line 1), action title (line 2), breadcrumb footer, source line.
function chrome(slide, pres, { label, title, section, page, source }) {
  wordmark(slide);
  slide.addText(label, { x: M, y: 0.13, w: 6, h: 0.18, fontFace: FONT, fontSize: 8.5, italic: true, color: P.dark, margin: 0, isTextBox: true });
  text(slide, title, { x: M, y: 0.33, w: W - 2 * M, h: 0.5, fontSize: 13, bold: true, color: P.ink, valign: "top" });
  if (source) text(slide, "Source: " + source, { x: M, y: 5.12, w: W - 2 * M, h: 0.2, fontSize: 6.5, italic: true, color: P.slate, valign: "bottom", plainMarkers: true });
  // breadcrumb
  const runs = [];
  SECTIONS.forEach((s, i) => {
    runs.push({ text: s, options: { fontFace: FONT, fontSize: 7, color: s === section ? P.ink : P.mid, bold: s === section } });
    if (i < SECTIONS.length - 1) runs.push({ text: "  ·  ", options: { fontFace: FONT, fontSize: 7, color: P.mid } });
  });
  slide.addText(runs, { x: M, y: 5.38, w: 6, h: 0.16, margin: 0, isTextBox: true });
  slide.addText(String(page), { x: W - M - 0.5, y: 5.38, w: 0.5, h: 0.16, fontFace: FONT, fontSize: 7, color: P.slate, align: "right", margin: 0, isTextBox: true });
}

module.exports = { P, FONT, W, H, M, SECTIONS, rich, text, box, badge, wordmark, chrome };
