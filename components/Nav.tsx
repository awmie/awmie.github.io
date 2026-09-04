"use client"

import { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import ThemeToggle from "@/components/ThemeToggle"
import { site } from "@/lib/content"

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16))

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-all duration-300 ${
        scrolled ? "glass" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Left — handle with a small accent dot */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-pixel text-[11px] uppercase tracking-wide text-bone"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {site.handle}
        </a>

        {/* Right — links + GitHub */}
        <div className="flex items-center gap-2 sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative inline-flex items-center px-1.5 py-1 font-mono text-[10px] uppercase tracking-wide text-bone hover:bg-accent hover:text-ink sm:px-2"
            >
              {/* clip window is exactly one line tall, so the duplicate only
                  appears while it rolls in — no leftover "reflection" */}
              <span className="relative block overflow-hidden leading-none">
                <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-[1em]">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 block translate-y-[1em] transition-transform duration-300 ease-out group-hover:translate-y-0"
                >
                  {link.label}
                </span>
              </span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}
