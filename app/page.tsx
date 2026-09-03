import dynamic from "next/dynamic"
import Nav from "@/components/Nav"
import Marquee from "@/components/Marquee"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Gallery from "@/components/Gallery"
import Skills from "@/components/Skills"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import HeroContent from "@/components/HeroContent"
import ClientHero from "@/components/ClientHero"
import NoiseOverlay from "@/components/NoiseOverlay"
import CursorGlow from "@/components/CursorGlow"

/* The WebGL hero is lazy-loaded client-side (see ClientHero) so three.js
   stays out of the initial HTML and never blocks first paint. */

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero — layered: the WebGL canvas sits behind, the name/content above.
          HeroContent renders the single <h1> on the page (the name). */}
      <header id="top" className="relative min-h-screen">
        <div className="absolute inset-0">
          <ClientHero />
        </div>
        <div className="relative z-10 flex min-h-screen items-center">
          <HeroContent />
        </div>
      </header>

      <Marquee />
      <About />
      <Projects />
      <Gallery />
      <Skills />
      <Contact />
      <Footer />
      <NoiseOverlay />
      <CursorGlow />
    </main>
  )
}
