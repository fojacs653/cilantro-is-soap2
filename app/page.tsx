
import Link from 'next/link'

function Bullet({ children }: { children: React.ReactNode }) {
  return <li style={{display:'flex', gap:8, alignItems:'flex-start', marginTop:8}}>
    <span style={{width:8,height:8,borderRadius:999,background:'var(--accent)',marginTop:6}} />
    <span>{children}</span>
  </li>
}

export default function Home(){
  return (
    <div className="card">
      <span className="tag">New</span> <span className="tag">Retention Engine™</span>
      <h1 style={{marginTop:10}}>Forge short videos that hold attention</h1>
      <p className="muted" style={{marginTop:8}}>
        ReelForge writes, scores, and voices your Shorts. The built‑in <b>Retention Engine™</b> rates hooks and pacing
        so you publish scroll‑stopping clips—faster.
      </p>
      <div style={{display:'flex', gap:12, marginTop:16, flexWrap:'wrap'}}>
        <Link className="btn" href="/dashboard">Open Dashboard</Link>
        <Link className="btn sec" href="/pricing">See Pricing</Link>
      </div>

      <ul style={{marginTop:18, paddingLeft:0, listStyle:'none'}}>
        <Bullet><b>HookLab</b> — generate stronger hooks and score them automatically.</Bullet>
        <Bullet><b>PaceMeter</b> — keep scripts in the 130–160 WPM sweet spot.</Bullet>
        <Bullet><b>Retention Score</b> — instant feedback before you render.</Bullet>
        <Bullet>One‑click voice demo — works even without keys.</Bullet>
        <Bullet>Stripe‑ready — turn it into a business when you’re ready.</Bullet>
      </ul>
    </div>
  )
}
