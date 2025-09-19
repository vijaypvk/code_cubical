'use client'

import { useState, useEffect } from 'react'

// This component tests for hydration mismatches
export default function HydrationTest() {
  const [mounted, setMounted] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  // Proper hydration handling - only set values after mounting
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Avoid hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-green-100 rounded">
      <h3 className="font-bold">Hydration Test Component</h3>
      <p>Component has mounted successfully!</p>
      <p>Window width: {windowWidth}px</p>
      <p>This content only renders after hydration is complete.</p>
    </div>
  )
}