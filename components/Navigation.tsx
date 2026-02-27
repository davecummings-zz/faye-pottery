'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-clay shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-clay">
          Faye's Pottery
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-earth hover:text-clay transition">
            Home
          </Link>
          <Link href="/shop" className="text-earth hover:text-clay transition">
            Shop
          </Link>
          <Link href="/about" className="text-earth hover:text-clay transition">
            About
          </Link>
          <Link href="/contact" className="text-earth hover:text-clay transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-earth"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sand border-t border-clay">
          <div className="flex flex-col gap-4 p-4">
            <Link href="/" className="text-earth hover:text-clay transition">
              Home
            </Link>
            <Link href="/shop" className="text-earth hover:text-clay transition">
              Shop
            </Link>
            <Link href="/about" className="text-earth hover:text-clay transition">
              About
            </Link>
            <Link href="/contact" className="text-earth hover:text-clay transition">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
