# Form 1040-RW

Rocky Wu's personal site, served at <https://lolisaigao1234.github.io>.

Visitors get a notice from the Résumé Revenue Service: they've been selected to
audit Rocky. The page is his résumé filed as a tax return. Each job is an
income line, skills are itemized on Schedule A, and a side project goes on
Schedule C. Auditing a line opens its evidence, and four of them are working
demos of the thing the line claims:

| Line | Exhibit |
| --- | --- |
| 2, Tencent | Ask Rocky's résumé a question; a rule-based translator turns it into SQL and runs it. |
| 5, AiFinSphere | Back out implied volatility with Black-Scholes and Newton-Raphson. |
| 7, Actiontec | Get a Wi-Fi health score for your own connection. You are network #1,776. |
| 10, Schedule C | Spot the wash sale in a list of trades. |

Disallowing a line files an appeal. The appeal always wins.

## Running it

No build step. GitHub Pages serves the repo root as is.

```bash
npm install        # typescript + vitest, for checks only
npm run dev        # static server on http://localhost:3000
npm run check      # typecheck (JSDoc, checkJs) + tests
```

## Layout

- `index.html`, `styles.css`: the envelope, the notice, the form.
- `js/data.js`: everything the form says about Rocky. Edit content here.
- `js/main.js`: renders the form, runs the evidence dialog and signature.
- `js/audit.js`, `js/nl2sql.js`, `js/blackscholes.js`, `js/wifi.js`, `js/washsale.js`: pure logic, tested in `test/`.
