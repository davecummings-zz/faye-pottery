'use client'

import { FormEvent, useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Integrate with email service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <div className="bg-glaze text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Get in Touch</h1>
          <p className="text-lg mt-2 text-white/90">Have a question? I'd love to hear from you.</p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-sand">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-bold text-clay mb-2">Email</h3>
              <a href="mailto:faye@example.com" className="text-glaze hover:text-clay transition">
                faye@example.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold text-clay mb-2">Location</h3>
              <p className="text-earth">
                [Your City, State]<br />
                [Country]
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold text-clay mb-2">Follow</h3>
              <a href="#" className="text-glaze hover:text-clay transition block">
                @fayepottery on Instagram
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-serif font-bold text-clay mb-8">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold text-clay mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-glaze"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-bold text-clay mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-glaze"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-bold text-clay mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-glaze"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block font-bold text-clay mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-clay rounded-lg focus:outline-none focus:ring-2 focus:ring-glaze resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-clay text-white py-3 rounded-lg font-bold hover:bg-earth transition"
              >
                Send Message
              </button>

              {submitted && (
                <p className="text-center text-green-600 font-semibold">
                  ✓ Message sent! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
