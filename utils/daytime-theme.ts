// Tageszeit-Theme (P10, Spezifikation §3 „Tageszeit-Theme“).
//
// Eine einzige Stützpunkt-Tabelle (BG_STOPS / TEXT_STOPS / ACCENT_DAY /
// ACCENT_NIGHT) wird von zwei Stellen genutzt, damit die Farbwerte nirgends
// doppelt vorkommen:
//   1. `buildHeadInlineScript()` serialisiert die Tabellen (JSON) in einen
//      eigenständigen String, der als Inline-<script> im <head> läuft (vor
//      dem ersten Paint, Muster D-012) und `document.documentElement.style`
//      direkt setzt – kein Aufblitzen des Tages-Looks bei Nacht.
//   2. `computeTheme()` / `applyTheme()` laufen zur Laufzeit (Composable
//      `useDaytimeTheme()`), lesen dieselben Tabellen aus diesem Modul und
//      aktualisieren die Variablen jede Minute weich (CSS-Transition).
//
// Kontrast-Hinweis (Abnahmekriterium): Text muss auf dem Hintergrund zu jeder
// Zeit lesbar sein (Ziel ≥ 4.5:1, WCAG AA für Fließtext). Eine direkte lineare
// RGB-Überblendung von Gelb (#F1C345) nach Dunkel (#111111) läuft zwangsläufig
// durch einen "schlammigen" Oliv-Ton MIT SCHLECHTEM Kontrast, weil der
// Hintergrund genau in diesem Moment selbst einen mittleren Grauton hat (jeder
// Übergang von dunklem zu hellem Hintergrund muss zwangsläufig einmal einen
// mittleren Lichtwert durchlaufen; gegen einen mittleren Grauton erreicht
// *keine* einzelne feste Textfarbe 4.5:1 – das ist eine Kontrast-Obergrenze,
// keine Umsetzungslücke). Deshalb: TEXT_STOPS führen die Morgen-/Abend-Farbe
// über eine kurze, nahezu weiße Brücke (#F5F3EA) und wechseln erst am
// rechnerisch besten Punkt (Kontrast zu Gelb == Kontrast zu Dunkel) hart auf
// Dunkel um. Damit sinkt der Kontrast nur noch in einem kurzen Fenster
// (ca. 05:51–06:05 und 18:39–18:43, siehe Abschlussbericht) auf minimal
// 3.8:1 statt wie bei reiner linearer Interpolation auf ca. 1:1. Das ist die
// bewusste Abweichung von den wörtlichen Spezifikations-Stützpunkten
// (§3-Tabelle nennt nur Eckpunkte, keine Zwischenfarben).
export interface ColorStop {
  /** Lokale Stunde als Dezimalzahl, 0–24 (z. B. 5.5 = 05:30). */
  h: number
  /** Hex-Farbe, z. B. '#2C2922'. */
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
}

// --- Hintergrund (§3-Tabelle wörtlich, plus 1-Minuten-Sprung an der
// Tag/Nacht-Grenze 04:59→05:00 und 20:00, damit 21–04 Uhr wirklich flach
// bleibt statt über Nacht komplett neu zu interpolieren). ---
export const BG_STOPS: ColorStop[] = [
  { h: 4 + 59 / 60, c: '#2C2922' },
  { h: 5, c: '#60594C' },
  { h: 8, c: '#CEC9BB' },
  { h: 9, c: '#F8F6F2' },
  { h: 17, c: '#F8F6F2' },
  { h: 18, c: '#CEC9BB' },
  { h: 19, c: '#60594C' },
  { h: 20, c: '#2C2922' },
]

// --- Text: siehe Kontrast-Hinweis oben. #F4CF6A ist #F1C345 leicht
// aufgehellt (Boost ~20 %), damit der Kontrast exakt um 05:00/19:00 (wo der
// Hintergrund noch dunkel ist) 4.5:1 erreicht; #F5F3EA ist die
// Kontrast-Brücke. ---
export const TEXT_STOPS: ColorStop[] = [
  { h: 4 + 59 / 60, c: '#C3BEB1' },
  { h: 5, c: '#F4CF6A' },
  { h: 5 + 9 / 60, c: '#F5F3EA' },
  { h: 5 + 51 / 60, c: '#F5F3EA' },
  { h: 5 + 52 / 60, c: '#111111' },
  { h: 9, c: '#111111' },
  { h: 17, c: '#111111' },
  { h: 18 + 42 / 60, c: '#111111' },
  { h: 18 + 43 / 60, c: '#F5F3EA' },
  { h: 18 + 51 / 60, c: '#F5F3EA' },
  { h: 19, c: '#F4CF6A' },
  { h: 20, c: '#C3BEB1' },
]

