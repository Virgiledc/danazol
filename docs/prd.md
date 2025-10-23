# Product Requirements Document (PRD) for Rapid Business Website Generator

## 1. Goals & Background

### 1.1 Goals

1. Enable rapid website generation for businesses from minimal input data
2. Create visually distinct, sector-specific designs (not template-based)
3. Minimize your manual effort (610 mins input per site)
4. Generate production-ready websites deployable in 61 hour
5. Support all business sectors globally from day 1
6. Establish a 2500 B2B sales model with zero backend hosting costs
7. Provide manual review/regeneration interface for quality control
8. Mobile-first interface for on-site prospecting and data entry

### 1.2 Background

> **The Problem:** Website creation is a major bottleneck in B2B sales for small businesses. Existing tools (WordPress, Wix) are slow, require extensive customization, and produce generic results. This delays sales cycles and limits your ability to prospect efficiently. Currently, creating one professional website takes a full daylimiting you to 1-2 prospects per day when you could be prospecting 5-10.

> **The Opportunity:** By automating website generation using AI and sector-specific design knowledge, you can dramatically compress the creation timeline to 1 hour of unattended building. This enables a new business model: prospect a business, build their website before meeting them, and present a finished product in-person or via call for 2500. Clients are far more likely to buy when they see something concrete, and your low price point creates friction-free sales.

> **Why Now:** LLM-based code generation, AI image sourcing, and free deployment (Netlify) make this technically viable and cost-effective. Your unique value is combining prospecting + generation + presentationtransforming a time-consuming manual process into a repeatable, scalable system. **The key to success lies in generating highly original, visually compelling websites that make clients say "yes" immediatelynot generic templates they could dismiss.**

## 2. Target Users & Personas

### 2.1 Primary Persona

**Name:** You (Founder/Developer)

**Role:** Website Creator & Sales Professional

**Context:** Working with 1 other developer, prospecting local businesses globally

**Pain Points:**
- Spends 1 full day creating each website manually
- Limited to 1-2 prospects per day
- CMS platforms (WordPress, Wix) are too slow and produce generic results
- Needs to gather data, design layouts, source images, and customize templates separately
- Can't scale prospecting without dramatically increasing creation time

**Goals:**
- Generate 5-10 websites per day instead of 1
- Spend 610 minutes inputting data per site
- Create highly original, sector-specific designs that clients can't refuse
- Validate generated websites quickly before presenting to clients
- Minimize costs (zero backend/hosting fees)

### 2.2 User Journey

1. Discovery Phase: identify prospect on Google Maps
2. Data Gathering: note business info (name, category, hours, description, photos)
3. Input Phase: open desktop/laptop app, input gathered data (610 minutes)
4. Generation Phase: system generates unique mobile-first website (unjammed)
5. Review Phase: review generated website on desktop, regenerate sections if needed
6. Deployment Phase: deploy to Netlify, receive unique URL
7. Sales Phase: visit prospect or call, show finished mobile-first website
8. Close Phase: client approves, pays 2500, owns domain

## 3. Feature Epics

- Epic 1: Business Data Input Interface
- Epic 2: AI Website Generation Engine
- Epic 3: Review & Regeneration Interface
- Epic 4: Deployment & Publishing
- Epic 5: Project Management

## 4. Detailed Functional and Non-Functional Requirements

- FR1: System accepts manual business data input
- FR2: Category selection with dropdown
- FR3: Unique LLM-based HTML/CSS/JS code generation
- FR4: Tailwind CSS styling
- FR5: Image sourcing/autogeneration
- FR6: Live preview
- FR7: Section regeneration
- FR8: Code validation
- FR9: Netlify API deployment
- FR10: URL generation
- FR11: Local project storage
- FR12: Version history
- FR13: Manual edits
- FR14: Section toggling
- FR15: Regenerate on business info update

- NFR1: Generation ≤ 60 minutes
- NFR2: Input ≤ 10 minutes
- NFR3: Desktop/laptop app
- NFR4: Responsive, mobile-first generated sites
- NFR5: Load ≤ 3 seconds
- NFR6: Support all sectors
- NFR7: Deploy success ≥ 95%
- NFR8: React + Next.js + Tailwind
- NFR9: Zero backend costs
- NFR10: LLM API rate limit handling
- NFR11: Deterministic generation
- NFR12: Local project saving

## 5. Technical Assumptions

- Stack: React + Next.js, Tailwind, TypeScript, Netlify, OpenAI/Anthropic API, Unsplash/DALL-E, local JSON storage
- Monolith architecture
- Testing: Unit, Integration, Manual, End-to-End

## 6. Epic Roadmap

- Epic 1: Foundation & Core (1-2 weeks)
- Epic 2: AI Generation Engine (2-3 weeks)
- Epic 3: Review & Customization (1-2 weeks)
- Epic 4: Deployment (1 week)
- Epic 5: Project Management (1 week)

## 7. User Stories (Selected examples)

### Epic 1: Foundation
- Project scaffold, routing
- Data input form
- Image input
- Local save/load

### Epic 2: AI Generation
- Sector design prompt
- Image sourcing
- Unique layouts
- Section toggling
- Section regeneration

### Epic 3: Review & Customization
- Code editor
- Design inspector
- Regenerate full site
- Version history
- Final approval

### Epic 4: Deployment
- Manage multiple sites
- Custom domain support
- Deployment status

### Epic 5: Project Management
- Project list dashboard
- Export/import
- Notes
- Bulk actions

---

*Document generated by BMad AI*
