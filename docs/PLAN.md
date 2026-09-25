# Plan – Arbeitspakete

Status: ⬜ offen · 🔄 in Arbeit · 👀 Review · ✅ fertig · ⏸ zurückgestellt
Spezifikation: [analyse-referenz-brandonyasin.md](analyse-referenz-brandonyasin.md) (Abschnittsnummern = §)
Umfangsänderungen nur mit Verweis auf [DECISIONS.md](DECISIONS.md).

<!-- Maschinenlesbar für scripts/check-state.sh: Spalten nicht umordnen.
     Nachweis = kommagetrennte Pfade, die bei ✅ existieren müssen. -->

| ID | Paket | Modell | Hängt ab von | Status | Nachweis |
|---|---|---|---|---|---|
| P1 | Setup: Nuxt 3 + TS + SCSS + GSAP + Lenis, Netlify-Config | Sonnet | – | ✅ | package.json, nuxt.config.ts, netlify.toml |
| P2 | Design-Tokens: Farben, Typo-Klassen, Raster, Breakpoints, vw-Skalierung ab 1438px | Sonnet | P1 | ✅ | assets/styles/_tokens.scss, assets/styles/_typography.scss |
| P3 | Datenvertrag + Platzhalter-Stub (echtes Content-Modell → Phase 2, D-009) | Opus | P1 | ✅ | types/project.ts, composables/useProjects.ts, utils/projects-source.ts, public/placeholders |
| P4 | Layout: Header, Menü-Overlay, Kontakt-Overlay (Basis-Animation), Lenis-Plugin | Sonnet | P2 | ✅ | components/AppHeader.vue, plugins/lenis.client.ts |
| P5 | Startseite: Infinite-Drag-/Wheel-Slider mit Lerp, Inertia, Speed-Scale | **Opus** | P2, P3 | ✅ | composables/useInfiniteGallery.ts, pages/index.vue |
| P6 | Startseite: Intro-Animation (Stapel → Reihe, clip-path) | **Opus** | P5 | ✅ | composables/useGalleryIntro.ts |
| P7 | Detailseite: Hero (sticky links), Galerie-Blöcke, Next Case | Sonnet | P2, P3 | ✅ | pages/cases/[slug].vue |
| P8 | Seitenübergang Karte → Detail-Hero (FLIP-Klon, Video-Sync) | **Opus** | P5, P7 | ✅ | composables/usePageTransition.ts |
| P9 | Scroll-Reveals (Zeilen, Bilder, Parallax) + Hover-Rolls | Sonnet | P4, P7 | ✅ | composables/useReveal.ts |
| P10 | Tageszeit-Theme + ziehbare Local-Time-Uhr ([Spezifikation](analyse-referenz-brandonyasin.md) §3); Menü-Vorschau → P23 (D-023) | Sonnet | P17 | ✅ | utils/daytime-theme.ts, composables/useDaytimeTheme.ts, components/LocalTime.vue |
| P11 | QA: reduced-motion, Mobile, Lighthouse, Deploy | Opus | alle | ✅ | public/favicon.svg |
| P12 | Phase 2 Fundament: i18n EN/DE, Datenmodell v2, Loader, UiTodo, Säulen-Farben | **Opus** | P11 | ✅ | i18n/i18n.config.ts, i18n/locales/en.json, i18n/locales/de.json, components/ui/UiTodo.vue, content/projects/index.ts |
| P13 | Projektinhalte EN/DE + vorläufige Cover | Sonnet | P12 | ✅ | content/projects/selam-opera.ts, content/projects/peter-pan.ts |
| P14 | Case-Seite v2: Video-Block (Klick-zum-Laden), Credits, Presse/Preise, Säulen-Label | Sonnet | P12 | ✅ | components/case/CaseVideo.vue, components/case/CaseFacts.vue |
| P15 | Seiten /about (Bio, Dreisatz, Zitat, Timeline, Presse, Partner) + /archive (Filter nach Säule) | Sonnet | P12 | ✅ | pages/about.vue, pages/archive.vue, content/site.ts |
| P16 | Rahmen: Sprachumschalter, Menü, Kontakt-Overlay neu, Impressum/Datenschutz | Sonnet | P12 | ✅ | components/LangSwitch.vue, pages/imprint.vue, pages/privacy.vue |
| P17 | Phase-2-QA: Merge, Browser-Check EN/DE, Build, Lighthouse, Deploy | **Opus** | P13–P16 | ✅ | – |
| P18 | Intro v2: deckungsgleicher Stapel wächst, Aufdecken, Fallen, Titel erst am Ende ([animationen-v2](animationen-v2.md) §1) | Sonnet | P17 | ✅ | composables/useGalleryIntro.ts |
| P19 | Hover: Karte hebt sich (−8 px), Bild gegenläufig; auch Next-Case-Bild (§2) | Sonnet | P17 | ✅ | composables/useHoverLift.ts |
| P20 | Übergang Karte → Detail v2: zwei Phasen, gestaffelt, ≈ 2.5 s (§3) | Sonnet | P18 | ✅ | composables/usePageTransition.ts |
| P21 | Übergang Case → nächstes Case: Ausradieren, Bild-Flug nach rechts oben, Titel-Flug (§4) | **Opus** | P20 | ⬜ | – |
| P22 | Seitenübergang „Fenster“ inkl. Case → Startseite, große Seitentitel, Richtung vor/zurück (§5) | **Opus** | P20 | ⬜ | – |
| P23 | Menü v2: Seiten als Live-Vorschau-Fenster, Klick zoomt auf Vollbild (§6) | **Opus** | P22 | ⬜ | – |
| P24 | QA Animationen v2: reduced-motion, Mobil, Safari, Lighthouse, Nutzertest | **Opus** | P18–P23 | ⬜ | – |

