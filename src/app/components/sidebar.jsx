
// "use client";
// import {
//   Folder,Monitor,  HardDrive,  Layers,  Server,  User,  KeyRound,  GitBranch,  Package,  Cloud,  ShieldCheck,  Network, Bell,  ChevronDown,  ChevronRight,  ChevronUp,  Home,  Settings,  Mail,
// } from "lucide-react";
// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";

// // Mock Docker icon component using Server icon
// const DockerIcon = () => <Server size={16} />;

// export default function Sidebar() {
//   const router = useRouter();
//   const pathname = usePathname(); // ✅ Get current route
//   const [openSections, setOpenSections] = useState({
//     Home: true,
//     Settings: true,
//   });

//   const toggleSection = (section) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const isActive = (path) => pathname === path;

//   return (
//     <aside className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 text-white flex flex-col z-50 border-r border-zinc-800/50 backdrop-blur-sm">
//       <div className="flex-1 overflow-y-auto">
//         {/* Logo */}
//         <div
//           className="px-6 py-6 border-b border-zinc-800/50 cursor-pointer"
//           onClick={() => router.push("/pages/home")}
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-8 h-8 rounded-lg flex items-center justify-center">
//               <img src="/pulse.png" alt="Logo" />
//             </div>
//             <h1 className="text-xl font-bold bg-white bg-clip-text text-transparent">
//               Cloudpulse
//             </h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded-full">
//               v0.18.4
//             </span>
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         {/* Navigation Sections */}
//         <div className="px-4 py-4 space-y-6">
//           <MenuItem
//             icon={<Layers size={16} />}
//             label="Get Started"
//             isActive={isActive("/pages/home")}
//             onClick={() => router.push("/pages/home")}
//           />

//           {/* Home Section */}
//           <div>
//             <SectionHeader
//               icon={<Home size={14} />}
//               title="Home"
//               onClick={() => toggleSection("Home")}
//               isOpen={openSections["Home"]}
//             />
//             {openSections["Home"] && (
//               <ul className="space-y-1">
//                 <MenuItem
//                   icon={<Folder size={16} />}
//                   label="Pages"
//                   isActive={isActive("/pages/hostingpage")}
//                   onClick={() => router.push("/pages/hostingpage")}
//                 />
//                 <MenuItem
//                   icon={<Monitor size={16} />}
//                   label="Monitoring"
//                   isActive={isActive("/pages/monitoring")}
//                   onClick={() => router.push("/pages/monitoring")}
//                 />
//                 <MenuItem
//                   icon={<HardDrive size={16} />}
//                   label="Traefik File System"
//                   isActive={isActive("/pages/traefik")}
//                   onClick={() => router.push("/pages/traefik")}
//                 />
//                 <MenuItem
//                   icon={<DockerIcon />}
//                   label="Docker"
//                   isActive={isActive("/pages/docker")}
//                   onClick={() => router.push("/pages/docker")}
//                 />
//                 <MenuItem
//                   icon={<Layers size={16} />}
//                   label="Swarm"
//                   isActive={isActive("/pages/swarm")}
//                   onClick={() => router.push("/pages/swarm")}
//                 />
//                 <MenuItem
//                   icon={<Mail size={16} />}
//                   label="Requests"
//                   isActive={isActive("/pages/requests")}
//                   onClick={() => router.push("/pages/requests")}
//                 />
//               </ul>
//             )}
//           </div>

