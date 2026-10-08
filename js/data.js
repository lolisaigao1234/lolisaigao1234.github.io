// Everything the form says about Rocky. Sourced from his résumé; edit here,
// not in the markup.

/**
 * @typedef {'sql' | 'blackscholes' | 'wifi' | 'washsale'} ExhibitKind
 * @typedef {{
 *   id: string,
 *   no: string,
 *   label: string,
 *   entry: string,
 *   period: string,
 *   place: string,
 *   amount: string,
 *   evidence: string[],
 *   exhibit?: ExhibitKind,
 *   appeal: string,
 * }} Line
 */

export const taxpayer = {
  first: 'JiaYang “Rocky”',
  last: 'Wu',
  occupation: 'Data scientist, backend & data platform',
  home: 'lolisaigao1234.github.io',
  region: 'San Francisco Bay Area',
  languages: 'English (fluent), Chinese (native)',
  email: 'rockyforwork123@gmail.com',
  github: 'https://github.com/lolisaigao1234',
  linkedin: 'https://www.linkedin.com/in/jiayang-wu-85b960179',
};

/** Part I, income: every job, oldest first. @type {Line[]} */
export const income = [
  {
    id: 'feisu',
    no: '1',
    label: 'Feisu Technology',
    entry: 'Data analyst intern, investment & marketing',
    period: 'Jun–Aug 2021',
    place: 'Shenzhen',
    amount: '+30% ad ROI',
    evidence: [
      'Built a Django + MySQL web app to analyze half-yearly sales for Android apps: ad spend, downloads, visits, subscriptions, ROI.',
      'Cleaned and validated the data before anyone made a marketing call on it.',
      'Found the trends that lifted advertising ROI by 30% inside the app ecosystem.',
    ],
    appeal: 'Grounds for disallowance were recorded as “seemed like a lot.” That is not grounds.',
  },
  {
    id: 'tencent',
    no: '2',
    label: 'Tencent, Big Data Brain',
    entry: 'Data analyst intern',
    period: 'Jun–Aug 2023',
    place: 'Shenzhen',
    amount: '80% accuracy',
    evidence: [
      'Architected a pipeline that turns plain-language questions into SQL, mapping meaning onto SQL keywords with 80% accuracy.',
      'Wrote and refined 100+ MySQL test cases for an NLP model, making training and validation 20% faster.',
      'Built a Python database-migration utility with JSON parsing.',
    ],
    exhibit: 'sql',
    appeal: 'The taxpayer submitted 100 test cases. The auditor read four of them and withdrew.',
  },
  {
    id: 'actiontec-2023',
    no: '3',
    label: 'Actiontec, Data & Analytics',
    entry: 'Data analyst intern',
    period: 'Dec 2023–May 2024',
    place: 'Santa Clara',
    amount: '1M+ alarm records',
    evidence: [
      'Modeled data across S3 Parquet, MySQL on AWS, and Athena for early ML evaluation.',
      'Consolidated over a million product alarm records so engineers could pin down Wi-Fi modem bugs.',
      'Wrote the data dictionary: flows, definitions, and integrity rules.',
    ],
    appeal: 'The auditor asked for all one million records as evidence. They arrived. The auditor regrets asking.',
  },
  {
    id: 'sdic',
    no: '4',
    label: 'SDIC Securities',
    entry: 'Data analyst & software engineer intern',
    period: 'Jun–Aug 2024',
    place: 'Shanghai',
    amount: '+15% throughput',
    evidence: [
      'Built a multiprocessing Python pipeline joining MySQL and Oracle data as the base for quantitative models.',
      'Merged cross-asset datasets (ETFs, stocks, profit) into dashboards on profit distribution and trade frequency.',
      'Made it 15% faster with worker pools, error-handling queues, and tidy helper functions.',
    ],
    appeal: 'The objection was processed on a single core. The appeal was processed on eight and arrived first.',
  },
  {
    id: 'aifinsphere',
    no: '5',
    label: 'AiFinSphere',
    entry: 'Data analyst & model building intern, AI quant fund',
    period: 'Aug–Oct 2024',
    place: 'Remote',
    amount: '100s of millions of records',
    evidence: [
      'Connected the Interactive Brokers API to a Python Black-Scholes model, solving implied volatility with Newton-Raphson.',
      'Used Spark to process market data for high-volume tech stocks in parallel.',
      'Unified hundreds of millions of transaction records, cutting compute time by 10%.',
    ],
    exhibit: 'blackscholes',
    appeal: 'The taxpayer priced the auditor’s objection as an option. It expired worthless.',
  },
  {
    id: 'actiontec-2025',
    no: '6',
    label: 'Actiontec, Wi-Fi QoE',
    entry: 'Data analyst & model building intern',
    period: 'May–Dec 2025',
    place: 'Santa Clara',
    amount: '+60% assessment speed',
    evidence: [
      'Designed the first Wi-Fi Quality of Experience health score, using ANOVA and PCA to fold seven metric families into one number.',
      'Rewrote raw speed into “performance potential” so the score reflects what a person actually feels.',
      'Took one data-gathering shell script through 27 iterations, then moved the whole thing to Docker on EC2 with Athena.',
      'Built the real-time monitoring dashboard that made health assessment 60% faster.',
    ],
    appeal: 'The disallowance was itself disallowed on review. Iteration 28.',
  },
  {
    id: 'actiontec-2026',
    no: '7',
    label: 'Actiontec, Data scientist',
    entry: 'Lead developer, Wi-Fi QoE health score platform',
    period: 'Feb 2026–present',
    place: 'Santa Clara',
    amount: '1,775 networks / 15 min',
    evidence: [
      'Leads an async Python/FastAPI service that scores 9 health dimensions for about 1,775 networks every 15 minutes.',
      'Rebuilt the scheduler around bounded asyncio concurrency, a shared httpx pool, lock-guarded JWT refresh, and Retry-After-aware backoff.',
      'Re-architected MongoDB storage for ~1M records a day (~30M retained) so the dashboard stopped timing out.',
      'Shipped a 13-endpoint REST API and React/Vite dashboard as a 5-service Docker Compose stack with signed releases.',
      'Holds AI coding agents to strict review: 1,050+ tests, a checker tying 780+ functions to 18 specs and 16 ADRs, 200+ Gerrit changes.',
    ],
    exhibit: 'wifi',
    appeal: 'The auditor’s connection was scored during the dispute. It was the auditor’s connection that failed.',
  },
];

