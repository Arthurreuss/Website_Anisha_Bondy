# Vorlage: Briefing für Sub-Agenten

Der Orchestrator füllt diese Vorlage aus und übergibt sie als Prompt. Der Agent startet ohne Vorwissen – alles Nötige muss drinstehen oder verlinkt sein.

```
Du arbeitest am Repo Website_Anisha_Bondy (Nuxt 3 Portfolio). Paket: <ID> – <Name>.

Lies zuerst:
- CLAUDE.md (Regeln)
- docs/analyse-referenz-brandonyasin.md §<Abschnitte> (Spezifikation)
- docs/DECISIONS.md (verbindliche Entscheidungen)

Aufgabe:
<konkret, was zu bauen ist>

Abnahmekriterien (aus docs/PLAN.md):
<kopiert aus PLAN.md>

Grenzen:
- Ändere NICHT docs/STATUS.md, docs/PLAN.md, docs/DECISIONS.md.
- Nur Dateien im Scope dieses Pakets anfassen: <Pfade>.
- Keine Assets/Code/Texte/Fonts der Referenzseite übernehmen.
- Vor Abschluss: <Prüfbefehle, z. B. npm run build / lint> müssen fehlerfrei laufen.
- Committe mit aussagekräftiger Nachricht auf deinem Branch/Worktree. Nicht pushen, außer ausdrücklich angegeben.

Abschlussbericht (genau diese Punkte):
1. Erledigt: welche Kriterien erfüllt (je ✅/❌)
2. Geänderte/neue Dateien
3. Abweichungen von der Spezifikation + Grund (→ Orchestrator trägt ggf. in DECISIONS ein)
4. Offene Punkte / Risiken
5. Commit-Hash
```

## Checkliste für den Orchestrator nach Rückmeldung

1. Diff reviewen, Prüfbefehle selbst laufen lassen.
2. In den Haupt-Branch mergen.
3. `PLAN.md` Status + `STATUS.md` aktualisieren, Abweichungen in `DECISIONS.md` – im selben Commit.
4. `bash scripts/check-state.sh` → muss OK melden. Dann pushen.
