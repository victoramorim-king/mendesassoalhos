const puppeteer = require('puppeteer');


test('Check if generate pdf button is avaliable with satisfied prerequisies', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
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

  for (const [i, input] of headerInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  const newItemInputsData = [
    {'id':'quantidade', 'value': '19'},
    {'id':'unidade', 'value':'m²'},
    {'id':'descricao', 'value':'[Restauração completa] Raspagem, calafetação, polimento, aplicação de seladora e Bona Traffic'},
    {'id':'valorUnitario', 'value': '123,33'},
  ]

  for (const [i, input] of newItemInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  await page.click('#btnAddItem');
  await page.click('body')

  let generatePDFButton = await page.$eval("button#submitBtn", (btn) => btn.disabled);
  await browser.close();
  expect(generatePDFButton).toBe(false);

});

test('Check if generate pdf button IS NOT avaliable without satisfied prerequisies', async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // Input Data is not in the array to force the fail
  const headerInputsData = [
    {'id':'consultor', 'value': 'Lucas Mendes'},
    {'id':'cidade', 'value':'SP'},
    {'id':'cliente', 'value':'Roberta Matarazzo'},
    {'id':'logradouro', 'value': 'R. Marcos Mélega'},
    {'id':'numero', 'value': '1234'},
    {'id':'bairro', 'value': 'Alto de Pinheiros'},
    {'id':'complemento', 'value': 'Apartamento 23B'},
  ]

  for (const [i, input] of headerInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  const newItemInputsData = [
    {'id':'quantidade', 'value': '19'},
    {'id':'unidade', 'value':'m²'},
    {'id':'descricao', 'value':'[Restauração completa] Raspagem, calafetação, polimento, aplicação de seladora e Bona Traffic'},
    {'id':'valorUnitario', 'value': '123,33'},
  ]

  for (const [i, input] of newItemInputsData.entries()) {
    await page.click(`input#${input['id']}`);
    await page.type(`input#${input['id']}`, input['value']);
  }

  await page.click('#btnAddItem');

  let generatePDFButton = await page.$eval("button#submitBtn", (btn) => btn.disabled);
  console.log(generatePDFButton)
  expect(generatePDFButton).toBe(true);

});