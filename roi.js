/* ============================================================
   ROI CALCULATOR LOGIC · used only by index.html
   All model assumptions are the two constants below.
   The slider ranges and starting values live in index.html.
   ============================================================ */

// Sokin hybrid all-in cost assumption, in percent. 0.45 means 0.45%.
const HYBRID_COST = 0.45;

// Fully loaded integration and change programme cost, in dollars.
// Used for the payback figure.
const PROGRAM_COST = 150000;

// Business days per month, used to convert monthly volume into a
// daily payout run for the working-capital figure.
const BUSINESS_DAYS_PER_MONTH = 21;

/* ------------------------------------------------------------
   Everything below is mechanics. You should not need to touch it
   unless you want to change a formula.
   ------------------------------------------------------------ */

const el = (id) => document.getElementById(id);

// Format 1234567 as $1,234,567
function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

// Format 4000000 as $4M, 12500000 as $12.5M
function moneyCompact(value) {
  if (value >= 1000000) {
    const millions = value / 1000000;
    const digits = value >= 10000000 ? 0 : 1;
    return '$' + millions.toFixed(digits).replace('.0', '') + 'M';
  }
  return money(value);
}

function recalculate() {
  // Read the three sliders
  const volume = Number(el('volume').value);   // monthly payout volume, $
  const spread = Number(el('spread').value);   // current all-in FX spread, %
  const prefund = Number(el('prefund').value); // days of prefunding parked

  // The model
  const savedPct = Math.max(spread - HYBRID_COST, 0) / 100;   // fraction saved per dollar
  const savings = volume * 12 * savedPct;                     // annual savings, $
  const workingCapital = (volume / BUSINESS_DAYS_PER_MONTH) * prefund; // cash parked, $
  const bps = Math.round(savedPct * 10000);                   // basis points compressed

  // Payback period on the programme cost
  let payback = 'N/A';
  if (savings > 0) {
    const days = Math.round(PROGRAM_COST / (savings / 365));
    payback = days < 60 ? days + ' days' : (days / 30).toFixed(1) + ' months';
  }

  // Write the slider value labels
  el('volume-label').textContent = moneyCompact(volume);
  el('spread-label').textContent = spread.toFixed(2) + '%';
  el('prefund-label').textContent = prefund + (prefund === 1 ? ' day' : ' days');

  // Write the outputs
  el('savings').textContent = money(savings);
  el('bps').textContent = bps + ' bps compressed';
  el('annual-volume').textContent = moneyCompact(volume * 12);
  el('working-capital').textContent = money(workingCapital);
  el('payback').textContent = payback;
  el('program-cost').textContent = money(PROGRAM_COST);
}

// Recalculate live as any slider moves
['volume', 'spread', 'prefund'].forEach((id) => {
  el(id).addEventListener('input', recalculate);
});

// Fill in the initial numbers on page load
recalculate();
