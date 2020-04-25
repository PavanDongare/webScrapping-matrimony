const puppeteer = require('puppeteer');

const urlBase = 'https://www.anandmaratha.com/maratha-bride/117359';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
   
        const page = await browser.newPage();        
        await page.goto(urlBase);
        let age = await page.evaluate(() => {
            let age = 0;
            let elements = document.getElementsByClassName('col-md-5');
            for (var element of elements)
                if(element.textContent.includes('DATE OF BIRTH'))
                    age = Number(element.textContent.split(/\s+/)[5].split('/')[2]);
            return age;
        });

        console.log(age);

   
    browser.close();
}

run();

