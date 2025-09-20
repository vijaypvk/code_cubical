"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { ScrollArea } from "@/app/components/ui/scroll-area"
import {
  Send,
  Mic,
  Bot,
  User,
  Play,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  GitBranch,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Settings,
  History,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  actions?: ActionButton[]
  table?: TableData
  chart?: ChartData
  status?: "success" | "error" | "pending"
}

interface ActionButton {
  id: string
  label: string
  action: string
  variant: "default" | "destructive" | "secondary"
  icon?: any
}

interface TableData {
  headers: string[]
  rows: any[][]
}

interface ChartData {
  type: "cpu" | "memory" | "network"
  data: number[]
  labels: string[]
}

interface AIAction {
  id: string
  action: string
  target: string
  status: "success" | "error" | "pending"
  timestamp: Date
  details: string
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm CloudPilot AI, your operations assistant. I can help you monitor and manage your multi-cloud infrastructure, Kubernetes clusters, Docker containers, Jenkins pipelines, and GitHub repositories. What would you like to do today?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      type: "user",
      content: "Show me the status of all Kubernetes pods in production",
      timestamp: new Date(Date.now() - 45000),
    },
    {
      id: "3",
      type: "ai",
      content: "Here are your production Kubernetes pods:",
      timestamp: new Date(Date.now() - 40000),
      table: {
        headers: ["Pod Name", "Namespace", "Status", "CPU", "Memory", "Restarts"],
        rows: [
          ["web-app-7d4b8f9c6d-x8k2m", "production", "Running", "45%", "512Mi", "0"],
          ["api-server-5c7d9e8f4a-p9q3r", "production", "Running", "78%", "1.2Gi", "1"],
          ["worker-queue-8f6a5b2c1d-m7n8o", "production", "CrashLoopBackOff", "12%", "256Mi", "5"],
          ["redis-cache-9e7f3a4b5c-k4l5m", "production", "Running", "23%", "128Mi", "0"],
        ],
      },
      actions: [
        { id: "restart-pod", label: "Restart Failing Pod", action: "restart", variant: "destructive", icon: RotateCcw },
        { id: "scale-deployment", label: "Scale Deployment", action: "scale", variant: "default", icon: TrendingUp },
        { id: "view-logs", label: "View Logs", action: "logs", variant: "secondary", icon: Activity },
      ],
    },
    {
      id: "4",
      type: "system",
      content: "AI Action: Restarting pod worker-queue-8f6a5b2c1d-m7n8o...",
      timestamp: new Date(Date.now() - 20000),
      status: "pending",
    },
    {
      id: "5",
      type: "system",
      content: "Pod worker-queue-8f6a5b2c1d-m7n8o successfully restarted. Status: Running",
      timestamp: new Date(Date.now() - 10000),
      status: "success",
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const [aiActions, setAiActions] = useState<AIAction[]>([
  {
    id: "1",
    action: "Pod Restart",
    target: "worker-queue-8f6a5b2c1d-m7n8o",
    status: "success",
    timestamp: new Date(Date.now() - 10000),
    details: "Restarted failing pod in production namespace",
  },
  {
    id: "2",
    action: "Scale Deployment",
    target: "web-app deployment",
    status: "success",
    timestamp: new Date(Date.now() - 300000),
    details: "Scaled from 3 to 5 replicas due to high CPU usage",
  },
  {
    id: "3",
    action: "Jenkins Build",
    target: "api-server pipeline",
    status: "pending",
    timestamp: new Date(Date.now() - 120000),
    details: "Triggered build for feature/auth-improvements branch",
  }
  
])


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    if (input.includes("docker") || input.includes("container")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here are your Docker containers:",
        timestamp: new Date(),
        table: {
          headers: ["Container", "Image", "Status", "CPU", "Memory", "Ports"],
          rows: [
            ["nginx-proxy", "nginx:alpine", "Running", "5%", "32Mi", "80:80, 443:443"],
            ["postgres-db", "postgres:14", "Running", "15%", "256Mi", "5432:5432"],
            ["redis-cache", "redis:7-alpine", "Exited", "0%", "0Mi", "6379:6379"],
          ],
        },
        actions: [
          { id: "start-container", label: "Start Container", action: "start", variant: "default", icon: Play },
          { id: "restart-container", label: "Restart All", action: "restart", variant: "secondary", icon: RotateCcw },
        ],
      }
    }

    if (input.includes("jenkins") || input.includes("build")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here are your recent Jenkins builds:",
        timestamp: new Date(),
        table: {
          headers: ["Pipeline", "Branch", "Status", "Duration", "Triggered By"],
          rows: [
            ["api-server", "main", "Success", "3m 45s", "webhook"],
            ["web-app", "feature/ui-update", "Running", "2m 12s", "john.doe"],
            ["worker-service", "main", "Failed", "1m 30s", "scheduler"],
          ],
        },
        actions: [
          { id: "trigger-build", label: "Trigger Build", action: "build", variant: "default", icon: Zap },
          { id: "view-logs", label: "View Build Logs", action: "logs", variant: "secondary", icon: Activity },
        ],
      }
    }
    if (input.includes("pods") || input.includes("kubernetes")) {
    return {
      id: Date.now().toString(),
      type: "ai",
      content: "Here are your production Kubernetes pods:",
      timestamp: new Date(),
      table: {
        headers: ["Pod Name", "Namespace", "Status", "CPU", "Memory", "Restarts"],
        rows: [
          ["web-app-7d4b8f9c6d-x8k2m", "production", "Running", "45%", "512Mi", "0"],
          ["api-server-5c7d9e8f4a-p9q3r", "production", "Running", "78%", "1.2Gi", "1"],
          ["worker-queue-8f6a5b2c1d-m7n8o", "production", "CrashLoopBackOff", "12%", "256Mi", "5"],
          ["redis-cache-9e7f3a4b5c-k4l5m", "production", "Running", "23%", "128Mi", "0"],
        ],
      },
      actions: [
        { id: "restart-pod", label: "Restart Failing Pod", action: "restart", variant: "destructive", icon: RotateCcw },
        { id: "scale-deployment", label: "Scale Deployment", action: "scale", variant: "default", icon: TrendingUp },
        { id: "view-logs", label: "View Logs", action: "logs", variant: "secondary", icon: Activity },
      ],
    }
  }


    if (input.includes("github") || input.includes("pr") || input.includes("pull request")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here are your open GitHub pull requests:",
        timestamp: new Date(),
        table: {
          headers: ["PR Title", "Author", "Status", "Checks", "Reviews"],
          rows: [
            ["Add authentication middleware", "jane.smith", "Open", "✅ 3/3", "👍 2/2"],
            ["Fix memory leak in worker", "bob.wilson", "Draft", "⏳ 1/3", "👀 0/1"],
            ["Update dependencies", "dependabot", "Open", "❌ 0/3", "👀 0/2"],
          ],
        },
        actions: [
          { id: "merge-pr", label: "Merge Ready PRs", action: "merge", variant: "default", icon: GitBranch },
          { id: "review-pr", label: "Request Review", action: "review", variant: "secondary", icon: User },
        ],
      }
    }
    if (input.includes("deployment") || input.includes("k8s deployment")) {
  return {
    id: Date.now().toString(),
    type: "ai",
    content: "Here are your current Kubernetes deployments:",
    timestamp: new Date(),
    table: {
      headers: ["Deployment", "Namespace", "Replicas", "Available", "CPU", "Memory"],
      rows: [
        ["web-app", "production", "5", "5", "65%", "2.1Gi"],
        ["api-server", "production", "3", "2", "80%", "1.8Gi"],
        ["worker-service", "staging", "2", "2", "40%", "900Mi"],
      ],
    },
    actions: [
      { id: "scale-deployment", label: "Scale Deployment", action: "scale", variant: "default", icon: TrendingUp },
      { id: "restart-deployment", label: "Restart Deployment", action: "restart", variant: "secondary", icon: RotateCcw },
    ],
  }
}

