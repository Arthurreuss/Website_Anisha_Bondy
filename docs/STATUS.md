# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-10-09 · **D-067** pOpera „Participant Choir“ + **D-068** Klangstreich als erste Startseiten-Karte mit 5 Probenfotos, **live** seit 09.10. · **D-065 Lieferung Anisha 04.10.** (Oz-/Peter-Pan-Trailer als Cover, pOpera-Galerie neu, Texte aus dem Google Doc, Klangstreich oben im Archiv) + **D-066** (Lene-Schleife ohne Hänger) **live** seit 06.10. (production = main)
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅. Feedback 27.09. (P26–P31) live.

## Aktiv
- Warten auf Anishas Antworten im Google Doc (Tabs „Deutsch“, „Rückfragen“, „English“).
- Rohmaterial nur im Scratchpad dieser Session (`…/scratchpad/wt/x`, WeTransfer läuft bis 07.10. ab).
- **P24 QA**: offen Safari/iPhone + Abnahme User.

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Anisha auf die Doc-Tabs „Rückfragen“ und „English“ hinweisen (Archiv-Projekte stehen in beiden Sprach-Tabs als Nr. 11–14).
2. Box „Season 2026/27“ bauen, sobald Platz/Form geklärt (Liste: [INHALTE.md](INHALTE.md) §8).
3. Google Doc: Tabs „Rückfragen“ (= anfrage-anisha §7) und „English“ (EN-Texte aller 14 Projekte) angelegt (06.10.). Anishas Antworten/Korrekturen dort abwarten → einbauen.
4. Klangstreich nach der Premiere (D-068): Trailer-Datei → Cover-Schleife, Produktionsfotos, Podcast-Link, Presse, Fotonachweis der Probenfotos. Peter-Pan-Fotos.
5. Nach Deploy: Sitemap in der Search Console neu einreichen (D-059). Quelle YAMaward nachtragen (D-063).
6. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy).

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
