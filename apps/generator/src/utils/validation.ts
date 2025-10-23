import { z } from 'zod'

export const dayHoursSchema = z.object({
  isOpen: z.boolean(),
  openTime: z.string().optional(),
  closeTime: z.string().optional()
}).refine((data) => {
  if (data.isOpen) {
    return data.openTime && data.closeTime
  }
  return true
}, {
  message: "Open and close times are required when business is open",
  path: ["openTime"]
})

export const businessHoursSchema = z.object({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema
})

export const businessDataSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters'),
  category: z.string().min(1, 'Please select a business category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  hours: businessHoursSchema,
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed'),
  sections: z.array(z.string()).min(1, 'Select at least one section')
})

export type BusinessDataFormData = z.infer<typeof businessDataSchema>

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone)
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  return phone
}

export const validateBusinessHours = (hours: any): boolean => {
  try {
    businessHoursSchema.parse(hours)
    return true
  } catch {
    return false
  }
}
