import { describe, it, expect } from 'vitest';
import { createAudit, reduce, progress, canSign } from '../js/audit.js';

describe('audit', () => {
  const fresh = () => createAudit(['l1', 'l2', 'l3']);

  it('starts with every line unaudited', () => {
    const s = fresh();
    expect(progress(s)).toEqual({ done: 0, total: 3 });
    expect(canSign(s)).toBe(false);
  });

  it('counts verified lines', () => {
    const s = reduce(fresh(), { type: 'verify', id: 'l2' });
    expect(s.lines.l2).toBe('verified');
    expect(progress(s).done).toBe(1);
  });

  it('turns a disallowance into an upheld appeal, which still counts', () => {
    const s = reduce(fresh(), { type: 'disallow', id: 'l1' });
    expect(s.lines.l1).toBe('appealed');
    expect(s.appeals).toBe(1);
    expect(progress(s).done).toBe(1);
  });

  it('does not change a line that is already stamped', () => {
    const s1 = reduce(fresh(), { type: 'verify', id: 'l1' });
    const s2 = reduce(s1, { type: 'disallow', id: 'l1' });
    expect(s2).toBe(s1);
  });

  it('ignores unknown lines', () => {
    const s = fresh();
    expect(reduce(s, { type: 'verify', id: 'nope' })).toBe(s);
  });

  it('only accepts a signature once every line is stamped', () => {
    let s = fresh();
    expect(reduce(s, { type: 'sign', name: 'Ada' })).toBe(s);
    for (const id of ['l1', 'l2', 'l3']) s = reduce(s, { type: 'verify', id });
    expect(canSign(s)).toBe(true);
    s = reduce(s, { type: 'sign', name: '  Ada  ' });
    expect(s.signedBy).toBe('Ada');
  });

  it('rejects a blank signature', () => {
    let s = fresh();
    for (const id of ['l1', 'l2', 'l3']) s = reduce(s, { type: 'verify', id });
    expect(reduce(s, { type: 'sign', name: '   ' }).signedBy).toBeNull();
  });
});
