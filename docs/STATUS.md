# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 2 – echte Inhalte. Phase 1 abgeschlossen (P1–P9, P11 ✅, P10 ⏸).

## Aktiv
- Inhalte gesammelt + Strukturvorschlag: [INHALTE.md](INHALTE.md) (D-017). Wartet auf Freigabe durch User/Anisha.

## Laufende Agenten
- keine.

## Nächster Schritt
1. User klärt die offenen Fragen (INHALTE.md §7) mit Anisha, v. a. Sprache, Bilder/Fotos, Galerie-Auswahl.
2. Danach Pakete P12–P18 (Entwurf in INHALTE.md §6) in PLAN.md übernehmen und starten – zuerst P12 Content-Modell.
3. YAMawards-Ergebnis (29.09.2026) in INHALTE.md §4 nachtragen.

## Bekannte Kleinigkeiten
- Zurück zur Startseite: Galerie startet bei Position 0 (D-015).
- Zeilen-Split nur reiner Text (D-013).

## Hilfsmittel
- Screenshots/Tests: Playwright-Skripte im Scratchpad (`pw/*.mjs`), Lighthouse in `scratchpad/lh`. Build: `npm run generate` → `dist/`; statischer Server `python3 -m http.server 4173 --directory dist`. Nie `generate` bei laufendem Dev-Server.
- Porträt aus Anishas PDF liegt nur im Scratchpad (nicht committet, Credit offen).

## Offene Fragen an den User
- siehe INHALTE.md §7.
