"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Progress } from "@/app/components/ui/progress"
import { Badge } from "@/app/components/ui/badge"
import { Play, Square, Server, Activity, HardDrive, Cpu } from "lucide-react"

interface ProxmoxVM {
  id: string
  name: string
  status: "running" | "stopped"
  cpu: number
  memory: number
  uptime?: string
  node: string
}

const mockVMs: ProxmoxVM[] = [
  {
    id: "100",
    name: "web-server-01",
    status: "running",
    cpu: 45,
    memory: 68,
    uptime: "15d 4h",
    node: "pve-node-1",
  },
  {
    id: "101",
    name: "database-primary",
    status: "running",
    cpu: 78,
    memory: 85,
    uptime: "22d 12h",
    node: "pve-node-1",
  },
  {
    id: "102",
    name: "backup-server",
    status: "stopped",
    cpu: 0,
    memory: 0,
    uptime: "-",
    node: "pve-node-2",
  },
  {
    id: "103",
    name: "monitoring-stack",
    status: "running",
    cpu: 32,
    memory: 42,
    uptime: "8d 16h",
    node: "pve-node-1",
  },
  {
    id: "104",
    name: "dev-environment",
    status: "stopped",
    cpu: 0,
    memory: 0,
    uptime: "-",
    node: "pve-node-2",
  },
  {
    id: "105",
    name: "mail-server",
    status: "running",
    cpu: 15,
    memory: 28,
    uptime: "45d 2h",
    node: "pve-node-1",
  },
  {
    id: "106",
    name: "file-server",
    status: "running",
    cpu: 8,
    memory: 35,
    uptime: "30d 8h",
    node: "pve-node-2",
  },
  {
    id: "107",
    name: "test-vm",
    status: "stopped",
    cpu: 0,
    memory: 0,
    uptime: "-",
    node: "pve-node-1",
  },
]

export default function ProxmoxDashboard() {
  const [vms, setVms] = useState<ProxmoxVM[]>(mockVMs)

  const totalVMs = vms.length
  const runningVMs = vms.filter((vm) => vm.status === "running").length
  const stoppedVMs = vms.filter((vm) => vm.status === "stopped").length

  const handleVMAction = (vmId: string, action: "start" | "stop") => {
    setVms((prevVMs) =>
      prevVMs.map((vm) =>
        vm.id === vmId
          ? {
              ...vm,
              status: action === "start" ? "running" : "stopped",
              cpu: action === "start" ? Math.floor(Math.random() * 80) + 10 : 0,
              memory: action === "start" ? Math.floor(Math.random() * 70) + 20 : 0,
              uptime: action === "start" ? "0d 0h" : "-",
            }
          : vm,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <Server className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Proxmox VE Dashboard</h1>
            <p className="text-zinc-400">Virtual Machine Management & Monitoring</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Server className="w-4 h-4" />
                Total VMs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalVMs}</div>
              <p className="text-xs text-zinc-500 mt-1">Across all nodes</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                Running
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{runningVMs}</div>
              <p className="text-xs text-zinc-500 mt-1">Active virtual machines</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Square className="w-4 h-4 text-red-500" />
                Stopped
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{stoppedVMs}</div>
              <p className="text-xs text-zinc-500 mt-1">Inactive virtual machines</p>
            </CardContent>
          </Card>
        </div>

        {/* VM Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vms.map((vm) => (
            <Card
              key={vm.id}
              className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white truncate">{vm.name}</CardTitle>
                  <Badge
                    variant={vm.status === "running" ? "default" : "secondary"}
                    className={`${
                      vm.status === "running"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    } border`}
                  >
                    {vm.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Server className="w-3 h-3" />
                  <span>ID: {vm.id}</span>
                  <span>•</span>
                  <span>{vm.node}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* CPU Usage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Cpu className="w-3 h-3" />
                      <span>CPU</span>
                    </div>
                    <span className="text-white font-medium">{vm.cpu}%</span>
                  </div>
                  <Progress
                    value={vm.cpu}
                    className="h-2 bg-zinc-800"
                    style={{
                      background: "rgb(39 39 42)",
                    }}
                  />
                </div>

                {/* Memory Usage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <HardDrive className="w-3 h-3" />
                      <span>Memory</span>
                    </div>
                    <span className="text-white font-medium">{vm.memory}%</span>
                  </div>
                  <Progress
                    value={vm.memory}
                    className="h-2 bg-zinc-800"
                    style={{
                      background: "rgb(39 39 42)",
                    }}
                  />
                </div>

                {/* Uptime */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Uptime</span>
                  <span className="text-white font-medium">{vm.uptime}</span>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {vm.status === "running" ? (
                    <Button
                      onClick={() => handleVMAction(vm.id, "stop")}
                      variant="outline"
                      size="sm"
                      className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                    >
                      <Square className="w-3 h-3 mr-2" />
                      Stop VM
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleVMAction(vm.id, "start")}
                      variant="outline"
                      size="sm"
                      className="w-full bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50"
                    >
                      <Play className="w-3 h-3 mr-2" />
                      Start VM
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
