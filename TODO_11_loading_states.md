# TODO #11: Loading States & Transitions

**Priority:** MEDIUM | **Difficulty:** Low | **Time:** 1 day | **Status:** 📋 Planned

## Overview
Add loading states, skeleton screens, and smooth page transitions for better perceived performance.

## Features

### 1. Skeleton Screens
```html
<div class="skeleton-card">
  <div class="skeleton skeleton-title"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text"></div>
</div>
```

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 2. Page Transitions
- Fade between sections
- Slide animations for navigation
- Loading spinner for async content

### 3. Progressive Content Loading
- Load hero first (above fold)
- Lazy load sections as user scrolls
- Staggered element appearance

**Related:** TODO #9 (Performance), TODO #1 (Opening Animations)
