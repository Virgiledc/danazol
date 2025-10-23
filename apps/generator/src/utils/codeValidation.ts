export interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

export function validateGeneratedCode(html: string, css: string, javascript: string): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Validate HTML structure
  if (!html.includes('<!DOCTYPE html>')) {
    errors.push('HTML must include DOCTYPE declaration')
  }

  if (!html.includes('<html')) {
    errors.push('HTML must include <html> tag')
  }

  if (!html.includes('<head>')) {
    errors.push('HTML must include <head> section')
  }

  if (!html.includes('<body>')) {
    errors.push('HTML must include <body> section')
  }

  // Check for basic accessibility
  if (!html.includes('lang=')) {
    warnings.push('HTML should include lang attribute')
  }

  if (!html.includes('alt=') && html.includes('<img')) {
    warnings.push('Images should include alt attributes')
  }

  // Validate Tailwind CSS usage
  const tailwindClasses = html.match(/class="[^"]*"/g) || []
  const hasTailwindClasses = tailwindClasses.some(cls => 
    cls.includes('bg-') || cls.includes('text-') || cls.includes('p-') || 
    cls.includes('m-') || cls.includes('flex') || cls.includes('grid')
  )

  if (!hasTailwindClasses) {
    warnings.push('HTML should use Tailwind CSS classes for styling')
  }

  // Check for responsive design
  if (!html.includes('sm:') && !html.includes('md:') && !html.includes('lg:')) {
    warnings.push('Consider adding responsive Tailwind classes')
  }

  // Validate CSS
  if (css && css.trim()) {
    // Check for basic CSS syntax
    const cssLines = css.split('\n').filter(line => line.trim())
    for (const line of cssLines) {
      if (line.includes('{') && !line.includes('}')) {
        errors.push('CSS has unclosed braces')
        break
      }
    }
  }

  // Validate JavaScript
  if (javascript && javascript.trim()) {
    try {
      // Basic syntax check
      new Function(javascript)
    } catch (error) {
      errors.push(`JavaScript syntax error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

export function sanitizeHtml(html: string): string {
  // Remove potentially dangerous content
  let sanitized = html
  
  // Remove script tags that aren't in the head
  sanitized = sanitized.replace(/<script(?![^>]*type=["']text\/template["'])[^>]*>[\s\S]*?<\/script>/gi, '')
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // Remove dangerous protocols
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/data:text\/html/gi, '')
  
  return sanitized
}

export function optimizeCode(html: string, css: string, javascript: string): {
  html: string
  css: string
  javascript: string
} {
  // Basic optimization
  const optimizedHtml = html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()

  const optimizedCss = css
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .trim()

  const optimizedJavascript = javascript
    .replace(/\s+/g, ' ')
    .trim()

  return {
    html: optimizedHtml,
    css: optimizedCss,
    javascript: optimizedJavascript
  }
}
