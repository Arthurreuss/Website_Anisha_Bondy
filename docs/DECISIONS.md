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

## D-020 · 2026-09-24 · Merge P13/P16: Abweichungen übernommen
- Rechtstexte in `content/legal.ts` (`{ en, de }`), i18n nur für kurze UI-Texte – gleiches Muster wie Projekte (D-018).
- Kontakt-„Anliegen“ als Mehrfachauswahl-Chips (Feld `concern[]`), Netlify-Duplikat `public/__forms.html` angepasst.
- Unbekannte Rollen (Schneekönigin, Mitternachtstür) als „Rolle offen“ + Todo; Clip „Eine Frau …“ ohne ID nicht verlinkt, nur Todo.
Grund: Review der Sub-Agenten-Ergebnisse.

## D-021 · 2026-09-24 · Merge P14/P15 + QA (P17)
- Datenschutz-Hinweis im Videoblock einmal pro Block statt unter jedem Video; Verlauf hinter Videotiteln (Lesbarkeit auf hellen Vorschaubildern). „next case“ über i18n (`case.next`).
- GalleryCard ohne Säulen-Punkt: der Übergang (P8) animiert `.gallery-item__name-wrapper > *`, ein weiteres Kind würde mitanimiert.
- „Der Zauberer von Oz“ heißt in beiden Sprachen so (deutschsprachige Produktion, Cover ebenso).
- Archiv sortiert absteigend (Werkverzeichnis), Timeline aufsteigend (Lebenslauf). Offene Punkte der About-Seite als UiTodo-Block am Seitenende.
- Locale-Konflikte beim Mergen löst `scripts/merge-locales.py` (Namespaces je Paket).
- Lighthouse Desktop lokal: Start 98/96/100/91, About 96/96/100/83, Case 98/96/100/83. SEO-Abzug nur hreflang/canonical ohne `baseUrl` (lokal leer, auf Netlify `URL`); color-contrast = bekanntes Header-Falsch-Positiv (D-016).
Grund: Review, Browser-Check EN/DE Desktop + Mobil.

## D-022 · 2026-09-25 · `main` als Produktions-Branch, Formular-Feld `concern`
- `main` angelegt (Stand `claude/laughing-brown-2su69r`) und in Netlify als Production Branch gesetzt; fertige Änderungen gehen nach `main`.
- Netlify-Formular-Duplikat `public/__forms.html`: „Anliegen“ als ein Textfeld `concern` statt Checkboxen `concern[]` – das Overlay sendet die Auswahl kommagetrennt als `concern`, Netlify speichert nur Felder, die im erkannten Formular stehen (korrigiert D-020).
Grund: Entscheidung des Users (Deploy zeigte alten Stand); Review der Formular-Einbindung.

## D-023 · 2026-09-25 · Animationen v2 nach Nutzbarkeitstest
Rückmeldung des Users nach dem ersten Test gegen das Original:
- Intro: Bilder sollen **deckungsgleich** gestapelt liegen, langsam **größer werden**, dann in die Reihe fallen; **Titel erst danach**; insgesamt langsamer.
- Hover auf Karten der Startseite: Karte hebt sich leicht an.
- Klick Karte → Detailseite: langsamer.
- Detailseite → nächstes Projekt: nicht abrupt, sondern Inhalt wird ausradiert, Bild fährt von unten rechts groß nach rechts oben, Titel fährt hoch.
- Detailseite → Startseite (Klick auf den Namen): ähnlich weicher Übergang.
- Menü: langsamer, mit Fenster-Übergang wie im Original (Seiten werden klein und wieder groß).
Umsetzung: Soll-Werte in [animationen-v2.md](animationen-v2.md) (aus dem Original gemessen, kein Code übernommen), Pakete P18–P24. Die Menü-Seitenvorschau aus P10 wandert in P23; Uhr/Tageszeit-Theme bleibt in P10.
Grund: Entscheidung des Users.

## D-024 · 2026-09-25 · Animationen v2: Umfang und Modelle
- Mobil: die kleineren/kürzeren Mobil-Varianten des Originals übernehmen (animationen-v2 jeweils in Klammern).
- Große Seitentitel in den Fenster-Übergängen (P22) und Menü als herausgezoomte Seiten-Fenster, Klick zoomt hinein (P23) – wie im Original.
- Tageszeit-Theme + Uhr (P10) kommen in diese Runde.
- Modelle, um Tokens zu sparen: Sonnet für gut spezifizierte Pakete mit festen Zahlen (P10, P18, P19, P20), Opus nur für neue Übergangs-Architektur (P21, P22, P23) und QA (P24). Opus reviewt jedes Sonnet-Ergebnis im Browser.
Grund: Entscheidung des Users; Soll-Werte liegen seit D-023 fest, dadurch sind P18/P20 keine Forschungsaufgaben mehr.

