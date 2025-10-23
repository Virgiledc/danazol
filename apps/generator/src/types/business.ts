export interface BusinessData {
  name: string
  category: string
  description: string
  phone: string
  email: string
  address: string
  website?: string
  hours: BusinessHours
  images: string[]
  sections: string[]
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  isOpen: boolean
  openTime?: string
  closeTime?: string
}

export interface Project {
  id: string
  name: string
  businessData: BusinessData
  generatedCode?: GeneratedCode
  deploymentInfo?: DeploymentInfo
  versionHistory: VersionEntry[]
  createdAt: Date
  updatedAt: Date
  notes: string
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

export interface BusinessCategory {
  id: string
  name: string
  icon: string
  description: string
}

export interface WebsiteSection {
  id: string
  name: string
  description: string
  required: boolean
  category?: string[]
}
