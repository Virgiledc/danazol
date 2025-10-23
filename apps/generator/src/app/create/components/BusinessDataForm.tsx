'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { businessDataSchema, BusinessDataFormData } from '@/utils/validation'
import { useProjects } from '@/hooks/useSupabase'
import { useGeneration } from '@/hooks/useGeneration'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, ArrowRight, Sparkles } from 'lucide-react'

import CategorySelector from './CategorySelector'
import HoursInput from './HoursInput'
import ImageUpload from './ImageUpload'
import SectionSelector from './SectionSelector'
import GenerationProgress from './GenerationProgress'
import CodePreview from './CodePreview'

const defaultHours = {
  monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
  tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
  wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
  thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
  friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
  saturday: { isOpen: false, openTime: '', closeTime: '' },
  sunday: { isOpen: false, openTime: '', closeTime: '' }
}

const defaultSections = ['hero', 'about', 'services', 'contact']

export default function BusinessDataForm() {
  const { createProject } = useProjects()
  const { 
    isGenerating, 
    progress, 
    currentStep, 
    error: generationError, 
    generatedCode,
    generateWebsite, 
    resetGeneration, 
    retryGeneration 
  } = useGeneration()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<BusinessDataFormData>({
    resolver: zodResolver(businessDataSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      hours: defaultHours,
      images: [],
      sections: defaultSections
    },
    mode: 'onChange'
  })

  const watchedCategory = watch('category')
  const watchedHours = watch('hours')
  const watchedImages = watch('images')
  const watchedSections = watch('sections')

  const onSubmit = async (data: BusinessDataFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      const project = await createProject(data)
      
      if (project) {
        router.push(`/projects/${project.id}`)
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateWebsite = async (data: BusinessDataFormData) => {
    try {
      await generateWebsite(data)
      setShowPreview(true)
    } catch (error) {
      console.error('Generation failed:', error)
    }
  }

  const handleRetryGeneration = async () => {
    const formData = watch()
    try {
      await retryGeneration(formData)
      setShowPreview(true)
    } catch (error) {
      console.error('Retry failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-800">{submitError}</div>
        </div>
      )}

      {/* Business Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter business name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <CategorySelector
              value={watchedCategory}
              onChange={(value) => setValue('category', value)}
              error={errors.category?.message}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe your business, what you do, and what makes you unique..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register('phone')}
              type="tel"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="contact@business.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Physical Address *
          </label>
          <textarea
            {...register('address')}
            rows={2}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="123 Main Street, City, State 12345"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL (optional)
          </label>
          <input
            {...register('website')}
            type="url"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.website ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="https://www.business.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
          )}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
        <HoursInput
          value={watchedHours}
          onChange={(value) => setValue('hours', value)}
          error={errors.hours?.message}
        />
      </div>

      {/* Images */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Images</h3>
        <ImageUpload
          value={watchedImages}
          onChange={(value) => setValue('images', value)}
          error={errors.images?.message}
        />
      </div>

      {/* Website Sections */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Website Sections</h3>
        <SectionSelector
          value={watchedSections}
          onChange={(value) => setValue('sections', value)}
          error={errors.sections?.message}
          category={watchedCategory}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-between space-x-4 pb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSubmit(handleGenerateWebsite)}
            disabled={!isValid || isGenerating || isSubmitting}
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Website
              </>
            )}
          </button>
          
          <button
            type="submit"
            disabled={!isValid || isSubmitting || isGenerating}
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Project...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generation Progress Modal */}
      <GenerationProgress
        isGenerating={isGenerating}
        progress={progress}
        currentStep={currentStep}
        error={generationError}
        onRetry={handleRetryGeneration}
        onCancel={resetGeneration}
      />

      {/* Generated Code Preview */}
      {generatedCode && showPreview && (
        <div className="mt-8">
          <CodePreview
            generatedCode={generatedCode}
            onEdit={() => {
              // TODO: Implement code editor
              console.log('Edit code')
            }}
            onDeploy={() => {
              // TODO: Implement deployment
              console.log('Deploy website')
            }}
          />
        </div>
      )}
    </form>
  )
}
