# TODO #10: Progressive Web App (PWA)

**Priority:** LOW | **Difficulty:** Medium | **Time:** 2 days | **Status:** 📋 Planned

## Overview
Transform the portfolio into a Progressive Web App, enabling offline access, installation, and app-like experience.

## Features to Implement

### 1. Service Worker
- Cache static assets (HTML, CSS, JS, fonts)
- Offline fallback page
- Cache-first strategy for assets
- Network-first for HTML

### 2. Web App Manifest
```json
{
  "name": "Rocky Wu Portfolio",
  "short_name": "Rocky Wu",
  "description": "Data Analyst & ML Engineer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#007AFF",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3. Install Prompt
- Custom "Add to Home Screen" button
- Detect if already installed
- Show after user engagement

## Benefits
- ✅ Offline access
- ✅ App-like experience
- ✅ Faster load times (caching)
- ✅ Installable on mobile/desktop
- ✅ Push notifications (future)

**Tools:** Workbox, Vite PWA Plugin
