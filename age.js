const puppeteer = require('puppeteer');
const fs = require('fs');

const urlBase = 'https://www.anandmaratha.com/maratha-brides/';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
    var id=[];
    var final=[];
    var finalCount=0;

    var i;
    const page = await browser.newPage();
    for (i = 1; i < 20 ; i++) {             
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

        await page.goto(link);
        let age = await page.evaluate(() => {
            let age = 0;
            let elements = document.getElementsByClassName('col-md-5');
            for (var element of elements)
                if(element.textContent.includes('DATE OF BIRTH'))
                    age = Number(element.textContent.split(/\s+/)[5].split('/')[2]);
            return age;
        });

        
        if(age>=1994)
        {
            console.log(ele,finalCount);
            finalCount++
            var htmlStr = ' <a href="'+link+'"  target="_blank" ><img src=" '+imageSource+' "  >  '+finalCount+'->'+age+'  </a>';
            final.push(htmlStr);
        }

    }

    var str = final.join('\n');
    //console.log(str);
    fs.writeFileSync('/Users/pavan/Desktop/scrapping/AMage.html',str);

    browser.close();
}

run();

