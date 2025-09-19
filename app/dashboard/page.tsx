'use client'
import { useEffect, useState } from 'react'

type Score = { retentionScore:number; breakdown:{hookScore:number; paceScore:number; wpm:number; totalWords:number}; suggestions:string[] }

export default function Dashboard(){
  const [topic,setTopic] = useState('10 Surprising Space Facts')
  const [script,setScript] = useState<string>('')
  const [voiceUrl,setVoiceUrl] = useState<string>('')
  const [score,setScore] = useState<Score|null>(null)
  const [seconds,setSeconds] = useState(25)

  async function generateScript(){
    const r = await fetch('/api/script', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic, seconds }) })
    const j = await r.json(); setScript(j.script || '')
    setScore(null)
  }
  async function tts(){
    const r = await fetch('/api/tts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: script }) })
    const blob = await r.blob(); const url = URL.createObjectURL(blob); setVoiceUrl(url)
  }
  async function scoreIt(){
    const r = await fetch('/api/score', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ script, seconds }) })
    const j = await r.json(); setScore(j)
  }

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <label>Topic</label>
      <input value={topic} onChange={e=>setTopic(e.target.value)} />
      <label style={{marginTop:10}}>Target Length (seconds)</label>
      <input value={seconds} onChange={e=>setSeconds(Number(e.target.value)||25)} />

      <div style={{display:'flex', gap:12, marginTop:12, flexWrap:'wrap'}}>
        <button className="btn" onClick={generateScript}>Generate Script</button>
        <button className="btn sec" onClick={scoreIt} disabled={!script}>Score Retention</button>
        <button className="btn sec" onClick={tts} disabled={!script}>Generate Voice</button>
      </div>

      {score && (
        <div className="card" style={{marginTop:16}}>
          <b>Retention Score: {score.retentionScore}/100</b>
          <div className="muted" style={{marginTop:6}}>
            Hook: {score.breakdown.hookScore} • Pace: {score.breakdown.paceScore} • {score.breakdown.wpm} WPM • {score.breakdown.totalWords} words
          </div>
          {score.suggestions?.length > 0 && (
            <ul style={{marginTop:8}}>
              {score.suggestions.map((s,i)=><li key={i}>• {s}</li>)}
            </ul>
          )}
        </div>
      )}

      <h3 style={{marginTop:20}}>Script JSON</h3>
      <pre className="muted" style={{whiteSpace:'pre-wrap'}}>{script || '(generate a script to see output)'}</pre>
      {voiceUrl && (<div style={{marginTop:12}}><audio controls src={voiceUrl}></audio></div>)}
    </div>
  )
}
