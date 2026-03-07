'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#f6f6f6] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#3A3A3A] hover:text-[#3A3A3A]">
          Faye Nicole Pottery
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
            Home
          </Link>
          <Link href="/shop" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
            Shop
          </Link>
          <Link href="/about" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
            About
          </Link>
          <Link href="/contact" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#3A3A3A]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-clay">
          <div className="flex flex-col gap-4 p-4">
            <Link href="/" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
              Home
            </Link>
            <Link href="/shop" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
              Shop
            </Link>
            <Link href="/about" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
              About
            </Link>
            <Link href="/contact" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
