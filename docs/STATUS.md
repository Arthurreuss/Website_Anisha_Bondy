# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-25
**Phase:** 1 – Bau mit Platzhaltern (D-008) **abgeschlossen**: P1–P9, P11 ✅, P10 ⏸ (Extras).

## Aktiv
- nichts – wartet auf Phase-2-Planung mit dem User.

## Laufende Agenten
- keine.

## Nächster Schritt
1. Phase 2 mit dem User planen: echte Inhalte (Projekte, Texte, Bilder/Videos), Content-Modell (D-009: nur `loadProjects()` ersetzen, evtl. @nuxt/content), Seiten /about + /archive (D-011), Sprache (D-016).
2. Optional: P10-Extras (Tageszeit-Theme, Uhr, Menü-Vorschau) – nur auf Wunsch.
3. Nach echten Inhalten: Lighthouse mobil auf Netlify neu messen (D-016).

## Bekannte Kleinigkeiten
- Zurück zur Startseite: Galerie startet bei Position 0 (D-015).
- Zeilen-Split nur reiner Text (D-013).

## Hilfsmittel
- Screenshots/Tests: Playwright-Skripte im Scratchpad (`pw/*.mjs`, `pw/sheet.mjs` für Kontaktbögen), Lighthouse in `scratchpad/lh`. Build: `npm run generate` → `dist/`; statischer Server `python3 -m http.server 4173 --directory dist`. Nie `generate` bei laufendem Dev-Server.

## Offene Fragen an den User
- Phase 2: Fragenkatalog + Foto-Auftragsliste + Domain/Impressum an Anisha → `docs/anfrage-anisha.md` (wartet auf Antworten).

## Danach (Phase 2)
- siehe Nächster Schritt 1.
