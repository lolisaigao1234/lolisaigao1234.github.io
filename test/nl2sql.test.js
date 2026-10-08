import { describe, it, expect } from 'vitest';
import { ask } from '../js/nl2sql.js';

const db = {
  jobs: [
    { company: 'Feisu Technology', role: 'Data Analyst Intern', start: '2021-06', end: '2021-08' },
    { company: 'Tencent', role: 'Data Analyst Intern', start: '2023-06', end: '2023-08' },
    { company: 'SDIC Securities', role: 'Data Analyst & SDE Intern', start: '2024-06', end: '2024-08' },
    { company: 'Actiontec', role: 'Data Scientist', start: '2026-02', end: null },
  ],
  skills: [
    { name: 'Python', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'SQL', category: 'Languages' },
    { name: 'MySQL', category: 'Backend' },
    { name: 'Git', category: 'Delivery' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'MongoDB', category: 'Backend' },
  ],
  education: [
    { degree: 'M.S. Information Management', school: 'UIUC', finished: '2025-12' },
  ],
};

describe('ask', () => {
  it('lists every employer for a general work question', () => {
    const r = ask('Where has Rocky worked?', db);
    expect(r.sql).toMatch(/^SELECT .* FROM jobs/);
    expect(r.rows).toHaveLength(4);
  });

  it('filters jobs by year', () => {
    const r = ask('who did he work for in 2024', db);
    expect(r.sql).toContain('2024');
    expect(r.rows.map((x) => x.company)).toEqual(['SDIC Securities']);
  });

  it('finds the current job', () => {
    const r = ask("what's his job right now?", db);
    expect(r.sql).toContain('end IS NULL');
    expect(r.rows.map((x) => x.company)).toEqual(['Actiontec']);
  });

  it('filters by a named company', () => {
    const r = ask('what did he do at tencent', db);
    expect(r.rows.map((x) => x.company)).toEqual(['Tencent']);
  });

  it('counts internships', () => {
    const r = ask('how many internships', db);
    expect(r.sql).toContain('COUNT(*)');
    expect(r.rows).toEqual([{ count: 3 }]);
  });

  it('answers whether a skill is known', () => {
    const r = ask('does he know mongodb?', db);
    expect(r.sql).toContain("LOWER(name) = 'mongodb'");
    expect(r.rows.map((x) => x.name)).toEqual(['MongoDB']);
  });

  it('lists skills', () => {
    expect(ask('what are his skills', db).rows).toHaveLength(db.skills.length);
  });

  it('prefers a named company over skill keywords in its name', () => {
    const r = ask('What did he do at Feisu Technology?', db);
    expect(r.sql).toMatch(/FROM jobs/);
    expect(r.rows.map((x) => x.company)).toEqual(['Feisu Technology']);
  });

  it('matches skill names as whole words only', () => {
    expect(ask('does he know JavaScript?', db).rows).toEqual([]);
    expect(ask('does he know PostgreSQL?', db).rows).toEqual([]);
    expect(ask('is he a legit hire? what skills', db).rows).toHaveLength(db.skills.length);
    expect(ask('does he know SQL?', db).rows.map((x) => x.name)).toEqual(['SQL']);
  });

  it('skips filler words after know/use', () => {
    expect(ask('what does he use at work?', db).rows).toHaveLength(db.skills.length);
    expect(ask('what does he know about python?', db).rows.map((x) => x.name)).toEqual(['Python']);
    expect(ask('does he use rust', db).sql).toContain("LIKE '%rust%'");
  });

  it('answers education questions', () => {
    const r = ask('when did he graduate', db);
    expect(r.sql).toMatch(/FROM education/);
    expect(r.rows[0].school).toBe('UIUC');
  });

  it('returns no SQL for questions it cannot map', () => {
    const r = ask('what is the airspeed of an unladen swallow', db);
    expect(r.sql).toBeNull();
    expect(r.rows).toEqual([]);
  });
});
