# Rockygotchi

Rocky Wu's personal site, served at <https://lolisaigao1234.github.io>.

Rocky is a pet rock living in a handheld. Feed him data, give him coffee,
throw bugs at him, and he evolves through every job Rocky Wu has had: from a
UIUC freshman pebble to the data scientist boulder he is today. Each stage
unlocks a card with one real fact, and some come with a toy:

| Stage | Toy |
| --- | --- |
| Polyglot Pebble (Tencent) | Ask his résumé a question; it's turned into SQL and run. |
| Quant Pebble (AiFinSphere) | Guess an option's volatility, then let Newton-Raphson finish. |
| Data Scientist Boulder (Actiontec) | Score your own Wi-Fi. You are network #1,776. |
| Side quest | Spot the wash sale. |

Three pages: **Play**, the **Rockydex** sticker book (with a skip-to-the-end
button for busy people), and **Adopt**, which is how you contact him.

Stickers were drawn by Codex; the LCD sprite is drawn in code.

## Running it

No build step. GitHub Pages serves the repo root as is.

```bash
npm install        # typescript + vitest, for checks only
npm run dev        # static server on http://localhost:3000
npm run check      # typecheck (JSDoc, checkJs) + tests
```

## Layout

- `js/data.js`: every word the game says about Rocky. Edit content here.
- `js/pet.js`: the pet's rules (hatching, XP, evolution). Tested.
- `js/lcd.js`: the 48×32 pixel screen.
- `js/toys.js`: the interactive demos, built on `nl2sql.js`, `blackscholes.js`, `wifi.js`, `washsale.js` (all tested).
- `js/main.js`: pages, card, Rockydex, adoption page.
- `assets/stickers/`: one WebP sticker per stage.
