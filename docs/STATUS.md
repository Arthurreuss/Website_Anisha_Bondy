# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-27 · D-039 – D-054 live; **D-055 = Feedback Anisha 27.09., geplant als P26–P31**; live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Feedback 27.09.** (D-055 – D-057) → P26–P31 in [PLAN.md](PLAN.md). Material komplett (D-057).
- Ausgangsmaterial (nur Scratchpad `/tmp/claude-0/-home-user-Website-Anisha-Bondy/4f3973c7-1afe-55c8-ac26-92bc60acac06/scratchpad/clips`, bei Abbruch neu holen): Schleifen-Quellen lene/peter-pan/haensel-und-gretel (.webm), nacht-vor-weihnachten.mp4, voces8.mp4 (1440p), barrie-moment.mkv, og-orange.jpg, peter-pan-projektionen/ (10 Videos), anne-hoelzinger/ (17 Fotos). Peter-Pan-Zip: Google-Drive-Datei `1MJxqNUQZdNEyCTGvh-qKF3mCMKUSEZBl`.
- Projekttexte als Google Doc an Anisha (ID `1jccHWcOwFOQhqua9_khu6naE2P7QLR07-l3kZZQ7PIw`, geteilt mit User-Gmail). Rücklauf → Texte, Reihenfolge, Season 2026/27.
- **P24 QA**: offen Safari/iPhone + Abnahme User.

## Laufende Agenten
- **Sonnet A** – P26 Texte/Credits/About/og:image (Worktree).
- **Sonnet B** – P27 Video-Schleifen + Galerien Peter Pan/Schneekönigin (Worktree).
- Opus (Hauptsession): P29 Palette fertig (D-058, Abnahme User), P30 Deutsch als Standard fertig (D-059). P28: Mechanik `cover.introImage` + `galleryIntroDone` committet (D-060 folgt), Lene-Daten warten auf `loop.mp4` von Sonnet B. Danach Merge, P31.

## Nächster Schritt
1. Agenten-Ergebnisse reviewen und mergen; P28 Lene-Intro.
2. Anisha: Google Doc; offene Punkte [anfrage-anisha.md](anfrage-anisha.md) §6 (Ligeti/Xenakis als Projekte?, Selam-Fragen, H&G-Begriffe, Fotograf:in Orange-Foto).
3. Wir: YAMawards-Ergebnis (29.09.) bei Lene eintragen.
4. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy). Nach Deploy: Sitemap in Search Console neu einreichen (D-059).

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
