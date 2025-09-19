"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import {
  ChevronDown,
  ChevronRight,
  Container,
  Settings,
  GitBranch,
  Github,
  Play,
  Square,
  RotateCcw,
  Eye,
  Zap,
  GitMerge,
  X,
  Search,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data
const dockerContainers = [
  { name: "nginx-proxy", status: "running", ports: "80:80, 443:443", uptime: "2d 14h", image: "nginx:alpine" },
  { name: "redis-cache", status: "running", ports: "6379:6379", uptime: "5d 2h", image: "redis:7-alpine" },
  { name: "postgres-db", status: "running", ports: "5432:5432", uptime: "7d 18h", image: "postgres:15" },
  { name: "api-server", status: "stopped", ports: "3000:3000", uptime: "0m", image: "node:18-alpine" },
  { name: "monitoring", status: "running", ports: "9090:9090", uptime: "3d 8h", image: "prom/prometheus" },
]

const kubernetesPods = [
  {
    name: "frontend-7d4b8c9f-xk2m9",
    namespace: "production",
    status: "Running",
    restarts: 0,
    node: "worker-1",
    age: "2d",
  },
  {
    name: "backend-5f6a7b8c-p9q4r",
    namespace: "production",
    status: "Running",
    restarts: 1,
    node: "worker-2",
    age: "1d",
  },
  {
    name: "database-8c9d0e1f-s7t8u",
    namespace: "production",
    status: "CrashLoopBackOff",
    restarts: 15,
    node: "worker-1",
    age: "3h",
  },
  { name: "cache-2a3b4c5d-v1w2x", namespace: "staging", status: "Pending", restarts: 0, node: "-", age: "5m" },
  {
    name: "worker-6e7f8g9h-y3z4a",
    namespace: "production",
    status: "Running",
    restarts: 0,
    node: "worker-3",
    age: "4d",
  },
]

const jenkinsPipelines = [
  {
    job: "frontend-deploy",
    branch: "main",
    build: 142,
    status: "Success",
    triggeredBy: "john.doe",
    timestamp: "2 hours ago",
  },
  {
    job: "backend-tests",
    branch: "feature/auth",
    build: 89,
    status: "Failed",
    triggeredBy: "jane.smith",
    timestamp: "1 hour ago",
  },
  {
    job: "database-migration",
    branch: "main",
    build: 23,
    status: "Running",
    triggeredBy: "scheduler",
    timestamp: "30 minutes ago",
  },
  {
    job: "security-scan",
    branch: "develop",
    build: 156,
    status: "Success",
    triggeredBy: "mike.wilson",
    timestamp: "4 hours ago",
  },
  {
    job: "integration-tests",
    branch: "main",
    build: 78,
    status: "Failed",
    triggeredBy: "sarah.jones",
    timestamp: "6 hours ago",
  },
]

const githubPRs = [
  {
    title: "Add user authentication system",
    repo: "frontend-app",
    status: "Open",
    author: "john.doe",
    createdAt: "2 days ago",
  },
  {
    title: "Fix database connection pooling",
    repo: "backend-api",
    status: "Merged",
    author: "jane.smith",
    createdAt: "1 day ago",
  },
  {
    title: "Update CI/CD pipeline configuration",
    repo: "devops-config",
    status: "Open",
    author: "mike.wilson",
    createdAt: "3 hours ago",
  },
  {
    title: "Implement caching layer",
    repo: "backend-api",
    status: "Closed",
    author: "sarah.jones",
    createdAt: "5 days ago",
  },
  {
    title: "Add monitoring dashboard",
    repo: "monitoring",
    status: "Open",
    author: "alex.brown",
    createdAt: "1 day ago",
  },
]

const podStatusData = [
  { name: "Running", value: 3, color: "#10b981" },
  { name: "Failed", value: 1, color: "#ef4444" },
  { name: "Pending", value: 1, color: "#f59e0b" },
]

const prStatusData = [
  { status: "Open", count: 3 },
  { status: "Merged", count: 1 },
  { status: "Closed", count: 1 },
]

