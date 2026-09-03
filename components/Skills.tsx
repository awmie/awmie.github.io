import Reveal from "@/components/Reveal"
import { stack } from "@/lib/content"

const ACCENTS = [
  "text-accent",
  "text-accent-2",
  "text-accent-3",
  "text-accent-4",
  "text-accent-5",
]

export default function Skills() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-pixel text-[10px] uppercase tracking-wide text-accent">
            Stack
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {stack.map((item, i) => (
              <span
                key={item}
                className={`rounded-full border border-line px-3 py-1.5 text-[10px] ${ACCENTS[i % ACCENTS.length]} transition-colors duration-300 hover:border-accent hover:text-accent`}
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
