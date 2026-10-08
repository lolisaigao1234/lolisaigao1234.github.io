// Wires the handheld, the stage card, the Rockydex and the adoption page.

import { stages, sideQuest, careSheet, owner } from './data.js';
import { createPet, act, skipToEnd, ACTIONS, HATCH_TAPS, XP_TO_EVOLVE } from './pet.js';
import { createScreen } from './lcd.js';
import { toys } from './toys.js';
import { $, h, reducedMotion } from './dom.js';

/** @typedef {import('./pet.js').Pet} Pet */
/** @typedef {import('./pet.js').Action} Action */

const STORE = 'rockygotchi-v1';
const FINAL = stages.length - 1;

// ---------------------------------------------------------------- saved progress

/** @returns {Pet} */
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null');
    if (saved && Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage <= FINAL && Number.isInteger(saved.xp) && Number.isInteger(saved.unlocked)) {
      return { stage: saved.stage, xp: saved.xp, unlocked: Math.min(Math.max(saved.unlocked, saved.stage + 1), stages.length) };
    }
  } catch {}
  return createPet();
}

function save() {
  try {
    localStorage.setItem(STORE, JSON.stringify(pet));
  } catch {}
}

let pet = load();

// ---------------------------------------------------------------- the handheld

const screen = createScreen(/** @type {HTMLCanvasElement} */ ($('#lcd')), { reducedMotion });
screen.show(pet.stage, pet.xp, stages.length);

/** @param {string} text @param {Node} [extra] */
const say = (text, extra) => {
  $('#say').replaceChildren(text, ...(extra ? [extra] : []));
};

/** On narrow screens the card sits below the handheld; point at it after an evolution. */
function cardLink() {
  const card = $('#card');
  if (card.getBoundingClientRect().top < innerHeight - 80) return undefined;
  return h('a', { href: '#card', onclick: (e) => {
    e.preventDefault();
    card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  } }, 'Read his card');
}

let busy = false;
const wait = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, reducedMotion() ? 0 : ms));

/** @param {Action} action */
async function press(action) {
  if (busy) return;
  const from = pet.stage;
  const result = act(pet, action, stages);
  pet = result.pet;
  save();
  say(result.reaction);
  screen.play(action);

  if (!result.evolved) {
    screen.show(pet.stage, pet.xp, stages.length);
    return;
  }

  // Show the full XP bar on the old stage before it flashes into the new one.
  screen.show(from, from === 0 ? HATCH_TAPS : XP_TO_EVOLVE, stages.length);
  const to = pet.stage;
  busy = true;
  setControlsLocked(true);
  await wait(900);
  await screen.evolve(to);
  busy = false;
  setControlsLocked(false);
  const stage = stages[to];
  renderCard(true);
  say(to === 1 ? `It hatched! Meet ${stage.name}.` : `Rocky evolved into ${stage.name}!`, cardLink());
  renderDex();
}

/** Skip and Start over would race an evolution in progress, so they wait for it. @param {boolean} locked */
function setControlsLocked(locked) {
  for (const id of ['#skip', '#reset']) /** @type {HTMLButtonElement} */ ($(id)).disabled = locked;
}

for (const button of document.querySelectorAll('[data-action]')) {
  button.addEventListener('click', () => press(/** @type {Action} */ (/** @type {HTMLElement} */ (button).dataset.action)));
}

document.addEventListener('keydown', (e) => {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || $('#view-play').hidden) return;
  if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return;
  const action = ACTIONS[['1', '2', '3'].indexOf(e.key)];
  if (!action) return;
  const button = /** @type {HTMLElement} */ (document.querySelector(`[data-action="${action}"]`));
  button.classList.add('pressed');
  setTimeout(() => button.classList.remove('pressed'), 120);
  press(action);
});

// ---------------------------------------------------------------- toys

/** Cancels the open toys' timers and probes when cards re-render or the page changes. */
let toyRun = new AbortController();

function stopToys() {
  toyRun.abort();
  toyRun = new AbortController();
}

/** A button that opens one toy underneath it. @param {{ kind: import('./data.js').ToyKind, label: string }} toy */
function toyPanel(toy) {
  const panel = h('div', { class: 'toy', hidden: true });
  const button = h('button', { class: 'btn btn-toy', type: 'button', 'aria-expanded': 'false' }, toy.label);
  button.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open && !panel.childElementCount) toys[toy.kind](panel, toyRun.signal);
  });
  return h('div', { class: 'toy-wrap' }, button, panel);
}

// ---------------------------------------------------------------- stage card

