const puppeteer = require("puppeteer");
const fs = require('fs');
const { Parser } = require('json2csv');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true});
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        await page.goto('https://www.google.com/localservices/prolist?g2lbs=AOHF13ni8QCEjseO7c_iX6TWEAVMZDPKH3m8UoRJ0ScoN5OJL8im9C2f_gPdnZte2igUsmNqU_NAFZ6q5ewaGAiD9dYgP0ZKfk07BH4o4_hfNnuxoDdxWN0%3D&hl=en-IN&gl=in&cs=1&ssta=1&oq=laundry%20in%20gurugram&src=2&sa=X&q=laundry%20in%20gurugram&ved=2ahUKEwiN-p2GkauHAxXU0IQAHX-SBlAQjdcJegQIABAF&slp=MgBAAVIECAIgAIgBAJoBBgoCFxkQAA%3D%3D&scp=ChBnY2lkOmRyeV9jbGVhbmVyEgAaACoLRHJ5IGNsZWFuZXI%3D');

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
