# Security Architecture

## 8.1 API Key Management

- **Claude API Key:** Server-side only (via Next.js API route)
- **Netlify Token:** Server-side only
- **Supabase Anon Key:** Public (but scoped in Supabase RLS policies)
- **Environment Variables:** Never committed; stored in .env.local

## 8.2 Code Generation Safety

- **No eval():** Generated code never executed server-side
- **Iframe Sandbox:** Generated websites previewed in sandboxed iframes
- **HTML Sanitization:** Remove potentially dangerous tags
- **CSP Headers:** Content Security Policy to prevent injection

## 8.3 Data Privacy

- No user tracking or analytics by default
- Projects stored locally first; Supabase as backup
- Business data never shared with third parties
- Generated code is plain text (no obfuscation)
