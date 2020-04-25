const puppeteer = require('puppeteer');
const fs = require('fs');

const urlBase = 'https://www.anandmaratha.com/maratha-brides/';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
    var id=[];
    var final=[];

    var i;
    for (i = 1; i < 2 ; i++) {
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

    for(ele in id)
    {   
        var data = id[ele].split(' ');
        var imageSource = data[0];
        var link = data[1];
        // '+ +'
        var htmlStr = ' <a href="'+link+'"  target="_blank" ><img src=" '+imageSource+' " >  '+ele+'</a>';
        final.push(htmlStr);
    }

    var str = final.join('\n');
    console.log(str);
    //fs.writeFileSync('/Users/pavan/Desktop/scrapping/AM.html',str);

    browser.close();
}

run();

