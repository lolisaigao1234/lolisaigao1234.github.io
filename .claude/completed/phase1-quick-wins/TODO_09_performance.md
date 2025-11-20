# TODO #9: Performance Optimization

**Priority:** HIGH
**Difficulty:** Medium
**Estimated Time:** 2-3 days
**Status:** 📋 Planned

---

## Overview

Implement comprehensive performance optimizations to ensure the website loads quickly, runs smoothly, and scores highly on performance metrics. Focus on reducing bundle size, optimizing images, lazy loading, and runtime performance.

---

## Current Performance Baseline

### Metrics to Measure
```
Lighthouse Scores (Target):
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

Core Web Vitals:
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1
- FCP (First Contentful Paint): <1.8s
- TTI (Time to Interactive): <3.8s
```

---

## Optimization Strategies

### 1. **Image Optimization**

#### Current Issues
- No images currently, but future additions need optimization

#### Solutions
```html
<!-- Use modern formats with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>

<!-- Responsive images -->
<img
  srcset="image-320w.jpg 320w,
          image-640w.jpg 640w,
          image-1280w.jpg 1280w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-640w.jpg"
  alt="Description"
  loading="lazy"
>
```

#### Tools
- **ImageOptim** - Lossless compression
- **Squoosh** - WebP/AVIF conversion
- **Sharp** (Node.js) - Automated image processing

---

### 2. **Font Optimization**

#### Current Implementation
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">
```

#### Optimized Version
```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">

<!-- Or self-host fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

#### Self-Hosting Strategy
```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
}
```

**Benefits:**
- Faster loading (no external DNS lookup)
- Better caching control
- GDPR compliance

---

### 3. **CSS Optimization**

#### Techniques
```css
/* Use containment for performance */
.glass {
  contain: layout style paint;
}

/* Use will-change sparingly */
.animating-element:hover {
  will-change: transform;
}

.animating-element {
  will-change: auto; /* Reset after animation */
}

/* Optimize gradients */
/* Before: Multiple gradient layers */
background:
  radial-gradient(...),
  radial-gradient(...),
  radial-gradient(...);

/* After: Combine or use single gradient */
background: radial-gradient(...);
```

#### Critical CSS
Extract above-the-fold CSS and inline it:
```html
<head>
  <style>
    /* Critical CSS (hero, navigation, above-fold) */
    body { ... }
    .hero { ... }
    nav { ... }
  </style>

  <!-- Non-critical CSS loaded async -->
  <link rel="preload" href="/css/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/styles.css"></noscript>
</head>
```

---

### 4. **JavaScript Optimization**

#### Code Splitting
```javascript
// Lazy load particles only when needed
const loadParticles = () => {
  import('./particles-config.js').then(module => {
    module.initParticles();
  });
};

// Load on user interaction or after page load
window.addEventListener('load', () => {
  setTimeout(loadParticles, 2000);
});
```

#### Defer Non-Critical Scripts
```html
<!-- Critical scripts -->
<script src="/js/accordion.js"></script>

<!-- Non-critical scripts (defer) -->
<script src="/js/animations.js" defer></script>
<script src="/js/analytics.js" defer></script>

<!-- Third-party scripts (async) -->
<script src="https://cdn.example.com/library.js" async></script>
```

#### Remove Unused Code
```bash
# Use tree-shaking with bundler
npm install -D rollup-plugin-terser

# Or manually check for unused code
npx purgecss --css styles.css --content index.html
```

---

### 5. **Lazy Loading**

#### Images
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Intersection Observer for older browsers -->
<script>
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
</script>
```

#### Sections
```javascript
// Lazy load accordion content
const accordionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load heavy content when accordion comes into view
      loadAccordionContent(entry.target);
      accordionObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.accordion-item').forEach(item => {
  accordionObserver.observe(item);
});
```

---

### 6. **Resource Hints**

```html
<head>
  <!-- DNS Prefetch for third-party domains -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- Preconnect for critical third-party origins -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Prefetch for likely next navigation -->
  <link rel="prefetch" href="/projects.html">

  <!-- Preload critical resources -->
  <link rel="preload" href="/css/styles.css" as="style">
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/js/main.js" as="script">
</head>
```

---

### 7. **Caching Strategy**

#### Service Worker (PWA)
```javascript
// sw.js
const CACHE_NAME = 'rocky-portfolio-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/fonts/inter-var.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

#### HTTP Headers (for server)
```
# .htaccess or server config
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"

  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # HTML (short cache for updates)
  ExpiresByType text/html "access plus 1 day"
</IfModule>
```

---

### 8. **Reduce Render-Blocking**

