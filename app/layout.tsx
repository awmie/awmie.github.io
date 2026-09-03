import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Amritava Kole — awmie · Developer";
const description = `${site.name} (${site.handle}) — a developer in ${site.location} building ${site.focus.join(", ")}. An interactive, WebGL-driven portfolio.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://awmie.github.io"),
  title: {
    default: title,
    template: "%s — awmie",
  },
  description,
  keywords: [
    "Amritava Kole",
    "awmie",
    "developer portfolio",
    "WebGL",
    "Three.js",
    "AI",
    "real-time",
    "India",
  ],
  authors: [{ name: "Amritava Kole", url: "https://awmie.github.io" }],
  alternates: { canonical: "https://awmie.github.io/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://awmie.github.io/",
    siteName: "awmie",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "awmie portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@itsawme",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${pixel.variable} ${sans.variable} ${mono.variable}`}>
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`}
      </Script>
      <body className="font-sans antialiased bg-ink text-bone">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              alternateName: site.handle,
              url: "https://awmie.github.io/",
              email: `mailto:${site.email}`,
              jobTitle: site.role,
              address: { "@type": "PostalAddress", addressCountry: "IN" },
              sameAs: ["https://github.com/awmie", "https://x.com/itsawme"],
              knowsAbout: site.focus,
            }),
          }}
        />
      </body>
    </html>
  );
}
