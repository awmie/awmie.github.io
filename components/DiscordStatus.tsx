"use client"

import { useEffect, useRef, useState } from "react"

/* Slim, resilient live status chip. Connects to Lanyard once, fails fast,
   backs off with a cap, and degrades to a graceful "offline" state. Shows the
   current Discord activity too — Spotify track, playing/watching/competing —
   not just online/idle/dnd. */

interface LanyardActivity {
  name?: string
  type?: number
  state?: string
  details?: string
}
interface LanyardData {
  discord_status?: "online" | "idle" | "dnd" | "offline"
  listening_to_spotify?: boolean
  spotify?: { song?: string; artist?: string } | null
  activities?: LanyardActivity[]
}

const STATUS_LABEL: Record<string, string> = {
  online: "online",
  idle: "idle",
  dnd: "do not disturb",
  offline: "offline",
}
/* Dot colors: online green, idle yellow, dnd coral, offline black. */
const DOT: Record<string, string> = {
  online: "text-accent-3",
  idle: "text-accent-2",
  dnd: "text-accent",
  offline: "text-bone",
}
const VERB: Record<number, string> = {
  0: "playing",
  2: "listening to",
  3: "watching",
  5: "competing in",
}

function describe(d: LanyardData): string {
  if (d.listening_to_spotify && d.spotify?.song) {
    return d.spotify.artist
      ? `playing ${d.spotify.song} — ${d.spotify.artist}`
      : `playing ${d.spotify.song}`
  }
  const act = (d.activities || []).find((a) => a.type !== 4) // skip custom status
  if (act) {
    const verb = VERB[act.type ?? 0] ?? "playing"
    const label = act.name || act.details || act.state
    if (label) return `${verb} ${label}`
  }
  return STATUS_LABEL[d.discord_status ?? "offline"] ?? "offline"
}

export default function DiscordStatus() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [state, setState] = useState<"loading" | "live" | "offline">("loading")
  const attempts = useRef(0)
  const failTimer = useRef<number | null>(null)
  const reconnectTimer = useRef<number | null>(null)

  useEffect(() => {
    const DISCORD_ID = "758654255216197645"
    let socket: WebSocket | null = null
    let heartbeat: ReturnType<typeof setInterval> | null = null
    let disposed = false

    const clearFail = () => {
      if (failTimer.current) {
        clearTimeout(failTimer.current)
        failTimer.current = null
      }
    }

    const scheduleReconnect = () => {
      if (disposed || failTimer.current) return
      setState("offline")
      const attempt = attempts.current
      if (attempt >= 6) return
      const delay = Math.min(5000 * 2 ** attempt, 40000)
      attempts.current += 1
      reconnectTimer.current = window.setTimeout(connect, delay)
    }

    const connect = () => {
      if (disposed) return
      try {
        socket = new WebSocket("wss://api.lanyard.rest/socket")
      } catch {
        scheduleReconnect()
        return
      }

      failTimer.current = window.setTimeout(() => {
        if (!disposed) {
          socket?.close()
          setData(null)
          setState("offline")
        }
      }, 8000)

      socket.onmessage = (event) => {
        let msg: any
        try {
          msg = JSON.parse(event.data)
        } catch {
          return
        }
        const { op, t, d } = msg
        if (op === 1) {
          heartbeat = setInterval(() => {
            if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ op: 3 }))
          }, d?.heartbeat_interval)
          socket?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }))
        } else if (op === 0 && (t === "INIT_STATE" || t === "PRESENCE_UPDATE")) {
          clearFail()
          attempts.current = 0
          setData(d)
          setState("live")
        }
      }
      socket.onclose = () => {
        if (heartbeat) clearInterval(heartbeat)
        scheduleReconnect()
      }
    }

    connect()
    return () => {
      disposed = true
      clearFail()
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current)
      if (heartbeat) clearInterval(heartbeat)
      socket?.close()
    }
  }, [])

  if (state === "loading")
    return (
      <span className="font-mono text-[10px] text-bone">
        <span className="text-dim">●</span> syncing…
      </span>
    )
  if (state === "offline" || !data)
    return (
      <span className="font-mono text-[10px] text-bone">
        <span className="text-bone">●</span> offline
      </span>
    )

  const dotColor = DOT[data.discord_status ?? "offline"] ?? "text-bone"
  return (
    <span className="inline-flex max-w-[260px] items-center gap-1.5 font-mono text-[10px] text-bone">
      <span className={dotColor}>●</span>
      <span className="truncate">{describe(data)}</span>
    </span>
  )
}
