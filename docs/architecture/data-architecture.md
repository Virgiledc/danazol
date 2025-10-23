# Data Architecture

## 5.1 Data Models

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

## 5.2 Local Storage Strategy

For MVP, projects are stored in:
1. **Supabase (primary)** - Persistent storage
2. **Browser IndexedDB (cache)** - Faster local access
3. **Browser SessionStorage** - Current work session
