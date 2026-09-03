/* The signature film-grain texture, layered over the whole page.
   The actual grain is drawn by the `.grain::before` pseudo-element in
   globals.css (z-60, mix-blend overlay, pointer-events none). */
export default function NoiseOverlay() {
  return <div className="grain" aria-hidden="true" />
}
