const fs = require('fs');
const path = require('path');

const aboutHtmlPath = path.join('src', 'app', 'components', 'about', 'about.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check About HTML content
    const aboutContent = fs.readFileSync(aboutHtmlPath, 'utf8');

    if (!aboutContent.includes('Rocky Wu') || !aboutContent.includes('UIUC')) {
        throw new Error('About component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-about></app-about>')) {
        throw new Error('App HTML does not include <app-about>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('About')) {
        throw new Error('App TS does not import About component.');
    }

    console.log('✅ Step 7 Verification Passed: About component created and integrated.');
} catch (error) {
    console.error('❌ Step 7 Verification Failed:', error.message);
    process.exit(1);
}
