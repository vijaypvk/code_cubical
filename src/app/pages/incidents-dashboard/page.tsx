"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  DollarSign,
  RotateCcw,
  Zap,
  Mail,
  ExternalLink,
  Activity,
  Database,
} from "lucide-react"

// Mock data for incidents
const mockIncidents = [
  {
    id: 1,
    time: "2024-01-15T14:30:00Z",
    type: "pod_crash",
    description: "Frontend pod crashed in production",
    status: "resolved",
    severity: "high",
  },
  {
    id: 2,
    time: "2024-01-15T13:45:00Z",
    type: "vm_failure",
    description: "Database VM became unresponsive",
    status: "unresolved",
    severity: "critical",
  },
  {
    id: 3,
    time: "2024-01-15T12:20:00Z",
    type: "cost_spike",
    description: "AWS costs exceeded threshold by 150%",
    status: "resolved",
    severity: "medium",
  },
  {
    id: 4,
    time: "2024-01-15T11:15:00Z",
    type: "pod_crash",
    description: "Redis cache pod restarted unexpectedly",
    status: "resolved",
    severity: "low",
  },
  {
    id: 5,
    time: "2024-01-14T16:30:00Z",
    type: "vm_failure",
    description: "Load balancer VM high CPU usage",
    status: "unresolved",
    severity: "high",
  },
  {
    id: 6,
    time: "2024-01-14T15:20:00Z",
    type: "cost_spike",
    description: "GCP storage costs increased unexpectedly",
    status: "resolved",
    severity: "medium",
  },
]

// Mock data for AI actions
const mockAIActions = [
  {
    id: 1,
    action: "Restarted VM",
    description: "Auto-restarted database VM after health check failure",
    outcome: "success",
    timestamp: "2024-01-15T14:35:00Z",
    duration: "2m 15s",
  },
  {
    id: 2,
    action: "Scaled Cluster",
    description: "Increased Kubernetes cluster size from 3 to 5 nodes",
    outcome: "success",
    timestamp: "2024-01-15T13:50:00Z",
    duration: "5m 30s",
  },
  {
    id: 3,
    action: "Cost Optimization",
    description: "Terminated unused EC2 instances",
    outcome: "success",
    timestamp: "2024-01-15T12:25:00Z",
    duration: "1m 45s",
  },
  {
    id: 4,
    action: "Pod Recovery",
    description: "Attempted to recover crashed frontend pod",
    outcome: "failure",
    timestamp: "2024-01-15T14:28:00Z",
    duration: "30s",
  },
  {
    id: 5,
    action: "Database Backup",
    description: "Created emergency backup before maintenance",
    outcome: "success",
    timestamp: "2024-01-14T16:35:00Z",
    duration: "8m 20s",
  },
]

