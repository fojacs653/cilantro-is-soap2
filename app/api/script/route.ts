
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
export async function POST(req: NextRequest){
  const { topic, seconds = 25 } = await req.json()
  const apiKey = process.env.OPENAI_API_KEY
  if(!apiKey){
    // return a canned script if no key present
    const fallback = JSON.stringify([
      { scene: 1, narration: `Hook: ${topic} in under ${seconds}s!`, visual_keywords: ['hook','bold text'] },
      { scene: 2, narration: 'Fact 1: Space is completely silent.', visual_keywords: ['space','stars'] },
      { scene: 3, narration: 'Fact 2: A day on Venus is longer than its year.', visual_keywords: ['venus'] },
      { scene: 4, narration: 'CTA: Follow for more quick facts!', visual_keywords: ['cta'] }
    ], null, 2)
    return NextResponse.json({ script: fallback })
  }
  const client = new OpenAI({ apiKey })
  const prompt = `Write a ${seconds}s short-video script. Include: 2s hook, 3 punchy facts, 1-line CTA. Return JSON array of scenes: [{scene, narration, visual_keywords}] Topic: ${topic}`
  const out = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  })
  const content = out.choices[0]?.message?.content || '[]'
  return NextResponse.json({ script: content })
}
