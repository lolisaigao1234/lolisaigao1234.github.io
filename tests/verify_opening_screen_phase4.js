import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentPath = path.join(projectRoot, 'src', 'components', 'opening-screen');

console.log('Verifying Opening Screen Phase 4 Implementation...');

const cssContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.css'), 'utf8');
const tsContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.ts'), 'utf8');
const htmlContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.html'), 'utf8');

let passed = true;

// 1. Reduced Motion
if (cssContent.includes('@media (prefers-reduced-motion: reduce)') && tsContent.includes('prefers-reduced-motion')) {
    console.log('✅ Reduced Motion support found in CSS and TS');
} else {
    console.error('❌ Missing Reduced Motion support');
    passed = false;
}

// 2. Will-Change
if (cssContent.includes('will-change: transform')) {
    console.log('✅ Performance optimizations (will-change) found');
} else {
    console.error('❌ Missing will-change optimizations');
    passed = false;
}

// 3. Aria Hidden
if (htmlContent.includes('aria-hidden="true"')) {
    console.log('✅ Accessibility (aria-hidden) found');
} else {
    console.error('❌ Missing aria-hidden attribute');
    passed = false;
}

if (passed) {
    console.log('🎉 Phase 4 Verification Passed!');
} else {
    process.exit(1);
}
