const puppeteer = require('puppeteer');
const fs = require('fs');
// date 
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '-' + dd + '-' + yyyy;
// 


const urlBase = 'https://www.anandmaratha.com/maratha-brides/';
const id = [];
var option = {
    "headless": true
}

async function run() {
    const browser = await puppeteer.launch(option);

    var id = [];
    var final = [];
    var finalCount = 0;

    var i;
    const page = await browser.newPage();
    for (i = 1; i < 2; i++) {
        console.log(i);
        await page.goto(urlBase + i.toString());
        let texts = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('list-td');
            var ages = document.querySelectorAll("[id='d2']");
            let index = 0;
            for (var element of elements) {
                if (index % 2 == 0){
                    let age = Number(ages[index/2].textContent.split('/')[2])
                    if (age >= 1993)
                        data.push('https://www.anandmaratha.com/girls/' + elements[index].textContent.toLowerCase() + '.jpg' + ' ' + element.href + ' ' + ages[index/2].textContent.split('/')[2]);
                }  
                index++;
            }




            return data;
        });

        id.push(...texts);
    }

    arr = []
    for (ele in id) {
        row = [];
        var data = id[ele].split(' ');
        var imageSource = data[0];
        var link = data[1];
        var age = data[2];
        row.push(data, imageSource, link, age);
        arr.push(row);

        finalCount++
        var htmlStr = ' <a href="' + link + '"  target="_blank" ><img src=" ' + imageSource + ' "  </a>' + age + ' ';
        final.push(htmlStr);
    }
    final = final.sort(Comparator);
    for (index of final)
        final[index] = final[index] + index.toString()
    
    var str = final.join('\n');
    fs.writeFileSync(`${today}.html`, str);


    browser.close();
}

function Comparator(a, b) {
    a = a.split(' ');
    a = Number(a[a.length - 2]);

    b = b.split(' ');
    b = Number(b[b.length - 2]);
    return b - a;
}


run();