const sticker = (/** @type {string} */ id, /** @type {string} */ alt, cls = 'sticker') =>
  h('img', { class: cls, src: `assets/stickers/${id}.webp`, alt, width: '240', height: '240', loading: 'lazy', decoding: 'async' });

/** @param {boolean} [celebrate] */
function renderCard(celebrate = false) {
  stopToys();
  const stage = stages[pet.stage];
  const card = $('#card');
  card.classList.toggle('evolved', celebrate && !reducedMotion());
  card.replaceChildren(
    sticker(stage.id, pet.stage === 0 ? 'A purple geode with something peeking out' : `${stage.name} sticker`),
    h('p', { class: 'stage-chip' }, pet.stage === 0 ? 'Unhatched' : `Stage ${pet.stage} of ${FINAL}`),
    h('h2', {}, stage.name),
    h('p', { class: 'when' }, stage.when),
    h('p', { class: 'joke' }, stage.joke),
    h('p', { class: 'fact' }, stage.fact),
    stage.toy ? toyPanel(stage.toy) : '',
    pet.stage === FINAL
      ? h('a', { class: 'btn btn-adopt', href: '#adopt' }, 'Adopt Rocky')
      : h('p', { class: 'hint' }, `Hint: ${stage.hint}`),
  );
}

// ---------------------------------------------------------------- Rockydex

function renderDex() {
  const careers = stages.slice(1);
  const found = Math.max(0, pet.unlocked - 1);
  $('#dex-count').textContent = found === careers.length
    ? `All ${careers.length} found, plus a side quest.`
    : `${found} of ${careers.length} found. Keep raising Rocky to fill the book.`;
  $('#skip').hidden = found === careers.length;

  /** @param {number} i @param {{ id: string, name: string, when: string, fact: string, toy?: { kind: import('./data.js').ToyKind, label: string } }} entry @param {boolean} open */
  const item = (i, entry, open) =>
    h('li', { class: `dex-item${open ? '' : ' locked'}` },
      open ? sticker(entry.id, `${entry.name} sticker`) : sticker(entry.id, 'Locked sticker', 'sticker silhouette'),
      h('p', { class: 'dex-no' }, i ? `#${i}` : 'Bonus'),
      h('h2', {}, open ? entry.name : '???'),
      open ? h('p', { class: 'when' }, entry.when) : null,
      h('p', { class: 'fact' }, open ? entry.fact : 'Keep raising Rocky to unlock this one.'),
      open && entry.toy ? toyPanel(entry.toy) : null);

  $('#dex').replaceChildren(
    ...careers.map((s, i) => item(i + 1, s, i + 1 < pet.unlocked)),
    item(0, sideQuest, pet.unlocked === stages.length),
  );
}

$('#skip').addEventListener('click', () => {
  if (busy) return;
  pet = skipToEnd(stages.length);
  save();
  screen.show(pet.stage, pet.xp, stages.length);
  say('Rocky skipped a few years. He’s fully grown.');
  renderCard();
  renderDex();
});

$('#reset').addEventListener('click', () => {
  if (busy) return;
  pet = createPet();
  save();
  screen.show(pet.stage, pet.xp, stages.length);
  say('A fresh geode. Something inside is reading a CSV.');
  location.hash = '#play'; // route() renders the card
});

// ---------------------------------------------------------------- adopt

$('#contact').append(
  h('li', {}, h('a', { class: 'btn', href: `mailto:${owner.email}` }, 'Email him'), h('span', {}, owner.email)),
  h('li', {}, h('a', { class: 'btn btn-quiet', href: owner.linkedin, rel: 'me' }, 'LinkedIn')),
  h('li', {}, h('a', { class: 'btn btn-quiet', href: owner.github, rel: 'me' }, 'GitHub')),
);
$('#care').append(...careSheet.flatMap((c) => [h('dt', {}, c.label), h('dd', {}, c.value)]));

// ---------------------------------------------------------------- pages

const views = ['play', 'dex', 'adopt'];

function route() {
  const name = views.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'play';
  stopToys();
  for (const v of views) $(`#view-${v}`).hidden = v !== name;
  screen.setActive(name === 'play');
  for (const link of document.querySelectorAll('[data-view]')) {
    if (/** @type {HTMLElement} */ (link).dataset.view === name) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (name === 'play') renderCard();
  if (name === 'dex') renderDex();
  return name;
}

window.addEventListener('hashchange', () => {
  const name = route();
  /** @type {HTMLElement | null} */ (document.querySelector(`#view-${name} h1`))?.focus({ preventScroll: true });
  scrollTo(0, 0);
});

route();
renderDex();
say(pet.stage === 0 ? 'A geode rolled in. Something inside is reading a CSV.' : `Welcome back. ${stages[pet.stage].name} missed you.`);
