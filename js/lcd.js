// The handheld's LCD: a 48×32 pixel canvas where Rocky lives. Everything is
// drawn procedurally so each stage is the same rock with new accessories.

import { HATCH_TAPS, XP_TO_EVOLVE } from './pet.js';

const W = 48;
const H = 32;
const GROUND = 29;
const TICK_MS = 110;
const EFFECT_TICKS = 11;

/** @typedef {import('./pet.js').Action} Action */
/** @typedef {{ cx: number, cy: number, rx: number, ry: number, top: number, tick: number }} Body */

/** Body size per stage: the pebble grows into a boulder. */
const SIZES = [
  [7, 9], // geode (egg)
  [6, 5],
  [7, 5.5],
  [7, 6],
  [8, 6],
  [8, 6.5],
  [9, 7],
  [9, 7],
  [11, 8.5],
];

/** 3×5 digits for the stage counter. */
const DIGITS = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001', '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ reducedMotion: () => boolean }} options
 */
export function createScreen(canvas, { reducedMotion }) {
  canvas.width = W;
  canvas.height = H;
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

  let stage = 0;
  let xp = 0;
  let total = SIZES.length;
  let tick = 0;
  /** @type {{ kind: Action, start: number } | null} */
  let effect = null;
  /** @type {{ start: number, resolve: () => void } | null} */
  let evolving = null;

  const ink = () => getComputedStyle(canvas).getPropertyValue('--lcd-ink').trim() || '#2e3527';

  /** @param {number} x @param {number} y @param {number} [alpha] */
  const px = (x, y, alpha = 1) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    ctx.globalAlpha = alpha;
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  };
  /** @param {number} x @param {number} y @param {number} w @param {number} h @param {number} [alpha] */
  const rect = (x, y, w, h, alpha = 1) => {
    for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) px(x + i, y + j, alpha);
  };
  /** @param {number} x0 @param {number} y0 @param {number} x1 @param {number} y1 */
  const line = (x0, y0, x1, y1) => {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
    for (let i = 0; i <= n; i++) px(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n);
  };

  /** Filled ellipse with a hard outline and a few speckles. */
  function blob(/** @type {number} */ cx, /** @type {number} */ cy, /** @type {number} */ rx, /** @type {number} */ ry) {
    const inside = (/** @type {number} */ x, /** @type {number} */ y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
    for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        if (!inside(x, y)) continue;
        const edge = !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1);
        px(x, y, edge ? 1 : 0.22);
      }
    }
    for (const [dx, dy] of [[-0.55, -0.35], [0.5, 0.45], [-0.25, 0.6], [0.65, -0.1]]) px(cx + dx * rx, cy + dy * ry, 0.6);
  }

  /** @param {Body} b @param {'open' | 'eyes' | 'blink' | 'happy' | 'squint'} mood */
  function face(b, mood, mouth = 'smile') {
    const ey = Math.round(b.cy - 1);
    for (const ex of [Math.round(b.cx - 3), Math.round(b.cx + 3)]) {
      if (mood === 'blink') px(ex, ey + 1);
      else if (mood === 'happy') { px(ex - 1, ey + 1); px(ex, ey); px(ex + 1, ey + 1); }
      else if (mood === 'squint') { px(ex - 1, ey); px(ex, ey + 1); px(ex + 1, ey); }
      else rect(ex, ey, 1, 2);
    }
    const mx = Math.round(b.cx);
    const my = Math.round(b.cy + 2);
    if (mouth === 'open') rect(mx - 1, my, 2, 2);
    else if (mouth === 'flat') line(mx - 1, my, mx + 1, my);
    else { px(mx - 2, my); px(mx - 1, my + 1); px(mx, my + 1); px(mx + 1, my); }
  }

  /** One accessory per stage, layered on the same rock. @type {((b: Body) => void)[]} */
  const accessories = [
    () => {},
    (b) => { // lanyard and ID badge
      line(b.cx - b.rx + 2, b.cy + 1, b.cx - 1, b.cy + b.ry - 2);
      line(b.cx + b.rx - 2, b.cy + 1, b.cx + 1, b.cy + b.ry - 2);
      rect(b.cx - 1, b.cy + b.ry - 2, 3, 2);
    },
    (b) => { // laptop with a rising chart
      const x = b.cx + b.rx + 2;
      const y = GROUND - 7;
      rect(x, y, 7, 1); rect(x, y + 4, 7, 1); rect(x, y, 1, 5); rect(x + 6, y, 1, 5);
      px(x + 2, y + 3); px(x + 3, y + 2); px(x + 4, y + 1);
      rect(x - 1, GROUND - 2, 9, 1);
    },
    (b) => { // headset
      for (let x = -b.rx + 1; x <= b.rx - 1; x++) px(b.cx + x, b.top - 1 + Math.round((x / b.rx) ** 2 * 3));
      rect(b.cx - b.rx - 1, b.cy - 2, 2, 3); rect(b.cx + b.rx, b.cy - 2, 2, 3);
      line(b.cx - b.rx, b.cy + 1, b.cx - 3, b.cy + 3);
    },
    (b) => { // mortarboard with tassel
      rect(b.cx - 5, b.top - 2, 11, 1);
      rect(b.cx - 2, b.top - 1, 5, 2);
      const sway = b.tick % 8 < 4 ? 0 : 1;
      line(b.cx + 5, b.top - 2, b.cx + 5 + sway, b.top + 2);
    },
    (b) => { // four busy arms
      const w = b.tick % 4 < 2 ? 0 : 1;
      line(b.cx - b.rx, b.cy - 1, b.cx - b.rx - 3, b.cy - 3 - w); line(b.cx - b.rx, b.cy + 2, b.cx - b.rx - 3, b.cy + 3 + w);
      line(b.cx + b.rx, b.cy - 1, b.cx + b.rx + 3, b.cy - 3 + w); line(b.cx + b.rx, b.cy + 2, b.cx + b.rx + 3, b.cy + 3 - w);
    },
    (b) => { // top hat and monocle
      rect(b.cx - 4, b.top - 1, 9, 1);
      rect(b.cx - 2, b.top - 5, 5, 4);
      const ex = Math.round(b.cx + 3);
      const ey = Math.round(b.cy);
      for (const [dx, dy] of [[-2, 0], [2, 0], [0, -2], [0, 2], [-1, -1], [1, -1], [-1, 1], [1, 1]]) px(ex + dx, ey + dy - 0.5);
      line(ex + 2, ey + 1, ex + 3, ey + 4);
    },
    (b) => { // antenna broadcasting
      line(b.cx + 2, b.top, b.cx + 3, b.top - 4);
      rect(b.cx + 3, b.top - 5, 1, 1);
      const on = b.tick % 6;
      for (let r = 1; r <= 3; r++) {
        if (on < r * 2) continue;
        px(b.cx + 3 + r + 1, b.top - 5 - r); px(b.cx + 3 + r + 2, b.top - 5 - r + 1); px(b.cx + 3 + r + 2, b.top - 5 - r + 2);
      }
    },
    (b) => { // sunglasses and badge
      rect(b.cx - 5, b.cy - 1, 11, 1);
      rect(b.cx - 5, b.cy - 1, 4, 3); rect(b.cx + 2, b.cy - 1, 4, 3);
      rect(b.cx + b.rx - 4, b.cy + 3, 2, 3);
    },
  ];

  function hud() {
    const need = stage === 0 ? HATCH_TAPS : XP_TO_EVOLVE;
    for (let i = 0; i < need; i++) rect(2 + i * 4, 2, 3, 3, i < xp ? 1 : 0.22);
    // "n/N" in the top right corner.
    const text = [stage, -1, total - 1];
    let x = W - 2 - 11;
    for (const d of text) {
      if (d < 0) { line(x, 6, x + 2, 2); x += 4; continue; }
      const map = DIGITS[d] ?? DIGITS[0];
      for (let i = 0; i < 15; i++) if (map[i] === '1') px(x + (i % 3), 2 + Math.floor(i / 3));
      x += 4;
    }
    for (let x2 = 0; x2 < W; x2 += 2) px(x2, GROUND + 1, 0.5);
  }

  function drawGeode() {
    const [rx, ry] = SIZES[0];
    const wobble = effect && !reducedMotion() ? (tick - effect.start) % 2 === 0 ? -1 : 1 : 0;
    const cx = 24 + (effect && tick - effect.start < 6 ? wobble : 0);
    const cy = GROUND - ry;
    blob(cx, cy, rx, ry);
    line(cx - 4, cy + 3, cx - 1, cy - 2); line(cx + 2, cy - 4, cx + 4, cy + 1); // facets
    const crack = [[cx, cy - ry], [cx - 2, cy - 5], [cx + 1, cy - 2], [cx - 1, cy + 1]];
    for (let i = 0; i < Math.min(xp, crack.length - 1); i++) line(crack[i][0], crack[i][1], crack[i + 1][0], crack[i + 1][1]);
  }

  function drawRock() {
    const [baseRx, baseRy] = SIZES[stage];
    const t = effect ? tick - effect.start : -1;
    const squash = effect?.kind === 'bug' && t >= 6 && t < 9;
    const jitter = effect?.kind === 'coffee' && t >= 2 && t < 8 && !reducedMotion() ? (t % 2 ? 1 : -1) : 0;
    const bob = !effect && !reducedMotion() && tick % 10 < 5 ? 1 : 0;
    const rx = baseRx + (squash ? 1.5 : 0);
    const ry = baseRy - (squash ? 1.5 : 0);
    /** @type {Body} */
    const b = { cx: 24 + jitter, cy: GROUND - ry - bob, rx, ry, top: GROUND - 2 * ry - bob, tick };

    blob(b.cx, b.cy, b.rx, b.ry);
    accessories[stage](b);

    let mood = /** @type {'open' | 'eyes' | 'blink' | 'happy' | 'squint'} */ (!reducedMotion() && tick % 37 === 0 ? 'blink' : 'eyes');
    let mouth = 'smile';
    if (effect?.kind === 'data') {
      const fall = Math.min(t, 6);
      if (t < 7) rect(b.cx - 1, 1 + fall * ((b.cy - 1) / 6), 3, 3); // a data block dropping in
      if (t >= 4 && t < 8) mouth = 'open';
      if (t >= 8) mood = 'happy';
    } else if (effect?.kind === 'coffee') {
      const mx = b.cx + b.rx + 2;
      rect(mx, GROUND - 5, 4, 1); rect(mx, GROUND - 1, 4, 1); rect(mx, GROUND - 5, 1, 5); rect(mx + 3, GROUND - 5, 1, 5);
      rect(mx + 4, GROUND - 4, 1, 2);
      if (t % 2 === 0) { px(mx + 1, GROUND - 7); px(mx + 2, GROUND - 8); } else { px(mx + 2, GROUND - 7); px(mx + 1, GROUND - 8); }
      mood = 'squint';
      mouth = 'flat';
    } else if (effect?.kind === 'bug') {
      if (t < 6) {
        const bx = W - 3 - t * ((W - 3 - (b.cx + b.rx + 1)) / 6);
        rect(bx, GROUND - 2, 3, 2); px(bx - 1, GROUND - 3); px(bx + 3, GROUND - 3);
        mood = 'eyes';
        mouth = 'open';
      } else if (squash) {
        mood = 'squint';
        for (const [dx, dy] of [[0, -3], [2, -2], [-2, -2], [3, 0]]) px(b.cx + b.rx + 2 + dx, GROUND - 2 + dy);
      } else {
        mood = 'happy';
      }
    }
    face(b, mood, mouth);
  }

  function sparkles() {
    const t = evolving ? tick - evolving.start : 0;
    for (const [x, y] of [[6, 10], [41, 9], [10, 22], [38, 20], [24, 4]]) {
      if ((x + y + t) % 3 === 0) { px(x, y); px(x - 1, y); px(x + 1, y); px(x, y - 1); px(x, y + 1); }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink();
    if (evolving) {
      const t = tick - evolving.start;
      if (t < 8 && t % 2 === 0 && !reducedMotion()) {
        rect(0, 0, W, H, 1); // flash
        return;
      }
      sparkles();
    }
    hud();
    if (stage === 0) drawGeode();
    else drawRock();
  }

  function step() {
    tick++;
    if (effect && tick - effect.start >= EFFECT_TICKS) effect = null;
    if (evolving && tick - evolving.start >= 16) {
      const done = evolving.resolve;
      evolving = null;
      done();
    }
    draw();
  }

  let timer = setInterval(step, TICK_MS);
  document.addEventListener('visibilitychange', () => {
    clearInterval(timer);
    if (!document.hidden) timer = setInterval(step, TICK_MS);
  });

  return {
    /** @param {number} s @param {number} x @param {number} n */
    show(s, x, n) {
      stage = s;
      xp = x;
      total = n;
      draw();
    },
    /** @param {Action} kind */
    play(kind) {
      effect = { kind, start: tick };
      if (reducedMotion()) effect.start = tick - EFFECT_TICKS + 4;
    },
    /** Flash and sparkle into the next stage. @param {number} s */
    evolve(s) {
      effect = null;
      return new Promise((/** @type {(v?: unknown) => void} */ resolve) => {
        stage = s;
        xp = 0;
        evolving = { start: reducedMotion() ? tick - 12 : tick, resolve: () => resolve() };
      });
    },
  };
}
