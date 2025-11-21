
const fs = require('fs');
const path = require('path');

const components = [
    { name: 'hero', hasSignal: false, hasLoop: false },
    { name: 'about', hasSignal: true, hasLoop: true },
    { name: 'projects', hasSignal: true, hasLoop: true },
    { name: 'contact', hasSignal: false, hasLoop: false },
    { name: 'experience', hasSignal: true, hasLoop: true },
    { name: 'skills', hasSignal: true, hasLoop: true }
];

let errors = 0;

components.forEach(comp => {
    const dir = path.join('src', 'app', 'components', comp.name);
    const tsFile = path.join(dir, `${comp.name}.ts`);
    const htmlFile = path.join(dir, `${comp.name}.html`);
    const cssFile = path.join(dir, `${comp.name}.css`);

    // Check TS file
    try {
        const tsContent = fs.readFileSync(tsFile, 'utf8');
        if (tsContent.includes('styleUrl')) {
            console.error(`❌ ${comp.name}.ts should NOT have styleUrl`);
            errors++;
        } else {
            console.log(`✅ ${comp.name}.ts styleUrl removed`);
        }

        if (comp.hasSignal) {
            if (tsContent.includes('signal([')) {
                console.log(`✅ ${comp.name}.ts has signal`);
            } else {
                console.error(`❌ ${comp.name}.ts missing signal`);
                errors++;
            }
        }
    } catch (e) {
        console.error(`❌ Error reading ${tsFile}: ${e.message}`);
        errors++;
    }

    // Check HTML file
    try {
        const htmlContent = fs.readFileSync(htmlFile, 'utf8');
        if (comp.hasLoop) {
            if (htmlContent.includes('@for')) {
                console.log(`✅ ${comp.name}.html has @for loop`);
            } else {
                console.error(`❌ ${comp.name}.html missing @for loop`);
                errors++;
            }
        }

        // Check for Liquid Glass design classes
        if (htmlContent.includes('glass-panel') || htmlContent.includes('backdrop-blur') || htmlContent.includes('bg-white/5')) {
            console.log(`✅ ${comp.name}.html has Liquid Glass classes`);
        } else {
            console.warn(`⚠️ ${comp.name}.html might be missing Liquid Glass classes`);
        }

    } catch (e) {
        console.error(`❌ Error reading ${htmlFile}: ${e.message}`);
        errors++;
    }

    // Check CSS file (should be deleted)
    if (fs.existsSync(cssFile)) {
        console.error(`❌ ${comp.name}.css should be deleted`);
        errors++;
    } else {
        console.log(`✅ ${comp.name}.css deleted`);
    }
});

if (errors > 0) {
    console.error(`\n❌ Verification Failed with ${errors} errors.`);
    process.exit(1);
} else {
    console.log('\n✅ All static verification checks passed!');
}
