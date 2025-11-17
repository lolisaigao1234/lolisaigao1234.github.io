# TODO #8: State Management System

**Priority:** LOW | **Difficulty:** Medium | **Time:** 2-3 days | **Status:** 📋 Planned

## Overview
Implement centralized state management for handling theme, user preferences, and application data.

## Use Cases
- Theme preference (dark/light)
- Accordion open/close states
- Active section tracking
- User preferences (reduced motion, etc.)
- Project filter states (if implemented)

## Implementation Options

### Option 1: Vue + Pinia (Recommended if using Vue)
```javascript
// stores/app.js
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'dark',
    activeAccordion: null,
    preferences: {
      reducedMotion: false
    }
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }
  }
});
```

### Option 2: Vanilla JS State Manager
```javascript
const StateManager = {
  state: {
    theme: 'dark',
    activeAccordion: null
  },
  listeners: [],
  setState(updates) {
    Object.assign(this.state, updates);
    this.notify();
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  notify() {
    this.listeners.forEach(cb => cb(this.state));
  }
};
```

**Dependencies:** TODO #6 (Vue Migration) for Pinia, or standalone vanilla JS
