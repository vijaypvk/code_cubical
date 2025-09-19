

// // "use client";
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import {
// //   Search,
// //   ChevronDown,
// //   Plus,
// //   Archive,
// //   Database,
// //   FileText,
// //   Ghost,
// //   Leaf,
// //   CircleDot,
// //   Zap,
// //   Receipt,
// // } from 'lucide-react';

// // const DashboardHome = () => {
// //   const [selectedServices, setSelectedServices] = useState(new Set());

// //   const services = [
// //     { id: 'plausible', name: 'plausible', icon: <Archive className="w-5 h-5" />, createdAt: 'Created less than a minute ago', status: 'inactive' },
// //     { id: 'supabase', name: 'supabase', icon: <Database className="w-5 h-5" />, createdAt: 'Created less than a minute ago', status: 'inactive' },
// //     { id: 'appwrite', name: 'appwrite', icon: <FileText className="w-5 h-5" />, createdAt: 'Created 1 minute ago', status: 'active' },
// //     { id: 'ghost', name: 'ghost', icon: <Ghost className="w-5 h-5" />, createdAt: 'Created about 3 hours ago', status: 'active' },
// //     { id: 'mongo', name: 'mongo', icon: <Leaf className="w-5 h-5 text-green-500" />, createdAt: 'Created about 3 hours ago', status: 'active' },
// //     { id: 'odoo', name: 'odoo', icon: <CircleDot className="w-5 h-5" />, createdAt: 'Created 2 days ago', status: 'active' },
// //     { id: 'pg', name: 'pg', icon: <Zap className="w-5 h-5 text-blue-500" />, createdAt: 'Created 4 days ago', status: 'active' },
// //     { id: 'invoiceninja', name: 'invoiceninja', icon: <Receipt className="w-5 h-5" />, createdAt: 'Created about 1 month ago', status: 'inactive' },
// //   ];

// //   const handleSelectAll = () => {
// //     if (selectedServices.size === services.length) {
// //       setSelectedServices(new Set());
// //     } else {
// //       setSelectedServices(new Set(services.map((s) => s.id)));
// //     }
// //   };

// //   const handleSelectService = (serviceId) => {
// //     const newSelected = new Set(selectedServices);
// //     if (newSelected.has(serviceId)) {
// //       newSelected.delete(serviceId);
// //     } else {
// //       newSelected.add(serviceId);
// //     }
// //     setSelectedServices(newSelected);
// //   };

// //   const getStatusIndicator = (status) => (
// //     <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`} />
// //   );

// //   return (
// //     <div className="bg-black text-gray-300 relative min-h-screen ml-64 ">

// //       <div className="text-sm text-gray-400 flex items-center space-x-2 mx-6 mt-7 mb-11">
// //         <span>Pages</span>
        
// //       </div>

// //       {/* Project Header */}
// //       <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl mx-6 mt-4 px-6 py-4 flex items-center justify-between">
// //         <div className="flex items-center space-x-3">
// //           <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
// //             <Archive className="w-4 h-4" />
// //           </div>
// //           <h1 className="text-xl font-medium text-white">Testing</h1>
// //         </div>

// //         <div className="flex items-center space-x-3">
// //           <button className="px-3 py-1.5 bg-[#a7a7aa] hover:bg-gray-700 rounded text-sm text-black hover:text-white">
// //             Project Environment
// //           </button>
// //           <Link href="/pages/gitconnect">

// //           <button
// //            className="px-3 py-1.5 bg-[#a7a7aa] text-black hover:bg-gray-100 rounded text-sm flex items-center space-x-2">
// //             <Plus className="w-4 h-4" />            
// //             <span>Create Service</span>
// //           </button>
// //           </Link>
// //         </div>
// //       </div>
// //       {/* Filter & Controls */}
// //       <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl mx-6 mt-4 px-6 py-4">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center space-x-4">
// //             <label className="flex items-center space-x-2 cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 checked={selectedServices.size === services.length}
// //                 onChange={handleSelectAll}
// //                 className="w-4 h-4 bg-gray-800 border-gray-600 rounded"
// //               />
// //               <span className="text-sm text-gray-400">Select All</span>
// //             </label>
// //             <button className="text-sm text-gray-400 hover:text-white">
// //               Bulk Actions
// //             </button>
// //           </div>

// //           <div className="flex items-center space-x-3">
// //             <div className="relative">
// //               <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Filter services..."
// //                 className="pl-10 pr-4 py-2 bg-[#1f1f22] border border-gray-700 rounded text-sm w-64 focus:outline-none focus:border-gray-600"
// //               />
// //             </div>
// //             <button className="flex items-center space-x-2 px-3 py-2 bg-[#1f1f22] border border-gray-700 rounded text-sm hover:bg-gray-800 text-white">
// //               <span>Select types...</span>
// //               <ChevronDown className="w-4 h-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       {/* </div> */}

// //       {/* Services Grid */}
// //       <div className="p-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {services.map((service) => (
// //             <div
// //               key={service.id}
// //               className="relative bg-[#18181b] border border-[#2c2c2e] rounded-xl p-6 transition-colors hover:border-gray-500"
// //             >
// //               {/* Status */}
// //               <div className="absolute top-4 right-4">
// //                 {getStatusIndicator(service.status)}
// //               </div>

// //               {/* Icon */}
// //               <div className="absolute top-4 right-12">
// //                 <div className="w-6 h-6 bg-[#1c1c1e] rounded flex items-center justify-center">
// //                   {service.icon}
// //                 </div>
// //               </div>

// //               {/* Content */}
// //               <div className="pr-16">
// //                 <h3 className="text-white font-medium mb-2">{service.name}</h3>
// //                 <p className="text-gray-400 text-sm">{service.createdAt}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DashboardHome;
// "use client"

// import { useState, useMemo } from "react"
// import Link from "next/link"
// import {
//   Search,
//   ChevronDown,
//   Plus,
//   Archive,
//   Database,
//   FileText,
//   Ghost,
//   Leaf,
//   CircleDot,
//   Zap,
//   Receipt,
//   MoreVertical,
//   Play,
//   Pause,
//   Settings,
//   Trash2,
//   ExternalLink,
//   Filter,
//   Grid3X3,
//   List,
//   Calendar,
//   Activity,
// } from "lucide-react"

// const DashboardHome = () => {
//   const [selectedServices, setSelectedServices] = useState(new Set())
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterType, setFilterType] = useState("all")
//   const [viewMode, setViewMode] = useState("grid")
//   const [showFilters, setShowFilters] = useState(false)

