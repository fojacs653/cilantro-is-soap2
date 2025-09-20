
import Card from '@/components/ui/Card'
export default function FAQ(){
  return (
    <div className="space-y-4">
      <Card><h2 className="text-xl font-semibold">Do I need API keys to try it?</h2><p className="muted mt-2">No. The voice button beeps by default so you can test the flow. Add keys later.</p></Card>
      <Card><h2 className="text-xl font-semibold">What is the Retention Engine™?</h2><p className="muted mt-2">A scoring system for hooks and pacing to improve watch time before you render.</p></Card>
      <Card><h2 className="text-xl font-semibold">Can I publish to YouTube/TikTok?</h2><p className="muted mt-2">YouTube is first; TikTok requires app approval. Exports work immediately.</p></Card>
      <Card><h2 className="text-xl font-semibold">How are credits counted?</h2><p className="muted mt-2">Each final render consumes credits based on plan. Scripts/voice tests are free on Starter.</p></Card>
    </div>
  )
}