#### Inline Critical CSS
```html
<head>
  <style>
    /* Inline critical CSS for above-the-fold content */
    :root { ... }
    body { ... }
    .hero { ... }
    nav { ... }
  </style>

  <!-- Load full CSS asynchronously -->
  <link rel="preload" href="/css/styles.css" as="style" onload="this.rel='stylesheet'">
</head>
```

---

### 9. **Minimize Reflows and Repaints**

#### Best Practices
```javascript
// Bad: Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// Good: Single reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Better: Use CSS classes
element.classList.add('optimized-class');

// Best: Use transform (GPU accelerated)
element.style.transform = 'translateX(100px) scale(1.1)';
```

#### Read/Write Batching
```javascript
// Bad: Interleaved reads and writes
const height1 = element1.offsetHeight; // Read (reflow)
element1.style.height = height1 + 10 + 'px'; // Write

const height2 = element2.offsetHeight; // Read (reflow)
element2.style.height = height2 + 10 + 'px'; // Write

// Good: Batch reads, then batch writes
const height1 = element1.offsetHeight;
const height2 = element2.offsetHeight;

element1.style.height = height1 + 10 + 'px';
element2.style.height = height2 + 10 + 'px';
```

---

### 10. **Bundle Size Optimization**

#### Analyze Bundle
```bash
# If using bundler (Vite, Webpack)
npm run build -- --analyze

# Or use bundlephobia
npx bundle-phobia <package-name>
```

#### Reduce Dependencies
```javascript
// Instead of full library
import _ from 'lodash'; // 70KB

// Use specific functions
import debounce from 'lodash/debounce'; // 2KB

// Or write simple utilities
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};
```

---

## Implementation Checklist

### Phase 1: Measurement (Day 1)
- [ ] Run Lighthouse audit (baseline)
- [ ] Run WebPageTest analysis
- [ ] Check bundle size
- [ ] Identify performance bottlenecks

### Phase 2: Quick Wins (Day 1-2)
- [ ] Optimize font loading
- [ ] Add resource hints (preconnect, dns-prefetch)
- [ ] Enable compression (if server access)
- [ ] Defer non-critical JS
- [ ] Add lazy loading to images

### Phase 3: CSS/JS Optimization (Day 2-3)
- [ ] Extract and inline critical CSS
- [ ] Minimize and compress CSS/JS
- [ ] Remove unused CSS
- [ ] Optimize animations (use transform/opacity)
- [ ] Implement code splitting

### Phase 4: Advanced Optimizations (Day 3)
- [ ] Implement service worker caching
- [ ] Add intersection observer for lazy sections
- [ ] Optimize third-party scripts
- [ ] Set up proper cache headers
- [ ] Implement resource prioritization

### Phase 5: Testing & Validation (Day 3)
- [ ] Run Lighthouse again (compare)
- [ ] Test on various devices
- [ ] Check Core Web Vitals
- [ ] Verify no regressions
- [ ] Document improvements

---

## Tools & Resources

### Performance Testing
- **Lighthouse** (Chrome DevTools)
- **WebPageTest** (https://webpagetest.org)
- **GTmetrix** (https://gtmetrix.com)
- **PageSpeed Insights** (https://pagespeed.web.dev)

### Bundle Analysis
- **Bundlephobia** (https://bundlephobia.com)
- **Webpack Bundle Analyzer**
- **Rollup Plugin Visualizer**

### Image Optimization
- **Squoosh** (https://squoosh.app)
- **ImageOptim** (Mac)
- **Sharp** (Node.js library)

### Code Optimization
- **PurgeCSS** (Remove unused CSS)
- **Terser** (JS minification)
- **cssnano** (CSS minification)

---

## Performance Budget

### Size Budgets
```json
{
  "html": "15 KB",
  "css": "50 KB",
  "js": "150 KB",
  "images": "200 KB",
  "fonts": "100 KB",
  "total": "500 KB"
}
```

### Timing Budgets
```json
{
  "FCP": "1.5s",
  "LCP": "2.5s",
  "TTI": "3.5s",
  "TBT": "200ms",
  "CLS": "0.1"
}
```

---

## Success Metrics

### Before vs After
```
Metric          | Before | Target | Improvement
----------------|--------|--------|------------
Lighthouse Perf | TBD    | >90    | TBD
Bundle Size     | TBD    | <500KB | TBD
FCP             | TBD    | <1.5s  | TBD
LCP             | TBD    | <2.5s  | TBD
TTI             | TBD    | <3.5s  | TBD
CLS             | TBD    | <0.1   | TBD
```

---

## Related TODOs

- **TODO #10:** Progressive Web App (service worker)
- **TODO #2:** Background Effects (performance impact)
- **TODO #3:** GSAP Integration (animation performance)

---

**Status:** Ready for implementation
**Dependencies:** None
**Blocking:** None
**Estimated Completion:** 2-3 days
