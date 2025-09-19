"use client"

import { useState, useMemo } from "react"
import { Search, Filter, ChevronDown, Activity, Database, HardDrive } from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"
import { Card } from "@/app/components/ui/card"

// Mock data for multi-cloud resources
const mockResources = [
  {
    id: 1,
    provider: "AWS",
    name: "web-server-01",
    type: "VM",
    status: "running",
    cpu: 45,
    memory: 67,
    region: "us-east-1",
  },
  {
    id: 2,
    provider: "GCP",
    name: "analytics-db",
    type: "DB",
    status: "running",
    cpu: 23,
    memory: 89,
    region: "us-central1",
  },
  {
    id: 3,
    provider: "Azure",
    name: "backup-storage",
    type: "Storage",
    status: "stopped",
    cpu: 0,
    memory: 12,
    region: "eastus",
  },
  {
    id: 4,
    provider: "AWS",
    name: "api-gateway",
    type: "VM",
    status: "running",
    cpu: 78,
    memory: 45,
    region: "us-west-2",
  },
  {
    id: 5,
    provider: "GCP",
    name: "ml-training",
    type: "VM",
    status: "running",
    cpu: 92,
    memory: 78,
    region: "us-west1",
  },
  {
    id: 6,
    provider: "Azure",
    name: "user-data",
    type: "DB",
    status: "running",
    cpu: 34,
    memory: 56,
    region: "westus2",
  },
  {
    id: 7,
    provider: "AWS",
    name: "logs-storage",
    type: "Storage",
    status: "running",
    cpu: 5,
    memory: 23,
    region: "eu-west-1",
  },
  {
    id: 8,
    provider: "GCP",
    name: "cache-redis",
    type: "DB",
    status: "stopped",
    cpu: 0,
    memory: 8,
    region: "europe-west1",
  },
]

const providerLogos = {
  AWS: "🟠",
  GCP: "🔵",
  Azure: "🔷",
}

const typeIcons = {
  VM: <Activity size={16} className="text-blue-400" />,
  DB: <Database size={16} className="text-green-400" />,
  Storage: <HardDrive size={16} className="text-purple-400" />,
}

export default function MultiCloudResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All")

  const filteredResources = useMemo(() => {
    return mockResources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.region.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProvider = selectedProvider === "All" || resource.provider === selectedProvider

      return matchesSearch && matchesProvider
    })
  }, [searchTerm, selectedProvider])

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        variant={status === "running" ? "default" : "secondary"}
        className={`${
          status === "running"
            ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
            : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
        } font-medium`}
      >
        <div
          className={`w-2 h-2 rounded-full mr-2 ${status === "running" ? "bg-green-400" : "bg-red-400"} animate-pulse`}
        />
        {status}
      </Badge>
    )
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 80) return "text-red-400"
    if (percentage >= 60) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Multi-Cloud Resources
          </h1>
          <p className="text-zinc-400">Monitor and manage resources across AWS, GCP, and Azure</p>
        </div>

        {/* Filters and Search */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                <Input
                  placeholder="Search resources, types, or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-zinc-600 focus:ring-zinc-600/20"
                />
              </div>

              {/* Provider Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-zinc-900/50 border-zinc-700/50 text-white hover:bg-zinc-800/50 hover:border-zinc-600/50"
                  >
                    <Filter size={16} className="mr-2" />
                    {selectedProvider}
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-zinc-700/50 text-white">
                  <DropdownMenuItem
                    onClick={() => setSelectedProvider("All")}
                    className="hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    All Providers
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedProvider("AWS")}
                    className="hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    🟠 AWS
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedProvider("GCP")}
                    className="hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    🔵 GCP
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedProvider("Azure")}
                    className="hover:bg-zinc-800 focus:bg-zinc-800"
                  >
                    🔷 Azure
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        {/* Resources Table */}
        <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800/50">
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Resource Name
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Type</th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">CPU %</th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                    Memory %
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-zinc-300 uppercase tracking-wider">Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr
                    key={resource.id}
                    className={`border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-zinc-950/20" : "bg-transparent"
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{providerLogos[resource.provider]}</span>
                        <span className="font-medium text-white">{resource.provider}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-zinc-100">{resource.name}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {typeIcons[resource.type]}
                        <span className="text-zinc-200">{resource.type}</span>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(resource.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-semibold ${getUsageColor(resource.cpu)}`}>
                          {resource.cpu}%
                        </span>
                        <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              resource.cpu >= 80 ? "bg-red-500" : resource.cpu >= 60 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${resource.cpu}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono font-semibold ${getUsageColor(resource.memory)}`}>
                          {resource.memory}%
                        </span>
                        <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              resource.memory >= 80
                                ? "bg-red-500"
                                : resource.memory >= 60
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${resource.memory}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-zinc-300 font-mono text-sm">{resource.region}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResources.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-zinc-500 text-lg mb-2">No resources found</div>
              <div className="text-zinc-600 text-sm">Try adjusting your search terms or filters</div>
            </div>
          )}
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm p-4">
            <div className="text-zinc-400 text-sm mb-1">Total Resources</div>
            <div className="text-2xl font-bold text-white">{filteredResources.length}</div>
          </Card>
          <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm p-4">
            <div className="text-zinc-400 text-sm mb-1">Running</div>
            <div className="text-2xl font-bold text-green-400">
              {filteredResources.filter((r) => r.status === "running").length}
            </div>
          </Card>
          <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm p-4">
            <div className="text-zinc-400 text-sm mb-1">Stopped</div>
            <div className="text-2xl font-bold text-red-400">
              {filteredResources.filter((r) => r.status === "stopped").length}
            </div>
          </Card>
          <Card className="bg-zinc-950/50 border-zinc-800/50 backdrop-blur-sm p-4">
            <div className="text-zinc-400 text-sm mb-1">Avg CPU Usage</div>
            <div className="text-2xl font-bold text-blue-400">
              {Math.round(filteredResources.reduce((acc, r) => acc + r.cpu, 0) / filteredResources.length || 0)}%
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
