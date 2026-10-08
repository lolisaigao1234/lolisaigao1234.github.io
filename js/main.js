// Wires the form to the audit state and mounts the interactive exhibits.

import { taxpayer, income, education, project, skills, db, trades } from './data.js';
import { createAudit, reduce, progress, canSign } from './audit.js';
import { ask } from './nl2sql.js';
import { callPrice, impliedVol } from './blackscholes.js';
import { summarize, scoreConnection } from './wifi.js';
import { findWashSales } from './washsale.js';

/** @typedef {import('./audit.js').AuditState} AuditState */
/** @typedef {import('./data.js').ExhibitKind} ExhibitKind */
/**
 * Everything the evidence dialog needs to know about one auditable line.
 * @typedef {{ id: string, no: string, title: string, evidence: string[], exhibit?: ExhibitKind, appeal: string }} Auditable
 */

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const today = new Date();

// ---------------------------------------------------------------- helpers

/** @param {string} selector */
const $ = (selector) => /** @type {HTMLElement} */ (document.querySelector(selector));

/**
 * Tiny element builder: h('p', { class: 'x' }, 'text', child).
 * @param {string} tag
 * @param {Record<string, string | boolean | ((e: Event) => void)>} [props]
 * @param {(Node | string | null | undefined | false)[]} children
 */
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'function') el.addEventListener(key.replace(/^on/, ''), value);
    else if (value === true) el.setAttribute(key, '');
    else if (value !== false) el.setAttribute(key, value);
  }
  for (const child of children) if (child) el.append(child);
  return el;
}

/** Dollars, with extra decimals for amounts too small to show at cents. */
const money = (/** @type {number} */ n) => `$${n.toFixed(n !== 0 && Math.abs(n) < 0.005 ? 4 : 2)}`;
const pct = (/** @type {number} */ n) => `${(n * 100).toFixed(2)}%`;
const stampDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

/** @param {string} iso */
const shortDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// ---------------------------------------------------------------- state

/** @type {Auditable[]} */
const auditables = [
  ...income.map((l) => ({ id: l.id, no: l.no, title: l.label, evidence: l.evidence, exhibit: l.exhibit, appeal: l.appeal })),
  { id: education.id, no: education.no, title: education.label, evidence: education.evidence, appeal: education.appeal },
  { id: project.id, no: '10', title: project.label, evidence: project.evidence, exhibit: 'washsale', appeal: project.appeal },
];

let state = createAudit(auditables.map((a) => a.id));

/** @param {import('./audit.js').AuditAction} action */
function dispatch(action) {
  const before = state;
  state = reduce(state, action);
  if (state === before) return;
  if (action.type !== 'sign') stampLine(action.id);
  renderTally();
}

// ---------------------------------------------------------------- the form

function renderTaxpayer() {
  /** @param {string} label @param {string | Node} value @param {string} [cls] */
  const field = (label, value, cls = '') =>
    h('div', { class: `field ${cls}` }, h('span', { class: 'field-label' }, label), h('span', { class: 'typed field-value' }, value));
  /** @param {string} label @param {boolean} checked */
  const box = (label, checked) =>
    h('span', { class: 'check' }, h('span', { class: 'box typed', 'aria-hidden': 'true' }, checked ? 'X' : ''), h('span', { class: 'sr-only' }, checked ? 'Checked: ' : 'Not checked: '), label);

  $('#taxpayer').append(
    field('Your first name and middle initial', taxpayer.first, 'span-2'),
    field('Last name', taxpayer.last),
    field('Occupation', taxpayer.occupation, 'span-2'),
    field('Region', taxpayer.region),
    field('Home address (number and street)', h('a', { href: '/' }, taxpayer.home), 'span-2'),
    field('Languages', taxpayer.languages),
    h('div', { class: 'field span-3 checks' },
      h('span', { class: 'field-label' }, 'Filing status. Check only one box.'),
      h('span', { class: 'check-row' }, box('Student', false), box('Employed full time', true), box('Retired early on options profits', false))),
    h('div', { class: 'field span-3 checks' },
      h('span', { class: 'field-label' }, 'At any time during the year, did you write an automated test?'),
      h('span', { class: 'check-row' }, box('Yes, 1,050+ of them', true), box('No', false))),
  );
}