## Abnahmekriterien

- **P1** `npm run dev` und `npm run generate` laufen fehlerfrei; GSAP-Plugins registriert; Lenis aktiv.
- **P2** Alle Typo-Klassen aus §2 vorhanden; 6/14-Spalten-Raster; Breakpoints ≤767/768/1025/1438 als Mixins; Farben als CSS-Variablen (§3).
- **P3** 6 Platzhalter-Projekte gemäß `types/project.ts` (inkl. 2 Video-Cover), Zugriff nur über `useProjects`/`useProject` (D-009).
- **P4** Header wie §6; Menü und Kontakt öffnen/schließen; Formular-Felder wie §6; Tastatur bedienbar.
- **P5** Endlos-Loop ohne Sprung, Drag + Wheel (Desktop), Nachlauf, Skalierung bei Tempo, Klick nach Drag unterdrückt, 60 fps auf Desktop (§4).
- **P6** Ablauf wie §4 Punkt 2; läuft nur beim ersten Laden; bei reduced-motion übersprungen.
- **P7** Layout wie §5 inkl. Mobile-Variante; Next Case verlinkt zyklisch.
- **P8** Wie §4 „Seitenübergang“; Zurück-Navigation funktioniert; Video läuft ohne Sprung weiter.
- **P9** Wie §5 „Dynamik“; alles aus bei reduced-motion.
- **P12** EN unter `/`, DE unter `/de`; alle internen Links locale-aware; `types/project.ts` v2 (D-018); ein Beispielprojekt lädt in beiden Sprachen; `UiTodo` sichtbar; Build fehlerfrei.
- **P13** Alle ★-Projekte + Archiv-Einträge aus INHALTE.md §3 in EN und DE; Cover nach D-019; Unbekanntes als Todo, nichts erfunden.
- **P14** Video lädt erst nach Klick (youtube-nocookie / Vimeo); Credits, Presse, Preise nur wenn vorhanden; leere Galerie zeigt Todo; Übergang P8 unverändert.
- **P15** Texte aus INHALTE.md §2; Timeline aus Projektdaten; Archiv filterbar nach Direct/Create/Participate; beide Sprachen.
- **P16** Umschalter EN/DE behält aktuelle Seite; Kontaktformular mit Feldern für Anfragen an eine Regisseurin; Impressum/Datenschutz mit Todos; im Footer/Menü verlinkt.
- **P17** Keine Konsolenfehler, alle Seiten beider Sprachen prerendert, Lighthouse Desktop ≥ 90.
- **P10** Farben vor dem ersten Paint nach lokaler Uhrzeit (kein Aufblitzen), Übergänge interpoliert; Uhr im Header ziehbar, Theme wechselt live; Säulenfarben und Bilder bei Nacht lesbar; reduced-motion ohne Animation.
- **P18** Ablauf und Zeiten wie animationen-v2 §1 (±10 %); keine Titel vor 4.5 s; Karten im Stapel deckungsgleich; nur erstes Laden; reduced-motion überspringt.
- **P19** Nur Desktop (Maus); zurück beim Verlassen; kein Konflikt mit Drag-Skalierung und Klick-Übergang.
- **P20** Zwei Phasen wie §3; Video ohne Sprung; Strg/Cmd-Klick und Klick nach Drag ohne Übergang (D-015 bleibt).
- **P21** Ablauf wie §4 Desktop + Mobil; Browser-Zurück funktioniert; Video-Zeit übernommen.
- **P22** Wie §5 für alle übrigen Wechsel; Richtung stimmt; Galerie-Position beim Zurück zur Startseite bleibt erhalten (löst D-015-Punkt).
- **P23** Wie §6; Tastatur bedienbar (Esc, Tab); Vorschauen ohne doppelte Videos/Last; Mobil-Variante.
- **P24** Keine Konsolenfehler, 60 fps Desktop, Lighthouse Desktop ≥ 90, User-Abnahme im Browser.
- **P11** Keine Konsolenfehler; Lighthouse Performance ≥ 90 (Desktop); deployt.
