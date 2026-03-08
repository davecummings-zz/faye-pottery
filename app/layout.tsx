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
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/images/favicon_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/images/favicon_io/apple-touch-icon.png" />
        <link rel="manifest" href="/images/favicon_io/site.webmanifest" />
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
