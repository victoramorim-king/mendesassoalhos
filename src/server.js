const express = require('express');
const path = require('path')
const ejs = require('ejs');
const puppeteer = require('puppeteer');
const { response } = require('express');
const app = express();
const fs = require('fs');
app.use(express.static(path.join(__dirname, '../public')));

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

});

function clearTotais(totais){
    for (var i = 0; i < totais.length; i++) {
        totais[i] = totais[i].replace('R$', '')
        console.log(totais[i])
        totais[i] = parseFloat(totais[i].replace('.', ''))
    }
    return totais
}

function formatTotais(totais){
        for (var i = 0; i < totais.length; i++) {
            totais[i] = formatter.format(totais[i])
        }
        return totais
}

function subtotal(i) {
    if (Array.isArray(i)) {
        var totais = clearTotais(i) 
        var subtotal = formatter.format(totais.reduce((subtotal, totais) => subtotal + totais, 0));
        totais = formatTotais(totais)
        return subtotal;
    } else {
        return i
    }
}


module.exports = subtotal;


app.get("/pdf", (request, response) => {

    const budget = request.query

    const config = fs.readFileSync(path.join(__dirname, '../public/config/app_config.json'), 'utf-8')
    const data = JSON.parse(config)
    budget['Pedido'] = data.orcamento_numero;
    data.orcamento_numero++
    fs.writeFileSync(path.join(__dirname, '../public/config/app_config.json'), JSON.stringify(data, null, 2), 'utf-8')


    budget.Data = budget.Data.split('-').reverse().join('/');
    budget.Subtotal = subtotal(budget['Total'])
    console.log(budget)
    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { budget }, async (err, html) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, {
            waitUntil: 'networkidle2',
        });
        const pdf = await page.pdf({
            format: 'a3',
            margin: {
                top: "20px",
                right: "20px",
                bottom: "40px",
                left: "20px"
            }
        });
        await browser.close();

        response.contentType("application/pdf")

        return response.send(pdf)
    })
});

app.get("/", (request, response) => {
    const filePath = path.join(__dirname, "home.ejs")
    ejs.renderFile(filePath, (err, html) => {
        if (err) {
            return response.send('Erro na leitura do arquivo')
        }

        return response.send(html)
    })
})


app.listen(3000);

