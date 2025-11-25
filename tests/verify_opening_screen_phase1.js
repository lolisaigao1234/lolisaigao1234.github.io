import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentPath = path.join(projectRoot, 'src', 'components', 'opening-screen');

console.log('Verifying Opening Screen Phase 1 Implementation...');

// 1. Check File Existence
const files = [
    'opening-screen.component.ts',
    'opening-screen.component.html',
    'opening-screen.component.css'
];

let allFilesExist = true;
files.forEach(file => {
    if (fs.existsSync(path.join(componentPath, file))) {
        console.log(`✅ Found ${file}`);
    } else {
        console.error(`❌ Missing ${file}`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.error('Phase 1 Verification Failed: Missing files.');
    process.exit(1);
}

// 2. Check HTML Content for Key Elements
const htmlContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.html'), 'utf8');
const checks = [
    { pattern: 'fixed inset-0', name: 'Full Screen Container' },
    { pattern: 'backdrop-blur-3xl', name: 'Frozen Glass Effect' },
    { pattern: 'prism-container', name: 'Prism Element' },
    { pattern: 'z-50', name: 'High Z-Index' }
];

let allChecksPassed = true;
checks.forEach(check => {
    if (htmlContent.includes(check.pattern)) {
        console.log(`✅ HTML contains ${check.name}`);
    } else {
        console.error(`❌ HTML missing ${check.name} (expected '${check.pattern}')`);
        allChecksPassed = false;
    }
});

if (allChecksPassed) {
    console.log('🎉 Phase 1 Verification Passed!');
} else {
    console.error('Phase 1 Verification Failed: HTML content mismatch.');
    process.exit(1);
}
