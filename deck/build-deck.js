// build-deck.js: builds Telkomsel_HOME_DWDG2026.pptx. Usage: node build-deck.js [--only 0,1]
const pptxgen = require("pptxgenjs");
const core = require("./deck-slides-core");

const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const only = onlyIdx >= 0 ? args[onlyIdx + 1].split(",").map(Number) : null;
const out = args.includes("--out") ? args[args.indexOf("--out") + 1] : "Telkomsel_HOME_DWDG2026.pptx";

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in = 720 x 405 pt
  pres.theme = { headFontFace: "Segoe UI", bodyFontFace: "Segoe UI" };
  pres.title = "H.O.M.E.: Telkomsel household connectivity portfolio";
  pres.author = "Team [name]";
  const pages = Object.keys(core).map(Number).sort((a, b) => a - b);
  for (const n of pages) if (!only || only.includes(n)) core[n](pres);
  await pres.writeFile({ fileName: out });
  console.log("written", out);
})();
