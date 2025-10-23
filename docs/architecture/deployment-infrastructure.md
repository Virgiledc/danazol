# Deployment & Infrastructure

## 7.1 Frontend Deployment

**Option 1 (Recommended for MVP):** Run locally
- User runs `npm run dev` on their machine
- App runs at http://localhost:3000
- All processing happens locally
- No server costs

**Option 2 (Future):** Vercel/Netlify deployment
- Deploy Next.js app to Vercel
- Accessible from any machine
- Environment variables managed via Vercel dashboard

## 7.2 Generated Site Deployment

- All generated sites deploy to **Netlify**
- Each site gets unique URL: https://business-name-{random}.netlify.app
- Static hosting (no server needed)
- Free tier covers MVP usage

## 7.3 Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...
NETLIFY_AUTH_TOKEN=...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=...
NODE_ENV=development
```