## D-025 · 2026-09-25 · Große Seitentitel wie im Original
Seitentitel erscheinen im Menü (P23) **und** in den Fenster-Übergängen (P22); im Vollbild rollen sie weg. Vorläufige Wörter: EN „work“ / „archive“ / „about“, DE „Arbeiten“ / „Archiv“ / „Über mich“ (i18n, änderbar). Bestätigt D-024.
Grund: Entscheidung des Users nach Screenshot-Vergleich mit dem Original.

## D-026 · 2026-09-25 · Merge P19 (Hover-Lift) + Worktree-Build
- Hover-Lift als `composables/useHoverLift.ts`: `y` auf `.gallery-item` (Slider-`x` per GSAP, kombiniert) und `.gallery-item__media` (Intro/Übergang animieren dort nur `scale`). `useInfiniteGallery` liefert dafür `onDragStart`, `isEnabled()`, `isDragging()`.
- CaseNext: bisheriger CSS-Hover-Zoom (1.06) läuft jetzt im selben GSAP-Tween (Inline-Transform würde die CSS-Regel sonst aushebeln).
- Sub-Agenten-Worktrees liegen unter `.claude/worktrees/`; Vite findet dort die `tsconfig.json` des Haupt-Checkouts und braucht dessen `.nuxt/` → im Haupt-Checkout einmal `npm ci`.
Grund: Review + Browser-Prüfung (Hover −8/+4 px gemessen, Klick nach Drag navigiert).

## D-027 · 2026-09-25 · Merge P18 (Intro v2)
- Nur die ersten 4 Karten (Mobil ≤767 px: 2) spielen mit; Karten ab Index 4 liegen außerhalb des Viewports und bleiben im Endzustand. Auf Mobil blenden die Karten 2–3 beim Fallen kurz aus.
- Bildwarte bis max. 4 s (vorher 1.5 s), Fallback-Timeout der `is-intro`-Klasse 12 s (vorher 8 s).
- Galerie wird erst mit der Landung (4.53 s nach Start) ziehbar.
Grund: Review + Browser-Prüfung (Desktop 1440×900, Mobil 390×844; Stapel deckungsgleich, keine Titel vor 4.5 s, Endzustand = Ruhezustand, keine Konsolenfehler).

## D-028 · 2026-09-25 · Merge P10 (Tageszeit-Theme + Uhr)
- Stützpunkte nur in `utils/daytime-theme.ts`; ein Head-Skript setzt die Farben vor dem ersten Paint, `useDaytimeTheme` aktualisiert jede Minute.
- Textfarbe in der Dämmerung abweichend von Spezifikation §3: aufgehelltes Gelb `#F4CF6A`, kurze helle Brücke `#F5F3EA`, dann harter Wechsel auf `#111111`. Eine gerade Überblendung hätte fast keinen Kontrast. Kontrast minimal 3.8:1 für ca. 20 min/Tag, sonst ≥ 4.5:1.
- Säulenfarben nachts aufgehellt (`ACCENT_NIGHT`, ≥ 4.5:1 auf `#2C2922`).
- Uhr: 24-h-Zifferblatt (eine Drehung = ein Tag), Rücksprung zur echten Zeit nach 30 s oder per Doppelklick/Esc/Enter; mobil nur das runde Zifferblatt.
- Orchestrator-Nachtrag: Header (weiß + `mix-blend-mode: difference`) war auf mittelgrauem Hintergrund unlesbar → `html.theme-twilight` schaltet ihn dort auf `--color-main`.
- Offen: `--img-over-opacity`/`--bg-brightness` erst in CaseHero/CaseVideoItem angeschlossen (Galerie + CaseNext folgen in P20/P21). Video-Fallback-Fläche nutzt nachts die helle Säulenfarbe (nur ohne Poster sichtbar). `--color-participate` hat tagsüber nur 3.1:1 (bestehend, nur Farbpunkt).
Grund: Review + Browser-Prüfung (03/05:30/06/07/12/18:30/22 Uhr, Desktop + Mobil, keine Konsolenfehler).

## D-029 · 2026-09-25 · Uhr unter „Local Time“ und größer
Das runde Zifferblatt steht unter „Local Time 00:00“ (rechtsbündig) und ist größer, damit man es gut greifen und drehen kann. Ergänzt D-028.
Grund: Entscheidung des Users.

## D-030 · 2026-09-25 · Merge P20 (Karte → Detail v2)
- Phase 2 (Morph) wartet per Promise auf das Ende von Phase 1 (Fallback-Timer 1.77 s, falls der Leave-Hook nie läuft).
- Staffelung nach **sichtbarer** Reihenfolge der Karten (nach `left` sortiert), nicht nach DOM-Index – der Endlos-Slider verschiebt Karten (Orchestrator-Korrektur).
- Alle Karten enden gemeinsam bei 1.27 s: spätere Karten haben kürzere Dauer (mind. 0.2 s). Spezifikation nennt nur Startversätze.
- Nachts leichtes Bild-Overlay (`--img-over-opacity`) jetzt auch auf Galerie- und Next-Case-Bildern (D-028 erledigt).
Grund: Review + Browser-Prüfung (Klick auf 2. Karte: Nachbarn gleichzeitig, weitere Karte später, Morph ab 1.27 s, keine Konsolenfehler).

