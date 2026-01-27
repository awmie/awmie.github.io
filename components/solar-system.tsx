"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

function TwinklingStars({ count = 5000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const shifts = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = 70 + Math.random() * 80 // Stars further away (70 to 150)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
      
      sizes[i] = Math.random() * 1.0 + 0.2; // 0.2 to 1.2
      shifts[i] = Math.random() * Math.PI
    }
    return { positions: p, sizes, shifts }
  }, [count])

  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  // Shader for twinkling
  const starShader = {
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: `
      uniform float uTime;
      attribute float size;
      attribute float shift;
      varying float vAlpha;
      void main() {
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        
        float twinkle = sin(uTime * 3.0 + shift * 15.0); 
        twinkle = smoothstep(-1.0, 1.0, twinkle); 
        
        vAlpha = 0.2 + twinkle * 0.3; // Lowered luminance
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * 3.5 * (1.0 + twinkle * 0.4); 
        gl_PointSize *= (100.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
        
        gl_FragColor = vec4(uColor, vAlpha * alpha);
      }
    `,
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.positions.length / 3}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={points.sizes.length}
          array={points.sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-shift"
          count={points.shifts.length}
          array={points.shifts}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[starShader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Moon({ size, speed, distance, color }: { size: number; speed: number; distance: number; color: string }) {
  const moonRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (moonRef.current) {
      const t = clock.getElapsedTime() * speed
      moonRef.current.position.x = Math.cos(t) * distance
      moonRef.current.position.z = Math.sin(t) * distance
    }
  })

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  )
}

function Planet({
  distance,
  speed,
  size,
  orbitColor = "#ffffff",
  planetColor = "#ffffff",
  hasRing = false,
  moons = 0,
  axisTilt = 0,
}: {
  distance: number
  speed: number
  size: number
  orbitColor?: string
  planetColor?: string
  hasRing?: boolean
  moons?: number
  axisTilt?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Group>(null)
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() * speed + randomOffset
      groupRef.current.position.x = Math.cos(t) * distance
      groupRef.current.position.z = Math.sin(t) * distance
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += speed * 2
    }
  })

  return (
    <group>
      {/* Orbit Path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[distance, 0.02, 32, 100]} />
        <meshBasicMaterial color={orbitColor} opacity={0.05} transparent wireframe />
      </mesh>

      {/* Planet Group (Positioning) */}
      <group ref={groupRef}>
        {/* Axial Tilt Group */}
        <group rotation={[0, 0, axisTilt]}>
          
          {/* Rotating Planet Body (Sphere + Ring) */}
          <group ref={planetRef}>
            {/* Planet Sphere */}
            <mesh>
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial color={planetColor} wireframe transparent opacity={0.3} />
            </mesh>

            {/* Ring (Aligned to Equator) */}
            {hasRing && (
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 1.4, size * 2.4, 32]} />
                <meshBasicMaterial color={planetColor} wireframe side={THREE.DoubleSide} opacity={0.15} transparent />
              </mesh>
            )}
          </group>

          {/* Moons (Orbiting in the tilted equatorial plane) */}
          {moons > 0 &&
            Array.from({ length: moons }).map((_, i) => (
              <Moon
                key={i}
                size={size * 0.1}
                speed={(i + 1) * 1.5}
                distance={size * 1.5 + i * 0.5}
                color={planetColor}
              />
            ))}
        </group>
      </group>
    </group>
  )
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.002
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial color="#FDB813" wireframe transparent opacity={0.25} />
    </mesh>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current && typeof window !== "undefined") {
      const scrollY = window.scrollY
      // Rotate the entire solar system based on scroll
      groupRef.current.rotation.x = scrollY * 0.0005 + 0.2 
      groupRef.current.rotation.y = scrollY * 0.0002
    }
  })

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 8]}>
      <TwinklingStars />
      <Sun />
      
      {/* Mercury */}
      <Planet distance={4} speed={0.8} size={0.2} planetColor="#A5A5A5" />
      
      {/* Venus */}
      <Planet distance={6} speed={0.6} size={0.4} planetColor="#E3BB76" axisTilt={3.0} />
      
      {/* Earth + Moon */}
      <Planet distance={8.5} speed={0.4} size={0.45} planetColor="#22A6B3" moons={1} axisTilt={0.41} />
      
      {/* Mars */}
      <Planet distance={11} speed={0.3} size={0.35} planetColor="#EB4D4B" axisTilt={0.44} />
      
      {/* Jupiter + Moons */}
      <Planet distance={16} speed={0.15} size={1.2} planetColor="#D09E6D" moons={2} axisTilt={0.05} />
      
      {/* Saturn + Rings */}
      <Planet distance={22} speed={0.1} size={1.0} planetColor="#EAD09D" hasRing={true} axisTilt={0.47} />
      
      {/* Uranus */}
      <Planet distance={28} speed={0.08} size={0.8} planetColor="#7DE2F7" axisTilt={1.71} />
      
      {/* Neptune */}
      <Planet distance={34} speed={0.06} size={0.8} planetColor="#4265FC" axisTilt={0.5} />
    </group>
  )
}

export default function SolarSystem() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
