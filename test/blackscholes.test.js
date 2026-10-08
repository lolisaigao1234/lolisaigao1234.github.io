import { describe, it, expect } from 'vitest';
import { normCdf, callPrice, impliedVol } from '../js/blackscholes.js';

describe('normCdf', () => {
  it('is 0.5 at zero and symmetric', () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 7);
    expect(normCdf(1.96) + normCdf(-1.96)).toBeCloseTo(1, 7);
    expect(normCdf(1.96)).toBeCloseTo(0.975, 3);
  });
});

describe('callPrice', () => {
  it('matches the textbook at-the-money value', () => {
    expect(callPrice({ S: 100, K: 100, T: 1, r: 0.05, sigma: 0.2 })).toBeCloseTo(10.4506, 3);
  });

  it('collapses to intrinsic value as volatility vanishes', () => {
    const p = callPrice({ S: 120, K: 100, T: 1, r: 0, sigma: 1e-9 });
    expect(p).toBeCloseTo(20, 4);
  });
});

describe('impliedVol', () => {
  it('recovers the volatility that produced a price', () => {
    const market = callPrice({ S: 100, K: 105, T: 0.5, r: 0.03, sigma: 0.37 });
    const result = impliedVol({ S: 100, K: 105, T: 0.5, r: 0.03, price: market });
    expect(result.converged).toBe(true);
    expect(result.sigma).toBeCloseTo(0.37, 6);
  });

  it('records each Newton step so the UI can replay it', () => {
    const market = callPrice({ S: 100, K: 100, T: 1, r: 0.05, sigma: 0.2 });
    const result = impliedVol({ S: 100, K: 100, T: 1, r: 0.05, price: market, guess: 0.8 });
    expect(result.steps.length).toBeGreaterThan(1);
    expect(result.steps[0].sigma).toBe(0.8);
    const errors = result.steps.map((s) => Math.abs(s.error));
    expect(errors.at(-1)).toBeLessThan(errors[0]);
  });

  it('gives up honestly on a price no volatility can produce', () => {
    const result = impliedVol({ S: 100, K: 100, T: 1, r: 0.05, price: 150 });
    expect(result.converged).toBe(false);
  });
});