//   const services = [
//     {
//       id: "plausible",
//       name: "Plausible Analytics",
//       type: "Analytics",
//       icon: <Archive className="w-5 h-5" />,
//       createdAt: "Created less than a minute ago",
//       status: "inactive",
//       description: "Privacy-focused web analytics",
//       lastActivity: "2 hours ago",
//       version: "v2.1.0",
//     },
//     {
//       id: "supabase",
//       name: "Supabase",
//       type: "Database",
//       icon: <Database className="w-5 h-5" />,
//       createdAt: "Created less than a minute ago",
//       status: "inactive",
//       description: "Open source Firebase alternative",
//       lastActivity: "5 minutes ago",
//       version: "v2.38.0",
//     },
//     {
//       id: "appwrite",
//       name: "Appwrite",
//       type: "Backend",
//       icon: <FileText className="w-5 h-5" />,
//       createdAt: "Created 1 minute ago",
//       status: "active",
//       description: "Backend-as-a-Service platform",
//       lastActivity: "Active now",
//       version: "v1.4.13",
//     },
//     {
//       id: "ghost",
//       name: "Ghost CMS",
//       type: "CMS",
//       icon: <Ghost className="w-5 h-5" />,
//       createdAt: "Created about 3 hours ago",
//       status: "active",
//       description: "Professional publishing platform",
//       lastActivity: "1 hour ago",
//       version: "v5.73.0",
//     },
//     {
//       id: "mongo",
//       name: "MongoDB",
//       type: "Database",
//       icon: <Leaf className="w-5 h-5 text-green-500" />,
//       createdAt: "Created about 3 hours ago",
//       status: "active",
//       description: "NoSQL document database",
//       lastActivity: "Active now",
//       version: "v7.0",
//     },
//     {
//       id: "odoo",
//       name: "Odoo ERP",
//       type: "Business",
//       icon: <CircleDot className="w-5 h-5" />,
//       createdAt: "Created 2 days ago",
//       status: "active",
//       description: "All-in-one business software",
//       lastActivity: "30 minutes ago",
//       version: "v17.0",
//     },
//     {
//       id: "pg",
//       name: "PostgreSQL",
//       type: "Database",
//       icon: <Zap className="w-5 h-5 text-blue-500" />,
//       createdAt: "Created 4 days ago",
//       status: "active",
//       description: "Advanced open source database",
//       lastActivity: "Active now",
//       version: "v16.1",
//     },
//     {
//       id: "invoiceninja",
//       name: "Invoice Ninja",
//       type: "Finance",
//       icon: <Receipt className="w-5 h-5" />,
//       createdAt: "Created about 1 month ago",
//       status: "inactive",
//       description: "Invoice and payment management",
//       lastActivity: "2 days ago",
//       version: "v5.7.23",
//     },
//   ]

