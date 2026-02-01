"use client"

import BlurText from "@/components/blur-text"
import DecryptedText from "@/components/decrypted-text"
import SpotlightCard from "@/components/spotlight-card"
import DiscordStatus from "@/components/discord-status"
import SolarSystem from "@/components/solar-system"

export default function Home() {
  return (
    <main className="relative min-h-screen text-white/90 selection:bg-white/20 selection:text-white overflow-hidden">
      {/* Background Solar System */}
      <div className="fixed inset-0 z-[-10] pointer-events-none">
        <SolarSystem />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4">
        {/* Localized Glow Background - Soft radial gradient */}
        <div 
          className="absolute pointer-events-none w-full max-w-4xl aspect-square -z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, transparent 70%)",
            filter: "blur(60px)"
          }} 
        />
        
        <div className="text-center space-y-6">
          <BlurText
            text="Amritava Kole"
            delay={150}
            animateBy="words"
            direction="top"
            className="font-dm-serif text-5xl sm:text-6xl md:text-8xl font-normal tracking-tight text-white text-center"
            applyPostAnimationShiny={true}
            shineSpeed={5}
          />
          <DecryptedText
            text="Founding Creator at YouWare"
            animateOn="view"
            speed={30}
            maxIterations={15}
            sequential={true}
            revealDirection="start"
            className="text-zinc-400 text-lg md:text-xl font-light"
            parentClassName="block font-space-mono"
            linkTarget="YouWare"
            linkHref="https://www.youware.com/profile/SyHjN1J4MsNe5jDG08GwmjUgv293"
          />
          <div className="pt-2 flex justify-center animate-in fade-in zoom-in duration-1000 delay-500 fill-mode-backwards">
            <DiscordStatus />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        <h2 className="font-dm-serif text-3xl md:text-4xl font-normal text-center mb-24 opacity-90">
          Selected Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card 0 - ThreadAI */}
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center group-hover:bg-zinc-900/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 256 256" className="text-zinc-700 transition-all duration-500 group-hover:scale-110 group-hover:text-violet-100/50">
                <path d="M200,204.5V232a8,8,0,0,1-16,0V204.5a63.67,63.67,0,0,0-35.38-57.25l-48.4-24.19A79.58,79.58,0,0,1,56,51.5V24a8,8,0,0,1,16,0V51.5a63.67,63.67,0,0,0,35.38,57.25l48.4,24.19A79.58,79.58,0,0,1,200,204.5ZM160,200H72.17a63.59,63.59,0,0,1,3.23-16h72.71a8,8,0,0,0,0-16H83.46a63.71,63.71,0,0,1,14.65-15.08A8,8,0,1,0,88.64,140,80.27,80.27,0,0,0,56,204.5V232a8,8,0,0,0,16,0V216h88a8,8,0,0,0,0-16ZM192,16a8,8,0,0,0-8,8V40H96a8,8,0,0,0,0,16h87.83a63.59,63.59,0,0,1-3.23,16H107.89a8,8,0,1,0,0,16h64.65a63.71,63.71,0,0,1-14.65,15.08,8,8,0,0,0,9.47,12.9A80.27,80.27,0,0,0,200,51.5V24A8,8,0,0,0,192,16Z"></path>
              </svg>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">ThreadAI</h3>
              <span className="px-2 py-0.5 border border-violet-500/20 text-violet-300/80 text-[10px] uppercase tracking-wider rounded-full">
                New
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Advanced AI workspace featuring nested chats, shared memory, and integrated web search. Powered by Groq for near-instant responses.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">Groq</span>
                <span className="text-[10px] font-space-mono text-zinc-500">YouBase</span>
              </div>
              <a
                href="https://threadai.youware.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>

          {/* Project Card - VibeChat */}
          <SpotlightCard spotlightColor="rgba(20, 184, 166, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center group-hover:bg-zinc-900/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 256 256" className="text-zinc-700 transition-all duration-500 group-hover:scale-110 group-hover:text-teal-100/50">
                <path d="M200,152a31.84,31.84,0,0,0-19.53,6.68l-23.11-18A31.65,31.65,0,0,0,160,128c0-.74,0-1.48-.08-2.21l13.23-4.41A32,32,0,1,0,168,104c0,.74,0,1.48.08,2.21l-13.23,4.41A32,32,0,0,0,128,96a32.59,32.59,0,0,0-5.27.44L115.89,81A32,32,0,1,0,96,88a32.59,32.59,0,0,0,5.27-.44l6.84,15.4a31.92,31.92,0,0,0-8.57,39.64L73.83,165.44a32.06,32.06,0,1,0,10.63,12l25.71-22.84a31.91,31.91,0,0,0,37.36-1.24l23.11,18A31.65,31.65,0,0,0,168,184a32,32,0,1,0,32-32Zm0-64a16,16,0,1,1-16,16A16,16,0,0,1,200,88ZM80,56A16,16,0,1,1,96,72,16,16,0,0,1,80,56ZM56,208a16,16,0,1,1,16-16A16,16,0,0,1,56,208Zm56-80a16,16,0,1,1,16,16A16,16,0,0,1,112,128Zm88,72a16,16,0,1,1,16-16A16,16,0,0,1,200,200Z"></path>
              </svg>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">VibeChat</h3>
              <span className="px-2 py-0.5 border border-teal-500/20 text-teal-300/80 text-[10px] uppercase tracking-wider rounded-full">
                Private
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              A dedicated private communication platform built specifically for vibecoders at YouWare to collaborate and share ideas.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">Next.js</span>
                <span className="text-[10px] font-space-mono text-zinc-500">Real-time</span>
              </div>
              <a
                href="https://vibechat.youware.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>

          {/* Project Card 1 - Kaoruko Chat */}
          <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5">
              <img
                src="/images/kaoruko.png"
                alt="Kaoruko Chat"
                className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">Kaoruko Chat</h3>
              <span className="px-2 py-0.5 border border-pink-500/20 text-pink-300/80 text-[10px] uppercase tracking-wider rounded-full">
                Trending
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Real time reaction chat with 100 prompts/day limit. Experience interactive conversations with immediate
              reactions.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">React</span>
                <span className="text-[10px] font-space-mono text-zinc-500">AI</span>
              </div>
              <a
                href="https://kaoruko.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>

          {/* Project Card 2 - Black Hole Simulation */}
          <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center">
              <img
                src="/images/blackhole.svg"
                alt="Black Hole Simulation"
                className="w-16 h-16 opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">Black Hole Sim</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Real time interactive blackhole simulation with Three.js, with planetary and star experiments.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">Three.js</span>
                <span className="text-[10px] font-space-mono text-zinc-500">Physics</span>
              </div>
              <a
                href="https://blackholeinspace.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>

          {/* Project Card 3 - GroqChat UI */}
          <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center">
              <img
                src="/images/groqchat.svg"
                alt="GroqChat UI"
                className="w-16 h-16 opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">GroqChat UI</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              A research project exploring chain of thought reasoning in conversational AI interfaces using Groq's API.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">Prompt Research</span>
              </div>
              <a
                href="https://chatgroq.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>

          {/* Project Card 4 - Roulette Protocol */}
          <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.15)">
            <div className="aspect-video bg-zinc-950/80 rounded-xl mb-6 overflow-hidden border border-white/5 flex items-center justify-center group-hover:bg-zinc-900/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 256 256" className="text-zinc-700 transition-all duration-500 group-hover:scale-110 group-hover:text-green-100/50">
                <path d="M224,128H32a16,16,0,0,0-16,16v32a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V144A16,16,0,0,0,224,128ZM32,144H80v32H32Zm192,32H96V144H224v32ZM201,60.08c8-14.23,7.42-21.71,6.36-24.91a7.79,7.79,0,0,0-2.64-3.86,8,8,0,1,1,6.5-14.62,22.57,22.57,0,0,1,11.32,13.44c3.36,10.14.81,22.85-7.6,37.79-8,14.23-7.42,21.72-6.36,24.91a7.79,7.79,0,0,0,2.64,3.86,8,8,0,1,1-6.5,14.62,22.57,22.57,0,0,1-11.32-13.44C190.07,87.73,192.62,75,201,60.08Zm-40,0c8-14.23,7.42-21.71,6.36-24.91a7.79,7.79,0,0,0-2.64-3.86,8,8,0,1,1,6.5-14.62,22.57,22.57,0,0,1,11.32,13.44c3.36,10.14.81,22.85-7.6,37.79-8,14.23-7.42,21.72-6.36,24.91a7.79,7.79,0,0,0,2.64,3.86,8,8,0,1,1-6.5,14.62,22.57,22.57,0,0,1-11.32-13.44C150.07,87.73,152.62,75,161,60.08Z"></path>
              </svg>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-dm-serif text-xl font-medium tracking-wide">Roulette Protocol</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              A high-stakes survival game built with Three.js. Face off against the dealer in a life-risking encounter where every choice counts.
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-[10px] font-space-mono text-zinc-500">Three.js</span>
                <span className="text-[10px] font-space-mono text-zinc-500">Game</span>
              </div>
              <a
                href="https://ezroulette.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                View Project →
              </a>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Connect Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* Left Column: Get in Touch */}
          <div className="flex flex-col items-center space-y-8">
            <h2 className="font-dm-serif text-3xl font-normal text-white text-center opacity-80">
              Get in Touch
            </h2>
            <div className="flex items-center justify-center gap-8 w-full">
              <a
                href="mailto:amritavakole@gmail.com"
                className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-[1.001]"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                </svg>
              </a>
              <a
                href="https://x.com/itsawme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-[1.001]"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/awmie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-[1.001]"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Music Embed */}
          <div className="w-full mx-auto md:ml-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="175" 
              style={{width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px'}} 
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/in/album/save-your-tears/1499378108?i=1499378613&theme=dark">
            </iframe>
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="175" 
              style={{width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px'}} 
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/in/album/cry-for-me/1795692220?i=1795692222&theme=dark">
            </iframe>
          </div>
        </div>
      </section>
    </main>
  )
}
