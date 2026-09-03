"use client"

import dynamic from "next/dynamic"

/* The WebGL hero pulls in three.js, which is heavy — lazy-load it
   client-side only so it never enters the initial HTML and never blocks
   first paint. This wrapper is a Client Component because `ssr: false`
   is only allowed there. */
const WebGLHero = dynamic(() => import("@/components/WebGLHero"), {
  ssr: false,
})

export default function ClientHero() {
  return <WebGLHero />
}
