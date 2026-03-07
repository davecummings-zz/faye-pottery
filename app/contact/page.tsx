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
      <div className="bg-white text-[#3A3A3A] py-12 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Get in Touch</h1>
          <p className="text-lg mt-2 text-[rgba(58,58,58,0.9)]">Have a question? I'd love to hear from you.</p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 text-center shadow-sm">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-bold text-2xl text-[#3A3A3A] mb-2">Email</h3>
              <a href="mailto:faye@example.com" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition">
                faye@example.com
              </a>
            </div>

            <div className="bg-white p-6 text-center shadow-sm">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold text-2xl text-[#3A3A3A] mb-2">Location</h3>
              <p className="text-[#3A3A3A]">
                [Your City, State]<br />
                [Country]
              </p>
            </div>

            <div className="bg-white p-6 text-center shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold text-2xl text-[#3A3A3A] mb-2">Follow</h3>
              <a href="#" className="text-[#3A3A3A] hover:text-[#3A3A3A] transition block">
                @fayepottery on Instagram
              </a>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#3A3A3A] mb-8">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold text-[#3A3A3A] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-1 focus:ring-glaze"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3A3A3A] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-1 focus:ring-glaze"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3A3A3A] mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-1 focus:ring-glaze"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3A3A3A] mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border focus:outline-none focus:ring-1 focus:ring-glaze resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-[#3A3A3A] border py-3 font-bold hover:bg-glaze hover:text-[#ffffff] transition"
              >
                Send Message
              </button>

              {submitted && (
                <p className="text-center text-[#3A3A3A] font-semibold ">
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
