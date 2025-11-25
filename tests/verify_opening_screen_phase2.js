import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentPath = path.join(projectRoot, 'src', 'components', 'opening-screen');

console.log('Verifying Opening Screen Phase 2 Implementation...');

// 1. Verify CSS Keyframes
const cssContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.css'), 'utf8');
const expectedKeyframes = [
    '@keyframes prism-pulse',
    '@keyframes flash-burst',
    '@keyframes ripple-expand'
];

let cssPass = true;
expectedKeyframes.forEach(kf => {
    if (cssContent.includes(kf)) {
        console.log(`✅ CSS contains ${kf}`);
    } else {
        console.error(`❌ CSS missing ${kf}`);
        cssPass = false;
    }
});

// 2. Verify TypeScript Logic
const tsContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.ts'), 'utf8');
const expectedLogic = [
    'state = signal',
    'setTimeout',
    "this.state.set('flashing')",
    "this.state.set('revealing')",
    "this.state.set('finished')"
];

let tsPass = true;
expectedLogic.forEach(logic => {
    if (tsContent.includes(logic)) {
        console.log(`✅ TS contains logic: ${logic}`);
    } else {
        console.error(`❌ TS missing logic: ${logic}`);
        tsPass = false;
    }
});

// 3. Verify HTML Bindings
const htmlContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.html'), 'utf8');
const expectedBindings = [
    "[class.opacity-0]=\"state() === 'revealing'\"",
    "*ngIf=\"state() === 'flashing'\""
];

let htmlPass = true;
expectedBindings.forEach(binding => {
    if (htmlContent.includes(binding)) {
        console.log(`✅ HTML contains binding: ${binding}`);
    } else {
        console.error(`❌ HTML missing binding: ${binding}`);
        htmlPass = false;
    }
});

if (cssPass && tsPass && htmlPass) {
    console.log('🎉 Phase 2 Verification Passed!');
} else {
    console.error('Phase 2 Verification Failed.');
    process.exit(1);
}
