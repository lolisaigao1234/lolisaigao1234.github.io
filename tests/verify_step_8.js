const fs = require('fs');
const path = require('path');

const contactHtmlPath = path.join('src', 'app', 'components', 'contact', 'contact.html');
const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    // Check Contact HTML content
    const contactContent = fs.readFileSync(contactHtmlPath, 'utf8');

    // Check for substrings that account for formatting
    if (!contactContent.includes('Get In') || !contactContent.includes('illinois')) {
        throw new Error('Contact component HTML missing expected content.');
    }

    // Check App HTML integration
    const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
    if (!appHtmlContent.includes('<app-contact></app-contact>')) {
        throw new Error('App HTML does not include <app-contact>.');
    }

    // Check App TS import
    const appTsContent = fs.readFileSync(appTsPath, 'utf8');
    if (!appTsContent.includes('Contact')) {
        throw new Error('App TS does not import Contact component.');
    }

    console.log('✅ Step 8 Verification Passed: Contact component created and integrated.');
} catch (error) {
    console.error('❌ Step 8 Verification Failed:', error.message);
    process.exit(1);
}
