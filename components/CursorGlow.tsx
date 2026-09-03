"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/* A soft light that trails the cursor — a quiet, classy premium touch.
   Kept very subtle and pointer-events-none so it never hurts usability. */
export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 25 })
  const sy = useSpring(y, { stiffness: 90, damping: 25 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[400px] w-[400px] rounded-full"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(62,207,110,0.10) 0%, rgba(62,207,110,0.03) 40%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  )
}
