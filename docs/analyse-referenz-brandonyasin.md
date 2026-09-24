# Analyse der Referenz-Website: brandonyasin.com

Stand: 24.09.2026. Grundlage sind das ausgelieferte HTML, CSS und JavaScript der Startseite (`/`) und einer Case-Seite (`/cases/louis-vuitton`). Werte in `rem` beziehen sich auf `html { font-size: 10px }`, also `1.6rem = 16px`.

---

## 1. Tech-Stack (nachgewiesen)

| Bereich | Referenz nutzt | Nachweis |
|---|---|---|
| Framework | **Nuxt 3 (Vue 3)**, statisch generiert (SSG) | `/_nuxt/`-Assets, `x-powered-by: Nuxt`, `window.__NUXT__`, scoped Styles (`data-v-…`) |
| Build | Vite (Nuxt-Standard) | gehashte Chunks, `modulepreload` |
| Hosting | **Netlify** | `server: Netlify`, `x-nf-request-id` |
| Animation | **GSAP 3.15** + Plugins: ScrollTrigger, Observer, CustomEase, DrawSVG, Draggable, Inertia, Flip | Plugin-Namen und Versions-Strings im Bundle |
| Smooth Scroll | **Lenis** (`$lenis` als Nuxt-Plugin, Klasse `html.lenis`) | `html.lenis{height:auto}`, `$lenis.scrollTo(...)` |
| Styling | SCSS pro Komponente (scoped), eigene Utility-Klassen für Typo (`.font-body-12`, `.font-headline-1`, …) | CSS-Dateien pro Seite |
| CMS | **keins**: Projekte liegen als Array im Code, Bilder und Videos als lokale Assets | `ve = [{slug, title, image, poster}, …]` |
| WebGL / Three.js | **nein**: alles DOM/CSS-Transforms und `clip-path` | kein three/ogl/pixi |

### Empfehlung für unseren Nachbau

```
Nuxt 3 (oder 4) + TypeScript
├─ gsap (+ ScrollTrigger, Observer, CustomEase, Flip)   → seit 2025 inkl. aller Plugins kostenlos
├─ lenis                                                 → Smooth Scroll
├─ @nuxt/image                                           → responsive Bilder / AVIF / WebP
├─ sass                                                  → SCSS, Mixins für Breakpoints
├─ optional @nuxt/content                                → Projekte als Markdown/YAML statt Hardcode
└─ Hosting: Netlify oder Vercel (statisch via `nuxt generate`)
```

Alternative mit gleichem Ergebnis: **Astro + GSAP + Lenis**. Die Seitenübergänge (Karte → Detail-Hero) gehen mit einem SPA-Router (Nuxt) aber deutlich einfacher, deshalb ist **Nuxt die Empfehlung**.

---

## 2. Schriften

| Rolle | Schrift | Datei | Einsatz |
|---|---|---|---|
| Primär (fast alles) | **Neue Haas Unica Pro** (Regular, teils mit `font-weight: 251` = Light-Anmutung) | `NeueHaasUnicaPro-Regular.woff2` | Headlines, Fließtext, Beschreibungen |
| Sekundär (UI, Mini-Labels) | **Helvetica Now Variable** | `HelveticaNowVar-Regular.woff2` | 12px-Labels in Versalien (Header, Meta, Galerie-Namen) |

Fallback-Stack: `Helvetica Neue, Helvetica, Arial, sans-serif` · `font-display: swap`

⚠️ **Lizenz:** Beide Schriften sind kommerziell (Monotype). Wir brauchen entweder eine Web-Lizenz oder eine freie Alternative mit ähnlichem Charakter:
- statt Neue Haas Unica: **Inter / Inter Display**, **Hanken Grotesk** oder **TeX Gyre Heros** (Helvetica-Klon)
- statt Helvetica Now: **Inter** (12px, Versalien) oder **Geist**

### Typo-Skala (Mobile → Tablet → Desktop ≥1025 → ≥1438 fluid in vw)

