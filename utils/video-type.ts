/** MIME-Typ für <source> aus der Dateiendung (Cover-Videos: webm-Platzhalter, mp4 echt, D-042). */
export function videoType(src: string) {
  return src.endsWith('.mp4') ? 'video/mp4' : 'video/webm'
}
