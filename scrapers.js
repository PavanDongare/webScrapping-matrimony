const puppeteer = require('puppeteer');
const download = require('image-downloader')

const urlBase = 'https://www.anandmaratha.com/maratha-brides/';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
    var id=[];

    var i;
    for (i = 1; i < 4 ; i++) {
        const page = await browser.newPage();        
        await page.goto(urlBase+i.toString());
        let texts = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('list-td');
            for (var element of elements)
                data.push('https://www.anandmaratha.com/girls/'+element.textContent.toLowerCase()+'.jpg'+' '+element.href);
            return data;
        });

        id.push(...texts);
    }

    console.log(id);

    browser.close();
}

run();

