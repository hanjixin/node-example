const puppeteer = require('puppeteer');

(async() => { 
  const browser = await puppeteer.launch();
  console.log(await browser.version()); 
  const page = await browser.newPage(); 
  await page.goto('https://www.tmall.com/?ali_trackid=2:mm_26632258_3504122_48284354:1581738127_247_948332353&clk1=a658475366257538db6cae3e94ea81b0&upsid=a658475366257538db6cae3e94ea81b0');
  // await page.goto('https://www.jianshu.com/p/40ea4b4076e2');
  console.log('load start');
  // let html = await page.$('body');
  await page.screenshot({path: './screenshot.png'});
  const html = await page.content();
  console.log(html.innerHTML);
  let fs = require('fs');
          fs.writeFile('./test.html', html,function() {
            console.log(11)
          });
  
  await browser.close();
  // page.on('load', async () => {
    
  // })
  
})();
// (async() => { const browser = await puppeteer.launch(); const page = await browser.newPage(); await page.goto('https://www.chromestatus.com', {waitUntil: 'networkidle2'}); await page.pdf({path: 'page.pdf', format: 'A4'}); await browser.close();
