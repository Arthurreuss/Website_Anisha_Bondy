# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-25 · live über Netlify-Branch `main` (D-022)
**Phase:** 2 – echte Inhalte, **erster Draft fertig** (P12–P17 ✅, D-018–D-021). Phase 1: P1–P9, P11 ✅, P10 ⏸.

## Aktiv
- Animationen v2 + Tageszeit-Theme (D-023–D-025), Spezifikation [animationen-v2.md](animationen-v2.md). **Welle 1 läuft.**

## Laufende Agenten
- Sonnet, eigene Worktrees: P18 (Intro v2), P10 (Tageszeit-Theme + Uhr). P19 ✅ gemergt. Nach Rückmeldung: Review + Merge nach Checkliste in agent-briefing.md.

## Nächster Schritt
1. Welle 1 reviewen + mergen (P18, P19, P10) → dann P20 (Sonnet); dann Opus P22 → P21 → P23; zum Schluss P24.
2. Nebenher: Antworten von Anisha („offen:“-Kästen, INHALTE.md §7), echte Fotos, YAMawards 29.09., Impressum/Datenschutz.
3. User: Netlify-Formular-Benachrichtigung + Testnachricht (D-022).

## Bekannte Kleinigkeiten
- Zurück zur Startseite: Galerie startet bei Position 0 (D-015).
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026). Testserver je Worktree auf eigenem Port.
- Inhalte: `content/projects/<slug>.ts` (Vorlage: lene-fliegt-ins-zirkusland.ts), `content/site.ts` (About), `content/legal.ts`, UI-Texte `i18n/locales/*.json`.
- Skripte: `scripts/make-cover.py`, `scripts/make-placeholder-cover.py`, `scripts/merge-locales.py`.
- Screenshots: Playwright im Scratchpad (`pw/shot.mjs`, `pw/scroll.mjs`, `pw/sheet.py`), Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Lighthouse mit `CHROME_PATH` gesetzt. Build `npm run generate` → `dist/`, Server `python3 -m http.server 4173 --directory dist`.

## Offene Fragen an den User
- keine (D-024).