//   const serviceTypes = ["all", "Database", "Analytics", "Backend", "CMS", "Business", "Finance"]

//   const filteredServices = useMemo(() => {
//     return services.filter((service) => {
//       const matchesSearch =
//         service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.description.toLowerCase().includes(searchQuery.toLowerCase())
//       const matchesType = filterType === "all" || service.type === filterType
//       return matchesSearch && matchesType
//     })
//   }, [searchQuery, filterType])

//   const handleSelectAll = () => {
//     if (selectedServices.size === filteredServices.length) {
//       setSelectedServices(new Set())
//     } else {
//       setSelectedServices(new Set(filteredServices.map((s) => s.id)))
//     }
//   }

//   const handleSelectService = (serviceId) => {
//     const newSelected = new Set(selectedServices)
//     if (newSelected.has(serviceId)) {
//       newSelected.delete(serviceId)
//     } else {
//       newSelected.add(serviceId)
//     }
//     setSelectedServices(newSelected)
//   }

//   const getStatusIndicator = (status) => (
//     <div className={`flex items-center space-x-2`}>
//       <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500" : "bg-gray-500"}`} />
//       <span className={`text-xs font-medium ${status === "active" ? "text-green-400" : "text-gray-400"}`}>
//         {status === "active" ? "Active" : "Inactive"}
//       </span>
//     </div>
//   )

//   const getTypeColor = (type) => {
//     const colors = {
//       Database: "bg-blue-500/10 text-blue-400 border-blue-500/20",
//       Analytics: "bg-purple-500/10 text-purple-400 border-purple-500/20",
//       Backend: "bg-orange-500/10 text-orange-400 border-orange-500/20",
//       CMS: "bg-pink-500/10 text-pink-400 border-pink-500/20",
//       Business: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
//       Finance: "bg-green-500/10 text-green-400 border-green-500/20",
//     }
//     return colors[type] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
//   }

//   return (
//     <div className="bg-black text-gray-300 min-h-screen ">
//       {/* Breadcrumb */}
//       <div className="px-6 pt-6 pb-2">
//         <div className="text-sm text-gray-400 flex items-center space-x-2">
//           <span>pages</span>
//           <span>/</span>
//           <span className="text-white">Services</span>
//         </div>
//       </div>

