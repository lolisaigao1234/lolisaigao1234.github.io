# Webpage Fix Roadmap

**Repository:** lolisaigao1234.github.io
**Branch:** `claude/debug-webpage-issues-01Lb1HxszQBfv25aVM372uZw`
**Date:** 2025-11-18
**Author:** Claude Code

## Executive Summary

This roadmap addresses three critical bugs identified on the personal portfolio webpage:

1. **Animation Stutter:** Clunky intro animation causing constant stuttering on Google Chrome
2. **Layout Break:** Complete UI/structural layout breakdown on page load
3. **Constant Refresh:** Continuous page refresh preventing normal usage

Each phase includes granular debugging steps with immediate verification tests to isolate and resolve the root causes.

---

## Phase 1: Animation Stutter Debugging

### Overview
The stuttering is likely caused by overlapping animations, GPU contention between particles.js and GSAP, layout thrashing from accordion animations, or excessive event listener overhead.

### Investigation & Fix Tasks

| TODO Step | Test TODO | Notes |
|-----------|-----------|-------|
| **1.1** Disable particles.js by commenting out `ParticlesManager.init()` in `js/app.js` | **T1.1** Reload page in Chrome, observe if stuttering persists without particles | Isolates particle rendering as culprit |
| **1.2** Temporarily disable opening screen animation by setting `ANIMATION_DURATION: 0` in `openingScreen.js` | **T1.2** Test page load with instant opening screen hide, check for stutter | Verifies opening animation overlap |
| **1.3** Comment out all GSAP microinteractions (lines 124-242 in `animations.js`) | **T1.3** Reload and test scrolling/navigation without microinteractions | Checks if event listener overhead causes jank |
| **1.4** Replace accordion GSAP animation `height: 'auto'` (lines 218-224) with fixed max-height transition | **T1.4** Click accordion items, verify smooth expansion without layout reflow | Layout thrashing from height calculation |
| **1.5** Add `will-change: transform, opacity` to `.hero-title`, `.hero-subtitle`, `.btn` CSS | **T1.5** Check Chrome DevTools Performance tab for layer promotion | GPU acceleration optimization |
| **1.6** Defer GSAP scroll animations to `requestIdleCallback` instead of immediate `init()` | **T1.6** Test page load performance, verify animations still work on scroll | Reduces main thread blocking |
| **1.7** Reduce particle count from 60 to 30 in `particles.js` config | **T1.7** Reload page, check if stuttering reduced with fewer particles | Performance vs. visual trade-off |
| **1.8** Add `passive: true` to all scroll event listeners if any exist | **T1.8** Verify scroll performance in Chrome DevTools Performance monitor | Prevents scroll blocking |
| **1.9** Check for duplicate event listeners on accordion (inline `onclick` + module binding) | **T1.9** Inspect accordion header in DevTools, verify single click handler | Double-binding causes duplicate animations |
| **1.10** Profile with Chrome DevTools Performance tab during animation stutter | **T1.10** Identify long tasks (>50ms), scripting vs rendering time | Data-driven root cause identification |
| **1.11** Add `transform: translateZ(0)` to `.opening-screen`, `.hero`, `nav` for GPU layer | **T1.11** Check Layers panel in DevTools, verify compositing layers created | Forces GPU acceleration |
| **1.12** Implement GSAP's `fastMode` by reducing duration and easing complexity | **T1.12** Test all animations for smoothness, verify no visual regression | Simplifies animation calculations |

---

## Phase 2: Layout Break Debugging

### Overview
Complete layout breakdown suggests CSS not loading, JavaScript errors preventing initialization, or service worker serving corrupted cache. Systematic isolation required.

### Investigation & Fix Tasks