## D-031 · 2026-09-25 · P22 Seitenübergang „Fenster“
- Ein Hook-Satz für alle Seitenwechsel (`<NuxtPage :transition>` in app.vue) entscheidet je Wechsel: Karten-Klick → P20-Logik, gleiche Seite in anderer Sprache sowie Case → Case → kein Übergang (Case → Case bis P21), alles andere → Fenster.
- Richtung „zurück“ (Fenster kommt von links) = Ziel ist die Startseite; sonst „vorwärts“.
- Abweichung vom Original: Der globale Header bleibt fest über den Fenstern (nicht Teil der Seitenfenster); die Fläche dahinter ist `--color-backdrop` (Theme-Hintergrund mit Dunkel gemischt, folgt damit der Tageszeit).
- Die alte Seite behält im Fenster ihre Scrollposition; Scroll-Reset erst nach dem Übergang.
- Große Seitentitel (`PageTitle.vue`, i18n `pageTitle.*`) nur während des Übergangs sichtbar.
- Startseite merkt sich die Galerie-Position (in Item-Breiten) über Seitenwechsel → erledigt den D-015-Punkt „Galerie startet bei 0“.
Grund: Browser-Prüfung Desktop + Mobil (about ↔ Startseite, gescrollter Case → Startseite, Archiv → Case, Galerie-Position, Karten-Klick, Sprachwechsel; keine Konsolenfehler).

## D-032 · 2026-09-25 · Hosting: Cloudflare Pages, Branch `production`, Formular über Web3Forms (ersetzt D-022 Punkt 1)
- Netlify-Deploy-Credits waren aufgebraucht, weil jeder Push auf `main` einen Produktions-Deploy auslöste. Umzug zu **Cloudflare Pages** (kostenlos, gewerbliche Nutzung erlaubt); Domain-Routing ebenfalls über Cloudflare.
- Neuer Branch **`production`** = Live-Stand. `main` bleibt Arbeitsbranch; `production` wird nur auf Zuruf des Users per Fast-Forward nachgezogen. Netlify zeigt übergangsweise ebenfalls auf `production`.
- Kontaktformular über **Web3Forms** (JSON-POST aus dem Browser, Honeypot `botcheck`); Schlüssel per `NUXT_PUBLIC_WEB3FORMS_KEY` beim Build. `public/__forms.html` entfällt. Datenschutztext (Hosting, Logfiles, Formular) auf Cloudflare/Web3Forms umgestellt.
- `baseUrl` (hreflang/canonical) aus `SITE_URL`, Netlify-`URL` als Rückfall. Cloudflare-Build lokal geprüft (`CF_PAGES=1`: Preset schreibt direkt nach `dist`, erzeugt `_headers`/`_redirects`).
- Einrichtungsschritte in [HOSTING.md](HOSTING.md). Fragenkatalog an Anisha (`anfrage-anisha.md`) aktualisiert und ersetzt INHALTE.md §7.
Grund: Entscheidung des Users.

## D-033 · 2026-09-25 · Netlify aus dem Code, Web3Forms-Schlüssel im Code
- Cloudflare Pages + Web3Forms laufen (User). `netlify.toml` entfernt, `baseUrl` nur noch aus `SITE_URL`; Nachweis von P1 entsprechend auf `.node-version` umgestellt.
- Web3Forms-Schlüssel als Standardwert in `nuxt.config.ts`: Er landet ohnehin im ausgelieferten JavaScript (öffentlich by design), eine Cloudflare-Variable brächte keinen Schutz, nur die Möglichkeit, ihn ohne Code-Änderung zu tauschen (`NUXT_PUBLIC_WEB3FORMS_KEY` überschreibt weiterhin).
- Erste Veröffentlichung nach `production` auf Zuruf des Users.
Grund: Entscheidung des Users.

