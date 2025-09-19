
import './globals.css'
import Link from 'next/link'
export const metadata = { title: 'StoryShort – Simple Starter' }
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <header style={{borderBottom:'1px solid #1e1e2a'}}>
          <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Link href="/" style={{textDecoration:'none', color:'#eaeaf2'}}><b>StoryShort</b> Starter</Link>
            <nav style={{display:'flex', gap:12}}>
              <Link className="btn sec" href="/dashboard">Dashboard</Link>
              <Link className="btn" href="/pricing">Pricing</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
