'use client'

import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

interface GenerationProgressProps {
  isGenerating: boolean
  progress: number
  currentStep: string
  error: string | null
  onRetry?: () => void
  onCancel?: () => void
}

export default function GenerationProgress({
  isGenerating,
  progress,
  currentStep,
  error,
  onRetry,
  onCancel
}: GenerationProgressProps) {
  if (!isGenerating && !error && progress === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          {error ? (
            <div className="space-y-4">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900">
                Generation Failed
              </h3>
              <p className="text-sm text-gray-600">
                {error}
              </p>
              <div className="flex space-x-3 justify-center">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </button>
                )}
                {onCancel && (
                  <button
                    onClick={onCancel}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : isGenerating ? (
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
              <h3 className="text-lg font-medium text-gray-900">
                Generating Your Website
              </h3>
              <p className="text-sm text-gray-600">
                {currentStep}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-500">
                {progress}% complete
              </p>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-lg font-medium text-gray-900">
                Generation Complete!
              </h3>
              <p className="text-sm text-gray-600">
                Your website has been generated successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
