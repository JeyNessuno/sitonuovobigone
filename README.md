# Frutteria Bigone

Website of the Frutteria Bigone fruit stand (Vignola, Italy). A static site: plain HTML, CSS and JavaScript, no build step.
The fruit, vegetables, preserves and news come from a public Google Sheet that the page reads in the visitor's browser.

- Live: https://jeynessuno.github.io/sitonuovobigone/ (news page: `/novita/`, meant as the Instagram bio link)
- Site files: `docs/` (GitHub Pages: Settings → Pages → branch `main`, folder `/docs`)
- `assets/`: original photos and unused images, kept for later (not published)
- `test/`: run `node test/sheet.test.js` after changing `docs/sheet.js`
- `todo.md`: what is left to do

## The Google Sheet
The sheet must stay shared as "anyone with the link can **view**". Its id is the `SHEET` constant at the top of `docs/sheet.js`.
Always check the site after editing the sheet. Google and GitHub Pages can take a few minutes to show changes.
Row 1 of every tab is the header. Tab names must be exact.

| Tab | Columns | Notes |
|---|---|---|
| `Frutta` | name · `Inizio` · `Fine` · `Emoji` | Months are numbers 1–12 (5 = May). A range like 11 → 2 crosses New Year. Row order is display order: put the cherries first. A row with a bad or empty month is skipped. |
| `Orto` | same | Vegetables, shown smaller below the fruit. |
| `Lavorati` | same | Jams and other things you make. Empty `Inizio` and `Fine` = all year. Never shown in the hero line. |
| `Blog` | `Titolo` · `Data` · `Testo` · `Link` · `Titolo link` · `Dal` · `Al` | The last row is the newest post. `Data` is only text shown next to the title. `Testo`: one paragraph per line break. |

**Dal / Al** decide when a post is visible. Write the year (`15/06/2026`): that is the safest. `15/06` (no year) means this year, and `2026-06-15` also works. For a post that crosses New Year, always write the years (`20/12/2026` → `05/01/2027`). Empty or unreadable = no limit.

## Deploying
Commit and push to `main`; GitHub Pages republishes in a minute or two. The browser keeps CSS and JS for up to 10 minutes, so after changing `style.css` or `sheet.js` bump the `?v=` number on their links in `docs/index.html` and `docs/novita/index.html`.

## Changing the public address
If the site moves to a custom domain, update `docs/index.html`, `docs/novita/index.html`, `docs/sitemap.xml` and `docs/robots.txt`.
