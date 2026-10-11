// Small DOM helpers shared by the app and the toys.

/** @param {string} selector */
export const $ = (selector) => /** @type {HTMLElement} */ (document.querySelector(selector));

/**
 * Tiny element builder: h('p', { class: 'x', onclick: fn }, 'text', child).
 * @param {string} tag
 * @param {Record<string, string | boolean | ((e: Event) => void)>} [props]
 * @param {(Node | string | null | undefined | false)[]} children
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'function') el.addEventListener(key.replace(/^on/, ''), value);
    else if (value === true) el.setAttribute(key, '');
    else if (value !== false) el.setAttribute(key, value);
  }
  for (const child of children) if (child) el.append(child);
  return el;
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
