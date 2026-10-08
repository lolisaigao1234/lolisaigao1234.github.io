// Game state for the audit. Lines start unaudited and end stamped; a
// disallowed line is always appealed, and the appeal always wins.

/** @typedef {'unaudited' | 'verified' | 'appealed'} LineStatus */
/** @typedef {{ lines: Record<string, LineStatus>, appeals: number, signedBy: string | null }} AuditState */
/** @typedef {{ type: 'verify' | 'disallow', id: string } | { type: 'sign', name: string }} AuditAction */

/** @param {string[]} ids @returns {AuditState} */
export function createAudit(ids) {
  return {
    lines: Object.fromEntries(ids.map((id) => [id, /** @type {LineStatus} */ ('unaudited')])),
    appeals: 0,
    signedBy: null,
  };
}

/** @param {AuditState} state @param {AuditAction} action @returns {AuditState} */
export function reduce(state, action) {
  switch (action.type) {
    case 'verify':
    case 'disallow': {
      if (state.lines[action.id] !== 'unaudited') return state;
      const appealed = action.type === 'disallow';
      return {
        ...state,
        lines: { ...state.lines, [action.id]: appealed ? 'appealed' : 'verified' },
        appeals: state.appeals + (appealed ? 1 : 0),
      };
    }
    case 'sign': {
      const name = action.name.trim();
      if (!canSign(state) || !name) return state;
      return { ...state, signedBy: name };
    }
  }
}

/** @param {AuditState} state */
export function progress(state) {
  const all = Object.values(state.lines);
  return { done: all.filter((s) => s !== 'unaudited').length, total: all.length };
}

/** @param {AuditState} state */
export function canSign(state) {
  const { done, total } = progress(state);
  return done === total && state.signedBy === null;
}
