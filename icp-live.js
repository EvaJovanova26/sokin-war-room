/* ============================================================
   ICP MODEL PERFORMANCE · used only by icp-live.html
   Everything you might want to change lives in the two
   constants below. The mechanics underneath render the page.
   ============================================================ */

// Win rate across all scored accounts, in percent. Triggers at or
// below this line are not earning their place and render grey.
const BASELINE_WIN_RATE = 23;

// The whole dataset. Replace these with real CRM figures.
const DATA = {
  book: 1410,               // total accounts in the book
  scored: 1284,             // accounts with trigger fields filled
  qualified: 217,           // accounts hitting two or more triggers
  pipelineShare: 64,        // % of new Send pipeline from qualified accounts
  cycleQualified: 71,       // average days to close, qualified
  cycleUnqualified: 118,    // average days to close, unqualified
  staleFields: 9,           // trigger fields untouched in 90 days
  coverageFloor: 90,        // % coverage below which numbers are unreliable
  triggers: [
    { name: 'Prefunding parked',     prevalence: 31, winRate: 42 },
    { name: 'Cutoffs block payouts', prevalence: 24, winRate: 39 },
    { name: 'Multi-provider sprawl', prevalence: 46, winRate: 21 },
    { name: 'Spread complaints',     prevalence: 12, winRate: 44 }
  ]
};

/* ------------------------------------------------------------
   Everything below is mechanics. You should not need to touch it
   unless you want to change how the page renders.
   ------------------------------------------------------------ */

const el = (id) => document.getElementById(id);

// Format 1410 as 1,410
const count = new Intl.NumberFormat('en-US');

// 1. The four metric cards
el('m-scored').textContent = count.format(DATA.scored);
el('m-scored-note').textContent = 'of ' + count.format(DATA.book) + ' in book';

const qualifiedPct = Math.round(DATA.qualified / DATA.scored * 100);
el('m-qualified').textContent = count.format(DATA.qualified);
el('m-qualified-note').textContent = qualifiedPct + '% of scored';

el('m-pipeline').textContent = DATA.pipelineShare + '%';
el('m-pipeline-note').textContent = 'of new Send pipeline';

el('m-cycle').textContent = DATA.cycleQualified + ' days';
el('m-cycle-note').textContent = 'vs ' + DATA.cycleUnqualified + ' days unqualified';

// 2. The trigger rows. One row per entry in DATA.triggers; add or
// remove an entry there and this loop follows with no other change.
const rowsHost = el('trigger-rows');

DATA.triggers.forEach((trigger) => {
  const row = document.createElement('div');
  row.className = 'perf-row';

  const head = document.createElement('div');
  head.className = 'perf-head';

  const name = document.createElement('span');
  name.className = 'perf-name';
  name.textContent = trigger.name;

  const stats = document.createElement('span');
  stats.className = 'perf-stats';
  stats.textContent = trigger.prevalence + '% flagged · ' + trigger.winRate + '% win';

  head.appendChild(name);
  head.appendChild(stats);

  const track = document.createElement('div');
  track.className = 'perf-track';

  const fill = document.createElement('div');
  fill.className = 'perf-fill';
  fill.style.width = trigger.prevalence + '%';

  // The colour carries the argument: triggers beating the baseline
  // render emerald, triggers at or below it recede to grey.
  fill.style.background = trigger.winRate > BASELINE_WIN_RATE
    ? 'var(--emerald)'
    : 'var(--text-faint)';

  track.appendChild(fill);
  row.appendChild(head);
  row.appendChild(track);
  rowsHost.appendChild(row);
});

// 3. The baseline line
el('perf-baseline').textContent =
  'Baseline win rate across all scored accounts: ' + BASELINE_WIN_RATE + '%';

// 4 and 5. The coverage strip. Amber warning below the floor,
// neutral emerald when coverage is healthy. The warning is
// conditional rather than decorative.
const unscored = DATA.book - DATA.scored;
const coverage = DATA.scored / DATA.book * 100;

if (coverage >= DATA.coverageFloor) {
  el('coverage-bar').classList.add('healthy');
  el('coverage-head').textContent = 'Coverage healthy at ' + Math.round(coverage) + '%';
  el('coverage-sub').textContent =
    count.format(unscored) + ' accounts unscored · ' + DATA.staleFields +
    ' trigger fields not updated in 90 days. Below ' + DATA.coverageFloor +
    '% coverage, every number above becomes unreliable.';
} else {
  el('coverage-head').textContent =
    count.format(unscored) + ' accounts unscored · ' + DATA.staleFields +
    ' trigger fields not updated in 90 days';
  el('coverage-sub').textContent =
    'Coverage below ' + DATA.coverageFloor + '% makes every number above unreliable.';
}
