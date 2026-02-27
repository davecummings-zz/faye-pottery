import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { productId, productName, price, quantity } = await request.json()

    // Validate inputs
    if (!productId || !price || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productName,
              description: `Handmade pottery by Faye`,
            },
            unit_amount: Math.round(price), // Stripe expects cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/product/${productId}`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
