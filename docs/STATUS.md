# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 1 – Bau mit Platzhaltern (D-008). P1–P7 ✅.

## Aktiv
- P9 Scroll-Reveals + Hover-Rolls → Sonnet-Agent im Worktree
- P8 Seitenübergang → Orchestrator selbst

## Laufende Agenten
- Sonnet „P9 Reveals“ (eigener Worktree, committet dort, pusht nicht). Bei Abbruch: `git worktree list`, Branches prüfen, Ergebnis reviewen oder Paket neu vergeben.

## Nächster Schritt
1. P9-Ergebnis reviewen und mergen (GalleryCard: `.gallery-item__name-wrapper > *` muss für das Intro erhalten bleiben).
2. P8 (Übergang Karte → Hero, Hero-Container `.case-hero-media[data-slug]`), danach P11 QA.

## Bekannte Kleinigkeiten
- Header-Text über hellen/dunklen Bildern ohne Kontrastlösung (evtl. mix-blend-mode, in P11 prüfen).
- Favicon fehlt (404) → P11.

## Hilfsmittel
- Screenshots: Playwright-Skripte im Scratchpad (`pw/shot.mjs`, `pw/probe*.mjs`); Build prüfen mit `npm run generate` + statischem Server auf `.output/public` (Port 4173). Nie `generate` bei laufendem Dev-Server.

## Offene Fragen an den User
- keine (Schrift: Inter, D-007 · Inhalte: Platzhalter, D-008)

## Danach (Phase 2)
- Echte Inhalte von Anisha einplanen → Content-Modell ersetzen (D-008, D-009); Seiten /about, /archive (D-011).
