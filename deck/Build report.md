# Build report: H.O.M.E. deck, DWDG ITS MCC 2026 · Telkomsel

**Built:** 12 Oct 2026 · **Files:** `Telkomsel_HOME_DWDG2026.pptx`, `Telkomsel_HOME_DWDG2026.pdf`, and the submission copy `MCC_DWDGITS26_TeamName.pdf` (rename `TeamName` before submitting, as the guidebook's file-naming rule requires).
**Content authority:** the deck ledger, then the full case file (Parts 1–4: file 01 v1.7, file 02 v4.1, file 03 v2.1, model-v4 output). Style: `STYLE.md`, learned from the PVP reference deck.

## 1. Pages built (48)

| Block | Pages | Count against the 10-page limit |
|---|---|---|
| Cover | 1 (unnumbered) | Not counted |
| Core | P1 Executive Summary · P2 Background · P3 Problem Identification · P4 Market and competition · P5 Households and portfolio · P6 Analysis Conclusion · P7 Strategy Overview · P8 Roles and routing (H) · P9 Implementation · P10 Financial Projection | **10, the limit** |
| Appendix divider | p.11, an index grouped by scoring criterion | Appendix |
| Appendix | A1 (1/2, 2/2) · A2–A4 · A5 (1/2, 2/2) · A6–A20 · A21 (1/2, 2/2) · A22–A24 · A25 (1/2, 2/2) · A26 · A27 (1/2, 2/2) · A28 (pp.12–44) | Appendix |
| References | R1–R3 (pp.45–47), S01–S70 | Appendix |

Every ledger appendix page marked *must* and *should* is built.

## 2. How the deck maps to the scoring matrix (guidebook p.10)

| Criterion | Weight | Where it is earned |
|---|---|---|
| Executive Summary | 5% | P1: SCSI matrix with H · O · M columns, E foundation and a 7-number row |
| Problem Identification | 15% | P3: problem stated twice, scored issue tree (8 drivers, tiers, weights), robustness box; P6 bridge; A3–A5, A14–A16 |
| Analysis and Research | 25% | P2, P4, P5; A2–A13 and A17 (SWOT/TOWS, value pools, rival explanations, Opensignal, mystery shop, crossover, offload) |
| Solution Quality | 30% | P6 bridge (each root cause → one pillar) → P7 temple → P8 roles, five-question check, household path; A18, A19, A26 |
| Feasibility and Risk | 20% | P9 owners, swimlane roadmap, gates with pass marks, risk heat map + triggers; P10 cash, NPV/IRR/B/C/BEP, value waterfall, robustness, KPIs; A20–A25, A27 |
| Formatting | 5% | 10 core pages, 16:9 PDF, English, one style, references |

Appendix 1 (1/2) maps all 16 case requirements and the four Key Questions to pages; Appendix 1 (2/2) maps the scoring matrix.

## 3. Rendered-reference tally

- **Pages rendered and inspected:** 48 of 48 (PDF → JPEG at 110–160 dpi), with a second pass on every page that was fixed.
- **Source codes cited in the deck:** 35 distinct S-codes; **all 35 resolve** to the reference list (R1–R3 list 69 sources: S01–S70, S42 unused).
- **Core footnotes:** every core page carries `[n]` markers resolved in its Source line, mixing external names (Telkom 1H26 Info Memo, Telkomsel AR 2025, Opensignal, Surge disclosures, Media Partners Asia) with appendix numbers.
- **Text checks on the built deck (extracted text, not scripts):** em dashes 0 · "rather than" 0 · assumption IDs and driver codes on core pages 0 · every standalone "est." rendered grey.
- **Number audit:** every model figure on the slides matches the model-v4 output (Rp394bn, 35.1%, 2.95, 2031, −Rp46bn, Rp295bn, Rp98bn, 213k, Rp534bn, Rp415bn, 204k, Rp174bn; cash −135 / −231 / −225 / −154 / +12; value split 53 + 534 + 174 = 761, −363, −4 = 394; O = 338 + 125 + 71; Rp208bn at 60%; 55% haircut; Rp1,142bn comparator). Parts were re-added to totals: they reconcile except three cases that differ by Rp1bn from rounding in the model output (2027 and 2028 EBITDA rows; the 2031 revenue split sums to 1,135 vs 1,134). A22 says so on the page.

## 4. Device choices (one line each)

| Page | Device | Why |
|---|---|---|
| Cover | Dark page, H.O.M.E. letter badges, IndiHome hub with Orbit satellites inside a house, white "Proposed by" band | Ledger motif in the PVP cover grammar |
| P1 | Dark SCSI panel, pillar header tabs, gradient solution tiles, dashed impact boxes, E strip, number row | The PVP executive summary, with the ledger's E strip and number row |
| P2 | Three unlike zones (bars, price ladder, revenue line) + Key Question band | Ledger: Background is three unlike zones, not matching cards |
| P3 | Problem stated twice + scored issue tree + robustness box | Prioritisation is scored at 15%; scores and weights are visible |
| P4 | Diverging same-window bars, rank dots, award-slot tiles, verdict pills | Absolute growth avoids a misleading ratio; ranks read faster than a table |
| P5 | Native line chart of the crossover + numbered crossover chips + offload panel + page chips | Shows where Orbit stops being the cheapest option and why routing matters |
| P6 | Current → Key Question → Problem → Ideal bridge + problem/solution/why bands | The PVP analysis-conclusion device; links the analysis to the solution |
| P7 | Temple: roof band, three pillar columns with a What/How/Why/Impact rail, E foundation, theme band | The PVP solution overview; E drawn as a foundation, not a fourth column |
| P8 | Priority-household table + decision tree grid + household-path table + four non-price levers | Answers Key Questions 1 and 2 on one page |
| P9 | Governance map, swimlane roadmap with gate diamonds, pass-mark strip, 3×3 heat map + trigger table | Execution, gates and contingencies in the model's own units |
| P10 | Cumulative cash bars (grey negative), label-value metric boxes, value waterfall, KPI and conclusion band | The PVP projection page plus measurement and a conclusion line |
| Appendix | Tables with coloured header rows, tornado, waterfalls, heat maps, chevron model flow, verdict pills, theme cards | Every appendix page leads with a visual, per the ledger |

## 5. Deviations from the build contract (and why)

1. **Build tool.** The ledger asks for PowerPoint via PowerShell COM with the salman-decking scripts (`pptx-core.ps1`, `deck-devices.ps1`). None of these exist in this environment (Linux, no PowerPoint, no skill scripts). The deck is built with pptxgenjs to the same output spec: 720 × 405 pt, blank layout, composed shapes, the ledger palette and chrome. Files: `deck-lib.js`, `deck-slides-core.js`, `deck-slides-core2.js`, `deck-appendix-a.js`, `deck-appendix-b.js`, `deck-slides-appendix.js`, `build-deck.js` (with `--only n,m` for QA builds).
2. **Font.** The file uses Segoe UI. It is not installed here, so QA rendered it with an Arial-width substitute. **Check text fit once in PowerPoint on Windows before exporting the final PDF.**
3. **P8 additions:** a priority-household table (need, ambition, lead product) and a "What Telkomsel stops doing" card from file 03 §2.1 and §2.3. Without them the case's Key Question 1 (which segments, what needs) has no core page.
4. **P10 additions:** a KPI band (2028 → 2031 net stocks) and a one-line conclusion, to cover the guidebook's "Impact & Measurement" and "Conclusion" sections inside the 10-page limit.
5. **Core page labels:** line 1 reads "Executive Summary", "Problem Identification", "Analysis: Market and Competition" and so on (PVP style). The breadcrumb still bolds the ledger's section (P1 under Background).

## 6. Ledger and source disagreements

| Item | Ledger | Source | Resolution |
|---|---|---|---|
| "Value stays positive down to 55% of plan" (P10) | as quoted | Model: at 55% the life-of-homes NPV **equals zero**; at 60% it is +Rp45bn | P10 says "value falls to zero only if every take-up input lands at 55% of plan at once" (source wins) |
| "not X" constructions vs the text rule | Cover "Managing the home, not the line"; P1 "…not a discount"; P7 band "manage the home, not the line" | n/a | Kept verbatim because the ledger quotes them; **your call** whether to reword. My own seven "not X" phrasings were rewritten |
| Model figures | Ledger values | model-v4 output | All match; no disagreement |
| 2031 revenue components | Rp1,134bn | Components sum to 1,135 | Rounding; noted on A22 |

## 7. Open items before submission

1. **Team name and member names** (cover, author field, file name `MCC_DWDGITS26_TeamName.pdf`).
2. **Member photos** for the three cover circles (currently "[photo]").
3. **Submission cut-off hour on 17 Oct 2026** (not stated anywhere; confirm in the WhatsApp group).
4. **Font check** in PowerPoint (Segoe UI), then export the final PDF from PowerPoint.
5. **Decide the three ledger "not X" phrasings** (§6).
6. Optional, from file 03 Phase 0: the 12-contact mystery shop (stores, 188, agents, app chat) would turn the routing diagnosis from web evidence into channel evidence.
