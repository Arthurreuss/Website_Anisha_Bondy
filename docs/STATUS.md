# STATUS – Jetzt-Zustand

> Wird bei jedem Fortschritt **überschrieben**. Historie steht in Git und DECISIONS.md.

**Stand:** 2026-09-24
**Phase:** 1 – Bau mit Platzhaltern (D-008). P1–P9 ✅ (P10 ⏸).

## Aktiv
- P11 QA → Orchestrator selbst

## Laufende Agenten
- keine. Bei Abbruch: `git worktree list`, Branches prüfen, Ergebnis reviewen oder Paket neu vergeben.

## Nächster Schritt
1. P11 QA: Favicon, Header-Kontrast, reduced-motion-Gesamtcheck, Lighthouse, Konsolenfehler.
2. Danach Phase-2-Planung mit dem User (echte Inhalte). Netlify-Deploy läuft (D-014).

## Bekannte Kleinigkeiten
- Header-Text über hellen/dunklen Bildern ohne Kontrastlösung (evtl. mix-blend-mode, in P11 prüfen).
- Favicon fehlt (404) → P11.

## Hilfsmittel
- Screenshots: Playwright-Skripte im Scratchpad (`pw/shot.mjs`, `pw/probe*.mjs`); Build prüfen mit `npm run generate` + statischem Server auf `.output/public` (Port 4173). Nie `generate` bei laufendem Dev-Server.

## Offene Fragen an den User
- keine offen. Vorschau: Netlify (User hat verbunden, D-014); lokal `npm run dev -- --port 3100`.
- Schrift: Inter, D-007 · Inhalte: Platzhalter, D-008

## Danach (Phase 2)
- Echte Inhalte von Anisha einplanen → Content-Modell ersetzen (D-008, D-009); Seiten /about, /archive (D-011).