## D-034 · 2026-09-25 · P21 Übergang „next case“
- Läuft über denselben Dispatcher wie P22 (`useWindowTransition`): Klick auf CaseNext merkt Ziel + Scrollposition, alte Seite wird als Ebene eingefroren, neue liegt darunter mit verborgenen Landeplätzen (`.is-next-entering`).
- Zeiten wie animationen-v2 §4. Ergänzungen: alte Deckebene verschwindet bei 1.4–1.6 s (nach dem „next case“-Roll); Untertitel/Text der neuen Seite blenden zum Schluss ein (0.6 s).
- Titel-Klon übernimmt beim Flug die Breite der Zielspalte, damit er dort umbricht wie am Ziel. Meta-Klon (Säule · Haus) fliegt zur Meta-Spalte und blendet bei der Landung aus, weil die Zielspalte andere Angaben zeigt.
- Mobil: alter Titel rollt nach oben weg, neuer rollt ein; Bild-Flug gleich.
- Keine Video-Zeit-Übergabe: das Next-Vorschaubild ist immer ein Standbild (Poster).
- Browser-Zurück und andere Case → Case-Wechsel ohne Übergang; eine neue Navigation schließt einen laufenden Übergang sofort ab.
- Offen für P24: P20 nutzt als Morph-Ease `0.76, 0, 0.18, 1` statt `0.46, 0, 0.09, 1` (Spezifikation) – prüfen.
Grund: Browser-Prüfung Desktop + Mobil, EN + DE, Zurück mitten im Übergang, Regression P20/P22 (keine Konsolenfehler).

## D-035 · 2026-09-25 · P23 Menü mit Seitenfenstern
- Aktuelle Seite schrumpft wie beim Fenster-Übergang (P22) auf 0.75 und wird zum ersten Fenster links; Vorschauen der anderen Hauptseiten (Work, About, Archive) gleiten rechts daneben herein, versetzt 0.06 s, Ease pageSpread, 1.3 s; auf jedem Fenster rollt der Seitentitel ein.
- Fensterbreite richtet sich nach der Anzahl (3 auf Hauptseiten, 4 auf Case-/Rechtsseiten): 4 % Rand, 2.4 % Abstand; der Schnitt (`--cut`) ergibt sich daraus statt fest 37.4 %.
- „Live-Vorschau“ = leichte Nachbauten der Seiten (`MenuPreview.vue`): Standbilder statt Videos, keine Scroll-Reveals, kein Intro, kein SEO – so keine doppelten Videos/Last. Die aktuelle Seite ist die echte (live).
- Hover: Fenster hebt sich um 12 px (Deutung von „rücken leicht nach“; Originalwert nicht gemessen). Klick: Fenster zoomt auf Vollbild, aktuelle Seite fährt hinaus (×1.15), dann Seitenwechsel ohne weiteren Übergang, Fenster blendet in 0.35 s über der echten Seite aus.
- Schließen (Close, Esc, Klick aufs aktuelle Fenster oder die Fläche): aktuelles Fenster zoomt zurück, Scrollposition bleibt erhalten. Impressum/Datenschutz/Sprache im Menü: Menü sofort weg, dann normaler Übergang.
- Mobil: kleine Fenster in einer Reihe oben (anklickbar, nicht im Tab-Fluss), darunter die großen Textlinks wie bisher.
- Tastatur: Fokus startet auf Close, Tab läuft durch Fenster und Fuß und bleibt im Menü; reduced-motion ohne Animation.
- Nebenbei P22: Seitentitel der alten Seite wird bei gescrollter Seite mitverschoben (war außerhalb des Fensters).
Grund: Browser-Prüfung Desktop (About, Start, Case) + Mobil, Zurück-/Esc-Wechsel, Sprache im Menü, reduced-motion (keine Konsolenfehler).

## D-036 · 2026-09-25 · Veröffentlichen nach P24
- User: P24 (QA) durchführen und danach `main` direkt nach `production` ausrollen (Fast-Forward, ein Deploy).
Grund: Entscheidung des Users.

## D-037 · 2026-09-25 · P24 QA Animationen v2 (Claude-Teil)
- Geprüft (Chromium, Desktop 1440×900, Mobil 390×844 mit Touch, reduced-motion): alle Seiten EN + DE direkt geladen, dazu Intro, Karte → Case, Next Case, Fenster-Übergang, Menü → Seite. Keine Konsolenfehler (außer i.ytimg.com-Zertifikat, nur Testumgebung).
- Bildrate im Headless-Browser: 58.6–60 fps im Mittel in allen Abläufen, höchstens 3 Frames > 33 ms je Ablauf.
- Lighthouse Desktop: Performance 94–97, Barrierefreiheit 96, Best Practices 96–100. SEO 82–91 nur wegen fehlendem `SITE_URL` (hreflang/canonical relativ); mit gesetztem `SITE_URL` SEO 100 → User setzt `SITE_URL` in Cloudflare (HOSTING §1).
- P20-Morph-Ease an die Spezifikation angeglichen (`0.46, 0, 0.09, 1` statt `0.76, 0, 0.18, 1`), erledigt den offenen Punkt aus D-034.
- Offen bis P24 ✅: Safari/iPhone (im Container kein WebKit) und Abnahme durch den User im Browser. Kleinigkeit: Farbkontrast einzelner halbtransparenter Kleintexte (Uhr, Fakten-Liste) – bleibt, Barrierefreiheit trotzdem 96.
Grund: QA-Lauf vor der Veröffentlichung (D-036).


