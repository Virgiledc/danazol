# Backend/API Architecture

## 3.1 Backend Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Database** | Supabase (PostgreSQL) | Store projects, business data, generated code |
| **Auth** (if needed) | Supabase Auth | Not needed for MVP (local app only) |
| **LLM API** | Anthropic Claude | Code generation |
| **Deployment API** | Netlify API | Deploy generated sites |
| **Image API** | Unsplash / Pexels | Stock image sourcing |
| **Hosting** | Next.js API Routes | Proxy calls for security (API key management) |

## 3.2 API Route Handlers (Next.js)

All backend logic is implemented as **Next.js API Routes** - keeping everything in one codebase.

### Route: `/api/claude/generate`

```
POST /api/claude/generate

Request Body:
{
  businessName: string
  category: string
  description: string
  hours: string
  images: string[]
  sections: string[]
  regenerateSections?: string[]
}

Response:
{
  html: string
  css: string
  javascript: string
  metadata: {
    generatedAt: timestamp
    category: string
    imageUrls: string[]
  }
}

Error Handling:
- 401: Invalid Claude API key
- 429: Rate limit exceeded (retry after X seconds)
- 500: Claude API error
```

Logic:
1. Validate request and business data
2. Load sector-specific design guidelines
3. Construct Claude prompt with business data, sector requirements, Tailwind CSS constraints
4. Call Claude API with streaming (optional for live updates)
5. Validate generated code (HTML syntax, Tailwind CSS output validation)
6. Return sanitized code

### Route: `/api/netlify/deploy`

```
POST /api/netlify/deploy

Request Body:
{
  projectId: string
  html: string
  css: string
  javascript: string
  businessName: string
}

Response:
{
  url: string
  siteId: string
  deployTime: number
  status: "deployed" | "pending"
}

Error Handling:
- 401: Invalid Netlify token
- 400: Invalid code/syntax
- 500: Deployment failed
```

Logic:
1. Package HTML/CSS/JS into deployable format
2. Create or update Netlify site (via API)
3. Upload files to Netlify
4. Trigger build/deploy
5. Poll deployment status
6. Return live URL once deployed

### Route: `/api/supabase/projects`

CRUD operations for projects stored in Supabase:
- GET /api/supabase/projects
- POST /api/supabase/projects
- PUT /api/supabase/projects/[id]
- DELETE /api/supabase/projects/[id]

## 3.3 Supabase Schema

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  business_category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  business_data JSONB,
  generated_code JSONB,
  deployment_info JSONB,
  version_history JSONB[],
  notes TEXT
);

CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_category ON projects(business_category);
```
