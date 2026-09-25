# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-25 · Animationen v2 fertig und veröffentlicht (D-036); live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte, **erster Draft fertig** (P12–P17 ✅, D-018–D-021). Phase 1: P1–P9, P11 ✅, P10 ⏸.

## Aktiv
- **P24 QA** (D-037): Claude-Teil erledigt (Konsole, fps, Lighthouse, reduced-motion, Mobil). Offen: Safari/iPhone und Abnahme durch den User.
- **P25 Hosting-Umzug** (D-032, D-033, D-038): Cloudflare Pages, Formular (Mails kommen an), Preview-Branches aus, Netlify offline, Übergangs-Domain des Users verbunden. Offen: `SITE_URL` auf die aktuelle Domain setzen (SEO, D-037); später Anishas Domain ([HOSTING.md](HOSTING.md) §3).
- Animationen v2 ([animationen-v2.md](animationen-v2.md)): P18–P23 ✅ (D-030, D-031, D-034, D-035).

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Seite auf iPhone/Safari und am Rechner durchklicken → Rückmeldung → P24 ✅.
2. User: `SITE_URL` = Übergangs-Domain setzen + „Retry deployment“; später Anishas Domain (HOSTING §3).
3. Anisha: Antworten aus [anfrage-anisha.md](anfrage-anisha.md) (E-Mail fürs Formular, Fotos, Texte, Impressum/Datenschutz), YAMawards 29.09.
4. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy).

## Bekannte Kleinigkeiten
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.
- Farbkontrast halbtransparenter Kleintexte (D-037).

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026). Testserver je Worktree auf eigenem Port.
- Inhalte: `content/projects/<slug>.ts` (Vorlage: lene-fliegt-ins-zirkusland.ts), `content/site.ts` (About), `content/legal.ts`, UI-Texte `i18n/locales/*.json`.
- Skripte: `scripts/make-cover.py`, `scripts/make-placeholder-cover.py`, `scripts/merge-locales.py`.
- Screenshots/QA: Playwright im Scratchpad (`pw/qa.mjs` Rundlauf, `pw/menu.mjs`, `pw/sheet.mjs`), Chromium `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Lighthouse per `npx lighthouse` mit `CHROME_PATH`. Build `npm run generate` → `dist/` (nach `CF_PAGES=1`-Build vorher `dist` löschen), Server `python3 -m http.server 4193 --directory dist`.

## Offene Fragen an den User
- Abnahme P24 (s. o.).
