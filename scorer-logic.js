/* ============================================================
   WHO IS WORTH CHASING · scorer logic, used only by icp-scorer.html
   Fit comes from three selects (0 to 6). Intent comes from four
   checkboxes (0 to 4). The thresholds below decide which quadrant
   an account falls into. The jurisdiction disqualifier overrides
   everything.
   ============================================================ */

// An account is "high fit" at or above this score, out of 6.
const FIT_THRESHOLD = 4;

// An account is "high intent" at or above this score, out of 4.
const INTENT_THRESHOLD = 2;

/* ------------------------------------------------------------
   Mechanics below.
   ------------------------------------------------------------ */

const FIT_MAX = 6;
const INTENT_MAX = 4;

// SVG plot area, must match the rect in the HTML.
const PLOT = { x: 40, y: 20, w: 380, h: 340 };

const el = (id) => document.getElementById(id);
const fitInputs = ['corridor', 'volume-band', 'size'].map(el);
const intentInputs = Array.from(document.querySelectorAll('.intent'));
const disqualified = el('disqualified');
const dot = el('quad-dot');
const panel = el('verdict-panel');
const title = el('verdict-title');
const body = el('verdict-body');

const VERDICTS = {
  go: {
    title: 'Contact this week',
    body: 'High fit, high intent. Something is happening inside this account right now. A seller should own it before the window closes.'
  },
  wait: {
    title: 'Nurture and wait for a trigger',
    body: 'The account fits, but nothing is moving yet. Stay present with useful material and watch for a hiring, migration or leadership event.'
  },
  auto: {
    title: 'Automated nurture only',
    body: 'Something is happening, but the account does not structurally fit. Do not staff it. Let lifecycle email carry it, and revisit only if the structure changes.'
  },
  skip: {
    title: 'Skip',
    body: 'No fit, no movement. Every hour spent here is an hour taken from an account in the top right.'
  },
  stop: {
    title: 'Stop. Do not pursue.',
    body: 'A sanctioned or prohibited jurisdiction sits in the payment flow. No score overrides this. Flag it and move on.'
  }
};

function updateScore() {
  const fit = fitInputs.reduce((sum, input) => sum + Number(input.value), 0);
  const intent = intentInputs.filter((box) => box.checked).length;

  // Place the dot: fit runs left to right, intent runs bottom to top.
  const pad = 26;
  const cx = PLOT.x + pad + (fit / FIT_MAX) * (PLOT.w - pad * 2);
  const cy = PLOT.y + PLOT.h - pad - (intent / INTENT_MAX) * (PLOT.h - pad * 2);
  dot.setAttribute('cx', cx);
  dot.setAttribute('cy', cy);

  panel.classList.remove('go', 'stop');

  if (disqualified.checked) {
    panel.classList.add('stop');
    dot.setAttribute('fill', '#ef4444');
    title.textContent = VERDICTS.stop.title;
    body.textContent = VERDICTS.stop.body;
    return;
  }

  const highFit = fit >= FIT_THRESHOLD;
  const highIntent = intent >= INTENT_THRESHOLD;

  let verdict;
  if (highFit && highIntent) {
    verdict = VERDICTS.go;
    panel.classList.add('go');
    dot.setAttribute('fill', '#34d399');
  } else if (highFit) {
    verdict = VERDICTS.wait;
    dot.setAttribute('fill', '#67e8f9');
  } else if (highIntent) {
    verdict = VERDICTS.auto;
    dot.setAttribute('fill', '#a5b4fc');
  } else {
    verdict = VERDICTS.skip;
    dot.setAttribute('fill', '#64748b');
  }

  title.textContent = verdict.title;
  body.textContent = verdict.body;
}

[...fitInputs, ...intentInputs, disqualified].forEach((input) => {
  input.addEventListener('input', updateScore);
});

// Set the initial state on page load
updateScore();
