
import Link from 'next/link'
export default function Home(){
  return (
    <div className="card">
      <h1>Turn ideas into short videos</h1>
      <p className="muted">This is the ultra-simple starter. It shows the flow: write script → (optional) voiceover → (later) render.</p>
      <div style={{display:'flex', gap:12, marginTop:16}}>
        <Link className="btn" href="/dashboard">Try the dashboard</Link>
        <Link className="btn sec" href="/pricing">See pricing</Link>
      </div>
    </div>
  )
}
