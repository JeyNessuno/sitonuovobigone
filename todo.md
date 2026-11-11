# Frutteria Bigone — todo

Things not done yet (or deliberately left as they are). The site lives in `docs/` (GitHub Pages: branch `main`, folder `/docs`).

## Content to supply
- [ ] **Upload the intro video to YouTube** (unlisted), then send the link. Then: put a YouTube `<iframe>` in the `<dialog id="vd">` in `docs/index.html`, remove the `hidden` attribute from the `#play` button, and drop the `media/presentazione.mp4` line from the script. The mp4 stays out of git (`*.mp4` is in `.gitignore`); keep the 140 MB original (`assets/presentazione.mp4`) backed up on Drive.
- [ ] **New photos of staff and pets**, and **add the chickens** to the team strip (section "La casa Bigone" in `docs/index.html`; images in `docs/img/`). Current photos are from Wix (2018–2019).
- [ ] **Tagline** for the hero (the old one was removed; the line under the title is just a description).
- [ ] **Hero image**: currently the cherry photo. Try the new drone photos of the house when ready (change one path in `docs/style.css`, `.hero`).
- [ ] Optional: **higher-quality logo** for the app icon (`docs/img/apple-touch-icon.png` and `favicon.png` are made from the 2410 px logo in `assets/`).

## Contacts
- [ ] **WhatsApp Business link** (`https://wa.me/<number>`) and/or a **form that hides the email** (Formspree / Web3Forms). For now the only contact is the Instagram DM (`https://ig.me/m/_frutteria_bigone`).

## Decisions pending
- [ ] **Map and cookie consent.** The Google Maps embed sets Google cookies. Under EU/Italian rules that normally needs consent; the practical risk for a small local shop is low but not zero. Options: keep as is; show a "Mostra la mappa" button that loads the embed on click (the "Apri in Maps" link stays visible); or a cookie banner.
- [ ] **Public URL.** `docs/index.html`, `docs/novita/index.html`, `docs/sitemap.xml` and `docs/robots.txt` use `https://jeynessuno.github.io/sitonuovobigone/`. If the address changes (custom domain), update those four files.

## After deploying
- [ ] Settings → Pages → Deploy from branch → `main` / `/docs`.
- [ ] Put `…/novita/` as the only link in the Instagram bio.
- [ ] Check on real phones (iPhone Safari, Android Chrome) and run Lighthouse.
- [ ] Share the link in WhatsApp/Instagram once to check the preview image (`docs/img/og.jpg`).
- [ ] Add the site to Google Search Console (the sitemap is already in `docs/`).

## Known and accepted (check after each sheet edit)
The site reads the Google Sheet directly, so after editing it, reload the site and check the change.
- Row 1 of each tab is always treated as the header; a fruit typed in row 1 is lost.
- A misspelled tab name makes Google return the first tab (wrong data, no error). Tabs: `Frutta`, `Orto`, `Blog`.
- Months must be numbers 1–12; a row with a bad month is skipped.
- Blog: `Data` is only display text; `Dal` / `Al` (dd/mm/yyyy) decide when a post shows. Keep both in step by hand.
- The sheet is read through Google's `gviz` address, which is unofficial. If it ever stops working, switch to File → Share → "Publish to web" (CSV link).
- Edits can take a few minutes to appear (Google cache, GitHub Pages cache ~10 min).
- Without JavaScript the fruit list and news are empty (ignored on purpose).

## Possible later
- Photos for blog posts; the old Christmas catalogues are plain text.
- Unused photos from the old site are kept in `assets/site-unused/` (cherry, pear, plum, small-fruit, vegetable and herb photos) in case they are useful again.
- Photos that Wix refused to download (Christmas catalogue, kaki, kiwi, Aperincampo) would need to be re-supplied.
