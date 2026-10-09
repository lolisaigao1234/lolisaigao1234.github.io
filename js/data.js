// Everything the game says about Rocky. Sourced from his résumé; edit here,
// not in the markup.

/**
 * @typedef {import('./pet.js').Action} Action
 * @typedef {'sql' | 'blackscholes' | 'wifi' | 'washsale'} ToyKind
 * @typedef {{
 *   id: string,
 *   name: string,
 *   when: string,
 *   joke: string,
 *   fact: string,
 *   hint: string,
 *   favorite: Action,
 *   reactions: Record<Action, string>,
 *   toy?: { kind: ToyKind, label: string },
 * }} Stage
 */

export const owner = {
  name: 'JiaYang “Rocky” Wu',
  email: 'toosakarin00@gmail.com',
  github: 'https://github.com/lolisaigao1234',
  linkedin: 'https://www.linkedin.com/in/jiayang-wu-85b960179',
};

/** Rocky's life, one evolution per chapter. Stage 0 is the unhatched geode. @type {Stage[]} */
export const stages = [
  {
    id: 'geode',
    name: 'Mysterious geode',
    when: 'Somewhere in Illinois, 2020',
    joke: 'Something in there is reading a CSV.',
    fact: 'Press any button to crack it open.',
    hint: 'Any button works. Be gentle. Or don’t.',
    favorite: 'data',
    reactions: {
      data: '*tap tap* Something inside asked for the schema.',
      coffee: '*crack* It smelled the coffee.',
      bug: '*CRACK* The bug startled it.',
    },
  },
  {
    id: 'pebble',
    name: 'Freshman Pebble',
    when: 'UIUC, Champaign, 2020',
    joke: 'Hatched in a cornfield with a student ID and big plans.',
    fact: 'Starts a B.S. in Information Science + Data Science at UIUC, with a computer science minor.',
    hint: 'He’s hungry for data.',
    favorite: 'data',
    reactions: {
      data: 'Nom. His first pandas DataFrame. He’s hooked.',
      coffee: 'Too young for coffee. He’s vibrating.',
      bug: 'He hid behind a textbook.',
    },
  },
  {
    id: 'feisu',
    name: 'Dashboard Pebble',
    when: 'Feisu Technology, Shenzhen, summer 2021',
    joke: 'Discovers charts. Will not stop making them.',
    fact: 'Builds Django + MySQL dashboards for Android app sales, and finds trends that lift ad ROI by 30%.',
    hint: 'He wants more data to chart.',
    favorite: 'data',
    reactions: {
      data: 'He turned breakfast into a bar chart. Trending up 30%.',
      coffee: 'He made a dashboard of his caffeine intake.',
      bug: 'Dirty sales data! Cleaned. Validated. Twice.',
    },
  },
  {
    id: 'tencent',
    name: 'Polyglot Pebble',
    when: 'Tencent Big Data Brain, Shenzhen, summer 2023',
    joke: 'Learns to translate plain English into SQL.',
    fact: 'Builds a pipeline that turns questions into SQL with 80% accuracy, and 100+ MySQL test cases that speed up model training by 20%.',
    hint: 'He’s in a test-writing mood. Give him bugs.',
    favorite: 'bug',
    reactions: {
      data: 'SELECT * FROM snacks; Works 80% of the time.',
      coffee: 'He asked for coffee in SQL and got tea. That’s the other 20%.',
      bug: 'He wrote a test case for it. Then 99 more.',
    },
    toy: { kind: 'sql', label: 'Ask him a question' },
  },
  {
    id: 'graduate',
    name: 'Graduate Pebble',
    when: 'Actiontec, Santa Clara, 2023–24, then a UIUC diploma',
    joke: 'Wrangles a million alarm records, then tosses his cap.',
    fact: 'Untangles 1M+ Wi-Fi modem alarm records across S3, MySQL and Athena, writes the data dictionary, and graduates in May 2024.',
    hint: 'A million records won’t eat themselves.',
    favorite: 'data',
    reactions: {
      data: 'One million alarm records. He ate them alphabetically.',
      coffee: 'Every alarm went off at once. He’s fine. He’s totally fine.',
      bug: 'Modem bug located. Documented. Added to the data dictionary.',
    },
  },
  {
    id: 'multiprocess',
    name: 'Multiprocessing Pebble',
    when: 'SDIC Securities, Shanghai, summer 2024',
    joke: 'Grows four arms to do four things at once.',
    fact: 'Builds a multiprocessing Python pipeline over MySQL and Oracle market data, with error-handling queues, that runs 15% faster.',
    hint: 'Four arms, four cups. Coffee, please.',
    favorite: 'coffee',
    reactions: {
      data: 'He multiprocessed his breakfast. 15% faster.',
      coffee: 'Four arms, four coffees. Throughput is through the roof.',
      bug: 'Bug sent to the error queue. He’ll get to it. In parallel.',
    },
  },
  {
    id: 'quant',
    name: 'Quant Pebble',
    when: 'AiFinSphere (remote), fall 2024, plus the start of an M.S.',
    joke: 'Puts on a monocle. Starts pricing everything.',
    fact: 'Wires a Black-Scholes model to the Interactive Brokers API and solves implied volatility with Newton-Raphson, while starting an M.S. in Information Management.',
    hint: 'Markets run on data. Feed him some.',
    favorite: 'data',
    reactions: {
      data: 'He priced his lunch as a call option. Strike: one sandwich.',
      coffee: 'Caffeine volatility: high. Newton converged anyway.',
      bug: 'He hedged against the bug. It expired worthless.',
    },
    toy: { kind: 'blackscholes', label: 'Price an option with him' },
  },
  {
    id: 'antenna',
    name: 'Antenna Pebble',
    when: 'Actiontec, Santa Clara, 2025',
    joke: 'Sprouts an antenna. Rewrites one shell script 27 times.',
    fact: 'Designs a Wi-Fi Quality of Experience score with ANOVA and PCA, moves it to Docker on EC2, makes health checks 60% faster, and finishes his M.S. in December 2025.',
    hint: 'Version 28 needs debugging. Throw him a bug.',
    favorite: 'bug',
    reactions: {
      data: 'Signal strength: excellent. Appetite: also excellent.',
      coffee: 'Iteration 28 of the shell script. He’s not tired, you’re tired.',
      bug: 'Bug squashed. Your Wi-Fi health score just went up 3 points.',
    },
  },
  {
    id: 'boulder',
    name: 'Data Scientist Boulder',
    when: 'Actiontec, Santa Clara, February 2026 to now',
    joke: 'Final form. Scores 1,775 networks every 15 minutes. Wears sunglasses indoors.',
    fact: 'Leads a FastAPI service that scores 9 Wi-Fi health dimensions, stores ~1M records a day in MongoDB, and keeps AI coding agents honest with 1,050+ tests.',
    hint: 'Fully grown. He’s looking for a new home.',
    favorite: 'bug',
    reactions: {
      data: 'A million records a day and he’s still snacking.',
      coffee: 'He brewed coffee with bounded asyncio concurrency. Four cups at a time.',
      bug: 'One of his 1,050 tests caught it before it hatched.',
    },
    toy: { kind: 'wifi', label: 'Score your Wi-Fi like he does' },
  },
];