const getIncidentIcon = (type: string) => {
  switch (type) {
    case "pod_crash":
      return <Database className="h-4 w-4" />
    case "vm_failure":
      return <Server className="h-4 w-4" />
    case "cost_spike":
      return <DollarSign className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getActionIcon = (action: string) => {
  if (action.includes("Restart")) return <RotateCcw className="h-4 w-4" />
  if (action.includes("Scale")) return <Zap className="h-4 w-4" />
  if (action.includes("Cost")) return <DollarSign className="h-4 w-4" />
  if (action.includes("Pod")) return <Database className="h-4 w-4" />
  if (action.includes("Database")) return <Server className="h-4 w-4" />
  return <Activity className="h-4 w-4" />
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "low":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  return `${Math.floor(diffInHours / 24)}d ago`
}

export default function IncidentsDashboard() {
  const [timeFilter, setTimeFilter] = useState("24h")

  const filteredIncidents = useMemo(() => {
    const now = new Date()
    const filterHours = timeFilter === "24h" ? 24 : timeFilter === "7d" ? 168 : 720

    return mockIncidents.filter((incident) => {
      const incidentTime = new Date(incident.time)
      const hoursDiff = (now.getTime() - incidentTime.getTime()) / (1000 * 60 * 60)
      return hoursDiff <= filterHours
    })
  }, [timeFilter])

  const filteredActions = useMemo(() => {
    const now = new Date()
    const filterHours = timeFilter === "24h" ? 24 : timeFilter === "7d" ? 168 : 720

    return mockAIActions.filter((action) => {
      const actionTime = new Date(action.timestamp)
      const hoursDiff = (now.getTime() - actionTime.getTime()) / (1000 * 60 * 60)
      return hoursDiff <= filterHours
    })
  }, [timeFilter])

  const stats = useMemo(() => {
    const totalIncidents = filteredIncidents.length
    const resolvedIncidents = filteredIncidents.filter((i) => i.status === "resolved").length
    const unresolvedIncidents = totalIncidents - resolvedIncidents
    const successfulActions = filteredActions.filter((a) => a.outcome === "success").length
    const failedActions = filteredActions.length - successfulActions

    return {
      totalIncidents,
      resolvedIncidents,
      unresolvedIncidents,
      successfulActions,
      failedActions,
      totalActions: filteredActions.length,
    }
  }, [filteredIncidents, filteredActions])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Incidents Dashboard</h1>
            <p className="text-zinc-400 mt-1">Monitor incidents and AI-driven responses</p>
          </div>

          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-zinc-900 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7d</SelectItem>
                <SelectItem value="30d">Last 30d</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 transition-colors"
              onClick={() => window.open("https://mail.google.com/chat", "_blank")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Gmail Chat
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{stats.totalIncidents}</div>
              <div className="text-sm text-zinc-400">Total Incidents</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">{stats.resolvedIncidents}</div>
              <div className="text-sm text-zinc-400">Resolved</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400">{stats.unresolvedIncidents}</div>
              <div className="text-sm text-zinc-400">Unresolved</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-white">{stats.totalActions}</div>
              <div className="text-sm text-zinc-400">AI Actions</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400">{stats.successfulActions}</div>
              <div className="text-sm text-zinc-400">Successful</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-400">{stats.failedActions}</div>
              <div className="text-sm text-zinc-400">Failed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Incidents Timeline */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Incidents Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredIncidents.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">No incidents found for the selected time period</div>
              ) : (
                filteredIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/70 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`p-2 rounded-full ${
                          incident.type === "pod_crash"
                            ? "bg-blue-500/20 text-blue-400"
                            : incident.type === "vm_failure"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {getIncidentIcon(incident.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                          <Badge
                            variant={incident.status === "resolved" ? "default" : "destructive"}
                            className={
                              incident.status === "resolved"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {incident.status === "resolved" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {incident.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-zinc-400">{getTimeAgo(incident.time)}</span>
                      </div>

                      <h3 className="font-medium text-white mb-1">{incident.description}</h3>

                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>
                          {formatDate(incident.time)} at {formatTime(incident.time)}
                        </span>
                        <span className="capitalize">{incident.type.replace("_", " ")}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Right Panel - AI Actions Log */}
          <Card className="bg-zinc-950 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                AI Actions Log
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredActions.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">No AI actions found for the selected time period</div>
              ) : (
                filteredActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900/70 transition-all duration-200"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`p-2 rounded-full ${
                          action.outcome === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {getActionIcon(action.action)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={action.outcome === "success" ? "default" : "destructive"}
                          className={
                            action.outcome === "success"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }
                        >
                          {action.outcome === "success" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {action.outcome}
                        </Badge>
                        <span className="text-sm text-zinc-400">{getTimeAgo(action.timestamp)}</span>
                      </div>

                      <h3 className="font-medium text-white mb-1">{action.action}</h3>

                      <p className="text-sm text-zinc-400 mb-2">{action.description}</p>

                      <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>
                          {formatDate(action.timestamp)} at {formatTime(action.timestamp)}
                        </span>
                        <span>Duration: {action.duration}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
