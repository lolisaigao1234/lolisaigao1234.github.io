# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for Rocky Wu, hosted on GitHub Pages at https://lolisaigao1234.github.io. The site contains academic projects from Spring 2022 coursework at the University of Illinois, including data visualization projects, interactive web experiences, and informational content.

## Architecture

The repository follows a modular static site structure:

- **Root**: Main landing page (`index.html`) with personal introduction and links to projects
- **`/css`**: Main stylesheet for the homepage (`styles.css`)
- **`/js`**: Modular JavaScript architecture (Phase 3)
  - `app.js` - Main application orchestrator
  - `/modules` - Feature modules (theme, animations, forms, etc.)
  - `/data` - Project data and utilities
- **`/.claude`**: Development planning and documentation
  - `/phase1-quick-wins` - Completed Phase 1 TODO files
  - `/phase2-visual-polish` - Completed Phase 2 TODO files
  - `/phase3-architectural` - Completed Phase 3 TODO files
  - `/phase4-advanced` - Planned Phase 4 TODO files
  - `/misc` - Miscellaneous enhancement TODOs
  - `roadmap_TODO.md` - Master roadmap document
- **`/music`**: Audio files in FLAC format
- **`/spring2022`**: Academic projects organized by course

### Project Structure by Course

**IS445 (Data Visualization):**
- Location: `spring2022/IS445/`
- Contains Jupyter notebooks for data visualization projects
- Final project uses NYC Yellow Taxi trip data (Jan 2021) with interactive visualizations
- Uses: pandas, numpy, matplotlib, bqplot, ipywidgets, seaborn
- HW10 includes Vega-Lite demonstrations with Idyll framework

**INFO303 (Information Science):**
- Location: `spring2022/INFO303/`
- MP2: Text-based interactive adventure game (HTML-based choose-your-own-adventure)
  - Entry point: `spring2022/INFO303/MP2/html/Start.html`
  - Multiple branching storylines with different endings
- MP3: Online Privacy topic website with survey data analysis
  - Uses Jupyter notebook for privacy survey analysis
  - Includes position essay and interview materials

**CLCV115 (Greco-Roman Mythology):**
- Location: `spring2022/CLCV115/CreativeProject/`
- Educational content about Greco-Roman mythology
- Has both old and new page versions using nicepage.js framework

## Development Environment

### Python Projects
- Environment defined in: `spring2022/IS445/InclassFile/environment.yml`
- Key dependencies: numpy, matplotlib (3.2.2), Pillow
- Jupyter notebooks use: pandas, bqplot, ipywidgets, seaborn

### Web Projects
- Pure HTML/CSS/JavaScript (no build process required)
- Some projects use jQuery 1.9.1
- Some projects use nicepage.js for page building

## Working with Different Project Types

### Jupyter Notebooks
To work with data visualization notebooks (IS445 projects):
- Notebooks are in `.ipynb` format
- Main final project: `spring2022/IS445/FinalProject/IS445FinalProjectPart3.ipynb`
- Exported HTML versions exist for web viewing
- Data sources: NYC TLC trip data via URLs (too large for git LFS)

### Interactive HTML Adventures (INFO303 MP2)
- Multiple interconnected HTML files forming branching narratives
- Each file represents a scene/decision point
- Links between files create the story flow
- Images stored in categorized subdirectories (forest, room, oyashiki, etc.)

### Static Portfolio Pages
- Main page uses custom CSS with 3D pyramid animation
- Responsive design with media queries
- Uses Google Fonts (Lato family)
- Dark theme with patterned background

## Common Tasks

### Previewing the Site
Simply open `index.html` in a browser or use any static file server:
```bash
python -m http.server 8000
```

### Working with Notebooks
View notebooks directly or convert to HTML:
```bash
jupyter nbconvert --to html <notebook_path>
```

### Updating Content
- Main portfolio links: Edit `index.html`
- Styling changes: Edit `css/styles.css`
- Project pages: Navigate to respective course directories

## Git Workflow
- Main branch: `main`
- Recent commits use "poi" as placeholder messages
- Clean working directory (no uncommitted changes)

