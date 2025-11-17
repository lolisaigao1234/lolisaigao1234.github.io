# TODO #16: Blog/Articles Section

**Priority:** LOW | **Difficulty:** Medium | **Time:** 1 week | **Status:** 📋 Planned

## Overview
Add a blog section to share technical articles, project writeups, and insights.

## Features

### 1. Blog Architecture
- Markdown-based articles
- Static site generation or CMS
- RSS feed
- Tag/category system

### 2. Article List View
- Card-based layout
- Search functionality
- Filter by tags
- Sort by date/popularity

### 3. Article Detail View
- Syntax highlighted code blocks
- Table of contents
- Reading time estimate
- Share buttons
- Comments (optional)

### 4. Content Options

**Static Approach:**
- Markdown files in `/blog` directory
- Build-time generation
- No backend needed

**CMS Approach:**
- Headless CMS (Contentful, Strapi)
- Fetch at build time or runtime
- Easier content management

**Hybrid:**
- Git-based CMS (Netlify CMS, Forestry)
- Markdown files in repo
- GUI for editing

**Related:** TODO #21 (SEO), TODO #19 (Analytics)
