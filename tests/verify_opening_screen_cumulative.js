import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentPath = path.join(projectRoot, 'src', 'components', 'opening-screen');
const appComponentPath = path.join(projectRoot, 'src', 'app.component.ts');
const appHtmlPath = path.join(projectRoot, 'src', 'app.component.html');

console.log('Running Extensive Cumulative Verification (Phases 1-4)...');

let passed = true;
function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
        passed = false;
    }
}

// --- Phase 1: Static Structure & Files ---
console.log('\n--- Phase 1: Structure ---');
assert(fs.existsSync(path.join(componentPath, 'opening-screen.component.ts')), 'Component TS exists');
assert(fs.existsSync(path.join(componentPath, 'opening-screen.component.html')), 'Component HTML exists');
assert(fs.existsSync(path.join(componentPath, 'opening-screen.component.css')), 'Component CSS exists');

const htmlContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.html'), 'utf8');
assert(htmlContent.includes('fixed inset-0'), 'Full screen positioning');
assert(htmlContent.includes('z-50'), 'High Z-Index (z-50)');
assert(htmlContent.includes('backdrop-blur'), 'Backdrop blur effect');

// --- Phase 2: Animation Logic ---
console.log('\n--- Phase 2: Animation ---');
const cssContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.css'), 'utf8');
assert(cssContent.includes('@keyframes prism-pulse'), 'Pulse keyframes');
assert(cssContent.includes('@keyframes flash-burst'), 'Flash keyframes');
assert(cssContent.includes('@keyframes ripple-expand'), 'Ripple keyframes');

const tsContent = fs.readFileSync(path.join(componentPath, 'opening-screen.component.ts'), 'utf8');
assert(tsContent.includes("state = signal<'frozen'"), 'Signal state management');
assert(tsContent.includes("this.state.set('flashing')"), 'State transition: flashing');
assert(tsContent.includes("this.state.set('revealing')"), 'State transition: revealing');

// --- Phase 3: Integration ---
console.log('\n--- Phase 3: Integration ---');
assert(tsContent.includes('@Output() animationComplete'), 'Output emitter defined');
assert(tsContent.includes('this.animationComplete.emit()'), 'Output emitter called');

const appTsContent = fs.readFileSync(appComponentPath, 'utf8');
assert(appTsContent.includes('OpeningScreenComponent'), 'Imported in AppComponent');
assert(appTsContent.includes('showOpeningScreen = signal(true)'), 'AppComponent state signal');

const appHtmlContent = fs.readFileSync(appHtmlPath, 'utf8');
assert(appHtmlContent.includes('<app-opening-screen'), 'Used in App Template');
assert(appHtmlContent.includes('(animationComplete)='), 'Event binding wired up');

// --- Phase 4: Polish & Optimization (Edge Cases) ---
console.log('\n--- Phase 4: Polish & Edge Cases ---');

// 1. Reduced Motion
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'CSS Media Query for Reduced Motion');
assert(cssContent.includes('animation: none !important'), 'Animations disabled in reduced motion');
assert(tsContent.includes('prefers-reduced-motion'), 'TS checks for reduced motion preference');
assert(tsContent.includes('isPlatformBrowser'), 'Platform check for SSR safety');

// 2. Performance (Will-Change)
assert(cssContent.includes('will-change: transform'), 'will-change optimization applied');

// 3. Accessibility & Interaction
assert(htmlContent.includes('aria-hidden="true"'), 'aria-hidden for decorative intro');
assert(htmlContent.includes('pointer-events-none'), 'Pointer events disabled when finished');
assert(htmlContent.includes('[class.hidden]="state() === \'finished\'"'), 'Hidden from DOM/Layout when finished');

// 4. Timing Logic
// We can't execute the timer in static analysis, but we can check the logic flow
assert(tsContent.includes('setTimeout'), 'Timers used for sequencing');
assert(tsContent.includes('1500'), '1.5s delay present');

if (passed) {
    console.log('\n🎉 ALL SYSTEMS GO: Cumulative Verification Passed!');
} else {
    console.error('\n💥 Verification Failed. Check errors above.');
    process.exit(1);
}
