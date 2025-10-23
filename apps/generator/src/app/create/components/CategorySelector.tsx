'use client'

import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { BUSINESS_CATEGORIES } from '@/constants/business-categories'

interface CategorySelectorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function CategorySelector({ value, onChange, error }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = BUSINESS_CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedCategory = BUSINESS_CATEGORIES.find(cat => cat.id === value)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Category *
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {selectedCategory ? (
              <>
                <span className="text-lg">{selectedCategory.icon}</span>
                <span>{selectedCategory.name}</span>
              </>
            ) : (
              <span className="text-gray-500">Select a category...</span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onChange(category.id)
                  setIsOpen(false)
                  setSearchTerm('')
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