| Klasse | Größe / Zeilenhöhe | Letter-Spacing | Einsatz |
|---|---|---|---|
| `font-body-12` | 12px / 1, **UPPERCASE** | 0 | Header, Nav, Meta, Projektnamen auf der Startseite |
| `font-body` | 16px / 1.3 → 1.11vw | 0 | Fließtext |
| `font-body-24` | 16 → 24px → 1.67vw / 1.2, Weight 251 | −0.01em | About-Texte |
| `font-body-40-100` | 26 → 40px → 2.78vw / 1.22 | −0.04em | Intro-Text auf der Case-Seite |
| `font-headline-2` | 28 → 48px → 3.34vw / 1.2, Weight 251 | 0 | Unterüberschriften |
| `font-headline-1` | 54 → 90px → 6.26vw / 1.24 | **−0.04em** | große Titel (Projektname, „next case“) |

**Wichtiges Prinzip:** Bis 1437px feste `rem`-Werte, **ab 1438px skaliert alles in `vw`** (Wert ÷ 14.4). Die Seite wirkt dadurch auf großen Screens wie „eingefroren“ skaliert.

---

## 3. Design-System

### Farben
```css
:root {
  --color-main: #111;        /* Text */
  --color-bg:   #f8f6f2;     /* warmes Off-White / Papier */
  --selection-bg: #44300033; /* Textauswahl: warmes Braun, 20 % */
}
```
Minimalistisch: eine Textfarbe, ein warmer Papierhintergrund, keine Akzentfarbe. Die Bilder liefern die Farbe.

### 🌗 Tageszeit-Theme (Signature-Feature)
Vor dem ersten Paint setzt ein Inline-Script im `<head>` die CSS-Variablen **abhängig von der lokalen Uhrzeit** und interpoliert dabei zwischen Stützpunkten:

| Uhrzeit | Hintergrund | Text |
|---|---|---|
| 21–04 Uhr | `#2C2922` (fast schwarz, warm) | `#C3BEB1` |
| 05–08 Uhr | Verlauf `#60594C` → `#CEC9BB` | gelb `#F1C345`, ab 6 Uhr `#111` |
| 09–16 Uhr | `#F8F6F2` | `#111` |
| 17–20 Uhr | Verlauf zurück ins Dunkle | ab 19 Uhr gelb, ab 20 Uhr hell |

Zusätzlich gibt es `--img-over-opacity` (dunkles Overlay über Bildern bei Nacht) und `--bg-brightness` (Hintergrundbilder werden abgedunkelt).
Im Header steht eine **„Local Time“-Uhr**. Zieht man daran („Time Travel“, Draggable), kann man die Uhrzeit verstellen, und das Theme wechselt live.

### Layout-Raster
- **Mobile:** 6 Spalten · **Desktop (≥1025px):** 14 Spalten
- Gap `0.8rem` (8px), Außenabstand `0.8rem` mobil / `1.6rem` ab Tablet
- Breakpoints: `≤767` · `768–1024` · `≥1025` · `≥1438` (fluid)
- Keine sichtbare Scrollbar (`scrollbar-width: none`)

### Stil-Merkmale
- Sehr viel Weißraum, rein typografisch, keine Icons und keine Buttons mit Hintergrund
- Kleine Labels in Versalien mit Nummerierung (`01.`, `02.` …)
- Bildformat der Projektkarten **396:496 (≈4:5 hochkant)**, `object-fit: cover`
- Bilder liegen leicht vergrößert (`scale(1.15)`) in einem Container mit `overflow: hidden`, das ermöglicht Parallax- und Zoom-Effekte
- Papier-Texturen als Hintergrund im Kontakt-Overlay (`paper_bg.jpg`, `contact_paper_bg_*.jpeg`)

---

## 4. Startseite („Cases“)

### Struktur
```
<header>  Logo „Brandon Yasin“ | Menu | Contact | Local Time (Uhr)
<div.gallery>                       ← volle Viewport-Höhe: calc(100vh - Header)
  <a.item href="/cases/<slug>">     ← 6 Projekte, horizontal nebeneinander
    <div.item-wrapper>
      <div.item-stage>
        <div.name>  Projektname (12px, UPPERCASE) – Text doppelt für Hover-Roll
        <div.img>   Bild ODER <video autoplay muted loop> + Poster
```
Kein Footer und kein vertikaler Scroll: Die Startseite ist **ein einziger horizontaler Slider**, die Karten sind unten ausgerichtet (`align-items: flex-end`).

