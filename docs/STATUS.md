# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-25 · Umzug zu Cloudflare Pages läuft (P25, D-032); live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte, **erster Draft fertig** (P12–P17 ✅, D-018–D-021). Phase 1: P1–P9, P11 ✅, P10 ⏸.

## Aktiv
- **P25 Hosting-Umzug** (D-032): Cloudflare Pages + Web3Forms laufen (User), `production` angelegt, Web3Forms-Key im Code. Offen: Testanfrage über die Live-Seite, `SITE_URL`, Domain, Netlify abschalten ([HOSTING.md](HOSTING.md)).
- Animationen v2 + Tageszeit-Theme (D-023–D-025, Uhr-Layout D-029), Spezifikation [animationen-v2.md](animationen-v2.md). **Welle 1 fertig** (P18, P19, P10 ✅), P20 + P22 ✅ (D-030, D-031).

## Laufende Agenten
- keine.

## Nächster Schritt
1. Opus P21 (Case → nächster Case, §4) → P23 (Menü mit Seitenfenstern, §6; nutzt PageTitle + Fenster-Geometrie aus useWindowTransition) → P24 QA.
2. Nebenher: Antworten von Anisha ([anfrage-anisha.md](anfrage-anisha.md)), echte Fotos, YAMawards 29.09., Impressum/Datenschutz.
3. User: veröffentlichen (Key im Code) → Testanfrage übers Formular; `SITE_URL` setzen; Domain (HOSTING §3); Netlify-Seite löschen.
4. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy).

## Bekannte Kleinigkeiten
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026). Testserver je Worktree auf eigenem Port.
- Inhalte: `content/projects/<slug>.ts` (Vorlage: lene-fliegt-ins-zirkusland.ts), `content/site.ts` (About), `content/legal.ts`, UI-Texte `i18n/locales/*.json`.
- Skripte: `scripts/make-cover.py`, `scripts/make-placeholder-cover.py`, `scripts/merge-locales.py`.
- Screenshots: Playwright im Scratchpad (`pw/shot.mjs`, `pw/scroll.mjs`, `pw/sheet.py`), Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Lighthouse mit `CHROME_PATH` gesetzt. Build `npm run generate` → `dist/` (Symlink; nach einem `CF_PAGES=1`-Build ist `dist` ein echter Ordner → vorher löschen), Server `python3 -m http.server 4173 --directory dist`.

## Offene Fragen an den User
- keine (D-024).
