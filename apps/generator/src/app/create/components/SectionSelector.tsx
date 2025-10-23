'use client'

import { useState } from 'react'
import { Check, Info } from 'lucide-react'
import { WEBSITE_SECTIONS } from '@/constants/business-categories'

interface SectionSelectorProps {
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  category?: string
}

export default function SectionSelector({ 
  value, 
  onChange, 
  error, 
  category 
}: SectionSelectorProps) {
  const [showDescriptions, setShowDescriptions] = useState(false)

  const toggleSection = (sectionId: string) => {
    if (value.includes(sectionId)) {
      onChange(value.filter(id => id !== sectionId))
    } else {
      onChange([...value, sectionId])
    }
  }

  const requiredSections = WEBSITE_SECTIONS.filter(section => section.required)
  const optionalSections = WEBSITE_SECTIONS.filter(section => !section.required)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Website Sections *
        </label>
        <button
          type="button"
          onClick={() => setShowDescriptions(!showDescriptions)}
          className="text-sm text-blue-600 hover:text-blue-500 flex items-center"
        >
          <Info className="w-4 h-4 mr-1" />
          {showDescriptions ? 'Hide' : 'Show'} descriptions
        </button>
      </div>

      <div className="space-y-4">
        {/* Required Sections */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Required Sections</h4>
          <div className="space-y-2">
            {requiredSections.map((section) => (
              <div key={section.id} className="flex items-start space-x-3">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                    value.includes(section.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {value.includes(section.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {section.name}
                  </div>
                  {showDescriptions && (
                    <div className="text-xs text-gray-500 mt-1">
                      {section.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Sections */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Optional Sections</h4>
          <div className="space-y-2">
            {optionalSections.map((section) => (
              <div key={section.id} className="flex items-start space-x-3">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center ${
                    value.includes(section.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {value.includes(section.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {section.name}
                  </div>
                  {showDescriptions && (
                    <div className="text-xs text-gray-500 mt-1">
                      {section.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <div className="text-sm text-blue-800">
          <strong>Selected sections:</strong> {value.length} of {WEBSITE_SECTIONS.length}
        </div>
        {value.length > 0 && (
          <div className="text-xs text-blue-600 mt-1">
            {value.map(id => WEBSITE_SECTIONS.find(s => s.id === id)?.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  )
}
