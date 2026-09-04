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

/* "Selected frames" — your own photos, served from /public/photos (resized to
   800×800 squares). Drop new shots in there and add them here. */
export const photos: Photo[] = [
  { src: "/photos/frame-1.jpg", alt: "Frame 01" },
  { src: "/photos/frame-2.jpg", alt: "Frame 02" },
  { src: "/photos/frame-3.jpg", alt: "Frame 03" },
  { src: "/photos/frame-4.jpg", alt: "Frame 04" },
]
