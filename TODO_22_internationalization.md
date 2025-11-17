# TODO #22: Internationalization (i18n)

**Priority:** LOW | **Difficulty:** High | **Time:** 1 week | **Status:** 📋 Planned

## Overview
Add multi-language support to make the portfolio accessible to international audiences (English, Chinese).

## Implementation Approach

### Option 1: Vue I18n (If using Vue)
```javascript
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    hero: {
      title: 'Rocky Wu',
      subtitle: 'Data Analyst | ML Engineer | Cloud Computing Specialist'
    },
    about: {
      title: 'About Me',
      description: 'Hi, I\'m Rocky Wu...'
    }
  },
  zh: {
    hero: {
      title: '吴佳扬',
      subtitle: '数据分析师 | 机器学习工程师 | 云计算专家'
    },
    about: {
      title: '关于我',
      description: '你好，我是吴佳扬...'
    }
  }
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});
```

### Option 2: Vanilla JS
```javascript
const translations = {
  en: { /* ... */ },
  zh: { /* ... */ }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = getNestedValue(translations[lang], key);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);
}
```

### Language Switcher
```html
<div class="language-switcher">
  <button onclick="setLanguage('en')">EN</button>
  <button onclick="setLanguage('zh')">中文</button>
</div>
```

## Considerations
- Right-to-left (RTL) support (if adding Arabic, Hebrew)
- Date/number formatting
- Currency formatting (if applicable)
- Different content length (layout adjustments)
- SEO (hreflang tags)

```html
<link rel="alternate" hreflang="en" href="https://lolisaigao1234.github.io/en" />
<link rel="alternate" hreflang="zh" href="https://lolisaigao1234.github.io/zh" />
```

**Recommendation:** Implement only if targeting international audience
