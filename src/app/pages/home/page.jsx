// "use client";
// import React, { useState } from "react";
// import { GlobeDemo } from "../../components/globe";
// import Sidebar from "../../components/sidebar";
// import { Menu } from "lucide-react";
// import TerminalDemo from "../../components/terminal";
// export default function Home() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-black">

//       {/* Mobile Hamburger */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-md text-white"
//       >
//         <Menu size={20} />
//       </button>

//       <Sidebar isOpen={sidebarOpen} />

//       <main className="flex-1 overflow-y-auto">
//               <div>
//       <TerminalDemo/>
//       </div>
//         <GlobeDemo />
//       </main>

//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { GlobeDemo } from "../../components/globe";
// import Sidebar from "../../components/sidebar";
// import { Menu } from "lucide-react";

// export default function Home() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="relative flex flex-col md:flex-row min-h-screen bg-black overflow-hidden">
//       {/* Mobile Hamburger */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-zinc-800 p-2 rounded-md text-white"
//       >
//         <Menu size={20} />
//       </button>

//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} />

//       {/* Main Content */}
//       <main className="flex-1  flex items-center justify-center">
//         {/* Globe Background */}
//         <div className="absolute inset-0 z-0">
//           <GlobeDemo />
//         </div>

//         {/* Cards Section */}
//         <div className="    absolute 
//     bottom-5 left-1/2 transform -translate-x-1/2 
//     md:bottom-5 md:left-96 md:translate-x-0
//     w-full max-w-6xl z-50 ">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
//             {/* Total Deployments */}
//             <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
//               <div className="text-sm text-neutral-300 mb-1">Total Deployments</div>
//               <div className="text-3xl font-bold">128</div>
//             </div>

//             {/* Build Status */}
//             <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
//               <div className="text-sm text-neutral-300 mb-1">Build Status</div>
//               <div className="flex flex-col text-sm font-medium mt-1">
//                 <span className="flex items-center gap-2 text-green-400">
//                   <svg className="w-3 h-3 fill-green-400" viewBox="0 0 20 20">
//                     <circle cx="10" cy="10" r="10" />
//                   </svg>
//                   36
//                 </span>
//                 <span className="flex items-center gap-2 text-red-400 mt-1">
//                   <svg className="w-3 h-3 fill-red-400" viewBox="0 0 20 20">
//                     <circle cx="10" cy="10" r="10" />
//                   </svg>
//                   2
//                 </span>
//               </div>
//             </div>

//             {/* Active Projects */}
//             <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
//               <div className="text-sm text-neutral-300 mb-1">Active Projects</div>
//               <div className="text-3xl font-bold">5</div>
//             </div>
//           </div>
//         </div>

//         {/* Activity Panel */}
//         <div className="absolute right-4 top-20 z-50 w-60  ">
//           <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
//             <div className="flex items-center  text-lg font-semibold mb-4">
//               <span>Activity</span>
//               <img src="/map.png" alt="Activity Icon" className="w-[50%] h-[50%] ml-9" />
//             </div>
//             <ul className="space-y-3 text-sm">
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
//                 <div>
//                   <p>Deployed <code>'proj2'</code> to production</p>
//                   <p className="text-neutral-400 text-xs">2 minutes ago</p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
//                 <div>
//                   <p>Build succeeded for <code>'proj3'</code></p>
//                   <p className="text-neutral-400 text-xs">1 hour ago</p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
//                 <div>
//                   <p>Build failed for <code>'proj2'</code></p>
//                   <p className="text-neutral-400 text-xs">1 day ago</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Test Panel */}
//         <div className="absolute right-4 bottom-10 z-50 w-60  ">
//           <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
//             <div className="text-lg font-semibold mb-4">Test</div>
//             <ul className="space-y-3 text-sm">
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
//                 <div>
//                   <p>Deployed <code>'proj2'</code> to production</p>
//                   <p className="text-neutral-400 text-xs">2 minutes ago</p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
//                 <div>
//                   <p>Build succeeded for <code>'proj3'</code></p>
//                   <p className="text-neutral-400 text-xs">1 hour ago</p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
//                 <div>
//                   <p>Build failed for <code>'proj2'</code></p>
//                   <p className="text-neutral-400 text-xs">1 day ago</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client"

