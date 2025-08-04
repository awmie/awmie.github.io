"use client"

import Silk from "@/components/silk"
import BlurText from "@/components/blur-text"
import DecryptedText from "@/components/decrypted-text" // Import the new component
import CurvedLoop from "@/components/curved-loop"
import SpotlightCard from "@/components/spotlight-card" // Ensure this import is correct
import { DM_Serif_Text } from "next/font/google"

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400", "400"],
  display: "swap",
})

export default function Home() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!")
  }

  return (
    <main className="relative w-full min-h-screen">
      {/* The Silk component will act as the fixed full-screen background */}
      <div className="fixed inset-0 z-0">
        <Silk speed={5} scale={0.1} color="#0000FF" noiseIntensity={7} rotation={0} />
      </div>

      {/* Scrollable content overlaying the Silk background */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-screen text-white">
          <BlurText
            text="Amritava Kole"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className={`${dmSerifText.className} text-5xl font-bold mb-8`}
            applyPostAnimationShiny={true} // Enable the shiny effect after blur
            shineSpeed={5} // Set the speed for the shine animation
          />
          <DecryptedText
            text="Founding Creator at YouWare"
            animateOn="view"
            speed={30}
            maxIterations={15}
            sequential={true}
            revealDirection="start"
            className="text-white/80 text-lg"
            parentClassName="block text-center mt-2 font-space-mono" // Applied Space Mono font
            linkTarget="YouWare" // Specify the word to link
            linkHref="https://www.youware.com/profile/SyHjN1J4MsNe5jDG08GwmjUgv293" // Specify the link URL
          />
          <CurvedLoop
            marqueeText="Live ✦ Projects ✦"
            speed={2}
            curveAmount={100}
            direction="right"
            interactive={true}
            className={`${dmSerifText.className} mt-16`}
          />
        </div>

        {/* Projects Section */}
        <div className="min-h-screen px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className={`${dmSerifText.className} text-4xl font-bold text-white text-center mb-16`}>
              Featured Projects
            </h2>

            <div className="flex flex-wrap justify-center gap-8">
              {/* Project Card 1 - Kaoruko Chat */}
              <SpotlightCard className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]" spotlightColor="rgba(236, 72, 153, 0.2)" rotateAmplitude={5.5} scaleOnHover={1.05}>
                <div className="aspect-video bg-white/5 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/kaoruko.png"
                    alt="Kaoruko Chat project image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`${dmSerifText.className} text-xl font-bold text-white`}>Kaoruko Chat</h3>
                  <span className="px-2 py-1 bg-red-500/20 text-red-200 text-xs rounded-full">trending</span>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Real time reaction chat with 100 prompts/day limit. Experience interactive conversations with immediate reactions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full">
                    Prompt Engineering
                  </span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-200 text-xs rounded-full">Real-time</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded-full">Fullstack</span>
                </div>
                <a
                  href="https://kaoruko.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white rounded-full transition-colors duration-200 text-center"
                >
                  View Project
                </a>
              </SpotlightCard>

              {/* Project Card 2 - Anime Waifu Chat */}
              <SpotlightCard className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]" spotlightColor="rgba(0, 229, 255, 0.2)" rotateAmplitude={5.5} scaleOnHover={1.05}>
                <div className="aspect-video bg-white/5 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/nami.jpeg"
                    alt="Anime Waifu Chat project image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`${dmSerifText.className} text-xl font-bold text-white`}>Anime Waifu Chat</h3>
                  <span className="px-2 py-1 bg-red-500/20 text-red-200 text-xs rounded-full">trending</span>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  A free chat system possible due to g4f package (open source) integrated with simple flask app.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full">
                    Prompt Engineering
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded-full">Fullstack</span>
                </div>
                <a
                  href="https://namiswan.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white rounded-full transition-colors duration-200 text-center"
                >
                  View Project
                </a>
              </SpotlightCard>

              {/* Project Card 3 - Black Hole Simulation */}
              <SpotlightCard className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]" spotlightColor="rgba(147, 51, 234, 0.2)" rotateAmplitude={5.5} scaleOnHover={1.05}>
                <div className="aspect-video bg-white/5 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/blackhole.jpeg"
                    alt="Black Hole Simulation project image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${dmSerifText.className} text-xl font-bold text-white mb-2`}>Black Hole Simulation</h3>
                <p className="text-white/80 text-sm mb-4">
                  Real time interactive blackhole simulation with three js, with planetary and star experiments, gravity
                  based physics.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full">Maths</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-200 text-xs rounded-full">Three.js</span>
                </div>
                <a
                  href="https://blackholeinspace.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white rounded-full transition-colors duration-200 text-center"
                >
                  View Project
                </a>
              </SpotlightCard>
              
              {/* Project Card 4 - MirrorVerse */}
              <SpotlightCard className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]" spotlightColor="rgba(34, 197, 94, 0.2)" rotateAmplitude={5.5} scaleOnHover={1.05}>
                <div className="aspect-video bg-white/5 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/mirrorverse.jpeg"
                    alt="MirrorVerse project image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${dmSerifText.className} text-xl font-bold text-white mb-2`}>MirrorVerse</h3>
                <p className="text-white/80 text-sm mb-4">
                  Make interactive persona of anything and watch it interact with other personas.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded-full">Fullstack</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-200 text-xs rounded-full">API SDK</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full">
                    Prompt Engineering
                  </span>
                </div>
                <a
                  href="https://mirrorverse.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white rounded-full transition-colors duration-200 text-center"
                >
                  View Project
                </a>
              </SpotlightCard>
              
              {/* Project Card 5 - GroqChat UI */}
              <SpotlightCard className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)]" spotlightColor="rgba(251, 191, 36, 0.2)" rotateAmplitude={5.5} scaleOnHover={1.05}>
                <div className="aspect-video bg-white/5 rounded-3xl mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/COT.png"
                    alt="GroqChat UI project image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`${dmSerifText.className} text-xl font-bold text-white mb-2`}>GroqChat UI with Chain of Thoughts</h3>
                <p className="text-white/80 text-sm mb-4">
                  A research project exploring chain of thought reasoning in conversational AI interfaces using Groq's API.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-200 text-xs rounded-full">Research</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full">AI</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full">UI/UX</span>
                </div>
                <a
                  href="https://chatgroq.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white rounded-full transition-colors duration-200 text-center"
                >
                  View Project
                </a>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="min-h-screen px-8 py-20 flex flex-col items-center justify-center">
          <h2 className={`${dmSerifText.className} text-4xl font-bold text-white text-center mb-16`}>Connect</h2>
          <div className="flex flex-col items-center gap-4">
            <DecryptedText
              text="mail: amritavakole@gmail.com"
              animateOn="view"
              speed={30}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              className="text-white/80 text-lg"
              parentClassName="block text-center font-space-mono"
              linkTarget="amritavakole@gmail.com"
              linkHref="mailto:amritavakole@gmail.com"
            />
            <DecryptedText
              text="X: @itsawme"
              animateOn="view"
              speed={30}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              className="text-white/80 text-lg"
              parentClassName="block text-center font-space-mono"
              linkTarget="@itsawme"
              linkHref="https://x.com/itsawme"
            />
            <DecryptedText
              text="github: @awmie"
              animateOn="view"
              speed={30}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              className="text-white/80 text-lg"
              parentClassName="block text-center font-space-mono"
              linkTarget="@awmie"
              linkHref="https://github.com/awmie"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
