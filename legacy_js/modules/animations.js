/**
 * GSAP Animations Module
 * Manages all GSAP-based animations including page load, scroll triggers, and microinteractions
 */

export const GSAPAnimations = {
    init() {
        // Check if GSAP is loaded and reduced motion is not preferred
        if (typeof gsap === 'undefined') {
            return; // GSAP not loaded yet
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return; // Skip animations if user prefers reduced motion
        }

        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Initialize page load animations immediately (critical)
        this.initPageLoadAnimations();

        // Defer scroll animations and microinteractions to idle time
        // This reduces main thread blocking during page load
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.initScrollAnimations();
                this.initMicrointeractions();
            }, { timeout: 2000 });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
                this.initScrollAnimations();
                this.initMicrointeractions();
            }, 100);
        }
    },

    initPageLoadAnimations() {
        // Hero section staggered entrance
        const heroTimeline = gsap.timeline({ delay: 0.2 });

        heroTimeline
            .from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.hero-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-links .btn', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');

        // Navigation slide-in
        gsap.from('nav', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
    },

    initScrollAnimations() {
        if (typeof ScrollTrigger === 'undefined') return;

        // Animate about section
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                once: true
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Animate skill categories with stagger
        gsap.from('.skill-category', {
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 80%',
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });

        // Animate projects section if exists
        if (document.querySelector('.projects-grid')) {
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top 80%',
                    once: true
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        // Footer entrance
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 90%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    },

    initMicrointeractions() {
        // Button hover enhancements (optimized with faster durations)
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.2, // Reduced from 0.3 for snappier feel
                    ease: 'power1.out' // Simpler easing for better performance
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: 0.2, // Reduced from 0.3
                    ease: 'power1.in' // Simpler easing
                });
            });

            // Button click animation (optimized)
            button.addEventListener('mousedown', () => {
                gsap.to(button, {
                    scale: 0.95,
                    duration: 0.08 // Reduced from 0.1 for instant feedback
                });
            });

            button.addEventListener('mouseup', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.15 // Reduced from 0.2
                });
            });
        });

        // Card hover effects (optimized)
        document.querySelectorAll('.skill-category, .project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.3, // Reduced from 0.4
                    ease: 'power1.out' // Simpler easing
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.25, // Reduced from 0.3
                    ease: 'power1.in' // Simpler easing
                });
            });
        });

        // Glass card subtle pulse on hover (optimized)
        document.querySelectorAll('.glass').forEach(glass => {
            glass.addEventListener('mouseenter', () => {
                gsap.to(glass, {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    duration: 0.2 // Reduced from 0.3
                });
            });

            glass.addEventListener('mouseleave', () => {
                gsap.to(glass, {
                    borderColor: 'var(--glass-border)',
                    duration: 0.2 // Reduced from 0.3
                });
            });
        });

        // NOTE: Accordion animation removed - handled by CSS max-height transition
        // This prevents layout thrashing from GSAP's height: 'auto' calculation
        // Accordion.js module manages the .active class, CSS handles smooth transitions

        // Email copy animation
        document.querySelectorAll('.footer-email').forEach(email => {
            email.addEventListener('click', (e) => {
                e.preventDefault();
                const emailText = email.textContent;

                navigator.clipboard.writeText(emailText).then(() => {
                    this.showCopyNotification();
                    this.animateEmailClick(email);
                });
            });
        });
    },

    showCopyNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Email copied!';
        notification.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--accent-blue);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 10001;
            opacity: 0;
        `;
        document.body.appendChild(notification);

        // Animate notification
        gsap.timeline()
            .to(notification, {
                opacity: 1,
                y: -10,
                duration: 0.3
            })
            .to(notification, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                delay: 2
            })
            .then(() => {
                notification.remove();
            });
    },

    animateEmailClick(email) {
        gsap.timeline()
            .to(email, {
                scale: 0.95,
                duration: 0.1
            })
            .to(email, {
                scale: 1,
                duration: 0.2
            });
    }
};
