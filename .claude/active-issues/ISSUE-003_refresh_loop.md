# ISSUE-003: Webpage Refreshing Every Second (Looping Bug)

**ID:** ISSUE-003
**Priority:** 🔴 **CRITICAL**
**Status:** 🔍 Not Started
**Component:** Application Logic
**Reported:** 2025-11-20
**Assigned:** Pending

---

## 📋 Issue Summary

**Problem:** The webpage is refreshing every single second, making the site completely unusable.

**Impact:**
- Site cannot be used or tested
- Blocks all other development work
- Prevents users from viewing portfolio
- May cause browser performance issues
- Could lead to infinite network requests

**User Experience:**
- Page flickers constantly
- Unable to interact with any elements
- Forms cannot be filled
- Links cannot be clicked
- Scrolling is impossible

---

## 🔍 Investigation Plan

### Step 1: Identify Refresh Trigger
Check common causes of page refresh loops:

1. **Service Worker Issues**
   - Check if `sw.js` is causing forced reloads
   - Inspect service worker registration in DevTools
   - Look for update loops in cache strategy

2. **JavaScript Logic Errors**
   - Check for `location.reload()` or `window.location.href = window.location.href`
   - Look for recursive function calls
   - Inspect event listeners that might trigger reloads
   - Check for infinite update loops in state management

3. **Browser Storage Issues**
   - Check localStorage/sessionStorage read/write loops
   - Inspect theme toggle logic for infinite state changes
   - Look for preference detection loops

4. **Meta Refresh Tags**
   - Check HTML `<meta>` tags for auto-refresh
   - Inspect any dynamically injected meta tags

5. **Hot Reload / Development Tools**
   - Check if any dev server is running in background
   - Look for file watchers triggering reloads
   - Inspect build tools or live reload scripts

### Step 2: Browser DevTools Analysis

**Console Tab:**
- [ ] Check for JavaScript errors before refresh
- [ ] Look for error messages indicating cause
- [ ] Enable "Preserve log" to keep console across refreshes

**Network Tab:**
- [ ] Enable "Preserve log"
- [ ] Check what resources are being requested
- [ ] Look for failed requests that might trigger retries
- [ ] Inspect service worker fetch events

**Application Tab:**
- [ ] Check Service Workers status
- [ ] Inspect localStorage/sessionStorage values
- [ ] Look for cache entries
- [ ] Check for IndexedDB data

**Sources Tab:**
- [ ] Add breakpoints in suspected code
- [ ] Use "Event Listener Breakpoints" → Load → beforeunload/unload
- [ ] Step through code execution before refresh

---

## 🎯 Likely Culprits

### Primary Suspects (Based on Architecture)

1. **Service Worker (`/sw.js`)**
   ```javascript
   // Possible problematic patterns:

   // Pattern 1: Aggressive update checking
   self.addEventListener('install', (event) => {
     self.skipWaiting(); // ⚠️ Might cause immediate reload
   });

   // Pattern 2: Infinite fetch loop
   self.addEventListener('fetch', (event) => {
     event.respondWith(fetch(event.request)); // ⚠️ Could create loop
   });

   // Pattern 3: Update notification causing reload
   self.addEventListener('message', (event) => {
     if (event.data === 'skipWaiting') {
       self.skipWaiting();
       clients.claim(); // ⚠️ Might trigger reload
     }
   });
   ```

2. **PWA Install Prompt (`/js/modules/pwaInstall.js` or inline)**
   ```javascript
   // Possible problematic patterns:

   // Pattern 1: Reload on dismiss
   window.addEventListener('beforeinstallprompt', (e) => {
     e.preventDefault();
     // ... show prompt ...
     window.location.reload(); // ⚠️ Don't reload here!
   });

   // Pattern 2: Infinite detection loop
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js').then(() => {
       window.location.reload(); // ⚠️ Creates infinite loop!
     });
   }
   ```

3. **Theme Toggle (`/js/modules/themeManager.js`)**
   ```javascript
   // Possible problematic patterns:

   // Pattern 1: Reload on theme change
   function toggleTheme() {
     localStorage.setItem('theme', newTheme);
     window.location.reload(); // ⚠️ Unnecessary reload
   }

   // Pattern 2: Infinite preference detection
   const savedTheme = localStorage.getItem('theme');
   if (!savedTheme) {
     localStorage.setItem('theme', 'dark');
     window.location.reload(); // ⚠️ Creates loop on first visit
   }
   ```

4. **Opening Screen Animation (`/js/modules/openingScreen.js`)**
   ```javascript
   // Possible problematic patterns:

   // Pattern 1: Reload after animation
   function completeAnimation() {
     localStorage.setItem('hasSeenOpening', 'true');
     window.location.reload(); // ⚠️ Wrong approach
   }

   // Pattern 2: localStorage check causing loop
   if (!localStorage.getItem('hasSeenOpening')) {
     showOpening();
     localStorage.setItem('hasSeenOpening', 'true');
     location.reload(); // ⚠️ Infinite loop!
   }
   ```

---

## 🛠️ Debugging Steps

