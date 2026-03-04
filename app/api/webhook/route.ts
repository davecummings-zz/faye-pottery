import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle events
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('✓ Payment succeeded:', paymentIntent.id, paymentIntent.amount)
      // TODO: Update order status, send confirmation email, etc.
      break

    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      console.log('✓ Checkout session completed:', session.id, session.payment_status)
      // TODO: Fulfill order, send confirmation, etc.
      break

    case 'charge.failed':
      const charge = event.data.object as Stripe.Charge
      console.error('✗ Charge failed:', charge.id, charge.failure_message)
      break

    default:
      console.log('Unhandled event type:', event.type)
  }

  return NextResponse.json({ received: true })
}
