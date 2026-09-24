// Globaler Zustand für die Vollbild-Overlays (Menü, Kontakt) – P4.
// Header-Buttons togglen, Overlays lesen/schließen sich selbst darüber.
export type OverlayName = 'menu' | 'contact' | null

export function useOverlay() {
  return useState<OverlayName>('overlay', () => null)
}
