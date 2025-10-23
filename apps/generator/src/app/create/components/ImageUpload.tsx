'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  maxImages?: number
}

export default function ImageUpload({ 
  value, 
  onChange, 
  error, 
  maxImages = 5 
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newImages: string[] = []
    
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') && value.length + newImages.length < maxImages) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            newImages.push(result)
            if (newImages.length === Math.min(files.length, maxImages - value.length)) {
              onChange([...value, ...newImages])
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Images (max {maxImages})
      </label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${error ? 'border-red-300' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            <button
              type="button"
              onClick={openFileDialog}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Click to upload
            </button>
            {' '}or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, WebP up to 5MB each
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Business image ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="mt-4 flex items-center justify-center text-gray-400">
          <ImageIcon className="w-8 h-8 mr-2" />
          <span className="text-sm">No images uploaded yet</span>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
