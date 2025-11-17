# TODO #6: Vue.js Framework Migration

**Priority:** MEDIUM
**Difficulty:** High
**Estimated Time:** 1-2 weeks
**Status:** 📋 Planned

---

## Overview

Migrate the portfolio website from vanilla HTML/CSS/JS to Vue 3 using the Composition API. This will improve code organization, maintainability, and enable advanced features like routing, state management, and component reusability.

---

## Why Vue.js?

### Advantages
- ✅ **Component-based architecture** - Reusable, maintainable code
- ✅ **Reactive data binding** - Automatic UI updates
- ✅ **Single File Components** - HTML/CSS/JS in one file
- ✅ **Composition API** - Better TypeScript support, code organization
- ✅ **Vite integration** - Fast dev server, optimized builds
- ✅ **Progressive enhancement** - Can migrate incrementally
- ✅ **Excellent documentation** - Easy to learn
- ✅ **Smaller bundle** than React (~30KB runtime)

### Considerations
- ⚠️ **Significant refactor** - Entire codebase restructure
- ⚠️ **Learning curve** - Team needs Vue knowledge
- ⚠️ **Build process** - Requires Node.js setup
- ⚠️ **SEO considerations** - Need SSR/SSG for optimal SEO
- ⚠️ **GitHub Pages** - May need build step configuration

---

## Migration Strategy

### Option 1: Full Rewrite (Recommended)
**Pros:** Clean slate, best practices from start
**Cons:** More time, higher risk
**Timeline:** 1-2 weeks

### Option 2: Incremental Migration
**Pros:** Lower risk, can be done in phases
**Cons:** Temporary complexity, two systems
**Timeline:** 2-3 weeks

### Recommended Approach: Full Rewrite
Given the small size of the current site, a full rewrite is cleaner and faster.

---

## Project Setup

### 1. Create Vue 3 + Vite Project
```bash
npm create vite@latest rocky-portfolio -- --template vue
cd rocky-portfolio
npm install
```

### 2. Install Dependencies
```bash
# Router (if adding multiple pages)
npm install vue-router@4

# State management (if needed)
npm install pinia

# GSAP for animations
npm install gsap

# SCSS support
npm install -D sass

# Additional utilities
npm install @vueuse/core  # Useful composables
```

### 3. Project Structure
```
rocky-portfolio/
├── public/
│   ├── favicon.ico
│   └── music/                 # Static assets
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.scss
│   │   │   ├── variables.scss
│   │   │   └── animations.scss
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── GlassCard.vue
│   │   │   ├── GlassButton.vue
│   │   │   └── Navigation.vue
│   │   ├── home/
│   │   │   ├── HeroSection.vue
│   │   │   ├── AboutSection.vue
│   │   │   ├── AccordionItem.vue
│   │   │   ├── SkillsSection.vue
│   │   │   └── ContactSection.vue
│   │   └── effects/
│   │       ├── ParticlesBackground.vue
│   │       └── OpeningAnimation.vue
│   ├── composables/
│   │   ├── useAccordion.js
│   │   ├── useAnimations.js
│   │   └── useTheme.js
│   ├── views/
│   │   └── Home.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

---

## Component Breakdown

### 1. **App.vue** (Root Component)
```vue
<template>
  <div id="app">
    <ParticlesBackground />
    <Navigation />
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import ParticlesBackground from './components/effects/ParticlesBackground.vue';
import Navigation from './components/common/Navigation.vue';
import { useAnimations } from './composables/useAnimations';

const { initGlobalAnimations } = useAnimations();

onMounted(() => {
  initGlobalAnimations();
});
</script>

<style lang="scss">
@import './assets/styles/main.scss';
</style>
```

### 2. **HeroSection.vue**
```vue
<template>
  <section class="hero">
    <h1 class="hero-title">{{ name }}</h1>
    <p class="hero-subtitle">{{ title }}</p>
    <div class="hero-links">
      <GlassButton
        v-for="link in socialLinks"
        :key="link.label"
        :href="link.url"
        variant="primary"
      >
        {{ link.label }}
      </GlassButton>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import GlassButton from '../common/GlassButton.vue';

const name = ref('Rocky Wu');
const title = ref('Data Analyst | ML Engineer | Cloud Computing Specialist');

