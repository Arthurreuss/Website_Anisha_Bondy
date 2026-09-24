# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 2 – echte Inhalte, **erster Draft fertig** (P12–P17 ✅, D-018–D-021). Phase 1: P1–P9, P11 ✅, P10 ⏸.

## Aktiv
- nichts – User geht den Draft mit Anisha durch.

## Laufende Agenten
- keine.

## Nächster Schritt
1. Antworten von Anisha einarbeiten: jede Markierung „offen:“ (UiTodo) auf der Seite = eine offene Frage; Liste auch in INHALTE.md §7 und in `todos` der Projektdateien bzw. `content/site.ts`.
2. Echte Fotos → `scripts/make-cover.py` (Cover 4:5) + `gallery` in den Projektdateien; Platzhalter-SVGs löschen.
3. YAMawards-Ergebnis (29.09.2026) in `content/projects/lene-fliegt-ins-zirkusland.ts` + INHALTE.md §4.
4. Vor Livegang: Impressum/Datenschutz ausfüllen + prüfen lassen, `showTodos` aus, Lighthouse mobil auf Netlify (D-016).

## Bekannte Kleinigkeiten
- Zurück zur Startseite: Galerie startet bei Position 0 (D-015).
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.

## Hilfsmittel
- Inhalte: `content/projects/<slug>.ts` (Vorlage: lene-fliegt-ins-zirkusland.ts), `content/site.ts` (About), `content/legal.ts`, UI-Texte `i18n/locales/*.json`.
- Skripte: `scripts/make-cover.py`, `scripts/make-placeholder-cover.py`, `scripts/merge-locales.py`.
- Screenshots: Playwright im Scratchpad (`pw/shot.mjs`, `pw/scroll.mjs`, `pw/sheet.py`), Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Lighthouse mit `CHROME_PATH` gesetzt. Build `npm run generate` → `dist/`, Server `python3 -m http.server 4173 --directory dist`.

## Offene Fragen an den User
- INHALTE.md §7 (Sprache ✅ EN+DE geklärt, D-018).
