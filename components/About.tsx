import Reveal from "@/components/Reveal"
import { site } from "@/lib/content"

const DETAILS = [
  { label: "Location", value: site.location },
  { label: "Role", value: site.role },
  { label: "Focus", value: site.focus.join(", ") },
]

/* Server component — a classy editorial intro. A large serif statement line,
   then a two-column layout: expanding prose on the left, a mono data block
   on the right that ends with a single accent availability line. */
export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-pixel text-[10px] uppercase tracking-wide text-accent">
            About
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-10 max-w-4xl font-sans text-base leading-relaxed text-bone md:text-xl">
            I build AI, WebGL and real-time systems &mdash; and make things
            on the internet, awkwardly, from {site.location}.
          </h2>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-14">
            <p className="max-w-xl text-xs leading-relaxed text-muted md:col-span-7">
              My work sits where the model meets the browser &mdash; rendering
              physics and light in WebGL, piping live data over WebSockets, and
              grafting language models onto interfaces that feel responsive
              rather than static. Most of it ends up on the internet where you
              can actually poke at it, because a thing you can&rsquo;t touch
              isn&rsquo;t quite finished.
            </p>

            <div className="md:col-span-5">
              <dl className="rounded-2xl border border-line bg-ink-2 p-5 font-mono text-[10px]">
                <div className="space-y-4">
                  {DETAILS.map((detail) => (
                    <div key={detail.label} className="flex items-baseline gap-4">
                      <dt className="w-20 shrink-0 uppercase tracking-wide text-dim">
                        {detail.label}
                      </dt>
                      <dd className="flex-1 leading-relaxed text-bone">{detail.value}</dd>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2.5 border-t border-line pt-5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="text-accent">{site.availability}</span>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
