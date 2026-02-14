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

            if (socket) {
              socket.send(
                JSON.stringify({
                  op: 2,
                  d: { subscribe_to_id: DISCORD_ID },
                })
              )
            }
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

  if (loading) return <span className="text-green-700">[connecting...]</span>

  const status = data?.discord_status || "offline"
  
  const activities = data?.activities
    ?.filter((a) => a.type !== 4)
    ?.sort((a, b) => {
      const aPriority = a.type === 2 ? 2 : a.type === 0 ? 1 : 0
      const bPriority = b.type === 2 ? 2 : b.type === 0 ? 1 : 0
      return bPriority - aPriority
    })
    ?.slice(0, 2) || []

  const statusIndicator = {
    online: "●",
    idle: "◐",
    dnd: "◑",
    offline: "○",
  }

  const statusColor = {
    online: "text-green-400",
    idle: "text-yellow-400",
    dnd: "text-red-400",
    offline: "text-gray-500",
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`${statusColor[status]}`}>
        {statusIndicator[status]}
      </span>
      
      <span className="text-green-600">
        discord:
      </span>
      
      <span className="text-green-400">
        {status}
      </span>

      {activities.length > 0 && (
        <span className="text-green-600">
          | playing: {activities.map(a => a.name).join(", ")}
        </span>
      )}
    </div>
  )
}
