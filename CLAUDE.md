# Website Anisha Bondy – Arbeitsregeln für Claude

Portfolio-Website nach dem Vorbild von brandonyasin.com (Startseite mit Projekt-Galerie + Case-Detailseiten).
Stack: Nuxt 3 · TypeScript · SCSS · GSAP · Lenis · Netlify.

## Beim Start / nach Abbruch / nach Autocompact – IMMER zuerst

1. `bash scripts/check-state.sh` ausführen (läuft auch automatisch per SessionStart-Hook).
   Meldet es **DRIFT**, zuerst die Doku mit dem Code abgleichen – erst dann weiterarbeiten.
2. `docs/STATUS.md` lesen → dort steht, was gerade läuft und was als Nächstes kommt.
3. Nur bei Bedarf: `docs/PLAN.md` (Pakete), `docs/DECISIONS.md` (warum), `docs/analyse-referenz-brandonyasin.md` (Spezifikation).

## Dokumente – jedes hat genau EINE Aufgabe

| Datei | Aufgabe | Schreibregel |
|---|---|---|
| `docs/STATUS.md` | **Jetzt-Zustand**: aktives Paket, nächster Schritt, offene Fragen, laufende Agenten | wird **überschrieben**, nie angehängt; max. ~40 Zeilen |
| `docs/PLAN.md` | Arbeitspakete mit Status, Modell, Abnahmekriterien, Nachweis-Dateien | Status-Spalte pflegen; Umfang ändern nur mit Verweis auf eine Entscheidung |
| `docs/DECISIONS.md` | Entscheidungs-Log (warum etwas so ist) | **nur anhängen**; alte Einträge nie ändern, sondern durch neuen Eintrag ersetzen („ersetzt D-003“) |
| `docs/INHALTE.md` | Phase 2: Bestand echter Inhalte (Projekte, Videos, Presse, Quellen) + Strukturvorschlag | Orchestrator pflegt; Entscheidungen daraus nach DECISIONS |
| `docs/analyse-referenz-brandonyasin.md` | Spezifikation der Referenzseite | **eingefroren** – Abweichungen gehören in DECISIONS |
| `docs/animationen-v2.md` | Soll-Werte der überarbeiteten Animationen (P18–P23) | bei Änderung durch User: neue DECISION + Datei anpassen |
| `docs/anfrage-anisha.md` | Fragen- und Lieferliste an Anisha (Fotos, Domain, Impressum; §1–3 teils überholt → INHALTE §7) | bei neuen offenen Punkten ergänzen; Antworten → DECISIONS |
| `docs/agent-briefing.md` | Vorlage für Sub-Agenten-Aufträge | bei Prozessänderung anpassen |

## Anti-Drift-Regeln

1. **Code + Git sind die Wahrheit.** Widerspricht die Doku dem Code, wird die Doku korrigiert (oder eine Entscheidung dokumentiert) – nie umgekehrt stillschweigend.
2. **Keine Information doppelt.** Auf andere Dokumente verlinken statt abschreiben.
3. **Doku im selben Commit wie der Code.** Wer ein Paket abschließt, aktualisiert `PLAN.md` + `STATUS.md` im selben Commit.
4. **Ein Schreiber.** Nur der Orchestrator (Hauptsession) ändert `STATUS.md`, `PLAN.md`, `DECISIONS.md`. Sub-Agenten liefern Code + Abschlussbericht, keine Doku-Änderungen an diesen Dateien.
5. **Paket = abgeschlossen** erst, wenn alle Abnahmekriterien erfüllt sind und die Nachweis-Dateien existieren (prüft `check-state.sh`).
6. **Vor riskanten Schritten** (lange Agenten-Läufe, große Refactorings) STATUS.md committen und pushen, damit ein Abbruch nichts verliert.
7. **Entscheidungen des Users** sofort in `DECISIONS.md` festhalten, bevor weitergearbeitet wird.

## Arbeitsweise

- Orchestrator (Opus): Planung, Review, Browser-Check, schwere Animationen (Slider-Physik, Intro, Seitenübergang).
- Sub-Agenten (Sonnet): klar abgegrenzte Pakete laut `PLAN.md`, Briefing nach `docs/agent-briefing.md`, parallel in eigenen Worktrees.
- Branch: `main` (Netlify-Produktions-Branch, D-022). Commits klein und beschreibend, danach pushen.
- Keine Assets, Texte, Code oder lizenzierten Fonts der Referenzseite übernehmen.
