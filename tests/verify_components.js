
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    try {
        // Assuming the app is running on localhost:4200
        await page.goto('http://localhost:4200', { waitUntil: 'networkidle0' });

        console.log('Checking for Hero section...');
        const hero = await page.$('#hero');
        if (hero) console.log('✅ Hero section found');
        else console.error('❌ Hero section NOT found');

        console.log('Checking for About section...');
        const about = await page.$('#about');
        if (about) console.log('✅ About section found');
        else console.error('❌ About section NOT found');

        console.log('Checking for Projects section...');
        const projects = await page.$('#projects');
        if (projects) console.log('✅ Projects section found');
        else console.error('❌ Projects section NOT found');

        console.log('Checking for Contact section...');
        const contact = await page.$('#contact');
        if (contact) console.log('✅ Contact section found');
        else console.error('❌ Contact section NOT found');

        console.log('Checking for Experience section...');
        const experience = await page.$('#experience');
        if (experience) console.log('✅ Experience section found');
        else console.error('❌ Experience section NOT found');

        console.log('Checking for Skills section...');
        const skills = await page.$('#skills');
        if (skills) console.log('✅ Skills section found');
        else console.error('❌ Skills section NOT found');

        // Check for dynamic content (Signals)
        console.log('Checking for dynamic content...');
        const pageContent = await page.content();

        if (pageContent.includes('Tax & Portfolio Reconciliation')) {
            console.log('✅ Projects signal content found');
        } else {
            console.error('❌ Projects signal content NOT found');
        }

        if (pageContent.includes('ActionTec Electronics')) {
            console.log('✅ Experience signal content found');
        } else {
            console.error('❌ Experience signal content NOT found');
        }

        if (pageContent.includes('Languages & Databases')) {
            console.log('✅ Skills signal content found');
        } else {
            console.error('❌ Skills signal content NOT found');
        }

    } catch (error) {
        console.error('Error during verification:', error);
    } finally {
        await browser.close();
    }
})();
