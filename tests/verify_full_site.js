const fs = require('fs');
const path = require('path');

const appHtmlPath = path.join('src', 'app', 'app.html');
if (missingHtml.length > 0) console.error('Missing in HTML:', missingHtml);
if (missingTs.length > 0) console.error('Missing in TS:', missingTs);
process.exit(1);
    }

console.log('✅ Final Verification Passed: All core components (Hero, Experience, Skills, Projects) are integrated.');
} catch (error) {
    console.error('❌ Final Verification Failed:', error.message);
    process.exit(1);
}
