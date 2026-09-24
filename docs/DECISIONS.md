# Entscheidungs-Log

Nur anhängen. Einträge nie ändern – bei Änderung neuen Eintrag mit „ersetzt D-xxx“ anlegen.
Format: `## D-NNN · JJJJ-MM-TT · Titel` · Entscheidung · Grund · (optional) ersetzt/ersetzt durch.

## D-001 · 2026-09-24 · Referenz und Umfang
Nachbau von Stil und Struktur von brandonyasin.com, Fokus Startseite (Projekt-Galerie) und Case-Detailseiten.
Keine Übernahme von Code, Assets, Texten oder lizenzierten Fonts der Referenz.
Grund: Wunsch des Users; rechtlich sauber.

## D-002 · 2026-09-24 · Tech-Stack
Nuxt 3 + TypeScript + SCSS, GSAP (ScrollTrigger, Observer, CustomEase, Flip), Lenis, Hosting Netlify, statisch via `nuxt generate`.
Grund: identisch zur Referenz (siehe Analyse §1); SPA-Router erleichtert den Karte→Hero-Übergang.

## D-003 · 2026-09-24 · Inhalte als Markdown
Projekte liegen als Markdown/YAML im Repo (`content/projects`), kein externes CMS.
Grund: einfach, versioniert, ausreichend für ein Portfolio.

## D-004 · 2026-09-24 · Modell-Aufteilung und Orchestrierung
Hauptsession (Opus) orchestriert, reviewt und baut P5, P6, P8 selbst. Standard-Pakete gehen an Sonnet-Sub-Agenten, parallel in eigenen Git-Worktrees.
Grund: Token sparen; die schweren Animationen brauchen das stärkere Modell.

## D-005 · 2026-09-24 · Doku-System gegen Drift
STATUS (überschreiben) / PLAN (Status-Spalte) / DECISIONS (append-only) / Analyse (eingefroren), ein Schreiber, Doku im selben Commit wie Code, automatische Prüfung per `scripts/check-state.sh` + SessionStart-Hook.
Grund: Wunsch des Users; Session-Abbrüche und Autocompact dürfen keinen Kontext kosten.

## D-006 · 2026-09-24 · Schrift vorläufig: Inter
Bis zur Entscheidung des Users über eine Lizenz für Neue Haas Unica / Helvetica Now wird **Inter** (frei) verwendet. Schrift ist zentral in `_typography.scss` austauschbar.
Grund: User hat Lizenzfrage noch nicht beantwortet; Arbeit soll nicht blockieren.

## D-007 · 2026-09-24 · Freie Schrift festgelegt (ersetzt D-006)
Es bleibt bei einer freien Schrift: **Inter** (self-hosted via @fontsource-variable/inter). Keine Lizenz für Neue Haas Unica / Helvetica Now.
Grund: Entscheidung des Users.

## D-008 · 2026-09-24 · Erst komplett mit Platzhaltern bauen
Alle Pakete werden mit Platzhalter-Inhalten (Bilder, Videos, Texte, Projekte) fertiggestellt. Echte Inhalte von Anisha kommen in einem zweiten Schritt; dafür wird vorher neu geplant und das Content-Modell (P3) bei Bedarf angepasst.
Grund: Entscheidung des Users; Inhalte liegen noch nicht vor.
