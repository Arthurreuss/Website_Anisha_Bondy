# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 1 – Bau mit Platzhaltern (D-008). P1, P2, P3 ✅.

## Aktiv
- P4 Layout (Header, Menü, Kontakt, Lenis) → Sonnet-Agent im Worktree
- P7 Detailseite → Sonnet-Agent im Worktree
- P5 Infinite-Slider Startseite → Orchestrator selbst (Haupt-Worktree)

## Laufende Agenten
- Sonnet „P4 Layout“ und Sonnet „P7 Detailseite“, jeweils eigener Worktree, committen dort, pushen nicht.
  Bei Abbruch: `git worktree list`, Branches prüfen, Ergebnis reviewen oder Paket neu vergeben.

## Nächster Schritt
1. P5 bauen, parallel Agenten-Ergebnisse reviewen und mergen (Checkliste in agent-briefing.md).
2. Danach P6 (Intro) + P9 (Reveals, Sonnet), dann P8 (Übergang).

## Hilfsmittel
- Screenshots: Playwright-Skripte im Scratchpad (`pw/shot.mjs`); Build prüfen mit `npm run generate` + statischem Server auf `.output/public`.

## Offene Fragen an den User
- keine (Schrift: Inter, D-007 · Inhalte: Platzhalter, D-008)

## Danach (Phase 2)
- Echte Inhalte von Anisha einplanen → Content-Modell ersetzen (D-008, D-009).
