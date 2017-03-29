const dropList1 = document.querySelector('#ship1');
const dropList2 = document.querySelector('#ship2');
const compareButton = document.querySelector('#button');
const table = document.querySelector('#table');
const dropdownShips = [
    'CR90 corvette',
    'V-wing',
    'Belbullab-22 starfighter',
    'Jedi Interceptor',
    'Star Destroyer',
    'Trade Federation cruiser',
    'Solar Sailer',
    'Republic attack cruiser',
    'A-wing',
    'B-wing',
    'Naboo fighter',
    'Millennium Falcon'
];

let dropDown = [];
let url = 'http://swapi.co/api/starships/?page=1';

function run(genFunc) {
    const genObject = genFunc(); // creating generator genObject

    function iterate(iteration) { //recursive function to iterate through promises
        if(iteration.done) { // stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value); 
        }
        return Promise.resolve(iteration.value) // returns a promise with its then() and catch() methods filled
            .then(x => iterate(genObject.next(x))) // calls recursive function on the next value to be iterated
            .catch(x => iterate(genObject.throw(x))); // throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); // starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); // returns a rejected promise if an exception is caught
    }
}

function* onload() {
    const starship1 = dropList1.value;
    const starship2 = dropList2.value;

    if(starship1 === starship2) {
        alert("You should choose different starships!");
        return;
    }

    // fetch the starships
    const shipsResponse = yield fetch(url);
    const ships = yield shipsResponse.json();

    ships.results.forEach(ship => {
        if (starship1 === ship.name) {
            dropDown.push({idx: 1, ship: ship});
        } else if(starship2 === ship.name) {
            dropDown.push({idx: 2, ship: ship});
        }
    });

    if(dropDown.length !== 2) {
        url = ships.next;
    }else {
        url = null;
    }
    
    if(url !== null) {
        run(onload).catch(err => alert(err.message));
    }else {
        updateTable();
    }
}

function updateTable() {
    let htmlString = `<tr><th></th><th>Starship 1</th><th>Starship 2</th></tr><tr>`;
    const ship1 = dropDown[0].idx === 1 ? dropDown[0].ship : dropDown[1].ship;
    const ship2 = dropDown[0].idx === 2 ? dropDown[0].ship : dropDown[1].ship;
    const attributeArr = ['name', 'cost_in_credits', 'max_atmosphering_speed', 'cargo_capacity', 'passengers'];
    const tagArr = ['Name', 'Cost', 'Speed', 'Cargo Size', 'Passengers'];
    for(let i = 0; i < 5; i++) {
        const firstAtt = parseInt(ship1[attributeArr[i]]);
        const secondAtt = parseInt(ship2[attributeArr[i]]);
        if (isNaN(firstAtt) || isNaN(secondAtt)) {
            htmlString += `<tr><th>${tagArr[i]}</th><th>${ship1[attributeArr[i]]}</th><th>${ship2[attributeArr[i]]}</th></tr><tr>`;
        } else {
            if(firstAtt > secondAtt) {
                htmlString += `<tr><th>${tagArr[i]}</th><th style="background: red;">${ship1[attributeArr[i]]}</th><th>${ship2[attributeArr[i]]}</th></tr><tr>`;
            } else if(firstAtt < secondAtt) {
                htmlString += `<tr><th>${tagArr[i]}</th><th>${ship1[attributeArr[i]]}</th><th style="background: red;">${ship2[attributeArr[i]]}</th></tr><tr>`;
            } else {
                htmlString += `<tr><th>${tagArr[i]}</th><th>${ship1[attributeArr[i]]}</th><th>${ship2[attributeArr[i]]}</th></tr><tr>`;
            }
        }
    }
    table.innerHTML = htmlString;
}

function updateDropdownList() {
    const htmlString = dropdownShips.reduce((htmlString, ship) => {
        return htmlString + `<option>${ship}</option>`;
    }, "");
    dropList1.innerHTML = htmlString;
    dropList2.innerHTML = htmlString;
}

function compare() {
    url = 'http://swapi.co/api/starships/?page=1';
    dropDown = [];
    run(onload).catch(err => alert(err.message));
}

compareButton.addEventListener('click', compare);
updateDropdownList();