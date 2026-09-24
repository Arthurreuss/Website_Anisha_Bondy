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

## D-009 · 2026-09-24 · Datenvertrag für Projekte, P3 als Stub
Typen in `types/project.ts`, Zugriff nur über `composables/useProjects.ts` (`useProjects()`, `useProject(slug)` → `{ project, next }`), Quelle austauschbar in `utils/projects-source.ts`. P3 ist mit einem Platzhalter-Stub erledigt (6 Projekte, SVG-Bilder, 2 WebM-Video-Cover in `public/placeholders/`). Das echte Content-Modell (z. B. @nuxt/content) kommt in Phase 2 und ersetzt nur `loadProjects()`.
Grund: Galerie, Detailseite und Übergang können parallel gegen einen festen Vertrag gebaut werden; Content-Struktur wird laut D-008 ohnehin neu geplant.

## D-010 · 2026-09-24 · Setup-Details aus P1/P2 übernommen
- Global per `additionalData` nur `_breakpoints.scss` (Mixins); `_tokens.scss` einmal über `main.scss`, `fluid()` per `@use "~/assets/styles/tokens" as *` bei Bedarf.
- `typescript` auf ^5.7 gepinnt (vue-tsc 2 ist mit TS 7 inkompatibel).
- Inter-Gewicht 300 statt 251. Typo-Größensprung am Breakpoint `tablet-up`.
Grund: Review des Sub-Agenten-Ergebnisses, technisch begründet.

## D-011 · 2026-09-24 · Merge P4/P5/P7: Abweichungen übernommen
- `/about` und `/archive` sind im Menü verlinkt, aber noch nicht gebaut → in `nitro.prerender.ignore` statt `failOnError: false` (echte Fehler sollen den Build weiter brechen). Seiten folgen in Phase 2.
- Hover-Roll als CSS-Transform in `components/ui/RollText.vue` (statt GSAP); Eltern-Trigger per Klasse `.roll-trigger` in einem unscoped Style-Block (`:global()` im scoped Block verschiebt sonst das Elternelement).
- Send-Button im Kontakt-Overlay nutzt `.font-body-40-100`.
- Galerie-Bilder der Detailseite bleiben `loading="lazy"`; Lücken in Full-Page-Screenshots sind nur Messartefakt.
Grund: Review der Sub-Agenten-Ergebnisse und eigene Prüfung per Playwright.

## D-012 · 2026-09-24 · Intro (P6): Auslöser und FOUC-Schutz
- Intro läuft nur, wenn die Startseite Teil der ersten Hydration ist (`nuxtApp.isHydrating`) – nicht bei Client-Navigation zurück zur Startseite, nicht bei reduced-motion.
- Gegen Aufblitzen der fertigen Reihe setzt ein Inline-Skript im `<head>` `html.is-intro` (Galerie `visibility:hidden`), Fallback-Timeout 8 s ohne JS.
- Intro animiert `.gallery-item__stage` (x/y/scale), `.gallery-item__img` (clip-path), `.gallery-item__media` (Zoom 1.3→1.15) und das Kind von `.gallery-item__name-wrapper`; der Slider besitzt weiterhin `x` auf `.gallery-item` und `scale` auf `__wrapper` – keine Überschneidung.
Grund: SSG liefert die fertige Reihe aus; ohne Klasse vor dem ersten Paint gäbe es einen sichtbaren Sprung.

## D-013 · 2026-09-24 · Merge P9 (Reveals): Abweichungen übernommen
- `CaseMedia` hat Opt-in-Prop `parallax` (Medium mit 6 % Überhang, absolut positioniert), damit gescrubbte Parallaxe keine Ränder zeigt; Galerie-Container dafür `position: relative`.
- Kein Reveal auf Hero-Bild und Meta-Zeilen (Hero-Bild ist Ziel des Seitenübergangs P8).
- Fix im Review: Masken-Reveals triggern auf der Maske (Elternelement), nicht auf dem bereits verschobenen Element – sonst blieb der Hero-Titel unten im Viewport unsichtbar.
- Zeilen-Split nur für reinen Text; bei Inline-Markup in echten Inhalten (Phase 2) erweitern.
Grund: Review des Sub-Agenten-Ergebnisses und Browser-Prüfung.

## D-014 · 2026-09-24 · Netlify: Publish-Verzeichnis `dist`
Auf Netlify wählt Nuxt automatisch das Nitro-Preset `netlify-static`, das nach `dist/` schreibt (nicht `.output/public`) – erster Deploy scheiterte daran. `netlify.toml` publiziert jetzt `dist`; lokal legt `nuxt generate` `dist` als Symlink auf `.output/public` an, beides funktioniert.
Grund: Build-Fehler beim ersten Netlify-Deploy des Users, lokal mit `NETLIFY=true` reproduziert.
