const puppeteer = require('puppeteer');

test('Validade consultant field', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  await page.click("input#consultor");
  await page.type("input#consultor", "Lucas Mendes");
  await page.click("input#cidade");
  let consultantInputEmpty = await page.$eval("input#consultor", (input) => input.value);
  await browser.close();
  expect(consultantInputEmpty).toBe('Lucas Mendes');

});
