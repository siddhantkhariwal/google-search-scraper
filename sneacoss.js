const puppeteer = require("puppeteer");

(async() =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(puppeteer.KnownDevices['iPhone XR']);
    await page.goto("https://sneaco.in/");
    // await page.goto('https://www.google.com/search?sca_esv=d1b5aeb9d701f53b&tbs=lf:1,lf_ui:1&tbm=lcl&sxsrf=ACQVn0__B46S9dBJHeIQnAr-H42WQuA9fA:1710147908896&q=laundry+in+jaipur&rflfq=1&num=10&sa=X&ved=2ahUKEwiN3P207euEAxWAQ2cHHbKdDEQQjGp6BAgcEAE&biw=1440&bih=785&dpr=1#rlfi=hd:;si:;mv:[[26.917859099999998,75.83700329999999],[26.8437052,75.72641639999999]]');
    await page.screenshot({path: 'laundry23.png', fullPage: true});
    await browser.close();
})();