Kartenbreite: mobil 83 % · Tablet 36.6 % · Desktop ≈28.7 % (≈3,5 Karten sichtbar, die angeschnittene Karte zeigt, dass es weitergeht).

### Dynamik
1. **Endloser Drag-/Wheel-Slider (Infinite Loop)**
   - GSAP `Observer` für `touch, pointer` (Drag) und auf Desktop zusätzlich `wheel` (vertikales Scrollen bewegt horizontal, `deltaY * 2`)
   - Items werden mit `gsap.utils.wrap()` endlos umpositioniert (kein Klonen)
   - **Lerp/Inertia**: Zielposition und aktuelle Position werden jeden Frame mit Faktor 0.06 angenähert (`gsap.ticker`). Beim Loslassen wirkt die Velocity × 0.3 nach
   - **Speed-Skew**: Je schneller gezogen wird, desto kleiner werden die Karten (bis ca. −20 %), danach federn sie auf 1 zurück
   - Ein Klick nach einem Drag wird unterdrückt
   - Nur sichtbare Items werden transformiert (Performance), und auf iOS reduziert eine FPS-Überwachung die Effekte
2. **Intro-Animation (beim ersten Laden)**
   - Alle Karten starten **gestapelt in der Bildschirmmitte**, jede minimal anders skaliert
   - Nacheinander werden sie per `clip-path: polygon(...)` von oben nach unten aufgedeckt (Stapel-Effekt wie ein Preloader)
   - Danach fliegen sie auf ihre Position in der Reihe (`x/y → 0`, `scale → 1`), das innere Bild zoomt von 1.3 auf 1.15
   - Zum Schluss gleiten die Projektnamen von unten ein (`yPercent 100 → 0`, stagger 0.15s)
   - Eigene Easings: `CustomEase("0.46, 0, 0.09, 1")` (weiches Ausrollen) und `("0.9, 0, 0.58, 1")` (langsamer Start)
3. **Hover auf einer Karte**: Der Projektname „rollt“ nach oben (zwei gestapelte Spans, `yPercent: -100`, 0.4s)
4. **Videos**: Auto-Play und stumm, das Poster-Bild wird ausgeblendet, sobald das erste Frame da ist (`requestVideoFrameCallback`)

### Seitenübergang Startseite → Detailseite (das Herzstück)
- Die angeklickte Karte wird **geklont und `position: fixed`** exakt über dem Original platziert
- Die Karte **morpht in die Hero-Bildposition** der Detailseite (FLIP-Prinzip, 1.26s, Ease `h2wMorph`)
- Alle anderen Karten schrumpfen (`scale 0.7`), ihr Bild zoomt (`1.4`) und wird per `clip-path` nach oben weggeschnitten, die Namen fallen nach unten weg
- **Videos laufen nahtlos weiter**: Die `currentTime` wird zwischen Karten- und Hero-Video synchronisiert, damit kein Sprung entsteht

---

## 5. Detailseite (`/cases/<slug>`)

### Struktur
```
<header>  (wie oben, ohne Logo-Text)
<section.hero>   Grid 14 Spalten
  .left  (Spalte 1–8, STICKY, unten ausgerichtet)
      h1  Projektname (headline-1)
      .meta   Kunde · Jahr            (12px uppercase)
      .cats-tags  Kategorie · Tags   (z. B. „Campaign Design“ / „Content“)
  .right (Spalte 9–14)
      .image  Hero-Bild/Video, Höhe calc(100vh − 6rem)
      .desc   Intro-Text groß (font-body-40-100)
<section.gallery>  Projektbilder
  .gallery__item            einzelnes Bild + Label „01. Campaign Design“
  .gallery__item--group-3   3er-Gruppe (Bild/Video gemischt) + Label „02. Editorial“
<section.next>     „Next case“: großer Titel + Meta + Vorschaubild → Link zum nächsten Projekt
```
Auf Mobile (≤1024px) wird `.left` ausgeblendet und stattdessen `.mob-content` unter dem Bild gezeigt.

