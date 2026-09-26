# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-26 · Lieferung von Anisha eingebaut (D-039); live = Branch `production`, `main` = Arbeitsstand
**Phase:** 2 – echte Inhalte. Phase 1: P1–P9, P11 ✅, P10 ⏸. Animationen v2 P18–P23 ✅.

## Aktiv
- **Inhalte aus WeTransfer 25.09.** (D-039): Impressum (AT) + Verantwortliche im Datenschutz + E-Mail im Kontakt eingetragen; Fotos (Cover + Galerie) für Dornröschen, Zauberer von Oz, Lene, pOpera; About-Portrait (Claudia Greco); Vimeo-Video Schneekönigin. Arbeitsbranch `claude/compassionate-gauss-8kvhuf`, noch nicht auf `main`/`production`.
- **P24 QA** (D-037): offen Safari/iPhone + Abnahme User.
- **P25 Hosting** (D-032, D-038): Domain `anishabondy.com` kaufen (User, D-039), dann Custom Domain + `SITE_URL` (HOSTING §3).

## Laufende Agenten
- keine.

## Nächster Schritt
1. User: Branch prüfen → nach `main` übernehmen; `production` nur auf Zuruf.
2. User: `anishabondy.com` registrieren (Inhaberin Anisha), Web3Forms-Empfänger auf anishabondy@gmail.com.
3. Anisha: neue offene Punkte a–e in [anfrage-anisha.md](anfrage-anisha.md) (Oz-Fotos groß, Kosky-Foto, Trailer, Tätigkeit, Personen auf pOpera-Fotos).
4. Offen im Material: Rohdateien liegen nur im Scratchpad der Session, WeTransfer läuft am 29.09. ab.

## Bekannte Kleinigkeiten
- Zeilen-Split nur reiner Text (D-013).
- Video-Vorschaubilder (i.ytimg.com) im Container-Headless-Browser wegen Proxy-Zertifikat nicht sichtbar – nur Testumgebung.
- Farbkontrast halbtransparenter Kleintexte (D-037).

## Hilfsmittel
- Worktrees unter `.claude/worktrees/` brauchen `.nuxt/` im Haupt-Checkout (`npm ci` dort), sonst TSCONFIG_ERROR (D-026).
- Inhalte: `content/projects/<slug>.ts`, `content/site.ts` (About), `content/legal.ts` (Impressum, Datenschutz, `contactEmail`), UI-Texte `i18n/locales/*.json`.
- Fotos: `scripts/make-media.py` (Zuschnitt 4:5 / 16:10, Verkleinern); ältere: `make-cover.py`, `make-placeholder-cover.py`, `merge-locales.py`.
- Build `npm run generate` → `.output/public` (mit `CF_PAGES=1` → `dist`), Server `python3 -m http.server 4193 --directory .output/public`. Playwright global unter `/opt/node22/lib/node_modules` (im Skriptordner verlinken).

## Offene Fragen an den User
- Abnahme P24; Übernahme des Branches nach `main`.