/** A Rockydex bonus card, unlocked with the final stage. */
export const sideQuest = {
  id: 'taxes',
  name: 'Side quest: tax reconciler',
  when: 'Since October 2024',
  fact: 'Simulates a broker, reconciles every trade, and catches wash sales so tax season is boring.',
  toy: { kind: /** @type {const} */ ('washsale'), label: 'Spot the wash sale' },
};

/** The adoption page's care sheet. */
export const careSheet = [
  { label: 'Diet', value: 'Python, SQL, TypeScript, FastAPI, asyncio, MongoDB, Spark, Pandas, AWS, Docker' },
  { label: 'Habitat', value: 'San Francisco Bay Area' },
  { label: 'Speaks', value: 'English, Chinese' },
  { label: 'Schooling', value: 'UIUC: B.S. Information Science + Data Science (2024), M.S. Information Management (2025)' },
  { label: 'Currently', value: 'Data scientist at Actiontec, and actively looking for his next role' },
];

/** @type {[string, string[]][]} */
const skillsByCategory = [
  ['Languages', ['Python', 'SQL', 'TypeScript', 'C++', 'Java']],
  ['Backend & data', ['FastAPI', 'asyncio', 'httpx', 'REST APIs', 'MongoDB', 'MySQL', 'Spark', 'Pandas']],
  ['Cloud & delivery', ['AWS EC2', 'S3', 'Athena', 'Docker Compose', 'Git', 'Gerrit', 'pytest', 'Vitest']],
  ['Analytics & ML', ['NumPy', 'scikit-learn', 'PyTorch', 'TensorFlow', 'Tableau', 'Power BI']],
  ['Frontend', ['React', 'Vite']],
];

/** The table the SQL toy queries. */
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
  skills: skillsByCategory.flatMap(([category, names]) => names.map((name) => ({ name, category }))),
  education: [
    { degree: 'B.S. Information Science & Data Science', school: 'UIUC', finished: '2024-05' },
    { degree: 'M.S. Information Management', school: 'UIUC', finished: '2025-12' },
  ],
};

/**
 * Trades for the wash-sale toy. Only `s3` is a wash: a loss with a rebuy
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