/**
 * @param {{ id: string, no: string, label: string, meta: string, entries: string[], amount: string }} line
 */
function lineItem({ id, no, label, meta, entries, amount }) {
  return h('li', { class: 'line', 'data-line': id },
    h('span', { class: 'line-no' }, no),
    h('div', { class: 'line-body' },
      h('p', { class: 'line-label' }, label, h('span', { class: 'line-meta' }, meta)),
      ...entries.map((e) => h('p', { class: 'typed line-entry' }, e))),
    h('span', { class: 'line-amount typed' }, amount),
    h('div', { class: 'line-audit' },
      h('button', { class: 'audit-button', type: 'button', 'data-open': id }, `Audit line ${no}`)));
}

function renderLines() {
  $('#income').append(...income.map((l) =>
    lineItem({ id: l.id, no: l.no, label: l.label, meta: `${l.place}, ${l.period}`, entries: [l.entry], amount: l.amount })));

  $('#education').append(lineItem({
    id: education.id,
    no: education.no,
    label: education.label,
    meta: 'Champaign, 2020–2025',
    entries: education.degrees.map((d) => `${d.degree}, ${d.finished}. ${d.minor}.`),
    amount: '2 degrees',
  }));

  $('#project').append(lineItem({
    id: project.id,
    no: '10',
    label: 'Independent project',
    meta: project.period,
    entries: [project.label],
    amount: '0 wash sales missed',
  }));

  $('#skills').append(...skills.flatMap((s) => [
    h('dt', {}, s.category),
    h('dd', { class: 'typed' }, s.items.join(', ')),
  ]));

  $('#payment').append(
    h('li', {}, h('a', { class: 'pay', href: `mailto:${taxpayer.email}` }, 'Email'), h('span', { class: 'typed' }, taxpayer.email)),
    h('li', {}, h('a', { class: 'pay', href: taxpayer.linkedin, rel: 'me' }, 'LinkedIn'), h('span', { class: 'typed' }, 'jiayang-wu-85b960179')),
    h('li', {}, h('a', { class: 'pay', href: taxpayer.github, rel: 'me' }, 'GitHub'), h('span', { class: 'typed' }, 'lolisaigao1234')),
  );

  document.addEventListener('click', (e) => {
    const button = /** @type {HTMLElement} */ (e.target).closest('[data-open]');
    if (button instanceof HTMLElement && button.dataset.open) openExhibit(button.dataset.open);
  });
}

/** Press a rubber stamp onto a line that just got audited. @param {string} id */
function stampLine(id) {
  const row = document.querySelector(`[data-line="${id}"]`);
  if (!row) return;
  const appealed = state.lines[id] === 'appealed';
  const tilt = (Math.random() * 14 - 7).toFixed(1);
  const stamp = h('span', { class: `stamp${appealed ? ' stamp-appeal' : ''}`, style: `--tilt:${tilt}deg` },
    h('b', {}, appealed ? 'Appeal upheld' : 'Verified'),
    h('small', {}, `RRS ${stampDate}`));
  row.classList.add('stamped');
  row.querySelector('.line-audit')?.prepend(stamp);
  // The stamp is the visual; the button stays underneath it so the evidence can be reopened.
  row.querySelector('.audit-button')?.setAttribute('aria-label', `Reopen evidence for line ${row.querySelector('.line-no')?.textContent}`);
  const total = income.filter((l) => state.lines[l.id] !== 'unaudited').length;
  $('#income-total').textContent = `${total} of ${income.length}`;
}