//       {/* Project Header */}
//       <div className="px-6 mb-6">
//         <div className="bg-gradient-to-r from-[#18181b] to-[#1a1a1d] border border-[#2c2c2e] rounded-2xl p-6 shadow-xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
//                 <Archive className="w-6 h-6 text-gray-300" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-white mb-1">Project</h1>
//                 <p className="text-gray-400 text-sm">Manage your services and deployments</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button className="px-4 py-2 bg-[#2a2a2d] hover:bg-[#3a3a3d] border border-[#3c3c3e] rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2">
//                 <Settings className="w-4 h-4" />
//                 <span>Environment</span>
//               </button>
//               <Link href="/pages/gitconnect">
//                 <button className="px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
//                   <Plus className="w-4 h-4" />
//                   <span>Create Service</span>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="px-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm">Total Services</p>
//                 <p className="text-2xl font-bold text-white">{services.length}</p>
//               </div>
//               <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
//                 <Database className="w-5 h-5 text-blue-400" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm">Active</p>
//                 <p className="text-2xl font-bold text-green-400">
//                   {services.filter((s) => s.status === "active").length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
//                 <Activity className="w-5 h-5 text-green-400" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm">Inactive</p>
//                 <p className="text-2xl font-bold text-gray-400">
//                   {services.filter((s) => s.status === "inactive").length}
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
//                 <Pause className="w-5 h-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-400 text-sm">Selected</p>
//                 <p className="text-2xl font-bold text-white">{selectedServices.size}</p>
//               </div>
//               <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
//                 <Calendar className="w-5 h-5 text-purple-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="px-6 mb-6">
//         <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
//             <div className="flex items-center space-x-4">
//               <label className="flex items-center space-x-2 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={selectedServices.size === filteredServices.length && filteredServices.length > 0}
//                   onChange={handleSelectAll}
//                   className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
//                   Select All ({filteredServices.length})
//                 </span>
//               </label>
//               {selectedServices.size > 0 && (
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
//                     <Trash2 className="w-3 h-3" />
//                     <span>Delete ({selectedServices.size})</span>
//                   </button>
//                   <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
//                     <Play className="w-3 h-3" />
//                     <span>Start</span>
//                   </button>
//                   <button className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
//                     <Pause className="w-3 h-3" />
//                     <span>Stop</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search services..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
//                 />
//               </div>

//               <div className="relative">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="flex items-center space-x-2 px-3 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm hover:bg-gray-800 text-white transition-all duration-200"
//                 >
//                   <Filter className="w-4 h-4" />
//                   <span>{filterType === "all" ? "All Types" : filterType}</span>
//                   <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
//                 </button>

//                 {showFilters && (
//                   <div className="absolute right-0 top-full mt-2 w-48 bg-[#1f1f22] border border-gray-700 rounded-lg shadow-xl z-10">
//                     {serviceTypes.map((type) => (
//                       <button
//                         key={type}
//                         onClick={() => {
//                           setFilterType(type)
//                           setShowFilters(false)
//                         }}
//                         className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
//                           filterType === type ? "text-blue-400 bg-blue-500/10" : "text-gray-300"
//                         }`}
//                       >
//                         {type === "all" ? "All Types" : type}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center bg-[#1f1f22] border border-gray-700 rounded-lg">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Services */}
//       <div className="px-6 pb-6">
//         {filteredServices.length === 0 ? (
//           <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-12 text-center">
//             <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
//             <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
//             <button
//               onClick={() => {
//                 setSearchQuery("")
//                 setFilterType("all")
//               }}
//               className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all duration-200"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <div
//             className={
//               viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
//             }
//           >
//             {filteredServices.map((service) => (
//               <div
//                 key={service.id}
//                 className={`group relative bg-[#18181b] border border-[#2c2c2e] rounded-xl transition-all duration-300 hover:border-gray-500 hover:shadow-xl hover:shadow-black/20 ${
//                   selectedServices.has(service.id) ? "ring-2 ring-blue-500 border-blue-500" : ""
//                 } ${viewMode === "list" ? "flex items-center p-4" : "p-6"}`}
//               >
//                 {viewMode === "grid" ? (
//                   <>
//                     {/* Selection Checkbox */}
//                     <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                       <input
//                         type="checkbox"
//                         checked={selectedServices.has(service.id)}
//                         onChange={() => handleSelectService(service.id)}
//                         className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>

//                     {/* Status and Actions */}
//                     <div className="absolute top-4 right-4 flex items-center space-x-2">
//                       {getStatusIndicator(service.status)}
//                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                         <button className="p-1 hover:bg-gray-700 rounded">
//                           <MoreVertical className="w-4 h-4 text-gray-400" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Service Icon */}
//                     <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4 shadow-lg">
//                       {service.icon}
//                     </div>

