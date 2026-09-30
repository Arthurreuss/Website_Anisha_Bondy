# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-30 · D-063 YAMawards Lene: Audience Award · D-039 – D-054 live; **D-055 = Feedback Anisha 27.09., geplant als P26–P31**; live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Feedback 27.09.** (D-055 – D-060): P26–P30 fertig und auf `claude/affectionate-maxwell-d0f30h` gepusht; **P31 wartet auf Abnahme des Users**, dann Deploy auf Zuruf.
- Rohmaterial nur im Scratchpad `/tmp/claude-0/-home-user-Website-Anisha-Bondy/4f3973c7-1afe-55c8-ac26-92bc60acac06/scratchpad/clips` (bei Abbruch neu holen; Peter-Pan-Zip: Drive `1MJxqNUQZdNEyCTGvh-qKF3mCMKUSEZBl`).
- Projekttexte als Google Doc an Anisha (ID `1jccHWcOwFOQhqua9_khu6naE2P7QLR07-l3kZZQ7PIw`). Rücklauf → Texte, Reihenfolge, Season 2026/27.
- **P24 QA**: offen Safari/iPhone + Abnahme User.

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Abnahme (Farben D-058, Sprache D-059, Lene-Intro D-060, Texte/Credits). Dann Branch nach `main` und auf Zuruf `production`.
2. Nach Deploy: Sitemap in der Search Console neu einreichen (D-059).
3. Anisha: Google Doc; [anfrage-anisha.md](anfrage-anisha.md) §6 (Ligeti/Xenakis als Projekte?, Selam-Fragen, H&G-Begriffe, pOpera 02b Fotograf:in, schlichtes Logo Theater an der Wien).
4. Wir: Quelle zum YAMaward-Gewinn nachtragen, sobald online ([Winners](https://www.youngaudiencesmusic.com/winners) zeigt noch 2025) – D-063.
5. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy).

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
