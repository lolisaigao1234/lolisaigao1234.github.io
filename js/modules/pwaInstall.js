/**
 * PWA Install Module
 * Handles PWA installation prompt and service worker registration
 */

export const PWAInstall = {
    deferredPrompt: null,
    updateNotificationShown: false,

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
    },

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('[PWA] Service Worker registered:', registration.scope);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.error('[PWA] Service Worker registration failed:', error);
            }
        }
    },

    setupInstallPrompt() {
        // Capture the install prompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Store the event for later use
            this.deferredPrompt = e;
            // Show custom install button
            this.showInstallButton();
        });

        // Detect if app is already installed
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            this.hideInstallButton();
            this.deferredPrompt = null;
        });
    },

    showInstallButton() {
        // Check if user has already dismissed the install prompt
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) return;

        // Create install button
        const installBtn = document.createElement('button');
        installBtn.id = 'pwa-install-btn';
        installBtn.className = 'pwa-install-btn glass';
        installBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2v12M10 14l-4-4M10 14l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 18h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>Install App</span>
            <button class="pwa-install-close" aria-label="Dismiss">&times;</button>
        `;

        document.body.appendChild(installBtn);

        // Handle install button click
        installBtn.addEventListener('click', (e) => {
            if (e.target.classList.contains('pwa-install-close')) {
                this.dismissInstallPrompt();
                return;
            }
            this.promptInstall();
        });

        // Animate in
        setTimeout(() => installBtn.classList.add('show'), 100);
    },

    hideInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.classList.remove('show');
            setTimeout(() => installBtn.remove(), 300);
        }
    },

    async promptInstall() {
        if (!this.deferredPrompt) return;

        // Show the install prompt
        this.deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`[PWA] User response: ${outcome}`);

        // Clear the prompt
        this.deferredPrompt = null;
        this.hideInstallButton();
    },

    dismissInstallPrompt() {
        localStorage.setItem('pwa-install-dismissed', 'true');
        this.hideInstallButton();
    },

    showUpdateNotification() {
        // Prevent showing multiple notifications and infinite refresh loops
        if (this.updateNotificationShown) return;
        this.updateNotificationShown = true;

        const notification = document.createElement('div');
        notification.className = 'pwa-update-notification glass';
        notification.innerHTML = `
            <p>A new version is available!</p>
            <button class="btn btn-primary btn-small">Reload</button>
        `;

        document.body.appendChild(notification);

        // Handle reload button
        notification.querySelector('button').addEventListener('click', () => {
            window.location.reload();
        });

        // Auto-show
        setTimeout(() => notification.classList.add('show'), 100);
    }
};
