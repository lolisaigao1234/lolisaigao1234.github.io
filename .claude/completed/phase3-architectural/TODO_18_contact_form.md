# TODO #18: Contact Form with Validation

**Priority:** MEDIUM | **Difficulty:** Low | **Time:** 1 day | **Status:** 📋 Planned

## Overview
Add a functional contact form with validation and submission handling.

## Features

### 1. Form HTML
```html
<form id="contact-form" class="glass">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" required>
    <span class="error-message"></span>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" required>
    <span class="error-message"></span>
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" rows="5" required></textarea>
    <span class="error-message"></span>
  </div>

  <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

### 2. Client-Side Validation
```javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateForm(formData) {
  const errors = {};

  if (!formData.name || formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.message || formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}
```

### 3. Form Submission Options

**Option A: Formspree (Easiest)**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Form fields -->
</form>
```

**Option B: Netlify Forms**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- Form fields -->
</form>
```

**Option C: EmailJS (Client-side)**
```javascript
emailjs.send('service_id', 'template_id', {
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message
});
```

### 4. Success/Error Feedback
- Toast notification on success
- Inline error messages
- Loading state during submission
- Form reset after success

**Related:** TODO #13 (Microinteractions for feedback)
