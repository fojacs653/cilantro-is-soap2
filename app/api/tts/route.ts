// app/api/tts/route.ts
// If ELEVENLABS_API_KEY exists, use ElevenLabs; otherwise return a 1-second beep (WAV).

import { NextRequest } from 'next/server'

async function beepWav(seconds = 1) {
  const sr = 44100, n = seconds * sr
  const samples = new Int16Array(n)
  const freq = 440 // A4 beep so you can hear it
  for (let i = 0; i < n; i++) {
    samples[i] = Math.round(Math.sin(2 * Math.PI * freq * (i / sr)) * 0.2 * 32767)
  }
  const byteRate = sr * 2
  const buffer = Buffer.alloc(44 + samples.length * 2)
  let o = 0
  buffer.write('RIFF', o); o += 4
  buffer.writeUInt32LE(36 + samples.length * 2, o); o += 4
  buffer.write('WAVE', o); o += 4
  buffer.write('fmt ', o); o += 4
  buffer.writeUInt32LE(16, o); o += 4 // PCM chunk size
  buffer.writeUInt16LE(1, o); o += 2  // PCM
  buffer.writeUInt16LE(1, o); o += 2  // channels
  buffer.writeUInt32LE(sr, o); o += 4
  buffer.writeUInt32LE(byteRate, o); o += 4
  buffer.writeUInt16LE(2, o); o += 2  // block align
  buffer.writeUInt16LE(16, o); o += 2 // bits per sample
  buffer.write('data', o); o += 4
  buffer.writeUInt32LE(samples.length * 2, o); o += 4
  for (let i = 0; i < samples.length; i++) buffer.writeInt16LE(samples[i], 44 + i * 2)
  return new Response(buffer, { headers: { 'Content-Type': 'audio/wav' } })
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  const voiceId = process.env.ELEVENLABS_VOICE_ID
  try {
    // If you’ve added ElevenLabs keys, use the real TTS:
    if (apiKey && voiceId) {
      const { text = 'Hello from ElevenLabs demo' } = await req.json()
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        })
      })
      if (!r.ok) return beepWav(1) // fall back to beep if TTS fails
      const buf = Buffer.from(await r.arrayBuffer())
      return new Response(buf, { headers: { 'Content-Type': 'audio/mpeg' } })
    }
    // No keys? Return beep.
    return beepWav(1)
  } catch {
    return beepWav(1)
  }
}
