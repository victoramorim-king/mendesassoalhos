function elem(elementQuery){
  return document.querySelector(elementQuery)
}

elem('#addObs').addEventListener('click', () => {
  var obs = elem('#novaObservacao').value
  if (obs != '') {
    const obsList = elem('#observationList')
    var newObsContainer = document.createElement('div')
    newObsContainer.setAttribute('class', 'obsContainer')
    var newObs = document.createElement('textarea')
    newObs.setAttribute('class', 'obsTextArea')
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Apagar Observação';
    deleteButton.setAttribute('type', 'button')
    newObs.setAttribute('name', 'observacao')
    newObs.setAttribute('readonly', 'true')
    newObs.value = obs
    newObsContainer.appendChild(newObs)
    newObsContainer.appendChild(deleteButton)
    newObsContainer.setAttribute('id', `observacao_${obsList.childElementCount}`)
    deleteButton.setAttribute('onclick', `deleteObservacao(${obsList.childElementCount})`)
    deleteButton.setAttribute('class', 'btnDelete')
    obsList.appendChild(newObsContainer)
    elem('#novaObservacao').value = ''

  } else {
    alert('O campo de observação está vazio.')
    elem('#novaObservacao').focus
  }

})
const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',

});

function addItem() {
  // Get items container
  var listItems = elem('#listItems')

  // Create the new item elements
  const node = document.createElement("div");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = 'Apagar Item';
  deleteButton.setAttribute('type', 'button')

  // Get the item content in the form
  var formData = elem('#itemForm').childNodes;

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
  deleteButton.setAttribute('onclick', `deleteItem(${listItems.childElementCount})`)
  deleteButton.setAttribute('class', 'btnDelete')

  // Display the new item in the user screen
  node.setAttribute('id', `item_${listItems.childElementCount}`)
  document.getElementById("listItems").appendChild(node);
  itemNumber.value = listItems.childElementCount;

}

function calculateTotal() {

  const totalInput = elem('#Total')
  const quantidade = elem('#quantidade')
  const valorUnitario = elem('#valorUnitario')
  totalInput.value = formatter.format(parseFloat(quantidade.value) * parseFloat(valorUnitario.value.replace(/\,/g, ".")))

}


function setItemNumbers() {
  var listItems = elem('#listItems').childNodes
  for (i in listItems) {
    if (i != 0) {
      listItems[i].childNodes[0].value = i
    }
  }
}

function deleteItem(id) {
  const item = document.getElementById(`item_${id}`)
  item.remove()
  setItemNumbers()
}

function deleteObservacao(id) {
  const obs = document.getElementById(`observacao_${id}`)
  obs.remove()
}

function blockPDFGeneration(i) {
  if (i == 0) {
    elem('#submitBtn').disabled = true
  } else {
    elem('#submitBtn').removeAttribute('disabled')
  }
}