## D-038 · 2026-09-25 · Stand Hosting (Rückmeldung User)
- Erledigt (User): alte GitHub-Branches gelöscht, Netlify-Projekt offline, „Preview branches“ in Cloudflare auf None, Formular live getestet – Mails kommen an.
- Übergangsweise eigene Domain des Users mit Cloudflare verbunden; Anishas Domain folgt später (dann Custom Domain + `SITE_URL` umstellen, HOSTING §3).
Grund: Rückmeldung des Users.

## D-039 · 2026-09-26 · Antworten von Anisha (Domain, E-Mail, Impressum) + Lieferung Fotos
- **Domain `anishabondy.com`** (international). Arthur kauft und verwaltet sie, auch die jährliche Verlängerung; Inhaberin laut Empfehlung Anisha ([anfrage-anisha.md](anfrage-anisha.md) §5). Danach Custom Domain + `SITE_URL` umstellen (HOSTING §3).
- **E-Mail öffentlich und fürs Formular:** anishabondy@gmail.com (Web3Forms-Empfänger stellt der User im Web3Forms-Konto um).
- **Impressum nach österreichischem Recht** (§ 5 ECG, § 25 MedienG): Steuersitz Wien, Anschrift Riemergasse 6/Top 11, 1010 Wien. Diese Adresse steht im Impressum, weil § 5 ECG die geografische Anschrift verlangt; ein Postfach genügt nicht. Kleinunternehmerin, 2026 ohne UID; die UID wird ab 2027 nachgetragen. Die Steuernummer kommt nicht ins Impressum.
- Das Impressum ihres Vaters (arpadbondy.com) dient nur als Vorlage für den Urheberrechts-, Bildnachweis- und Link-Hinweis. Der Teil zu RStV/DE, Cookies und Datenschutz wird nicht übernommen: Diese Seite setzt keine Cookies, und die bestehende Datenschutzerklärung (D-032) ist genauer.
- WeTransfer 25.09.: Fotos zu Dornröschen, Zauberer von Oz, Lene, pOpera; 5 Portraits (Claudia Greco); ein Probenfoto Echnaton/Kosky; Dornröschen-Trailer (.mov); Videolinks, neu davon nur Schneekönigin (vimeo 1136280860); zwei Entwürfe von „Johannes“ = das bekannte Mockup (INHALTE §2).
Grund: Antworten von Anisha, weitergegeben durch den User.

## D-040 · 2026-09-26 · Domain registriert, Lieferung D-039 veröffentlicht
- User: `anishabondy.com` registriert, Web3Forms-Empfänger auf anishabondy@gmail.com umgestellt, Originale der WeTransfer-Lieferung gesichert.
- Arbeitsbranch per Fast-Forward nach `main` und `production` übernommen (ein Deploy) auf Zuruf des Users.
- Offen (User): `anishabondy.com` in Pages als Custom Domain verbinden, `SITE_URL` = `https://anishabondy.com`, dann „Retry deployment“ (HOSTING §1/§3).
Grund: Entscheidung des Users.

## D-041 · 2026-09-26 · SEO-Grundausstattung
- User: SEO nach dem Domain-Umzug fertigstellen.
- `https://anishabondy.com` ist Standard für `baseUrl` (canonical/hreflang, `runtimeConfig.public.siteUrl`); `SITE_URL` überschreibt nur noch. Damit hängt SEO nicht mehr an einer Cloudflare-Variable.
- Beim Vorrendern entstehen `sitemap.xml` (EN + DE mit hreflang-Paaren) und `robots.txt` (`config/seo-files.ts`, Hook `prerender:done`).
- `prerender.autoSubfolderIndex: false`: `about.html` statt `about/index.html`. Cloudflare leitete `/about` auf `/about/` um (307), während canonical `/about` nannte; jetzt 200 ohne Umleitung.
- `usePageSeo` (Titel, Beschreibung ≤ 160 Zeichen, og:*, twitter:card) auf allen Seiten; og:image = `public/og.jpg` (Porträt Claudia Greco, 1200×630), auf Case-Seiten das Cover. `og:locale`/`og:url` aus useLocaleHead. JSON-LD „Person“ auf Start- und About-Seite. Startseiten-Titel/Beschreibung mit Beruf und Wien.
- Nachweis: Lighthouse (Desktop) SEO 100 auf Start, About, Case (vorher 82–91, D-037); Performance 97–99, Barrierefreiheit 96, Best Practices 100. Browser: Karte → Case, Zurück, Payloads ohne 4xx.
- Search Console/Bing: Schritte in HOSTING §5 (User).
Grund: Entscheidung des Users.