### Dynamik
- **Sticky linke Spalte**: Titel und Meta bleiben stehen, während rechts Bild und Text scrollen
- **Line-Reveal von Texten**: Texte werden in Zeilen gesplittet, jede Zeile liegt in `overflow: hidden` und gleitet von `yPercent 100 → 0` ein (stagger 0.05–0.1s, `power2.out`), ausgelöst per ScrollTrigger bei `top 75–90%`
- **Bild-Reveals**: `clip-path`-Aufdeckung plus leichtes Herauszoomen beim Hereinscrollen
- **Parallax**: gescrubbte ScrollTrigger (`scrub: true`) auf Bildern
- **Tags**: werden animiert eingeblendet (`visibility: hidden` bis zur Animation)
- **Next Case**: Der Titel „next case“ rollt beim Hover wie in der Galerie, und ein Klick startet wieder einen Bild-Morph-Übergang

---

## 6. Globale Elemente

| Element | Verhalten |
|---|---|
| **Header** | Logo „Brandon / Yasin“ mit Hover-Roll (doppelte Spans), Buttons „Menu“ und „Contact“, alles 12px uppercase |
| **Menü-Overlay** | Zeigt **verkleinerte Live-Vorschauen der Seiten als Kacheln** (Archive, About, Cases). Ein Klick zoomt die Kachel auf Vollbild (`pageSpread`-Ease) |
| **Kontakt-Overlay** | Headline „let’s build together“ / „join my network“ auf Papier-Textur. Mehrstufiges Formular: 01 Scope (Chips) · 02 Budget (Chips) · 03 Name · 04 E-Mail · 05 Start · 06 Nachricht → „Send“ |
| **Local-Time-Uhr** | Easter Egg: ziehbar, verstellt die Uhrzeit und damit das Farbtheme |
| **Archive-Seite** | horizontale, ziehbare Galerie mit 16 Arbeiten (Bild/Video) |
| **About-Seite** | große Headline, Bilder links sticky, rechts nummerierte Listen (Leistungen) |
| **Page Title** | Seitenname kurz groß eingeblendet beim Seitenwechsel |
| **Barrierefreiheit** | `prefers-reduced-motion` schaltet Effekte ab, Fokus-Styles, `sr-only`-Inputs |

---

## 7. Umsetzungsplan für unseren Nachbau

1. **Setup**: Nuxt 3 + TS + SCSS + GSAP + Lenis, Netlify-Deploy
2. **Design-Tokens**: Farben, Typo-Klassen, Raster, Breakpoints inkl. vw-Skalierung ab 1438px
3. **Content-Modell**: `content/projects/*.md` (Titel, Slug, Kunde, Jahr, Kategorie, Tags, Cover-Bild/Video, Intro, Galerie-Blöcke)
4. **Layout**: Header, Menü-Overlay, Kontakt-Overlay, Lenis-Plugin, Page-Transition-Hook
5. **Startseite**: Infinite-Drag-Slider (Composable `useInfiniteGallery`), danach Intro-Animation
6. **Detailseite**: Hero mit Sticky-Spalte, Galerie-Blocktypen (single / group-3), Next-Case
7. **Übergang** Karte → Hero (FLIP mit Klon, Video-Sync)
8. **Feinschliff**: Scroll-Reveals, Hover-Rolls, Tageszeit-Theme (optional), `reduced-motion`, Performance und Lighthouse

**Aufwand-Schwerpunkte:** Slider-Physik, Intro-Animation und Seitenübergang machen etwa 60 % der Arbeit aus. Der Rest ist Standard-Layout.

> Hinweis: Nachgebaut werden Struktur, Stil und Interaktionsprinzipien. Code, Bilder, Texte und lizenzierte Schriften der Referenzseite übernehmen wir nicht direkt.
