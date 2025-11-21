const fs = require('fs');
const path = require('path');

const stylesPath = path.join('src', 'styles.css');

try {
    const content = fs.readFileSync(stylesPath, 'utf8');

    const checks = [
        '@import "tailwindcss";',
        '@layer base',
        '@apply bg-slate-900',
        '.glass-panel',
        '.text-gradient'
    ];

    const missing = checks.filter(check => !content.includes(check));

    if (missing.length > 0) {
        console.error('❌ Step 1 Verification Failed!');
        console.error('Missing the following in styles.css:', missing);
        process.exit(1);
    } else {
        console.log('✅ Step 1 Verification Passed: styles.css contains all required Tailwind configurations.');
    }
} catch (error) {
    console.error('❌ Error reading styles.css:', error.message);
    process.exit(1);
}