export default function DevOpsDashboard() {
  const [expandedSections, setExpandedSections] = useState({
    docker: true,
    kubernetes: true,
    jenkins: true,
    github: true,
  })

  const [searchTerms, setSearchTerms] = useState({
    docker: "",
    kubernetes: "",
    jenkins: "",
    github: "",
  })

  const [filters, setFilters] = useState({
    kubernetes: "all",
    jenkins: "all",
    github: "all",
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getStatusBadge = (status: string, type: string) => {
    const statusConfig = {
      docker: {
        running: { color: "bg-green-500/20 text-green-400 border-green-500/30", text: "Running" },
        stopped: { color: "bg-red-500/20 text-red-400 border-red-500/30", text: "Stopped" },
      },
      kubernetes: {
        Running: { color: "bg-green-500/20 text-green-400 border-green-500/30", text: "Running" },
        CrashLoopBackOff: { color: "bg-red-500/20 text-red-400 border-red-500/30", text: "CrashLoopBackOff" },
        Pending: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", text: "Pending" },
      },
      jenkins: {
        Success: { color: "bg-green-500/20 text-green-400 border-green-500/30", text: "Success" },
        Failed: { color: "bg-red-500/20 text-red-400 border-red-500/30", text: "Failed" },
        Running: { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", text: "Running" },
      },
      github: {
        Open: { color: "bg-green-500/20 text-green-400 border-green-500/30", text: "Open" },
        Merged: { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", text: "Merged" },
        Closed: { color: "bg-red-500/20 text-red-400 border-red-500/30", text: "Closed" },
      },
    }

    const config =
      statusConfig[type as keyof typeof statusConfig]?.[
        status as keyof (typeof statusConfig)[keyof typeof statusConfig]
      ]
    return config || { color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30", text: status }
  }

  const filteredData = {
    docker: dockerContainers.filter((container) =>
      container.name.toLowerCase().includes(searchTerms.docker.toLowerCase()),
    ),
    kubernetes: kubernetesPods.filter(
      (pod) =>
        pod.name.toLowerCase().includes(searchTerms.kubernetes.toLowerCase()) &&
        (filters.kubernetes === "all" || pod.status === filters.kubernetes),
    ),
    jenkins: jenkinsPipelines.filter(
      (pipeline) =>
        pipeline.job.toLowerCase().includes(searchTerms.jenkins.toLowerCase()) &&
        (filters.jenkins === "all" || pipeline.status === filters.jenkins),
    ),
    github: githubPRs.filter(
      (pr) =>
        pr.title.toLowerCase().includes(searchTerms.github.toLowerCase()) &&
        (filters.github === "all" || pr.status === filters.github),
    ),
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">DevOps Dashboard</h1>
          <p className="text-zinc-400">Monitor and manage your infrastructure, deployments, and development workflow</p>
        </div>

        {/* Docker Section */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader
            className="cursor-pointer hover:bg-zinc-900/30 transition-colors"
            onClick={() => toggleSection("docker")}
          >
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Container className="h-5 w-5 text-blue-400" />
                <span>Docker Containers</span>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {dockerContainers.filter((c) => c.status === "running").length} Running
                </Badge>
              </div>
              {expandedSections.docker ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.docker && (
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search containers..."
                    value={searchTerms.docker}
                    onChange={(e) => setSearchTerms((prev) => ({ ...prev, docker: e.target.value }))}
                    className="pl-10 bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Container</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Ports</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Uptime</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Image</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.docker.map((container, index) => {
                      const statusBadge = getStatusBadge(container.status, "docker")
                      return (
                        <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                          <td className="py-3 px-4 font-medium">{container.name}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${statusBadge.color} border`}>{statusBadge.text}</Badge>
                          </td>
                          <td className="py-3 px-4 text-zinc-300">{container.ports}</td>
                          <td className="py-3 px-4 text-zinc-300">{container.uptime}</td>
                          <td className="py-3 px-4 text-zinc-300 font-mono text-sm">{container.image}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                              >
                                <Square className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                              >
                                <RotateCcw className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Kubernetes Section */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader
            className="cursor-pointer hover:bg-zinc-900/30 transition-colors"
            onClick={() => toggleSection("kubernetes")}
          >
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-400" />
                <span>Kubernetes Pods</span>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {kubernetesPods.filter((p) => p.status === "Running").length} Running
                </Badge>
              </div>
              {expandedSections.kubernetes ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.kubernetes && (
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search pods..."
                    value={searchTerms.kubernetes}
                    onChange={(e) => setSearchTerms((prev) => ({ ...prev, kubernetes: e.target.value }))}
                    className="pl-10 bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <select
                  value={filters.kubernetes}
                  onChange={(e) => setFilters((prev) => ({ ...prev, kubernetes: e.target.value }))}
                  className="bg-zinc-900/50 border-zinc-700 text-white px-3 py-2 rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Running">Running</option>
                  <option value="CrashLoopBackOff">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-3">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Pod Name</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Namespace</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Restarts</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Node</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Age</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.kubernetes.map((pod, index) => {
                          const statusBadge = getStatusBadge(pod.status, "kubernetes")
                          return (
                            <tr
                              key={index}
                              className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium font-mono text-sm">{pod.name}</td>
                              <td className="py-3 px-4 text-zinc-300">{pod.namespace}</td>
                              <td className="py-3 px-4">
                                <Badge className={`${statusBadge.color} border`}>{statusBadge.text}</Badge>
                              </td>
                              <td className="py-3 px-4 text-zinc-300">{pod.restarts}</td>
                              <td className="py-3 px-4 text-zinc-300">{pod.node}</td>
                              <td className="py-3 px-4 text-zinc-300">{pod.age}</td>
                              <td className="py-3 px-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Logs
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-zinc-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-3">Pod Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie data={podStatusData} cx="50%" cy="50%" innerRadius={20} outerRadius={40} dataKey="value">
                        {podStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1 mt-2">
                    {podStatusData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-zinc-400">{item.name}</span>
                        </div>
                        <span className="text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Jenkins Section */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader
            className="cursor-pointer hover:bg-zinc-900/30 transition-colors"
            onClick={() => toggleSection("jenkins")}
          >
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-orange-400" />
                <span>Jenkins Pipelines</span>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">
                  {jenkinsPipelines.filter((p) => p.status === "Success").length} Success
                </Badge>
              </div>
              {expandedSections.jenkins ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.jenkins && (
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search pipelines..."
                    value={searchTerms.jenkins}
                    onChange={(e) => setSearchTerms((prev) => ({ ...prev, jenkins: e.target.value }))}
                    className="pl-10 bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <select
                  value={filters.jenkins}
                  onChange={(e) => setFilters((prev) => ({ ...prev, jenkins: e.target.value }))}
                  className="bg-zinc-900/50 border-zinc-700 text-white px-3 py-2 rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Running">Running</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Job Name</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Branch</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Build #</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Triggered By</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.jenkins.map((pipeline, index) => {
                      const statusBadge = getStatusBadge(pipeline.status, "jenkins")
                      return (
                        <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                          <td className="py-3 px-4 font-medium">{pipeline.job}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-zinc-700/30 text-zinc-300 border-zinc-600">
                              <GitBranch className="h-3 w-3 mr-1" />
                              {pipeline.branch}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-zinc-300">#{pipeline.build}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${statusBadge.color} border`}>{statusBadge.text}</Badge>
                          </td>
                          <td className="py-3 px-4 text-zinc-300">{pipeline.triggeredBy}</td>
                          <td className="py-3 px-4 text-zinc-300">{pipeline.timestamp}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Build
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Console
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          )}
        </Card>

        {/* GitHub Section */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm">
          <CardHeader
            className="cursor-pointer hover:bg-zinc-900/30 transition-colors"
            onClick={() => toggleSection("github")}
          >
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-purple-400" />
                <span>GitHub Pull Requests</span>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                  {githubPRs.filter((pr) => pr.status === "Open").length} Open
                </Badge>
              </div>
              {expandedSections.github ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CardTitle>
          </CardHeader>
          {expandedSections.github && (
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search pull requests..."
                    value={searchTerms.github}
                    onChange={(e) => setSearchTerms((prev) => ({ ...prev, github: e.target.value }))}
                    className="pl-10 bg-zinc-900/50 border-zinc-700 text-white placeholder-zinc-400"
                  />
                </div>
                <select
                  value={filters.github}
                  onChange={(e) => setFilters((prev) => ({ ...prev, github: e.target.value }))}
                  className="bg-zinc-900/50 border-zinc-700 text-white px-3 py-2 rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Merged">Merged</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-3">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">PR Title</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Repository</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Author</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Created</th>
                          <th className="text-left py-3 px-4 text-zinc-400 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.github.map((pr, index) => {
                          const statusBadge = getStatusBadge(pr.status, "github")
                          return (
                            <tr
                              key={index}
                              className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium max-w-xs truncate">{pr.title}</td>
                              <td className="py-3 px-4 text-zinc-300 font-mono text-sm">{pr.repo}</td>
                              <td className="py-3 px-4">
                                <Badge className={`${statusBadge.color} border`}>{statusBadge.text}</Badge>
                              </td>
                              <td className="py-3 px-4 text-zinc-300">{pr.author}</td>
                              <td className="py-3 px-4 text-zinc-300">{pr.createdAt}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  {pr.status === "Open" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-7 px-2 border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                                    >
                                      <GitMerge className="h-3 w-3 mr-1" />
                                      Merge
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 px-2 border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                                  >
                                    <X className="h-3 w-3 mr-1" />
                                    Close
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-zinc-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-zinc-300 mb-3">PR Status Overview</h4>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={prStatusData}>
                      <XAxis
                        dataKey="status"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#a1a1aa" }}
                      />
                      <YAxis hide />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-1 mt-2">
                    {prStatusData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{item.status}</span>
                        <span className="text-white">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
