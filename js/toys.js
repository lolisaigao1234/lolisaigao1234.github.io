// The little interactive demos that hang off some stage cards. Each one
// mounts into a root element and stops its timers and probes when `signal`
// aborts.

import { h, reducedMotion } from './dom.js';
import { db, trades } from './data.js';
import { ask } from './nl2sql.js';
import { callPrice, impliedVol } from './blackscholes.js';
import { summarize, scoreConnection } from './wifi.js';
import { replacementFor, DAY } from './washsale.js';

/** Dollars, with extra decimals for amounts too small to show at cents. */
const money = (/** @type {number} */ n) => `$${n.toFixed(n !== 0 && Math.abs(n) < 0.005 ? 4 : 2)}`;
const pct = (/** @type {number} */ n) => `${(n * 100).toFixed(2)}%`;
/** @param {string} iso */
const shortDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/** A toy can be open on the card and in the Rockydex at once, so ids must be unique. */
let mounts = 0;
const uid = (/** @type {string} */ name) => `${name}-${++mounts}`;

/** @type {Record<import('./data.js').ToyKind, (root: HTMLElement, signal: AbortSignal) => void>} */
export const toys = {
  sql(root) {
    const id = uid('ask');
    const input = /** @type {HTMLInputElement} */ (h('input', { type: 'text', id, autocomplete: 'off', placeholder: 'Where did he work in 2024?' }));
    const out = h('div', { class: 'toy-out', 'aria-live': 'polite' });

    /** @param {string} question */
    const run = (question) => {
      const answer = ask(question, db);
      if (!answer.sql) {
        out.replaceChildren(h('pre', { class: 'code' }, '-- He didn’t understand that one.\n-- Try a company, a year, a skill, or a degree.'));
        return;
      }
      const columns = Object.keys(answer.rows[0] ?? {});
      out.replaceChildren(
        h('pre', { class: 'code' }, answer.sql),
        answer.rows.length
          ? h('table', { class: 'result' },
              h('thead', {}, h('tr', {}, ...columns.map((c) => h('th', { scope: 'col' }, c)))),
              h('tbody', {}, ...answer.rows.map((r) => h('tr', {}, ...columns.map((c) => h('td', {}, r[c] === null ? 'NULL' : String(r[c])))))))
          : h('p', {}, '0 rows. Not on his résumé.'),
      );
    };

    root.append(
      h('form', { class: 'ask', onsubmit: (e) => { e.preventDefault(); if (input.value.trim()) run(input.value); } },
        h('label', { class: 'sr-only', for: id }, 'Your question'),
        input,
        h('button', { class: 'btn', type: 'submit' }, 'Ask')),
      h('p', { class: 'chips' }, ...['What is he doing now?', 'Does he know FastAPI?', 'How many internships?'].map((q) =>
        h('button', { class: 'chip', type: 'button', onclick: () => { input.value = q; run(q); } }, q))),
      out,
    );
  },

  blackscholes(root, signal) {
    const contract = { S: 100, K: 105, T: 0.5, r: 0.03 };
    const market = callPrice({ ...contract, sigma: 0.22 + Math.random() * 0.36 });
    const sliderId = uid('sigma');
    const slider = /** @type {HTMLInputElement} */ (h('input', { type: 'range', min: '5', max: '150', value: '80', id: sliderId }));
    const reading = h('p', { 'aria-live': 'polite' });
    const steps = h('ol', { class: 'steps' });
    const verdict = h('p', { class: 'verdict', 'aria-live': 'polite' });
    /** @type {ReturnType<typeof setTimeout>[]} */
    let timers = [];
    const cancel = () => { timers.forEach(clearTimeout); timers = []; };
    signal.addEventListener('abort', cancel);

    const update = () => {
      const model = callPrice({ ...contract, sigma: Number(slider.value) / 100 });
      const gap = model - market;
      reading.textContent = Math.abs(gap) < 0.05
        ? `At ${slider.value}%: ${money(model)}. Close enough to trade on.`
        : `At ${slider.value}%: ${money(model)}, ${money(Math.abs(gap))} too ${gap > 0 ? 'high' : 'low'}.`;
    };

    const solve = () => {
      cancel();
      const result = impliedVol({ ...contract, price: market, guess: Number(slider.value) / 100 });
      steps.replaceChildren();
      verdict.textContent = '';
      const delay = reducedMotion() ? 0 : 260;
      result.steps.forEach((s, i) => {
        timers.push(setTimeout(() => {
          const off = Math.abs(s.error) < 5e-5 ? 'bang on' : `off by ${money(Math.abs(s.error))}`;
          steps.append(h('li', {}, `${pct(s.sigma)} → ${money(s.price)}, ${off}`));
          if (i === result.steps.length - 1) {
            verdict.textContent = result.converged
              ? `Newton nailed it in ${result.steps.length} steps: the market expects ${pct(result.sigma)} volatility.`
              : 'Newton overshot from there. Try a guess nearer the middle.';
          }
        }, delay * i));
      });
    };

    slider.addEventListener('input', update);
    root.append(
      h('p', {}, `A 6-month option on a $100 stock costs ${money(market)}. How jumpy does the market think the stock is? Drag to guess, then let Newton finish.`),
      h('label', { class: 'slider', for: sliderId }, h('span', {}, 'Your volatility guess'), slider),
      reading,
      h('button', { class: 'btn', type: 'button', onclick: solve }, 'Let Newton solve it'),
      steps,
      verdict,
    );
    update();
  },

  wifi(root, signal) {
    const status = h('p', { 'aria-live': 'polite' });
    const result = h('div');
    const button = /** @type {HTMLButtonElement} */ (h('button', { class: 'btn', type: 'button' }, 'Score my connection'));

    button.addEventListener('click', async () => {
      button.disabled = true;
      result.replaceChildren();
      /** @type {(number | null)[]} */
      const samples = [];
      for (let i = 0; i < 10; i++) {
        if (signal.aborted) return;
        status.textContent = `Pinging… ${i + 1} of 10`;
        samples.push(await probe(i, signal));
      }
      if (signal.aborted) return;
      const conn = /** @type {{ connection?: { downlink?: number } }} */ (/** @type {unknown} */ (navigator)).connection;
      const score = scoreConnection({ ...summarize(samples), downlinkMbps: conn?.downlink ?? null });
      status.textContent = 'Network #1,776, scored.';
      result.replaceChildren(
        h('p', { class: 'score' }, h('b', {}, String(score.total)), ' / 100'),
        h('ul', { class: 'dims' }, ...score.dimensions.map((d) =>
          h('li', {},
            h('span', {}, d.name),
            h('span', { class: 'bar', style: `--v:${d.score}%`, role: 'img', 'aria-label': `${d.score} out of 100` }),
            h('span', { class: 'dim-reading' }, d.reading)))),
      );
      button.textContent = 'Score it again';
      button.disabled = false;
    });

    root.append(
      h('p', {}, 'He scores 1,775 networks every 15 minutes. You can be #1,776.'),
      button,
      status,
      result,
    );
  },

  washsale(root) {
    const byId = new Map(trades.map((t) => [t.id, t]));
    const verdict = h('p', { class: 'verdict', 'aria-live': 'polite' });

    /** @param {import('./washsale.js').Trade} sale */
    const explain = (sale) => {
      const lot = /** @type {import('./washsale.js').Trade} */ (byId.get(sale.lot ?? ''));
      if (sale.price >= lot.price) return `Nope: sold at ${money(sale.price)}, bought at ${money(lot.price)}. That’s a gain, and the rule only cares about losses.`;
      const rebuy = replacementFor(sale, trades);
      if (!rebuy) return 'Nope: a loss, but nothing was bought back within 30 days.';
      const days = Math.round(Math.abs(Date.parse(rebuy.date) - Date.parse(sale.date)) / DAY);
      return `Yes! A ${money(lot.price - sale.price)} loss, and ${sale.symbol} was bought again ${days} days later. That loss can’t be deducted yet.`;
    };

    root.append(
      h('p', {}, 'One of these sales is a wash sale: a loss you can’t deduct. Which one?'),
      h('table', { class: 'result' },
        h('thead', {}, h('tr', {}, ...['Date', 'Trade', 'Price', 'Wash sale?'].map((c) => h('th', { scope: 'col' }, c)))),
        h('tbody', {}, ...trades.map((t) => {
          const lot = t.lot ? byId.get(t.lot) : undefined;
          return h('tr', {},
            h('td', {}, shortDate(t.date)),
            h('td', {}, t.side === 'buy' ? `Buy ${t.symbol}` : `Sell ${t.symbol} (bought ${lot ? shortDate(lot.date) : ''})`),
            h('td', {}, money(t.price)),
            h('td', {}, t.side === 'sell' ? h('button', { class: 'chip', type: 'button', onclick: () => { verdict.textContent = explain(t); } }, 'This one?') : ''));
        }))),
      verdict,
    );
  },
};

/**
 * Time one uncached round trip to this site; null if it fails or stalls.
 * @param {number} i
 * @param {AbortSignal} cancelled
 */
async function probe(i, cancelled) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2000);
  const stop = () => controller.abort();
  cancelled.addEventListener('abort', stop, { once: true });
  const start = performance.now();
  try {
    const res = await fetch(`assets/favicon.png?probe=${i}-${Date.now()}`, { cache: 'no-store', signal: controller.signal });
    await res.arrayBuffer();
    return res.ok ? performance.now() - start : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    cancelled.removeEventListener('abort', stop);
  }
}
