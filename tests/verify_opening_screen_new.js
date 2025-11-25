/**
 * Static Verification Test for Opening Screen Component
 * 
 * This test validates the file structure, content, and implementation
 * without running Angular's test framework. Useful for CI/CD pipelines
 * and quick validation.
 * 
 * Run with: node tests/verify_opening_screen_new.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentPath = path.join(projectRoot, 'src', 'components', 'opening-screen');
const appComponentPath = path.join(projectRoot, 'src', 'app.component.ts');
const appHtmlPath = path.join(projectRoot, 'src', 'app.component.html');

// Test utilities
let passCount = 0;
let failCount = 0;

function pass(message) {
    console.log(`  ✅ ${message}`);
    passCount++;
}

function fail(message, detail = '') {
    console.error(`  ❌ ${message}`);
    if (detail) console.error(`     ${detail}`);
    failCount++;
}

function assert(condition, passMessage, failMessage, detail = '') {
    if (condition) {
        pass(passMessage);
    } else {
        fail(failMessage, detail);
    }
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        return null;
    }
}

// ===============================================
// TEST EXECUTION
// ===============================================

console.log('\n🔍 Opening Screen Component Verification\n');
console.log('='.repeat(50));

// -----------------------------------------------
// 1. File Existence
// -----------------------------------------------
console.log('\n📁 1. File Structure\n');

const requiredFiles = [
    { path: path.join(componentPath, 'opening-screen.component.ts'), name: 'Component TypeScript' },
    { path: path.join(componentPath, 'opening-screen.component.html'), name: 'Component Template' },
    { path: path.join(componentPath, 'opening-screen.component.css'), name: 'Component Styles' },
    { path: path.join(componentPath, 'opening-screen.component.spec.ts'), name: 'Unit Tests' }
];

requiredFiles.forEach(file => {
    assert(
        fs.existsSync(file.path),
        `${file.name} exists`,
        `${file.name} MISSING`,
        `Expected at: ${file.path}`
    );
});

// -----------------------------------------------
// 2. TypeScript Component Analysis
// -----------------------------------------------
console.log('\n📝 2. TypeScript Component\n');

const tsContent = readFile(path.join(componentPath, 'opening-screen.component.ts'));
if (tsContent) {
    // Core Angular features
    assert(
        tsContent.includes('@Component'),
        'Has @Component decorator',
        'Missing @Component decorator'
    );

    assert(
        tsContent.includes('standalone: true'),
        'Is standalone component',
        'Not a standalone component'
    );

    assert(
        tsContent.includes('ChangeDetectionStrategy.OnPush'),
        'Uses OnPush change detection',
        'Missing OnPush change detection (performance concern)'
    );

    // State management
    assert(
        tsContent.includes('signal<AnimationState>') || tsContent.includes("signal<'idle'"),
        'Uses signal for state management',
        'Missing signal-based state management'
    );

    assert(
        tsContent.includes("@Output() animationComplete"),
        'Has animationComplete output',
        'Missing animationComplete output event'
    );

    // Lifecycle & cleanup
    assert(
        tsContent.includes('ngOnDestroy'),
        'Implements OnDestroy for cleanup',
        'Missing ngOnDestroy lifecycle hook'
    );

    assert(
        tsContent.includes('clearTimeout'),
        'Clears timers on destroy',
        'Missing timer cleanup (memory leak risk)'
    );

    // Accessibility
    assert(
        tsContent.includes('prefers-reduced-motion'),
        'Checks for reduced motion preference',
        'Missing reduced motion accessibility check'
    );

    assert(
        tsContent.includes('isPlatformBrowser'),
        'Has SSR safety check',
        'Missing platform browser check (SSR unsafe)'
    );

    // Import check (critical bug fix)
    assert(
        tsContent.includes("from '@angular/common'"),
        'Imports from @angular/common',
        'Missing CommonModule import'
    );
} else {
    fail('Could not read TypeScript file');
}

// -----------------------------------------------
// 3. Template Analysis
// -----------------------------------------------
console.log('\n🎨 3. HTML Template\n');

const htmlContent = readFile(path.join(componentPath, 'opening-screen.component.html'));
if (htmlContent) {
    // Structure
    assert(
        htmlContent.includes('class="opening-screen-container"') ||
        htmlContent.includes('class="fixed inset-0"'),
        'Has full-screen container',
        'Missing full-screen container'
    );

    // State bindings
    assert(
        htmlContent.includes('isRevealing()') || htmlContent.includes("state() === 'revealing'"),
        'Has revealing state binding',
        'Missing revealing state binding'
    );

    assert(
        htmlContent.includes('isFlashing()') || htmlContent.includes("state() === 'flashing'"),
        'Has flashing state binding',
        'Missing flashing state binding'
    );

    assert(
        htmlContent.includes('isComplete()') || htmlContent.includes("state() === 'complete'"),
        'Has complete state binding',
        'Missing complete state binding'
    );

    // Accessibility
    assert(
        htmlContent.includes('aria-hidden'),
        'Has aria-hidden attribute',
        'Missing aria-hidden (accessibility issue)'
    );

    assert(
        htmlContent.includes('role="presentation"') || htmlContent.includes('aria-hidden="true"'),
        'Marked as decorative/presentation',
        'Not marked as decorative element'
    );

    // Skip functionality
    assert(
        htmlContent.includes('skipAnimation()') || htmlContent.includes('(click)'),
        'Has skip animation capability',
        'Missing skip animation click handler'
    );

    // *ngIf usage
    assert(
        htmlContent.includes('*ngIf'),
        'Uses *ngIf directives',
        'No *ngIf directives found'
    );
} else {
    fail('Could not read HTML file');
}

// -----------------------------------------------
// 4. CSS Analysis
// -----------------------------------------------
console.log('\n🎭 4. CSS Styles\n');

const cssContent = readFile(path.join(componentPath, 'opening-screen.component.css'));
if (cssContent) {
    // Keyframe animations
    const requiredKeyframes = ['prism-pulse', 'flash-burst', 'ripple-expand'];
    requiredKeyframes.forEach(kf => {
        assert(
            cssContent.includes(`@keyframes ${kf}`),
            `Has @keyframes ${kf}`,
            `Missing @keyframes ${kf}`
        );
    });

    // Performance
    assert(
        cssContent.includes('will-change'),
        'Uses will-change for GPU optimization',
        'Missing will-change (performance concern)'
    );

    // Reduced motion
    assert(
        cssContent.includes('@media (prefers-reduced-motion: reduce)'),
        'Has reduced motion media query',
        'Missing reduced motion media query (a11y issue)'
    );

    assert(
        cssContent.includes('animation: none !important'),
        'Disables animations for reduced motion',
        'Animations not disabled for reduced motion preference'
    );

    // Z-index
    assert(
        cssContent.includes('z-index:') &&
        (cssContent.includes('z-index: 9999') || cssContent.includes('z-index: 50') || cssContent.includes('z-50')),
        'Has appropriate z-index',
        'Missing or low z-index (may not overlay correctly)'
    );

    // Backdrop filter
    assert(
        cssContent.includes('backdrop-filter') || cssContent.includes('-webkit-backdrop-filter'),
        'Uses backdrop-filter for blur',
        'Missing backdrop-filter'
    );
} else {
    fail('Could not read CSS file');
}

// -----------------------------------------------
// 5. AppComponent Integration
// -----------------------------------------------
console.log('\n🔗 5. AppComponent Integration\n');

const appTsContent = readFile(appComponentPath);
if (appTsContent) {
    // Critical fix: CommonModule import
    assert(
        appTsContent.includes("import { CommonModule }") ||
        appTsContent.includes("CommonModule"),
        'AppComponent imports CommonModule',
        'CRITICAL: AppComponent missing CommonModule import (breaks *ngIf)'
    );

    assert(
        appTsContent.includes('CommonModule') &&
        appTsContent.includes('imports:'),
        'CommonModule in imports array',
        'CRITICAL: CommonModule not in imports array'
    );

    assert(
        appTsContent.includes('OpeningScreenComponent'),
        'Imports OpeningScreenComponent',
        'Missing OpeningScreenComponent import'
    );

    assert(
        appTsContent.includes('showOpeningScreen = signal(true)'),
        'Has showOpeningScreen signal',
        'Missing showOpeningScreen signal'
    );

    assert(
        appTsContent.includes('onOpeningAnimationComplete'),
        'Has animation complete handler',
        'Missing onOpeningAnimationComplete method'
    );
} else {
    fail('Could not read AppComponent TypeScript');
}

const appHtmlContent = readFile(appHtmlPath);
if (appHtmlContent) {
    assert(
        appHtmlContent.includes('<app-opening-screen'),
        'Uses <app-opening-screen> in template',
        'Missing <app-opening-screen> component usage'
    );

    assert(
        appHtmlContent.includes('(animationComplete)'),
        'Binds to animationComplete event',
        'Missing (animationComplete) binding'
    );

    assert(
        appHtmlContent.includes('*ngIf="showOpeningScreen()"'),
        'Conditional rendering with signal',
        'Missing *ngIf binding to showOpeningScreen signal'
    );
} else {
    fail('Could not read AppComponent HTML');
}

// -----------------------------------------------
// 6. Unit Test Coverage Check
// -----------------------------------------------
console.log('\n🧪 6. Unit Test Coverage\n');

const specContent = readFile(path.join(componentPath, 'opening-screen.component.spec.ts'));
if (specContent) {
    const testCategories = [
        { pattern: 'Component Creation', name: 'Creation tests' },
        { pattern: 'Animation State', name: 'State transition tests' },
        { pattern: 'Timing', name: 'Timing tests' },
        { pattern: 'Event Emission', name: 'Event emission tests' },
        { pattern: 'Reduced Motion', name: 'Reduced motion tests' },
        { pattern: 'Skip Animation', name: 'Skip animation tests' },
        { pattern: 'Cleanup', name: 'Cleanup/memory tests' },
        { pattern: 'fakeAsync', name: 'Async testing utilities' }
    ];

    testCategories.forEach(cat => {
        assert(
            specContent.includes(cat.pattern),
            `Has ${cat.name}`,
            `Missing ${cat.name}`
        );
    });
} else {
    fail('Could not read spec file');
}

// ===============================================
// SUMMARY
// ===============================================

console.log('\n' + '='.repeat(50));
console.log('\n📊 VERIFICATION SUMMARY\n');

const totalTests = passCount + failCount;
const passRate = totalTests > 0 ? ((passCount / totalTests) * 100).toFixed(1) : 0;

console.log(`   Total Checks: ${totalTests}`);
console.log(`   Passed: ${passCount} (${passRate}%)`);
console.log(`   Failed: ${failCount}`);

if (failCount === 0) {
    console.log('\n🎉 ALL VERIFICATIONS PASSED!\n');
    process.exit(0);
} else {
    console.log('\n💥 VERIFICATION FAILED - See errors above\n');
    process.exit(1);
}