'use client'

import { FormEvent, useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    console.log('Newsletter signup:', email)
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 md:py-24 bg-clay text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Stay Updated</h2>
        <p className="text-lg mb-8 text-white/90">
          Get news about new pottery releases, classes, and special offers.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-grow px-4 py-3 rounded-lg text-earth focus:outline-none focus:ring-2 focus:ring-glaze"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-glaze text-earth font-semibold rounded-lg hover:bg-sand transition"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-glaze font-semibold">
            ✓ Thanks for subscribing!
          </p>
        )}
      </div>
    </section>
  )
}
