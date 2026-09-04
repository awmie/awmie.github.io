import BounceCards from "@/components/BounceCards"
import Reveal from "@/components/Reveal"
import { photos } from "@/lib/content"

/* Photos section — a GSAP BounceCards stack: the frames bounce in on load
   and push apart on hover. Images come from the shared content source. */

const images = photos.map((p) => p.src)

const transformStyles = [
  "rotate(-7deg) translate(-210px)",
  "rotate(-2.5deg) translate(-70px)",
  "rotate(2.5deg) translate(70px)",
  "rotate(7deg) translate(210px)",
]

export default function Gallery() {
  return (
    <section id="photos" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-16 flex items-center justify-between">
            <h2 className="font-pixel text-[10px] uppercase tracking-wide text-accent">
              Selected frames
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-wide text-dim">
              {String(photos.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex justify-center py-10">
            <BounceCards
              images={images}
              containerWidth={520}
              containerHeight={260}
              animationDelay={0.2}
              animationStagger={0.08}
              easeType="elastic.out(1, 0.5)"
              transformStyles={transformStyles}
              enableHover={true}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
