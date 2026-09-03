"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/* A calm, classy fluid-gradient "cloud" scene. Rendered in clip-space with a
   single orthographic camera — robust and cheap. Falls back to a CSS gradient.
   The scene is intentionally rendered at a low resolution and upscaled with
   nearest-neighbour, so the background reads as chunky pixels on top of the
   page grain. */

const PIXEL_SIZE = 6 // CSS px per pixel block — raise for a chunkier look

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
               mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * vec2(uResolution.x/uResolution.y, 1.0);
    float t = uTime * 0.07;

    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2,1.3) - t));
    float n = fbm(p + 2.0*q + vec2(1.7,9.2));

    float vig = smoothstep(1.5, 0.2, length(p - 0.62));

    vec3 cream = vec3(0.925, 0.902, 0.839);
    vec3 amber = vec3(0.949, 0.663, 0.231);
    vec3 green = vec3(0.310, 0.620, 0.345);
    vec3 blue  = vec3(0.247, 0.561, 0.839);
    vec3 violet= vec3(0.608, 0.420, 0.827);

    vec3 col = cream;
    col = mix(col, blue,   smoothstep(0.35, 0.75, n) * 0.85);
    col = mix(col, green,  smoothstep(0.45, 0.80, fbm(p - t + vec2(3.0, 1.0))) * 0.70);
    col = mix(col, amber,  smoothstep(0.55, 0.90, fbm(q * 1.5 + t)) * 0.60);
    col = mix(col, violet, smoothstep(0.40, 0.70, fbm(p * 1.3 + t * 0.6)) * 0.45);
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.05;   // tactile grain
    col *= mix(0.90, 1.0, 1.0 - vig);

    gl_FragColor = vec4(col, 1.0);
  }
`

const VERT = /* glsl */ `
  void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }
`

export default function WebGLHero() {
  const mountRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    const canvas = canvasRef.current
    if (!mount || !canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return // skip WebGL entirely, CSS gradient shows

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      return // WebGL unavailable → CSS gradient fallback
    }
    if (!renderer.getContext()) return

    renderer.setPixelRatio(1) // pixelation needs a 1:1 buffer, not a high-DPI one
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // --- gradient plane ---
    const planeGeo = new THREE.PlaneGeometry(2, 2)
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      depthWrite: false,
    })
    scene.add(new THREE.Mesh(planeGeo, planeMat))

    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      // Render to a low-res buffer and let CSS stretch it — nearest-neighbour
      // upscale gives the whole scene a chunky pixel look.
      const lw = Math.max(1, Math.floor(w / PIXEL_SIZE))
      const lh = Math.max(1, Math.floor(h / PIXEL_SIZE))
      renderer.setSize(lw, lh, false)
      planeMat.uniforms.uResolution.value.set(lw, lh)
    }
    onResize()
    window.addEventListener("resize", onResize)

    const clock = new THREE.Clock()
    let raf = 0
    let running = false
    let inView = true

    const loop = () => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      const t = clock.getElapsedTime()
      planeMat.uniforms.uTime.value = t
      renderer.render(scene, camera)
    }
    const startLoop = () => {
      if (running) return
      running = true
      clock.getDelta() // reset the clock so uTime doesn't jump
      loop()
    }
    const stopLoop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    // Only render while the hero is actually on screen + tab visible, so we
    // don't burn GPU while the user scrolls through the other sections.
    const sync = () => {
      const should = inView && document.visibilityState === "visible"
      if (should) startLoop()
      else stopLoop()
    }
    const onVisibility = () => sync()
    document.addEventListener("visibilitychange", onVisibility)

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true
        sync()
      },
      { threshold: 0 },
    )
    io.observe(mount)
    sync()

    return () => {
      stopLoop()
      io.disconnect()
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      planeGeo.dispose()
      planeMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={mountRef} className="absolute inset-0 overflow-hidden">
      {/* CSS gradient sits behind the canvas — it is the fallback */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(242,169,59,0.20) 0%, rgba(236,230,214,0) 55%), radial-gradient(80% 80% at 80% 20%, rgba(63,143,214,0.18) 0%, rgba(236,230,214,0) 60%), radial-gradient(90% 90% at 15% 78%, rgba(226,85,77,0.18) 0%, rgba(236,230,214,0) 55%), linear-gradient(180deg, #ece6d6 0%, #f0ead9 100%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="relative block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}
