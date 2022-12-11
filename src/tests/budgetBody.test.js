const puppeteer = require('puppeteer');

const root = 'http://localhost:3000'
const app = {
  'home': root,
  'header': root + '/budgetHeader',
  'body': root + '/budgetBody',
}

const newItemInputsData = [
  {'id':'quantidade', 'value': '10'},
  {'id':'unidade', 'value':'m²'},
  {'id':'descricao', 'value':'[Restauração completa] Raspagem, calafetação, polimento, aplicação de seladora e Bona Traffic'},
  {'id':'valorUnitario', 'value': '111,11'},
]

test('Check if Body is generatign items', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(app.body);

  for (const [i, input] of newItemInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  await page.click('#btnAddItem');

  let listItemsCount = await page.$eval("div#listItems", (div) => div.childElementCount);
  await browser.close();
  expect(listItemsCount).toBe(1);
});

test('Body is calculating SubTotal', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(app.body);


  for (const [i, input] of newItemInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }


  for(let i=0; i < 3; i++){
    await page.click('#btnAddItem');
  }

  let subTotal = await page.$eval("input#subTotal", (input) => input.value);
  await browser.close();
  expect(subTotal).toMatch(/3.333,30/);
});

