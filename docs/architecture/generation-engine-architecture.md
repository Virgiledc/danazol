# Generation Engine Architecture

## 4.1 Claude Prompt Engineering Strategy

The core of your system is **prompt engineering** - turning business data into beautiful, original website code.

### Prompt Structure

- System Prompt: Define Claude's role, constraints, output format
- Context: Business name, category, description, sector-specific design guidelines
- Main Prompt: Generate unique website layout, include specific sections, adapt design to sector
- Output Format: Provide valid HTML, include inline Tailwind CSS classes, include minimal JavaScript
- Quality Requirements: Original design, professional appearance, mobile-responsive, fast loading, accessible

### Sector-Specific Design Guidelines

```typescript
const designGuidelines = {
  restaurant: {
    colors: ["warm", "inviting", "food-focused"],
    typography: "serif headlines, readable body",
    imagery: "food, atmosphere, ambiance",
    vibe: "appetite-appealing, welcoming",
    sections: ["hero with food image", "menu snippet", "reviews", "hours/location"]
  },
  salon: {
    colors: ["elegant", "sophisticated", "professional"],
    typography: "modern, clean",
    imagery: "before/after, styling, professional",
    vibe: "premium, trusted, relaxing",
    sections: ["gallery of work", "services", "testimonials", "booking CTA"]
  },
  retail: {
    colors: ["modern", "vibrant", "brand-focused"],
    typography: "bold, eye-catching",
    imagery: "products, lifestyle, brand",
    vibe: "shopping-friendly, discoverable",
    sections: ["product showcase", "about", "promotions", "contact"]
  }
}
```

## 4.2 Generation Flow

1. User Input Captured
2. Build Design Guidelines (based on sector)
3. Construct Full Prompt
4. Call Claude API
5. Stream Response (optional - real-time updates)
6. Validate HTML/CSS/JS Syntax
7. Check for Tailwind Classes (ensure valid)
8. Test Responsive Breakpoints
9. Optimize Code (minify, remove unused)
10. Store in Supabase
11. Display in Preview

## 4.3 Code Validation

```typescript
export function validateGeneratedCode(html: string): {
  valid: boolean
  errors: string[]
} {
  // 1. Check HTML is well-formed
  // 2. Validate Tailwind classes exist
  // 3. Check for common errors (unclosed tags)
  // 4. Ensure no forbidden tags (scripts, iframes, etc.)
  // 5. Validate CSS syntax
  // 6. Test responsive media queries
  
  return { valid, errors }
}
```
