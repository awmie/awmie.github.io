"use client"

import { useEffect, useState } from "react"

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: {
    type: number
    state: string
    name: string
    details: string
  }[]
  discord_user: {
    username: string
    discriminator: string
    id: string
    avatar: string
  }
}

interface LanyardMessage {
  op: number
  t?: string
  d?: any
}

export default function DiscordStatus() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const DISCORD_ID = "758654255216197645"
    let socket: WebSocket | null = null
    let heartbeatInterval: NodeJS.Timeout | null = null

    const connect = () => {
      socket = new WebSocket("wss://api.lanyard.rest/socket")

      socket.onopen = () => {}

      socket.onmessage = (event) => {
        const message: LanyardMessage = JSON.parse(event.data)
        const { op, t, d } = message

        switch (op) {
          case 1: // Hello
            const interval = d.heartbeat_interval
            heartbeatInterval = setInterval(() => {
              if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ op: 3 }))
              }
            }, interval)

            socket.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: DISCORD_ID },
              })
            )
            break

          case 0: // Event
            if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
              setData(d)
              setLoading(false)
            }
            break
        }
      }

      socket.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval)
        setTimeout(connect, 5000)
      }
    }

    connect()

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval)
      if (socket) socket.close()
    }
  }, [])

  if (loading) return null

  const status = data?.discord_status || "offline"
  const activity = data?.activities?.find((a) => a.type !== 4)

  const statusColor = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
  }

  let beforeDot = ""
  if (status === "dnd") beforeDot = "Busy"
  else if (status === "idle") beforeDot = "Idle"
  else if (status === "offline") beforeDot = "Offline"
  else if (status === "online" && activity) beforeDot = "Online"

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
      {beforeDot && (
        <span className="text-[10px] font-light tracking-wider text-zinc-400 uppercase leading-none pt-px">
          {beforeDot}
        </span>
      )}
      
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {status === "online" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${statusColor[status]}`}></span>
      </span>

      {activity && (
        <span className="text-[10px] font-light text-zinc-400 flex items-center gap-1 leading-none pt-px">
          <span className="opacity-70">right now on</span>
          <span className="text-zinc-200 uppercase tracking-tight truncate max-w-[150px]">{activity.name}</span>
        </span>
      )}

      {!beforeDot && !activity && status === "online" && (
        <span className="text-[10px] font-light tracking-wider text-zinc-400 uppercase leading-none pt-px">
          online
        </span>
      )}
    </div>
  )
}