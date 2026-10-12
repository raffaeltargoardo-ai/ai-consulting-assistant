// build-deck.js: builds the H.O.M.E. deck. Usage: node build-deck.js [--only 0,1,2] [--out file.pptx]
// Page keys: 0 cover, 1–10 core, 11 appendix divider, 12+ appendix pages (in order).
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const pages = { ...require("./deck-slides-core"), ...require("./deck-slides-core2") };
if (fs.existsSync(__dirname + "/deck-slides-appendix.js")) Object.assign(pages, require("./deck-slides-appendix"));

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
  const keys = Object.keys(pages).map(Number).sort((a, b) => a - b);
  for (const n of keys) if (!only || only.includes(n)) await pages[n](pres);
  await pres.writeFile({ fileName: out });
  console.log("written", out, "pages:", keys.filter((n) => !only || only.includes(n)).length);
})();
