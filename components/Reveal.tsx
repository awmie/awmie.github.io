"use client"

import { motion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}

/* Fade + rise on scroll into view. Triggers as soon as the element enters the
   viewport and animates quickly, so content never feels like it's "loading".
   Respects reduced motion via the global CSS override. */
export default function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
