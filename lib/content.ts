export interface Project {
  name: string
  index: string
  tagline: string
  description: string
  tech: string[]
  url: string
  status: "active" | "archived"
}

export const site = {
  name: "Amritava Kole",
  handle: "awmie",
  tagline: "Building AI, WebGL and real-time systems.",
  location: "India",
  role: "Developer",
  focus: ["AI", "WebGL", "Real-time Systems"],
  availability: "Open to interesting work",
  email: "amritavakole@gmail.com",
}

export const projects: Project[] = [
  {
    name: "kaoruko",
    index: "01",
    tagline: "Real-time reaction chat",
    description:
      "A live reaction chat with prompt limits — conversations that light up in real time, built around constrained AI responses.",
    tech: ["React", "AI", "Firebase"],
    url: "https://kaoruko.vercel.app/",
    status: "active",
  },
  {
    name: "blackhole-sim",
    index: "02",
    tagline: "Interactive black hole",
    description:
      "An interactive black hole simulation — gravitational lensing and physics rendered live in the browser with WebGL.",
    tech: ["Three.js", "WebGL", "Physics"],
    url: "https://awmie.github.io/blackhole/",
    status: "active",
  },
  {
    name: "groqchat-ui",
    index: "03",
    tagline: "Chain-of-thought research",
    description:
      "A research interface for chain-of-thought reasoning — exploring prompt engineering and reasoning traces on Groq.",
    tech: ["Prompt Engineering", "Groq", "Research"],
    url: "https://chatgroq.vercel.app/",
    status: "archived",
  },
  {
    name: "roulette-protocol",
    index: "04",
    tagline: "Three.js survival game",
    description:
      "A browser survival game — a tense, interactive ride through a Three.js scene.",
    tech: ["Three.js", "Game", "Interactive"],
    url: "https://ezroulette.vercel.app",
    status: "active",
  },
]

export const socials = [
  { name: "GitHub", handle: "@awmie", url: "https://github.com/awmie" },
  { name: "Twitter", handle: "@itsawme", url: "https://x.com/itsawme" },
  { name: "Email", handle: "amritavakole@gmail.com", url: "mailto:amritavakole@gmail.com" },
]

export const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Three.js",
  "WebGL",
  "Tailwind",
  "Firebase",
  "WebSockets",
]

interface Photo {
  src: string
  alt: string
}

/* Horizontal-scroll gallery images. Placeholder grayscale shots — swap the
   URLs for your own photos (any hosted image, e.g. /photos/01.jpg). */
export const photos: Photo[] = [
  { src: "https://picsum.photos/id/1018/1000/1250?grayscale", alt: "Mountain ridge" },
  { src: "https://picsum.photos/id/1015/1000/1250?grayscale", alt: "River through a valley" },
  { src: "https://picsum.photos/id/1035/1000/1250?grayscale", alt: "Misty mountain lake" },
  { src: "https://picsum.photos/id/1043/1000/1250?grayscale", alt: "Street scene" },
  { src: "https://picsum.photos/id/1074/1000/1250?grayscale", alt: "Coastline" },
  { src: "https://picsum.photos/id/1084/1000/1250?grayscale", alt: "Wet road at dusk" },
]
