"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import type { SpringOptions } from "framer-motion"

const spring: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

interface TiltedSpotlightCardProps {
  width?: React.CSSProperties["width"]
  height?: React.CSSProperties["height"]
  rotateAmplitude?: number
  scaleOnHover?: number
  children: React.ReactNode
}

export default function TiltedSpotlightCard({
  width = "300px",
  height = "300px",
  rotateAmplitude = 15,
  scaleOnHover = 1.05,
  children,
}: TiltedSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), spring)
  const rotateY = useSpring(useMotionValue(0), spring)
  const scale = useSpring(1, spring)

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    const rotationX = (offsetY / (rect.height / 2)) * rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * -rotateAmplitude
    rotateX.set(rotationX)
    rotateY.set(rotationY)
  }

  function handleEnter() {
    scale.set(scaleOnHover)
  }

  function handleLeave() {
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        width,
        height,
        rotateX,
        rotateY,
        scale,
      }}
      className="relative [transform-style:preserve-3d] transition-transform"
    >
      {children}
    </motion.div>
  )
}
