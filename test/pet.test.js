import { describe, it, expect } from 'vitest';
import { createPet, act, skipToEnd, XP_TO_EVOLVE, HATCH_TAPS } from '../js/pet.js';

/** @type {import('../js/pet.js').StageRules[]} */
const stages = [
  { favorite: 'data', reactions: { data: 'crack', coffee: 'crack', bug: 'crack' } },
  { favorite: 'data', reactions: { data: 'yum', coffee: 'zzz', bug: 'eek' } },
  { favorite: 'coffee', reactions: { data: 'ok', coffee: 'wired', bug: 'squash' } },
  { favorite: 'bug', reactions: { data: 'meh', coffee: 'jitter', bug: 'fixed' } },
];

describe('pet', () => {
  it('starts as an unhatched geode with only the first stage unlocked', () => {
    expect(createPet()).toEqual({ stage: 0, xp: 0, unlocked: 1 });
  });

  it('hatches after a fixed number of taps, whatever the button', () => {
    let pet = createPet();
    for (let i = 0; i < HATCH_TAPS - 1; i++) pet = act(pet, 'coffee', stages).pet;
    expect(pet.stage).toBe(0);
    const r = act(pet, 'bug', stages);
    expect(r.evolved).toBe(true);
    expect(r.pet.stage).toBe(1);
    expect(r.pet.unlocked).toBe(2);
  });

  it('gives the favorite action double XP', () => {
    let pet = { stage: 1, xp: 0, unlocked: 2 };
    expect(act(pet, 'data', stages).pet.xp).toBe(2);
    expect(act(pet, 'bug', stages).pet.xp).toBe(1);
  });

  it('evolves once XP reaches the threshold and resets XP', () => {
    let pet = { stage: 2, xp: XP_TO_EVOLVE - 1, unlocked: 3 };
    const r = act(pet, 'coffee', stages);
    expect(r.evolved).toBe(true);
    expect(r.pet).toEqual({ stage: 3, xp: 0, unlocked: 4 });
  });

  it('returns the reaction for the stage the action happened in', () => {
    expect(act({ stage: 2, xp: 0, unlocked: 3 }, 'bug', stages).reaction).toBe('squash');
  });

  it('never evolves past the final stage', () => {
    const r = act({ stage: 3, xp: XP_TO_EVOLVE - 1, unlocked: 4 }, 'bug', stages);
    expect(r.evolved).toBe(false);
    expect(r.pet.stage).toBe(3);
    expect(r.pet.xp).toBe(XP_TO_EVOLVE);
  });

  it('remembers stages unlocked earlier', () => {
    const r = act({ stage: 1, xp: 0, unlocked: 4 }, 'data', stages);
    expect(r.pet.unlocked).toBe(4);
  });

  it('skips straight to the final stage with everything unlocked', () => {
    expect(skipToEnd(stages.length)).toEqual({ stage: 3, xp: XP_TO_EVOLVE, unlocked: 4 });
  });
});
