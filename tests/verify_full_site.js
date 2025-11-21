const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join('src', 'app', 'app.html');
const appTsPath = path.join('src', 'app', 'app.ts');

try {
    const appHtml = fs.readFileSync(appHtmlPath, 'utf8');
    const appTs = fs.readFileSync(appTsPath, 'utf8');

    const components = ['app-hero', 'app-about', 'app-experience', 'app-skills', 'app-projects', 'app-contact'];
    const imports = ['Hero', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

    const missingHtml = components.filter(c => !appHtml.includes(c));
    const missingTs = imports.filter(i => !appTs.includes(i));

    if (missingHtml.length > 0 || missingTs.length > 0) {
        console.error('❌ Final Verification Failed!');
        if (missingHtml.length > 0) console.error('Missing in HTML:', missingHtml);
        if (missingTs.length > 0) console.error('Missing in TS:', missingTs);
        process.exit(1);
    }

    console.log('✅ Final Verification Passed: All core components (Hero, About, Experience, Skills, Projects, Contact) are integrated.');
} catch (error) {
    console.error('❌ Final Verification Failed:', error.message);
    process.exit(1);
}
