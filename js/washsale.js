// The wash-sale rule from Rocky's tax reconciliation project: a sale at a loss
// is disallowed if the same security is bought within 30 days either side.

/**
 * A sell names the buy it closes in `lot`; its cost basis is that buy's price.
 * @typedef {{ id: string, date: string, side: 'buy' | 'sell', symbol: string, price: number, lot?: string }} Trade
 */

const DAY = 24 * 60 * 60 * 1000;

/**
 * @param {Trade[]} trades
 * @returns {string[]} ids of the sells that are wash sales
 */
export function findWashSales(trades) {
  const byId = new Map(trades.map((t) => [t.id, t]));
  return trades
    .filter((sale) => {
      const lot = sale.lot ? byId.get(sale.lot) : undefined;
      if (sale.side !== 'sell' || !lot || sale.price >= lot.price) return false;
      const when = Date.parse(sale.date);
      return trades.some(
        (b) =>
          b.side === 'buy' &&
          b.id !== lot.id &&
          b.symbol === sale.symbol &&
          Math.abs(Date.parse(b.date) - when) <= 30 * DAY,
      );
    })
    .map((s) => s.id);
}
