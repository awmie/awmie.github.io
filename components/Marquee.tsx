import { stack } from "@/lib/content"

/* Server component — an infinite horizontal marquee of the stack, between
   the hero and the first section. The track holds the set twice and loops
   translateX(-50%), so the two halves are identical and the loop is seamless.
   Edge fade via a horizontal gradient mask. Hides from AT (decorative). */
export default function Marquee() {
  return (
    <div className="border-y border-line py-5" aria-hidden="true">
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 animate-marquee whitespace-nowrap">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center gap-8 pr-8">
              {stack.map((word, wi) => (
                <span
                  key={`${half}-${word}`}
                  className={`font-pixel text-xs uppercase tracking-wide transition-colors duration-300 ${
                    wi % 2 === 0 ? "text-bone hover:text-accent" : "text-accent hover:text-bone"
                  }`}
                >
                  {word} <span className="text-dim">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
