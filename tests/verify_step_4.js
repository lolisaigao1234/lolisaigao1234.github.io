const fs = require('fs');
const path = require('path');

const skillsHtmlPath = path.join('src', 'app', 'components', 'skills', 'skills.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check Skills HTML content
    const skillsContent = fs.readFileSync(skillsHtmlPath, 'utf8');
    if (!skillsContent.includes('Python') || !skillsContent.includes('PyTorch')) {
        throw new Error('Skills component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-skills></app-skills>')) {
        throw new Error('App HTML does not include <app-skills>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('Skills')) {
        throw new Error('App TS does not import Skills component.');
    }

    console.log('✅ Step 4 Verification Passed: Skills component created and integrated.');
} catch (error) {
    console.error('❌ Step 4 Verification Failed:', error.message);
    process.exit(1);
}
