'use client'

import { useEffect } from 'react'

export default function InstagramFeed() {
  useEffect(() => {
    // Load Elfsight platform script
    const script = document.createElement('script')
    script.src = 'https://elfsightcdn.com/platform.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="w-full bg-[#f6f6f6] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#3A3A3A] text-center uppercase">
          Follow Along on Instagram
        </h2>
        
        <div className="flex justify-center">
          {/* Elfsight Instagram Feed */}
          <div 
            className="elfsight-app-7f23e983-538e-4c78-b326-2a470c460664 w-full" 
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  )
}
