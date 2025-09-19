"use client"

export default function ResponsiveSidebarPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Responsive Sidebar Demo</h1>
        <p className="text-zinc-400 mb-4">
          This page demonstrates the responsive sidebar component. The sidebar component is used throughout the application
          to provide navigation across different sections.
        </p>
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="space-y-2 text-zinc-300">
            <li>• Responsive design that adapts to mobile and desktop</li>
            <li>• Collapsible sections for better organization</li>
            <li>• Active state indication for current page</li>
            <li>• Smooth animations and transitions</li>
            <li>• Multi-level navigation support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