## Key Design Patterns

### Homepage Structure (Liquid Glass Design)
The homepage features a modern Apple-inspired liquid glass design with the following characteristics:

**Glassmorphism Effects:**
- Frosted glass cards using `backdrop-filter: blur(20px)` with semi-transparent backgrounds
- Subtle borders and shadows creating depth and layering
- CSS variables for consistent theming (accent colors: blue #007AFF, purple #AF52DE, pink #FF2D55)

**Layout Architecture:**
- Fixed navigation bar with glass effect at the top
- Hero section with gradient text and CTA buttons
- About section with:
  - Collapsible accordion for professional background (Current Role, Education, Experience)
  - Tertiary menus within accordions for detailed information
  - Skills showcase grid
  - Favorites grid and audio player
- Projects grid using CSS Grid with auto-fit columns (min 320px)
- Footer with contact information in glass card

**Interactive Elements:**
- Smooth hover animations with `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Cards that lift on hover (`translateY(-8px)`)
- Gradient accent lines appearing on project cards
- Button hover effects with shadow enhancement
- Collapsible accordion system for professional background with smooth expand/collapse transitions
- Scrollable accordion content with custom styled scrollbars (600px max-height on desktop)
- Tertiary menu items with hover slide animations

**Typography:**
- Inter font family (with -apple-system fallback)
- Gradient text effects for titles using `-webkit-background-clip: text`
- Fluid typography using `clamp()` for responsive scaling

**Color System:**
- Dark gradient background (black to dark blue)
- Radial gradient overlays for ambient lighting effects
- Three-tier text opacity system (primary 95%, secondary 70%, tertiary 50%)

**Responsive Design:**
- Mobile-first approach with breakpoints at 480px, 768px
- Grid collapses to single column on mobile
- Navigation adapts with smaller padding and font sizes
- Hero buttons stack vertically on small screens
- Accordion max-height adjusts by screen size (600px desktop, 500px tablet, 400px mobile)

### Data Visualization Projects
- Downsampling large datasets for performance (1% sample for mybinder)
- Logarithmic scaling for visualizations with wide value ranges
- Data cleaning steps documented in notebooks (removing NaN, invalid dates, zero passenger counts)
- Interactive dashboards using bqplot with linked views (heatmap + scatter plot)

### Interactive Story Structure (INFO303 MP2)
- Each HTML file is a self-contained scene
- Multiple choice links to other HTML files
- Different endings based on player choices
- Non-persistent inventory system (items don't carry between playthroughs)

## Design System Reference

### CSS Classes

**Core Components:**
- `.glass` - Core glassmorphism effect (backdrop blur, borders, shadows)
- `.btn` - Base button styling with smooth transitions
- `.btn-primary` - Blue accent button with glow effect
- `.btn-secondary` - Glass button with border

**Accordion System:**
- `.info-accordion` - Container for accordion items
- `.accordion-item` - Individual collapsible section
- `.accordion-header` - Clickable header with icon, title, and toggle
- `.accordion-content` - Collapsible content area with max-height transition and vertical scrolling when active
- `.accordion-body` - Inner content wrapper with padding
- `.accordion-toggle` - Animated chevron indicator
- Custom scrollbar styling using `::-webkit-scrollbar` and `scrollbar-*` properties

**Tertiary Menu (Detail Display):**
- `.tertiary-menu` - Container for detail items within accordion
- `.tertiary-item` - Individual detail card with label/value pairs
- `.tertiary-item-label` - Uppercase label for detail category
- `.tertiary-item-value` - Detail content with emphasized text
- `.info-badge` - Small badge for highlighting dates/status (blue accent)

**Experience Company Headers:**
- `.experience-company` - Container for company information block
- `.company-header` - Flex container with company name and date badge
- `.date-badge` - Purple accent badge for date ranges
- `.company-role` - Italic text for job title and location

**Projects:**
- `.project-card` - Project showcase card with hover lift effect
- `.project-tag` - Colored tag labels for categorization
- `.project-link` - Interactive link with slide animation

### Animations
- `fadeInUp` - Entry animation (0.8s ease-out)
- `slideDown` - Navigation slide-in (0.6s ease-out)
- Staggered delays on project cards (0.1s increments)
- Respects `prefers-reduced-motion` for accessibility

### Accessibility Features
- Semantic HTML5 structure (`<nav>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA-friendly navigation with anchor links
- High contrast text (95% opacity on dark background)
- Keyboard-friendly focus states
- Reduced motion support for users with vestibular disorders

## JavaScript Functionality

### Accordion Toggle
The site includes vanilla JavaScript for accordion interaction:
- `toggleAccordion(header)` - Manages accordion expand/collapse behavior
- Implements single-accordion-open pattern (closes others when opening one)
- Auto-opens first accordion item on page load
- No external dependencies required

## Space-Efficient Design Strategy

The professional background section uses a hierarchical information architecture organized by domain/field rather than chronology:

### Three-Tier Structure:
1. **Domain Accordions** (Primary Level)
   - Cloud Computing & Infrastructure
   - Quantitative Finance & Trading
   - Data Engineering & Analytics
   - NLP & AI Systems
   - Product Analytics & Marketing

2. **Company Headers** (Secondary Level)
   - Company name with type descriptor (e.g., "— AI Quantitative Hedge Fund")
   - Date badges with purple accent
   - Job title and location
   - Separated by visual dividers within each domain

3. **Achievement Items** (Tertiary Level)
   - Detailed accomplishments organized by project/category
   - Labeled with descriptive categories (e.g., "Cloud Architecture Migration")
   - Emphasizes technical skills, metrics, and business impact
   - Uses strong tags to highlight key technologies and results

### Design Benefits:
- **Domain-based grouping** shows breadth of expertise across different fields
- **Reduces initial visual clutter** - only domain headers visible by default
- **Selective expansion** - users can explore specific domains of interest
- **Multiple companies per domain** - shows progression and depth in each area
- **Detailed achievements** - comprehensive bullet points from full resume preserved
- **Scrollable content** - long experience sections remain accessible with styled scrollbars
- **Fixed height constraint** - prevents accordion from pushing other content off-screen
- **Mobile-friendly** - works well on limited screen space with adaptive max-height

### Data Source:
Experience details sourced from `JiaYang_Wu_Resume_full/main.tex` with full achievement descriptions preserved

## Notes
- Site deployed via GitHub Pages (no build step needed)
- Audio files use FLAC format
- Some projects reference external data sources via URLs
- Portfolio showcases coursework from Spring 2022 semester
- New design uses Inter font (loaded from Google Fonts)
- All animations use GPU-accelerated properties (transform, opacity)
- Accordion system uses pure CSS transitions (no JavaScript animation libraries)
- Custom scrollbars styled for webkit browsers and Firefox with blue accent theming

## Scrollable Accordion Implementation

### Technical Details:
The accordion content becomes scrollable when expanded to handle long experience sections:

**Max-Height Values:**
- Desktop (default): 600px
- Tablet (≤768px): 500px
- Mobile (≤480px): 400px

**Scrollbar Styling:**
- Width: 8px (webkit)
- Track: Semi-transparent white background
- Thumb: Blue accent color matching site theme
- Hover state: Brighter blue for visual feedback
- Firefox support via `scrollbar-width` and `scrollbar-color`

**Why This Approach:**
- **Problem**: Initial implementation had `overflow: hidden` on `.accordion-content`, preventing scroll
- **Solution**: Applied `overflow-y: auto` only when accordion is active (`.accordion-item.active .accordion-content`)
- **Benefit**: Long sections (like "Data Engineering & Analytics" with 3 companies) remain accessible without expanding the entire page
- **User Experience**: Users can scroll within the accordion to see all achievements while other sections remain visible

---

## Improvement Roadmap & Planning Documents

### Comprehensive Improvement Plan
The repository contains a detailed roadmap for enhancing the portfolio website with modern features, animations, and optimizations. All planning documents are located in the root directory.

### Main Planning Document
**`roadmap_TODO.md`** - Master roadmap containing:
- Executive summary of all proposed improvements
- 22 categorized enhancements organized by impact and priority
- Implementation phases (Quick Wins → Visual Polish → Architecture → Advanced Features)
- Technology stack recommendations
- Risk assessment and success metrics
- Design principles to maintain during improvements

### Individual TODO Files
Each improvement has a dedicated planning document with detailed implementation guidance:

#### 🎨 Visual & Animation Enhancements
- **`TODO_01_opening_animations.md`** - Opening screen/splash animations
- **`TODO_02_background_effects.md`** - Particle systems and dynamic backgrounds
- **`TODO_03_advanced_animations.md`** - GSAP integration for professional animations
- **`TODO_04_parallax_scroll.md`** - Parallax scrolling and scroll-triggered effects
- **`TODO_05_3d_elements.md`** - Three.js 3D background elements

#### 🛠️ Technical Architecture
- **`TODO_06_vue_migration.md`** - Vue.js 3 framework migration plan
- **`TODO_07_component_architecture.md`** - Modular component design system
- **`TODO_08_state_management.md`** - Centralized state management (Pinia/vanilla)

#### ⚡ Performance & UX
- **`TODO_09_performance.md`** - Comprehensive performance optimization
- **`TODO_10_pwa.md`** - Progressive Web App implementation
- **`TODO_11_loading_states.md`** - Loading states and skeleton screens

#### 🎯 User Experience Features
- **`TODO_12_theme_toggle.md`** - Dark/light mode toggle system
- **`TODO_13_microinteractions.md`** - Microinteractions and user feedback
- **`TODO_14_interactive_projects.md`** - Interactive project showcases with modals
- **`TODO_15_custom_cursor.md`** - Custom cursor effects (desktop)

#### 📱 Content & Features
- **`TODO_16_blog_section.md`** - Blog/articles section for technical writing
- **`TODO_17_project_filtering.md`** - Project filtering and search functionality
- **`TODO_18_contact_form.md`** - Contact form with validation
- **`TODO_19_analytics.md`** - Analytics and tracking setup

#### ♿ Accessibility & SEO
- **`TODO_20_accessibility.md`** - WCAG 2.1 AA compliance improvements
- **`TODO_21_seo_optimization.md`** - SEO optimization (meta tags, structured data)
- **`TODO_22_internationalization.md`** - Multi-language support (i18n)

### Implementation Guidelines

#### Priority Matrix
Each TODO file includes:
- **Priority**: HIGH / MEDIUM / LOW
- **Difficulty**: Low / Medium / High
- **Estimated Time**: Days/weeks required
- **Status**: Planning / In Progress / Completed
- **Dependencies**: Related TODOs and prerequisites

#### Phase-Based Approach
The roadmap recommends implementing improvements in phases:

**Phase 1: Quick Wins** (1-2 weeks)
- Opening animations, background effects
- Performance optimization, theme toggle
- SEO optimization

**Phase 2: Visual Polish** (2-3 weeks)
- GSAP animations, parallax effects
- Microinteractions, loading states
- Interactive project showcases

**Phase 3: Architectural Improvements** (4-6 weeks)
- Vue.js migration (optional)
- Component architecture
- Project filtering, contact form

**Phase 4: Advanced Features** (2-4 weeks)
- 3D elements, PWA
- Blog section, enhanced accessibility

#### Design Principles to Maintain
All improvements should preserve:
- ✅ Glassmorphism aesthetic (frosted glass effects)
- ✅ Apple-inspired premium design language
- ✅ Smooth cubic-bezier animations
- ✅ Accessibility-first approach (`prefers-reduced-motion`)
- ✅ Mobile-responsive design
- ✅ Performance (Lighthouse >90)
- ✅ Existing color palette (blue #007AFF, purple #AF52DE, pink #FF2D55)

#### Technology Stack Recommendations
The roadmap suggests modern tools while maintaining simplicity:
- **Build Tool**: Vite (if migrating to framework)
- **Framework**: Vue 3 with Composition API (optional)
- **Animations**: GSAP, Lottie, particles.js/tsParticles
- **State**: Pinia (Vue) or vanilla JS state manager
- **Styling**: SCSS + PostCSS
- **PWA**: Vite PWA Plugin or Workbox
- **Analytics**: Plausible (privacy-friendly) or Google Analytics 4

### Using the Planning Documents

#### Before Implementation
1. Read `roadmap_TODO.md` for overall strategy
2. Review individual TODO files for detailed specs
3. Check dependencies between TODOs
4. Consider phase-based implementation
5. Validate against design principles

#### During Implementation
1. Follow implementation steps in TODO files
2. Use provided code examples as starting points
3. Test against success metrics
4. Maintain accessibility and performance
5. Update TODO status as work progresses

#### After Implementation
1. Verify testing checklists are complete
2. Measure success metrics (performance, accessibility)
3. Document any deviations from plan
4. Update CLAUDE.md with new patterns/features
5. Consider related TODOs for next iteration

### Planning Document Features

Each TODO file contains:
- **Overview**: High-level description of the improvement
- **Goals**: Specific objectives to achieve
- **Implementation Approach**: Detailed technical guidance
- **Code Examples**: Ready-to-use code snippets
- **Testing Checklist**: Comprehensive test scenarios
- **Performance Considerations**: Optimization strategies
- **Accessibility Notes**: WCAG compliance guidance
- **Alternative Approaches**: Multiple implementation options
- **Dependencies & Related TODOs**: Cross-references
- **Success Metrics**: Measurable outcomes

### Risk Assessment

The roadmap categorizes improvements by implementation risk:

**Low Risk** (Easy to reverse):
- Opening animations, background effects, microinteractions
- Theme toggle, loading states, SEO improvements

**Medium Risk** (Moderate complexity):
- GSAP integration, PWA setup
- Contact form, project filtering

**High Risk** (Significant refactor):
- Vue.js migration (major architecture change)
- 3D elements integration, full i18n

### Notes for Future Development

- All improvements are **backwards compatible** with current design
- Can be implemented **incrementally** without breaking changes
- **No code has been implemented yet** - these are planning documents only
- Each enhancement is designed to be **independently implementable**
- The roadmap is **flexible** - pick improvements based on priorities
- Consider **starting with Phase 1** for immediate impact

---

## Implementation Status

### Phase 1: Quick Wins ✅ **COMPLETED** (2025-11-17)

**Implemented Features:**
1. **SEO Optimization** (TODO #21)
   - Comprehensive meta tags (Open Graph, Twitter Cards, JSON-LD)
   - sitemap.xml and robots.txt
   - Preconnect to Google Fonts

2. **Dark/Light Theme Toggle** (TODO #12)
   - Full theme system with CSS variables
   - Toggle button with sun/moon icons
   - System preference detection
   - LocalStorage persistence
   - Keyboard shortcut (Ctrl/Cmd + Shift + D)

3. **Opening Screen Animations** (TODO #1)
   - Name reveal animation for first-time visitors
   - Skip functionality with keyboard shortcuts
   - LocalStorage to remember returning visitors
   - Respects `prefers-reduced-motion`

4. **Particle Background** (TODO #2)
   - Interactive particles.js integration
   - 60 particles in brand colors
   - Hover effects (grab mode)
   - Disabled on mobile for performance

5. **Performance Optimizations** (TODO #9)
   - Async loading of scripts
   - Mobile optimizations
   - Reduced motion support
   - GPU-accelerated animations

### Phase 2: Visual Polish ✅ **COMPLETED** (2025-11-17)

**Implemented Features:**
1. **GSAP Animation Library** (TODO #3)
   - Professional-grade animation library integrated
   - ScrollTrigger plugin for scroll-based animations
   - Timeline-based animations for page load
   - Smooth easing functions throughout

2. **Parallax & Scroll Effects** (TODO #4)
   - Scroll-triggered section reveals
   - Staggered animations for skill cards
   - Subtle parallax on background gradients
   - Footer entrance animation

3. **Microinteractions & Feedback** (TODO #13)
   - Enhanced button hover effects (scale, lift)
   - Button press/release animations
   - Card hover effects with smooth transitions
   - Glass card border pulse on hover
   - Email copy-to-clipboard with toast notification
   - GSAP-powered accordion expand/collapse

4. **Loading States & Transitions** (TODO #11)
   - Skeleton screen components
   - Loading spinner utility
   - Progress bar component
   - Fade and slide transition classes
   - Theme-aware skeleton screens
   - Respects `prefers-reduced-motion`

**Note:** Interactive Project Showcases (TODO #14) skipped as there are no project sections implemented yet. This will be added when project content is created.

### Phase 3: Architectural Improvements ✅ **COMPLETED** (2025-11-17)

**Implemented Features:**
1. **Modular JavaScript Architecture** (TODO #7 - Component Architecture)
   - ES6 module system for better code organization
   - Separated concerns into dedicated modules:
     - `js/modules/openingScreen.js` - Splash screen management
     - `js/modules/themeManager.js` - Theme switching
     - `js/modules/accordion.js` - Accordion functionality
     - `js/modules/animations.js` - GSAP animations
     - `js/modules/particles.js` - Particle effects
     - `js/modules/projectFilter.js` - Project filtering/search
     - `js/modules/contactForm.js` - Form validation
   - `js/app.js` - Main orchestrator
   - `js/data/projects.js` - Project data and utilities
   - Removed ~600 lines of inline JavaScript
   - Clean separation of data, logic, and presentation

2. **Projects Section** (TODO #17 - Project Filtering & Search)
   - Featured projects showcase with 6 portfolio items
   - Category-based filtering (Data Science, Cloud, AI/ML, Finance, Web Dev)
   - Real-time search functionality with debouncing
   - Animated filter transitions using GSAP
   - Project cards with glass morphism design
   - Featured badge for highlighted projects
   - Technology tags for each project
   - Responsive grid layout (auto-fit, minmax 320px)

3. **Contact Form with Validation** (TODO #18)
   - Full contact form with name, email, and message fields
   - Client-side validation with real-time error messages
   - Email format validation using regex
   - Field-level validation on blur
   - Form submission with loading state
   - Success/error toast notifications
   - Alternative contact methods section
   - Accessible form with ARIA labels
   - Glass morphism styling consistent with site design

**Note:** Vue.js Migration (TODO #6) was **deferred** as it's unnecessary overhead for a simple portfolio. The vanilla JS modular architecture provides sufficient organization without framework complexity.

**Architecture Benefits:**
- ✅ **Maintainable**: Clear module separation, easy to debug
- ✅ **Scalable**: Easy to add new features/modules
- ✅ **Performant**: No framework overhead, native ES6 modules
- ✅ **Testable**: Each module can be tested independently
- ✅ **Readable**: ~100 lines per module vs 600 line monolith

---

## Modular Architecture Documentation

### Directory Structure

```
/js
├── app.js                    # Main application orchestrator
├── data/
│   └── projects.js          # Project data and utility functions
└── modules/
    ├── openingScreen.js     # Splash screen management
    ├── themeManager.js      # Dark/light theme switching
    ├── accordion.js         # Accordion expand/collapse
    ├── animations.js        # GSAP animations controller
    ├── particles.js         # Particle.js background
    ├── projectFilter.js     # Project filtering and search
    └── contactForm.js       # Contact form validation
```

### Module System

**ES6 Module Imports:**
All modules use ES6 `import/export` syntax for clean dependency management:

```javascript
// app.js
import { OpeningScreen } from './modules/openingScreen.js';
import { ThemeManager } from './modules/themeManager.js';
// ... other imports

const PortfolioApp = {
    init() {
        OpeningScreen.init();
        ThemeManager.init();
        // ... initialize other modules
    }
};

document.addEventListener('DOMContentLoaded', () => {
    PortfolioApp.init();
});
```

**Benefits:**
- Automatic dependency resolution
- No global namespace pollution
- Browser-native module loading
- Better code splitting and caching

### Projects Module (`projectFilter.js`)

**Features:**
- Dynamic project rendering from data source
- Real-time category filtering with animations
- Debounced search input (300ms delay)
- GSAP-powered filter transitions
- No results fallback UI

**Usage:**
```javascript
ProjectFilter.init(); // Auto-renders projects and sets up filters
```

**Filter Animation Flow:**
1. Fade out current cards (stagger 0.03s)
2. Re-render filtered results
3. Fade in new cards (stagger 0.05s with back easing)

### Contact Form Module (`contactForm.js`)

**Validation Rules:**
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format (RFC 5322 basic)
- **Message**: Required, minimum 10 characters

**Features:**
- Real-time field validation on blur
- Inline error messages
- Submit button loading state
- Success/error toast notifications
- Simulated submission (ready for backend integration)

**Backend Integration Notes:**
Replace the simulated `setTimeout` with actual API call:
```javascript
// Option 1: Custom backend
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

// Option 2: Formspree
// Update form action attribute

// Option 3: EmailJS
// Use EmailJS SDK
```

---

## Animation System Documentation

### GSAP Integration

The site uses GSAP 3.12.5 with ScrollTrigger for professional animations:

**Page Load Animations:**
- Hero section: Staggered fade-in with back easing
- Navigation: Slide-down entrance
- Timeline-based sequencing for smooth flow

**Scroll-Triggered Animations:**
- About section reveal at 80% viewport
- Skill cards stagger animation
- Footer entrance animation
- All animations respect `once: true` to avoid repeats

**Microinteractions:**
- Button hovers: Scale 1.05 + lift 2px
- Button press: Scale 0.95
- Card hovers: Lift 8px
- Glass borders: Subtle color change
- Accordion: Smooth height animations with GSAP

**Email Copy Feature:**
- Click email to copy to clipboard
- Animated toast notification
- Button pulse feedback
- Auto-removes notification after 2s

### Loading States

**Skeleton Components:**
```css
.skeleton              /* Base animated gradient */
.skeleton-text         /* 16px height text placeholder */
.skeleton-title        /* 32px height title placeholder */
.skeleton-button       /* 44px height button placeholder */
.skeleton-card         /* Full card skeleton */
```

**Loading Spinner:**
```html
<div class="spinner"></div>
```

**Progress Bar:**
```html
<div class="progress-bar active"></div>
```

**Transition Classes:**
- `.fade-enter`, `.fade-enter-active`, `.fade-enter-to`
- `.fade-leave`, `.fade-leave-active`, `.fade-leave-to`
- `.slide-up-enter`, `.slide-up-enter-active`, `.slide-up-enter-to`

### Accessibility Features

**Reduced Motion Support:**
- All GSAP animations check `prefers-reduced-motion`
- Skeleton animations disabled if reduced motion preferred
- Spinner shows static state instead of animating
- All transitions respect user preferences

**Keyboard Accessibility:**
- Theme toggle: Ctrl/Cmd + Shift + D
- Opening screen skip: Space, Enter, Escape
- All interactive elements keyboard accessible

---

## Planning Document Status

- **Created**: 2025-11-17
- **Last Updated**: 2025-11-17
- **Total Improvements**: 22 documented enhancements
- **Implementation Status**:
  - ✅ Phase 1: Complete (5/5 features)
  - ✅ Phase 2: Complete (4/5 features, 1 skipped)
  - ✅ Phase 3: Complete (3/4 features, Vue migration deferred)
  - 📋 Phase 4: Planned (Advanced Features)
- **Next Step**: Phase 4 or selective implementation from remaining TODOs
- **Maintained By**: Claude Code

### Phase Implementation Summary

**Phase 1 (Quick Wins):** SEO, Theme Toggle, Opening Animation, Particles, Performance
**Phase 2 (Visual Polish):** GSAP, Parallax, Microinteractions, Loading States
**Phase 3 (Architecture):** Modular JS, Projects Section, Contact Form
**Phase 4 (Pending):** 3D Elements, PWA, Blog Section, Enhanced Accessibility
