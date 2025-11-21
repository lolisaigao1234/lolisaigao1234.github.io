const fs = require('fs');
const path = require('path');

const componentPath = path.join('src', 'app', 'components', 'projects', 'projects.html');

try {
    const content = fs.readFileSync(componentPath, 'utf8');

    const checks = [
        'backdrop-blur-xl',
        'bg-white/5',
        'border-white/10',
        'rounded-3xl',
        'hover:shadow-cyan-500/10',
        'group-hover:scale-105'
    ];

    const missing = checks.filter(check => !content.includes(check));

    if (missing.length > 0) {
        console.error('❌ Projects Component Verification Failed!');
        console.error('Missing the following Liquid Glass classes:', missing);
        process.exit(1);
    } else {
        console.log('✅ Projects Component Verification Passed: Liquid Glass design implemented.');
    }
} catch (error) {
    console.error('❌ Error reading projects.html:', error.message);
    process.exit(1);
}
