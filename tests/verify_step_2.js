const fs = require('fs');
const path = require('path');

const heroHtmlPath = path.join('src', 'app', 'components', 'hero', 'hero.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check Hero HTML content
    const heroContent = fs.readFileSync(heroHtmlPath, 'utf8');
    if (!heroContent.includes('Rocky Wu') || !heroContent.includes('bg-purple-600/30')) {
        throw new Error('Hero component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-hero></app-hero>')) {
        throw new Error('App HTML does not include <app-hero>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('Hero')) {
        throw new Error('App TS does not import Hero component.');
    }
    console.log('✅ Step 2 Verification Passed: Hero component created and integrated.');
} catch (error) {
    console.error('❌ Step 2 Verification Failed:', error.message);
    process.exit(1);
}
