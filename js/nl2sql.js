// A pocket version of the Tencent project: map a plain-English question about
// Rocky onto SQL with keyword rules, then run it against an in-memory table.

/**
 * @typedef {{ company: string, role: string, start: string, end: string | null }} Job
 * @typedef {{ name: string, category: string }} Skill
 * @typedef {{ degree: string, school: string, finished: string }} Degree
 * @typedef {{ jobs: Job[], skills: Skill[], education: Degree[] }} Db
 * @typedef {{ sql: string | null, rows: Record<string, unknown>[] }} Answer
 */

/** @param {string} pattern @param {string} text */
const has = (pattern, text) => new RegExp(`\\b(?:${pattern})`, 'i').test(text);

/** Whole-word, case-insensitive match that also works for names like C++. @param {string} name @param {string} text */
const mentions = (name, text) =>
  new RegExp(`(?<![a-z0-9])${name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z0-9])`).test(text);

/** Words that can follow "know" or "use" without naming a skill. */
const FILLER = new Set(['about', 'at', 'of', 'the', 'a', 'an', 'any', 'in', 'for', 'with', 'how', 'to', 'on', 'work', 'job', 'daily', 'most', 'well']);

/** Keep LIKE terms to safe characters so the echoed SQL stays readable. */
const term = (/** @type {string} */ s) => s.toLowerCase().replace(/[^a-z0-9+#. -]/g, '').trim();

/** @param {string} question @param {Db} db @returns {Answer} */
export function ask(question, db) {
  const q = question.toLowerCase();

  if (has('how many', q) && has('intern', q)) {
    const count = db.jobs.filter((j) => /intern/i.test(j.role)).length;
    return { sql: "SELECT COUNT(*) AS count FROM jobs WHERE role LIKE '%Intern%';", rows: [{ count }] };
  }

  if (has('graduat|school|degree|stud|universit|college|uiuc|illinois|master|bachelor|educat', q)) {
    return {
      sql: 'SELECT degree, school, finished FROM education ORDER BY finished;',
      rows: [...db.education].sort((a, b) => a.finished.localeCompare(b.finished)),
    };
  }

  const company = db.jobs.find((j) => {
    const name = j.company.toLowerCase();
    return mentions(name, q) || mentions(name.split(' ')[0], q);
  })?.company;

  const namedSkill = company ? undefined : db.skills.find((s) => mentions(s.name, q));
  const afterVerb = q.match(/\b(?:know|knows|use|uses|used)\b((?:\s+[a-z0-9+#.]+)+)/)?.[1].trim().split(/\s+/) ?? [];
  const knowWhat = afterVerb.find((w) => !FILLER.has(w));
  const asksSkills = afterVerb.length > 0 || has('skills?\\b|languages?\\b|tools?\\b|stack\\b', q);
  if (!company && (namedSkill || asksSkills)) {
    if (namedSkill) {
      const name = term(namedSkill.name);
      return {
        sql: `SELECT name, category FROM skills WHERE LOWER(name) = '${name}';`,
        rows: db.skills.filter((s) => s.name.toLowerCase() === namedSkill.name.toLowerCase()),
      };
    }
    const like = knowWhat ? term(knowWhat) : null;
    return like
      ? {
          sql: `SELECT name, category FROM skills WHERE LOWER(name) LIKE '%${like}%';`,
          rows: db.skills.filter((s) => s.name.toLowerCase().includes(like)),
        }
      : { sql: 'SELECT name, category FROM skills;', rows: db.skills };
  }

  const year = q.match(/\b(20\d\d)\b/)?.[1];
  const current = has('now|current|today|present|these days', q);
  if (company || year || current || has('work|job|employ|compan|intern|role|position|career|experience', q)) {
    /** @type {string[]} */
    const where = [];
    /** @type {((j: Job) => boolean)[]} */
    const tests = [];
    if (company) {
      where.push(`company = '${company}'`);
      tests.push((j) => j.company === company);
    }
    if (year) {
      where.push(`start <= '${year}-12' AND (end IS NULL OR end >= '${year}-01')`);
      tests.push((j) => j.start <= `${year}-12` && (j.end === null || j.end >= `${year}-01`));
    }
    if (current) {
      where.push('end IS NULL');
      tests.push((j) => j.end === null);
    }
    const sql = `SELECT company, role, start, end FROM jobs${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY start;`;
    const rows = db.jobs.filter((j) => tests.every((t) => t(j))).sort((a, b) => a.start.localeCompare(b.start));
    return { sql, rows };
  }

  return { sql: null, rows: [] };
}
