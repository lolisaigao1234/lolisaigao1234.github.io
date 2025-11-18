/**
 * Theme Manager Module
 * Handles dark/light theme switching with system preference detection
 */

export const ThemeManager = {
    STORAGE_KEY: 'rocky-portfolio-theme',
    THEME_ATTRIBUTE: 'data-theme',

    init() {
        this.toggleButton = document.getElementById('theme-toggle');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

        this.applyTheme(this.currentTheme, false);
        this.setupEventListeners();
    },

    setupEventListeners() {
        // Toggle button click
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light', true);
            }
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    },

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme, true);
    },

    applyTheme(theme, animate = false) {
        this.currentTheme = theme;

        // Apply theme attribute
        if (theme === 'light') {
            document.documentElement.setAttribute(this.THEME_ATTRIBUTE, 'light');
        } else {
            document.documentElement.removeAttribute(this.THEME_ATTRIBUTE);
        }

        // Save preference
        localStorage.setItem(this.STORAGE_KEY, theme);

        // Update button ARIA
        if (this.toggleButton) {
            this.toggleButton.setAttribute('aria-pressed', theme === 'light');
        }

        // Animate transition
        if (animate) {
            this.animateThemeTransition();
        }

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    },

    animateThemeTransition() {
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    },

    getStoredTheme() {
        return localStorage.getItem(this.STORAGE_KEY);
    },

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
};