//                     {/* Service Info */}
//                     <div className="space-y-3">
//                       <div>
//                         <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">
//                           {service.name}
//                         </h3>
//                         <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
//                       </div>

//                       <div className="flex items-center justify-between">
//                         <span
//                           className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(service.type)}`}
//                         >
//                           {service.type}
//                         </span>
//                         <span className="text-xs text-gray-500">{service.version}</span>
//                       </div>

//                       <div className="pt-2 border-t border-gray-800">
//                         <p className="text-xs text-gray-500 mb-2">{service.createdAt}</p>
//                         <p className="text-xs text-gray-400">Last activity: {service.lastActivity}</p>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex items-center space-x-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                         <button className="flex-1 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1">
//                           <ExternalLink className="w-3 h-3" />
//                           <span>Open</span>
//                         </button>
//                         <button className="flex-1 px-3 py-1.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border border-gray-500/20 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1">
//                           <Settings className="w-3 h-3" />
//                           <span>Config</span>
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* List View */}
//                     <div className="flex items-center space-x-4 flex-1">
//                       <input
//                         type="checkbox"
//                         checked={selectedServices.has(service.id)}
//                         onChange={() => handleSelectService(service.id)}
//                         className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
//                       />

//                       <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
//                         {service.icon}
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-white font-medium truncate">{service.name}</h3>
//                         <p className="text-gray-400 text-sm truncate">{service.description}</p>
//                       </div>

//                       <div className="flex items-center space-x-4">
//                         <span
//                           className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(service.type)}`}
//                         >
//                           {service.type}
//                         </span>
//                         {getStatusIndicator(service.status)}
//                         <span className="text-xs text-gray-500 w-20 text-right">{service.version}</span>
//                         <button className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                           <MoreVertical className="w-4 h-4 text-gray-400" />
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default DashboardHome
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  ChevronDown,
  Plus,
  Archive,
  Database,
  FileText,
  Ghost,
  Leaf,
  CircleDot,
  Zap,
  Receipt,
  MoreVertical,
  Play,
  Pause,
  Settings,
  Trash2,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Activity,
  Menu,
  X,
} from "lucide-react"

