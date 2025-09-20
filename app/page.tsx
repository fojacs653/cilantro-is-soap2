
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2 mt-2"><span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] mt-2" /> <span>{children}</span></li>
}

export default function Home(){
  return (
    <div>
      <Section>
        <Badge>New</Badge> <Badge>Retention Engine™</Badge>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold">Forge short videos that hold attention</h1>
        <p className="muted mt-3 max-w-2xl">ReelForge writes, scores, and voices your Shorts. The built‑in <b>Retention Engine™</b> rates hooks and pacing so you publish scroll‑stopping clips—faster.</p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <Link href="/dashboard"><Button>Open Dashboard</Button></Link>
          <Link href="/pricing"><Button variant="secondary">See Pricing</Button></Link>
        </div>
      </Section>

      <Section className="grid md:grid-cols-3 gap-4">
        <Card><h3 className="font-semibold">HookLab</h3><p className="muted mt-2">Generate stronger hooks and score them automatically.</p></Card>
        <Card><h3 className="font-semibold">PaceMeter</h3><p className="muted mt-2">Keep scripts in the 130–160 WPM sweet spot.</p></Card>
        <Card><h3 className="font-semibold">Retention Score</h3><p className="muted mt-2">Instant feedback before you render.</p></Card>
      </Section>

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
