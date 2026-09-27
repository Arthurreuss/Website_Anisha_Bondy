// Tageszeit-Theme (P10, Palette seit P29/D-058: Anishas Farben statt
// Tag-hell/Nacht-dunkel).
//
// Eine einzige Stützpunkt-Tabelle (BG_STOPS) plus Text- und Akzentfarben
// wird von zwei Stellen genutzt, damit die Farbwerte nirgends doppelt
// vorkommen:
//   1. `buildHeadInlineScript()` serialisiert die Tabellen (JSON) in einen
//      eigenständigen String, der als Inline-<script> im <head> läuft (vor
//      dem ersten Paint, Muster D-012) und `document.documentElement.style`
//      direkt setzt – kein Aufblitzen einer falschen Farbe.
//   2. `computeTheme()` / `applyTheme()` laufen zur Laufzeit (Composable
//      `useDaytimeTheme()`), lesen dieselben Tabellen aus diesem Modul und
//      aktualisieren die Variablen jede Minute weich (CSS-Transition).
//
// Kontrast: Die Palette hat dunkle Töne (Nachtblau, Dunkelblau, Lila,
// Tiefrot → heller Text) und helle Töne (Hellblau, Pink → dunkler Text).
// Die Textfarbe wird nicht interpoliert, sondern je Hintergrund die mit dem
// höheren Kontrast gewählt (auf den Palettenfarben ≥ 10:1). Nur in den kurzen
// Übergängen hell↔dunkel (ca. 07:40–08:20 und 16:40–17:20) liegt der
// Hintergrund im mittleren Lichtwert, dort sinkt der Kontrast kurz auf
// minimal ≈ 3.9:1 – physikalische Grenze, siehe Hinweis in D-016/P10.
export interface ColorStop {
  /** Lokale Stunde als Dezimalzahl, 0–24 (z. B. 5.5 = 05:30). */
  h: number
  /** Hex-Farbe, z. B. '#0C1636'. */
  c: string
}

export interface DaytimeTheme {
  bg: string
  text: string
  /** Dunkles Overlay über Bildern nachts (0–0.15). */
  imgOverOpacity: number
  /** Helligkeitsfaktor für Hintergrundbilder (1 = normal, dunkler < 1). */
  bgBrightness: number
  direct: string
  create: string
  participate: string
  todo: string
  /** Hintergrund im mittleren Helligkeitsbereich: Header ohne mix-blend-mode difference. */
  twilight: boolean
}

// --- Hintergrund: Anishas Palette (D-058) über den Tag. Flache Abschnitte
// über doppelte Stützpunkte; die Uhr im Header („Zeitreise“) läuft weiterhin
// durch alle Farben. ---
const NACHTBLAU = '#0C1636'
const LILA = '#3B1F63'
const HELLBLAU = '#BCD6EE'
const PINK = '#F3B9CF'
const TIEFROT = '#6A1230'
const DUNKELBLAU = '#16275A'

export const BG_STOPS: ColorStop[] = [
  { h: 5, c: NACHTBLAU },
  { h: 7, c: LILA },
  { h: 9, c: HELLBLAU },
  { h: 12, c: HELLBLAU },
  { h: 14, c: PINK },
  { h: 16, c: PINK },
  { h: 18, c: TIEFROT },
  { h: 20, c: DUNKELBLAU },
  { h: 22, c: NACHTBLAU },
]

// --- Text: helle bzw. dunkle Variante, je nach Kontrast (siehe oben). ---
export const TEXT_LIGHT = '#F6F1EA'
export const TEXT_DARK = '#141432'

// Säulen-/Todo-Farben: auf hellen Palettentönen die dunklen Varianten
// (≥ 4.5:1 auf Hellblau und Pink), auf dunklen die hellen (≥ 5.5:1 auf allen
// dunklen Tönen, geprüft). Umschaltung zusammen mit der Textfarbe.
export const ACCENT_DAY = {
  direct: '#9A1633',
  create: '#15294F',
  participate: '#6E4606',
  todo: '#8F2E05',
}

export const ACCENT_NIGHT = {
  direct: '#FF8FA6',
  create: '#9EC1FF',
  participate: '#F5B14A',
  todo: '#FF9A5C',
}

