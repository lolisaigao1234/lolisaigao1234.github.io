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
- About section with glass card containing personal info, favorites grid, and audio player
- Projects grid using CSS Grid with auto-fit columns (min 320px)
- Footer with contact information in glass card

**Interactive Elements:**
- Smooth hover animations with `cubic-bezier(0.4, 0, 0.2, 1)` easing
- Cards that lift on hover (`translateY(-8px)`)
- Gradient accent lines appearing on project cards
- Button hover effects with shadow enhancement

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
- `.glass` - Core glassmorphism effect (backdrop blur, borders, shadows)
- `.btn` - Base button styling with smooth transitions
- `.btn-primary` - Blue accent button with glow effect
- `.btn-secondary` - Glass button with border
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

## Notes
- Site deployed via GitHub Pages (no build step needed)
- Audio files use FLAC format
- Some projects reference external data sources via URLs
- Portfolio showcases coursework from Spring 2022 semester
- New design uses Inter font (loaded from Google Fonts)
- All animations use GPU-accelerated properties (transform, opacity)
