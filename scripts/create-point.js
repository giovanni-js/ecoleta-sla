function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
       
        for ( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
       }
       
    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    
    const ufValue = event.target.value

   
   
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for ( const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
    }
    citySelect.disabled = false
    })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // add or remove a class with javascript
    itemLi.classList.toggle("selected")
   
    const itemId = itemLi.dataset.id 
    
//check if exists selected items, if it happens, catch the selected items

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item ==  itemId
        return itemFound
    })
//if it already have been selected
    if(alreadySelected != -1) {
        //remove it of the selection
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )
    
        selectedItems = filteredItems
    } else {
    //if  it hasn't been selected, add to the selection
        selectedItems.push(itemId)
    }
        //update the hidden spaces with the selected data
    collectedItems.value = selectedItems
}

  