const puppeteer = require('puppeteer');

const root = 'http://localhost:3000'
const app = {
  'home': root,
  'header': root + '/budgetHeader',
  'body': root + '/budgetBody',
}

const headerInputsData = [
  {'id':'consultor', 'value': 'Lucas Mendes'},
  {'id':'cidade', 'value':'SP'},
  {'id':'cliente', 'value':'Roberta Matarazzo'},
  {'id':'logradouro', 'value': 'R. Marcos Mélega'},
  {'id':'numero', 'value': '1234'},
  {'id':'bairro', 'value': 'Alto de Pinheiros'},
  {'id':'complemento', 'value': 'Apartamento 23B'},
  {'id':'data', 'value': '10/12/2022'}
]

const newItemInputsData = [
  {'id':'quantidade', 'value': '19'},
  {'id':'unidade', 'value':'m²'},
  {'id':'descricao', 'value':'[Restauração completa] Raspagem, calafetação, polimento, aplicação de seladora e Bona Traffic'},
  {'id':'valorUnitario', 'value': '123,33'},
]

test('check header page inputs keep data after reload our redirect', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(app.header);
  

  for (const [i, input] of headerInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  await page.click('button#next')

  await page.click('a#previous')

  let consultantValue = await page.$eval("input#consultor", (input) => input.value);

  expect(consultantValue).toBe('Lucas Mendes');

  await page.$eval("input#consultor", (input) => input.value = "")

  await page.type(`input#consultor`, 'Larissa Mendes');

  await page.click('a#home')

  await page.click('button#gerarOrcamento')

  consultantValue = await page.$eval("input#consultor", (input) => input.value);
  await browser.close();

  expect(consultantValue).toBe('Larissa Mendes');



});

// test('Check if Body is generatign items', async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto(app.body);

//   for (const [i, input] of newItemInputsData.entries()) {
//     await page.click(`input#${input['id']}`);
//     await page.type(`input#${input['id']}`, input['value']);
//   }

//   await page.click('#btnAddItem');

//   let generatePDFButton = await page.$eval("div#listItems", (div) => div.childElementCount);
//   await browser.close();
//   expect(generatePDFButton).toBe(1);
// });
