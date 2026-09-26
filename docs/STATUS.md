# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-26 · Lieferung, SEO, Dornröschen-Video live (D-039 – D-042); live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Inhalte aus WeTransfer 25.09.** (D-039): Impressum (AT) + Verantwortliche im Datenschutz + E-Mail im Kontakt eingetragen; Fotos (Cover + Galerie) für Dornröschen, Zauberer von Oz, Lene, pOpera; About-Portrait (Claudia Greco); Vimeo-Video Schneekönigin. Auf `main` und `production` (D-040).
- **P24 QA** (D-037): offen Safari/iPhone + Abnahme User.
- **P25 Hosting** (D-032, D-038, D-040): `anishabondy.com` verbunden und live.
- **SEO** (D-041): Sitemap, robots.txt, canonical mit Domain, og/twitter, JSON-LD – live.
- **Bilder für Kacheln** (D-042): Aufgabe an Anisha ([anfrage-anisha.md](anfrage-anisha.md) §7).

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Live-Seite ansehen (Fotos, Impressum, Kontakt).
2. User: Search Console + Sitemap einreichen (HOSTING §5); Dornröschen-Video auf echtem Gerät prüfen (H.264 spielt im Container-Chromium nicht).
3. Anisha: Fotos/Zeitstempel für die Kachel-Projekte (anfrage §7); Nutzung des Kosky-Probenfotos klären.
4. Nicht ohne Zuruf auf `production` pushen (jeder Push = Deploy). Originale der Lieferung hat der User gesichert.

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
- „offen: …“-Kästen (`showTodos`) sind live sichtbar und werden von Google mitgelesen – ausblenden (`NUXT_PUBLIC_SHOW_TODOS=false`)?
