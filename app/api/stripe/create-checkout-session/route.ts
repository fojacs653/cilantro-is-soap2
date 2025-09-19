
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
export async function POST(req: NextRequest){
  const { priceId } = await req.json()
  const key = process.env.STRIPE_SECRET_KEY
  if(!key){
    return NextResponse.json({ url: 'https://dashboard.stripe.com/test/payments' })
  }
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?ok=1` : 'http://localhost:3000/dashboard?ok=1',
    cancel_url: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=1` : 'http://localhost:3000/pricing?canceled=1'
  })
  return NextResponse.json({ url: session.url })
}
