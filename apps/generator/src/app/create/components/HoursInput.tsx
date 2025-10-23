'use client'

import { useState } from 'react'
import { Clock, X } from 'lucide-react'

interface HoursInputProps {
  value: any
  onChange: (value: any) => void
  error?: string
}

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
]

export default function HoursInput({ value, onChange, error }: HoursInputProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null)

  const updateDayHours = (day: string, updates: any) => {
    const newValue = {
      ...value,
      [day]: {
        ...value[day],
        ...updates
      }
    }
    onChange(newValue)
  }

  const toggleDay = (day: string) => {
    const isCurrentlyOpen = value[day]?.isOpen
    updateDayHours(day, { isOpen: !isCurrentlyOpen })
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const parseTime = (time: string) => {
    if (!time) return ''
    const [timePart, ampm] = time.split(' ')
    const [hour, minute] = timePart.split(':')
    let hour24 = parseInt(hour)
    if (ampm === 'PM' && hour24 !== 12) hour24 += 12
    if (ampm === 'AM' && hour24 === 12) hour24 = 0
    return `${hour24.toString().padStart(2, '0')}:${minute}`
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Hours *
      </label>
      
      <div className="space-y-2">
        {DAYS.map((day) => (
          <div key={day.key} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => toggleDay(day.key)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    value[day.key]?.isOpen
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {value[day.key]?.isOpen && (
                    <X className="w-3 h-3 text-white" />
                  )}
                </button>
                <span className="font-medium text-gray-900">{day.label}</span>
                {value[day.key]?.isOpen && (
                  <span className="text-sm text-gray-500">
                    {formatTime(value[day.key]?.openTime || '')} - {formatTime(value[day.key]?.closeTime || '')}
                  </span>
                )}
              </div>
              
              <button
                type="button"
                onClick={() => setExpandedDay(expandedDay === day.key ? null : day.key)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Clock className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {expandedDay === day.key && value[day.key]?.isOpen && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Open Time
                  </label>
                  <input
                    type="time"
                    value={value[day.key]?.openTime || ''}
                    onChange={(e) => updateDayHours(day.key, { openTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Close Time
                  </label>
                  <input
                    type="time"
                    value={value[day.key]?.closeTime || ''}
                    onChange={(e) => updateDayHours(day.key, { closeTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
