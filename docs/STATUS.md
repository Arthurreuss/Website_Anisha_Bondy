# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-27 · D-039 – D-054 live; **D-055 = Feedback Anisha 27.09., geplant als P26–P31**; live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Feedback 27.09.** (D-055) → Pakete P26–P31 in [PLAN.md](PLAN.md). Noch nichts umgesetzt.
- Ausgangsmaterial (nur im Container-Scratchpad, bei Abbruch neu holen): drei Video-Ausschnitte 1080p (Lene, Peter Pan, Hänsel und Gretel); 17 Fotos von annehoelzinger.de (D-056).
- Projekttexte als Google Doc an Anisha: „Projekttexte Website anishabondy.com – zum Korrigieren“ (Drive des Users, ID `1jccHWcOwFOQhqua9_khu6naE2P7QLR07-l3kZZQ7PIw`). User teilt es mit Anisha. Rücklauf → Texte, Reihenfolge, Season 2026/27.
- **P24 QA**: offen Safari/iPhone + Abnahme User.

## Arbeitsaufteilung (token-sparend)
- **Sonnet A (Worktree):** P26 Texte/Credits/About/og:image – klar vorgegebene Werte aus D-055, keine Gestaltung.
- **Sonnet B (Worktree, parallel):** P27 Video-Schleifen (ffmpeg über `pip install imageio-ffmpeg`) + Cover-Felder; berührt nur `cover` in den Projektdateien, damit Merge mit A konfliktfrei.
- **Opus (Hauptsession):** P29 Palette, P30 Sprache DE, danach P28 Lene-Intro, Merge + Browser-Check (P31).

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Freigabe Plan; Google Doc an Anisha (geteilt mit User-Gmail); VOCES8- und Vimeo-792233594-Ausschnitt; Peter-Pan-Videos verkleinert hochladen; oranges Foto (D-056).
2. Anisha: offene Punkte [anfrage-anisha.md](anfrage-anisha.md) §6.
3. Wir: YAMawards-Ergebnis (29.09.) bei Lene eintragen.
4. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy).

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
