# TODO #3: Advanced Animation Library Integration (GSAP)

**Priority:** MEDIUM
**Difficulty:** Medium
**Estimated Time:** 2-3 days
**Status:** 📋 Planned

---

## Overview

Integrate GSAP (GreenSock Animation Platform) to create professional-grade animations throughout the website. GSAP provides powerful timeline control, smooth performance, and complex animation sequencing that goes beyond CSS capabilities.

---

## Why GSAP?

### Advantages
- ✅ Industry-standard animation library
- ✅ Best-in-class performance
- ✅ Timeline sequencing for complex animations
- ✅ Extensive easing functions
- ✅ Cross-browser consistency
- ✅ ScrollTrigger plugin for scroll-based animations
- ✅ Plugin ecosystem (MorphSVG, DrawSVG, etc.)

### Considerations
- ⚠️ Adds ~50KB to bundle (core library)
- ⚠️ Learning curve
- ⚠️ May be overkill for simple animations

---

## Proposed Animations

### 1. **Page Load Sequence**
```javascript
// Staggered fade-in of hero elements
gsap.timeline()
  .from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.hero-links .btn', {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.4');
```

### 2. **Scroll-Triggered Section Reveals**
```javascript
// Animate sections as they enter viewport
gsap.from('.about-section', {
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power2.out'
});
```

### 3. **Accordion Smooth Expand/Collapse**
```javascript
// Replace CSS transitions with GSAP
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const isOpen = content.classList.contains('open');

  // Close all accordions
  gsap.to('.accordion-content.open', {
    height: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    onComplete: () => {
      document.querySelectorAll('.accordion-content').forEach(el => {
        el.classList.remove('open');
      });
    }
  });

  // Open clicked accordion
  if (!isOpen) {
    content.classList.add('open');
    gsap.fromTo(content,
      { height: 0 },
      {
        height: 'auto',
        duration: 0.5,
        ease: 'power2.out'
      }
    );
  }
}
```

### 4. **Card Hover Effects**
```javascript
// Enhanced hover animations
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -12,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.in'
    });
  });
});
```

### 5. **Navigation Scroll Effects**
```javascript
// Hide/show navigation on scroll
ScrollTrigger.create({
  start: 'top -100',
  end: 99999,
  onUpdate: (self) => {
    if (self.direction === -1) {
      // Scrolling up
      gsap.to('nav', { y: 0, duration: 0.3 });
    } else {
      // Scrolling down
      gsap.to('nav', { y: -100, duration: 0.3 });
    }
  }
});
```

---

## Installation

### Option 1: CDN (Quick Start)
```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<!-- ScrollTrigger Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Option 2: NPM (Recommended for Production)
```bash
npm install gsap
```

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

---

## Implementation Steps

### Phase 1: Setup & Core Integration
- [ ] Install GSAP (CDN or NPM)
- [ ] Create `animations.js` file
- [ ] Register ScrollTrigger plugin
- [ ] Test basic animation

### Phase 2: Page Load Animations
- [ ] Implement hero section entrance
- [ ] Add staggered button animations
- [ ] Create about section reveal
- [ ] Test timing and easing

### Phase 3: Scroll-Based Animations
- [ ] Set up ScrollTrigger instances
- [ ] Animate sections on scroll
- [ ] Add parallax effects (optional)
- [ ] Implement navigation hide/show

### Phase 4: Interactive Animations
- [ ] Enhance accordion with GSAP
- [ ] Add card hover micro-animations
- [ ] Implement button press effects
- [ ] Add cursor-following effects (optional)

### Phase 5: Optimization & Polish
- [ ] Test performance on various devices
- [ ] Add `prefers-reduced-motion` support
- [ ] Fine-tune easing and duration
- [ ] Ensure no animation conflicts

---

## Code Structure

### File: `js/animations.js`
```javascript
// ===========================
// GSAP Animation Controller
// ===========================

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Configuration
const config = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0
  },
  ease: {
    default: 'power2.out',
    smooth: 'power3.inOut',
    bounce: 'back.out(1.7)'
  }
};

// Disable animations if user prefers reduced motion
if (config.reducedMotion) {
  gsap.config({ nullTargetWarn: false });
  // Set all durations to near-zero
  gsap.globalTimeline.timeScale(100);
}

// ===========================
// Page Load Animations
// ===========================
function initPageAnimations() {
  const timeline = gsap.timeline({ defaults: { ease: config.ease.default } });

  timeline
    .from('.hero-title', {
      duration: config.duration.slow,
      y: 50,
      opacity: 0
    })
    .from('.hero-subtitle', {
      duration: config.duration.normal,
      y: 30,
      opacity: 0
    }, '-=0.5')
    .from('.hero-links .btn', {
      duration: config.duration.normal,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: config.ease.bounce
    }, '-=0.4');
}

