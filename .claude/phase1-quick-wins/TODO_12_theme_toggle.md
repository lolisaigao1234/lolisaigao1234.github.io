# TODO #12: Dark/Light Mode Toggle

**Priority:** MEDIUM
**Difficulty:** Low
**Estimated Time:** 1 day
**Status:** 📋 Planned

---

## Overview

Implement a theme toggle system allowing users to switch between dark and light modes. The current design uses a dark theme; this enhancement adds flexibility and user preference support.

---

## Goals

- Smooth theme transitions
- Persist user preference (localStorage)
- Respect system preferences (`prefers-color-scheme`)
- Accessible toggle button
- Maintain glassmorphism aesthetic in both themes

---

## Design Considerations

### Dark Theme (Current)
```css
--bg-gradient: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
--text-primary: rgba(255, 255, 255, 0.95);
--text-secondary: rgba(255, 255, 255, 0.7);
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
```

### Light Theme (Proposed)
```css
--bg-gradient: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
--text-primary: rgba(0, 0, 0, 0.95);
--text-secondary: rgba(0, 0, 0, 0.7);
--glass-bg: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.3);
--accent-blue: #0066CC; /* Darker for better contrast */
```

---

## Implementation Approach

### 1. **CSS Variables Strategy**

#### Root Variables
```css
:root {
  /* Default: Dark Theme */
  --bg-gradient-start: #0a0a0a;
  --bg-gradient-mid: #1a1a2e;
  --bg-gradient-end: #0a0a0a;

  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);

  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: rgba(0, 0, 0, 0.1);

  --accent-blue: #007AFF;
  --accent-purple: #AF52DE;
  --accent-pink: #FF2D55;

  --radial-gradient-1: rgba(0, 122, 255, 0.15);
  --radial-gradient-2: rgba(175, 82, 222, 0.15);
  --radial-gradient-3: rgba(255, 45, 85, 0.1);
}

[data-theme="light"] {
  /* Light Theme Overrides */
  --bg-gradient-start: #f5f7fa;
  --bg-gradient-mid: #e4e9f2;
  --bg-gradient-end: #f5f7fa;

  --text-primary: rgba(0, 0, 0, 0.9);
  --text-secondary: rgba(0, 0, 0, 0.7);
  --text-tertiary: rgba(0, 0, 0, 0.5);

  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-shadow: rgba(0, 0, 0, 0.05);

  --accent-blue: #0066CC;
  --accent-purple: #8844BB;
  --accent-pink: #CC2244;

  --radial-gradient-1: rgba(0, 102, 204, 0.1);
  --radial-gradient-2: rgba(136, 68, 187, 0.1);
  --radial-gradient-3: rgba(204, 34, 68, 0.08);
}

/* Apply gradients */
body {
  background: linear-gradient(
    135deg,
    var(--bg-gradient-start) 0%,
    var(--bg-gradient-mid) 50%,
    var(--bg-gradient-end) 100%
  );
}

body::before {
  background:
    radial-gradient(circle at 20% 30%, var(--radial-gradient-1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, var(--radial-gradient-2) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, var(--radial-gradient-3) 0%, transparent 50%);
}
```

---

### 2. **Theme Toggle Button**

#### HTML
```html
<nav class="glass">
  <ul>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
    <li>
      <button
        id="theme-toggle"
        class="theme-toggle"
        aria-label="Toggle theme"
        title="Toggle dark/light mode"
      >
        <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="5" fill="currentColor"/>
          <line x1="10" y1="2" x2="10" y2="4" stroke="currentColor" stroke-width="2"/>
          <line x1="10" y1="16" x2="10" y2="18" stroke="currentColor" stroke-width="2"/>
          <!-- More sun rays -->
        </svg>
        <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
        </svg>
      </button>
    </li>
  </ul>
</nav>
```

#### CSS
```css
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.theme-toggle:hover svg {
  color: var(--text-primary);
}

/* Hide moon icon by default (dark theme) */
.moon-icon {
  display: none;
}

.sun-icon {
  display: block;
}

/* Show moon icon in light theme */
[data-theme="light"] .moon-icon {
  display: block;
}

[data-theme="light"] .sun-icon {
  display: none;
}
```

---

