import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const srcPath = path.join(projectRoot, 'src');

console.log('Verifying Opening Screen Phase 3 Implementation...');

// 1. Verify OpeningScreenComponent emits event
const openingScreenTsPath = path.join(srcPath, 'components', 'opening-screen', 'opening-screen.component.ts');
const openingScreenTs = fs.readFileSync(openingScreenTsPath, 'utf8');

if (openingScreenTs.includes('@Output() animationComplete') && openingScreenTs.includes('this.animationComplete.emit()')) {
    console.log('✅ OpeningScreenComponent emits animationComplete event');
} else {
    console.error('❌ OpeningScreenComponent missing Output emitter');
    process.exit(1);
}

// 2. Verify AppComponent imports and uses it
const appComponentTsPath = path.join(srcPath, 'app.component.ts');
const appComponentTs = fs.readFileSync(appComponentTsPath, 'utf8');

if (appComponentTs.includes('OpeningScreenComponent') && appComponentTs.includes('showOpeningScreen = signal(true)')) {
    console.log('✅ AppComponent imports OpeningScreenComponent and has signal state');
} else {
    console.error('❌ AppComponent missing import or signal state');
    process.exit(1);
}

// 3. Verify AppComponent HTML implementation
const appComponentHtmlPath = path.join(srcPath, 'app.component.html');
const appComponentHtml = fs.readFileSync(appComponentHtmlPath, 'utf8');

if (appComponentHtml.includes('<app-opening-screen') && appComponentHtml.includes('(animationComplete)="onOpeningAnimationComplete()"')) {
    console.log('✅ AppComponent HTML implements <app-opening-screen> with event binding');
} else {
    console.error('❌ AppComponent HTML missing component tag or event binding');
    process.exit(1);
}

console.log('🎉 Phase 3 Verification Passed!');