## D-042 · 2026-09-26 · Antworten a–e, Dornröschen-Video, Selam-Cover, Bilder für Kacheln
- Antworten von Anisha stehen in anfrage-anisha.md (Kopf). Impressum-Tätigkeit: „Regisseurin, Oper & Musiktheater“.
- pOpera: Die Bildbeschreibungen nennen Anisha auf dem Cover, auf 02a und auf 03. Auf 02b/02c sind nach Abgleich andere Personen zu sehen, dort bleibt der Text neutral.
- **Dornröschen:** Cover = stumme Schleife (10 s ab 0:13 aus der 9:16-Fassung ohne „Willkommen“, 4:5 800×1000, H.264 `cover.mp4` + Standbild `cover-poster.jpg`). Das bisherige Cover-Foto wandert als „Der Hofstaat“ in die Galerie. Credits und Besetzung aus der Schlusstafel übernommen. `<source type>` ergibt sich jetzt aus der Endung (`utils/video-type.ts`), bisher war es fest `video/webm`. og:image auf Case-Seiten mit Video = Standbild.
- Hinweis: Das Chromium im Container spielt kein H.264 ab (Standbild wird korrekt gezeigt). Chrome, Safari, Firefox und Edge spielen es ab; der Nutzer prüft am echten Gerät.
- **Selam Opera!:** vorläufiges Cover aus dem YouTube-Vorschaubild des Pop-Up-Clips AriBiymQ0og (576×720, mehr gibt das Vorschaubild nicht her).
- Andere Kacheln: YouTube blockt Downloads aus dem Container (429). Die Vorschaubilder von Peter Pan und Hänsel & Gretel sind Grafiken und taugen nicht. Deshalb Aufgabe an Anisha, anfrage-anisha §7: zuerst Pressefotos der Häuser, sonst Zeitstempel und Videodatei.
- og:image: Das Porträt (Claudia Greco = Fotografin) zeigt Anisha. Bleibt Standard, bis der User etwas anderes will.
- Ausrollen auf `production` auf Zuruf des Users (inkl. D-041).
Grund: Antworten und Entscheidungen des Users.

## D-043 · 2026-09-26 · Hinweis-Kästen nur für echte offene Punkte (präzisiert D-018)
- User: Die Kästen „offen: …“ bleiben sichtbar, wo wirklich noch etwas fehlt. Was erledigt ist oder was Anisha nicht liefern kann, wird entfernt.
- Entfernt: Selam-Hinweis zum Clip „Eine Frau …“ (nicht in Anishas Link-Liste, also nicht vorhanden) und „Entwurf – vor Livegang rechtlich prüfen“ im Datenschutz (Verantwortliche eingetragen, Seite live; eine rechtliche Prüfung bleibt Anishas Sache, anfrage §6).
- Regel für später: Beantwortete Punkte entfernt, wer die Antwort einbaut, im selben Commit.
Grund: Entscheidung des Users.

## D-044 · 2026-09-26 · Kosky-Probenfoto trotz unbekannter Fotograf:in, Liste an Anisha neu gefasst
- User: Das Probenfoto „Echnaton“ mit Barrie Kosky kommt auf die Seite, auch wenn die Fotograf:in unbekannt ist; das Restrisiko nimmt er in Kauf. Eingebaut auf der About-Seite unter „Zusammengearbeitet mit“ (3:2, Bildunterschrift, ohne Bildnachweis). Ersetzt den Punkt „bis dahin nicht verwenden“ aus D-042.
- „Entwurf“-Hinweis im Datenschutz bleibt entfernt (D-043); die rechtliche Prüfung steht als Aufgabe für Anisha in anfrage-anisha.md §4.
- anfrage-anisha.md neu gefasst: nur noch offene Punkte, gegliedert nach Bildern, Projektangaben, About/Kontakt, Rechtlichem und technischen Anforderungen. Die Abschnittsnummern haben sich geändert (Kachel-Bilder jetzt §1).
- Search Console: Sitemap eingereicht, 38 Seiten erkannt, Status „Gefunden – zurzeit nicht indexiert“ (normal für eine neue Domain).
- Veröffentlichung auf Zuruf des Users.
Grund: Entscheidung des Users.

## D-045 · 2026-09-26 · Flicker Karte → Case behoben, Titelband im Menü
- User meldete ein kurzes Zucken nach dem Klick auf eine Karte, bevor das Bild groß wird. Ursache (Messung je Frame): GSAP rundet `left/top/width/height` standardmäßig auf ganze Pixel (`autoRound`). Der Klon sprang beim Morph-Start von 379.2/420.7 auf 379/421 und wuchs danach in ganzen Pixelschritten. Behoben mit `autoRound: false` im Morph (P20) und im Flug von „next case“ (P21).
- Bei Video-Karten zeigte der geklonte `<video>` beim Laden kurz sein Poster (Sprung zurück zum Standbild). Jetzt liegt das aktuelle Videobild als Canvas über dem Klon, bis dessen Video läuft (spätestens 1,5 s).
- Menü (P23): Die großen Seitentitel lagen ohne Hintergrund auf der Seite im Fenster (auf dem Porträt bei „Über mich“, auf der Filterzeile bei „Archiv“). Jetzt liegt hinter dem Titel ein Band in Hintergrundfarbe von der Fensteroberkante bis kurz unter die Schrift (`.page-title--band`, `--band` 0–1). Es blendet mit dem Titel ein und beim Schließen oder Klick auf ein Fenster wieder aus. Gilt nur im Menü, der Fenster-Übergang (P22) bleibt unverändert.
- Nachweis: Frame-Protokoll des Klons (keine Rundungssprünge mehr), Menü auf About und Case (Desktop), Handy-Menü, Schließen per Esc, Klick auf Fenster bzw. Link. Kein Band bleibt zurück, keine Konsolenfehler.
Grund: Rückmeldung des Users.

