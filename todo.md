# Frutteria Bigone — todo

Things not done yet (or deliberately left as they are). The site lives in `docs/` (GitHub Pages: branch `main`, folder `/docs`).

## Content to supply
- [x] **Intro video**: now a YouTube embed (privacy mode, loaded only when the button is pressed; video id `UL_gEU1mOwU`, set in the script at the bottom of `docs/index.html`). The local mp4 files and poster were deleted.
- [x] **New photos of staff and pets** (Miele, Moretta, Fortuna, Arya added; originals in `assets/team-originals/`).
- [x] **Hero image**: now the drone photos (front by default, round-arrow buttons flip the photo to the back; `docs/img/house_front_*.webp` / `house_back_*.webp` at 1280, 1920 and 2560 px wide (the browser picks by screen size), full-size originals in `assets/house-originals/`). To go back to the cherry photo, change `class="hero"` to `class="hero cherry"` in `docs/index.html` (one word; the flip photos and arrows hide themselves). Still open: the house sits behind the title/buttons, so consider moving the text if the photos should show more.
- [ ] Optional: **higher-quality logo** for the app icon (`docs/img/apple-touch-icon.png` and `favicon.png` are made from the 2410 px logo in `assets/`).

## Contacts
- [ ] **WhatsApp Business link** (`https://wa.me/<number>`) and/or a **form that hides the email** (Formspree / Web3Forms). For now the only contact is the Instagram DM (`https://ig.me/m/_frutteria_bigone`).

## Decisions pending
- [x] **Map and cookie consent**: solved. The map is now a static picture (`docs/img/mappa.jpg`, a capture of the Google embed with its logo and attribution, cropped so the rating card is not shown: Google draws "4.9 ★" with a single star, which looked like a one-star review) that links to Google Maps, so no Google cookies are set. The uncropped capture is in `assets/map-original/`. Recapture only if the area changes.
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
- Blog: `Data` is only display text; `Dal` / `Al` decide when a post shows: write `dd/mm/yyyy` or just `dd/mm` (no year = this year; an end earlier than the start counts as next year, e.g. 20/12 → 5/1). The cell may be formatted as a date; the site reads what the sheet displays. Keep both in step by hand.
- The sheet is read through Google's `gviz` address, which is unofficial. If it ever stops working, switch to File → Share → "Publish to web" (CSV link).
- Edits can take a few minutes to appear (Google cache, GitHub Pages cache ~10 min).
- Without JavaScript the fruit list and news are empty (ignored on purpose).

## Possible later
- Photos for blog posts; the old Christmas catalogues are plain text.
- Unused photos from the old site are kept in `assets/site-unused/` (cherry, pear, plum, small-fruit, vegetable and herb photos) in case they are useful again.
- Photos that Wix refused to download (Christmas catalogue, kaki, kiwi, Aperincampo) would need to be re-supplied.