| TODO Step | Test TODO | Notes |
|-----------|-----------|-------|
| **2.1** Open Chrome DevTools Console, check for JavaScript errors on page load | **T2.1** Document all errors, note line numbers and stack traces | Errors prevent module initialization |
| **2.2** Verify `css/styles.css` loads successfully in Network tab (200 status, not 304/cached) | **T2.2** Check Response preview shows actual CSS content, not empty/error | Service worker cache issue |
| **2.3** Disable service worker via DevTools Application → Service Workers → Unregister | **T2.3** Hard refresh (Ctrl+Shift+R), check if layout renders correctly | Isolates SW cache corruption |
| **2.4** Check if theme CSS variables are defined before first paint | **T2.4** Inspect `<html>` element, verify `data-theme` attribute and `--accent-blue` etc. exist | Theme initialization timing |
| **2.5** Verify GSAP CDN scripts load before `animations.js` executes | **T2.5** Add `console.log(typeof gsap)` in animations.js line 9, should log 'object' not 'undefined' | Script loading order issue |
| **2.6** Check if opening screen `display: none` conflicts with layout | **T2.6** Temporarily remove opening screen div, verify layout renders | Opening screen overlay issue |
| **2.7** Inspect `#particles-js` z-index and positioning | **T2.7** Set particles container `display: none`, check if content becomes visible | Particles overlaying content |
| **2.8** Verify all ES6 module imports resolve without 404 errors | **T2.8** Check Network tab for failed module loads (projectFilter.js, accordion.js, etc.) | Module path resolution |
| **2.9** Test if inline theme script (lines 89-98 in index.html) causes render-blocking | **T2.9** Comment out inline script, reload, check if layout appears | Theme flash vs. layout break trade-off |
| **2.10** Clear all localStorage and sessionStorage | **T2.10** Reload page, verify layout renders with fresh state | Corrupted localStorage breaking initialization |
| **2.11** Check if accordion module conflicts with inline `onclick="toggleAccordion(this)"` | **T2.11** Remove all inline onclick attributes, test accordion functionality | Duplicate binding breaking layout |
| **2.12** Verify viewport meta tag is correct (line 6 in index.html) | **T2.12** Check mobile responsiveness, verify layout scales correctly | Meta tag parsing issue |
| **2.13** Test in Chrome Incognito mode (no extensions, no cache) | **T2.13** Compare layout in Incognito vs normal mode | Browser extension interference |
| **2.14** Validate HTML with W3C Validator (https://validator.w3.org/) | **T2.14** Fix any critical HTML structure errors (unclosed tags, nesting issues) | Malformed HTML causing parser errors |
| **2.15** Check CSS for syntax errors (missing semicolons, unclosed braces) | **T2.15** Run CSS through linter, verify no parse errors | CSS syntax breaking stylesheet |

---

## Phase 3: Constant Refresh Debugging

### Overview
Continuous refresh indicates service worker update loop, JavaScript-triggered reload, or PWA update notification auto-refresh. Critical to identify reload trigger.

### Investigation & Fix Tasks

| TODO Step | Test TODO | Notes |
|-----------|-----------|-------|
| **3.1** Add `console.log('[Refresh Check] Page loaded')` at top of `app.js` | **T3.1** Check console for repeated log entries, count refresh rate | Confirms refresh happening |
| **3.2** Disable service worker registration by commenting out `PWAInstall.init()` in `app.js` | **T3.2** Reload page, verify if refresh stops | Service worker causing reload loop |
| **3.3** Check service worker console for repeated install/activate events | **T3.3** Open DevTools Application → Service Workers, monitor event log | SW update loop detection |
| **3.4** Remove `self.skipWaiting()` (line 36) and `self.clients.claim()` (line 53) from `sw.js` | **T3.4** Reload, verify service worker doesn't force immediate activation | Aggressive SW update strategy |
| **3.5** Check if PWA update notification triggers automatic reload | **T3.5** Search for `window.location.reload()` in `pwaInstall.js`, comment out line 128 | Auto-reload on update detection |
| **3.6** Verify no meta refresh tag in HTML head | **T3.6** Grep `<meta.*refresh` in index.html, should return no results | HTML meta refresh |
| **3.7** Check if opening screen localStorage logic causes redirect | **T3.7** Clear `rocky-portfolio-seen-intro` from localStorage, test with and without | Opening screen refresh loop |
| **3.8** Look for `location.reload()` or `location.href` assignments in all JS files | **T3.8** Grep for reload/redirect calls, verify none execute unconditionally | JavaScript redirect |
| **3.9** Check if theme toggle causes page refresh | **T3.9** Click theme toggle button, verify it doesn't reload page | Theme change reload |
| **3.10** Inspect service worker cache version change | **T3.10** Check if `CACHE_NAME` in sw.js was recently changed, triggering cache flush | Cache version mismatch |
| **3.11** Monitor Network tab for repeated document requests | **T3.11** Check Preserve Log in Network tab, count how many index.html requests occur | Request pattern analysis |
| **3.12** Check if form submission triggers page reload | **T3.12** Submit contact form, verify preventDefault is working | Form submission redirect |
| **3.13** Look for browser history manipulation (pushState, replaceState) | **T3.13** Search for `history.pushState`, verify no navigation loops | History API misuse |
| **3.14** Check if error boundaries cause reload on error | **T3.14** Force a JavaScript error, verify page doesn't auto-reload | Error handling reload |
| **3.15** Disable PWA update notification entirely by commenting out `showUpdateNotification()` | **T3.15** Force SW update, verify no reload prompt appears | Update notification loop |

---

## Testing Matrix

### Browser Testing Checklist
After each phase, verify fixes across:
- [ ] Chrome (latest stable)
- [ ] Chrome Incognito mode
- [ ] Firefox (for comparison)
- [ ] Mobile Chrome (responsive mode)

### Performance Benchmarks
Target metrics after fixes:
- [ ] Lighthouse Performance Score > 90
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Blocking Time (TBT) < 300ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Functional Testing
- [ ] Opening animation plays smoothly (if enabled)
- [ ] Page layout renders correctly on first load
- [ ] Page does not auto-refresh
- [ ] Accordions expand/collapse smoothly
- [ ] Theme toggle works without reload
- [ ] Projects filter without stutter
- [ ] Contact form submits without refresh
- [ ] Service worker caches properly
- [ ] PWA install prompt appears (if applicable)

---

## Debugging Tools & Commands

### Chrome DevTools Shortcuts
```
F12                    - Open DevTools
Ctrl+Shift+C           - Inspect element
Ctrl+Shift+P           - Command palette
Ctrl+Shift+R           - Hard refresh (bypass cache)
Ctrl+Shift+Delete      - Clear browsing data
```

### Console Debugging Snippets
```javascript
// Check GSAP loaded
console.log('GSAP loaded:', typeof gsap !== 'undefined');

// Monitor refresh rate
let loadCount = 0;
console.log('Load count:', ++loadCount);

// Service Worker status
navigator.serviceWorker.getRegistrations().then(regs => console.log('SW Registrations:', regs));

// Check localStorage
console.log('LocalStorage:', { ...localStorage });

// Performance timing
console.log('Page load time:', performance.timing.loadEventEnd - performance.timing.navigationStart);
```

### Git Commands for Testing
```bash
# Create fresh testing branch
git checkout -b test/debug-animation-stutter

# Stash changes for quick rollback
git stash save "Testing animation fix"

# Revert specific file
git checkout HEAD -- js/modules/animations.js

# Compare with previous commit
git diff HEAD~1 js/app.js
```

---

## Root Cause Hypotheses (Prioritized)

### Animation Stutter (Most Likely → Least Likely)
1. **Particle.js + GSAP GPU contention** - Both libraries competing for GPU resources
2. **Accordion `height: auto` layout thrashing** - Forces synchronous reflow on every frame
3. **Duplicate event listeners** - Inline onclick + module binding causing double animations
4. **Service worker cache operations** - Cache reads blocking main thread during animations
5. **Missing GPU acceleration** - Critical elements not promoted to compositor layers

### Layout Break (Most Likely → Least Likely)
1. **Service worker serving stale/corrupted CSS** - Cache mismatch after deployment
2. **JavaScript error preventing initialization** - Module import failure breaking app.js
3. **Theme CSS variables not initialized** - Race condition between inline script and CSS
4. **GSAP not loaded when animations.js executes** - CDN load timing issue
5. **Accordion inline onclick conflict** - Duplicate binding breaking accordion initialization

### Constant Refresh (Most Likely → Least Likely)
1. **Service worker update loop** - `skipWaiting()` + `clients.claim()` causing immediate activation
2. **PWA update notification auto-reload** - Line 128 in pwaInstall.js reloading on update
3. **Opening screen localStorage infinite loop** - Corrupted localStorage causing repeated checks
4. **Service worker cache version change** - New CACHE_NAME triggering continuous cache flush
5. **Form submission causing reload** - Missing preventDefault on contact form

---

## Success Criteria

### Phase 1 (Animation Stutter)
- ✅ Opening animation plays smoothly at 60fps in Chrome
- ✅ No dropped frames during hero section entrance
- ✅ Accordion expand/collapse is butter-smooth
- ✅ Chrome DevTools Performance shows no long tasks >50ms during animations
- ✅ GPU usage stable, no thrashing between layers

### Phase 2 (Layout Break)
- ✅ Page renders correctly on first load (no missing styles)
- ✅ All sections visible and properly positioned
- ✅ Theme CSS variables applied correctly
- ✅ No JavaScript errors in console
- ✅ Service worker cache serves correct assets

### Phase 3 (Constant Refresh)
- ✅ Page loads once and stays stable
- ✅ No automatic reloads occur
- ✅ Service worker updates gracefully without forced reload
- ✅ PWA update notification appears but doesn't auto-reload
- ✅ Navigation works without triggering refresh

---

## Rollback Plan

If any fix causes regression:

1. **Immediate Rollback**
   ```bash
   git stash
   git checkout .
   ```

2. **Selective Rollback**
   ```bash
   git checkout HEAD -- path/to/broken/file.js
   ```

3. **Communication**
   - Document what was attempted
   - Note unexpected side effects
   - Preserve debugging insights for alternative approach

---

## Notes for Implementation

⚠️ **CRITICAL WARNINGS:**
- Do NOT implement all fixes simultaneously - test each change individually
- Always verify in Chrome DevTools before moving to next TODO
- Keep backup of working state before each phase
- If a test fails, rollback that specific change before proceeding
- Service worker changes require hard refresh (Ctrl+Shift+R) to test
- LocalStorage clearing may reset user preferences (theme, seen-intro)

📝 **BEST PRACTICES:**
- Use Chrome DevTools Performance profiler to validate improvements
- Test on actual mobile device, not just responsive mode
- Check Network throttling (Fast 3G) for real-world performance
- Verify accessibility (reduced motion) still works after fixes
- Maintain git commits for each successful fix for easy rollback

🎯 **EXPECTED OUTCOMES:**
- **Animation Stutter:** Reduce from constant jank to smooth 60fps
- **Layout Break:** Fix from broken layout to pixel-perfect render
- **Constant Refresh:** Eliminate refresh loop entirely

---

## Appendix: File Reference

### Critical Files for Debugging
- **index.html** - Lines 89-98 (theme init), 108-118 (opening screen), 834 (module script)
- **js/app.js** - Main initialization order
- **js/modules/animations.js** - Lines 124-242 (microinteractions), 218-224 (accordion GSAP)
- **js/modules/openingScreen.js** - Line 8 (ANIMATION_DURATION), lines 14-23 (localStorage check)
- **js/modules/pwaInstall.js** - Lines 21-29 (update detection), line 128 (auto-reload)
- **js/modules/accordion.js** - Lines 9-13 (event binding), line 39 (legacy function)
- **sw.js** - Line 36 (skipWaiting), line 53 (clients.claim), line 6 (CACHE_NAME)
- **css/styles.css** - Animation definitions, GPU acceleration properties

### Service Worker Cache Assets
Located in sw.js lines 10-24:
- Root HTML files
- CSS/JS modules
- Manifest.json

---

**Document Version:** 1.0
**Last Updated:** 2025-11-18
**Status:** Ready for Implementation
**Estimated Total Time:** 6-8 hours (across all 3 phases)
