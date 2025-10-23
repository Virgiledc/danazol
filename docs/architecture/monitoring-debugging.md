# Monitoring & Debugging

## 11.1 Logging

- Log generation steps
- Log API calls and responses
- Store logs in browser console or file (for debugging)

## 11.2 Error Handling

- API failures → Retry with backoff
- Claude rate limits → Queue requests
- Netlify deploy failures → Show specific error message
- Invalid code generation → Fallback prompt or manual review

## 11.3 Cost Monitoring

- Track Claude API tokens used
- Warn user if approaching quota
- Log all API calls for cost analysis