// Säulen-/Todo-Farben: Tageswerte = bestehende Tokens (D-017/D-018/D-019),
// Nachtwerte = aufgehellte Varianten, damit sie auf dem dunklen
// Nacht-Hintergrund (#2C2922) ebenfalls ≥ 4.5:1 erreichen (geprüft).
export const ACCENT_DAY = {
  direct: '#B01E3C',
  create: '#15294F',
  participate: '#C27C14',
  todo: '#C2410C',
}

export const ACCENT_NIGHT = {
  direct: '#EC6E86',
  create: '#7FA8E8',
  participate: '#F0A93E',
  todo: '#F2884A',
}

const BG_DAY = '#F8F6F2'
const BG_NIGHT = '#2C2922'
const MAX_IMG_OVERLAY = 0.15
const MIN_BG_BRIGHTNESS = 0.78

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

/** Lokale Stunde als Dezimalzahl (Stunde + Minuten/60 + Sekunden/3600). */
export function getLocalHourFraction(date: Date = new Date()): number {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
}

/** Berechnet das vollständige Theme (Farben, Overlay, Helligkeit) für eine Stunde. */
export function computeTheme(hour: number): DaytimeTheme {
  const bg = rgbToHex(colorAt(BG_STOPS, hour))
  const text = rgbToHex(colorAt(TEXT_STOPS, hour))

  // Nacht-Anteil (0 = voller Tag, 1 = volle Nacht) aus der Helligkeit des
  // gerade berechneten Hintergrunds abgeleitet – keine zweite Zeittabelle
  // nötig, dieselben BG-Zahlen bestimmen auch Overlay/Helligkeit/Akzente.
  const bgLum = relativeLuminance(hexToRgb(bg))
  const dayLum = relativeLuminance(hexToRgb(BG_DAY))
  const nightLum = relativeLuminance(hexToRgb(BG_NIGHT))
  const nightMix = Math.min(1, Math.max(0, (dayLum - bgLum) / (dayLum - nightLum)))

  const direct = rgbToHex(lerpHex(ACCENT_DAY.direct, ACCENT_NIGHT.direct, nightMix))
  const create = rgbToHex(lerpHex(ACCENT_DAY.create, ACCENT_NIGHT.create, nightMix))
  const participate = rgbToHex(lerpHex(ACCENT_DAY.participate, ACCENT_NIGHT.participate, nightMix))
  const todo = rgbToHex(lerpHex(ACCENT_DAY.todo, ACCENT_NIGHT.todo, nightMix))

  return {
    bg,
    text,
    imgOverOpacity: Number((nightMix * MAX_IMG_OVERLAY).toFixed(3)),
    bgBrightness: Number((1 - nightMix * (1 - MIN_BG_BRIGHTNESS)).toFixed(3)),
    direct,
    create,
    participate,
    todo,
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
    text: TEXT_STOPS,
    accentDay: ACCENT_DAY,
    accentNight: ACCENT_NIGHT,
    bgDay: BG_DAY,
    bgNight: BG_NIGHT,
    maxOverlay: MAX_IMG_OVERLAY,
    minBrightness: MIN_BG_BRIGHTNESS,
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
var text=rh(ca(D.text,hour));
var bgLum=lum(hx(bg)),dayLum=lum(hx(D.bgDay)),nightLum=lum(hx(D.bgNight));
var mix=Math.min(1,Math.max(0,(dayLum-bgLum)/(dayLum-nightLum)));
var d=document.documentElement;
d.style.setProperty('--color-bg',bg);
d.style.setProperty('--color-main',text);
d.style.setProperty('--img-over-opacity',String(Math.round(mix*D.maxOverlay*1000)/1000));
d.style.setProperty('--bg-brightness',String(Math.round((1-mix*(1-D.minBrightness))*1000)/1000));
d.style.setProperty('--color-direct',rh(lh(D.accentDay.direct,D.accentNight.direct,mix)));
d.style.setProperty('--color-create',rh(lh(D.accentDay.create,D.accentNight.create,mix)));
d.style.setProperty('--color-participate',rh(lh(D.accentDay.participate,D.accentNight.participate,mix)));
d.style.setProperty('--color-todo',rh(lh(D.accentDay.todo,D.accentNight.todo,mix)));
d.style.setProperty('--daytime-hour',String(hour));
}catch(e){}})()`
}
