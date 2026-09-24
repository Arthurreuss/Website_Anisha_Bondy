#!/usr/bin/env bash
# Prüft, ob die Projekt-Doku (docs/STATUS.md, PLAN.md, DECISIONS.md) zum Code passt,
# und gibt danach den aktuellen STATUS aus. Läuft automatisch per SessionStart-Hook.
# Exit-Code 0 immer (der Hook soll die Session nicht blockieren); Ergebnis steht in der Ausgabe.

cd "$(git rev-parse --show-toplevel 2>/dev/null || dirname "$0"/..)" || exit 0

problems=()
hints=()

# 1. Pflichtdateien
for f in CLAUDE.md docs/STATUS.md docs/PLAN.md docs/DECISIONS.md docs/analyse-referenz-brandonyasin.md; do
  [ -f "$f" ] || problems+=("Pflichtdatei fehlt: $f")
done

# 2. Nicht committete Änderungen (Hinweis auf abgebrochene Arbeit)
dirty=$(git status --porcelain 2>/dev/null)
if [ -n "$dirty" ]; then
  hints+=("Nicht committete Änderungen vorhanden – evtl. abgebrochene Arbeit prüfen:")
  while IFS= read -r l; do hints+=("    $l"); done <<< "$(echo "$dirty" | head -15)"
fi

# 3. Code-Commits nach der letzten STATUS-Aktualisierung
code_paths=(. ':(exclude)docs' ':(exclude)CLAUDE.md' ':(exclude)scripts/check-state.sh' ':(exclude).claude')
status_commit=$(git log -1 --format=%H -- docs/STATUS.md 2>/dev/null)
if [ -n "$status_commit" ]; then
  newer=$(git log --format='%h %s' "$status_commit"..HEAD -- "${code_paths[@]}" 2>/dev/null)
  if [ -n "$newer" ]; then
    problems+=("Code-Commits ohne STATUS-Update (STATUS/PLAN abgleichen):")
    while IFS= read -r l; do problems+=("    $l"); done <<< "$newer"
  fi
fi

# 4. PLAN: ✅-Pakete brauchen existierende Nachweise; ⬜/🔄 mit vollständigen Nachweisen = evtl. nicht nachgetragen
if [ -f docs/PLAN.md ]; then
  while IFS='|' read -r _ id name model deps status proof _; do
    id=$(echo "$id" | xargs); status=$(echo "$status" | xargs); proof=$(echo "$proof" | xargs)
    [[ "$id" =~ ^P[0-9]+$ ]] || continue
    [ -z "$proof" ] || [ "$proof" = "–" ] && continue
    missing=0; total=0
    IFS=',' read -ra paths <<< "$proof"
    for p in "${paths[@]}"; do
      p=$(echo "$p" | xargs); total=$((total+1))
      [ -e "$p" ] || missing=$((missing+1))
    done
    if [ "$status" = "✅" ] && [ $missing -gt 0 ]; then
      problems+=("$id ist ✅, aber $missing von $total Nachweis-Dateien fehlen ($proof)")
    elif [[ "$status" =~ ^(⬜|🔄)$ ]] && [ $missing -eq 0 ]; then
      hints+=("$id steht auf $status, alle Nachweise existieren – Status nachtragen oder Abnahme prüfen?")
    fi
  done < docs/PLAN.md
fi

# 5. DECISIONS ist append-only: committete Fassung muss Präfix der aktuellen sein
if git cat-file -e HEAD:docs/DECISIONS.md 2>/dev/null && [ -f docs/DECISIONS.md ]; then
  committed=$(git show HEAD:docs/DECISIONS.md)
  current=$(cat docs/DECISIONS.md)
  [[ "$current" == "$committed"* ]] || problems+=("DECISIONS.md wurde verändert statt nur ergänzt (append-only!)")
fi

# 6. STATUS soll kurz bleiben
if [ -f docs/STATUS.md ]; then
  n=$(wc -l < docs/STATUS.md)
  [ "$n" -gt 60 ] && hints+=("STATUS.md hat $n Zeilen – kürzen (nur Jetzt-Zustand, Historie steht in Git)")
fi

# 7. Aktive Worktrees (laufende/abgebrochene Agenten)
wt=$(git worktree list 2>/dev/null | tail -n +2)
[ -n "$wt" ] && hints+=("Weitere Worktrees (Sub-Agenten?):" "$(echo "$wt" | sed 's/^/    /')")

# Ausgabe
echo "=== Projekt-Zustand ($(git rev-parse --abbrev-ref HEAD 2>/dev/null) @ $(git log -1 --format='%h %s' 2>/dev/null)) ==="
if [ ${#problems[@]} -eq 0 ]; then
  echo "DOKU OK – kein Drift erkannt."
else
  echo "DRIFT – zuerst Doku mit Code abgleichen:"
  printf '  - %s\n' "${problems[@]}"
fi
[ ${#hints[@]} -gt 0 ] && { echo "Hinweise:"; printf '  - %s\n' "${hints[@]}"; }
echo
[ -f docs/STATUS.md ] && cat docs/STATUS.md
exit 0