// ===========================
// Scroll Animations
// ===========================
function initScrollAnimations() {
  // Animate sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        once: true
      },
      y: 60,
      opacity: 0,
      duration: config.duration.slow,
      ease: config.ease.smooth
    });
  });

  // Skill cards stagger
  gsap.from('.skill-category', {
    scrollTrigger: {
      trigger: '.skills-container',
      start: 'top 80%',
      once: true
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: config.duration.normal
  });
}

// ===========================
// Interactive Animations
// ===========================
function initInteractiveAnimations() {
  // Card hover effects
  document.querySelectorAll('.project-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        scale: 1.01,
        duration: config.duration.fast,
        ease: config.ease.default
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: config.duration.fast,
        ease: config.ease.default
      });
    });
  });
}

// ===========================
// Initialize All Animations
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initPageAnimations();
  initScrollAnimations();
  initInteractiveAnimations();
});
```

---

## Performance Optimization

### Best Practices
1. **Use `will-change` sparingly**
   ```css
   .animating-element {
     will-change: transform, opacity;
   }
   ```

2. **Animate transform and opacity only**
   ```javascript
   // Good - GPU accelerated
   gsap.to(element, { x: 100, opacity: 0.5 });

   // Avoid - triggers layout
   gsap.to(element, { width: '100%', marginTop: 50 });
   ```

3. **Use `.set()` for instant changes**
   ```javascript
   gsap.set(element, { opacity: 0 }); // No animation
   ```

4. **Debounce resize listeners**
   ```javascript
   let resizeTimer;
   window.addEventListener('resize', () => {
     clearTimeout(resizeTimer);
     resizeTimer = setTimeout(() => {
       ScrollTrigger.refresh();
     }, 250);
   });
   ```

---

## ScrollTrigger Configuration

### Common Patterns

#### 1. Fade In On Scroll
```javascript
gsap.from('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    once: true // Only animate once
  },
  opacity: 0,
  y: 50,
  duration: 1
});
```

#### 2. Parallax Effect
```javascript
gsap.to('.background-layer', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true // Smooth scrubbing
  },
  y: -100
});
```

#### 3. Pin Section (Advanced)
```javascript
ScrollTrigger.create({
  trigger: '.pinned-section',
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: false
});
```

---

## Testing Checklist

- [ ] Animations play smoothly at 60 FPS
- [ ] No janky or stuttering animations
- [ ] Scroll animations trigger at correct points
- [ ] Reduced motion preferences respected
- [ ] Works on mobile devices
- [ ] No console errors
- [ ] Timelines complete properly
- [ ] No memory leaks (check DevTools)

---

## Accessibility

### Respect Motion Preferences
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Option 1: Speed up animations dramatically
  gsap.globalTimeline.timeScale(100);

  // Option 2: Disable specific animations
  ScrollTrigger.config({ ignoreAnimations: true });

  // Option 3: Skip animations entirely
  // Don't call animation functions
}

// Listen for changes
prefersReducedMotion.addEventListener('change', (e) => {
  if (e.matches) {
    // User enabled reduced motion
  }
});
```

---

## Advanced GSAP Features (Future)

### 1. **SplitText** (Text Animation)
Animate text letter-by-letter or word-by-word
```javascript
const split = new SplitText('.hero-title', { type: 'chars' });
gsap.from(split.chars, {
  opacity: 0,
  y: 50,
  stagger: 0.05
});
```

### 2. **MorphSVG** (Shape Morphing)
Morph between SVG shapes
```javascript
gsap.to('#shape1', {
  morphSVG: '#shape2',
  duration: 1
});
```

### 3. **DrawSVG** (SVG Line Drawing)
Animate SVG path strokes
```javascript
gsap.from('.svg-path', {
  drawSVG: 0,
  duration: 2
});
```

---

## Files to Create/Modify

```
js/animations.js              # New file - all GSAP code
index.html                    # Add script tag
css/styles.css                # May need adjustments
```

---

## Success Metrics

- Smooth 60 FPS animations
- Enhanced user engagement
- Professional polish
- Maintained accessibility
- No performance degradation

---

## Related TODOs

- **TODO #1:** Opening Animations (could use GSAP)
- **TODO #4:** Parallax Effects (uses ScrollTrigger)
- **TODO #13:** Microinteractions (GSAP for polish)

---

**Status:** Ready for implementation
**Dependencies:** GSAP library (~50KB)
**Blocking:** None
**Estimated Completion:** 2-3 days after start