import { GlobeDemo } from "@/app/components/globe"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Top spacing for mobile hamburger */}
        <div className="h-16" />

        {/* Globe Section - Mobile */}
        <div className="h-[100vh]">
          <GlobeDemo />
        </div>

        {/* Content Section - Mobile */}
        <div className="flex-1 bg-black/50 backdrop-blur-sm">
          <div className="p-4 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              {/* Total Deployments */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md hover:from-white/15 hover:to-white/10 transition-all duration-300">
                <div className="text-sm text-neutral-300 mb-1">Total Deployments</div>
                <div className="text-3xl font-bold">128</div>
              </div>

              {/* Build Status */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md hover:from-white/15 hover:to-white/10 transition-all duration-300">
                <div className="text-sm text-neutral-300 mb-1">Build Status</div>
                <div className="flex flex-col text-sm font-medium mt-1">
                  <span className="flex items-center gap-2 text-green-400">
                    <svg className="w-3 h-3 fill-green-400" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" />
                    </svg>
                    36
                  </span>
                  <span className="flex items-center gap-2 text-red-400 mt-1">
                    <svg className="w-3 h-3 fill-red-400" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" />
                    </svg>
                    2
                  </span>
                </div>
              </div>

              {/* Active Projects */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md hover:from-white/15 hover:to-white/10 transition-all duration-300 sm:col-span-2">
                <div className="text-sm text-neutral-300 mb-1">Active Projects</div>
                <div className="text-3xl font-bold">5</div>
              </div>
            </div>

            {/* Activity Panels */}
            <div className="space-y-4">
              {/* Activity Panel */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
                <div className="flex items-center justify-between text-lg font-semibold mb-4">
                  <span>Activity</span>
                  <div className="w-12 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded opacity-60" />
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-green-400 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Deployed <code className="text-xs bg-white/10 px-1 rounded">{"proj2"}</code> to production
                      </p>
                      <p className="text-neutral-400 text-xs">2 minutes ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-green-400 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Build succeeded for <code className="text-xs bg-white/10 px-1 rounded">{"proj3"}</code>
                      </p>
                      <p className="text-neutral-400 text-xs">1 hour ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-red-500 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Build failed for <code className="text-xs bg-white/10 px-1 rounded">{"proj2"}</code>
                      </p>
                      <p className="text-neutral-400 text-xs">1 day ago</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Test Panel */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
                <div className="text-lg font-semibold mb-4">Test Results</div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-green-400 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Tests passed for <code className="text-xs bg-white/10 px-1 rounded">{"proj2"}</code>
                      </p>
                      <p className="text-neutral-400 text-xs">5 minutes ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-yellow-400 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Tests running for <code className="text-xs bg-white/10 px-1 rounded">{"proj3"}</code>
                      </p>
                      <p className="text-neutral-400 text-xs">10 minutes ago</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-red-500 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="break-words">
                        Tests failed for <code className="text-xs bg-white/10 px-1 rounded">{"proj1"}</code>
                      </p>
                      <p className="text-neutral-400 text-xs">2 hours ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative min-h-screen bg-black text-white">
        {/* Globe Background */}
        <div className="absolute inset-0 z-0 flex items-center mt-16">
          <GlobeDemo />
        </div>

        {/* Cards Section */}
        <div className="absolute bottom-5 left-3/4 transform -translate-x-1/2 md:left-[270px] md:translate-x-0 w-full max-w-6xl px-4 z-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 mx-auto">
            {/* Total Deployments */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Total Deployments</div>
              <div className="text-3xl font-bold">128</div>
            </div>

            {/* Build Status */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Build Status</div>
              <div className="flex flex-col text-sm font-medium mt-1">
                <span className="flex items-center gap-2 text-green-400">
                  <svg className="w-3 h-3 fill-green-400" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                  36
                </span>
                <span className="flex items-center gap-2 text-red-400 mt-1">
                  <svg className="w-3 h-3 fill-red-400" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" />
                  </svg>
                  2
                </span>
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-2xl p-5 text-white shadow-md">
              <div className="text-sm text-neutral-300 mb-1">Active Projects</div>
              <div className="text-3xl font-bold">5</div>
            </div>
          </div>
        </div>

        {/* Activity Panel */}
        <div className="absolute right-4 top-20 z-50 w-72 max-w-full">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
            <div className="flex items-center justify-between text-lg font-semibold mb-4">
              <span>Activity</span>
              <img src="/map.png" alt="Activity Icon" className="w-[50%] h-[50%] ml-9" />
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Deployed <code>'proj2'</code> to production</p>
                  <p className="text-neutral-400 text-xs">2 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Build succeeded for <code>'proj3'</code></p>
                  <p className="text-neutral-400 text-xs">1 hour ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
                <div>
                  <p>Build failed for <code>'proj2'</code></p>
                  <p className="text-neutral-400 text-xs">1 day ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Build succeeded for <code>'proj3'</code></p>
                  <p className="text-neutral-400 text-xs">1 hour ago</p>
                </div>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Test Panel */}
        <div className="absolute right-4 bottom-10 z-50 w-72 max-w-full ">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-xl rounded-xl p-4 text-white shadow-md">
            <div className="text-lg font-semibold mb-4">Test</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-green-400 rounded-full" />
                <div>
                  <p>Tests passed for <code>'proj2'</code></p>
                  <p className="text-neutral-400 text-xs">5 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-yellow-400 rounded-full" />
                <div>
                  <p>Tests running for <code>'proj3'</code></p>
                  <p className="text-neutral-400 text-xs">10 minutes ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
                <div>
                  <p>Tests failed for <code>'proj1'</code></p>
                  <p className="text-neutral-400 text-xs">2 hours ago</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
