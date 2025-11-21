/**
 * Project Filter Module
 * Handles project filtering and search functionality
 */

import { projects, getAllCategories, filterByCategory, searchProjects } from '../data/projects.js';

export const ProjectFilter = {
    currentFilter: 'all',
    currentQuery: '',

    init() {
        this.renderProjects(projects);
        this.setupFilters();
        this.setupSearch();
    },

    setupFilters() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);

                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    },

    setupSearch() {
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.currentQuery = e.target.value.toLowerCase();
                    this.performSearch();
                }, 300);
            });
        }
    },

    applyFilter(category) {
        this.currentFilter = category;
        let filtered = filterByCategory(category);

        // Apply search if query exists
        if (this.currentQuery) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(this.currentQuery) ||
                project.description.toLowerCase().includes(this.currentQuery) ||
                project.technologies.some(tech => tech.toLowerCase().includes(this.currentQuery))
            );
        }

        this.animateFilterChange(filtered);
    },

    performSearch() {
        let results = projects;

        if (this.currentQuery) {
            results = searchProjects(this.currentQuery);
        }

        // Apply category filter if not 'all'
        if (this.currentFilter !== 'all') {
            results = results.filter(p => p.categories.includes(this.currentFilter));
        }

        this.animateFilterChange(results);
    },

    animateFilterChange(filteredProjects) {
        const projectCards = document.querySelectorAll('.project-card');

        if (typeof gsap !== 'undefined') {
            // Fade out all cards
            gsap.to(projectCards, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                stagger: 0.03,
                onComplete: () => {
                    this.renderProjects(filteredProjects);

                    // Fade in filtered cards
                    const newCards = document.querySelectorAll('.project-card');
                    gsap.fromTo(newCards,
                        { opacity: 0, scale: 0.8 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: 'back.out(1.2)'
                        }
                    );
                }
            });
        } else {
            // Fallback without animation
            this.renderProjects(filteredProjects);
        }
    },

    renderProjects(projectsToRender) {
        const grid = document.querySelector('.projects-grid');
        if (!grid) return;

        if (projectsToRender.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <p>No projects found matching your criteria.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = projectsToRender.map(project => `
            <article class="project-card glass">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech =>
                        `<span class="skill-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    ${project.link ?
                        `<a href="${project.link}" class="project-link btn btn-secondary">View Project →</a>` :
                        '<span class="project-link-disabled">Private Project</span>'
                    }
                    ${project.github ?
                        `<a href="${project.github}" class="project-link btn btn-secondary" target="_blank" rel="noopener">GitHub →</a>` :
                        ''
                    }
                </div>
            </article>
        `).join('');
    }
};
