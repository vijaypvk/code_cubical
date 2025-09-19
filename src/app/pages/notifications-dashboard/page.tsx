"use client"

import { useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { CheckCircle, Clock, MessageSquare, Hash } from "lucide-react"

interface Notification {
  id: string
  timestamp: string
  channel: "slack" | "discord"
  channelName: string
  message: string
  status: "delivered" | "pending"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    channel: "slack",
    channelName: "#alerts",
    message: "🚨 High CPU usage detected on prod-server-01 (85%). Auto-scaling initiated.",
    status: "delivered",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:28:15",
    channel: "discord",
    channelName: "#monitoring",
    message: "✅ Kubernetes cluster health check completed. All nodes operational.",
    status: "delivered",
  },
  {
    id: "3",
    timestamp: "2024-01-15 14:25:10",
    channel: "slack",
    channelName: "#devops",
    message: "🔄 Jenkins pipeline 'deploy-frontend' completed successfully. Build #247.",
    status: "pending",
  },
  {
    id: "4",
    timestamp: "2024-01-15 14:22:45",
    channel: "discord",
    channelName: "#incidents",
    message: "⚠️ Database connection timeout detected. Investigating root cause...",
    status: "delivered",
  },
  {
    id: "5",
    timestamp: "2024-01-15 14:20:30",
    channel: "slack",
    channelName: "#alerts",
    message: "💰 AWS cost spike detected: $150 above daily budget. Review recommended.",
    status: "delivered",
  },
  {
    id: "6",
    timestamp: "2024-01-15 14:18:20",
    channel: "discord",
    channelName: "#general",
    message: "🚀 New deployment to staging environment completed. Version 2.1.4 is live.",
    status: "pending",
  },
]

export default function NotificationsDashboard() {
  const [filter, setFilter] = useState<"all" | "slack" | "discord">("all")

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (filter === "all") return true
    return notification.channel === filter
  })

  const getChannelIcon = (channel: "slack" | "discord") => {
    if (channel === "slack") {
      return (
        <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
          <Hash className="w-3 h-3 text-white" />
        </div>
      )
    }
    return (
      <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
        <MessageSquare className="w-3 h-3 text-white" />
      </div>
    )
  }

  const getStatusIcon = (status: "delivered" | "pending") => {
    if (status === "delivered") {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    }
    return <Clock className="w-4 h-4 text-yellow-400" />
  }

  const getStatusBadge = (status: "delivered" | "pending") => {
    if (status === "delivered") {
      return <Badge className="bg-green-900/30 text-green-400 border-green-400/20">Delivered</Badge>
    }
    return <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-400/20">Pending</Badge>
  }

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Notifications</h1>
          <p className="text-gray-400">Messages sent by AI to Slack and Discord channels</p>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "border-gray-700 text-gray-300 hover:bg-gray-900"
              }
            >
              All Channels
            </Button>
            <Button
              variant={filter === "slack" ? "default" : "outline"}
              onClick={() => setFilter("slack")}
              className={
                filter === "slack"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "border-gray-700 text-gray-300 hover:bg-gray-900"
              }
            >
              <div className="w-4 h-4 bg-purple-600 rounded mr-2 flex items-center justify-center">
                <Hash className="w-2.5 h-2.5 text-white" />
              </div>
              Slack
            </Button>
            <Button
              variant={filter === "discord" ? "default" : "outline"}
              onClick={() => setFilter("discord")}
              className={
                filter === "discord"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border-gray-700 text-gray-300 hover:bg-gray-900"
              }
            >
              <div className="w-4 h-4 bg-indigo-600 rounded mr-2 flex items-center justify-center">
                <MessageSquare className="w-2.5 h-2.5 text-white" />
              </div>
              Discord
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card key={notification.id} className="bg-gray-950 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Header with channel and timestamp */}
                    <div className="flex items-center gap-3 mb-3">
                      {getChannelIcon(notification.channel)}
                      <span className="text-gray-300 font-medium">{notification.channelName}</span>
                      <span className="text-gray-500 text-sm">{notification.timestamp}</span>
                      <div className="ml-auto flex items-center gap-2">
                        {getStatusIcon(notification.status)}
                        {getStatusBadge(notification.status)}
                      </div>
                    </div>

                    {/* Message content */}
                    <div className="text-gray-200 leading-relaxed">{notification.message}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredNotifications.length === 0 && (
          <Card className="bg-gray-950 border-gray-800">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No notifications found</h3>
              <p className="text-gray-500">No messages match the current filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
