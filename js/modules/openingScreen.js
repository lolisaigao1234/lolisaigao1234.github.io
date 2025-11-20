/**
 * Opening Screen Module
 * Manages the splash screen animation shown to first-time visitors
 */

export const OpeningScreen = {
    STORAGE_KEY: 'rocky-portfolio-seen-intro',
    ANIMATION_DURATION: 2000, // 2 seconds

    init() {
        this.screen = document.getElementById('opening-screen');

        // Check if user has seen intro before
        const hasSeenIntro = localStorage.getItem(this.STORAGE_KEY);

        if (hasSeenIntro || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Skip animation for returning visitors or those who prefer reduced motion
            this.hideImmediately();
        } else {
            // Show animation for first-time visitors
            this.showAnimation();
        }
    },

    showAnimation() {
        // Auto-hide after duration
        this.hideTimeout = setTimeout(() => {
            this.hide();
        }, this.ANIMATION_DURATION);
    },

    hide() {
        if (this.screen) {
            this.screen.classList.add('hidden');
            localStorage.setItem(this.STORAGE_KEY, 'true');

            // Remove from DOM after animation
            setTimeout(() => {
                if (this.screen && this.screen.parentNode) {
                    this.screen.parentNode.removeChild(this.screen);
                }
            }, 600); // Match CSS transition duration
        }
    },

    hideImmediately() {
        if (this.screen) {
            this.screen.style.display = 'none';
        }
    }
};
