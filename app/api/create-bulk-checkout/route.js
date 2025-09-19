import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null

export async function POST(request) {
  try {
    const { items } = await request.json()

    // Create line items for Stripe
    const lineItems = []

    for (const item of items) {
      if (item.stripePriceId && item.stripePriceId !== 'price_REPLACE_ME') {
        // Use existing price ID
        lineItems.push({
          price: item.stripePriceId,
          quantity: 1
        })
      } else {
        // Create price on the fly for items without Stripe IDs
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              description: `${item.artist} - ${item.type === 'sample-pack' ? 'Sample Pack' : 'Digital Album'}`,
              images: item.image ? [`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}${item.image}`] : []
            },
            unit_amount: Math.round(item.price * 100) // Convert to cents
          },
          quantity: 1
        })
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      metadata: {
        // Just store item IDs to stay under 500 char limit
        item_ids: items.map(i => i.id).join(','),
        item_count: items.length.toString()
      }
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}