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
