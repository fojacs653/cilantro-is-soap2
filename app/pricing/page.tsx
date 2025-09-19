
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
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16}}>
        <div className="card">
          <h3>Starter</h3>
          <p className="muted">$39 / month</p>
          <button className="btn" onClick={()=>checkout(process.env.NEXT_PUBLIC_STARTER_PRICE_ID || 'price_123')}>Get Starter</button>
        </div>
        <div className="card">
          <h3>Growth</h3>
          <p className="muted">$69 / month</p>
          <button className="btn" onClick={()=>checkout(process.env.NEXT_PUBLIC_GROWTH_PRICE_ID || 'price_456')}>Get Growth</button>
        </div>
      </div>
    </div>
  )
}
