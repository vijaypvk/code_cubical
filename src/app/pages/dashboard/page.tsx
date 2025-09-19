"use client"

import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Cloud, Server, Activity, Zap, TrendingUp, AlertTriangle, Menu, X, RefreshCw, Search, Bell } from "lucide-react"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState("7d")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Sample data that changes based on time range
  const getChartData = (range) => {
    const baseData = {
      "24h": [
        { time: "00:00", spend: 145, usage: 78 },
        { time: "04:00", spend: 132, usage: 65 },
        { time: "08:00", spend: 168, usage: 89 },
        { time: "12:00", spend: 195, usage: 92 },
        { time: "16:00", spend: 187, usage: 85 },
        { time: "20:00", spend: 176, usage: 81 },
      ],
      "7d": [
        { time: "Mon", spend: 2400, usage: 85 },
        { time: "Tue", spend: 2210, usage: 78 },
        { time: "Wed", spend: 2890, usage: 92 },
        { time: "Thu", spend: 3200, usage: 88 },
        { time: "Fri", spend: 3100, usage: 85 },
        { time: "Sat", spend: 2800, usage: 72 },
        { time: "Sun", spend: 2600, usage: 68 },
      ],
      "30d": [
        { time: "Week 1", spend: 18500, usage: 82 },
        { time: "Week 2", spend: 19200, usage: 85 },
        { time: "Week 3", spend: 21100, usage: 89 },
        { time: "Week 4", spend: 22300, usage: 91 },
      ],
    }
    return baseData[range] || baseData["7d"]
  }

  const [chartData, setChartData] = useState(getChartData("7d"))

  // Sample AI actions with more variety
  const allActions = [
    {
      id: 1,
      action: "Restarted VM prod-web-01",
      time: "2 minutes ago",
      type: "vm",
      status: "success",
      severity: "low",
    },
    {
      id: 2,
      action: "Scaled Kubernetes pods to 5 replicas",
      time: "5 minutes ago",
      type: "k8s",
      status: "success",
      severity: "medium",
    },
    {
      id: 3,
      action: "Sent Slack alert for high CPU usage",
      time: "12 minutes ago",
      type: "alert",
      status: "warning",
      severity: "high",
    },
    {
      id: 4,
      action: "Auto-scaled EC2 instance group",
      time: "18 minutes ago",
      type: "scale",
      status: "success",
      severity: "medium",
    },
    {
      id: 5,
      action: "Deployed hotfix to staging environment",
      time: "25 minutes ago",
      type: "deploy",
      status: "success",
      severity: "high",
    },
    {
      id: 6,
      action: "Created backup snapshot for database",
      time: "32 minutes ago",
      type: "backup",
      status: "success",
      severity: "low",
    },
    {
      id: 7,
      action: "Failed to connect to monitoring service",
      time: "45 minutes ago",
      type: "alert",
      status: "error",
      severity: "high",
    },
    {
      id: 8,
      action: "Updated SSL certificates",
      time: "1 hour ago",
      type: "security",
      status: "success",
      severity: "medium",
    },
  ]

  // Filter actions based on search and status
  const filteredActions = allActions.filter((action) => {
    const matchesSearch = action.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || action.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const tabs = ["Overview", "Clouds", "Proxmox", "DevOps", "Incidents"]

  // Dynamic summary cards with live updates
  const [summaryData, setSummaryData] = useState({
    vms: { value: 247, change: "+12", trend: "up" },
    pods: { value: 1834, change: "+45", trend: "up" },
    spend: { value: 3600, change: "+5.9%", trend: "up" },
    actions: { value: 23, change: "+8", trend: "up" },
  })

  const summaryCards = [
    {
      title: "Total VMs",
      value: summaryData.vms.value.toLocaleString(),
      change: summaryData.vms.change,
      icon: Server,
      color: "text-blue-400",
      bgGradient: "from-blue-500/10 to-blue-600/10",
    },
    {
      title: "Active K8s Pods",
      value: summaryData.pods.value.toLocaleString(),
      change: summaryData.pods.change,
      icon: Activity,
      color: "text-green-400",
      bgGradient: "from-green-500/10 to-green-600/10",
    },
    {
      title: "Cloud Spend",
      value: `$${summaryData.spend.value.toLocaleString()}`,
      change: summaryData.spend.change,
      icon: TrendingUp,
      color: "text-purple-400",
      bgGradient: "from-purple-500/10 to-purple-600/10",
    },
    {
      title: "AI Actions Today",
      value: summaryData.actions.value,
      change: summaryData.actions.change,
      icon: Zap,
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/10 to-yellow-600/10",
    },
  ]

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSummaryData((prev) => ({
        vms: { ...prev.vms, value: prev.vms.value + Math.floor(Math.random() * 3) },
        pods: { ...prev.pods, value: prev.pods.value + Math.floor(Math.random() * 10) },
        spend: { ...prev.spend, value: prev.spend.value + Math.floor(Math.random() * 50) },
        actions: { ...prev.actions, value: prev.actions.value + Math.floor(Math.random() * 2) },
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setChartData(getChartData(timeRange))
    setIsRefreshing(false)
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    setChartData(getChartData(range))
  }

  const getActionIcon = (type) => {
    switch (type) {
      case "vm":
        return <Server className="w-4 h-4" />
      case "k8s":
        return <Activity className="w-4 h-4" />
      case "alert":
        return <AlertTriangle className="w-4 h-4" />
      case "scale":
        return <TrendingUp className="w-4 h-4" />
      case "deploy":
        return <Cloud className="w-4 h-4" />
      case "security":
        return <Zap className="w-4 h-4" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-400 bg-green-400/10"
      case "warning":
        return "text-yellow-400 bg-yellow-400/10"
      case "error":
        return "text-red-400 bg-red-400/10"
      default:
        return "text-gray-400 bg-gray-400/10"
    }
  }

  const getSeverityBorder = (severity) => {
    switch (severity) {
      case "high":
        return "border-l-red-400"
      case "medium":
        return "border-l-yellow-400"
      case "low":
        return "border-l-green-400"
      default:
        return "border-l-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-gray-950/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">Infrastructure Hub</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gray-800 text-white shadow-lg border border-gray-700"
                      : "text-gray-400 hover:text-white hover:bg-gray-900/50 border border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-950 border-t border-gray-800">
            <div className="px-4 py-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gray-800 text-white border border-gray-700"
                      : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bgGradient} bg-gray-950 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-105 cursor-pointer backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg bg-gray-900 ${card.color} shadow-lg border border-gray-800`}>
                  <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm text-green-400 font-medium bg-green-400/20 px-2 py-1 rounded-full border border-green-400/30">
                  {card.change}
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white mb-1">{card.value}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Cloud Spend Chart */}
          <div className="bg-gray-950 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-gray-600 transition-all duration-200 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-white">Cloud Spend Over Time</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
                  <div className="w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                  <span>Spend</span>
                </div>
                <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
                  {["24h", "7d", "30d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => handleTimeRangeChange(range)}
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-all duration-200 ${
                        timeRange === range
                          ? "bg-gray-800 text-white border border-gray-700"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 hover:bg-gray-900 rounded-lg"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250} className="sm:h-80">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F0F0F",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  }}
                  formatter={(value) => [`$${value}`, "Spend"]}
                />
                <Area
                  type="monotone"
                  dataKey="spend"
                  stroke="#A855F7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSpend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent AI Actions */}
          <div className="bg-gray-950 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-gray-600 transition-all duration-200 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h3 className="text-lg font-semibold text-white">Recent AI Actions</h3>
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-xs sm:text-sm text-gray-400">Live</span>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredActions.map((action) => (
                <div
                  key={action.id}
                  className={`flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-900/50 rounded-lg border-l-4 ${getSeverityBorder(action.severity)} hover:bg-gray-900/80 transition-all duration-200 cursor-pointer group border border-gray-800/50 hover:border-gray-700`}
                >
                  <div
                    className={`p-2 rounded-lg ${getStatusColor(action.status)} group-hover:scale-110 transition-transform duration-200 border border-gray-800`}
                  >
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium mb-1 group-hover:text-purple-200 transition-colors duration-200">
                      {action.action}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-xs">{action.time}</p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          action.severity === "high"
                            ? "bg-red-400/20 text-red-400 border-red-400/30"
                            : action.severity === "medium"
                              ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                              : "bg-green-400/20 text-green-400 border-green-400/30"
                        }`}
                      >
                        {action.severity}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      action.status === "success"
                        ? "bg-green-400 shadow-lg shadow-green-400/50"
                        : action.status === "warning"
                          ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                          : "bg-red-400 shadow-lg shadow-red-400/50"
                    } group-hover:scale-150 transition-transform duration-200`}
                  ></div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 sm:py-3 text-sm text-gray-400 hover:text-white transition-colors duration-200 border border-gray-800 rounded-lg hover:bg-gray-900/50 hover:border-purple-500 backdrop-blur-sm">
              View All Actions ({allActions.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
