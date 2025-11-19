/**
 * Particles Module
 * Manages particle.js background effects
 */

export const ParticlesManager = {
    init() {
        // Load particles.js after page load (non-blocking)
        window.addEventListener('load', () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.async = true;
            script.onload = () => {
                // Delay particles initialization slightly
                setTimeout(() => this.initParticles(), 500);
            };
            document.body.appendChild(script);
        });
    },

    initParticles() {
        // Check if particles should be shown (not on mobile, not reduced motion)
        const isMobile = window.innerWidth <= 768;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isMobile || prefersReducedMotion) {
            return; // Skip particles on mobile or if reduced motion preferred
        }

        // Check if particlesJS is loaded
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 30, // Reduced from 60 for better performance
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#007AFF', '#AF52DE', '#FF2D55']
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.5, // Reduced from 1 for smoother animation
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1, // Reduced from 2 for smoother animation
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#007AFF',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 0.5, // Reduced from 1 for smoother performance
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: false
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        }
                    }
                },
                retina_detect: true
            });
        }
    }
};
