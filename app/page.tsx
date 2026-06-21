"use client"

import DiscordStatus from "@/components/discord-status"
import Terminal from "@/components/terminal"
import { useState } from "react"

interface Project {
  name: string
  description: string
  tech: string[]
  url: string
  status: "active" | "private" | "archived"
}

const projects: Project[] = [
  {
    name: "kaoruko",
    description: "Real-time reaction chat with prompt limits",
    tech: ["react", "ai", "firebase"],
    url: "https://kaoruko.vercel.app/",
    status: "active"
  },
  {
    name: "blackhole-sim",
    description: "Interactive black hole simulation with Three.js",
    tech: ["three.js", "webgl", "physics"],
    url: "https://awmie.github.io/blackhole/",
    status: "active"
  },
  {
    name: "groqchat-ui",
    description: "Chain of thought reasoning research interface",
    tech: ["prompt-engineering", "groq", "research"],
    url: "https://chatgroq.vercel.app/",
    status: "archived"
  },
  {
    name: "roulette-protocol",
    description: "Survival game with Three.js",
    tech: ["three.js", "game", "interactive"],
    url: "https://ezroulette.vercel.app",
    status: "active"
  }
]

const socials = [
  { name: "github", url: "https://github.com/awmie", handle: "@awmie" },
  { name: "twitter", url: "https://x.com/itsawme", handle: "@itsawme" },
  { name: "email", url: "mailto:amritavakole@gmail.com", handle: "amritavakole@gmail.com" }
]

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono text-xs sm:text-sm md:text-base">
      <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Terminal Header */}
        <header className="mb-4 sm:mb-6 md:mb-8 border-b border-green-900/30 pb-3 sm:pb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-600 text-[10px] sm:text-xs mb-2 sm:mb-4">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></span>
            <span className="ml-2 opacity-50">awmie@computer — bash</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm md:text-base">
            <span className="text-green-500">awmie@computer:~$</span>
            <span className="text-green-200">whoami</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4">
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-green-300">
              Amritava Kole
            </h1>
            <p className="text-green-500/80 text-sm sm:text-base">
              awkwardly building things on the internet
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 pt-1 sm:pt-2 overflow-x-auto">
            <DiscordStatus />
          </div>

          <div className="text-green-600/60 text-[10px] sm:text-xs pt-2 sm:pt-4 space-y-0.5 sm:space-y-1">
            <p>Location: India</p>
            <p>Role: Developer</p>
            <p>Focus: AI, WebGL, Real-time Systems</p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 flex-wrap text-xs sm:text-sm md:text-base">
            <span className="text-green-500">awmie@computer:~$</span>
            <span className="text-green-200">ls -la projects/</span>
          </div>

          <div className="space-y-0.5 sm:space-y-1 overflow-x-auto">
            {/* Header row */}
            <div className="hidden sm:grid sm:grid-cols-12 gap-1 sm:gap-2 text-green-700 text-[10px] sm:text-xs border-b border-green-900/30 pb-1.5 sm:pb-2 mb-1.5 sm:mb-2">
              <span className="col-span-3 md:col-span-2">permissions</span>
              <span className="col-span-1">status</span>
              <span className="col-span-3 md:col-span-3">name</span>
              <span className="col-span-5 md:col-span-6">description</span>
            </div>

            {/* Project rows */}
            {projects.map((project) => (
              <div 
                key={project.name}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2 py-2 sm:py-2 px-1.5 sm:px-2 -mx-1 sm:-mx-2 transition-colors cursor-pointer border-b sm:border-0 border-green-900/20 sm:hover:bg-green-900/20 ${
                  hoveredProject === project.name ? 'bg-green-900/20' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.name)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Mobile view */}
                <div className="sm:hidden space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] ${
                      project.status === 'active' ? 'text-green-400' : 
                      project.status === 'private' ? 'text-yellow-500' : 'text-gray-500'
                    }`}>
                      [{project.status === 'active' ? 'run' : project.status === 'private' ? 'priv' : 'arc'}]
                    </span>
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link font-medium text-sm"
                    >
                      {project.name}/
                    </a>
                  </div>
                  <p className="text-green-500/70 text-xs pl-0">
                    {project.description}
                  </p>
                  <p className="text-green-600/60 text-[10px]">
                    [{project.tech.join(', ')}]
                  </p>
                </div>
                
                {/* Desktop view */}
                <span className="hidden sm:block col-span-3 md:col-span-2 text-green-600 font-mono text-[10px] sm:text-xs md:text-sm">
                  drwxr-xr-x
                </span>
                <span className={`hidden sm:block col-span-1 text-[10px] sm:text-xs ${
                  project.status === 'active' ? 'text-green-400' : 
                  project.status === 'private' ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {project.status === 'active' ? '[run]' : 
                   project.status === 'private' ? '[priv]' : '[arc]'}
                </span>
                <span className="hidden sm:block col-span-3 md:col-span-3">
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link font-medium"
                  >
                    {project.name}/
                  </a>
                </span>
                <span className="hidden sm:block col-span-5 md:col-span-6 text-green-500/70 text-[10px] sm:text-xs md:text-sm truncate">
                  {project.description}
                  {hoveredProject === project.name && (
                    <span className="text-green-600 ml-2">
                      [{project.tech.join(', ')}]
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 flex-wrap text-xs sm:text-sm md:text-base">
            <span className="text-green-500">awmie@computer:~$</span>
            <span className="text-green-200">cat contact.txt</span>
          </div>

          <div className="space-y-2 sm:space-y-3 text-green-400/80 text-xs sm:text-sm">
            {socials.map((social) => (
              <div key={social.name} className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4">
                <span className="text-green-600 w-auto sm:w-20 text-[10px] sm:text-sm">{social.name}:</span>
                <a 
                  href={social.url}
                  target={social.name !== 'email' ? '_blank' : undefined}
                  rel={social.name !== 'email' ? 'noopener noreferrer' : undefined}
                  className="terminal-link break-all"
                >
                  {social.handle}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Terminal Section */}
        <section className="mb-8 sm:mb-10 md:mb-12 h-80 sm:h-96">
          <Terminal />
        </section>

        {/* Footer - Sticky at bottom */}
        <footer className="sticky bottom-0 bg-black pt-4 sm:pt-6 md:pt-8 border-t border-green-900/30">
          <p className="text-green-700/50 text-[10px] sm:text-xs">
            # Built with Next.js + TypeScript + Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  )
}