## D-046 · 2026-09-26 · Rest-Ruck beim Karten-Klick: Klon wie die Karte aufgebaut
- User: Nach D-045 ist beim Klick noch ein kleiner Ruck zur Seite zu sehen, als werde die Kachel neu geladen.
- Ursache (nachgestellt mit DPR 2 und Scrollwerten auf Bruchteil-Pixeln, wie beim Trackpad): Die Karte ist eine eigene Ebene (`will-change: transform`) und wird per translate verschoben (Galerie x, Hover y). Der Klon lag dagegen nur per left/top im Layout, dadurch zeichnete der Browser ihn anders. Pixel-Abweichung Klon ↔ Karte: 7,1 / 3,9 / 6,2 (bei ganzen Pixeln 0).
- Lösung: Der Klon wird genauso aufgebaut wie die Karte. left/top = Layout-Anteil (Rechteck minus Karten-Verschiebung), transform = Karten-Verschiebung, `will-change: transform`. Im Morph läuft die Verschiebung gleichzeitig auf 0, das Ende liegt wie der Hero im Layout. Abweichung danach 1,7 / 1,6 / 0,8, ganze Pixel 0. Der Rest ist Kantenglättung ohne Versatz (Verschiebungstest: Minimum bei 0 px).
- Verworfen: Galerie und Klon aufs Geräte-Pixelraster runden. Die Abweichung stieg auf bis zu 5,7, weil Bilder bewusst auf Bruchteil-Pixeln gezeichnet werden.
Grund: Rückmeldung des Users.

## D-047 · 2026-09-26 · Web-Recherche Projektangaben, Partner mit Logos, Datenschutz-Antworten
- User: **Showreel gibt es nicht** → Hinweis auf der About-Seite entfernt. **Kosky-Probenfoto:** Fotograf:in gibt es nicht, Bildnachweis bleibt weg (Foto bleibt, D-044).
- User: **Partnerhäuser und Pressezitate dürfen genannt werden.** Partner auf der About-Seite jetzt als Logo-Reihe mit Link zur Website des Hauses (`content/site.ts` → `partners`, Logos in `public/media/partners/`, von den Websites der Häuser, einfarbig per `mask-image`). Ersetzt „nur Namen, keine Logos“ (P15).
- User: **Keine Besucherstatistik.** Kontaktanfragen werden nur im Postfach aufbewahrt – Satz dazu im Datenschutz (Kontaktformular).
- Web-Recherche aller Projektangaben (Quellen: Seiten der Philharmonie Luxembourg, Musikverein-Broschüre 25/26, RSB, Boosey, nmz, theaterkompass, Dossier ensemble unitedberlin, zitty, miz). Neues Feld `dates` (Termine) im Projekt, in den Fakten angezeigt.
  - Premieren: Peter Pan 04.05.2024 · Lene 25.04.2025 · Oz 17.01.2026 Musikverein (UA), 25.01.2026 Luxemburg · Dornröschen 06.03.2026 · pOpera 23.04.2026 · Hänsel und Gretel 20.12.2025 · Nacht vor Weihnachten 23.12.2022 · Vivier 27.02.2018 · Grisey 19.05.2019 · Schneekönigin UA 24.10.2010 · Flucht I 15.09.2019, II 26.01.2020.
  - Credits ergänzt (Dirigat, Ausstattung, Licht, Besetzung) bei Lene, Peter Pan, Dornröschen, pOpera, Hänsel und Gretel, Nacht vor Weihnachten, Grisey, Vivier, Schneekönigin.
  - **Korrekturen:** Schneekönigin = Regie Anisha Bondy (Valtinoni, UA). Flucht: Jurowski nicht belegt, Flucht I dirigierte Stefan Sanderling → Jurowski aus Flucht entfernt. Hänsel und Gretel nur 2025 (nicht 2025/26).
  - Neue Pressezitate: nmz (Schneekönigin), Berliner Morgenpost (Vivier). Tagesspiegel (Weihnachten) bleibt ohne Zitat (Paywall), nur Link.
  - Nicht gefunden → anfrage-anisha §2: VOCES8-Datum, Flucht III, Selam-Clips. Mitternachtstür laut Deutscher Oper am Rhein: Regie Mizgîn Bilmen – Anishas Rolle unklar. Neu gefunden: *Klangstreich*, Theater an der Wien ab 11.10.2026, Regie Anisha Bondy (noch nicht auf der Seite).
