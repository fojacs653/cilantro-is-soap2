
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2 mt-2">
    <span className="inline-block w-2 h-2 rounded-full bg-slate-300 mt-2" />
    <span>{children}</span>
  </li>
}

export default function Home(){
  return (
    <div>
      {/* Centered Hero with gradient text */}
      <Section className="text-center hero-backdrop">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge>New</Badge>
          <Badge>Retention Engine™</Badge>
          <Badge>HookLab</Badge>
        </div>
        <h1 className="mt-4 text-5xl md:text-6xl font-extrabold tracking-tight accent-text">
          Forge short videos that hold attention
        </h1>
        <p className="muted mt-4 mx-auto max-w-2xl text-lg">
          ReelForge writes, scores, and voices your Shorts. The built‑in <b>Retention Engine™</b>
          rates hooks and pacing so you publish scroll‑stopping clips—faster.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          <Link href="/dashboard"><Button size="lg">Open Dashboard</Button></Link>
          <Link href="/pricing"><Button size="lg" variant="secondary">Compare Plans</Button></Link>
        </div>
        <div className="muted mt-3 text-sm">No setup needed — try it now.</div>
      </Section>

      {/* Benefits Row */}
      <Section className="grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold">HookLab</h3>
          <p className="muted mt-2">Generate stronger hooks and score them automatically.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">PaceMeter</h3>
          <p className="muted mt-2">Keep scripts in the 130–160 WPM sweet spot.</p>
        </Card>
        <Card>
          <h3 className="font-semibold">Retention Score</h3>
          <p className="muted mt-2">Instant feedback before you render.</p>
        </Card>
      </Section>

      {/* What You Get */}
      <Section>
        <Card>
          <h3 className="font-semibold">What you’ll get</h3>
          <ul className="muted mt-2">
            <Bullet>One‑click voice demo — works even without keys.</Bullet>
            <Bullet>Stripe‑ready — sell plans when you’re ready.</Bullet>
            <Bullet>Episode library — save scripts and audio.</Bullet>
          </ul>
        </Card>
      </Section>

      {/* Final CTA */}
      <Section className="text-center">
        <h3 className="text-2xl font-semibold">Ready to forge your first Short?</h3>
        <div className="flex gap-3 mt-4 justify-center">
          <Link href="/dashboard"><Button size="lg">Open Dashboard</Button></Link>
          <Link href="/pricing"><Button size="lg" variant="secondary">Compare Plans</Button></Link>
        </div>
      </Section>
    </div>
  )
}
