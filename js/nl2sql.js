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

  const namedSkill = db.skills.find((s) => q.includes(s.name.toLowerCase()));
  const knowWhat = q.match(/\b(?:know|use|used|knows)\s+([a-z0-9+#.]+)/);
  if (namedSkill || knowWhat || has('skills?\\b|languages?\\b|tools?\\b|stack\\b|tech', q)) {
    const like = namedSkill ? term(namedSkill.name) : knowWhat ? term(knowWhat[1]) : null;
    return like
      ? {
          sql: `SELECT name, category FROM skills WHERE LOWER(name) LIKE '%${like}%';`,
          rows: db.skills.filter((s) => s.name.toLowerCase().includes(like)),
        }
      : { sql: 'SELECT name, category FROM skills;', rows: db.skills };
  }

  const company = db.jobs.find((j) => {
    const name = j.company.toLowerCase();
    return q.includes(name) || q.includes(name.split(' ')[0]);
  })?.company;
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
