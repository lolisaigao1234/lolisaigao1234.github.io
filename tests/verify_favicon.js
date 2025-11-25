import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(projectRoot, 'index.html');
const faviconPath = path.join(projectRoot, 'src', 'assets', 'favicon.png');

console.log('Verifying favicon implementation...');

// 1. Check if favicon file exists
if (fs.existsSync(faviconPath)) {
    console.log('✅ Favicon file found at src/assets/favicon.png');
} else {
    console.error('❌ Favicon file NOT found at src/assets/favicon.png');
    process.exit(1);
}

// 2. Check index.html for correct link
const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
const expectedLink = '<link rel="icon" type="image/png" href="src/assets/favicon.png">';

if (indexContent.includes(expectedLink)) {
    console.log('✅ index.html contains correct favicon link');
} else {
    console.error('❌ index.html does NOT contain correct favicon link');
    console.log('Expected:', expectedLink);
    process.exit(1);
}

console.log('🎉 Favicon verification passed!');
