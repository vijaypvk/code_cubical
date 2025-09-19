'use client'

export default function ThemeProviderPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Theme Provider</h1>
        <p className="text-zinc-400 mb-4">
          This page demonstrates the theme provider configuration. The theme provider is used throughout the application
          to manage light and dark theme modes.
        </p>
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="space-y-2 text-zinc-300">
            <li>• Light and dark theme support</li>
            <li>• System preference detection</li>
            <li>• Persistent theme selection</li>
            <li>• Smooth theme transitions</li>
            <li>• CSS variables for theming</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
