# TODO #1: Opening Screen Animations

**Priority:** HIGH
**Difficulty:** Medium
**Estimated Time:** 1-2 days
**Status:** 📋 Planned

---

## Overview

Create an engaging opening screen animation that appears when users first visit the website. This will include a loading animation, splash screen with logo/name reveal, and a smooth transition to the main content.

---

## Goals

- Create a memorable first impression
- Smooth transition from loading to content
- Respect user preferences (`prefers-reduced-motion`)
- Fast loading time (<1.5s)
- Mobile-friendly animations

---

## Proposed Features

### 1. **Loading Sequence**
```
[Stage 1] Fade in logo/initials (0-500ms)
[Stage 2] Reveal name with typewriter/fade effect (500-1200ms)
[Stage 3] Subtitle fade in (1200-1500ms)
[Stage 4] Transition to main content (1500-2000ms)
```

### 2. **Animation Types to Consider**

#### Option A: Minimal Fade (Fastest)
- Simple fade in of logo
- Cross-fade to main content
- Duration: 1.5s total

#### Option B: Reveal Animation (Recommended)
- Curtain/wipe reveal effect
- Letter-by-letter name reveal
- Glassmorphism card slide-in
- Duration: 2s total

#### Option C: Particle Burst
- Particles form into logo
- Burst transition to content
- More dramatic but longer
- Duration: 2.5s total

### 3. **Skip Functionality**
- "Skip Intro" button appears after 500ms
- Click anywhere to skip
- Keyboard shortcut (Space/Enter)
- Remember preference (localStorage)

---

## Technical Implementation

### HTML Structure
```html
<div id="opening-screen" class="opening-screen">
  <div class="opening-content">
    <div class="opening-logo">
      <h1 class="opening-name">Rocky Wu</h1>
      <p class="opening-subtitle">Data Analyst | ML Engineer</p>
    </div>
    <button class="skip-button">Skip Intro</button>
  </div>
</div>
```

### CSS Animations
```css
/* Opening screen container */
.opening-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeOut 0.6s ease-out 2s forwards;
}

/* Name reveal animation */
.opening-name {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.3s forwards;
}

/* Subtitle animation */
.opening-subtitle {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.7s forwards;
}

/* Hide opening screen */
.opening-screen.hidden {
  display: none;
}
```

### JavaScript Logic
```javascript
// Opening animation controller
const openingScreen = document.getElementById('opening-screen');
const skipButton = document.querySelector('.skip-button');
const ANIMATION_DURATION = 2000; // 2 seconds

// Check if user has seen intro before
const hasSeenIntro = localStorage.getItem('hasSeenIntro');

if (hasSeenIntro) {
  openingScreen.classList.add('hidden');
} else {
  // Auto-hide after duration
  setTimeout(() => {
    hideOpeningScreen();
  }, ANIMATION_DURATION);

  // Skip button handler
  skipButton.addEventListener('click', hideOpeningScreen);
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      hideOpeningScreen();
    }
  });
}

function hideOpeningScreen() {
  openingScreen.classList.add('hiding');
  setTimeout(() => {
    openingScreen.classList.add('hidden');
    localStorage.setItem('hasSeenIntro', 'true');
  }, 600); // Match CSS animation duration
}
```

---

## Animation Libraries to Consider

### Option 1: Pure CSS (Recommended for this feature)
- **Pros:** No dependencies, fast, simple
- **Cons:** Limited complexity
- **Best for:** Simple fade/slide animations

### Option 2: GSAP (GreenSock)
- **Pros:** Professional-grade, powerful, timeline control
- **Cons:** Adds ~50KB to bundle
- **Best for:** Complex sequenced animations

### Option 3: Anime.js
- **Pros:** Lightweight (~17KB), good for SVG
- **Cons:** Learning curve
- **Best for:** Moderate complexity

---

## Design Considerations

### Colors & Effects
- Use existing color palette (blue, purple, pink gradients)
- Glassmorphism effect on opening card
- Subtle particle background (optional)
- Gradient text for name

### Timing Function
```css
cubic-bezier(0.4, 0, 0.2, 1) /* Material Design standard easing */
```

### Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  .opening-screen {
    animation-duration: 0.01ms !important;
  }
  /* Show content immediately */
}
```

---

## Implementation Steps

### Phase 1: Basic Structure
- [ ] Create HTML markup for opening screen
- [ ] Add CSS for positioning and basic styles
- [ ] Test on mobile and desktop

### Phase 2: Animation
- [ ] Implement CSS animations for name reveal
- [ ] Add subtitle animation
- [ ] Create fade-out transition to main content
- [ ] Test animation timing

### Phase 3: Interactivity
- [ ] Add skip button functionality
- [ ] Implement keyboard shortcuts
- [ ] Add localStorage persistence
- [ ] Test user flow

### Phase 4: Polish
- [ ] Add glassmorphism effects
- [ ] Fine-tune timing and easing
- [ ] Ensure accessibility compliance
- [ ] Cross-browser testing
- [ ] Mobile optimization

---

## Testing Checklist

- [ ] Animation plays smoothly on first visit
- [ ] Skip button appears and works correctly
- [ ] Keyboard shortcuts function properly
- [ ] localStorage persists preference
- [ ] Respects `prefers-reduced-motion`
- [ ] Works on mobile devices (iOS, Android)
- [ ] Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] No layout shift or flicker
- [ ] Performance impact is minimal

---

## Performance Considerations

### Optimization Strategies
1. **Preload critical assets** - Font files, logo image
2. **Use CSS animations** over JavaScript when possible
3. **GPU acceleration** - Use `transform` and `opacity`
4. **Minimize repaints** - Avoid animating layout properties
5. **Code splitting** - Lazy load if using animation library

### Performance Budget
- Opening screen code: <10KB (HTML + CSS + JS)
- Additional library (if used): <50KB
- Total animation duration: 1.5-2.5s
- First paint delay: 0ms (show immediately)

---

## Alternative Approaches

### 1. Progressive Loading (No Full Screen)
Instead of full-screen splash, use progressive content loading:
- Hero section fades in first
- Subsequent sections animate in on scroll
- No blocking intro screen

### 2. Minimal Loader
- Small loading spinner (center screen)
- Transitions to content immediately when ready
- Most minimal approach

### 3. Logo Morph
- Start with simple logo
- Morphs into full navigation
- Creative but complex

---

## Dependencies

### Required
- None (can be done with vanilla CSS/JS)

### Optional
- **GSAP**: For advanced timeline control
- **Lottie**: For JSON-based animations
- **SplitType**: For advanced text animations

---

## Files to Modify

```
index.html                    # Add opening screen markup
css/styles.css                # Add animation styles
js/opening-animation.js       # New file for opening logic (optional)
```

---

## Success Metrics

- Animation completion rate: >85%
- Skip rate: <30%
- Performance impact: <100ms delay to First Contentful Paint
- User feedback: Positive reception
- Accessibility: Zero violations

---

## Future Enhancements

- [ ] Multiple intro variations (randomized)
- [ ] Seasonal themes (holidays, etc.)
- [ ] Custom intro for returning visitors
- [ ] Sound effects (optional, with user permission)
- [ ] WebGL effects for premium feel

---

## Related TODOs

- **TODO #3:** Advanced Animation Library Integration (if using GSAP)
- **TODO #9:** Performance Optimization (asset preloading)
- **TODO #13:** Microinteractions (consistent animation style)

---

**Status:** Ready for implementation
**Dependencies:** None
**Blocking:** None
**Estimated Completion:** 2 days after start
