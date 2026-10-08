// The wash-sale rule from Rocky's tax reconciliation project: a sale at a loss
// is disallowed if the same security is bought within 30 days either side.

/**
 * A sell names the buy it closes in `lot`; its cost basis is that buy's price.
 * @typedef {{ id: string, date: string, side: 'buy' | 'sell', symbol: string, price: number, lot?: string }} Trade
 */

export const DAY = 24 * 60 * 60 * 1000;

/**
 * The purchase that turns a losing sale into a wash sale, if there is one.
 * @param {Trade} sale
 * @param {Trade[]} trades
 * @returns {Trade | undefined}
 */
export function replacementFor(sale, trades) {
  const lot = trades.find((t) => t.id === sale.lot);
  if (sale.side !== 'sell' || !lot || sale.price >= lot.price) return undefined;
  const when = Date.parse(sale.date);
  return trades.find(
    (b) =>
      b.side === 'buy' &&
      b.id !== lot.id &&
      b.symbol === sale.symbol &&
      Math.abs(Date.parse(b.date) - when) <= 30 * DAY,
  );
}

/**
 * @param {Trade[]} trades
 * @returns {string[]} ids of the sells that are wash sales
 */
export function findWashSales(trades) {
  return trades.filter((t) => replacementFor(t, trades)).map((t) => t.id);
}
