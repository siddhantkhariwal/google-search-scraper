const puppeteer = require("puppeteer");
const fs = require('fs');
const { Parser } = require('json2csv');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: false});
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto('https://www.google.com/localservices/prolist?g2lbs=AOHF13kqoGJRJ6u4fVljnEYhqvYSRWQ9pxpNIybzTlr_e3jC19WTZBQQglxocsJ60fF9BPDHJ3A0SMocAxExPxyHG2T6VpVVAw%3D%3D&hl=en-IN&gl=in&cs=1&ssta=1&q=laundries%20in%20jaipur&oq=laundries%20in%20jaipur&slp=MgBSAggCYACSAawCCg0vZy8xMWdteGw5eTl6Cg0vZy8xMWw1a2N4ZjJtCg0vZy8xMWZ5bHNsemQzCg0vZy8xMXJfZG5iNV9mCg0vZy8xMW12NnQ3bTA0Cg0vZy8xMXAxM3A4cDljCg0vZy8xMXB4em42NXB6Cg0vZy8xMWJ3NXYzM2hxCg0vZy8xMWNuNWwxaHIwCg0vZy8xMXY5Y2Z0MXhfCg0vZy8xMXFteDF2N2Q1Cg0vZy8xMXM3dHZuNzFuCg0vZy8xMXFwbHljMXlfCg0vZy8xMWM0YmNoYncyCg0vZy8xMXZydDVmcWN2Cg0vZy8xMWtwaHlwYnRsCg0vZy8xMWxtMnR5eWYxCg0vZy8xMWc3MjNqdGx4Cg0vZy8xMXkyZjlnbndkCg0vZy8xMWxkOF80cHQ3mgEGCgIXGRAA&src=2&serdesk=1&sa=X&ved=2ahUKEwiO8Pf3qtmGAxVucmwGHaobCpEQjGp6BAheEAE&scp=ChBnY2lkOmRyeV9jbGVhbmVyEkgSEgmB4ldM30psOREJLvIMOsbhDBoSCSn-VYActG05ERz7qWdtB_KEIgZKYWlwdXIqFA0VsPEPFZK8FS0dAgcbECXDtEMtMAAaCWxhdW5kcmllcyITbGF1bmRyaWVzIGluIGphaXB1cioLRHJ5IGNsZWFuZXI%3D');

        const laundries = [];

        while (true) {
            await page.waitForSelector('.DVBRsc') && page.waitForSelector('.gm-style');

            const pageLaundries = await page.evaluate(async () => {
                const laundryNodes = document.querySelectorAll('.DVBRsc');
                const data = [];

                for (const node of laundryNodes) {
                    node.click();

                    // Wait for the details to load
                    await new Promise(resolve => setTimeout(resolve, 5000));

                    const name = document.querySelector('.tZPcob')?.innerText || 'N/A';
                    const phoneNumber = document.querySelector('.eigqqc')?.innerText || 'N/A';
                    const services = document.querySelector('.AQrsxc')?.innerText || 'N/A';
                    const address = document.querySelector('.fccl3c span')?.innerText || 'N/A';
                    const rating = document.querySelector('.hvDe3d .ZjTWef.QoUabe')?.innerText || 'N/A';
                    const reviews = document.querySelector('.hvDe3d .PN9vWe')?.innerText.replace(/\D/g, '') || 'N/A';

                    data.push({ name, phoneNumber, address, rating, reviews, services });
                }

                return data;
            });

            laundries.push(...pageLaundries);

            const nextButton = await page.$('button[aria-label="Next"]');
            if (nextButton) {
                const isVisible = await page.evaluate(button => {
                    return button.offsetWidth > 0 && button.offsetHeight > 0;
                }, nextButton);

                if (isVisible) {
                    await nextButton.click();
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        const parser = new Parser();
        const csv = parser.parse(laundries);

        fs.writeFileSync('laundries.csv', csv);

        await browser.close();

    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
