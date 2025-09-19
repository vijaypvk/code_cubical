"use client"

import {
  Monitor,
  Server,
  User,
  Cloud,
  ShieldCheck,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Home,
  Settings,
  Menu,
  X,
  Bot,
  KeyRound,
  BarChart3,
  AlertTriangle,
  CloudCog,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function ResponsiveSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    Dashboards: true,
    Cloud: true,
    Tools: true,
  })

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const isActive = (path) => pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-zinc-800/50 cursor-pointer" onClick={() => router.push("/pages/home")}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src="/pulse.png" alt="Logo" className="w-full h-full" />
          </div>
          <h1 className="text-xl font-bold bg-white bg-clip-text text-transparent">Cloudpulse</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">v0.18.4</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="px-4 py-4 space-y-6 flex-1 overflow-y-auto">
        <MenuItem
          icon={<Home size={16} />}
          label="Home"
          isActive={isActive("/pages/home")}
          onClick={() => router.push("/pages/home")}
        />

        {/* Dashboards Section */}
        <div>
          <SectionHeader
            icon={<BarChart3 size={14} />}
            title="Dashboards"
            onClick={() => toggleSection("Dashboards")}
            isOpen={openSections["Dashboards"]}
          />
          {openSections["Dashboards"] && (
            <ul className="space-y-1">
              <MenuItem
                icon={<Monitor size={16} />}
                label="Main Dashboard"
                isActive={isActive("/pages/dashboard")}
                onClick={() => router.push("/pages/dashboard")}
              />
              <MenuItem
                icon={<Server size={16} />}
                label="DevOps"
                isActive={isActive("/pages/devops-dashboard")}
                onClick={() => router.push("/pages/devops-dashboard")}
              />
              <MenuItem
                icon={<AlertTriangle size={16} />}
                label="Incidents"
                isActive={isActive("/pages/incidents-dashboard")}
                onClick={() => router.push("/pages/incidents-dashboard")}
              />
              <MenuItem
                icon={<Bell size={16} />}
                label="Notifications"
                isActive={isActive("/pages/notifications-dashboard")}
                onClick={() => router.push("/pages/notifications-dashboard")}
              />
              <MenuItem
                icon={<Server size={16} />}
                label="Proxmox"
                isActive={isActive("/pages/proxmox-dashboard")}
                onClick={() => router.push("/pages/proxmox-dashboard")}
              />
            </ul>
          )}
        </div>

        {/* Cloud & Infrastructure Section */}
        <div>
          <SectionHeader
            icon={<Cloud size={14} />}
            title="Cloud & Infrastructure"
            onClick={() => toggleSection("Cloud")}
            isOpen={openSections["Cloud"]}
          />
          {openSections["Cloud"] && (
            <ul className="space-y-1">
              <MenuItem
                icon={<KeyRound size={16} />}
                label="Cloud Credentials"
                isActive={isActive("/pages/cloud-credentials")}
                onClick={() => router.push("/pages/cloud-credentials")}
              />
              <MenuItem
                icon={<CloudCog size={16} />}
                label="Multi-Cloud Resources"
                isActive={isActive("/pages/multi-cloud-resources")}
                onClick={() => router.push("/pages/multi-cloud-resources")}
              />
            </ul>
          )}
        </div>

        {/* Tools & Features Section */}
        <div>
          <SectionHeader
            icon={<Settings size={14} />}
            title="Tools & Features"
            onClick={() => toggleSection("Tools")}
            isOpen={openSections["Tools"]}
          />
          {openSections["Tools"] && (
            <ul className="space-y-1">
              <MenuItem
                icon={<Bot size={16} />}
                label="AI Chatbot"
                isActive={isActive("/pages/ai-chatbot")}
                onClick={() => router.push("/pages/ai-chatbot")}
              />
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mb-3">
          <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Account</h2>
        </div>
        <div className="group bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 cursor-pointer transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-[#4a4a4b] p-2 rounded-full">
                  <User size={16} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-white group-hover:text-zinc-100 transition-colors">Account</p>
                <p className="text-xs text-zinc-400 truncate max-w-32">vijaypvk001@gmail.com</p>
              </div>
            </div>
            <ChevronDown
              size={16}
              className="text-zinc-400 group-hover:text-zinc-300 transition-all duration-200 group-hover:rotate-180"
            />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-[60] md:hidden bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg transition-colors duration-200 border border-zinc-700"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white flex-col z-50 border-r border-zinc-800/50 backdrop-blur-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 bg-zinc-900 text-white flex flex-col z-50 border-r border-zinc-800/50 backdrop-blur-sm transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  )
}

function SectionHeader({ icon, title, onClick, isOpen }) {
  return (
    <div className="flex items-center gap-2 mb-3 px-3 cursor-pointer select-none" onClick={onClick}>
      <div className="text-zinc-400">{icon}</div>
      <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold flex-1">{title}</h2>
      {isOpen ? (
        <ChevronUp size={14} className="text-zinc-400" />
      ) : (
        <ChevronRight size={14} className="text-zinc-400" />
      )}
    </div>
  )
}

function MenuItem({ icon, label, isActive, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-zinc-800 text-white border-l-2 border-[#4a4a4b] shadow-lg"
            : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
        }
      `}
    >
      <div
        className={`
        transition-all duration-200 
        ${isActive ? "text-blue-600 scale-110" : "text-zinc-400 group-hover:text-zinc-300 group-hover:scale-105"}
      `}
      >
        {icon}
      </div>
      <span className={`transition-all duration-200 ${isActive ? "font-semibold" : "group-hover:translate-x-1"}`}>
        {label}
      </span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />}
    </li>
  )
}