/** Part II, education. */
export const education = {
  id: 'uiuc',
  no: '9',
  label: 'University of Illinois Urbana-Champaign',
  degrees: [
    { degree: 'M.S. Information Management', minor: 'Minor in computer science', finished: 'Dec 2025' },
    { degree: 'B.S. Information Science & Data Science', minor: 'Minor in computer science', finished: 'May 2024' },
  ],
  evidence: [
    'Master’s coursework: data analytics, cloud computing, financial data management.',
    'Bachelor’s coursework: data structures, databases, machine learning, deep learning.',
    'Five and a half Champaign winters, survived.',
  ],
  appeal: 'Champaign confirms the taxpayer attended. The cornfields have been notified.',
};

/** Schedule C, a business of one. */
export const project = {
  id: 'reconciler',
  no: '10',
  label: 'Tax & portfolio reconciliation system',
  period: 'Oct 2024–ongoing',
  evidence: [
    'Simulates a broker: places trades, then computes tax liability, capital gains, and wash sales on its own.',
    'Reconciles transactions against live market data and writes a daily P&L statement with the tax entries.',
    'Documents every rule it applies, because tax code is not self-explanatory.',
  ],
  appeal: 'The disallowance was flagged by the taxpayer’s own reconciler as a wash. Reversed.',
};

/** Schedule A, itemized skills. */
export const skills = [
  { category: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'C++', 'Java'] },
  { category: 'Backend & data', items: ['FastAPI', 'asyncio', 'httpx', 'REST APIs', 'MongoDB', 'MySQL', 'Spark', 'Pandas'] },
  { category: 'Cloud & delivery', items: ['AWS EC2', 'S3', 'Athena', 'Docker Compose', 'Git', 'Gerrit', 'pytest', 'Vitest'] },
  { category: 'Analytics & ML', items: ['NumPy', 'scikit-learn', 'PyTorch', 'TensorFlow', 'Tableau', 'Power BI'] },
  { category: 'Frontend', items: ['React', 'Vite'] },
  { category: 'Tax & accounting', items: ['Capital gains', 'Wash sales', 'Reconciliation'] },
];

/** The table the SQL exhibit queries. */
export const db = {
  jobs: [
    { company: 'Feisu Technology', role: 'Data Analyst Intern', start: '2021-06', end: '2021-08' },
    { company: 'Tencent', role: 'Data Analyst Intern', start: '2023-06', end: '2023-08' },
    { company: 'Actiontec', role: 'Data Analyst Intern', start: '2023-12', end: '2024-05' },
    { company: 'SDIC Securities', role: 'Data Analyst & SDE Intern', start: '2024-06', end: '2024-08' },
    { company: 'AiFinSphere', role: 'Model Building Intern', start: '2024-08', end: '2024-10' },
    { company: 'Actiontec', role: 'Model Building Intern', start: '2025-05', end: '2025-12' },
    { company: 'Actiontec', role: 'Data Scientist', start: '2026-02', end: null },
  ],
  skills: skills.flatMap((s) => s.items.map((name) => ({ name, category: s.category }))),
  education: [
    { degree: 'B.S. Information Science & Data Science', school: 'UIUC', finished: '2024-05' },
    { degree: 'M.S. Information Management', school: 'UIUC', finished: '2025-12' },
  ],
};

/**
 * Trades for the wash-sale exhibit. Only `s3` is a wash: a loss with a rebuy
 * 18 days later. `s2` is the decoy, a rebuy nearby but sold at a gain.
 */
export const trades = /** @type {import('./washsale.js').Trade[]} */ ([
  { id: 'b1', date: '2024-02-05', side: 'buy', symbol: 'AMD', price: 170 },
  { id: 'b2', date: '2024-02-20', side: 'buy', symbol: 'NVDA', price: 72 },
  { id: 's1', date: '2024-03-01', side: 'sell', symbol: 'AMD', price: 205, lot: 'b1' },
  { id: 'b3', date: '2024-04-01', side: 'buy', symbol: 'NVDA', price: 90 },
  { id: 's2', date: '2024-04-19', side: 'sell', symbol: 'NVDA', price: 76, lot: 'b2' },
  { id: 's3', date: '2024-04-22', side: 'sell', symbol: 'NVDA', price: 79, lot: 'b3' },
  { id: 'b4', date: '2024-05-10', side: 'buy', symbol: 'NVDA', price: 85 },
]);