### 3. **JavaScript Logic**

```javascript
// Theme Manager
const ThemeManager = {
  STORAGE_KEY: 'rocky-portfolio-theme',
  THEME_ATTRIBUTE: 'data-theme',

  init() {
    this.toggleButton = document.getElementById('theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

    this.applyTheme(this.currentTheme, false);
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Toggle button click
    this.toggleButton?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme, true);
  },

  applyTheme(theme, animate = false) {
    this.currentTheme = theme;

    // Apply theme attribute
    if (theme === 'light') {
      document.documentElement.setAttribute(this.THEME_ATTRIBUTE, 'light');
    } else {
      document.documentElement.removeAttribute(this.THEME_ATTRIBUTE);
    }

    // Save preference
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Animate transition (optional)
    if (animate) {
      this.animateThemeTransition();
    }

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  animateThemeTransition() {
    // Add transition class
    document.documentElement.classList.add('theme-transitioning');

    // Remove after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  },

  getStoredTheme() {
    return localStorage.getItem(this.STORAGE_KEY);
  },

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});
```

---

### 4. **Smooth Transition**

```css
/* Add smooth transitions to color changes */
html.theme-transitioning,
html.theme-transitioning *,
html.theme-transitioning *::before,
html.theme-transitioning *::after {
  transition: background-color 0.3s ease,
              border-color 0.3s ease,
              color 0.3s ease !important;
  transition-delay: 0 !important;
}
```

---

## Advanced Features

### 1. **System Preference Detection**
```javascript
// Auto-detect system preference on first visit
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');

if (!storedTheme) {
  applyTheme(systemPrefersDark ? 'dark' : 'light');
}
```

### 2. **Multiple Theme Options** (Future)
```html
<select id="theme-selector">
  <option value="auto">Auto (System)</option>
  <option value="dark">Dark</option>
  <option value="light">Light</option>
  <option value="blue">Blue</option>
  <option value="purple">Purple</option>
</select>
```

### 3. **Keyboard Shortcut**
```javascript
// Ctrl/Cmd + Shift + D to toggle theme
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
    e.preventDefault();
    ThemeManager.toggleTheme();
  }
});
```

---

## Testing Checklist

- [ ] Theme persists across page reloads
- [ ] System preference is respected (if no stored preference)
- [ ] Toggle button updates icon correctly
- [ ] Smooth transition between themes
- [ ] All text remains readable in both themes
- [ ] Glassmorphism effect works in both themes
- [ ] Accent colors have sufficient contrast
- [ ] No flash of wrong theme on page load
- [ ] Works in all browsers
- [ ] Keyboard accessible (Tab to button, Enter to toggle)

---

## Accessibility Considerations

### ARIA Attributes
```html
<button
  id="theme-toggle"
  class="theme-toggle"
  aria-label="Toggle theme"
  aria-pressed="false"
>
  <!-- Icons -->
</button>
```

```javascript
// Update aria-pressed
function updateAriaPressed(theme) {
  const button = document.getElementById('theme-toggle');
  button.setAttribute('aria-pressed', theme === 'light');
}
```

### Focus Styles
```css
.theme-toggle:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
```

---

## Performance Considerations

### Prevent Flash of Unstyled Content (FOUC)
```html
<head>
  <script>
    // Run BEFORE page renders
    (function() {
      const theme = localStorage.getItem('rocky-portfolio-theme');
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
</head>
```

---

## Files to Modify/Create

```
index.html                # Add theme toggle button, inline script
css/styles.css            # Add light theme variables
js/theme-manager.js       # Theme logic (new file, or inline)
```

---

## Success Metrics

- Theme toggle works smoothly
- User preference persists
- No performance impact
- Passes accessibility audit
- Positive user feedback

---

## Future Enhancements

- [ ] Custom theme color picker
- [ ] Time-based auto-switching (dark at night)
- [ ] Multiple preset themes
- [ ] Transition animations with GSAP
- [ ] Theme preview before applying

---

## Related TODOs

- **TODO #2:** Background Effects (update particle colors for light mode)
- **TODO #20:** Accessibility (ensure contrast ratios)

---

**Status:** Ready for implementation
**Dependencies:** None
**Blocking:** None
**Estimated Completion:** 1 day
