# TODO #21: SEO Optimization

**Priority:** HIGH | **Difficulty:** Low | **Time:** 1 day | **Status:** 📋 Planned

## Overview
Optimize the website for search engines to improve discoverability and ranking.

## Key Optimizations

### 1. Meta Tags
```html
<head>
  <!-- Essential Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rocky Wu | Data Analyst & ML Engineer Portfolio</title>
  <meta name="description" content="Rocky Wu's portfolio showcasing data analytics, machine learning projects, and professional experience in quantitative finance and cloud computing.">
  <meta name="keywords" content="data analyst, machine learning engineer, cloud computing, Python, AWS, portfolio">
  <meta name="author" content="Rocky Wu (JiaYang Wu)">

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://lolisaigao1234.github.io/">
  <meta property="og:title" content="Rocky Wu | Data Analyst & ML Engineer">
  <meta property="og:description" content="Portfolio showcasing data analytics and machine learning projects">
  <meta property="og:image" content="https://lolisaigao1234.github.io/og-image.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Rocky Wu | Data Analyst & ML Engineer">
  <meta name="twitter:description" content="Portfolio showcasing data analytics and machine learning projects">
  <meta name="twitter:image" content="https://lolisaigao1234.github.io/twitter-card.jpg">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://lolisaigao1234.github.io/">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

### 2. Structured Data (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "JiaYang Wu",
  "alternateName": "Rocky Wu",
  "url": "https://lolisaigao1234.github.io",
  "image": "https://lolisaigao1234.github.io/profile.jpg",
  "sameAs": [
    "https://github.com/lolisaigao1234",
    "https://linkedin.com/in/jiayang-wu-85b960179"
  ],
  "jobTitle": "Data Analyst & ML Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "ActionTec Electronics"
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "University of Illinois at Urbana-Champaign"
  }
}
</script>
```

### 3. Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lolisaigao1234.github.io/</loc>
    <lastmod>2025-11-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add project pages here when created -->
</urlset>
```

### 4. Robots.txt
```
User-agent: *
Allow: /

Sitemap: https://lolisaigao1234.github.io/sitemap.xml
```

### 5. Performance Optimization (SEO Factor)
- Lighthouse score >90
- Fast loading time
- Mobile-friendly
- HTTPS enabled

### 6. Content Optimization
- [ ] Use descriptive headings (H1, H2, H3)
- [ ] Add alt text to images
- [ ] Use semantic HTML
- [ ] Internal linking (when multiple pages exist)
- [ ] Descriptive URLs

## Testing & Validation
- **Google Search Console** - Submit sitemap
- **Google Rich Results Test** - Validate structured data
- **Lighthouse SEO** - Audit SEO score
- **Mobile-Friendly Test** - Verify mobile optimization

**Target:** Lighthouse SEO score >95, appear in search results for "Rocky Wu data analyst"
