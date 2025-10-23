import Anthropic from '@anthropic-ai/sdk'
import { BusinessData } from '@/types/business'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface GeneratedCode {
  html: string
  css: string
  javascript: string
  metadata: {
    generatedAt: Date
    category: string
    imageUrls: string[]
    sections: string[]
    generationTime: number
    tokensUsed: number
  }
}

export interface GenerationOptions {
  regenerateSections?: string[]
  customPrompt?: string
  temperature?: number
}

export class ClaudeService {
  private static instance: ClaudeService
  private anthropic: Anthropic

  constructor() {
    this.anthropic = anthropic
  }

  static getInstance(): ClaudeService {
    if (!ClaudeService.instance) {
      ClaudeService.instance = new ClaudeService()
    }
    return ClaudeService.instance
  }

  async generateWebsite(
    businessData: BusinessData,
    options: GenerationOptions = {}
  ): Promise<GeneratedCode> {
    const startTime = Date.now()

    try {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not configured')
      }

      const prompt = this.buildPrompt(businessData, options)
      
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: options.temperature || 0.7,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })

      const content = response.content[0]
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      const generatedCode = this.parseGeneratedCode(content.text)
      const generationTime = Date.now() - startTime

      return {
        ...generatedCode,
        metadata: {
          ...generatedCode.metadata,
          generatedAt: new Date(),
          generationTime,
          tokensUsed: response.usage?.input_tokens || 0
        }
      }
    } catch (error) {
      console.error('Claude API error:', error)
      throw new Error(`Code generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private buildPrompt(businessData: BusinessData, options: GenerationOptions): string {
    const sectorGuidelines = this.getSectorGuidelines(businessData.category)
    
    return `
# Website Generation Task

You are an expert web designer creating a professional, unique website for a ${businessData.category} business.

## Business Information
- **Name:** ${businessData.name}
- **Category:** ${businessData.category}
- **Description:** ${businessData.description}
- **Phone:** ${businessData.phone}
- **Email:** ${businessData.email}
- **Address:** ${businessData.address}
- **Website:** ${businessData.website || 'Not provided'}
- **Hours:** ${this.formatBusinessHours(businessData.hours)}
- **Images:** ${businessData.images.length} images provided
- **Sections:** ${businessData.sections.join(', ')}

## Design Guidelines for ${businessData.category}
${sectorGuidelines}

## Requirements
1. Generate a complete, professional website using HTML, CSS, and minimal JavaScript
2. Use ONLY Tailwind CSS classes for styling (no custom CSS)
3. Make it mobile-first and fully responsive
4. Include all requested sections: ${businessData.sections.join(', ')}
5. Use modern, clean design principles
6. Ensure accessibility standards (ARIA labels, semantic HTML)
7. Include proper meta tags and SEO optimization
8. Make it unique and not template-like

## Output Format
Return your response as a JSON object with this exact structure:
{
  "html": "complete HTML document with <!DOCTYPE html>",
  "css": "any additional CSS (minimal, mostly Tailwind)",
  "javascript": "minimal JavaScript for interactivity",
  "metadata": {
    "category": "${businessData.category}",
    "imageUrls": [],
    "sections": ${JSON.stringify(businessData.sections)}
  }
}

## Important Notes
- The HTML must be a complete, valid document
- Use Tailwind CSS classes for all styling
- Include proper semantic HTML structure
- Make it visually appealing and professional
- Ensure it works on mobile and desktop
- Include contact information and business hours
- Make it unique to this specific business

Generate the website now:
`
  }

  private getSectorGuidelines(category: string): string {
    const guidelines: Record<string, string> = {
      restaurant: `
- Colors: Warm, inviting colors (oranges, reds, browns, golds)
- Typography: Serif headlines, readable body text
- Imagery: Food photos, atmosphere, ambiance
- Vibe: Appetite-appealing, welcoming, cozy
- Sections: Hero with food image, menu highlights, reviews, hours/location
- Layout: Clean, food-focused, easy navigation`,
      
      salon: `
- Colors: Elegant, sophisticated (blacks, whites, golds, pastels)
- Typography: Modern, clean, professional
- Imagery: Before/after photos, styling work, professional shots
- Vibe: Premium, trusted, relaxing, luxurious
- Sections: Gallery of work, services, testimonials, booking CTA
- Layout: Clean, professional, showcase-focused`,
      
      retail: `
- Colors: Modern, vibrant, brand-focused
- Typography: Bold, eye-catching, modern
- Imagery: Products, lifestyle, brand imagery
- Vibe: Shopping-friendly, discoverable, trendy
- Sections: Product showcase, about, promotions, contact
- Layout: Product-focused, easy browsing, clear CTAs`,
      
      fitness: `
- Colors: Energetic, motivating (blues, greens, oranges)
- Typography: Bold, strong, motivational
- Imagery: Workouts, equipment, healthy lifestyle
- Vibe: Energetic, motivating, professional
- Sections: Classes, trainers, facilities, membership
- Layout: Action-oriented, clear schedules, strong CTAs`,
      
      medical: `
- Colors: Clean, trustworthy (blues, whites, greens)
- Typography: Professional, readable, calming
- Imagery: Clean facilities, professional staff
- Vibe: Trustworthy, professional, caring
- Sections: Services, staff, location, appointments
- Layout: Clean, professional, easy to navigate`,
      
      default: `
- Colors: Professional, modern, clean
- Typography: Clear, readable, professional
- Imagery: Professional, relevant to business
- Vibe: Professional, trustworthy, modern
- Sections: About, services, contact, testimonials
- Layout: Clean, professional, easy navigation`
    }

    return guidelines[category] || guidelines.default
  }

  private formatBusinessHours(hours: any): string {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const formattedHours: string[] = []

    Object.entries(hours).forEach(([day, dayHours]: [string, any]) => {
      const dayName = days[Object.keys(hours).indexOf(day)]
      if (dayHours.isOpen) {
        formattedHours.push(`${dayName}: ${dayHours.openTime} - ${dayHours.closeTime}`)
      } else {
        formattedHours.push(`${dayName}: Closed`)
      }
    })

    return formattedHours.join('\n')
  }

  private parseGeneratedCode(responseText: string): GeneratedCode {
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])
      
      return {
        html: parsed.html || '',
        css: parsed.css || '',
        javascript: parsed.javascript || '',
        metadata: {
          generatedAt: new Date(),
          category: parsed.metadata?.category || '',
          imageUrls: parsed.metadata?.imageUrls || [],
          sections: parsed.metadata?.sections || [],
          generationTime: 0,
          tokensUsed: 0
        }
      }
    } catch (error) {
      console.error('Error parsing Claude response:', error)
      throw new Error('Failed to parse generated code from Claude response')
    }
  }
}

export const claudeService = ClaudeService.getInstance()
