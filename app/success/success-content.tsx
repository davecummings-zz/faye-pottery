'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Fetch session details from Stripe (optional - for order confirmation)
      console.log('Stripe Session ID:', sessionId)
      setLoading(false)
    }
  }, [sessionId])

  return (
    <>
      <div className="bg-green-100 text-green-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Order Confirmed! 🎉</h1>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white shadow-lg p-12 mb-8">
            <div className="text-6xl mb-6">✓</div>
            
            <h2 className="text-3xl font-bold text-[#3A3A3A] mb-4">
              Thank You for Your Order!
            </h2>

            <p className="text-lg text-[#3A3A3A] mb-6 leading-relaxed">
              Your pottery is on its way! You'll receive an order confirmation email shortly with tracking information.
            </p>

            <p className="text-sm text-[#3A3A3A]/60 mb-8">
              Order ID: <code className="bg-white p-2">{sessionId}</code>
            </p>

            <div className="bg-white p-6 mb-8 text-left">
              <h3 className="font-bold text-[#3A3A3A] mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-[#3A3A3A]">
                <li>✓ We've received your order</li>
                <li>✓ Your piece will be carefully handmade</li>
                <li>✓ You'll get a shipping notification (2-3 weeks)</li>
                <li>✓ Sit back and wait for your beautiful pottery!</li>
              </ul>
            </div>

            <p className="text-sm text-[#3A3A3A]/60 mb-8">
              Questions? Email us at faye@example.com or follow @fayepottery on Instagram
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="inline-block bg-white text-[#3A3A3A] border border-clay px-8 py-3 font-semibold hover:bg-glaze hover:text-[#3A3A3A] transition">
              Continue Shopping
            </Link>
            <Link href="/" className="inline-block bg-white text-[#3A3A3A] border-2 border-clay px-8 py-3 font-semibold hover:bg-white transition">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