function renderTally() {
  const { done, total } = progress(state);
  const tally = $('#tally');
  tally.replaceChildren(
    h('p', { class: 'tally-head' }, 'Auditor’s tally'),
    state.signedBy
      ? h('p', {}, `Audit closed. Signed by ${state.signedBy}.`)
      : h('p', {}, `${done} of ${total} lines stamped`),
    state.appeals ? h('p', {}, state.appeals === 1 ? '1 appeal, lost' : `${state.appeals} appeals, all lost`) : '',
  );
  tally.hidden = false;
}

// ---------------------------------------------------------------- evidence dialog

const dialog = /** @type {HTMLDialogElement} */ ($('#exhibit'));
/** @type {string | null} */
let openId = null;

/** @param {string} id */
function openExhibit(id) {
  const line = auditables.find((a) => a.id === id);
  if (!line) return;
  openId = id;
  const status = state.lines[id];
  $('#exhibit-kicker').textContent = `Evidence for line ${line.no}`;
  $('#exhibit-title').textContent = line.title;
  $('#exhibit-evidence').replaceChildren(...line.evidence.map((e) => h('li', {}, e)));
  const demo = $('#exhibit-demo');
  demo.replaceChildren();
  demo.hidden = !line.exhibit;
  if (line.exhibit) exhibits[line.exhibit](demo);
  const appeal = $('#exhibit-appeal');
  appeal.hidden = status !== 'appealed';
  appeal.textContent = status === 'appealed' ? `Appeal upheld. ${line.appeal}` : '';
  $('#exhibit-actions').hidden = status !== 'unaudited';
  dialog.showModal();
  dialog.scrollTop = 0;
}

function closeExhibit() {
  dialog.close();
}

dialog.addEventListener('close', () => {
  const opener = openId && document.querySelector(`[data-open="${openId}"]`);
  if (opener instanceof HTMLElement) opener.focus();
  openId = null;
});
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) closeExhibit(); // backdrop click
});
$('#exhibit-close').addEventListener('click', closeExhibit);

$('#verify').addEventListener('click', () => {
  if (!openId) return;
  dispatch({ type: 'verify', id: openId });
  closeExhibit();
});

