/**
 * Contact Form Module
 * Handles form validation and submission
 */

export const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = field.parentElement.querySelector('.error-message');

        let error = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    error = 'Name is required';
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters';
                }
                break;

            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!this.isValidEmail(value)) {
                    error = 'Please enter a valid email address';
                }
                break;

            case 'message':
                if (!value) {
                    error = 'Message is required';
                } else if (value.length < 10) {
                    error = 'Message must be at least 10 characters';
                }
                break;
        }

        if (error) {
            this.showError(field, error);
            return false;
        } else {
            this.clearError(field);
            return true;
        }
    },

    showError(field, message) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.classList.add('error');
    },

    clearError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    },

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);

        // For actual implementation, use:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // Or use Formspree/EmailJS/Netlify Forms
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? 'var(--accent-blue)' : 'var(--accent-pink)'};
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 0.95rem;
            z-index: 10001;
            opacity: 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(notification);

        if (typeof gsap !== 'undefined') {
            gsap.timeline()
                .to(notification, {
                    opacity: 1,
                    y: 10,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                })
                .to(notification, {
                    opacity: 0,
                    y: -10,
                    duration: 0.3,
                    delay: 3
                })
                .then(() => {
                    notification.remove();
                });
        } else {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => notification.remove(), 3500);
        }
    }
};
