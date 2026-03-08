import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cartContext'

export const metadata: Metadata = {
  title: "Faye Nicole Pottery - Handmade Ceramics",
  description: 'Handcrafted functional pottery by Faye. Beautiful, unique pieces for everyday life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:8097"></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
