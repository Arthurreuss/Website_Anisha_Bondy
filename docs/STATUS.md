# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 2 – echte Inhalte. Phase 1 abgeschlossen (P1–P9, P11 ✅, P10 ⏸).

## Aktiv
- Phase 2 Umsetzung (D-018, D-019): P12 ✅ → P13–P16 parallel (Sonnet, Worktrees) → P17 QA.

## Laufende Agenten (Sonnet, je eigener Worktree, seit 2026-09-24)
- P13 Projektinhalte · P14 Case-Seite v2 · P15 /about + /archive · P16 Rahmen/Kontakt/Recht.
- Nach Abbruch: Worktrees unter `.claude/worktrees/` prüfen (`git worktree list`), fertige Commits mergen, Rest neu briefen.

## Nächster Schritt
1. P13–P16 reviewen und mergen (Konflikte erwartbar nur in i18n/locales/*.json und nuxt.config.ts).
2. P17, dann User zeigt Anisha den Stand; offene Fragen = UiTodo-Markierungen (INHALTE.md §7).

## Bekannte Kleinigkeiten
- Zurück zur Startseite: Galerie startet bei Position 0 (D-015).
- Zeilen-Split nur reiner Text (D-013).

## Hilfsmittel
- Screenshots/Tests: Playwright-Skripte im Scratchpad (`pw/*.mjs`), Lighthouse in `scratchpad/lh`. Build: `npm run generate` → `dist/`; statischer Server `python3 -m http.server 4173 --directory dist`. Nie `generate` bei laufendem Dev-Server.
- Porträt aus Anishas PDF liegt nur im Scratchpad (nicht committet, Credit offen).

## Offene Fragen an den User
- INHALTE.md §7 (User klärt mit Anisha; bis dahin Platzhalter).
