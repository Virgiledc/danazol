// Shared TypeScript types for the Rapid Website Generator project

export interface Project {
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

export interface BusinessData {
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

export interface BusinessHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
}

export interface GeneratedCode {
  html: string
  css: string
  javascript: string
  generatedAt: Date
  generatedBy: "auto" | "manual_edit"
}

export interface DeploymentInfo {
  netlifyUrl: string
  netlifyId: string
  deployedAt: Date
  status: "deployed" | "failed" | "pending"
}

export interface VersionEntry {
  id: string
  generatedCode: GeneratedCode
  timestamp: Date
  type: "full_regeneration" | "section_regeneration"
}