Grund: Antworten und Auftrag des Users.

## D-048 · 2026-09-26 · Liste an Anisha auf echte Fragen gekürzt, Veröffentlichung D-047
- User: In anfrage-anisha.md stehen nur noch Fragen, die wir nicht selbst herausfinden konnten; alles Unklare aus der Recherche kommt dorthin (neu: Oz – Text und Puppenspiel, VOCES8 – Rolle Julia Hansen).
- Selbst erledigen statt fragen: Das Ergebnis der YAMawards (29.09.) tragen wir selbst nach. „Der Zauberer von Oz“ bleibt unter „Create“, keine eigene Kategorie „Writing“. Ob „Flucht“ ins Archiv wandert, entscheiden wir, wenn klar ist, ob Bildmaterial kommt.
- D-047 samt Merge von `main` (D-046) per Fast-Forward nach `main` und `production` übernommen (ein Deploy) auf Zuruf des Users.
Grund: Entscheidung des Users.

## D-049 · 2026-09-26 · Antworten von Anisha (WhatsApp) eingebaut
- **Selam Opera!:** Credits in dieser Reihenfolge: Mustafa Akça – Artistic Director; Anisha Bondy – Creative Director & Stage Director (auch Rolle und Bio). Clips „Figaros Waschbar“ (+ Director’s Cut) und „Rusalka im Planetarium“ entfernt, alle übrigen hat Anisha inszeniert. Ergänzt: „Super-Sexy-Operetten-Bingo!“ (SO36, lB0Du1RbrOI) und Dokumentarfilm „Eine Opernreise“ zum Operndolmuş (ne6MrSY6MhM); der BKM-Preis 2017 gehört zum Operndolmuş (Label angepasst). „Ring frei für Helena!“ = Boxclub, war schon drin.
- **Der Zauberer von Oz:** Text von Anisha gemeinsam mit Suse Wächter; die Puppen spielt Suse Wächter (Intro, Credit, Bio).
- **VOCES8:** Julia Hansen hat das Konzept mitentwickelt (so schon eingetragen). Datum weiter offen.
- **Flucht:** Jurowski war nicht beteiligt (bestätigt D-047). Flucht III nur als Aufzeichnung (Anisha war im Mutterschutz – steht nicht auf der Seite). Trailer eingebunden (NUGsQ-HoR54).
- **Die Mitternachtstür:** nicht Anishas Projekt → Projekt und Platzhalter gelöscht.
- **Klangstreich:** aufnehmen → neues Projekt (Archiv, Platzhalter-Cover). Anisha möchte eine Box **„Season 2026/27“ (upcoming)** mit fünf Projekten; Liste folgt von ihr, erst dann bauen.
- **Die Nacht vor Weihnachten:** Trailer (RSB, 0SRwI1FEzZM) eingebunden; Fotos sucht Anisha.
- **„Schauspielbühne“:** gibt es nicht → Hinweis entfernt.
- **Kontakt:** Instagram (@anishabondy) und LinkedIn verlinkt (auch JSON-LD `sameAs`), keine Agentur → Zeile entfernt. Profile per Web-Suche gefunden.
- Veröffentlichung auf `main` und `production` auf Zuruf des Users.
Grund: Antworten von Anisha, weitergegeben durch den User.


## D-050 · 2026-09-26 · Ruck beim Karten-Klick: Galerie beim Klick anhalten
- User: Beim Klick auf eine Kachel rückt sie direkt danach ein Stück nach rechts, erst dann wächst sie.
- Ursache (nachgemessen nach Scrollen per Rad/Trackpad): Die Galerie läuft nach jeder Eingabe per Lerp nach (und verkleinert die Karten je nach Tempo). Beim Klick wird der Klon an der aktuellen Stelle eingefroren, die Galerie gleitet darunter aber weiter nach links, bis die Startseite ~0,1 s später unmountet (Ticker aus, Karten springen auf scale 1). Gemessen: Titel und Nachbarkarten rücken 9,5 px nach links, der Klon bleibt stehen – relativ dazu springt die Kachel nach rechts. D-046 hatte nur den Zustand ohne Nachlauf geprüft.
- Lösung: `useInfiniteGallery().freeze()` – beim Karten-Klick vor dem Klonen: Ziel = aktuelle Position, Ticker-Update aus, Eingaben (Drag, Rad, Nachlauf) gesperrt; beim Unmount bleibt die Skalierung stehen. Nachmessung: Karte, Titel und Klon bleiben pixelgleich bis zum Morph.
Grund: Rückmeldung des Users.
