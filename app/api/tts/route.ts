
import { NextRequest } from 'next/server'
// For demo without external keys, we return a small silent MP3 buffer so the audio element plays.
// In production, swap this to call ElevenLabs and return audio/mpeg.
export async function POST(req: NextRequest){
  // 1-second silent mp3 data (very small). This is a placeholder.
  const silentMp3 = Buffer.from(
    '4944330300000000000f545458580000000353696c656e744d50330000000000000000', 'hex'
  )
  return new Response(silentMp3, { headers: { 'Content-Type': 'audio/mpeg' } })
}
