/* ============================================================
   ICP SCORER LOGIC · used only by icp-scorer.html
   The trigger text lives in the HTML. This file only counts
   which triggers are switched on and updates the score panel.
   ============================================================ */

// How many active triggers qualify an account.
const QUALIFY_THRESHOLD = 2;

/* ------------------------------------------------------------
   Mechanics below. Add or remove triggers in the HTML freely;
   this script finds them all automatically.
   ------------------------------------------------------------ */

const triggers = document.querySelectorAll('.trigger');
const ring = document.getElementById('score-ring');
const scoreValue = document.getElementById('score-value');
const denominator = document.getElementById('score-denominator');
const verdict = document.getElementById('score-verdict');
const explain = document.getElementById('score-explain');
const sequenceBtn = document.getElementById('sequence-btn');

function updateScore() {
  const score = document.querySelectorAll('.trigger.active').length;
  const qualified = score >= QUALIFY_THRESHOLD;

  scoreValue.textContent = score;
  denominator.textContent = 'of ' + triggers.length + ' triggers';

  ring.classList.toggle('qualified', qualified);
  verdict.classList.toggle('qualified', qualified);

  if (qualified) {
    verdict.textContent = 'ICP qualified';
    explain.textContent = 'Any two triggers qualifies. Route to the corridor sequence with the ROI model pre-loaded.';
  } else if (score === 1) {
    verdict.textContent = 'One trigger, keep nurturing';
    explain.textContent = 'Below threshold. Stays in lifecycle email until a second behaviour appears.';
  } else {
    verdict.textContent = 'Not yet qualified';
    explain.textContent = 'Below threshold. Stays in lifecycle email until a second behaviour appears.';
  }

  sequenceBtn.disabled = !qualified;
  sequenceBtn.classList.toggle('enabled', qualified);
}

// Clicking a trigger toggles it on or off
triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    trigger.classList.toggle('active');
    updateScore();
  });
});

// Set the initial state on page load
updateScore();