// Bilder werden nur in den dunklen Phasen leicht abgedunkelt; Maßstab ist
// die Helligkeit zwischen hellstem (Hellblau) und dunkelstem Ton (Nachtblau).
const BG_DAY = HELLBLAU
const BG_NIGHT = NACHTBLAU
const MAX_IMG_OVERLAY = 0.1
const MIN_BG_BRIGHTNESS = 0.85
// Header nutzt weiß + mix-blend-mode: difference. Auf farbigem Hintergrund
// ergäbe das die Komplementärfarbe (z. B. Mint auf Tiefrot) – bei gesättigtem
// oder mittelhellem Hintergrund schaltet `html.theme-twilight` den Header auf
// --color-main um. Mit der Palette D-058 ist das praktisch immer der Fall.
const TWILIGHT_MIN = 70
const TWILIGHT_MAX = 190
const TWILIGHT_SAT = 12

export function isTwilight(bg: string): boolean {
  const [r, g, b] = hexToRgb(bg)
  const avg = (r + g + b) / 3
  const sat = Math.max(r, g, b) - Math.min(r, g, b)
  return sat > TWILIGHT_SAT || (avg > TWILIGHT_MIN && avg < TWILIGHT_MAX)
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function rgbToHex([r, g, b]: number[]): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

function lerpChannel(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpHex(c1: string, c2: string, t: number): [number, number, number] {
  const a = hexToRgb(c1)
  const b = hexToRgb(c2)
  const s = smoothstep(t)
  return [lerpChannel(a[0], b[0], s), lerpChannel(a[1], b[1], s), lerpChannel(a[2], b[2], s)]
}

/** Findet die interpolierte Farbe zu einer Stunde (0–24) auf einer zyklischen Stützpunkt-Tabelle. */
export function colorAt(stops: ColorStop[], hour: number): [number, number, number] {
  const n = stops.length
  for (let i = 0; i < n; i++) {
    const cur = stops[i]
    const next = stops[(i + 1) % n]
    let h0 = cur.h
    let h1 = next.h
    if (h1 <= h0) h1 += 24
    let hh = hour
    if (hh < h0) hh += 24
    if (hh >= h0 && hh <= h1) {
      const t = h1 === h0 ? 0 : (hh - h0) / (h1 - h0)
      return lerpHex(cur.c, next.c, t)
    }
  }
  return hexToRgb(stops[0].c)
}

function relativeLuminance([r, g, b]: number[]): number {
  const chan = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b)
}

function contrast(a: number[], b: number[]): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** Lokale Stunde als Dezimalzahl (Stunde + Minuten/60 + Sekunden/3600). */
export function getLocalHourFraction(date: Date = new Date()): number {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
}

/** Berechnet das vollständige Theme (Farben, Overlay, Helligkeit) für eine Stunde. */
export function computeTheme(hour: number): DaytimeTheme {
  const bg = rgbToHex(colorAt(BG_STOPS, hour))
  const bgRgb = hexToRgb(bg)
  const lightText = contrast(bgRgb, hexToRgb(TEXT_LIGHT)) >= contrast(bgRgb, hexToRgb(TEXT_DARK))
  const text = lightText ? TEXT_LIGHT : TEXT_DARK

  // Dunkel-Anteil (0 = hellster, 1 = dunkelster Ton) aus der Helligkeit des
  // gerade berechneten Hintergrunds – bestimmt Overlay und Bildhelligkeit.
  const bgLum = relativeLuminance(bgRgb)
  const dayLum = relativeLuminance(hexToRgb(BG_DAY))
  const nightLum = relativeLuminance(hexToRgb(BG_NIGHT))
  const nightMix = Math.min(1, Math.max(0, (dayLum - bgLum) / (dayLum - nightLum)))

  const accents = lightText ? ACCENT_NIGHT : ACCENT_DAY
  const { direct, create, participate, todo } = accents

  return {
    bg,
    text,
    imgOverOpacity: Number((nightMix * MAX_IMG_OVERLAY).toFixed(3)),
    bgBrightness: Number((1 - nightMix * (1 - MIN_BG_BRIGHTNESS)).toFixed(3)),
    direct,
    create,
    participate,
    todo,
    twilight: isTwilight(bg),
  }
}

/** Setzt die CSS-Variablen des Themes auf einem Element (i. d. R. <html>). */
export function applyTheme(el: HTMLElement, theme: DaytimeTheme): void {
  el.style.setProperty('--color-bg', theme.bg)
  el.style.setProperty('--color-main', theme.text)
  el.style.setProperty('--img-over-opacity', String(theme.imgOverOpacity))
  el.style.setProperty('--bg-brightness', String(theme.bgBrightness))
  el.style.setProperty('--color-direct', theme.direct)
  el.style.setProperty('--color-create', theme.create)
  el.style.setProperty('--color-participate', theme.participate)
  el.style.setProperty('--color-todo', theme.todo)
  el.classList.toggle('theme-twilight', theme.twilight)
}

/**
 * Eigenständiger Inline-Script-String fürs <head> (vor Hydration, Muster
 * D-012). Serialisiert dieselben Stützpunkt-Tabellen als JSON, damit keine
 * Zahl doppelt gepflegt wird, und repliziert dieselbe (kleine) Interpolations-
 * Logik in reinem JS. Nutzt immer die echte lokale Uhrzeit (die per Uhr
 * verstellte „Zeitreise“-Stunde lebt nur clientseitig in useDaytimeTheme()
 * und wird bewusst nicht über einen Reload hinweg gemerkt).
 */
export function buildHeadInlineScript(): string {
  const data = JSON.stringify({
    bg: BG_STOPS,
    tl: TEXT_LIGHT,
    td: TEXT_DARK,
    accentDay: ACCENT_DAY,
    accentNight: ACCENT_NIGHT,
    bgDay: BG_DAY,
    bgNight: BG_NIGHT,
    maxOverlay: MAX_IMG_OVERLAY,
    minBrightness: MIN_BG_BRIGHTNESS,
    twMin: TWILIGHT_MIN,
    twMax: TWILIGHT_MAX,
    twSat: TWILIGHT_SAT,
  })
  // Bewusst minimal/ohne Kommentare (läuft vor dem ersten Paint).
  return `(function(){try{
var D=${data};
function hx(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function rh(c){function p(v){v=Math.round(Math.min(255,Math.max(0,v)));var s=v.toString(16);return s.length<2?'0'+s:s}return '#'+p(c[0])+p(c[1])+p(c[2])}
function ss(t){return t*t*(3-2*t)}
function lh(c1,c2,t){var a=hx(c1),b=hx(c2),s=ss(t);return[a[0]+(b[0]-a[0])*s,a[1]+(b[1]-a[1])*s,a[2]+(b[2]-a[2])*s]}
function ca(st,hour){var n=st.length;for(var i=0;i<n;i++){var cur=st[i],nx=st[(i+1)%n];var h0=cur.h,h1=nx.h;if(h1<=h0)h1+=24;var hh=hour;if(hh<h0)hh+=24;if(hh>=h0&&hh<=h1){var t=h1===h0?0:(hh-h0)/(h1-h0);return lh(cur.c,nx.c,t)}}return hx(st[0].c)}
function lum(c){function ch(v){v=v/255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}return 0.2126*ch(c[0])+0.7152*ch(c[1])+0.0722*ch(c[2])}
var now=new Date();
var hour=now.getHours()+now.getMinutes()/60+now.getSeconds()/3600;
var bg=rh(ca(D.bg,hour));
var bgLum=lum(hx(bg)),dayLum=lum(hx(D.bgDay)),nightLum=lum(hx(D.bgNight));
function cr(a,b){return(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)}
var lt=cr(bgLum,lum(hx(D.tl)))>=cr(bgLum,lum(hx(D.td)));
var text=lt?D.tl:D.td;var A=lt?D.accentNight:D.accentDay;
var mix=Math.min(1,Math.max(0,(dayLum-bgLum)/(dayLum-nightLum)));
var d=document.documentElement;
d.style.setProperty('--color-bg',bg);
d.style.setProperty('--color-main',text);
d.style.setProperty('--img-over-opacity',String(Math.round(mix*D.maxOverlay*1000)/1000));
d.style.setProperty('--bg-brightness',String(Math.round((1-mix*(1-D.minBrightness))*1000)/1000));
d.style.setProperty('--color-direct',A.direct);
d.style.setProperty('--color-create',A.create);
d.style.setProperty('--color-participate',A.participate);
d.style.setProperty('--color-todo',A.todo);
d.style.setProperty('--daytime-hour',String(hour));
var bc=hx(bg),avg=(bc[0]+bc[1]+bc[2])/3,sat=Math.max(bc[0],bc[1],bc[2])-Math.min(bc[0],bc[1],bc[2]);if(sat>D.twSat||(avg>D.twMin&&avg<D.twMax))d.classList.add('theme-twilight');
}catch(e){}})()`
}
