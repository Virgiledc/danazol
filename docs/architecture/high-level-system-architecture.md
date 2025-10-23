# High-Level System Architecture

## 1.1 System Overview

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

## 1.2 High-Level Data Flow

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

## 1.3 Key Architecture Principles

- **Frontend-First:** All business logic runs in the browser; backend is minimal
- **Stateless Rendering:** Generated websites are static files deployed to Netlify
- **Modular Generation:** Each section can be regenerated independently
- **Local Development:** Supabase handles project persistence; no complex backend needed
- **MVP Simplicity:** Avoid premature optimization; focus on core workflow
