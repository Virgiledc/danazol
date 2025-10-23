# Full-Stack Architecture Document
## Rapid Business Website Generator

---

## Table of Contents
1. High-Level System Architecture
2. Frontend Architecture (React + Next.js)
3. Backend/API Architecture
4. Generation Engine Architecture
5. Data Architecture
6. External Service Integration
7. Deployment & Infrastructure
8. Security Architecture
9. Performance Optimization
10. Development Workflow
11. Monitoring & Debugging
12. Scalability & Future Enhancements

---

## Architecture Decisions (Locked)

✅ **Monorepo** - Single repository  
✅ **Local-First Desktop App** - React + Next.js  
✅ **Supabase for Project Storage** - Frontend-driven, minimal backend  
✅ **Claude API** - LLM-based generation  
✅ **Netlify for Deployment** - Generated sites only  
✅ **MVP Focus** - Simplest viable path to production  

---

## Section 1: High-Level System Architecture

### 1.1 System Overview

The Rapid Business Website Generator is a **desktop web application** that orchestrates three main components:

1. **Generator Application** (React + Next.js)
   - User-facing interface for input, generation, preview, and deployment
   - Runs locally on your machine
   - Handles all orchestration logic

2. **Generation Engine** (Claude API + Prompt Engineering)
   - Receives business data and sector info
   - Returns unique HTML/CSS/JavaScript code
   - Stateless - no caching or history on API side

3. **Infrastructure Layer**
   - **Supabase:** Stores projects (business data, generated code, metadata)
   - **Netlify:** Hosts generated websites and manages deployments
   - **Claude API:** Generates website code
   - **Image APIs:** Unsplash/Pexels for image sourcing

### 1.2 High-Level Data Flow

```
User Input (Business Data)
    ↓
React Form Component
    ↓
Validate & Prepare Prompt
    ↓
Call Claude API
    ↓
Claude Returns HTML/CSS/JS
    ↓
Validate Generated Code
    ↓
Store in Supabase
    ↓
Display in Preview (iframe)
    ↓
User Reviews/Regenerates/Deploys
    ↓
Deploy to Netlify via API
    ↓
Return Live URL
```

### 1.3 Key Architecture Principles

- **Frontend-First:** All business logic runs in the browser; backend is minimal
- **Stateless Rendering:** Generated websites are static files deployed to Netlify
- **Modular Generation:** Each section can be regenerated independently
- **Local Development:** Supabase handles project persistence; no complex backend needed
- **MVP Simplicity:** Avoid premature optimization; focus on core workflow

---

## Section 2: Frontend Architecture (React + Next.js)

### 2.1 Frontend Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 + Next.js 14+ | Full-stack React framework with SSR/SSG |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS; used in both app and generated sites |
| **Language** | TypeScript 5.x | Type safety for complex code generation logic |
| **State Management** | React Context API + Zustand | Simple app state; no Redux complexity for MVP |
| **Data Fetching** | React Query / SWR | Handle async LLM calls, Netlify deployments |
| **Code Editor** | Monaco Editor (VS Code editor) | Allow users to view/edit generated code |
| **Preview/Sandbox** | iframe | Display generated websites safely in preview |
| **HTTP Client** | Fetch API / Axios | Call Claude API, Netlify API, Supabase |
| **Form Management** | React Hook Form + Zod | Type-safe form validation |
| **UI Components** | Shadcn/ui or Headless UI | Pre-built accessible components |
| **Icons** | Lucide React | Modern icon library |

### 2.2 Frontend Project Structure (Monorepo)