### Quick Diagnostic Commands

Run these in browser console to identify issue:

```javascript
// 1. Check for reload calls in code
console.log('Checking for reload calls...');
window.location.reload = function() {
  console.trace('reload() called!');
  debugger; // Pause execution
};

// 2. Monitor localStorage changes
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log(`localStorage.setItem('${key}', '${value}')`);
  console.trace();
  return originalSetItem.apply(this, arguments);
};

// 3. Check service worker state
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Service Workers:', regs);
  regs.forEach(reg => console.log('State:', reg.active?.state));
});

// 4. Monitor fetch requests
let fetchCount = 0;
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log(`Fetch #${++fetchCount}:`, args[0]);
  return originalFetch.apply(this, arguments);
};
```

### Temporary Workarounds (For Testing)

```javascript
// Option 1: Disable service worker
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
  console.log('Service workers unregistered');
});

// Option 2: Clear all storage
localStorage.clear();
sessionStorage.clear();
console.log('Storage cleared');

// Option 3: Disable specific module
// In index.html, comment out suspected script:
// <script type="module" src="/js/app.js"></script>
```

---

## ✅ Fix Implementation

### Once Root Cause Identified:

1. **Document the cause** in this file
2. **Create isolated test case** to verify fix
3. **Implement fix** in appropriate file
4. **Test thoroughly**:
   - Hard refresh (Ctrl+Shift+R)
   - Clear cache and test
   - Test in incognito mode
   - Test in different browsers
5. **Verify no side effects**
6. **Update MASTER_TRACKER.md** status

### Common Fixes:

**Fix 1: Remove unnecessary reload calls**
```javascript
// ❌ BEFORE
function savePreference() {
  localStorage.setItem('pref', value);
  window.location.reload(); // Don't do this!
}

// ✅ AFTER
function savePreference() {
  localStorage.setItem('pref', value);
  applyPreference(value); // Apply dynamically
}
```

**Fix 2: Fix service worker update loop**
```javascript
// ❌ BEFORE
self.addEventListener('install', () => {
  self.skipWaiting();
  clients.claim();
  // This causes immediate reload!
});

// ✅ AFTER
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
  );
  // Let browser decide when to activate
});
```

**Fix 3: Proper one-time localStorage check**
```javascript
// ❌ BEFORE
if (!localStorage.getItem('init')) {
  localStorage.setItem('init', 'true');
  location.reload(); // Creates infinite loop!
}

// ✅ AFTER
if (!localStorage.getItem('init')) {
  localStorage.setItem('init', 'true');
  // Just initialize, no reload needed
  initializeFeatures();
}
```

---

## 📊 Testing Checklist

After implementing fix:

- [ ] Page loads without refresh loop
- [ ] No console errors related to refresh
- [ ] Service worker activates correctly
- [ ] Theme toggle works without reload (if applicable)
- [ ] Opening animation works without reload (if applicable)
- [ ] localStorage operations don't trigger reloads
- [ ] PWA features function correctly
- [ ] Hard refresh still works properly
- [ ] Works in incognito/private mode
- [ ] Works across Chrome, Firefox, Safari
- [ ] Mobile browsers work correctly
- [ ] No performance degradation
- [ ] Network tab shows normal request pattern

---

## 📝 Files to Check

Based on the modular architecture documented in CLAUDE.md:

**High Priority:**
- `/sw.js` - Service worker (most likely culprit)
- `/js/app.js` - Main orchestrator
- `/js/modules/openingScreen.js` - Splash screen with localStorage
- `/js/modules/themeManager.js` - Theme toggle with localStorage
- `/index.html` - Check for meta refresh tags or inline scripts

**Medium Priority:**
- `/js/modules/animations.js` - GSAP initialization
- `/js/modules/particles.js` - Particle.js initialization
- `/manifest.json` - PWA configuration
- Any inline `<script>` tags in HTML

**Lower Priority:**
- `/js/modules/accordion.js`
- `/js/modules/projectFilter.js`
- `/js/modules/contactForm.js`
- `/js/data/projects.js`

---

## 🎯 Success Criteria

Issue resolved when:
- ✅ Page loads once and stays loaded
- ✅ No automatic refreshes occur
- ✅ User can interact with all elements
- ✅ Browser console shows no errors
- ✅ Service worker (if present) functions correctly
- ✅ All features work as intended
- ✅ Performance metrics maintained

---

## 📚 Related Issues

- **ISSUE-001** - Blocked by this issue
- **ISSUE-002** - Blocked by this issue
- **ISSUE-004** - Blocked by this issue
- **ISSUE-005** - May be related (theme toggle could be causing loop)

---

## 📝 Investigation Log

_Update this section as investigation progresses_

### 2025-11-20 - Issue Created
- Issue reported by user
- Marked as CRITICAL priority
- Investigation plan created
- Awaiting assignment

---

**Next Action:** Run browser DevTools diagnostics to identify refresh trigger
**Estimated Fix Time:** 2-4 hours (once root cause identified)
**Dependencies:** None - this blocks all other work
