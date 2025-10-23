# Development Workflow

## 10.1 Local Development Setup

```bash
git clone <repo>
cd rapid-website-generator
npm install
cp .env.local.example .env.local
# Fill in API keys
npm run dev
# Open http://localhost:3000
```

## 10.2 Development Phases

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

## 10.3 Testing Strategy

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
