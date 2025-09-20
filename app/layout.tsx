
import './globals.css'
import Link from 'next/link'
import { Inter, Sora } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const sora = Sora({ subsets: ['latin'], variable: '--font-display' })
export const metadata = {
  title: 'ReelForge — Forge shorts that hold attention',
  description: 'AI short‑video builder with a built‑in Retention Engine™ for hooks and pacing.',
}
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={sora.variable}>
      <body className={inter.className}>
        <header style={{borderBottom:'1px solid var(--border)', background:'#fff'}}>
          <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Link href="/" style={{textDecoration:'none', color:'var(--fg)', display:'flex', alignItems:'center', gap:8}}>
              <span style={{width:10,height:10,background:'linear-gradient(90deg,#7c3aed,#ec4899,#f97316)',display:'inline-block',borderRadius:2}} />
              <b style={{letterSpacing:0.2, fontFamily:'var(--font-display)'}}>ReelForge</b>
            </Link>
            <nav style={{display:'flex', gap:12}}>
              <Link className="btn sec" href="/dashboard">Dashboard</Link>
              <Link className="btn sec" href="/pricing">Pricing</Link>
              <Link className="btn sec" href="/faq">FAQ</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer style={{borderTop:'1px solid var(--border)', marginTop:40, background:'#fff'}}>
          <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center', padding:'16px 24px'}}>
            <div className="muted">© 2025 ReelForge</div>
            <div className="muted">Retention Engine™ built‑in</div>
          </div>
        </footer>
      </body>
    </html>
  )
}
