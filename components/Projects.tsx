import Reveal from "@/components/Reveal"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/lib/content"

/* Server component — the showpiece index of selected work.
   Each project is a full-width editorial row; the whole row is the anchor
   to the project's live url, so the trailing "↗" is a span (no nested
   anchors). The title tints accent on hover and the row gets an ink-2
   background wash. */
export default function Projects() {
  const count = `( ${String(projects.length).padStart(2, "0")} )`

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-center justify-between px-1 md:mb-16">
          <span className="font-pixel text-[10px] uppercase tracking-wide text-accent">
            Selected Work
          </span>
          <span className="font-mono text-xs uppercase tracking-wide text-dim">
            {count}
          </span>
        </div>

        <Reveal>
          <div>
            {projects.map((project) => (
              <a
                key={project.index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t border-line py-8 transition-colors duration-500 ease-out hover:bg-ink-2 md:py-12"
              >
                <div className="grid gap-6 md:grid-cols-12">
                  {/* mono index */}
                  <div className="pt-1 font-mono text-[10px] text-muted md:col-span-1">
                    {project.index}
                  </div>

                  {/* serif title */}
                  <h3 className="font-pixel text-lg leading-snug text-bone transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent md:col-span-4 md:text-3xl">
                    {project.name}
                    <span className="text-dim">/</span>
                  </h3>

                  {/* mono tagline */}
                  <div className="pt-2 font-mono text-[10px] uppercase tracking-wide text-muted md:col-span-3">
                    {project.tagline}
                  </div>

                  {/* description + tech + arrow */}
                  <div className="md:col-span-4">
                    <p className="text-xs leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {project.tech.map((tech) => (
                          <span key={tech} className="font-mono text-[10px] text-dim">
                            [{tech}]
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
