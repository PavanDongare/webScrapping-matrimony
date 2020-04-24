const puppeteer = require('puppeteer');
const urlBase = 'https://www.anandmaratha.com/maratha-brides/';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
    var id=[];

    var i;
    for (i = 1; i < 2 ; i++) {
        const page = await browser.newPage();        
        await page.goto(urlBase+i.toString());
        let texts = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('list-td');
            for (var element of elements)
                data.push(element.textContent);
            return data;
        });

        id.push(...texts);
    }

    console.log(id.length);

    for(i=0;i<id.length/2;i++)
    {
        var url = 'https://www.anandmaratha.com/girls/'+id[i].toLowerCase()+'.jpg';
        const options = {
            url: url,
            dest: '/Users/pavan/Desktop/scrapping/girls'
        }
        //downloadIMG(options);
        console.log(options);
    }

    browser.close();
}


run();

