/* ============================================================
   THE COST OF WAITING · calculator logic, used only by index.html
   There are no hardcoded model numbers in this file. Every
   assumption is read live from the editable inputs on the page,
   so the page itself is the single source of truth.
   ============================================================ */

const el = (id) => document.getElementById(id);

// Format 1234567.8 as $1,234,568
function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

// Read a numeric input; returns null when the field is empty.
function num(id) {
  const raw = el(id).value.trim();
  if (raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function recalculate() {
  // Headline inputs
  const volume = num('volume') ?? 0;        // monthly transfer volume, $
  const transfers = num('transfers') ?? 0;  // wires per month
  const days = num('days') ?? 0;            // legacy days in transit
  const chaseHours = num('chase-hours') ?? 0;

  // Assumptions
  const coc = num('coc') ?? 0;                    // % per year
  const hourly = num('hourly') ?? 0;              // $ per hour
  const lifting = num('lifting') ?? 0;            // $ per wire
  const legacySpread = num('legacy-spread') ?? 0; // %
  const sokinSpread = num('sokin-spread');        // %, null until entered
  const sokinHours = num('sokin-hours') ?? 0;
  const sokinDays = num('sokin-days') ?? 0;

  el('days-label').textContent = days + (days === 1 ? ' day' : ' days');

  // Column A: current stack, all monthly
  const aFx = volume * (legacySpread / 100);
  const aLift = transfers * lifting;
  const aRecon = chaseHours * hourly;
  const aOpp = volume * (coc / 100) * (days / 365);
  const aTotal = aFx + aLift + aRecon + aOpp;

  el('a-fx').textContent = money(aFx);
  el('a-lift').textContent = money(aLift);
  el('a-recon').textContent = money(aRecon);
  el('a-opp').textContent = money(aOpp);
  el('a-total').textContent = money(aTotal);
  el('a-total-annual').textContent = money(aTotal * 12);

  // Column B: Sokin, computed identically from the Sokin-side
  // assumptions. Lifting fees are zero by contract, the only line
  // allowed to be zero. FX waits for a published rate; it is never
  // guessed.
  const bLift = 0;
  const bRecon = sokinHours * hourly;
  const bOpp = volume * (coc / 100) * (sokinDays / 365);

  el('b-lift').textContent = money(bLift);
  el('b-recon').textContent = money(bRecon);
  el('b-opp').textContent = money(bOpp);

  const bFxEl = el('b-fx');
  const bTotalEl = el('b-total');
  const bTotalAnnualEl = el('b-total-annual');
  const diffMonthlyEl = el('diff-monthly');
  const diffAnnualEl = el('diff-annual');

  if (sokinSpread === null) {
    bFxEl.textContent = 'Enter Sokin\u2019s published rate';
    bFxEl.classList.add('pending');
    bTotalEl.textContent = '\u2013';
    bTotalAnnualEl.textContent = '\u2013';
    diffMonthlyEl.textContent = '\u2013';
    diffAnnualEl.textContent = '\u2013';
    return;
  }

  bFxEl.classList.remove('pending');
  const bFx = volume * (sokinSpread / 100);
  const bTotal = bFx + bLift + bRecon + bOpp;
  const diff = aTotal - bTotal;

  bFxEl.textContent = money(bFx);
  bTotalEl.textContent = money(bTotal);
  bTotalAnnualEl.textContent = money(bTotal * 12);
  diffMonthlyEl.textContent = money(diff);
  diffAnnualEl.textContent = money(diff * 12);
}

// Recalculate live as any input changes
[
  'volume', 'transfers', 'days', 'chase-hours',
  'coc', 'hourly', 'lifting', 'legacy-spread',
  'sokin-spread', 'sokin-hours', 'sokin-days'
].forEach((id) => {
  el(id).addEventListener('input', recalculate);
});

// Fill in the initial numbers on page load
recalculate();
