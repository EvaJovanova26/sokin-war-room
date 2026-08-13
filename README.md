# Sokin Send GTM Hub

Five plain HTML pages, one shared stylesheet, two small logic files. No frameworks, no build step, no npm.

## The files

| File | What it is | Edit it to change |
|---|---|---|
| `index.html` | Tab 1 · The cost of waiting | Page copy, headline inputs, assumption defaults and labels |
| `calculator-logic.js` | Tab 1 logic | The formulas only. All assumption values live in the HTML inputs |
| `battlecard.html` | Tab 2 · Frozen is not safe | The three plays and the regulatory footer |
| `icp-scorer.html` | Tab 3 · Who is worth chasing | Fit and intent inputs, quadrant labels, verdict panel |
| `scorer-logic.js` | Tab 3 logic | Fit and intent thresholds, verdict wording |
| `icp-live.html` | Model performance, not yet in the nav | Page copy, metric labels, coverage and footnote wording |
| `icp-live.js` | Model performance data and rendering | The baseline win rate and the full dataset |
| `weekend-test.html` | Tab 4 · The Weekend Test | The hook, the three phases, kill criteria, ground-level toggles |
| `90-days.html` | Tab 5 · The first 90 days | The three phases and the closer |
| `styles.css` | Shared design system | Colours, fonts, spacing, everywhere at once |

## Editing rules

1. **Each tab is its own file.** Breaking one page cannot break the others.
2. **All copy lives in the HTML.** Open the page, find the sentence, change it, save.
3. **To add an item** (a play, an intent checkbox, a phase), copy one whole block from its opening tag to its closing tag and edit the text inside. The comments in each file mark where.
4. **The header is copied across all five pages.** If you rename a tab, do it in all five files. Search for the old label across the folder to catch every copy.
5. **Model numbers.** The tab 1 calculator has no hardcoded assumptions in JavaScript; every assumption is an editable input on the page itself, including the Sokin FX spread, which is deliberately blank until a published rate is entered. The tab 3 thresholds (fit 4 of 6, intent 2 of 4) sit at the top of `scorer-logic.js` with comments.
6. **The model performance page** draws everything from the top of `icp-live.js`: the baseline win rate and the full dataset sit there in one commented block, following the same pattern.

## Previewing locally

Double-click any of the five HTML files. They open and work directly in the browser, no server needed.

## Deploying to Vercel

Push this folder to a GitHub repository, import it at vercel.com/new, deploy with no build settings. Every later edit is commit, push, done. Vercel redeploys automatically.
