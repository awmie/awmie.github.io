"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

/* Light/dark toggle. Sets data-theme on <html>, persists to localStorage, and
   broadcasts a `themechange` event so the WebGL hero can re-tint its base. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-theme")
    setTheme(cur === "dark" ? "dark" : "light")
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    // The permanent base `*` color transition (globals.css) eases the whole
    // page on this change — no temporary class needed (that class was the
    // thing causing the snap).
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="group relative inline-flex items-center px-1.5 py-1 text-bone hover:text-accent sm:px-2"
    >
      {theme === "dark" ? (
        <Sun className="h-[15px] w-[15px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[15px] w-[15px]" strokeWidth={1.75} />
      )}
    </button>
  )
}
