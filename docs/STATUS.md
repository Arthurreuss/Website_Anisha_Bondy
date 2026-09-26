# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-26 · D-039 – D-049 live, D-050 auf Branch (D-047 Web-Recherche + Partner-Logos, D-048 Liste gekürzt, D-049 Antworten Anisha); live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Inhalte aus WeTransfer 25.09.** (D-039): Impressum (AT) + Verantwortliche im Datenschutz + E-Mail im Kontakt eingetragen; Fotos (Cover + Galerie) für Dornröschen, Zauberer von Oz, Lene, pOpera; About-Portrait (Claudia Greco); Vimeo-Video Schneekönigin. Auf `main` und `production` (D-040).
- **P24 QA** (D-037): offen Safari/iPhone + Abnahme User.
- **P25 Hosting** ✅ (D-032, D-038, D-040, D-041): `anishabondy.com` live, Formular an Anisha.
- **SEO** (D-041): Sitemap, robots.txt, canonical mit Domain, og/twitter, JSON-LD – live.
- **Bilder für Kacheln** (D-042): Aufgabe an Anisha ([anfrage-anisha.md](anfrage-anisha.md) §1).
- **Feinschliff** (D-045, D-046): Flicker Karte → Case (GSAP-Rundung, Video-Klon, Klon wie Karten-Ebene), Titelband im Menü – live. D-050: Galerie hält beim Karten-Klick an (Ruck nach rechts) – noch nicht live.
- **Projektangaben aus dem Netz** (D-047): Termine (Feld `dates`), Credits, Pressezitate, Partner-Logos mit Links; Showreel-Hinweis raus – live.
- **Antworten Anisha** (D-049): Selam-Credits/Clips, Oz-Text, Flucht-Trailer, Klangstreich neu, Mitternachtstür gelöscht, Instagram/LinkedIn – live. Geplant: Box „Season 2026/27“, sobald Anishas Liste (5 Projekte) da ist.

## Laufende Agenten
- keine.

## Nächster Schritt
1. Anisha: Liste Season 2026/27, Fotos, VOCES8-Datum, Rechtsprüfung ([anfrage-anisha.md](anfrage-anisha.md)).
2. Wir: YAMawards-Ergebnis (29.09.) bei Lene eintragen.
3. User: Karten-Klick nach Trackpad-Scrollen prüfen (D-046, D-050); Dornröschen-Video auf echtem Gerät.
4. Search Console fertig (Sitemap 38 Seiten, Indexierung Start/About beantragt) – nur abwarten.
5. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy). Originale der Lieferung hat der User gesichert.

## Bekannte Kleinigkeiten
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.
- Farbkontrast halbtransparenter Kleintexte (D-037).

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026).
- Inhalte: `content/projects/<slug>.ts`, `content/site.ts` (About), `content/legal.ts` (Impressum, Datenschutz, `contactEmail`), UI-Texte `i18n/locales/*.json`.
- Fotos: `scripts/make-media.py` (Zuschnitt 4:5 / 16:10, Verkleinern); ältere: `make-cover.py`, `make-placeholder-cover.py`, `merge-locales.py`.
- Build `npm run generate` → `.output/public` (mit `CF_PAGES=1` → `dist`), Server mit sauberen URLs wie Cloudflare: `npx serve@14 dist -l 4194` (python http.server findet `about.html` nicht). Playwright global unter `/opt/node22/lib/node_modules` (im Skriptordner verlinken).

## Offene Fragen an den User
- Abnahme P24 (Safari/iPhone).
- Menü mit 4 Fenstern: „Über mich“ am Fensterrand angeschnitten (schon vor D-045) – Titel dort kleiner?