if (input.includes("vm") || input.includes("proxmox")) {
  return {
    id: Date.now().toString(),
    type: "ai",
    content: "Here are your Proxmox VMs:",
    timestamp: new Date(),
    table: {
      headers: ["VM Name", "Node", "Status", "CPU", "Memory", "Disk"],
      rows: [
        ["vm-web01", "pve-node1", "Running", "25%", "2.5Gi", "40Gi/100Gi"],
        ["vm-db01", "pve-node2", "Running", "55%", "5.2Gi", "120Gi/200Gi"],
        ["vm-test01", "pve-node1", "Stopped", "0%", "0Mi", "30Gi/50Gi"],
      ],
    },
    actions: [
      { id: "start-vm", label: "Start VM", action: "start", variant: "default", icon: Play },
      { id: "restart-vm", label: "Restart VM", action: "restart", variant: "secondary", icon: RotateCcw },
    ],
  }
}

if (input.includes("optimize") || input.includes("savings")) {
  return {
    id: Date.now().toString(),
    type: "ai",
    content: "Here are some cloud cost optimization recommendations:",
    timestamp: new Date(),
    table: {
      headers: ["Provider", "Service", "Recommendation", "Estimated Savings"],
      rows: [
        ["AWS", "EC2", "Downsize instance type t3.large → t3.medium", "$120/month"],
        ["GCP", "Storage", "Move cold data to Nearline tier", "$75/month"],
        ["Azure", "VMs", "Schedule shutdown for dev VMs at night", "$90/month"],
      ],
    },
    actions: [
      { id: "apply-recommendations", label: "Apply All", action: "apply", variant: "default", icon: Zap },
      { id: "export-report", label: "Export Report", action: "export", variant: "secondary", icon: Activity },
    ],
  }
}
if (input.includes("issue") || input.includes("bug")) {
  return {
    id: Date.now().toString(),
    type: "ai",
    content: "Here are your open GitHub issues:",
    timestamp: new Date(),
    table: {
      headers: ["Issue Title", "Repo", "Labels", "Status", "Assignee"],
      rows: [
        ["Fix login timeout bug", "web-app", "bug, urgent", "Open", "alice"],
        ["Update API docs", "api-server", "documentation", "In Progress", "bob"],
        ["Refactor worker queue", "worker-service", "enhancement", "Open", "unassigned"],
      ],
    },
    actions: [
      { id: "assign-issue", label: "Assign Issue", action: "assign", variant: "default", icon: User },
      { id: "close-issue", label: "Close Issue", action: "close", variant: "secondary", icon: CheckCircle },
    ],
  }
}
if (input.includes("k8s") || input.includes("scale")) {
  return {
    id: Date.now().toString(),
    type: "ai",
    content: "Your `web-app` deployment is currently running 5 replicas. What would you like to do?",
    timestamp: new Date(),
    actions: [
      { id: "scale-up", label: "Scale Up", action: "scale_up", variant: "default", icon: TrendingUp },
      { id: "scale-down", label: "Scale Down", action: "scale_down", variant: "secondary", icon: TrendingDown },
    ],
  }
}

    if (input.includes("cost") || input.includes("billing") || input.includes("usage")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here's your multi-cloud cost breakdown for this month:",
        timestamp: new Date(),
        table: {
          headers: ["Provider", "Service", "Current Cost", "Projected", "Change"],
          rows: [
            ["AWS", "EC2 Instances", "$1,245.67", "$1,890.00", "+15%"],
            ["GCP", "Kubernetes Engine", "$892.34", "$1,200.00", "+8%"],
            ["Azure", "Virtual Machines", "$567.89", "$750.00", "-5%"],
            ["Proxmox", "Local Infrastructure", "$234.56", "$300.00", "+2%"],
          ],
        },
        chart: {
          type: "cpu",
          data: [1245, 892, 567, 234],
          labels: ["AWS", "GCP", "Azure", "Proxmox"],
        },
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content:
        "I can help you with various operations including:\n\n• Monitor Kubernetes pods and deployments\n• Manage Docker containers\n• Check Jenkins build status\n• Review GitHub pull requests\n• Analyze multi-cloud costs\n• Restart services and scale resources\n• View logs and metrics\n\nWhat specific task would you like me to help you with?",
      timestamp: new Date(),
    }
  }

  const handleActionClick = (action: ActionButton, messageId: string) => {
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: "system",
      content: `AI Action: Executing ${action.label}...`,
      timestamp: new Date(),
      status: "pending",
    }

    setMessages((prev) => [...prev, systemMessage])

    // Add to AI actions history
    const newAction: AIAction = {
      id: Date.now().toString(),
      action: action.label,
      target: "Selected resource",
      status: "pending",
      timestamp: new Date(),
      details: `Executing ${action.action} operation`,
    }

    setAiActions((prev) => [newAction, ...prev])

    // Simulate action completion
    setTimeout(() => {
      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: `${action.label} completed successfully!`,
        timestamp: new Date(),
        status: "success",
      }

      setMessages((prev) => [...prev, successMessage])

      // Update action status
      setAiActions((prev) =>
        prev.map((a) =>
          a.id === newAction.id ? { ...a, status: "success", details: `${action.label} completed successfully` } : a,
        ),
      )
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusIcon = (status?: "success" | "error" | "pending") => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-3rem)]">
          {/* Main Chat Panel */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-950 border-gray-800 h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-gray-800 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 bg-blue-600">
                      <AvatarFallback className="bg-blue-600 text-white">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold text-white">CloudPilot AI – Operations Bot</h2>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`} />
                        <span className="text-sm text-gray-400">{isOnline ? "Online" : "Offline"}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-3xl ${message.type === "user" ? "order-2" : "order-1"}`}>
                          <div
                            className={`rounded-lg p-4 ${
                              message.type === "user"
                                ? "bg-blue-600 text-white ml-12"
                                : message.type === "system"
                                  ? "bg-gray-800 border border-gray-700"
                                  : "bg-gray-900 border border-gray-800"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {message.type !== "user" && (
                                <Avatar className="h-6 w-6 mt-1">
                                  <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                                    {message.type === "system" ? (
                                      <Settings className="h-3 w-3" />
                                    ) : (
                                      <Bot className="h-3 w-3" />
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                                  {message.status && getStatusIcon(message.status)}
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>

                                {/* Table Display */}
                                {message.table && (
                                  <div className="mt-4 overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b border-gray-700">
                                          {message.table.headers.map((header, i) => (
                                            <th key={i} className="text-left py-2 px-3 text-gray-300 font-medium">
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {message.table.rows.map((row, i) => (
                                          <tr key={i} className="border-b border-gray-800">
                                            {row.map((cell, j) => (
                                              <td key={j} className="py-2 px-3 text-gray-200">
                                                {typeof cell === "string" && cell.includes("%") ? (
                                                  <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                                    {cell}
                                                  </Badge>
                                                ) : cell === "Running" ? (
                                                  <Badge className="bg-green-600 text-white">{cell}</Badge>
                                                ) : cell === "CrashLoopBackOff" ||
                                                  cell === "Failed" ||
                                                  cell === "Exited" ? (
                                                  <Badge variant="destructive">{cell}</Badge>
                                                ) : cell === "Success" ? (
                                                  <Badge className="bg-green-600 text-white">{cell}</Badge>
                                                ) : (
                                                  cell
                                                )}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                {message.actions && (
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    {message.actions.map((action) => {
                                      const Icon = action.icon
                                      return (
                                        <Button
                                          key={action.id}
                                          variant={action.variant}
                                          size="sm"
                                          onClick={() => handleActionClick(action, message.id)}
                                          className="text-xs"
                                        >
                                          {Icon && <Icon className="h-3 w-3 mr-1" />}
                                          {action.label}
                                        </Button>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 max-w-xs">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                                <Bot className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Chat Input */}
              <div className="border-t border-gray-800 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask me to monitor resources, restart services, check builds..."
                    className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Actions History Panel */}
          <div className={`${showHistory ? "block" : "hidden lg:block"}`}>
            <Card className="bg-gray-950 border-gray-800 h-full">
              <CardHeader className="border-b border-gray-800 pb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-400" />
                  AI Actions Log
                </h3>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-3">
                    {aiActions.map((action) => (
                      <div key={action.id} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(action.status)}
                            <span className="text-sm font-medium text-white">{action.action}</span>
                          </div>
                          <span className="text-xs text-gray-400">{formatTime(action.timestamp)}</span>
                        </div>
                        <p className="text-xs text-gray-300 mb-1">Target: {action.target}</p>
                        <p className="text-xs text-gray-400">{action.details}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
