# Sokin Send War Room

Five plain HTML pages, one shared stylesheet, two small scripts. No frameworks, no build step, nothing generated.

## The files

| File | What it is | Edit it to change |
|---|---|---|
| `index.html` | Tab 1 · ROI Calculator | Calculator page copy, slider ranges and starting values |
| `roi.js` | Calculator logic | The model: hybrid cost, programme cost, formulas |
| `battlecard.html` | Tab 2 · Compliance Battlecard | The objection, the response, the proof points |
| `icp-scorer.html` | Tab 3 · ICP Scorer | The trigger titles and descriptions |
| `icp.js` | Scorer logic | The qualify threshold and verdict wording |
| `icp-live.html` | Model performance (not yet in nav) | Page copy, metric labels, coverage and footnote wording |
| `icp-live.js` | Model performance data and rendering | The baseline win rate and the full dataset |
| `weekend-test.html` | Tab 4 · The Weekend Test | The hook, the four funnel stages, the two routes |
| `90-days.html` | Tab 5 · 90 Days vs the JD | The JD table rows and the closer |
| `styles.css` | Shared design system | Colours, fonts, spacing, everywhere at once |

## Editing rules

1. **Each tab is its own file.** Breaking one page cannot break the others.
2. **All copy lives in the HTML.** Open the page, find the sentence, change it, save.
3. **To add an item** (a proof point, a trigger, a JD row), copy one whole block from `<div ...>` to its closing `</div>` and edit the text inside. The comments in each file mark where.
4. **The header is copied across all five pages.** If you rename a tab, do it in all five files. Search for the old label across the folder to catch every copy.
5. **The two numbers behind the calculator** (hybrid cost 0.45%, programme cost $150,000) sit at the top of `roi.js` with comments. The "any two triggers qualifies" threshold sits at the top of `icp.js`.
6. **The model performance page** draws everything from the top of `icp-live.js`: the baseline win rate and the full dataset sit there in one commented block, matching how `roi.js` and `icp.js` work.

## Previewing locally

Double-click any of the five HTML files. They open and work directly in the browser, no server needed.

## Deploying to Vercel

See the walkthrough in the chat where this was generated, or in short: push this folder to a GitHub repository, import it at vercel.com/new, deploy with no build settings. Every later edit is commit, push, done. Vercel redeploys automatically.
