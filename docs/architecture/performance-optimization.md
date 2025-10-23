# Performance Optimization

## 9.1 Generation Performance

- **Claude API Latency:** Typical 5-15 seconds for code generation
- **Code Validation:** <100ms local validation
- **Preview Rendering:** Instant (static HTML in iframe)
- **Total Time:** 1 hour unattended generation is acceptable MVP

## 9.2 Frontend Performance

- **Code Splitting:** Lazy load components (MonacoEditor is heavy)
- **Image Optimization:** Use Next.js Image component
- **State Management:** Minimize re-renders with proper context/hooks
- **API Caching:** Cache Claude responses in Supabase (key: hash of input)

## 9.3 Generated Site Performance

- **Tailwind Purging:** Remove unused CSS classes
- **Image Optimization:** Lazy load images, use webp format
- **Minification:** Minify HTML/CSS/JS output
- **Target:** <3 second load time
