import { NextRequest, NextResponse } from 'next/server'

const curiosityWords = ['secret','surprising','weird','hidden','mistake','truth','myth','hack','why','what','how']
function wordCount(s: string){ return (s.match(/\b[\w’'-]+\b/g) || []).length }
function hasNumber(s: string){ return /\d/.test(s) }
function hasYou(s: string){ return /\byou(r|’re)?\b/i.test(s) }
function hasQuestion(s: string){ return /\?/.test(s) }
function hasCuriosity(s: string){ return curiosityWords.some(w => new RegExp(`\\b${w}\\b`, 'i').test(s)) }

function scoreHook(hook: string){
  const wc = wordCount(hook)
  let score = 50
  if (wc >= 5 && wc <= 12) score += 10; else score -= 10
  if (hasNumber(hook)) score += 10
  if (hasYou(hook)) score += 10
  if (hasQuestion(hook)) score += 8
  if (hasCuriosity(hook)) score += 7
  return Math.max(0, Math.min(100, score))
}

export async function POST(req: NextRequest){
  const { script, seconds = 25 } = await req.json()
  // Accept either JSON array of scenes or plain text
  let scenes: any[] = []
  try {
    scenes = typeof script === 'string' ? JSON.parse(script) : script
  } catch { /* ignore */ }

  const hook = scenes?.[0]?.narration || (typeof script === 'string' ? script : '')
  const bodyText = scenes?.map((s:any)=>s?.narration).filter(Boolean).join(' ') || ''
  const totalWords = wordCount(bodyText || hook)
  const wpm = (totalWords / (seconds/60)).toFixed(0)

  // Pace score (target 130–160 wpm)
  let paceScore = 50
  const wpmNum = Number(wpm)
  if (wpmNum >= 120 && wpmNum <= 170) paceScore = 85
  else if (wpmNum >= 100 && wpmNum <= 190) paceScore = 70
  else paceScore = 40

  const hookScore = scoreHook(hook)
  const retentionScore = Math.round(0.6 * hookScore + 0.4 * paceScore)

  const tips: string[] = []
  if (hookScore < 75){
    if (!hasNumber(hook)) tips.push('Add a number to anchor the promise (e.g., “3 hacks…”).')
    if (!hasYou(hook)) tips.push('Speak directly to the viewer (“you/your”).')
    if (!hasQuestion(hook)) tips.push('Try a curiosity question in the hook.')
    if (!hasCuriosity(hook)) tips.push('Use a curiosity word (secret, surprising, weird…).')
    const wc = wordCount(hook)
    if (wc < 5 || wc > 12) tips.push('Keep the hook between 5–12 words.')
  }
  if (paceScore < 70){
    tips.push(`Adjust length to ~${Math.round((seconds/60)*150)} words total for ${seconds}s.`)
  }

  return NextResponse.json({
    retentionScore,
    breakdown: { hookScore, paceScore, wpm: Number(wpm), totalWords },
    suggestions: tips
  })
}
