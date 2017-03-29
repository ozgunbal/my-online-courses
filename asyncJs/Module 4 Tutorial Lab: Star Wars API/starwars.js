const input = document.querySelector('#input');
const button = document.querySelector('#button');
const filmText = document.querySelector('#filmText');
const peopleText = document.querySelector('#peopleText');

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

function* gen() {
    // check if input is valid
    if(input.value > 7 || input.value < 1) {
        throw new Error("Invalid Input - Enter a number between 1 and 7");
    }
    // fetch the film
    const filmResponse = yield fetch(`http://swapi.co/api/films/${input.value}`);
    const film = yield filmResponse.json();

    // fetch the characters
    const characters = film.characters;
    let charString = "Characters: </br>";
    for (let i = 0; i < characters.length; i++) {
        let tempCharResponse = yield fetch(characters[i]);
        let tempChar = yield tempCharResponse.json();
        charString += `${tempChar.name} </br>`;
    }

    // display film title and characters in the film
    filmText.innerHTML = `Film: </br> ${film.title}`;
    peopleText.innerHTML = charString;
}

function handleClick() {
    run(gen).catch(err => alert(err.message));
}

button.addEventListener('click', handleClick);