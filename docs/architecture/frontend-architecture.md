# Frontend Architecture (React + Next.js)

## 2.1 Frontend Technology Stack

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

## 2.2 Frontend Project Structure (Monorepo)

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

## 2.3 Key Frontend Components

### BusinessForm Component
- Text fields: name, description, phone, email, address
- Select: business category (15+ predefined)
- Time pickers: business hours
- Image upload: up to 5 images
- Checkboxes: optional sections (testimonials, pricing, etc.)
- Submit triggers generation

### GenerationProgress Component
- Progress bar (0% → 100%)
- Status messages ("Analyzing sector...", "Generating HTML...", etc.)
- Cancel button (graceful interruption)
- Error handling with retry option

### WebsitePreview Component
- iframe-based preview
- Displays generated HTML in sandbox
- Responsive toggle (shows mobile/desktop/tablet versions)
- Full-screen preview option
- DevTools console for debugging
- Regenerate/Edit/Deploy buttons

### CodeEditor Component
- Monaco Editor integration
- View generated HTML/CSS/JS
- Edit code with syntax highlighting
- Validate code before deployment
- Undo/Redo changes
