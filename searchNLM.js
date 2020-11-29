const puppeteer = require('puppeteer');


const searchNLM = async (searchQuery) => {
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
    
        const page = await browser.newPage();
        await page.goto(`https://wsearch.nlm.nih.gov/ws/query?db=digitalCollections&term=${searchQuery}`);
        await page.waitForSelector('body > div.pretty-print');
        const textContent = await page.evaluate(() => {
            const result = []
             const res = document.querySelectorAll('document');
             Array.from(res).forEach(function (el) {
                 let arr =[] 
                const info = el.querySelectorAll('content')
                Array.from(info).forEach(e =>{
                    if(e.textContent.includes('span')){
                       arr.push(e.textContent) 
                    } else {
                        arr.push(e.outerHTML)
                    }
                    
                } )
                result.push(arr)
            })
             return result

        })
await browser.close();
        return textContent;
};
module.exports = searchNLM;

