# TODO #17: Project Filtering & Search

**Priority:** MEDIUM | **Difficulty:** Low | **Time:** 1 day | **Status:** 📋 Planned

## Overview
Implement filtering and search functionality for project showcase section.

## Features

### 1. Filter by Technology
```html
<div class="filter-bar">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="python">Python</button>
  <button class="filter-btn" data-filter="ml">Machine Learning</button>
  <button class="filter-btn" data-filter="web">Web Dev</button>
</div>
```

### 2. Search Functionality
```javascript
function searchProjects(query) {
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    const title = project.querySelector('.project-title').textContent;
    const description = project.querySelector('.project-description').textContent;

    if (title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query)) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}
```

### 3. Sort Options
- By date (newest first)
- By name (alphabetical)
- By stars (GitHub integration)

### 4. Animated Filtering
```javascript
// Use GSAP for smooth filter animations
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');

  gsap.to(projects, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    stagger: 0.05,
    onComplete: () => {
      projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
          project.style.display = 'block';
          gsap.to(project, {
            opacity: 1,
            scale: 1,
            duration: 0.3
          });
        } else {
          project.style.display = 'none';
        }
      });
    }
  });
}
```

**Related:** TODO #14 (Interactive Projects), TODO #6 (Vue - easier filtering)
