/**
 * Main Application Entry Point
 * Orchestrates all modules and initializes the portfolio
 */

import { OpeningScreen } from './modules/openingScreen.js';
import { ThemeManager } from './modules/themeManager.js';
import { Accordion } from './modules/accordion.js';
import { GSAPAnimations } from './modules/animations.js';
import { ParticlesManager } from './modules/particles.js';
import { ProjectFilter } from './modules/projectFilter.js';
import { ContactForm } from './modules/contactForm.js';
import { PWAInstall } from './modules/pwaInstall.js';

/**
 * Portfolio App Controller
 */
const PortfolioApp = {
    init() {
        // Initialize opening screen
        OpeningScreen.init();

        // Initialize theme manager
        ThemeManager.init();

        // Initialize accordion
        Accordion.init();

        // Initialize project filter (if projects section exists)
        if (document.querySelector('.projects-grid')) {
            ProjectFilter.init();
        }

        // Initialize contact form (if form exists)
        if (document.getElementById('contact-form')) {
            ContactForm.init();
        }

        // Initialize GSAP animations (wait for GSAP to load)
        if (typeof gsap !== 'undefined') {
            GSAPAnimations.init();
        } else {
            // Wait for GSAP to load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    GSAPAnimations.init();
                }, 100);
            });
        }

        // Initialize particles
        ParticlesManager.init();

        // Initialize PWA functionality (only in production to avoid live-server conflicts)
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            PWAInstall.init();
        }
    }
};

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    PortfolioApp.init();
});

// Export for global access if needed
window.PortfolioApp = PortfolioApp;
