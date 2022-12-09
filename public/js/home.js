const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

});

function addItem() {

    var listItems = document.getElementById('listItems')
    const node = document.createElement("div");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Apagar Item';
    deleteButton.setAttribute('type', 'button')
    var formData = document.getElementById('itemForm').childNodes;
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
    var itemNumber = document.getElementById("itemNumber")
    node.appendChild(deleteButton)

    deleteButton.setAttribute('onclick', `deleteItem(${listItems.childElementCount})`)
    deleteButton.setAttribute('class', 'btnDelete')
    node.setAttribute('id', `item_${listItems.childElementCount}`)
    document.getElementById("listItems").appendChild(node);
    itemNumber.value = listItems.childElementCount;

}

function addObservation() {
    var obs = document.getElementById('novaObservacao').value
    if (obs != '') {
        const obsList = document.getElementById('observationList')
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
        document.getElementById('novaObservacao').value = ''

    } else {
        alert('O campo de observação está vazio.')
        document.getElementById('novaObservacao').focus
    }
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
            console.log(listItems[i].childNodes)
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
        document.querySelector('#submitBtn').disabled = true
    } else {
        document.querySelector('#submitBtn').disabled = false
    }
}