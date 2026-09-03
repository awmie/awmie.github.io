"use client"

import { motion, type Variants } from "framer-motion"
import DiscordStatus from "@/components/DiscordStatus"
import { site } from "@/lib/content"

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Words in the tagline that read as signal — tinted with the accent green. */
const ACCENT_WORDS = ["ai", "webgl", "real-time"]

function Tagline() {
  const tokens = site.tagline.split(/\s+/)
  return (
    <>
      {tokens.map((word, i) => {
        const isAccent = ACCENT_WORDS.includes(
          word.replace(/[.,]/g, "").toLowerCase(),
        )
        return (
          <span key={`${word}-${i}`}>
            {isAccent ? <span className="font-medium text-bone">{word}</span> : word}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        )
      })}
    </>
  )
}

export default function HeroContent() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center">
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-32 pt-44 md:pb-36">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-pixel text-[10px] uppercase tracking-[0.15em] text-bone"
          >
            {site.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-pixel text-2xl leading-[1.2] tracking-wide text-bone break-words md:text-5xl lg:text-6xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-bone md:text-base"
          >
            <Tagline />
          </motion.p>

        </motion.div>
      </div>

      {/* Bottom strip — anchored to the hero's lower edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between px-6 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-bone">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-accent"
              aria-hidden="true"
            >
              ▼
            </motion.span>
            Scroll
          </div>

          <div className="pointer-events-auto">
            <DiscordStatus />
          </div>
        </div>
      </div>
    </section>
  )
}
