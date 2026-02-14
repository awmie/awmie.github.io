"use client"

import { useState, useRef, KeyboardEvent, useEffect, useMemo } from "react"

interface FileSystemItem {
  name: string
  type: "file" | "directory"
  content?: string[]
  url?: string
  children?: { [key: string]: FileSystemItem }
}

type ColorType = "green" | "yellow" | "orange" | "red" | "cyan" | "dim" | "white" | "purple"

interface ColoredSegment {
  text: string
  color: ColorType
}

interface Command {
  input: string
  output: ColoredSegment[][]
  isError?: boolean
  prompt: string
}

const colorMap: Record<ColorType, string> = {
  green: "text-green-400",
  yellow: "text-yellow-400",
  orange: "text-orange-400",
  red: "text-red-400",
  cyan: "text-cyan-400",
  dim: "text-green-600/60",
  white: "text-green-200",
  purple: "text-purple-400"
}

const segment = (text: string, color: ColorType = "green"): ColoredSegment => ({ text, color })
const line = (...segments: ColoredSegment[]): ColoredSegment[] => segments

function getSystemInfo() {
  const nav = typeof navigator !== "undefined" ? navigator : null
  const screen = typeof window !== "undefined" ? window.screen : null
  
  const ua = nav?.userAgent || ""
  
  let browser = "Unknown"
  if (ua.includes("Firefox")) browser = "Firefox"
  else if (ua.includes("Chrome")) browser = "Chrome"
  else if (ua.includes("Safari")) browser = "Safari"
  else if (ua.includes("Edge")) browser = "Edge"
  
  let os = "Unknown"
  if (ua.includes("Mac")) os = "macOS"
  else if (ua.includes("Windows")) os = "Windows"
  else if (ua.includes("Linux")) os = "Linux"
  else if (ua.includes("Android")) os = "Android"
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS"
  
  const cores = nav?.hardwareConcurrency || "Unknown"
  const memory = (nav as any)?.deviceMemory ? `${(nav as any).deviceMemory} GB` : "Unknown"
  const resolution = screen ? `${screen.width}x${screen.height}` : "Unknown"
  
  return { browser, os, cores, memory, resolution }
}

function getUptime(pageLoadTime: number, currentTime: number) {
  const diff = currentTime - pageLoadTime
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`
  if (hours > 0) return `${hours}h ${minutes % 60}m`
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`
  return `${seconds}s`
}

