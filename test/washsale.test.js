import { describe, it, expect } from 'vitest';
import { findWashSales } from '../js/washsale.js';

/** @param {string} id @param {string} date @param {string} symbol @param {number} price @returns {import('../js/washsale.js').Trade} */
const buy = (id, date, symbol, price) => ({ id, date, side: 'buy', symbol, price });
/** @param {string} id @param {string} date @param {string} symbol @param {number} price @param {string} lot @returns {import('../js/washsale.js').Trade} */
const sell = (id, date, symbol, price, lot) => ({ id, date, side: 'sell', symbol, price, lot });

describe('findWashSales', () => {
  it('flags a loss sale with a repurchase inside 30 days', () => {
    const trades = [
      buy('a', '2024-03-01', 'NVDA', 100),
      sell('b', '2024-03-10', 'NVDA', 80, 'a'),
      buy('c', '2024-03-25', 'NVDA', 82),
    ];
    expect(findWashSales(trades)).toEqual(['b']);
  });

  it('does not treat the lot being sold as its own replacement', () => {
    const trades = [buy('a', '2024-03-01', 'NVDA', 100), sell('b', '2024-03-10', 'NVDA', 80, 'a')];
    expect(findWashSales(trades)).toEqual([]);
  });

  it('also counts a purchase in the 30 days before the sale', () => {
    const trades = [
      buy('a', '2024-01-01', 'AMD', 150),
      buy('b', '2024-02-01', 'AMD', 140),
      sell('c', '2024-02-15', 'AMD', 120, 'a'),
    ];
    expect(findWashSales(trades)).toEqual(['c']);
  });

  it('ignores gains, other tickers, and repurchases after 30 days', () => {
    const trades = [
      buy('z', '2023-12-01', 'NVDA', 90),
      buy('a', '2024-01-01', 'AMD', 100),
      sell('b', '2024-02-01', 'AMD', 130, 'a'),
      buy('c', '2024-02-02', 'AMD', 131),
      sell('d', '2024-03-01', 'NVDA', 50, 'z'),
      buy('e', '2024-03-02', 'AMD', 60),
      buy('f', '2024-06-01', 'NVDA', 40),
    ];
    expect(findWashSales(trades)).toEqual([]);
  });
});
