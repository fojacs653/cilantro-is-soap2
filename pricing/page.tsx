
'use client'
import { useState } from 'react'
export default function Pricing(){
  const [loading,setLoading] = useState(false)
  async function checkout(priceId: string){
    setLoading(true)
    const r = await fetch('/api/stripe/create-checkout-session', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ priceId })
    })
    const { url } = await r.json()
    window.location.href = url
  }
  return (
    <div className="card">
      <h2>Pricing</h2>
      <p className="muted">All plans include Retention Engine™ scoring.</p>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16}}>
        <div className="card">
          <h3>Starter</h3>
          <p className="muted">Best for testing</p>
          <h1 style={{marginTop:8}}>$39 <span className="muted" style={{fontSize:14}}>/month</span></h1>
          <ul className="muted" style={{marginTop:8}}>
            <li>~40 videos/mo (credits)</li>
            <li>Script + Voice demo</li>
            <li>Retention score</li>
          </ul>
          <button className="btn" onClick={()=>checkout(process.env.NEXT_PUBLIC_STARTER_PRICE_ID || 'price_123')} disabled={loading}>Get Starter</button>
        </div>
        <div className="card">
          <h3>Growth</h3>
          <p className="muted">Best for consistency</p>
          <h1 style={{marginTop:8}}>$69 <span className="muted" style={{fontSize:14}}>/month</span></h1>
          <ul className="muted" style={{marginTop:8}}>
            <li>~120 videos/mo (credits)</li>
            <li>Everything in Starter</li>
            <li>Priority queue</li>
          </ul>
          <button className="btn" onClick={()=>checkout(process.env.NEXT_PUBLIC_GROWTH_PRICE_ID || 'price_456')} disabled={loading}>Get Growth</button>
        </div>
      </div>
    </div>
  )
}
