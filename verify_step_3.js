const fs = require('fs');
const path = require('path');

const experienceHtmlPath = path.join('src', 'app', 'components', 'experience', 'experience.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check Experience HTML content
    const expContent = fs.readFileSync(experienceHtmlPath, 'utf8');
    if (!expContent.includes('ActionTec') || !expContent.includes('AiFinSphere')) {
        throw new Error('Experience component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-experience></app-experience>')) {
        throw new Error('App HTML does not include <app-experience>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('Experience')) {
        throw new Error('App TS does not import Experience component.');
    }

    console.log('✅ Step 3 Verification Passed: Experience component created and integrated.');
} catch (error) {
    console.error('❌ Step 3 Verification Failed:', error.message);
    process.exit(1);
}