function parseMarkdown(content: string): ColoredSegment[][] {
  const lines = content.split("\n")
  return lines.map(lineText => {
    const segments: ColoredSegment[] = []
    
    if (lineText.startsWith("# ")) {
      segments.push(segment(lineText, "yellow"))
      segments.push(segment(" ", "green"))
    } else if (lineText.startsWith("## ")) {
      segments.push(segment(lineText, "yellow"))
      segments.push(segment(" ", "green"))
    } else if (lineText.startsWith("### ")) {
      segments.push(segment(lineText, "yellow"))
      segments.push(segment(" ", "green"))
    } else if (lineText.match(/^[-*]\s/)) {
      segments.push(segment(lineText[0], "yellow"))
      segments.push(segment(" ", "green"))
      let remaining = lineText.slice(2)
      while (remaining) {
        const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
        if (boldMatch) {
          segments.push(segment(boldMatch[1], "white"))
          remaining = remaining.slice(boldMatch[0].length)
          continue
        }
        const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/)
        if (linkMatch) {
          segments.push(segment(linkMatch[1], "cyan"))
          remaining = remaining.slice(linkMatch[0].length)
          continue
        }
        segments.push(segment(remaining[0], "green"))
        remaining = remaining.slice(1)
      }
    } else {
      let remaining = lineText
      while (remaining) {
        const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
        if (boldMatch) {
          segments.push(segment(boldMatch[1], "white"))
          remaining = remaining.slice(boldMatch[0].length)
          continue
        }
        const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
        if (linkMatch) {
          segments.push(segment(linkMatch[1], "cyan"))
          remaining = remaining.slice(linkMatch[0].length)
          continue
        }
        const codeMatch = remaining.match(/^`([^`]+)`/)
        if (codeMatch) {
          segments.push(segment(codeMatch[1], "dim"))
          remaining = remaining.slice(codeMatch[0].length)
          continue
        }
        segments.push(segment(remaining[0], "green"))
        remaining = remaining.slice(1)
      }
    }
    
    return segments.length > 0 ? segments : [segment(" ", "green")]
  })
}

function stringArrayToColored(output: string[], defaultColor: ColorType = "green"): ColoredSegment[][] {
  return output.map(line => [segment(line, defaultColor)])
}

const FILE_SYSTEM: FileSystemItem = {
  name: "~",
  type: "directory",
  children: {
    "about": {
      name: "about",
      type: "directory",
      children: {
        "bio.txt": {
          name: "bio.txt",
          type: "file",
          content: [
            "Amritava Kole",
            "",
            "Founding Creator at YouWare",
            "Developer based in India",
            "",
            "Focus: AI, WebGL, Real-time Systems",
            "Building cool things with TypeScript and React"
          ]
        },
        "location.txt": {
          name: "location.txt",
          type: "file",
          content: ["Location: India", "Timezone: IST (UTC+5:30)"]
        },
        "stack.txt": {
          name: "stack.txt",
          type: "file",
          content: [
            "Primary Stack:",
            "- TypeScript",
            "- React / Next.js",
            "- Node.js",
            "- Three.js / WebGL",
            "- Tailwind CSS"
          ]
        }
      }
    },
    "projects": {
      name: "projects",
      type: "directory",
      children: {
        "threadai": {
          name: "threadai",
          type: "directory",
          url: "https://threadai.youware.app/",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# ThreadAI",
                "",
                "AI workspace featuring nested chats, shared memory, and integrated web search.",
                "",
                "## Tech Stack",
                "- React",
                "- TypeScript",
                "- Groq",
                "",
                "## Status",
                "Active"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["React, TypeScript, Groq, YouBase"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://threadai.youware.app/"]
            }
          }
        },
        "vibechat": {
          name: "vibechat",
          type: "directory",
          url: "https://vibechat.youware.app/",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# VibeChat",
                "",
                "A dedicated private communication platform built specifically for vibecoders at YouWare.",
                "",
                "## Tech Stack",
                "- Next.js",
                "- Real-time",
                "- WebSockets",
                "",
                "## Status",
                "Private"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["Next.js, Real-time, WebSockets"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://vibechat.youware.app/"]
            }
          }
        },
        "kaoruko": {
          name: "kaoruko",
          type: "directory",
          url: "https://kaoruko.vercel.app/",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# Kaoruko Chat",
                "",
                "Real time reaction chat with 100 prompts/day limit.",
                "Experience interactive conversations with immediate reactions.",
                "",
                "## Tech Stack",
                "- React",
                "- AI",
                "- Firebase",
                "",
                "## Status",
                "Active / Trending"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["React, AI, Firebase"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://kaoruko.vercel.app/"]
            }
          }
        },
        "blackhole-sim": {
          name: "blackhole-sim",
          type: "directory",
          url: "https://blackholeinspace.vercel.app",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# Black Hole Simulation",
                "",
                "Real time interactive blackhole simulation with Three.js.",
                "Features planetary and star experiments.",
                "",
                "## Tech Stack",
                "- Three.js",
                "- WebGL",
                "- Physics",
                "",
                "## Status",
                "Active"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["Three.js, WebGL, Physics"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://blackholeinspace.vercel.app"]
            }
          }
        },
        "groqchat-ui": {
          name: "groqchat-ui",
          type: "directory",
          url: "https://chatgroq.vercel.app/",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# GroqChat UI",
                "",
                "A research project exploring chain of thought reasoning in conversational AI interfaces.",
                "",
                "## Tech Stack",
                "- Prompt Engineering",
                "- Groq API",
                "- Research",
                "",
                "## Status",
                "Archived"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["Prompt Engineering, Groq, Research"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://chatgroq.vercel.app/"]
            }
          }
        },
        "roulette-protocol": {
          name: "roulette-protocol",
          type: "directory",
          url: "https://ezroulette.vercel.app",
          children: {
            "README.md": {
              name: "README.md",
              type: "file",
              content: [
                "# Roulette Protocol",
                "",
                "A high-stakes survival game built with Three.js.",
                "Face off against the dealer in a life-risking encounter.",
                "",
                "## Tech Stack",
                "- Three.js",
                "- Game",
                "- Interactive",
                "",
                "## Status",
                "Active"
              ]
            },
            "tech.txt": {
              name: "tech.txt",
              type: "file",
              content: ["Three.js, Game, Interactive"]
            },
            "url.txt": {
              name: "url.txt",
              type: "file",
              content: ["https://ezroulette.vercel.app"]
            }
          }
        }
      }
    },
    "contact": {
      name: "contact",
      type: "directory",
      children: {
        "github.txt": {
          name: "github.txt",
          type: "file",
          content: ["GitHub: @awmie", "URL: https://github.com/awmie"]
        },
        "twitter.txt": {
          name: "twitter.txt",
          type: "file",
          content: ["Twitter/X: @itsawme", "URL: https://x.com/itsawme"]
        },
        "email.txt": {
          name: "email.txt",
          type: "file",
          content: ["Email: amritavakole@gmail.com"]
        }
      }
    },
    "skills": {
      name: "skills",
      type: "directory",
      children: {
        "frontend.txt": {
          name: "frontend.txt",
          type: "file",
          content: [
            "Frontend Skills:",
            "- React / Next.js",
            "- TypeScript",
            "- Tailwind CSS",
            "- Three.js / WebGL",
            "- Framer Motion"
          ]
        },
        "backend.txt": {
          name: "backend.txt",
          type: "file",
          content: [
            "Backend Skills:",
            "- Node.js",
            "- Express",
            "- WebSockets",
            "- Firebase",
            "- REST APIs"
          ]
        }
      }
    },
    "tmp": {
      name: "tmp",
      type: "directory",
      children: {}
    },
    ".bashrc": {
      name: ".bashrc",
      type: "file",
      content: [
        "# ~/.bashrc",
        "",
        "# Aliases",
        "alias ll='ls -la'",
        "alias la='ls -a'",
        "alias c='clear'",
        "",
        "# Prompt",
        'PS1="\\u@\\h:\\w\\$ "'
      ]
    },
    ".vimrc": {
      name: ".vimrc",
      type: "file",
      content: [
        '" ~/.vimrc',
        "set number",
        "set mouse=a",
        "set tabstop=2",
        "set expandtab",
        "syntax on"
      ]
    },
    "README.md": {
      name: "README.md",
      type: "file",
      content: [
        "# Welcome to my Portfolio!",
        "",
        "This is a terminal-based portfolio. Navigate around using:",
        "",
        "- `ls` to list files",
        "- `cd <directory>` to change directory",
        "- `cat <file>` to read files",
        "- `open` to open project (when inside a project directory)",
        "",
        "Try `help` for more commands!"
      ]
    }
  }
}

const COMMANDS = [
  { cmd: "ls", desc: "List directory contents" },
  { cmd: "la", desc: "List all directory contents (alias: ls -a)" },
  { cmd: "ll", desc: "List with details (alias: ls -la)" },
  { cmd: "cd", desc: "Change directory" },
  { cmd: "pwd", desc: "Print working directory" },
  { cmd: "cat", desc: "Display file contents" },
  { cmd: "open", desc: "Open project URL (only works in project directories)" },
  { cmd: "c", desc: "Clear terminal (alias: clear)" },
  { cmd: "clear", desc: "Clear terminal screen" },
  { cmd: "whoami", desc: "Show current user" },
  { cmd: "date", desc: "Show current date and time" },
  { cmd: "cal", desc: "Display calendar" },
  { cmd: "echo", desc: "Print text" },
  { cmd: "neofetch", desc: "Show system info" },
  { cmd: "cowsay", desc: "ASCII cow with message" },
  { cmd: "fortune", desc: "Print random quote" },
  { cmd: "help", desc: "Show available commands" }
]

const FORTUNES = [
  "Talk is cheap. Show me the code. - Linus Torvalds",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Simplicity is the soul of efficiency. - Austin Freeman",
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "Fix the cause, not the symptom. - Steve Maguire",
  "Make it work, make it right, make it fast. - Kent Beck",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "Knowledge is power. - Francis Bacon",
  "The best way to predict the future is to implement it. - David Heinemeier Hansson"
]

export default function Terminal() {
  const [history, setHistory] = useState<Command[]>([])
  const [input, setInput] = useState("")
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new commands are added (within terminal only)
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const getCurrentDir = (): FileSystemItem => {
    let current: FileSystemItem = FILE_SYSTEM
    for (const segment of currentPath) {
      if (current.children && current.children[segment]) {
        current = current.children[segment]
      }
    }
    return current
  }

  const getFullPath = (): string => {
    if (currentPath.length === 0) return "~"
    return "~/" + currentPath.join("/")
  }

  const getPrompt = (): string => {
    const path = getFullPath()
    return `awmie@computer:${path}$`
  }

  const resolvePath = (target: string): string[] | null => {
    if (target === "~" || target === "/home/awmie") return []
    if (target === ".") return [...currentPath]
    if (target === "..") {
      if (currentPath.length === 0) return []
      return currentPath.slice(0, -1)
    }
    if (target === "-") return [...currentPath] // Previous dir (simplified)
    
    if (target.startsWith("~/")) {
      return target.slice(2).split("/").filter(Boolean)
    }
    if (target.startsWith("/")) {
      const parts = target.slice(1).split("/").filter(Boolean)
      // Check if it's within home
      if (parts[0] === "home" && parts[1] === "awmie") {
        return parts.slice(2)
      }
      return null // Outside home not allowed
    }
    
    // Relative path
    return [...currentPath, ...target.split("/").filter(Boolean)]
  }

  const findCommonPrefix = (strings: string[]): string => {
    if (strings.length === 0) return ""
    if (strings.length === 1) return strings[0]
    
    let prefix = strings[0]
    for (let i = 1; i < strings.length; i++) {
      while (!strings[i].startsWith(prefix) && prefix.length > 0) {
        prefix = prefix.slice(0, -1)
      }
      if (prefix.length === 0) break
    }
    return prefix
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const parts = trimmedCmd.split(/\s+/)
    const baseCmd = parts[0]?.toLowerCase() || ""
    const args = parts.slice(1)

    let output: ColoredSegment[][] = []
    let isError = false

    const addOutput = (...lines: string[]) => {
      output = lines.map(l => [segment(l, "green")])
    }
    const addError = (...lines: string[]) => {
      output = lines.map(l => [segment(l, "red")])
      isError = true
    }

    switch (baseCmd) {
      case "la":
        // la shows all files including hidden (like ls -a) - no fallthrough
        {
          const laDir = getCurrentDir()
          if (laDir.children) {
            const items = Object.values(laDir.children)
            const filteredItems = items.filter(item => !item.name.startsWith("."))
            const hiddenItems = items.filter(item => item.name.startsWith("."))
            const allItems = [...filteredItems, ...hiddenItems]
            
            if (allItems.length > 0) {
              const lineSegments: ColoredSegment[] = []
              allItems.forEach((item, idx) => {
                if (idx > 0) lineSegments.push(segment("  ", "green"))
                const color = item.name.startsWith(".") ? "dim" : (item.type === "directory" ? "yellow" : "green")
                lineSegments.push(segment(item.name + (item.type === "directory" ? "/" : ""), color))
              })
              output.push(lineSegments)
            }
          }
        }
        break
      case "ll":
        // ll shows all files with details (like ls -la)
        {
          const llDir = getCurrentDir()
          if (llDir.children) {
            const items = Object.values(llDir.children)
            output.push([segment(`total ${items.length}`, "dim")])
            
            items.forEach(item => {
              const perm = item.type === "directory" ? "drwxr-xr-x" : "-rw-r--r--"
              const nameColor = item.name.startsWith(".") ? "dim" : (item.type === "directory" ? "yellow" : "green")
              output.push([
                segment(`${perm} 1 awmie awmie 4096 Jan 15 10:30 `, "dim"),
                segment(item.name + (item.type === "directory" ? "/" : ""), nameColor)
              ])
            })
          }
        }
        break
      case "ls":
        const currentDir = getCurrentDir()
        if (currentDir.children) {
          const items = Object.values(currentDir.children)
          const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al")
          const showLong = args.includes("-l") || args.includes("-la") || args.includes("-al")
          
          if (showLong) {
            output.push([segment(`total ${items.length}`, "dim")])
            
            items.forEach(item => {
              if (!showAll && item.name.startsWith(".")) return
              const perm = item.type === "directory" ? "drwxr-xr-x" : "-rw-r--r--"
              const nameColor = item.name.startsWith(".") ? "dim" : (item.type === "directory" ? "yellow" : "green")
              output.push([
                segment(`${perm} 1 awmie awmie 4096 Jan 15 10:30 `, "dim"),
                segment(item.name + (item.type === "directory" ? "/" : ""), nameColor)
              ])
            })
          } else {
            const filteredItems = items.filter(item => showAll || !item.name.startsWith("."))
            if (filteredItems.length > 0) {
              const lineSegments: ColoredSegment[] = []
              filteredItems.forEach((item, idx) => {
                if (idx > 0) lineSegments.push(segment("  ", "green"))
                const nameColor = item.name.startsWith(".") ? "dim" : (item.type === "directory" ? "yellow" : "green")
                lineSegments.push(segment(item.name + (item.type === "directory" ? "/" : ""), nameColor))
              })
              output.push(lineSegments)
            }
          }
        }
        break

      case "cd":
        const target = args[0] || "~"
        const newPath = resolvePath(target)
        
        if (newPath === null) {
          addError(`bash: cd: ${target}: Permission denied`)
        } else {
          let checkDir: FileSystemItem = FILE_SYSTEM
          let exists = true
          
          for (const seg of newPath) {
            if (checkDir.children && checkDir.children[seg] && checkDir.children[seg].type === "directory") {
              checkDir = checkDir.children[seg]
            } else {
              exists = false
              break
            }
          }
          
          if (exists) {
            setCurrentPath(newPath)
            output = []
          } else {
            addError(`bash: cd: ${target}: No such file or directory`)
          }
        }
        break

      case "pwd":
        output = [[segment("/home/awmie" + (currentPath.length > 0 ? "/" + currentPath.join("/") : ""), "green")]]
        break

      case "cat":
        const filename = args[0]
        if (!filename) {
          addError("cat: missing file operand")
        } else {
          // Resolve the path
          const resolvedPath = resolvePath(filename)
          if (resolvedPath === null) {
            addError(`cat: ${filename}: Permission denied`)
          } else {
            // Navigate to the file's directory and get the filename
            let current: FileSystemItem = FILE_SYSTEM
            let found = true
            for (let i = 0; i < resolvedPath.length - 1; i++) {
              if (current.children && current.children[resolvedPath[i]] && current.children[resolvedPath[i]].type === "directory") {
                current = current.children[resolvedPath[i]]
              } else {
                found = false
                break
              }
            }
            
            if (found && current.children) {
              const fileName = resolvedPath[resolvedPath.length - 1]
              if (current.children[fileName] && current.children[fileName].type === "file") {
                const content = current.children[fileName].content || []
                if (fileName.endsWith(".md") || fileName.endsWith(".txt")) {
                  const fullContent = content.join("\n")
                  output = parseMarkdown(fullContent)
                } else {
                  output = content.map(l => [segment(l, "green")])
                }
              } else {
                addError(`cat: ${filename}: No such file or directory`)
              }
            } else {
              addError(`cat: ${filename}: No such file or directory`)
            }
          }
        }
        break

      case "open":
        const openDir = getCurrentDir()
        if (openDir.url) {
          window.open(openDir.url, "_blank")
          output = [
            [segment(`Opening ${openDir.name}...`, "green")],
            [segment(`URL: ${openDir.url}`, "cyan")]
          ]
        } else if (args[0]) {
          const projectName = args[0]
          const projectsDir = FILE_SYSTEM.children?.["projects"]
          if (projectsDir?.children?.[projectName]?.url) {
            const url = projectsDir.children[projectName].url!
            window.open(url, "_blank")
            output = [
              [segment(`Opening ${projectName}...`, "green")],
              [segment(`URL: ${url}`, "cyan")]
            ]
          } else {
            addError(`open: ${projectName}: No such project`)
          }
        } else {
          addError(
            "open: no project specified",
            "Usage: open <project-name>",
            "Or navigate to a project directory and run 'open'"
          )
        }
        break

      case "whoami":
        output = [[segment("awmie", "green")]]
        break

      case "date":
        output = [[segment(new Date().toString(), "green")]]
        break

      case "cal":
        const calNow = new Date()
        const month = calNow.toLocaleString('default', { month: 'long' })
        const year = calNow.getFullYear()
        const today = calNow.getDate()
        
        const getCalLine = (days: number[], highlightDay: number): ColoredSegment[] => {
          const result: ColoredSegment[] = []
          days.forEach((d, i) => {
            if (d === 0) {
              result.push(segment("   ", "green"))
            } else {
              const dayStr = d.toString().padStart(2, " ")
              if (d === highlightDay) {
                result.push(segment(dayStr, "yellow"))
              } else {
                result.push(segment(dayStr, "green"))
              }
              if (i < days.length - 1) result.push(segment(" ", "green"))
            }
          })
          return result
        }
        
        output = [
          [segment(`     ${month} ${year}`, "yellow")],
          [segment("Su Mo Tu We Th Fr Sa", "dim")],
          getCalLine([0, 0, 1, 2, 3, 4, 5], today),
          getCalLine([6, 7, 8, 9, 10, 11, 12], today),
          getCalLine([13, 14, 15, 16, 17, 18, 19], today),
          getCalLine([20, 21, 22, 23, 24, 25, 26], today),
          getCalLine([27, 28, 29, 30, 31, 0, 0], today)
        ]
        break

      case "echo":
        output = [[segment(args.join(" ") || "", "green")]]
        break

      case "c":
        setHistory([])
        return

      case "clear":
        setHistory([])
        return

      case "neofetch":
        const sys = getSystemInfo()
        const pageStart = typeof sessionStorage !== "undefined" 
          ? parseInt(sessionStorage.getItem("pageStart") || "0") || Date.now()
          : Date.now()
        if (typeof sessionStorage !== "undefined" && !sessionStorage.getItem("pageStart")) {
          sessionStorage.setItem("pageStart", Date.now().toString())
        }
        const uptime = getUptime(pageStart, Date.now())
        output = [
          [segment("     . - : / + O S S O + / : - .        ", "dim"), segment("  awmie@computer", "green")],
          [segment("    / O O + / : - . - : / + S S /       ", "dim"), segment("  ----------------", "dim")],
          [segment("    O O :  _______________  : S S       ", "dim"), segment("  OS: ", "dim"), segment(sys.os, "green")],
          [segment("    O O : |     > _ *     | : S S       ", "dim"), segment("  Uptime: ", "dim"), segment(uptime, "green")],
          [segment("    O O : |_______________| : S S       ", "dim"), segment("  Shell: ", "dim"), segment("bash", "green")],
          [segment("    O O + / : - . . . - : / + S S       ", "dim"), segment("  Resolution: ", "dim"), segment(sys.resolution, "green")],
          [segment("    . / O S S S S S S S S S S / .       ", "dim"), segment("  Browser: ", "dim"), segment(sys.browser, "green")],
          [segment("          . - : / + / : - .             ", "dim"), segment("  CPU: ", "dim"), segment(`${sys.cores} cores`, "green")],
          [segment("      . / S S S S S S S S S / .         ", "dim"), segment("  Memory: ", "dim"), segment(sys.memory, "green")]
        ]
        break

      case "cowsay":
        const cowMessage = args.join(" ") || "Hello, World!"
        const cowLines = cowMessage.split('\n')
        const cowMaxLen = Math.max(...cowLines.map(l => l.length))
        const cowBorder = "-".repeat(cowMaxLen + 2)
        output = [
          [segment(` ${cowBorder}`, "green")],
          ...cowLines.map(l => [segment(`< ${l.padEnd(cowMaxLen)} >`, "green")]),
          [segment(` ${cowBorder}`, "green")],
          [segment("        \\   ^__^", "dim")],
          [segment("         \\  (oo)\\_______", "dim")],
          [segment("            (__)\\       )\\/\\", "dim")],
          [segment("                ||----w |", "dim")],
          [segment("                ||     ||", "dim")]
        ]
        break

      case "fortune":
        const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)]
        output = [[segment(randomFortune, "green")]]
        break

      case "help":
        output = [
          [segment("Available commands:", "yellow")],
          [segment("", "green")],
          ...COMMANDS.map(c => [segment(`  ${c.cmd.padEnd(15)}`, "green"), segment(c.desc, "dim")]),
          [segment("", "green")],
          [segment("Navigation tips:", "yellow")],
          [segment("  - Use 'cd projects' then 'cd threadai' to enter a project", "dim")],
          [segment("  - Use 'cd ..' to go back", "dim")],
          [segment("  - Use 'open' to open project URL (or 'open <project-name>' from anywhere)", "dim")],
          [segment("  - Use 'cat README.md' to read project info", "dim")]
        ]
        break

      case "":
        output = []
        break

      default:
        output = [[segment(`bash: ${baseCmd}: command not found`, "red")]]
        isError = true
    }

    const currentPrompt = getPrompt()
    if (trimmedCmd) {
      setHistory(prev => [...prev, { input: trimmedCmd, output, isError, prompt: currentPrompt }])
      setCommandHistory(prev => [...prev.slice(-99), trimmedCmd])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      
      const trimmedInput = input.trim()
      const parts = trimmedInput.split(/\s+/)
      const baseCmd = parts[0]?.toLowerCase() || ""
      const currentArg = parts[parts.length - 1] || ""
      const isFirstArg = parts.length === 1
      
      const commands = COMMANDS.map(c => c.cmd)
      const projects = FILE_SYSTEM.children?.["projects"]?.children 
        ? Object.keys(FILE_SYSTEM.children["projects"].children)
        : []
      
      let matches: string[] = []
      let targetDir = getCurrentDir()
      let argToComplete = currentArg
      
      if (isFirstArg) {
        // Complete command
        matches = commands.filter(cmd => cmd.startsWith(baseCmd))
      } else {
        // Check if currentArg contains a path (e.g., "about/" or "about/bio")
        const pathParts = currentArg.split("/")
        if (pathParts.length > 1) {
          // There's a path - navigate to that directory
          const dirPath = pathParts.slice(0, -1).join("/")
          argToComplete = pathParts[pathParts.length - 1]
          
          // Resolve the path
          let checkPath: string[]
          if (dirPath.startsWith("~")) {
            checkPath = dirPath.slice(2).split("/").filter(Boolean)
          } else if (dirPath.startsWith("/")) {
            checkPath = dirPath.slice(1).split("/").filter(Boolean)
          } else {
            // Relative path from current directory
            checkPath = [...currentPath, ...dirPath.split("/").filter(Boolean)]
          }
          
          // Navigate to target directory
          let tempDir: FileSystemItem = FILE_SYSTEM
          let validPath = true
          for (const segment of checkPath) {
            if (tempDir.children && tempDir.children[segment] && tempDir.children[segment].type === "directory") {
              tempDir = tempDir.children[segment]
            } else {
              validPath = false
              break
            }
          }
          if (validPath) {
            targetDir = tempDir
          }
        }
        
        // Complete file/directory
        if (baseCmd === "cd" || baseCmd === "cat" || baseCmd === "ls") {
          const children = targetDir.children ? Object.keys(targetDir.children) : []
          matches = children.filter(name => name.startsWith(argToComplete)).map(name => {
            if (targetDir.children?.[name]?.type === "directory") {
              return name + "/"
            }
            return name
          })
        } else if (baseCmd === "open") {
          // Can complete with project names from anywhere
          matches = projects.filter(name => name.startsWith(currentArg))
        }
      }
      
      if (matches.length === 1) {
        // Single match - complete it without trailing space
        if (isFirstArg) {
          setInput(matches[0])
        } else {
          // Reconstruct the path if there was one
          const pathParts = currentArg.split("/")
          if (pathParts.length > 1) {
            pathParts[pathParts.length - 1] = matches[0]
            parts[parts.length - 1] = pathParts.join("/")
          } else {
            parts[parts.length - 1] = matches[0]
          }
          setInput(parts.join(" "))
        }
      } else if (matches.length > 1) {
        // Multiple matches - show them all
        setHistory(prev => [...prev, { 
          input: input, 
          output: stringArrayToColored(matches, "green"),
          isError: false,
          prompt: getPrompt()
        }])
        
        // Complete to common prefix
        const commonPrefix = findCommonPrefix(matches)
        if (commonPrefix.length > argToComplete.length) {
          if (isFirstArg) {
            setInput(commonPrefix)
          } else {
            const pathParts = currentArg.split("/")
            if (pathParts.length > 1) {
              pathParts[pathParts.length - 1] = commonPrefix
              parts[parts.length - 1] = pathParts.join("/")
            } else {
              parts[parts.length - 1] = commonPrefix
            }
            setInput(parts.join(" "))
          }
        }
      }
    }
  }

  return (
    <div 
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
      className="font-mono text-xs sm:text-sm h-full overflow-y-auto pb-4"
    >
      {/* Welcome message */}
      {history.length === 0 && (
        <div className="text-green-600/70 mb-2 text-[10px] sm:text-xs">
          <p>Try &apos;help&apos; for commands</p>
          <br />
        </div>
      )}

      {/* Command history */}
      {history.map((cmd, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-green-500 text-[10px] sm:text-xs">{cmd.prompt}</span>
            {cmd.input && <span className="text-green-200 text-[10px] sm:text-xs">{cmd.input}</span>}
          </div>
          {cmd.output.map((line, lineIndex) => (
            <div 
              key={lineIndex} 
              className="text-[10px] sm:text-xs whitespace-pre-wrap break-words"
            >
              {line.map((seg, segIndex) => (
                <span key={segIndex} className={colorMap[seg.color]}>
                  {seg.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Current input line */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="text-green-500 text-[10px] sm:text-xs shrink-0">{getPrompt()}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-green-200 flex-1 min-w-0 text-[10px] sm:text-xs font-mono"
          placeholder=""
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  )
}