$('#disallow').addEventListener('click', () => {
  if (!openId) return;
  const line = auditables.find((a) => a.id === openId);
  dispatch({ type: 'disallow', id: openId });
  $('#exhibit-actions').hidden = true;
  const appeal = $('#exhibit-appeal');
  appeal.textContent = `Appeal filed and upheld. ${line?.appeal ?? ''}`;
  appeal.hidden = false;
  appeal.scrollIntoView({ block: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  $('#exhibit-close').focus();
});

// ---------------------------------------------------------------- exhibits

/** @type {Record<ExhibitKind, (root: HTMLElement) => void>} */
const exhibits = {
  sql(root) {
    const input = /** @type {HTMLInputElement} */ (h('input', { type: 'text', name: 'q', autocomplete: 'off', placeholder: 'Where did he work in 2024?' }));
    const out = h('div', { class: 'sql-out', 'aria-live': 'polite' });

    /** @param {string} question */
    const run = (question) => {
      const answer = ask(question, db);
      if (!answer.sql) {
        out.replaceChildren(h('pre', { class: 'code' },
          '-- No rule matched that question.\n-- The original hit 80%. This pocket version is pickier.\n-- Try a company, a year, a skill, or a degree.'));
        return;
      }
      const columns = Object.keys(answer.rows[0] ?? {});
      out.replaceChildren(
        h('pre', { class: 'code' }, answer.sql),
        answer.rows.length
          ? h('table', { class: 'result' },
              h('thead', {}, h('tr', {}, ...columns.map((c) => h('th', { scope: 'col' }, c)))),
              h('tbody', {}, ...answer.rows.map((r) => h('tr', {}, ...columns.map((c) => h('td', {}, r[c] === null ? 'NULL' : String(r[c])))))))
          : h('p', { class: 'typed' }, '0 rows. The taxpayer did not claim that one.'),
      );
    };

    root.append(
      h('h3', {}, 'Try the pipeline: ask Rocky’s résumé a question'),
      h('form', { class: 'ask', onsubmit: (e) => { e.preventDefault(); if (input.value.trim()) run(input.value); } },
        h('label', { class: 'sr-only', for: 'ask-q' }, 'Your question'),
        Object.assign(input, { id: 'ask-q' }),
        h('button', { class: 'button', type: 'submit' }, 'Translate and run')),
      h('p', { class: 'chips' }, ...['What is he doing now?', 'Does he know FastAPI?', 'How many internships?', 'When did he graduate?'].map((q) =>
        h('button', { class: 'chip', type: 'button', onclick: () => { input.value = q; run(q); } }, q))),
      out,
    );
  },

  blackscholes(root) {
    const contract = { S: 100, K: 105, T: 0.5, r: 0.03 };
    const trueSigma = 0.22 + Math.random() * 0.36;
    const market = callPrice({ ...contract, sigma: trueSigma });
    const slider = /** @type {HTMLInputElement} */ (h('input', { type: 'range', min: '5', max: '150', value: '80', id: 'sigma' }));
    const reading = h('p', { class: 'typed', 'aria-live': 'polite' });
    const steps = h('ol', { class: 'steps typed' });
    const verdict = h('p', { class: 'typed verdict', 'aria-live': 'polite' });

    const update = () => {
      const sigma = Number(slider.value) / 100;
      const model = callPrice({ ...contract, sigma });
      const gap = model - market;
      reading.textContent = Math.abs(gap) < 0.05
        ? `σ = ${slider.value}%: model ${money(model)}. Close enough to trade on.`
        : `σ = ${slider.value}%: model ${money(model)}, ${money(Math.abs(gap))} too ${gap > 0 ? 'high' : 'low'}.`;
    };

    const solve = () => {
      const result = impliedVol({ ...contract, price: market, guess: Number(slider.value) / 100 });
      steps.replaceChildren();
      verdict.textContent = '';
      const delay = reducedMotion.matches ? 0 : 280;
      result.steps.forEach((s, i) => {
        setTimeout(() => {
          steps.append(h('li', {}, `σ = ${pct(s.sigma)}, model ${money(s.price)}, off by ${s.error >= 0 ? '+' : '−'}${money(Math.abs(s.error))}`));
          if (i === result.steps.length - 1) {
            verdict.textContent = result.converged
              ? `Converged in ${result.steps.length} steps. The market is pricing σ = ${pct(result.sigma)}.`
              : 'Newton overshot from that guess. Production solvers bracket first; try a guess nearer the middle.';
          }
        }, delay * i);
      });
    };

    slider.addEventListener('input', update);
    root.append(
      h('h3', {}, 'Back out the volatility the market is assuming'),
      h('p', {}, `A six-month call on a $100 stock, strike $105, rates at 3%. The market pays ${money(market)}. Drag until the model agrees, or hand it to Newton.`),
      h('label', { class: 'slider', for: 'sigma' }, h('span', {}, 'Your volatility guess'), slider),
      reading,
      h('button', { class: 'button', type: 'button', onclick: solve }, 'Let Newton-Raphson solve from my guess'),
      steps,
      verdict,
    );
    update();
  },

  wifi(root) {
    const status = h('p', { class: 'typed', 'aria-live': 'polite' });
    const result = h('div', { class: 'wifi-result' });
    const button = /** @type {HTMLButtonElement} */ (h('button', { class: 'button', type: 'button' }, 'Score my connection'));

    button.addEventListener('click', async () => {
      button.disabled = true;
      result.replaceChildren();
      /** @type {(number | null)[]} */
      const samples = [];
      for (let i = 0; i < 10; i++) {
        status.textContent = `Probing ${i + 1} of 10…`;
        samples.push(await probe(i));
      }
      const conn = /** @type {{ connection?: { downlink?: number } }} */ (/** @type {unknown} */ (navigator)).connection;
      const score = scoreConnection({ ...summarize(samples), downlinkMbps: conn?.downlink ?? null });
      status.textContent = `Network #1,776 scored on ${score.dimensions.length} dimensions.`;
      result.replaceChildren(
        h('p', { class: 'score' }, h('b', {}, String(score.total)), ' out of 100'),
        h('ul', { class: 'dimensions' }, ...score.dimensions.map((d) =>
          h('li', {},
            h('span', { class: 'dim-name' }, d.name),
            h('span', { class: 'bar', style: `--v:${d.score}%`, role: 'img', 'aria-label': `${d.score} out of 100` }),
            h('span', { class: 'typed dim-reading' }, `${d.score}, ${d.reading}`)))),
      );
      button.textContent = 'Score it again';
      button.disabled = false;
    });

    root.append(
      h('h3', {}, 'You are network #1,776'),
      h('p', {}, 'Rocky’s service scores about 1,775 networks every 15 minutes across 9 health dimensions. From inside a browser this page can measure up to 4 of them on yours.'),
      button,
      status,
      result,
    );
  },

  washsale(root) {
    const wash = new Set(findWashSales(trades));
    const byId = new Map(trades.map((t) => [t.id, t]));
    const verdict = h('p', { class: 'typed verdict', 'aria-live': 'polite' });
    const DAY = 864e5;

    /** @param {import('./washsale.js').Trade} sale */
    const explain = (sale) => {
      const lot = /** @type {import('./washsale.js').Trade} */ (byId.get(sale.lot ?? ''));
      if (sale.price >= lot.price) {
        return `Not a wash. Sold at ${money(sale.price)} against a ${money(lot.price)} basis: a gain. The rule only bites losses.`;
      }
      const rebuy = trades.find((t) => t.side === 'buy' && t.id !== lot.id && t.symbol === sale.symbol &&
        Math.abs(Date.parse(t.date) - Date.parse(sale.date)) <= 30 * DAY);
      if (wash.has(sale.id) && rebuy) {
        const days = Math.round(Math.abs(Date.parse(rebuy.date) - Date.parse(sale.date)) / DAY);
        return `Correct. A ${money(lot.price - sale.price)} loss, and ${sale.symbol} was bought again ${days} days away. The loss is disallowed and rolls into the new lot’s basis.`;
      }
      return 'Not a wash. A loss, but no replacement purchase within 30 days either side.';
    };

    root.append(
      h('h3', {}, 'Spot the wash sale'),
      h('p', {}, 'Rocky’s reconciler flags these automatically. One of these sales can’t be deducted. Which one?'),
      h('table', { class: 'result trades' },
        h('thead', {}, h('tr', {}, ...['Date', 'Trade', 'Price', ''].map((c) => h('th', { scope: 'col' }, c)))),
        h('tbody', {}, ...trades.map((t) => {
          const lot = t.lot ? byId.get(t.lot) : undefined;
          return h('tr', {},
            h('td', {}, shortDate(t.date)),
            h('td', {}, t.side === 'buy' ? `Buy ${t.symbol}` : `Sell ${t.symbol} bought ${lot ? shortDate(lot.date) : ''}`),
            h('td', {}, money(t.price)),
            h('td', {}, t.side === 'sell'
              ? h('button', { class: 'chip', type: 'button', onclick: () => { verdict.textContent = explain(t); } }, 'Flag')
              : ''));
        }))),
      verdict,
    );
  },
};

/** Time one uncached round trip to this site; null if it fails or stalls. @param {number} i */
async function probe(i) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  const start = performance.now();
  try {
    const res = await fetch(`assets/favicon.png?probe=${i}-${Date.now()}`, { cache: 'no-store', signal: controller.signal });
    await res.arrayBuffer();
    return res.ok ? performance.now() - start : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------- signature

function setupSignature() {
  const canvas = /** @type {HTMLCanvasElement} */ ($('#signature'));
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
  const input = /** @type {HTMLInputElement} */ ($('#signer'));
  const status = $('#sign-status');
  let drawn = false;
  let drawing = false;

  const penColor = () => getComputedStyle(document.documentElement).getPropertyValue('--pen').trim() || '#1d3fa0';

  /** @param {PointerEvent} e @returns {[number, number]} */
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * canvas.width, ((e.clientY - r.top) / r.height) * canvas.height];
  };

  canvas.addEventListener('pointerdown', (e) => {
    if (state.signedBy) return;
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    ctx.strokeStyle = penColor();
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(...point(e));
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    ctx.lineTo(...point(e));
    ctx.stroke();
    drawn = true;
  });
  const stop = () => { drawing = false; };
  canvas.addEventListener('pointerup', stop);
  canvas.addEventListener('pointercancel', stop);

  $('#clear-signature').addEventListener('click', () => {
    if (state.signedBy) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawn = false;
    input.value = '';
  });

  $('#sign-button').addEventListener('click', () => {
    const { done, total } = progress(state);
    if (!canSign(state)) {
      const left = total - done;
      status.textContent = `Stamp the remaining ${left} ${left === 1 ? 'line' : 'lines'} first. Unaudited lines still have their Audit buttons.`;
      return;
    }
    const name = input.value.trim() || (drawn ? 'the auditor' : '');
    if (!name) {
      status.textContent = 'Draw a signature or type your name first.';
      input.focus();
      return;
    }
    dispatch({ type: 'sign', name });
    input.disabled = true;
    $('#sign-button').hidden = true;
    $('#clear-signature').hidden = true;
    $('#sign').append(h('span', { class: 'stamp stamp-closed', style: '--tilt:-12deg', 'aria-hidden': 'true' },
      h('b', {}, 'Audit closed'), h('small', {}, `RRS ${stampDate}`)));
    status.textContent = `Signed by ${name}, ${today.toLocaleDateString('en-US', { dateStyle: 'long' })}. Audit closed with ${state.appeals ? `${state.appeals} lost ${state.appeals === 1 ? 'appeal' : 'appeals'}` : 'no disputes'}. Line 11 is still outstanding.`;
  });
}

// ---------------------------------------------------------------- envelope

function setupEnvelope() {
  const stage = $('#envelope');
  const desk = $('#desk');
  // A deterministic four-state postal barcode, like the ones on real mail.
  $('.barcode').append(...Array.from({ length: 65 }, (_, i) => h('span', { class: 'tadf'[(i * 7 + i * i + 3) % 4] })));
  let seen = false;
  try {
    seen = sessionStorage.getItem('rrs-opened') === '1';
  } catch {}
  if (seen || location.hash) return;

  stage.hidden = false;
  desk.inert = true;
  document.documentElement.classList.add('sealed');

  $('#tear').addEventListener('click', () => {
    try {
      sessionStorage.setItem('rrs-opened', '1');
    } catch {}
    const finish = () => {
      stage.hidden = true;
      desk.inert = false;
      document.documentElement.classList.remove('sealed');
      $('#notice-title').setAttribute('tabindex', '-1');
      $('#notice-title').focus({ preventScroll: true });
    };
    if (reducedMotion.matches) return finish();
    stage.classList.add('opening');
    setTimeout(finish, 1100);
  }, { once: true });
}

// ---------------------------------------------------------------- boot

$('#today').textContent = today.toLocaleDateString('en-US', { dateStyle: 'long' });
$('#form-year').textContent = String(today.getFullYear());
renderTaxpayer();
renderLines();
$('#income-total').textContent = `0 of ${income.length}`;
setupSignature();
setupEnvelope();
renderTally();
