import { useState, useCallback } from 'react'
import { BusinessData } from '@/types/business'
import { GeneratedCode } from '@/services/claudeService'

interface GenerationState {
  isGenerating: boolean
  progress: number
  currentStep: string
  error: string | null
  generatedCode: GeneratedCode | null
}

interface GenerationOptions {
  regenerateSections?: string[]
  customPrompt?: string
  temperature?: number
}

export const useGeneration = () => {
  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    progress: 0,
    currentStep: '',
    error: null,
    generatedCode: null
  })

  const generateWebsite = useCallback(async (
    businessData: BusinessData,
    options: GenerationOptions = {}
  ) => {
    setState({
      isGenerating: true,
      progress: 0,
      currentStep: 'Preparing generation...',
      error: null,
      generatedCode: null
    })

    try {
      // Step 1: Validate business data
      setState(prev => ({
        ...prev,
        progress: 20,
        currentStep: 'Validating business data...'
      }))

      if (!businessData.name || !businessData.category) {
        throw new Error('Business name and category are required')
      }

      // Step 2: Call Claude API
      setState(prev => ({
        ...prev,
        progress: 40,
        currentStep: 'Generating website code...'
      }))

      const response = await fetch('/api/claude/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessData,
          options
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }

      // Step 3: Process response
      setState(prev => ({
        ...prev,
        progress: 80,
        currentStep: 'Processing generated code...'
      }))

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Generation failed')
      }

      // Step 4: Complete
      setState(prev => ({
        ...prev,
        progress: 100,
        currentStep: 'Generation complete!',
        isGenerating: false,
        generatedCode: result.code
      }))

      return result.code

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      setState(prev => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
        currentStep: 'Generation failed'
      }))

      throw error
    }
  }, [])

  const resetGeneration = useCallback(() => {
    setState({
      isGenerating: false,
      progress: 0,
      currentStep: '',
      error: null,
      generatedCode: null
    })
  }, [])

  const retryGeneration = useCallback(async (
    businessData: BusinessData,
    options: GenerationOptions = {}
  ) => {
    setState(prev => ({
      ...prev,
      error: null
    }))
    
    return generateWebsite(businessData, options)
  }, [generateWebsite])

  return {
    ...state,
    generateWebsite,
    resetGeneration,
    retryGeneration
  }
}
