const fs = require('fs');
const path = require('path');

const projectsHtmlPath = path.join('src', 'app', 'components', 'projects', 'projects.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check Projects HTML content
    const projectsContent = fs.readFileSync(projectsHtmlPath, 'utf8');

    // Checking for substrings that are less likely to be broken by formatting
    if (!projectsContent.includes('Tax & Portfolio') || !projectsContent.includes('NLP-to-SQL')) {
        throw new Error('Projects component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-projects></app-projects>')) {
        throw new Error('App HTML does not include <app-projects>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('Projects')) {
        throw new Error('App TS does not import Projects component.');
    }

    console.log('✅ Step 6 Verification Passed: Projects component created and integrated.');
} catch (error) {
    console.error('❌ Step 6 Verification Failed:', error.message);
    process.exit(1);
}
