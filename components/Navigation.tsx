'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cartContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()

  return (
    <nav className="sticky top-0 z-50 bg-[#f6f6f6] shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-[#3A3A3A] transition" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Faye Nicole Pottery
          </Link>
          <img 
            src="/images/logo.png" 
            alt="Faye Nicole Pottery Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-[#3A3A3A] hover:text-glaze transition">
            Home
          </Link>
          <Link href="/shop" className="text-[#3A3A3A] hover:text-glaze transition">
            Shop
          </Link>
          <Link href="/about" className="text-[#3A3A3A] hover:text-glaze transition">
            About
          </Link>
          <Link href="/contact" className="text-[#3A3A3A] hover:text-glaze transition">
            Contact
          </Link>
          <Link href="/cart" className="relative text-[#3A3A3A] transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-1-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-glaze text-[#ffffff] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#3A3A3A]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-2 p-4">
            <Link href="/" className="text-[#3A3A3A] hover:text-glaze transition border-b border-gray-200 pb-2">
              Home
            </Link>
            <Link href="/shop" className="text-[#3A3A3A] hover:text-glaze transition border-b border-gray-200 pb-2">
              Shop
            </Link>
            <Link href="/about" className="text-[#3A3A3A] hover:text-glaze transition border-b border-gray-200 pb-2">
              About
            </Link>
            <Link href="/contact" className="text-[#3A3A3A] hover:text-glaze transition border-b border-gray-200 pb-2">
              Contact
            </Link>
            <Link href="/cart" className="text-[#3A3A3A] hover:text-glaze transition flex items-center gap-2">
              Cart {cartCount > 0 && <span className="bg-glaze text-white text-xs font-bold px-2 py-1 rounded">{cartCount}</span>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
