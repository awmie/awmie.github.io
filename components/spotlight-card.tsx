"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import type { SpringOptions } from "framer-motion"

interface Position {
  x: number
  y: number
}

// Define a very fast and smooth spring for the dynamic tilt
const dynamicSpring: SpringOptions = {
  damping: 10, // Less damping for quicker settling
  stiffness: 400, // High stiffness for fast response
  mass: 0.2, // Low mass for a light, agile feel
}

// Define a slower, smoother spring specifically for the scale animation
const scaleSpring: SpringOptions = {
  damping: 20, // More damping for a smoother, slightly slower feel
  stiffness: 100, // Lower stiffness for a less immediate response
  mass: 1, // Higher mass for a more substantial feel
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
  rotateAmplitude?: number // Re-introduce rotateAmplitude prop
  scaleOnHover?: number // Re-introduce scaleOnHover prop
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  rotateAmplitude = 12, // Default to 12 as per your last request
  scaleOnHover = 1.05, // Default to 1.05 as per your last request
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState<number>(0)

  // Framer Motion values for dynamic tilt and scale
  const rotateX = useSpring(useMotionValue(0), dynamicSpring)
  const rotateY = useSpring(useMotionValue(0), dynamicSpring)
  const scale = useSpring(1, scaleSpring) // Use the new scaleSpring here

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return

    const rect = divRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    // Update spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    // Calculate dynamic tilt: area under mouse goes inside depth
    const rotationX = (offsetY / (rect.height / 2)) * rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * -rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(0.6) // Spotlight opacity
    scale.set(scaleOnHover) // Scale up on hover
  }

  const handleMouseLeave = () => {
    setOpacity(0) // Spotlight opacity
    scale.set(1) // Reset scale
    rotateX.set(0) // Reset tilt
    rotateY.set(0) // Reset tilt
  }

  return (
    <motion.div // Use motion.div for Framer Motion animations
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden p-8 ${className}`}
      style={{
        // Apply Framer Motion values directly
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d", // Essential for 3D effects
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  )
}

export default SpotlightCard
