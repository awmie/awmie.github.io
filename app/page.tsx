import dynamic from "next/dynamic"
import Nav from "@/components/Nav"
import TextLoop from "@/components/TextLoop"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import HeroContent from "@/components/HeroContent"
import ClientHero from "@/components/ClientHero"
import NoiseOverlay from "@/components/NoiseOverlay"
import { stack } from "@/lib/content"

/* The WebGL hero is lazy-loaded client-side (see ClientHero) so three.js
   stays out of the initial HTML and never blocks first paint. */

export default function Home() {
  return (
    <main>
      <Nav />

      {/* Hero — layered: the WebGL canvas sits behind, the name/content above.
          HeroContent renders the single <h1> on the page (the name). */}
      <header id="top" className="relative min-h-screen md:min-h-[120vh]">
        <div className="absolute inset-0">
          <ClientHero />
        </div>
        <div className="relative z-10 flex min-h-screen items-center">
          <HeroContent />
        </div>
      </header>

      {/* Stack loop riding just below the hero, above the About section */}
      <div className="relative z-10 -mt-8 md:-mt-[110px]">
        <TextLoop
          text={stack.join(" ✦ ")}
          shape="wave"
          speed={45}
          direction="forward"
          separator="✦"
          curviness={10}
          fontSize={22}
          fontWeight={400}
          letterSpacing={1}
          uppercase
          color="#f6f1e4"
          ribbon
          ribbonColor="var(--accent)"
          ribbonWidth={46}
          pauseOnHover
        />
      </div>

      <About />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
      <NoiseOverlay />
    </main>
  )
}
