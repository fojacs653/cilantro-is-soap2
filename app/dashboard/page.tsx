
'use client'
import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type Score = { retentionScore:number; breakdown:{hookScore:number; paceScore:number; wpm:number; totalWords:number}; suggestions:string[] }
type Episode = { id:string; topic:string; script:any; audio_url:string|null; created_at:string }

export default function Dashboard(){
  const [topic,setTopic] = useState('10 Surprising Space Facts')
  const [seconds,setSeconds] = useState(25)
  const [script,setScript] = useState<string>('')
  const [voiceUrl,setVoiceUrl] = useState<string>('')
  const [score,setScore] = useState<Score|null>(null)
  const [episodes,setEpisodes] = useState<Episode[]>([])
  const [saving,setSaving] = useState(false)
  const [loadingList,setLoadingList] = useState(true)

  async function loadEpisodes(){
    setLoadingList(true)
    const r = await fetch('/api/episodes')
    const j = await r.json()
    setEpisodes(j.episodes || [])
    setLoadingList(false)
  }
  useEffect(()=>{ loadEpisodes() }, [])

  async function generateScript(){
    const r = await fetch('/api/script', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic, seconds }) })
    const j = await r.json(); setScript(j.script || '')
    setScore(null)
  }
  async function scoreIt(){
    const r = await fetch('/api/score', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ script, seconds }) })
    const j = await r.json(); setScore(j)
  }
  async function tts(){
    const r = await fetch('/api/tts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: script }) })
    const blob = await r.blob(); const url = URL.createObjectURL(blob); setVoiceUrl(url)
  }
  function safeParse(s: string){ try { return JSON.parse(s) } catch { return s } }
  async function saveEpisode(){
    setSaving(true)
    await fetch('/api/episodes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic, script: safeParse(script), audioUrl: voiceUrl }) })
    setSaving(false); setScript(''); setVoiceUrl(''); setScore(null); await loadEpisodes()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <h2 className="text-xl font-semibold">Create</h2>
        <label className="block mt-3">Topic</label>
        <input className="w-full" value={topic} onChange={e=>setTopic(e.target.value)} />
        <label className="block mt-3">Target Length (seconds)</label>
        <input className="w-full" value={seconds} onChange={e=>setSeconds(Number(e.target.value)||25)} />

        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={generateScript}>Generate Script</Button>
          <Button variant="secondary" onClick={scoreIt} disabled={!script}>Score Retention</Button>
          <Button variant="secondary" onClick={tts} disabled={!script}>Generate Voice</Button>
          <Button onClick={saveEpisode} disabled={!script && !voiceUrl || saving}>{saving ? 'Saving…' : 'Save Episode'}</Button>
        </div>

        <h3 className="mt-4 font-semibold">Script JSON</h3>
        <pre className="muted whitespace-pre-wrap">{script || '(generate a script to see output)'}</pre>
      </Card>

      <div className="space-y-4">
        <Card>
          <h2 className="text-xl font-semibold">Retention</h2>
          {score ? (
            <div className="mt-3">
              <div className="text-2xl font-bold">{score.retentionScore}/100</div>
              <div className="muted mt-1">Hook {score.breakdown.hookScore} • Pace {score.breakdown.paceScore} • {score.breakdown.wpm} WPM</div>
              {score.suggestions?.length > 0 && <ul className="mt-2">{score.suggestions.map((s,i)=> <li key={i}>• {s}</li>)}</ul>}
            </div>
          ) : <div className="muted mt-2">Click “Score Retention” to see suggestions.</div>}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Preview</h2>
          {voiceUrl ? <audio className="mt-3 w-full" controls src={voiceUrl}></audio> : <div className="muted mt-2">Generate voice to preview audio.</div>}
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <h2 className="text-xl font-semibold">Your Episodes</h2>
          {loadingList ? <div className="muted mt-2">Loading…</div> : (
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              {episodes.length === 0 && <div className="muted">No episodes yet. Save one above.</div>}
              {episodes.map(ep => (
                <div key={ep.id} className="rounded-xl border border-[#1e1e2a] bg-[#12121a] p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div><b>{ep.topic}</b><div className="muted text-xs">{new Date(ep.created_at).toLocaleString()}</div></div>
                    {ep.audio_url && <audio controls src={ep.audio_url}></audio>}
                  </div>
                  <details className="mt-2"><summary>Script</summary><pre className="muted whitespace-pre-wrap">{typeof ep.script==='string'?ep.script:JSON.stringify(ep.script,null,2)}</pre></details>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
