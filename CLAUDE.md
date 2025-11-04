# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for Rocky Wu, hosted on GitHub Pages at https://lolisaigao1234.github.io. The site contains academic projects from Spring 2022 coursework at the University of Illinois, including data visualization projects, interactive web experiences, and informational content.

## Architecture

The repository follows a simple static site structure:

- **Root**: Main landing page (`index.html`) with personal introduction and links to projects
- **`/css`**: Main stylesheet for the homepage (`styles.css`)
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
