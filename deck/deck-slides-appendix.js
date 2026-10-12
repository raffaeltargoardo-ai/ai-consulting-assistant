// deck-slides-appendix.js: appendix divider (page 11, an index by scoring criterion) and the appendix pages (12+).
const { P, FONT, W, M, text, card, gradient, wordmark, appChrome } = require("./deck-lib");
const list = [...require("./deck-appendix-a"), ...require("./deck-appendix-b")];
const FIRST = 12;
const pageOf = (n) => FIRST + list.findIndex((p) => p.n === n || p.n.startsWith(n + " "));

async function divider(pres) {
  const s = pres.addSlide();
  s.background = { color: P.ink };
  wordmark(s, pres);
  await gradient(s, 0.42, 0.55, 0.09, 1.0, P.accent, P.dark, { radius: 0.045, dir: "v", name: "pill" });
  text(s, "**Appendix**", { x: 0.65, y: 0.5, w: 5, h: 0.6, fontSize: 30, color: P.paper });
  text(s, "The evidence behind every core claim, grouped by the criterion it serves. Core footnotes point here.", { x: 0.65, y: 1.1, w: 7.5, h: 0.4, fontSize: 9, color: P.line });
  const groups = [
    ["Case and scoring map", ["1"]],
    ["Problem identification", ["2", "3", "4", "5", "14", "15", "16"]],
    ["Analysis and research", ["6", "7", "8", "9", "10", "11", "12", "13", "17"]],
    ["Solution", ["18", "19", "26", "28"]],
    ["Feasibility, model and risk", ["20", "21", "22", "23", "24", "25", "27"]],
    ["References", ["R1", "R2", "R3"]],
  ];
  const short = Object.fromEntries(list.map((p) => [p.n.split(" ")[0], p.title.split(":")[0]]));
  short["1"] = "Case requirements and scoring matrix";
  groups.forEach(([g, ns], gi) => {
    const x = 0.65 + (gi % 3) * 3.05, y = 1.7 + Math.floor(gi / 3) * 1.85;
    card(s, pres, x, y, 2.9, 1.72, { fill: "273244", radius: 0.06, shadow: false, name: "group" });
    text(s, "**" + g + "**", { x: x + 0.1, y: y + 0.05, w: 2.7, h: 0.25, fontSize: 8.5, color: "FF8A9B" });
    const items = ns.map((n) => (n.startsWith("R") ? n + " References" : "A" + n + " " + (short[n] || "")) + "  ·  p." + pageOf(n));
    text(s, items.join("\n"), { x: x + 0.1, y: y + 0.32, w: 2.72, h: 1.36, fontSize: 6.2, color: P.paper, valign: "top" });
  });
  text(s, "11", { x: 9.42, y: 5.33, w: 0.32, h: 0.24, fontSize: 9, bold: true, color: P.paper, valign: "middle" });
}

const out = { 11: divider };
list.forEach((p, i) => {
  out[FIRST + i] = async (pres) => {
    const s = pres.addSlide();
    s.background = { color: P.paper };
    await appChrome(s, pres, { n: p.n, title: p.title, page: FIRST + i, source: p.source, label: p.label });
    await p.build(s, pres);
  };
});
module.exports = out;
