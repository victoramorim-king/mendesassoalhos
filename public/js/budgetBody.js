const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

});

function clearTotais(totais){
    for (var i = 0; i < totais.length; i++) {
        totais[i] = totais[i].replace('R$', '')
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

function addItem() {
    // Get items container
    var listItems = document.querySelector('#listItems')

    // Create the new item elements
    const node = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Apagar Item';
    deleteButton.setAttribute('type', 'button')

    // Get the item content in the form
    var formData = document.getElementById('itemForm').childNodes;

    // Fill the new item with the form data
    const nodeNumber = [5, 9, 13, 17, 21, 25]
    const nodeAttributes = ['id', 'Quantidade', 'Unidade', 'Descricao', 'ValorUnitario', 'Total']
    for (let i in nodeNumber) {
        var textnode = formData[nodeNumber[i]]["value"];
        var childNode = document.createElement('input')
        childNode.setAttribute('name', nodeAttributes[i])
        childNode.setAttribute('readonly', 'true')
        if (nodeAttributes[i] == 'ValorUnitario') {
            childNode.value = formatter.format(parseFloat(textnode.replace(/\,/g, ".")))
            node.appendChild(childNode)
        } else {
            childNode.value = textnode
            node.appendChild(childNode)
        }
    }

    // Update the item number in item form
    var itemNumber = document.getElementById("itemNumber")

    // Add delete button
    node.appendChild(deleteButton)
    deleteButton.setAttribute('onclick', `deleteItem(${listItems.childElementCount}), calculateSubTotal()`)
    deleteButton.setAttribute('class', 'btnDelete')

    // Display the new item in the user screen
    node.setAttribute('id', `item_${listItems.childElementCount}`)
    document.getElementById("listItems").appendChild(node);
    itemNumber.value = listItems.childElementCount;

    // Calculate Sub Total
    calculateSubTotal() 

    // store form data
    storeNewItemFormData()
}

function calculateTotal() {

    const totalInput = document.getElementById('Total')
    const quantidade = document.getElementById('quantidade')
    const valorUnitario = document.getElementById('valorUnitario')
    totalInput.value = formatter.format(parseFloat(quantidade.value) * parseFloat(valorUnitario.value.replace(/\,/g, ".")))

}

function setItemNumbers() {
    var listItems = document.getElementById('listItems').childNodes
    for (i in listItems) {
        if (i != 0) {
            listItems[i].childNodes[0].value = i
        }
    }
}

function calculateSubTotal(){
  let listItems = document.querySelector('div#listItems')
  let totais = []
  listItems.children
  for (i = 0; i < listItems.childElementCount; i++){
    totais.push(listItems.children[i].children[5].value)
  }
  
  subtotal(totais)

  document.querySelector('#subTotal').value = subtotal(totais) 
}

function deleteItem(id) {
  const item = document.getElementById(`item_${id}`)
  item.remove()
  calculateSubTotal()
  setItemNumbers()
}


function storeNewItemFormData(){
    const budgetData = {
        'consultor': document.querySelector('#quantidade').value,
        'cidade': document.querySelector('#unidade').value,
        'cliente': document.querySelector('#descricao').value,
        'logradouro': document.querySelector('#valorUnitario').value,
    }
    window.localStorage.setItem('budgetData', JSON.stringify(budgetData))
}

function fillItemFormStoredData(formData) {
    document.querySelector('#quantidade').value = formData.quantidade
    document.querySelector('#unidade').value = formData.unidade
    document.querySelector('#descricao').value = formData.descricao
    document.querySelector('#valorUnitario').value = formData.valorUnitario
}
