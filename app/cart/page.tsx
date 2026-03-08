'use client'

import { useCart } from '@/lib/cartContext'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const totalPrice = getTotalPrice()
  const formattedTotal = (totalPrice / 100).toFixed(2)

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setIsLoading(true)
    try {
      // Call checkout API with multiple items
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.cartQuantity,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white text-[#3A3A3A] py-12 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-lg mt-2 text-[rgba(58,58,58,0.9)]">Review your items and checkout</p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-[#3A3A3A] mb-6">Your cart is empty</p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-white text-[#3A3A3A] border border-clay hover:bg-glaze hover:text-white font-semibold transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.cartItemId || item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-white overflow-hidden border border-gray-300">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.id}`}
                          className="text-lg font-bold text-[#3A3A3A] hover:text-glaze transition"
                        >
                          {item.name}
                        </Link>
                        {item.selectedColor && (
                          <p className="text-sm text-[#3A3A3A]/70">
                            Color: {item.selectedColor}
                          </p>
                        )}
                        <p className="text-[#3A3A3A] font-bold mt-2">
                          ${(item.price / 100).toFixed(2)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-4">
                          <label className="text-sm text-[#3A3A3A]">Qty:</label>
                          <div className="flex items-center border border-clay">
                            <button
                              onClick={() => updateQuantity(item.cartItemId || item.id, item.cartQuantity - 1)}
                              className="px-2 py-1 text-[#3A3A3A] hover:bg-white transition"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 border-l border-r border-clay">
                              {item.cartQuantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartItemId || item.id, Math.min(item.quantity, item.cartQuantity + 1))
                              }
                              disabled={item.cartQuantity >= item.quantity}
                              className={`px-2 py-1 transition ${
                                item.cartQuantity >= item.quantity
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : 'text-[#3A3A3A] hover:bg-white'
                              }`}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.cartItemId || item.id)}
                          className="mt-4 text-sm text-glaze hover:text-[#3A3A3A] transition font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <p className="font-bold text-[#3A3A3A]">
                          ${((item.price * item.cartQuantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Summary */}
              <div className="bg-[#f6f6f6] p-6 h-fit border border-gray-300">
                <h3 className="text-2xl font-bold text-[#3A3A3A] mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex justify-between text-[#3A3A3A]">
                    <span>Subtotal</span>
                    <span>${formattedTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#3A3A3A]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-[#3A3A3A]">Total</span>
                  <span className="text-lg font-bold text-[#3A3A3A]">${formattedTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={`w-full px-8 py-4 font-bold text-lg transition ${
                    isLoading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-glaze text-[#ffffff] border border-gray-300 hover:bg-glaze hover:border-glaze hover:text-[#3A3A3A]'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>

                <Link
                  href="/shop"
                  className="block w-full mt-3 px-8 py-3 text-center bg-white text-[#3A3A3A] border border-gray-300 hover:bg-glaze hover:border-glaze hover:text-white font-semibold transition"
                >
                  Continue Shopping
                </Link>

                <button
                  onClick={clearCart}
                  className="block w-full mt-3 text-sm text-glaze hover:text-[#3A3A3A] transition font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