//           {/* Settings Section */}
//           <div>
//             <SectionHeader
//               icon={<Settings size={14} />}
//               title="Settings"
//               onClick={() => toggleSection("Settings")}
//               isOpen={openSections["Settings"]}
//             />
//             {openSections["Settings"] && (
//               <ul className="space-y-1">
//                 <MenuItem
//                   icon={<Server size={16} />}
//                   label="Web Server"
//                   isActive={isActive("/settings/web-server")}
//                   onClick={() => router.push("/settings/web-server")}
//                 />
//                 <MenuItem
//                   icon={<User size={16} />}
//                   label="Profile"
//                   isActive={isActive("/settings/profile")}
//                   onClick={() => router.push("/settings/profile")}
//                 />
//                 <MenuItem
//                   icon={<Network size={16} />}
//                   label="Remote Servers"
//                   isActive={isActive("/settings/remote-servers")}
//                   onClick={() => router.push("/settings/remote-servers")}
//                 />
//                 <MenuItem
//                   icon={<User size={16} />}
//                   label="Users"
//                   isActive={isActive("/settings/users")}
//                   onClick={() => router.push("/settings/users")}
//                 />
//                 <MenuItem
//                   icon={<KeyRound size={16} />}
//                   label="SSH Keys"
//                   isActive={isActive("/settings/ssh-keys")}
//                   onClick={() => router.push("/settings/ssh-keys")}
//                 />
//                 <MenuItem
//                   icon={<GitBranch size={16} />}
//                   label="Git"
//                   isActive={isActive("/settings/git")}
//                   onClick={() => router.push("/settings/git")}
//                 />
//                 <MenuItem
//                   icon={<Package size={16} />}
//                   label="Registry"
//                   isActive={isActive("/settings/registry")}
//                   onClick={() => router.push("/settings/registry")}
//                 />
//                 <MenuItem
//                   icon={<Cloud size={16} />}
//                   label="S3 Destinations"
//                   isActive={isActive("/settings/s3")}
//                   onClick={() => router.push("/settings/s3")}
//                 />
//                 <MenuItem
//                   icon={<ShieldCheck size={16} />}
//                   label="Certificates"
//                   isActive={isActive("/settings/certificates")}
//                   onClick={() => router.push("/settings/certificates")}
//                 />
//                 <MenuItem
//                   icon={<Layers size={16} />}
//                   label="Cluster"
//                   isActive={isActive("/settings/cluster")}
//                   onClick={() => router.push("/settings/cluster")}
//                 />
//                 <MenuItem
//                   icon={<Bell size={16} />}
//                   label="Notifications"
//                   isActive={isActive("/settings/notifications")}
//                   onClick={() => router.push("/settings/notifications")}
//                 />
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm">
//         <div className="mb-3">
//           <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Account</h2>
//         </div>
//         <div className="group bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 cursor-pointer transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="bg-[#4a4a4b] p-2 rounded-full">
//                   <User size={16} className="text-white" />
//                 </div>
//                 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
//               </div>
//               <div className="text-sm">
//                 <p className="font-medium text-white group-hover:text-zinc-100 transition-colors">
//                   Account
//                 </p>
//                 <p className="text-xs text-zinc-400 truncate max-w-32">
//                   vijaypvk001@gmail.com
//                 </p>
//               </div>
//             </div>
//             <ChevronDown size={16} className="text-zinc-400 group-hover:text-zinc-300 transition-all duration-200 group-hover:rotate-180" />
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function SectionHeader({ icon, title, onClick, isOpen }) {
//   return (
//     <div className="flex items-center gap-2 mb-3 px-3 cursor-pointer select-none" onClick={onClick}>
//       <div className="text-zinc-400">{icon}</div>
//       <h2 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold flex-1">{title}</h2>
//       {isOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronRight size={14} className="text-zinc-400" />}
//     </div>
//   );
// }

// function MenuItem({ icon, label, isActive, onClick }) {
//   return (
//     <li
//       onClick={onClick}
//       className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ease-in-out
//         ${isActive
//           ? "bg-zinc-800 text-white border-l-2 border-[#4a4a4b] shadow-lg"
//           : "text-zinc-300 hover:bg-zinc-800/50 hover:text-white"
//         }
//       `}
//     >
//       <div className={`
//         transition-all duration-200 
//         ${isActive ? "text-blue-600 scale-110" : "text-zinc-400 group-hover:text-zinc-300 group-hover:scale-105"}
//       `}>
//         {icon}
//       </div>
//       <span className={`transition-all duration-200 ${isActive ? "font-semibold" : "group-hover:translate-x-1"}`}>
//         {label}
//       </span>
//       {isActive && (
//         <div className="ml-auto w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
//       )}
//     </li>
//   );
// }
"use client"

import {
  Folder,
  Monitor,
  HardDrive,
  Layers,
  Server,
  User,
  KeyRound,
  GitBranch,
  Package,
  Cloud,
  ShieldCheck,
  Network,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Home,
  Settings,
  Mail,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

// Mock Docker icon component using Server icon
const DockerIcon = () => <Server size={16} />

export default function ResponsiveSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openSections, setOpenSections] = useState({
    Home: true,
    Settings: true,
  })

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

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
          icon={<Layers size={16} />}
          label="Get Started"
          isActive={isActive("/pages/home")}
          onClick={() => router.push("/pages/home")}
        />

        {/* Home Section */}
        <div>
          <SectionHeader
            icon={<Home size={14} />}
            title="Home"
            onClick={() => toggleSection("Home")}
            isOpen={openSections["Home"]}
          />
          {openSections["Home"] && (
            <ul className="space-y-1">
              <MenuItem
                icon={<Folder size={16} />}
                label="Pages"
                isActive={isActive("/pages/hostingpage")}
                onClick={() => router.push("/pages/hostingpage")}
              />
              <MenuItem
                icon={<Monitor size={16} />}
                label="Monitoring"
                isActive={isActive("/pages/monitoring")}
                onClick={() => router.push("/pages/monitoring")}
              />
              <MenuItem
                icon={<HardDrive size={16} />}
                label="Traefik File System"
                isActive={isActive("/pages/traefik")}
                onClick={() => router.push("/pages/traefik")}
              />
              <MenuItem
                icon={<DockerIcon />}
                label="Docker"
                isActive={isActive("/pages/docker")}
                onClick={() => router.push("/pages/docker")}
              />
              <MenuItem
                icon={<Layers size={16} />}
                label="Swarm"
                isActive={isActive("/pages/swarm")}
                onClick={() => router.push("/pages/swarm")}
              />
              <MenuItem
                icon={<Mail size={16} />}
                label="Requests"
                isActive={isActive("/pages/requests")}
                onClick={() => router.push("/pages/requests")}
              />
            </ul>
          )}
        </div>

        {/* Settings Section */}
        <div>
          <SectionHeader
            icon={<Settings size={14} />}
            title="Settings"
            onClick={() => toggleSection("Settings")}
            isOpen={openSections["Settings"]}
          />
          {openSections["Settings"] && (
            <ul className="space-y-1">
              <MenuItem
                icon={<Server size={16} />}
                label="Web Server"
                isActive={isActive("/settings/web-server")}
                onClick={() => router.push("/settings/web-server")}
              />
              <MenuItem
                icon={<User size={16} />}
                label="Profile"
                isActive={isActive("/settings/profile")}
                onClick={() => router.push("/settings/profile")}
              />
              <MenuItem
                icon={<Network size={16} />}
                label="Remote Servers"
                isActive={isActive("/settings/remote-servers")}
                onClick={() => router.push("/settings/remote-servers")}
              />
              <MenuItem
                icon={<User size={16} />}
                label="Users"
                isActive={isActive("/settings/users")}
                onClick={() => router.push("/settings/users")}
              />
              <MenuItem
                icon={<KeyRound size={16} />}
                label="SSH Keys"
                isActive={isActive("/settings/ssh-keys")}
                onClick={() => router.push("/settings/ssh-keys")}
              />
              <MenuItem
                icon={<GitBranch size={16} />}
                label="Git"
                isActive={isActive("/settings/git")}
                onClick={() => router.push("/settings/git")}
              />
              <MenuItem
                icon={<Package size={16} />}
                label="Registry"
                isActive={isActive("/settings/registry")}
                onClick={() => router.push("/settings/registry")}
              />
              <MenuItem
                icon={<Cloud size={16} />}
                label="S3 Destinations"
                isActive={isActive("/settings/s3")}
                onClick={() => router.push("/settings/s3")}
              />
              <MenuItem
                icon={<ShieldCheck size={16} />}
                label="Certificates"
                isActive={isActive("/settings/certificates")}
                onClick={() => router.push("/settings/certificates")}
              />
              <MenuItem
                icon={<Layers size={16} />}
                label="Cluster"
                isActive={isActive("/settings/cluster")}
                onClick={() => router.push("/settings/cluster")}
              />
              <MenuItem
                icon={<Bell size={16} />}
                label="Notifications"
                isActive={isActive("/settings/notifications")}
                onClick={() => router.push("/settings/notifications")}
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
