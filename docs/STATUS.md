# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-25 · live über Netlify-Branch `main` (D-022)
**Phase:** 2 – echte Inhalte, **erster Draft fertig** (P12–P17 ✅, D-018–D-021). Phase 1: P1–P9, P11 ✅, P10 ⏸.

## Aktiv
- Animationen v2 + Tageszeit-Theme (D-023–D-025, Uhr-Layout D-029), Spezifikation [animationen-v2.md](animationen-v2.md). **Welle 1 fertig** (P18, P19, P10 ✅), P20 + P22 ✅ (D-030, D-031).

## Laufende Agenten
- keine.

## Nächster Schritt
1. Opus P21 (Case → nächster Case, §4) → P23 (Menü mit Seitenfenstern, §6; nutzt PageTitle + Fenster-Geometrie aus useWindowTransition) → P24 QA.
2. Nebenher: Antworten von Anisha („offen:“-Kästen, INHALTE.md §7), echte Fotos, YAMawards 29.09., Impressum/Datenschutz.
3. User: Netlify-Formular-Benachrichtigung + Testnachricht (D-022).

## Bekannte Kleinigkeiten
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026). Testserver je Worktree auf eigenem Port.
- Inhalte: `content/projects/<slug>.ts` (Vorlage: lene-fliegt-ins-zirkusland.ts), `content/site.ts` (About), `content/legal.ts`, UI-Texte `i18n/locales/*.json`.
- Skripte: `scripts/make-cover.py`, `scripts/make-placeholder-cover.py`, `scripts/merge-locales.py`.
- Screenshots: Playwright im Scratchpad (`pw/shot.mjs`, `pw/scroll.mjs`, `pw/sheet.py`), Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Lighthouse mit `CHROME_PATH` gesetzt. Build `npm run generate` → `dist/`, Server `python3 -m http.server 4173 --directory dist`.

## Offene Fragen an den User
- keine (D-024).
