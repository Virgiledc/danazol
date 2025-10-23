'use client'

import { useState } from 'react'
import { Eye, Code, Download, ExternalLink } from 'lucide-react'
import { GeneratedCode } from '@/services/claudeService'

interface CodePreviewProps {
  generatedCode: GeneratedCode
  onEdit?: () => void
  onDeploy?: () => void
}

export default function CodePreview({ 
  generatedCode, 
  onEdit, 
  onDeploy 
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview')

  const downloadCode = (type: 'html' | 'css' | 'js') => {
    const content = type === 'html' ? generatedCode.html : 
                   type === 'css' ? generatedCode.css : 
                   generatedCode.javascript
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `website.${type}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const openPreview = () => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(generatedCode.html)
      newWindow.document.close()
    }
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">
            Generated Website
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={openPreview}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Preview
            </button>
            {onEdit && (
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Code className="w-4 h-4 mr-2" />
                Edit Code
              </button>
            )}
            {onDeploy && (
              <button
                onClick={onDeploy}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Deploy
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'preview', label: 'Preview', icon: Eye },
              { id: 'html', label: 'HTML', icon: Code },
              { id: 'css', label: 'CSS', icon: Code },
              { id: 'js', label: 'JavaScript', icon: Code }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Live Preview</h4>
                <button
                  onClick={openPreview}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Open in new tab
                </button>
              </div>
              <div className="bg-white rounded border overflow-hidden">
                <iframe
                  srcDoc={generatedCode.html}
                  className="w-full h-96 border-0"
                  title="Website Preview"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-900">Category</div>
                <div className="text-blue-700">{generatedCode.metadata.category}</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="font-medium text-green-900">Sections</div>
                <div className="text-green-700">{generatedCode.metadata.sections.length}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <div className="font-medium text-purple-900">Generation Time</div>
                <div className="text-purple-700">{generatedCode.metadata.generationTime}ms</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'html' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">HTML Code</h4>
              <button
                onClick={() => downloadCode('html')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Download HTML
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode.html}</code>
            </pre>
          </div>
        )}

        {activeTab === 'css' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">CSS Code</h4>
              <button
                onClick={() => downloadCode('css')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Download CSS
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode.css || '/* No custom CSS generated */'}</code>
            </pre>
          </div>
        )}

        {activeTab === 'js' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">JavaScript Code</h4>
              <button
                onClick={() => downloadCode('js')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Download JS
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{generatedCode.javascript || '// No JavaScript generated'}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