const socialLinks = ref([
  { label: 'GitHub', url: 'https://github.com/lolisaigao1234' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/jiayang-wu-85b960179' },
  { label: 'Get in Touch', url: '#contact' }
]);
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables.scss';

.hero {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease-out;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// ... rest of styles
</style>
```

### 3. **AccordionItem.vue** (Reusable Component)
```vue
<template>
  <div :class="['accordion-item', { active: isOpen }]">
    <div class="accordion-header" @click="toggle">
      <div class="accordion-header-left">
        <span class="accordion-icon">{{ icon }}</span>
        <div class="accordion-title-group">
          <h3 class="accordion-title">
            {{ title }}
            <span v-if="badge" class="info-badge">{{ badge }}</span>
          </h3>
          <p v-if="subtitle" class="accordion-subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div class="accordion-toggle"></div>
    </div>
    <div ref="contentRef" class="accordion-content">
      <div class="accordion-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAccordion } from '../../composables/useAccordion';

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  defaultOpen: { type: Boolean, default: false }
});

const { isOpen, toggle, contentRef } = useAccordion(props.defaultOpen);
</script>

<style lang="scss" scoped>
// Accordion styles from existing CSS
</style>
```

### 4. **useAccordion.js** (Composable)
```javascript
import { ref, nextTick } from 'vue';
import { gsap } from 'gsap';

export function useAccordion(defaultOpen = false) {
  const isOpen = ref(defaultOpen);
  const contentRef = ref(null);

  const toggle = async () => {
    isOpen.value = !isOpen.value;

    await nextTick();

    if (isOpen.value) {
      gsap.fromTo(
        contentRef.value,
        { height: 0 },
        { height: 'auto', duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(contentRef.value, {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }
  };

  return {
    isOpen,
    toggle,
    contentRef
  };
}
```

---

## Data Management

### Option 1: Props/Emit (Simple)
For this portfolio, props and emits are sufficient.

### Option 2: Pinia Store (Advanced)
If adding blog, projects filtering, etc.

```javascript
// stores/portfolio.js
import { defineStore } from 'pinia';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    experiences: [],
    projects: [],
    theme: 'dark'
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter(p => p.featured),
  },

  actions: {
    async fetchProjects() {
      // Fetch from API or static JSON
      this.projects = await fetch('/data/projects.json').then(r => r.json());
    },

    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }
  }
});
```

---

## Build Configuration

### vite.config.js
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/', // For GitHub Pages: '/<repo-name>/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'gsap'],
        }
      }
    }
  }
});
```

### GitHub Pages Deployment
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Migration Checklist

### Phase 1: Project Setup (Day 1)
- [ ] Create new Vue 3 + Vite project
- [ ] Install all dependencies
- [ ] Set up folder structure
- [ ] Configure Vite for GitHub Pages
- [ ] Copy existing CSS to SCSS files

### Phase 2: Component Development (Days 2-5)
- [ ] Create base components (GlassCard, GlassButton)
- [ ] Build HeroSection component
- [ ] Build AboutSection component
- [ ] Build AccordionItem component (reusable)
- [ ] Build SkillsSection component
- [ ] Build ContactSection component
- [ ] Build Navigation component

### Phase 3: Composables & Logic (Days 6-7)
- [ ] Create useAccordion composable
- [ ] Create useAnimations composable (GSAP)
- [ ] Create useTheme composable (dark/light)
- [ ] Migrate all vanilla JS logic

### Phase 4: Integration (Days 8-9)
- [ ] Assemble all components in Home view
- [ ] Test responsiveness
- [ ] Add transitions between sections
- [ ] Integrate GSAP animations
- [ ] Add particle background

### Phase 5: Testing & Deployment (Days 10-14)
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Set up GitHub Actions
- [ ] Deploy to GitHub Pages
- [ ] Verify production build

---

## Testing Checklist

- [ ] All features work as in original site
- [ ] Responsive on all screen sizes
- [ ] Animations perform smoothly
- [ ] No console errors
- [ ] Lighthouse score >90
- [ ] Accessibility maintained
- [ ] SEO meta tags present
- [ ] GitHub Pages deployment successful

---

## Rollback Plan

Keep original site in separate branch:
```bash
git checkout -b legacy-vanilla-site
git checkout main
# Work on Vue migration
```

If issues arise:
```bash
git checkout legacy-vanilla-site
git push origin legacy-vanilla-site --force
```

---

## Success Metrics

- Build time: <30 seconds
- Bundle size: <200KB (gzipped)
- Lighthouse Performance: >90
- Code maintainability: Improved
- Development velocity: Faster for future features

---

## Related TODOs

- **TODO #7:** Component Architecture (enabled by Vue)
- **TODO #8:** State Management (Pinia)
- **TODO #17:** Project Filtering (easier with Vue)

---

**Status:** Ready for planning (requires significant time commitment)
**Dependencies:** Node.js, npm/pnpm
**Blocking:** None (can be done in parallel branch)
**Estimated Completion:** 1-2 weeks full-time work
