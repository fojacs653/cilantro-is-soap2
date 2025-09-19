
# StoryShort – Simple Starter (Plain-English)

This is a super simple starting point you can deploy on Vercel. It shows the flow:
1) Type a topic.
2) Click **Generate Script** (uses OpenAI if you add a key, or a canned demo otherwise).
3) Click **Generate Voice** (demo returns a tiny silent mp3 as a placeholder).
4) (Later) We'll wire real rendering and auto-posting.

## What the parts mean

- **Vercel**: the place that hosts your website.
- **Stripe**: handles payments (subscriptions).
- **OpenAI**: writes the video script.
- **Rendering/Workers**: background apps that will stitch the video together. (Not in this simple starter.)

## Quick Start (local)

1. Install Node 20+ and pnpm (or npm).
2. Run:
   ```bash
   npm i
   npm run dev
   ```
   Open http://localhost:3000

## Deploy to Vercel (no database needed for this demo)
1. Create a new GitHub repo and upload these files.
2. In Vercel, click **Add New… → Project → Import from GitHub**.
3. Add env vars (optional for demo):
   - `NEXT_PUBLIC_APP_URL` = your Vercel URL
   - `OPENAI_API_KEY` if you want real scripts
   - `STRIPE_SECRET_KEY` if you want checkout to work
   - `NEXT_PUBLIC_STARTER_PRICE_ID` / `NEXT_PUBLIC_GROWTH_PRICE_ID`

## Where we go next (real product)
- Replace the TTS route with ElevenLabs and upload the returned audio to storage.
- Add a database (Neon/Supabase) for users, projects, and episodes.
- Add a job queue and worker to render video with Remotion + FFmpeg.
- Add YouTube/TikTok publishing.

Want me to do those for you? Tell me, and I’ll generate the next step with simple instructions.
