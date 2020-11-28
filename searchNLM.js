const puppeteer = require('puppeteer');


const searchNLM = async (searchQuery) => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(`https://wsearch.nlm.nih.gov/ws/query?db=digitalCollections&term=${searchQuery}`);
    await page.waitForSelector('body > div.pretty-print');
    const textContent = await page.evaluate(() => {
        const result = []
         const res = document.querySelectorAll('document');
         Array.from(res).forEach(function (el) { 
            result.push(el.innerHTML)
        })
         return result
         
     });

    await page.screenshot({path: 'example.png'});
    await browser.close();
    return textContent;
};

module.exports = searchNLM;

