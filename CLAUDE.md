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

### Homepage Structure
- Single-page portfolio with sections for different projects
- Animated 3D pyramid graphic in header (pure CSS)
- Responsive layout adapting to mobile/tablet/desktop

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

## Notes
- Site deployed via GitHub Pages (no build step needed)
- Audio files use FLAC format
- Some projects reference external data sources via URLs
- Portfolio showcases coursework from Spring 2022 semester