```
rapid-website-generator/
├── apps/
│   ├── generator/                          # Main desktop application
│   │   ├── src/
│   │   │   ├── app/                        # Next.js app router
│   │   │   │   ├── layout.tsx              # Root layout
│   │   │   │   ├── page.tsx                # Dashboard
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx            # Create project flow
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx            # Projects list
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx        # Project detail/edit
│   │   │   │   ├── generate/
│   │   │   │   │   └── page.tsx            # Generation/preview
│   │   │   │   └── api/                    # Route handlers
│   │   │   │       ├── claude/
│   │   │   │       │   └── route.ts        # Claude API proxy
│   │   │   │       ├── netlify/
│   │   │   │       │   └── route.ts        # Netlify deployment
│   │   │   │       └── supabase/
│   │   │   │           └── route.ts        # Supabase operations
│   │   │   ├── components/
│   │   │   │   ├── BusinessForm.tsx        # Input form component
│   │   │   │   ├── GenerationProgress.tsx  # Generation status
│   │   │   │   ├── WebsitePreview.tsx      # Preview iframe
│   │   │   │   ├── CodeEditor.tsx          # Monaco editor
│   │   │   │   ├── ProjectList.tsx         # Dashboard listing
│   │   │   │   └── DeploymentStatus.tsx    # Deploy confirmation
│   │   │   ├── hooks/
│   │   │   │   ├── useGeneration.ts        # Generation logic
│   │   │   │   ├── useProjects.ts          # Supabase CRUD
│   │   │   │   ├── useDeployment.ts        # Netlify deployment
│   │   │   │   └── useLocalStorage.ts      # Local persistence
│   │   │   ├── services/
│   │   │   │   ├── claudeService.ts        # Claude API calls
│   │   │   │   ├── netlifyService.ts       # Netlify API calls
│   │   │   │   ├── supabaseClient.ts       # Supabase initialization
│   │   │   │   ├── imageService.ts         # Image sourcing (Unsplash)
│   │   │   │   └── codeGenerator.ts        # Prompt engineering
│   │   │   ├── types/
│   │   │   │   ├── project.ts              # Project data types
│   │   │   │   ├── website.ts              # Generated website types
│   │   │   │   └── business.ts             # Business info types
│   │   │   ├── utils/
│   │   │   │   ├── validation.ts           # Form/data validation
│   │   │   │   ├── codeValidation.ts       # HTML/CSS validation
│   │   │   │   └── prompts.ts              # Claude prompt templates
│   │   │   └── styles/
│   │   │       └── globals.css             # Global Tailwind styles
│   │   ├── public/                         # Static assets
│   │   ├── next.config.js                  # Next.js config
│   │   ├── tailwind.config.ts              # Tailwind config
│   │   ├── tsconfig.json                   # TypeScript config
│   │   └── package.json
│   │
│   └── generated-sites-examples/           # Example generated websites
│       ├── restaurant-example/
│       ├── retail-example/
│       └── service-example/
│
├── packages/                               # Shared utilities (optional for MVP)
│   └── shared-types/
│       └── index.ts                        # Shared TypeScript types
│
├── docs/
│   ├── architecture.md                     # This document
│   ├── prompt-engineering.md               # Claude prompts guide
│   ├── api-integration.md                  # API documentation
│   └── deployment.md                       # Deployment guide
│
├── .env.local.example                      # Environment variables template
├── .gitignore
├── package.json                            # Root monorepo config
└── turbo.json                              # Turborepo config (optional)
```

### 2.3 Key Frontend Components

#### BusinessForm Component
- Text fields: name, description, phone, email, address
- Select: business category (15+ predefined)
- Time pickers: business hours
- Image upload: up to 5 images
- Checkboxes: optional sections (testimonials, pricing, etc.)
- Submit triggers generation

#### GenerationProgress Component
- Progress bar (0% → 100%)
- Status messages ("Analyzing sector...", "Generating HTML...", etc.)
- Cancel button (graceful interruption)
- Error handling with retry option

#### WebsitePreview Component
- iframe-based preview
- Displays generated HTML in sandbox
- Responsive toggle (shows mobile/desktop/tablet versions)
- Full-screen preview option
- DevTools console for debugging
- Regenerate/Edit/Deploy buttons

#### CodeEditor Component
- Monaco Editor integration
- View generated HTML/CSS/JS
- Edit code with syntax highlighting
- Validate code before deployment
- Undo/Redo changes

---

## Section 3: Backend/API Architecture

### 3.1 Backend Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Database** | Supabase (PostgreSQL) | Store projects, business data, generated code |
| **Auth** (if needed) | Supabase Auth | Not needed for MVP (local app only) |
| **LLM API** | Anthropic Claude | Code generation |
| **Deployment API** | Netlify API | Deploy generated sites |
| **Image API** | Unsplash / Pexels | Stock image sourcing |
| **Hosting** | Next.js API Routes | Proxy calls for security (API key management) |

### 3.2 API Route Handlers (Next.js)

All backend logic is implemented as **Next.js API Routes** - keeping everything in one codebase.

#### Route: `/api/claude/generate`

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

#### Route: `/api/netlify/deploy`

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

#### Route: `/api/supabase/projects`

CRUD operations for projects stored in Supabase:
- GET /api/supabase/projects
- POST /api/supabase/projects
- PUT /api/supabase/projects/[id]
- DELETE /api/supabase/projects/[id]

### 3.3 Supabase Schema

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

---

## Section 4: Generation Engine Architecture

### 4.1 Claude Prompt Engineering Strategy

The core of your system is **prompt engineering** - turning business data into beautiful, original website code.

#### Prompt Structure

- System Prompt: Define Claude's role, constraints, output format
- Context: Business name, category, description, sector-specific design guidelines
- Main Prompt: Generate unique website layout, include specific sections, adapt design to sector
- Output Format: Provide valid HTML, include inline Tailwind CSS classes, include minimal JavaScript
- Quality Requirements: Original design, professional appearance, mobile-responsive, fast loading, accessible

