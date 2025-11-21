/**
 * Accordion Module
 * Manages accordion expand/collapse behavior
 */

export const Accordion = {
    init() {
        // Set up click handlers for all accordion headers
        document.querySelectorAll('.accordion-header').forEach(header => {
            // Remove inline onclick if exists
            header.removeAttribute('onclick');
            header.addEventListener('click', () => this.toggle(header));
        });

        // Open first accordion by default
        const firstAccordion = document.querySelector('.accordion-item');
        if (firstAccordion) {
            firstAccordion.classList.add('active');
        }
    },

    toggle(header) {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // If the clicked item wasn't active, open it
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    }
};

// Legacy function for backwards compatibility (if needed)
window.toggleAccordion = function(header) {
    Accordion.toggle(header);
};
