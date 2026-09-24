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

## D-015 · 2026-09-24 · Seitenübergang (P8): Mechanik
- Globale `app.pageTransition` `{ mode: 'default', css: false }` (sofortiger Wechsel), damit immer ein `<Transition>`-Wrapper existiert. Die **verlassende** Seite trägt die Leave-Hooks (Vue bindet sie beim Rendern der alten Seite): `pages/index.vue` → `leavePage()`.
- Klick auf Karte: Klon von `.gallery-item__img` als `position: fixed` über `body` (z-index 90, unter dem Header); Video im Klon ab gleicher `currentTime`. Startseite bleibt während des Leave als fixierte Ebene stehen (andere Karten scale .7, Medien 1.4, clip-path nach oben, Namen fallen), neue Seite rendert darunter.
- `useHeroTransition()` im Hero misst `.case-hero-media` und morpht den Klon (1.26 s, eigene Ease „cardMorph“); am Ende Hero-Video auf Klon-Zeit setzen, erst nach `seeked` tauschen.
- Nicht bei reduced-motion, Strg/Cmd-Klick oder Klick nach Drag. Zurück zur Startseite: Galerie startet wieder bei Position 0 (Position merken → evtl. P11/Phase 2).
Grund: Vue/Nuxt-Suspense bindet Leave-Hooks an die alte Seite (im Browser nachgewiesen); Klon statt Verschieben des Original-Videos, weil Vue das Original beim Unmount entfernt.

## D-016 · 2026-09-24 · QA (P11): Ergebnisse und bewusst offene Punkte
- Lighthouse Desktop (lokal, unkomprimiert): Start 99/96/100/100, Case 99/95/100/100 (Perf/A11y/BP/SEO). Mobil Perf 81 lokal – Hauptanteil unkomprimiertes JS (360 KB) auf dem Testserver; Netlify liefert komprimiert. Erneut mit echten Inhalten messen (Phase 2).
- Header: `color:#fff; mix-blend-mode:difference` für Lesbarkeit über Bildern. Lighthouse meldet dafür color-contrast (4 Elemente) – falsch positiv, da Blend-Modes nicht berücksichtigt werden; gerendert dunkel auf hell.
- `<html lang="en">` (Platzhaltertexte englisch; bei deutschen Inhalten in Phase 2 anpassen), Meta-Description je Case aus erstem Intro-Absatz, SVG-Favicon (Monogramm, Platzhalter).
Grund: Abnahme P11; Kriterium Desktop ≥ 90 erfüllt, Deploy läuft (D-014).

## D-017 · 2026-09-24 · Phase 2: Vorgaben des Users zu den Inhalten
- Der Dreisatz **Direct / Create / Participate** ist der rote Faden der Seite (jedes Projekt einer Säule zugeordnet).
- Texte aus Anishas Mockup gelten, **außer Journal**; die Bilder im Mockup sind Stock und werden nicht verwendet. Die Timeline wird als Lebenslauf genutzt.
- Die Pop-Up-Opera-Videos (Selam Opera!) werden zu **einem** Projekt zusammengefasst, nicht als einzelne Projekte.
- Bestand und Strukturvorschlag in [INHALTE.md](INHALTE.md); Pakete erst nach Freigabe in PLAN.md.
Grund: Entscheidung des Users beim Start von Phase 2.

## D-018 · 2026-09-24 · Phase 2: Sprache, Platzhalter, Datenformat
- **Zweisprachig EN + DE** (Entscheidung des Users). `@nuxtjs/i18n`, Strategie `prefix_except_default`: EN unter `/`, DE unter `/de/…`. Ersetzt den Hinweis zu `lang` in D-016.
- **Offene Fragen (INHALTE.md §7) werden nicht blockierend behandelt:** sichtbare Platzhalter über eine Komponente `UiTodo` (gestrichelt, Text „offen: …“), damit User und Anisha beim Durchgehen sehen, was fehlt. Iterativ ersetzen.
- **Datenformat:** eine TypeScript-Datei je Projekt in `content/projects/` mit Feldern `{ en, de }` für Texte (typsicher, keine zusätzliche Abhängigkeit) – statt @nuxt/content. Zugriff weiter nur über `useProjects()` (D-009).
- **Vorläufige Bilder:** YouTube-Vorschaubilder der offiziellen Videos als Cover (auf 4:5 beschnitten) + die vorhandenen Fotos; werden durch freigegebene Pressefotos ersetzt. Seite ist nur Entwurf zum Vorzeigen.
- Galerie der Startseite = die ★-Projekte aus INHALTE.md §3.
Grund: Entscheidung des Users („EN + DE, für offene Fragen Platzhalter, Rest schon einbauen, dann iterieren“).

## D-019 · 2026-09-24 · Vorläufige Cover: typografisch statt Fremdbilder (ersetzt D-018 Punkt „Vorläufige Bilder“)
- YouTube-Vorschaubilder taugen nicht als Cover (Schrift-Overlays), Standbilder lassen sich im Container nicht aus den Videos ziehen, und Pressebilder von den Seiten der Häuser werden ohne Freigabe nicht kopiert.
- Stattdessen: **typografische Cover** in der Säulenfarbe (`scripts/make-placeholder-cover.py` → `public/media/<slug>/cover.svg`) + die vorhandenen Fotos (Lene, pOpera, Porträt; `scripts/make-cover.py`). YouTube-Thumbnails nur als Vorschaubild im Klick-zum-Laden-Videoblock (P14).
- i18n-Dateien liegen nach Modul-Standard unter `i18n/` (`i18n/i18n.config.ts`, `i18n/locales/*.json`).
- `useProjects()` liefert nur Galerie-Projekte (`featured`), `useAllProjects()` alle; `project.client`/`category` → `venue`/`pillar` (Label über `$t('pillar.*')`).
Grund: Umsetzung P12, Rechte und Bildqualität.