#### Sector-Specific Design Guidelines

```typescript
const designGuidelines = {
  restaurant: {
    colors: ["warm", "inviting", "food-focused"],
    typography: "serif headlines, readable body",
    imagery: "food, atmosphere, ambiance",
    vibe: "appetite-appealing, welcoming",
    sections: ["hero with food image", "menu snippet", "reviews", "hours/location"]
  },
  salon: {
    colors: ["elegant", "sophisticated", "professional"],
    typography: "modern, clean",
    imagery: "before/after, styling, professional",
    vibe: "premium, trusted, relaxing",
    sections: ["gallery of work", "services", "testimonials", "booking CTA"]
  },
  retail: {
    colors: ["modern", "vibrant", "brand-focused"],
    typography: "bold, eye-catching",
    imagery: "products, lifestyle, brand",
    vibe: "shopping-friendly, discoverable",
    sections: ["product showcase", "about", "promotions", "contact"]
  }
}
```

### 4.2 Generation Flow

1. User Input Captured
2. Build Design Guidelines (based on sector)
3. Construct Full Prompt
4. Call Claude API
5. Stream Response (optional - real-time updates)
6. Validate HTML/CSS/JS Syntax
7. Check for Tailwind Classes (ensure valid)
8. Test Responsive Breakpoints
9. Optimize Code (minify, remove unused)
10. Store in Supabase
11. Display in Preview

### 4.3 Code Validation

```typescript
export function validateGeneratedCode(html: string): {
  valid: boolean
  errors: string[]
} {
  // 1. Check HTML is well-formed
  // 2. Validate Tailwind classes exist
  // 3. Check for common errors (unclosed tags)
  // 4. Ensure no forbidden tags (scripts, iframes, etc.)
  // 5. Validate CSS syntax
  // 6. Test responsive media queries
  
  return { valid, errors }
}
```

---

## Section 5: Data Architecture

### 5.1 Data Models

```typescript
interface Project {
  id: string
  name: string
  businessData: BusinessData
  generatedCode: GeneratedCode
  deploymentInfo: DeploymentInfo
  versionHistory: VersionEntry[]
  createdAt: Date
  updatedAt: Date
  notes: string
}

interface BusinessData {
  name: string
  category: string
  description: string
  phone: string
  email: string
  address: string
  hours: BusinessHours
  images: string[]
  sections: string[]
}

interface GeneratedCode {
  html: string
  css: string
  javascript: string
  generatedAt: Date
  generatedBy: "auto" | "manual_edit"
}

interface DeploymentInfo {
  netlifyUrl: string
  netlifyId: string
  deployedAt: Date
  status: "deployed" | "failed" | "pending"
}

interface VersionEntry {
  id: string
  generatedCode: GeneratedCode
  timestamp: Date
  type: "full_regeneration" | "section_regeneration"
}
```

### 5.2 Local Storage Strategy

For MVP, projects are stored in:
1. **Supabase (primary)** - Persistent storage
2. **Browser IndexedDB (cache)** - Faster local access
3. **Browser SessionStorage** - Current work session

---

## Section 6: External Service Integration

### 6.1 Claude API Integration

**Endpoint:** https://api.anthropic.com/v1/messages

**Authentication:** Bearer token via ANTHROPIC_API_KEY environment variable

**Model:** claude-3-5-sonnet-20241022 (or latest)

**Rate Limits:** Handle 429 errors with exponential backoff

**Cost:** Monitor API usage (track tokens, warn if exceeding threshold)

### 6.2 Netlify API Integration

**Endpoint:** https://api.netlify.com/api/v1

**Authentication:** Bearer token via NETLIFY_AUTH_TOKEN

**Key Endpoints:**
- POST /sites - Create new site
- PUT /sites/{site_id} - Update site
- POST /sites/{site_id}/builds - Trigger build
- POST /deploys - Deploy files directly

### 6.3 Image Sourcing Integration

**Options:**
1. Unsplash API (Free, 50 requests/hour)
   - Endpoint: https://api.unsplash.com/search/photos
   - Params: query, per_page, page

2. Pexels API (Free, simpler)
   - Endpoint: https://api.pexels.com/v1/search

---

## Section 7: Deployment & Infrastructure

### 7.1 Frontend Deployment

**Option 1 (Recommended for MVP):** Run locally
- User runs `npm run dev` on their machine
- App runs at http://localhost:3000
- All processing happens locally
- No server costs

**Option 2 (Future):** Vercel/Netlify deployment
- Deploy Next.js app to Vercel
- Accessible from any machine
- Environment variables managed via Vercel dashboard

### 7.2 Generated Site Deployment

