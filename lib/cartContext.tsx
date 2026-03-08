'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from './products'

export interface CartItem extends Product {
  cartQuantity: number // quantity user wants to purchase
  cartItemId?: string // unique id for duplicate products with different colors
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number, selectedColor?: string) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product: Product, quantity: number, selectedColor?: string) => {
    setCart(prevCart => {
      // Create unique identifier for items with color variants
      const cartItemId = selectedColor ? `${product.id}-${selectedColor}` : product.id
      
      const existingItem = prevCart.find(item => item.cartItemId === cartItemId)
      if (existingItem) {
        // Update quantity if product with same color already in cart
        return prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        )
      } else {
        // Add new item to cart
        const newItem = { ...product, cartQuantity: quantity, cartItemId, selectedColor }
        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId === cartItemId || item.id === cartItemId))
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        (item.cartItemId === cartItemId || item.id === cartItemId) ? { ...item, cartQuantity: quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.cartQuantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cartQuantity, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
