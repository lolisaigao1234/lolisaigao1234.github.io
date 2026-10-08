// Black-Scholes pricing and a Newton-Raphson implied-volatility solver,
// the same pair Rocky wired to a broker API at AiFinSphere.

/**
 * @typedef {{ S: number, K: number, T: number, r: number }} Contract
 * @typedef {{ sigma: number, price: number, error: number }} Step
 */

/** Standard normal density. @param {number} x */
export function normPdf(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/**
 * Standard normal CDF (Abramowitz & Stegun 7.1.26 via erf).
 * @param {number} x
 */
export function normCdf(x) {
  const z = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * z);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - poly * Math.exp(-z * z);
  return x >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

/** @param {Contract & { sigma: number }} c */
function d1d2({ S, K, T, r, sigma }) {
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  return [d1, d1 - sigma * Math.sqrt(T)];
}

/** European call price. @param {Contract & { sigma: number }} c */
export function callPrice(c) {
  const [d1, d2] = d1d2(c);
  return c.S * normCdf(d1) - c.K * Math.exp(-c.r * c.T) * normCdf(d2);
}

/** Sensitivity of the call price to sigma. @param {Contract & { sigma: number }} c */
export function vega(c) {
  const [d1] = d1d2(c);
  return c.S * normPdf(d1) * Math.sqrt(c.T);
}

/**
 * Solve for the sigma that reproduces a market price.
 * @param {Contract & { price: number, guess?: number, tol?: number, maxIter?: number }} input
 * @returns {{ sigma: number, converged: boolean, steps: Step[] }}
 */
export function impliedVol({ price, guess = 0.5, tol = 1e-8, maxIter = 50, ...contract }) {
  /** @type {Step[]} */
  const steps = [];
  let sigma = guess;
  for (let i = 0; i < maxIter; i++) {
    const model = callPrice({ ...contract, sigma });
    const error = model - price;
    steps.push({ sigma, price: model, error });
    if (Math.abs(error) < tol) return { sigma, converged: true, steps };
    const v = vega({ ...contract, sigma });
    if (v < 1e-10) break;
    sigma = sigma - error / v;
    if (!Number.isFinite(sigma) || sigma <= 0 || sigma > 10) break;
  }
  return { sigma, converged: false, steps };
}
