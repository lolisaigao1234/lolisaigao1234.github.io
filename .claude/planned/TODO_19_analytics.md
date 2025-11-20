# TODO #19: Analytics & Tracking

**Priority:** LOW | **Difficulty:** Low | **Time:** 0.5 day | **Status:** 📋 Planned

## Overview
Implement analytics to track visitor behavior, page performance, and engagement metrics.

## Options

### Option 1: Google Analytics 4 (GA4)
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Option 2: Plausible Analytics (Privacy-friendly)
```html
<script defer data-domain="lolisaigao1234.github.io" src="https://plausible.io/js/script.js"></script>
```

**Benefits:**
- ✅ No cookies
- ✅ GDPR compliant
- ✅ Lightweight (<1KB)
- ✅ Simple dashboard

### Option 3: Umami (Self-hosted)
- Open source
- Privacy-focused
- Own your data

## Custom Event Tracking
```javascript
// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    gtag('event', 'button_click', {
      button_text: btn.textContent,
      button_location: btn.dataset.location
    });
  });
});

// Track project views
function trackProjectView(projectName) {
  gtag('event', 'project_view', {
    project_name: projectName
  });
}

// Track accordion opens
function trackAccordionOpen(title) {
  gtag('event', 'accordion_open', {
    section: title
  });
}
```

## Metrics to Track
- Page views
- Unique visitors
- Session duration
- Bounce rate
- Button/link clicks
- Project card interactions
- Contact form submissions

**Recommendation:** Start with Plausible for privacy-friendly analytics
