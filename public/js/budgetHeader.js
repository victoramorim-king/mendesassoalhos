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

function deleteObservacao(id) {
    const obs = document.getElementById(`observacao_${id}`)
    obs.remove()
}

function storeData() {
    const clientData = {
        'consultor': document.querySelector('#consultor').value,
        'cidade': document.querySelector('#cidade').value,
        'cliente': document.querySelector('#cliente').value,
        'logradouro': document.querySelector('#logradouro').value,
        'numero': document.querySelector('#numero').value,
        'bairro': document.querySelector('#bairro').value,
        'complemento': document.querySelector('#complemento').value,
        'data': document.querySelector('#data').value,
    }
    window.localStorage.setItem('clientData', JSON.stringify(clientData))
}

function fillFormStoredData(clientData) {
    document.querySelector('#consultor').value = clientData.consultor
    document.querySelector('#cidade').value = clientData.cidade
    document.querySelector('#cliente').value = clientData.cliente
    document.querySelector('#logradouro').value = clientData.logradouro
    document.querySelector('#numero').value = clientData.numero
    document.querySelector('#bairro').value = clientData.bairro
    document.querySelector('#complemento').value = clientData.complemento
    document.querySelector('#data').value = clientData.data
}


