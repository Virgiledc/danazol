import { NextRequest, NextResponse } from 'next/server'
import { claudeService, GenerationOptions } from '@/services/claudeService'
import { validateGeneratedCode, sanitizeHtml, optimizeCode } from '@/utils/codeValidation'
import { BusinessData } from '@/types/business'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessData, options = {} }: { 
      businessData: BusinessData
      options?: GenerationOptions 
    } = body

    // Validate required fields
    if (!businessData || !businessData.name || !businessData.category) {
      return NextResponse.json(
        { error: 'Missing required business data' },
        { status: 400 }
      )
    }

    // Check if Claude API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      )
    }

    // Generate website code
    const generatedCode = await claudeService.generateWebsite(businessData, options)

    // Validate generated code
    const validation = validateGeneratedCode(
      generatedCode.html,
      generatedCode.css,
      generatedCode.javascript
    )

    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Generated code validation failed',
          details: validation.errors,
          warnings: validation.warnings
        },
        { status: 422 }
      )
    }

    // Sanitize and optimize code
    const sanitizedHtml = sanitizeHtml(generatedCode.html)
    const optimized = optimizeCode(sanitizedHtml, generatedCode.css, generatedCode.javascript)

    // Return successful response
    return NextResponse.json({
      success: true,
      code: {
        ...generatedCode,
        html: optimized.html,
        css: optimized.css,
        javascript: optimized.javascript
      },
      validation: {
        valid: true,
        warnings: validation.warnings
      },
      metadata: {
        generationTime: generatedCode.metadata.generationTime,
        tokensUsed: generatedCode.metadata.tokensUsed,
        category: generatedCode.metadata.category,
        sections: generatedCode.metadata.sections
      }
    })

  } catch (error) {
    console.error('Claude API generation error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
      
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key configuration' },
          { status: 401 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Code generation failed. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