const DashboardHome = () => {
  const [selectedServices, setSelectedServices] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const services = [
    {
      id: "plausible",
      name: "Plausible Analytics",
      type: "Analytics",
      icon: <Archive className="w-5 h-5" />,
      createdAt: "Created less than a minute ago",
      status: "inactive",
      description: "Privacy-focused web analytics",
      lastActivity: "2 hours ago",
      version: "v2.1.0",
    },
    {
      id: "supabase",
      name: "Supabase",
      type: "Database",
      icon: <Database className="w-5 h-5" />,
      createdAt: "Created less than a minute ago",
      status: "inactive",
      description: "Open source Firebase alternative",
      lastActivity: "5 minutes ago",
      version: "v2.38.0",
    },
    {
      id: "appwrite",
      name: "Appwrite",
      type: "Backend",
      icon: <FileText className="w-5 h-5" />,
      createdAt: "Created 1 minute ago",
      status: "active",
      description: "Backend-as-a-Service platform",
      lastActivity: "Active now",
      version: "v1.4.13",
    },
    {
      id: "ghost",
      name: "Ghost CMS",
      type: "CMS",
      icon: <Ghost className="w-5 h-5" />,
      createdAt: "Created about 3 hours ago",
      status: "active",
      description: "Professional publishing platform",
      lastActivity: "1 hour ago",
      version: "v5.73.0",
    },
    {
      id: "mongo",
      name: "MongoDB",
      type: "Database",
      icon: <Leaf className="w-5 h-5 text-green-500" />,
      createdAt: "Created about 3 hours ago",
      status: "active",
      description: "NoSQL document database",
      lastActivity: "Active now",
      version: "v7.0",
    },
    {
      id: "odoo",
      name: "Odoo ERP",
      type: "Business",
      icon: <CircleDot className="w-5 h-5" />,
      createdAt: "Created 2 days ago",
      status: "active",
      description: "All-in-one business software",
      lastActivity: "30 minutes ago",
      version: "v17.0",
    },
    {
      id: "pg",
      name: "PostgreSQL",
      type: "Database",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      createdAt: "Created 4 days ago",
      status: "active",
      description: "Advanced open source database",
      lastActivity: "Active now",
      version: "v16.1",
    },
    {
      id: "invoiceninja",
      name: "Invoice Ninja",
      type: "Finance",
      icon: <Receipt className="w-5 h-5" />,
      createdAt: "Created about 1 month ago",
      status: "inactive",
      description: "Invoice and payment management",
      lastActivity: "2 days ago",
      version: "v5.7.23",
    },
  ]

  const serviceTypes = ["all", "Database", "Analytics", "Backend", "CMS", "Business", "Finance"]

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = filterType === "all" || service.type === filterType
      return matchesSearch && matchesType
    })
  }, [searchQuery, filterType])

  const handleSelectAll = () => {
    if (selectedServices.size === filteredServices.length) {
      setSelectedServices(new Set())
    } else {
      setSelectedServices(new Set(filteredServices.map((s) => s.id)))
    }
  }

  const handleSelectService = (serviceId) => {
    const newSelected = new Set(selectedServices)
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId)
    } else {
      newSelected.add(serviceId)
    }
    setSelectedServices(newSelected)
  }

  const getStatusIndicator = (status) => (
    <div className={`flex items-center space-x-1 sm:space-x-2`}>
      <div className={`w-2 h-2 rounded-full ${status === "active" ? "bg-green-500" : "bg-gray-500"}`} />
      <span
        className={`text-xs font-medium ${status === "active" ? "text-green-400" : "text-gray-400"} hidden sm:inline`}
      >
        {status === "active" ? "Active" : "Inactive"}
      </span>
    </div>
  )

  const getTypeColor = (type) => {
    const colors = {
      Database: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Analytics: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      Backend: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      CMS: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      Business: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      Finance: "bg-green-500/10 text-green-400 border-green-500/20",
    }
    return colors[type] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
  }

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
        <div className="text-sm text-gray-400 flex items-center space-x-2">
          <span>pages</span>
          <span>/</span>
          <span className="text-white">Services</span>
        </div>
      </div>

      {/* Project Header */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="bg-gradient-to-r from-[#18181b] to-[#1a1a1d] border border-[#2c2c2e] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Archive className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Project</h1>
                <p className="text-gray-400 text-sm hidden sm:block">Manage your services and deployments</p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
              <button className="px-3 py-2 sm:px-4 bg-[#2a2a2d] hover:bg-[#3a3a3d] border border-[#3c3c3e] rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Environment</span>
              </button>
              <Link href="/pages/gitconnect">
                <button className="px-3 py-2 sm:px-4 bg-white hover:bg-gray-100 text-black rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Service</span>
                  <span className="sm:hidden">Create</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#18181b] border border-[#2c2c2e] rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Services</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{services.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-[#18181b] border border-[#2c2c2e] rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Active</p>
                <p className="text-lg sm:text-2xl font-bold text-green-400">
                  {services.filter((s) => s.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-[#18181b] border border-[#2c2c2e] rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Inactive</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-400">
                  {services.filter((s) => s.status === "inactive").length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="bg-[#18181b] border border-[#2c2c2e] rounded-lg sm:rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Selected</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{selectedServices.size}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-4">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedServices.size === filteredServices.length && filteredServices.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                All ({filteredServices.length})
              </span>
            </label>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedServices.size === filteredServices.length && filteredServices.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  Select All ({filteredServices.length})
                </span>
              </label>
              {selectedServices.size > 0 && (
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                    <Trash2 className="w-3 h-3" />
                    <span>Delete ({selectedServices.size})</span>
                  </button>
                  <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Start</span>
                  </button>
                  <button className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                    <Pause className="w-3 h-3" />
                    <span>Stop</span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-3 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm hover:bg-gray-800 text-white transition-all duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span>{filterType === "all" ? "All Types" : filterType}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#1f1f22] border border-gray-700 rounded-lg shadow-xl z-10">
                    {serviceTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFilterType(type)
                          setShowFilters(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                          filterType === type ? "text-blue-400 bg-blue-500/10" : "text-gray-300"
                        }`}
                      >
                        {type === "all" ? "All Types" : type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center bg-[#1f1f22] border border-gray-700 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className={`lg:hidden ${showMobileMenu ? "block" : "hidden"} space-y-4`}>
            {selectedServices.size > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                  <Trash2 className="w-3 h-3" />
                  <span>Delete ({selectedServices.size})</span>
                </button>
                <button className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                  <Play className="w-3 h-3" />
                  <span>Start</span>
                </button>
                <button className="px-3 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1">
                  <Pause className="w-3 h-3" />
                  <span>Stop</span>
                </button>
              </div>
            )}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-between w-full px-3 py-2 bg-[#1f1f22] border border-gray-700 rounded-lg text-sm hover:bg-gray-800 text-white transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4" />
                      <span>{filterType === "all" ? "All Types" : filterType}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </button>
                  {showFilters && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-[#1f1f22] border border-gray-700 rounded-lg shadow-xl z-10">
                      {serviceTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setFilterType(type)
                            setShowFilters(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                            filterType === type ? "text-blue-400 bg-blue-500/10" : "text-gray-300"
                          }`}
                        >
                          {type === "all" ? "All Types" : type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center bg-[#1f1f22] border border-gray-700 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"} transition-all duration-200`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="px-4 sm:px-6 pb-6">
        {filteredServices.length === 0 ? (
          <div className="bg-[#18181b] border border-[#2c2c2e] rounded-xl p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No services found</h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setFilterType("all")
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-all duration-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-3 sm:space-y-4"
            }
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className={`group relative bg-[#18181b] border border-[#2c2c2e] rounded-xl transition-all duration-300 hover:border-gray-500 hover:shadow-xl hover:shadow-black/20 ${
                  selectedServices.has(service.id) ? "ring-2 ring-blue-500 border-blue-500" : ""
                } ${viewMode === "list" ? "flex items-center p-3 sm:p-4" : "p-4 sm:p-6"}`}
              >
                {viewMode === "grid" ? (
                  <>
                    {/* Selection Checkbox */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                      <input
                        type="checkbox"
                        checked={selectedServices.has(service.id)}
                        onChange={() => handleSelectService(service.id)}
                        className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* Status and Actions */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-2">
                      {getStatusIndicator(service.status)}
                      <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    {/* Service Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg mt-6 sm:mt-0">
                      {service.icon}
                    </div>
                    {/* Service Info */}
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <h3 className="text-white font-semibold text-base sm:text-lg mb-1 group-hover:text-blue-400 transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{service.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(service.type)}`}
                        >
                          {service.type}
                        </span>
                        <span className="text-xs text-gray-500">{service.version}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-800">
                        <p className="text-xs text-gray-500 mb-1 sm:mb-2">{service.createdAt}</p>
                        <p className="text-xs text-gray-400">Last activity: {service.lastActivity}</p>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 pt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                        <button className="flex-1 px-2 py-1.5 sm:px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>Open</span>
                        </button>
                        <button className="flex-1 px-2 py-1.5 sm:px-3 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border border-gray-500/20 rounded-lg text-xs transition-all duration-200 flex items-center justify-center space-x-1">
                          <Settings className="w-3 h-3" />
                          <span>Config</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedServices.has(service.id)}
                        onChange={() => handleSelectService(service.id)}
                        className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                      />
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate text-sm sm:text-base">{service.name}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">{service.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(service.type)} hidden sm:inline-block`}
                        >
                          {service.type}
                        </span>
                        {getStatusIndicator(service.status)}
                        <span className="text-xs text-gray-500 w-16 sm:w-20 text-right hidden sm:inline">
                          {service.version}
                        </span>
                        <button className="p-1 hover:bg-gray-700 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardHome
