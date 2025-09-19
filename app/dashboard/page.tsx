
'use client'
import { useState } from 'react'
export default function Dashboard(){
  const [topic,setTopic] = useState('10 Surprising Space Facts')
  const [script,setScript] = useState<string>('')
  const [voiceUrl,setVoiceUrl] = useState<string>('')
  async function generateScript(){
    const r = await fetch('/api/script', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic }) })
    const j = await r.json(); setScript(j.script || '')
  }
  async function tts(){
    const r = await fetch('/api/tts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text: script }) })
    const blob = await r.blob(); const url = URL.createObjectURL(blob); setVoiceUrl(url)
  }
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <label>Topic</label>
      <input value={topic} onChange={e=>setTopic(e.target.value)} />
      <div style={{display:'flex', gap:12, marginTop:12}}>
        <button className="btn" onClick={generateScript}>Generate Script</button>
        <button className="btn sec" onClick={tts} disabled={!script}>Generate Voice (demo)</button>
      </div>
      <h3 style={{marginTop:20}}>Script JSON</h3>
      <pre style={{whiteSpace:'pre-wrap'}} className="muted">{script}</pre>
      {voiceUrl && (<div style={{marginTop:12}}><audio controls src={voiceUrl}></audio></div>)}
    </div>
  )
}
