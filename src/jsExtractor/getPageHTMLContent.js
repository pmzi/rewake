const puppeteer = require('puppeteer');


module.exports = async function getPageHTMLContent(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'load'
    });

    const content = await page.content();

    await browser.close();

    return content;
}