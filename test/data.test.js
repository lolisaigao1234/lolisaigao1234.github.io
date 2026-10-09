import { describe, it, expect } from 'vitest';
import { stages, db, trades } from '../js/data.js';
import { createPet, act, ACTIONS } from '../js/pet.js';
import { findWashSales } from '../js/washsale.js';
import { ask } from '../js/nl2sql.js';

describe('stages', () => {
  it('have unique ids and a reaction for every button', () => {
    expect(new Set(stages.map((s) => s.id)).size).toBe(stages.length);
    for (const s of stages) {
      expect(ACTIONS).toContain(s.favorite);
      for (const a of ACTIONS) expect(s.reactions[a], `${s.id}.${a}`).toBeTruthy();
    }
  });

  it('can be raised from geode to final form in under 20 presses by following the hints', () => {
    let pet = createPet();
    let presses = 0;
    while (pet.stage < stages.length - 1 && presses < 100) {
      pet = act(pet, stages[pet.stage].favorite, stages).pet;
      presses++;
    }
    expect(pet.stage).toBe(stages.length - 1);
    expect(presses).toBeLessThan(20);
  });
});

describe('toy content', () => {
  it('has exactly one wash sale, the one the copy promises', () => {
    expect(findWashSales(trades)).toEqual(['s3']);
  });

  it('answers every suggested SQL question', () => {
    for (const q of ['Where did he work in 2024?', 'What is he doing now?', 'Does he know FastAPI?', 'How many internships?', 'When did he graduate?']) {
      const r = ask(q, db);
      expect(r.sql, q).not.toBeNull();
      expect(r.rows.length, q).toBeGreaterThan(0);
    }
  });
});
