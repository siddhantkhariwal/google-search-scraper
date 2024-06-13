const puppeteer = require("puppeteer");
const fs = require('fs');
const { Parser } = require('json2csv');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.google.com/localservices/prolist?g2lbs=AOHF13n5IUvtMCNDJlhPuEIKLtyROgfwWzb6-ZMioBrl8VnnQR81Tostq2GzBFTqbEDWm-noTquF_iEoyzsKGfq-3nq_sdKWlJKBMcyU0bWr2IlN8FuWomY%3D&hl=en-IN&gl=in&cs=1&ssta=1&q=laundries%20in%20jaipur&oq=laundries%20in%20jaipur&slp=MgBSAggCYACSAawCCg0vZy8xMWdteGw5eTl6Cg0vZy8xMWw1a2N4ZjJtCg0vZy8xMWNuNWwxaHIwCg0vZy8xMWZ5bHNsemQzCg0vZy8xMXM3dHZuNzFuCg0vZy8xMWJ3NXYzM2hxCg0vZy8xMW12NnQ3bTA0Cg0vZy8xMXJfZG5iNV9mCg0vZy8xMXB4em42NXB6Cg0vZy8xMXNuXzJnbDhmCg0vZy8xMXFwbHljMXlfCg0vZy8xMWtwaHlwYnRsCg0vZy8xMWM0YmNoYncyCg0vZy8xMWc3MjNqdGx4Cg0vZy8xMXAxM3A4cDljCg0vZy8xMXFteDF2N2Q1Cg0vZy8xMWxkOF80cHQ3Cg0vZy8xMXkyZjlnbndkCg0vZy8xMXQ1MzhtYmg4Cg0vZy8xMWxtMnR5eWYxmgEGCgIXGRAA&src=2&serdesk=1&sa=X&ved=2ahUKEwjn7MmO0cGGAxUGSGcHHTz0BEEQjGp6BAhjEAE&scp=ChRnY2lkOmxhdW5kcnlfc2VydmljZRJIEhIJgeJXTN9KbDkRCS7yDDrG4QwaEgkp_lWAHLRtOREc-6lnbQfyhCIGSmFpcHVyKhQNFbDxDxWSvBUtHQIHGxAlw7RDLTAAGglsYXVuZHJpZXMiE2xhdW5kcmllcyBpbiBqYWlwdXIqD0xhdW5kcnkgc2VydmljZQ%3D%3D');

        await page.waitForSelector('.DVBRsc')&&page.waitForSelector('.gm-style');

        const laundries = await page.evaluate(async () => {
            const laundryNodes = document.querySelectorAll('.DVBRsc');
            const data = [];

            for (const node of laundryNodes) {
                node.click();

                // Wait for the details to load (adjust the selector based on your page)
                await new Promise(resolve => setTimeout(resolve, 5000));

                const name = document.querySelector('.tZPcob')?.innerText || 'N/A';
                const phoneNumber = document.querySelector('.eigqqc')?.innerText || 'N/A';
                const services = document.querySelector('.AQrsxc')?.innerText || 'N/A';
                const address = document.querySelector('.fccl3c span')?.innerText || 'N/A';
                const rating = document.querySelector('.hvDe3d .ZjTWef.QoUabe')?.innerText || 'N/A';
                const reviews = document.querySelector('.hvDe3d .PN9vWe')?.innerText.replace(/\D/g, '') || 'N/A';

                data.push({ name, phoneNumber, address, rating, reviews,  services});
            }

            return data;
        });

        const parser = new Parser();
        const csv = parser.parse(laundries);

        fs.writeFileSync('laundries2.csv', csv);

        await browser.close();

    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
