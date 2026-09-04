import Reveal from "@/components/Reveal"
import DiscordStatus from "@/components/DiscordStatus"
import { ArrowUpRight } from "lucide-react"
import { site, socials } from "@/lib/content"

/* Contacts are a clean vertical list — GitHub, Twitter, then the email last
   (the primary CTA, shown in the coral accent). Each has a hover animation:
   underline draws in + arrow slides in. */
export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-pixel text-[10px] uppercase tracking-wide text-accent">
            Contact
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-10 font-pixel text-2xl leading-[1.3] md:text-4xl">
            Let&rsquo;s build something.
          </h2>
        </Reveal>

        <Reveal>
          <p className="mt-6 max-w-md text-sm text-muted">
            Have an idea or just want to say hi?
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            {/* contacts — email sits below GitHub and Twitter */}
            <ul className="flex flex-col gap-4">
              {socials.map((social) => {
                const isEmail = social.url.startsWith("mailto:")
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      className="group relative flex items-baseline gap-3 font-mono text-xs text-bone hover:text-accent md:gap-4 md:text-sm"
                    >
                      <span className="w-16 shrink-0 text-[10px] uppercase tracking-wide text-dim md:w-24">
                        {social.name}
                      </span>
                      <span className="relative inline-flex min-w-0 items-baseline gap-2">
                        <span className={`min-w-0 break-all ${isEmail ? "text-accent" : ""}`}>
                          {social.handle}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 -translate-x-1 text-dim opacity-70 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                          aria-hidden="true"
                        />
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="inline-flex items-center gap-2.5 font-mono text-[10px] text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {site.availability}
              </span>
              <DiscordStatus />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
