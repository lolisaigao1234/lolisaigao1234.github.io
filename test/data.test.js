import { describe, it, expect } from 'vitest';
import { income, db, trades } from '../js/data.js';
import { findWashSales } from '../js/washsale.js';
import { ask } from '../js/nl2sql.js';

describe('form content', () => {
  it('numbers income lines in order with unique ids', () => {
    expect(income.map((l) => l.no)).toEqual(['1', '2', '3', '4', '5', '6', '7']);
    expect(new Set(income.map((l) => l.id)).size).toBe(income.length);
  });

  it('has exactly one wash sale in the exhibit, the one the copy promises', () => {
    expect(findWashSales(trades)).toEqual(['s3']);
  });

  it('answers every suggested question in the SQL exhibit', () => {
    for (const q of ['Where did he work in 2024?', 'What is he doing now?', 'Does he know FastAPI?', 'How many internships?', 'When did he graduate?']) {
      const r = ask(q, db);
      expect(r.sql, q).not.toBeNull();
      expect(r.rows.length, q).toBeGreaterThan(0);
    }
  });
});