- All generated sites deploy to **Netlify**
- Each site gets unique URL: https://business-name-{random}.netlify.app
- Static hosting (no server needed)
- Free tier covers MVP usage

### 7.3 Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...
NETLIFY_AUTH_TOKEN=...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=...
NODE_ENV=development
```

---

## Section 8: Security Architecture

### 8.1 API Key Management

- **Claude API Key:** Server-side only (via Next.js API route)
- **Netlify Token:** Server-side only
- **Supabase Anon Key:** Public (but scoped in Supabase RLS policies)
- **Environment Variables:** Never committed; stored in .env.local

### 8.2 Code Generation Safety

- **No eval():** Generated code never executed server-side
- **Iframe Sandbox:** Generated websites previewed in sandboxed iframes
- **HTML Sanitization:** Remove potentially dangerous tags
- **CSP Headers:** Content Security Policy to prevent injection

### 8.3 Data Privacy

- No user tracking or analytics by default
- Projects stored locally first; Supabase as backup
- Business data never shared with third parties
- Generated code is plain text (no obfuscation)

---

## Section 9: Performance Optimization

### 9.1 Generation Performance

- **Claude API Latency:** Typical 5-15 seconds for code generation
- **Code Validation:** <100ms local validation
- **Preview Rendering:** Instant (static HTML in iframe)
- **Total Time:** 1 hour unattended generation is acceptable MVP

### 9.2 Frontend Performance

- **Code Splitting:** Lazy load components (MonacoEditor is heavy)
- **Image Optimization:** Use Next.js Image component
- **State Management:** Minimize re-renders with proper context/hooks
- **API Caching:** Cache Claude responses in Supabase (key: hash of input)

### 9.3 Generated Site Performance

- **Tailwind Purging:** Remove unused CSS classes
- **Image Optimization:** Lazy load images, use webp format
- **Minification:** Minify HTML/CSS/JS output
- **Target:** <3 second load time

---

## Section 10: Development Workflow

### 10.1 Local Development Setup

```bash
git clone <repo>
cd rapid-website-generator
npm install
cp .env.local.example .env.local
# Fill in API keys
npm run dev
# Open http://localhost:3000
```

### 10.2 Development Phases

**Phase 1 (Week 1-2):**
- Setup monorepo structure
- Basic form input (business data capture)
- Supabase integration (save/load projects)
- First Claude API integration (simple generation)

**Phase 2 (Week 3):**
- Website preview (iframe)
- Netlify deployment integration
- Full generation pipeline (input → deploy)
- Manual code editing

**Phase 3 (Week 4):**
- Section regeneration
- Design guideline refinement
- Version history
- Image sourcing
- Testing across sectors

**Phase 4 (Week 5):**
- UI polish
- Error handling & edge cases
- Performance optimization
- Documentation

### 10.3 Testing Strategy

**Unit Tests:**
- Code validation functions
- Prompt building logic
- Data transformation functions

**Integration Tests:**
- Claude API calls
- Netlify deployments
- Supabase CRUD

**Manual Testing:**
- Full workflows (generate → deploy)
- Different business categories
- Edge cases (special characters, long text, etc.)

---

## Section 11: Monitoring & Debugging

### 11.1 Logging

- Log generation steps
- Log API calls and responses
- Store logs in browser console or file (for debugging)

### 11.2 Error Handling

- API failures → Retry with backoff
- Claude rate limits → Queue requests
- Netlify deploy failures → Show specific error message
- Invalid code generation → Fallback prompt or manual review

### 11.3 Cost Monitoring

- Track Claude API tokens used
- Warn user if approaching quota
- Log all API calls for cost analysis

---

## Section 12: Scalability & Future Enhancements

### 12.1 MVP to Production Path

1. **MVP (Current):** Local app, Supabase storage, manual deployment
2. **Phase 2:** Cloud-hosted web app, user accounts, team collaboration
3. **Phase 3:** SaaS offering, white-label, advanced features
4. **Phase 4:** Mobile app, advanced customization dashboard

### 12.2 Technical Debt & Refactoring

- Consider separating Claude prompt logic into dedicated service
- Move to microservices if scaling significantly
- Implement caching layer (Redis) for frequently generated designs
- Add analytics to track usage patterns

---

## Appendix: Technology Justification

| Technology | Why Chosen |
|-----------|-----------|
| Next.js | Full-stack React; great for local + cloud deployment |
| Tailwind CSS | Fast UI development; matches generated site styling |
| Supabase | Postgres + realtime; no backend coding needed |
| Claude API | Superior code generation; you have credits |
| Netlify | Free static hosting; excellent deployment experience |
| Monorepo | Single codebase; easier to manage for MVP |
| TypeScript | Type safety for complex generation logic |

---

*Document generated by BMad Architecture Specialist - Winston*
*Last Updated: October 22, 2025*
