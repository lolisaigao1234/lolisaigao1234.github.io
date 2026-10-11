// The pet's rules. Stage 0 is the geode: any button cracks it, and enough
// cracks hatch Rocky. After that, each stage has a favorite action worth
// double XP, and enough XP evolves him into the next stage.

/** @typedef {'data' | 'coffee' | 'bug'} Action */
/** @typedef {{ favorite: Action, reactions: Record<Action, string> }} StageRules */
/** @typedef {{ stage: number, xp: number, unlocked: number }} Pet */

export const ACTIONS = /** @type {const} */ (['data', 'coffee', 'bug']);
export const HATCH_TAPS = 3;
export const XP_TO_EVOLVE = 3;

/** @returns {Pet} */
export function createPet() {
  return { stage: 0, xp: 0, unlocked: 1 };
}

/**
 * @param {Pet} pet
 * @param {Action} action
 * @param {StageRules[]} stages
 * @returns {{ pet: Pet, reaction: string, evolved: boolean }}
 */
export function act(pet, action, stages) {
  const rules = stages[pet.stage];
  const reaction = rules.reactions[action];
  const last = pet.stage === stages.length - 1;
  const gain = pet.stage === 0 ? 1 : action === rules.favorite ? 2 : 1;
  const need = pet.stage === 0 ? HATCH_TAPS : XP_TO_EVOLVE;
  const xp = Math.min(need, pet.xp + gain);

  if (last || xp < need) return { pet: { ...pet, xp }, reaction, evolved: false };

  const stage = pet.stage + 1;
  return { pet: { stage, xp: 0, unlocked: Math.max(pet.unlocked, stage + 1) }, reaction, evolved: true };
}

/** For visitors who want the whole story now. @param {number} stageCount @returns {Pet} */
export function skipToEnd(stageCount) {
  return { stage: stageCount - 1, xp: XP_TO_EVOLVE, unlocked: stageCount };
}
