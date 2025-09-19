import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { products } from '../../../lib/data/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'No session ID provided' }, { status: 400 })
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Get the purchased item IDs from metadata
    const itemIds = session.metadata.item_ids ? session.metadata.item_ids.split(',') : []

    // Get the product details
    const purchasedItems = itemIds.map(id => products.find(p => p.id === id)).filter(Boolean)

    return NextResponse.json({
      success: true,
      items: purchasedItems,
      customerEmail: session.customer_details?.email
    })
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}