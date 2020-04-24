const puppeteer = require('puppeteer');
const download = require('image-downloader')
const url = 'https://www.anandmaratha.com/maratha-brides/';
const id=[];

async function run () {
    const browser = await puppeteer.launch();
    
    var id=[];

    var i;
    for (i = 1; i < 1 ; i++) {
        const page = await browser.newPage();        
        await page.goto(url+i.toString());
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

    for(i=0;i<id.length;i++)
    {
        var url = 'https://www.anandmaratha.com/girls/'+id[i]+'jpg';
        
    }

    browser.close();
}


run();




const options = {
    url: 'https://www.anandmaratha.com/girls/mg108978.jpg',
    dest: '/Users/pavan/Desktop/scrapping/girls'
  }
   
async function downloadIMG(options) {
    try {
      const { filename, image } = await download.image(options)
      console.log(filename) // => /path/to/dest/image.jpg
    } catch (e) {
      console.error(e)
    }
}
   
  downloadIMG(options);