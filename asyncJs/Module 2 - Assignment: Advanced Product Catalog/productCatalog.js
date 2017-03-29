api.searchAllProducts().then(value => updateTable('allTable', value));
const buttons = document.querySelectorAll("button");


function createTableHeader(tableId) {
    const tableHeaderRow = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
    let tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // delegates the event to 'Examine' buttons
    tableBody.addEventListener('click', (e) => {
        if(e.target && e.target.id === 'examine') {
            e.stopPropagation();
            processSearch(parseInt(e.target.parentNode.parentNode.firstChild.innerHTML));
        }
    });
    // create table table header 
    createTableHeader(tableId);
    //populate table rows
    for(let i = 0; i < productArray.length; i++) {
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        const th3 = document.createElement('th');
        const th4 = document.createElement('th');
        th1.appendChild(document.createTextNode(productArray[i].id));
        th2.appendChild(document.createTextNode(productArray[i].type));
        th3.appendChild(document.createTextNode(productArray[i].price));
        
        let examineButton = document.createElement('button');
        examineButton.innerHTML = 'Examine';
        examineButton.setAttribute("id","examine"); // to event delegation
        th4.appendChild(examineButton);

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tableBody.appendChild(tr);

    }
}

function updateExaminedText (product) {
    // If there's no valid product object, fields would be empty
    let outputString = `Product Id: ${product? product.id : ''} <br>
    Price: ${product ? product.price : '' } <br>
    Type: ${product ? product.type : ''}
    `;
    document.getElementById("productText").innerHTML = outputString;
}

function getIntersection(samePrice, sameType, searchedId) {
    const similarArray = [];
    samePrice.forEach((obj1) => {
        sameType.forEach((obj2) => {
            if(obj1.id === obj2.id && obj1.id !== searchedId) {
                similarArray.push(obj1);
            }
        });
    });
    return similarArray;
}

function processSearch (searchId) {
    api.searchProductById(searchId).then((val) => {
        return Promise.all([api.searchProductByPrice(val.price, 50), api.searchProductByType(val.type), val]);
    }).then((val) => {
        const similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable("similarTable", similarArray);
    }).catch((e) => {
        alert(e);
    })
}

function handleSearch (e) {
    const searchType = e.target.id;
    const inputValue = e.target.parentNode.querySelector('#'+ searchType +'-input').value;
    switch(searchType) {
        case 'id':
            processSearch(parseInt(inputValue));
            break;
        case 'type':
            api.searchProductByType(inputValue).then((val) => {
                updateTable("similarTable", val);
            }).catch((e) => {
                alert(e);
            });
            updateExaminedText();
            break;
        case 'price': 
            api.searchProductByPrice(parseInt(inputValue), 50).then((val) => {
                updateTable("similarTable", val);
            }).catch((e) => {
                alert(e);
            });
            updateExaminedText();
            break;
        default:
            console.log("Should not be here!!");
    }
}

buttons.forEach(button => button.addEventListener('click', handleSearch));