# External Service Integration

## 6.1 Claude API Integration

**Endpoint:** https://api.anthropic.com/v1/messages

**Authentication:** Bearer token via ANTHROPIC_API_KEY environment variable

**Model:** claude-3-5-sonnet-20241022 (or latest)

**Rate Limits:** Handle 429 errors with exponential backoff

**Cost:** Monitor API usage (track tokens, warn if exceeding threshold)

## 6.2 Netlify API Integration

**Endpoint:** https://api.netlify.com/api/v1

**Authentication:** Bearer token via NETLIFY_AUTH_TOKEN

**Key Endpoints:**
- POST /sites - Create new site
- PUT /sites/{site_id} - Update site
- POST /sites/{site_id}/builds - Trigger build
- POST /deploys - Deploy files directly

## 6.3 Image Sourcing Integration

**Options:**
1. Unsplash API (Free, 50 requests/hour)
   - Endpoint: https://api.unsplash.com/search/photos
   - Params: query, per_page, page

2. Pexels API (Free, simpler)
   - Endpoint: https://api.pexels.com/v1/search
