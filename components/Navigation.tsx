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
          <Link href="/" className="text-2xl font-bold text-[#3A3A3A] hover:text-glaze transition" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
          <Link href="/cart" className="relative text-[#3A3A3A] hover:text-glaze transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m-12 8h12m-12 0a1 1 0 100 2 1 1 0 000-2m12 0a1 1 0 100 2 1 1 0 000-2" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-glaze text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
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
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-4 p-4">
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
            <Link href="/cart" className="text-[#3A3A3A] hover:text-glaze transition flex items-center gap-2">
              Cart {cartCount > 0 && <span className="bg-glaze text-white text-xs font-bold px-2 py-1 rounded">{cartCount}</span>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
