# TODO #4: Parallax & Scroll Effects

**Priority:** MEDIUM
**Difficulty:** Medium
**Estimated Time:** 2 days
**Status:** 📋 Planned

---

## Overview

Add engaging parallax scrolling effects and scroll-triggered animations to create depth and visual interest. Elements move at different speeds creating a 3D layered effect.

---

## Proposed Effects

### 1. Background Parallax
- Background elements move slower than foreground
- Creates depth perception
- Particles drift at different speeds

### 2. Section Reveal Animations
- Sections fade/slide in as user scrolls
- Staggered element appearances
- Progress indicators

### 3. Scroll Progress Bar
- Visual indicator of page scroll progress
- Accent color gradient bar at top

---

## Implementation with GSAP ScrollTrigger

```javascript
// Background parallax
gsap.to('.background-layer', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom top',
    scrub: 1 // Smooth scrubbing
  },
  y: -200,
  ease: 'none'
});

// Section reveals
gsap.utils.toArray('section').forEach((section, i) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    y: 100,
    opacity: 0,
    duration: 1
  });
});

// Scroll progress bar
gsap.to('.progress-bar', {
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3
  },
  scaleX: 1,
  transformOrigin: 'left'
});
```

---

## Files to Create

```
js/scroll-effects.js      # Scroll animation logic
css/scroll-styles.css     # Progress bar styles
```

---

**Status:** Ready for implementation
**Dependencies:** GSAP ScrollTrigger (TODO #3)
**Estimated Completion:** 2 days
