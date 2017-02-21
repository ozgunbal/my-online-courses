const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const buttonsList = document.querySelectorAll('button');

function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) 
{
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""}/>
          <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip it's unless
    console.log();
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
}

function clear () {
    items.length = 0;
}

function check () {
    items.forEach(item => item.done = true);
}

function uncheck () {
    items.forEach(item => item.done = false);
}

function handleActivity(e) {
    const funcName = e.target.dataset.action;
    window[funcName](); //calls clear, check or uncheck
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
buttonsList.forEach(button => button.addEventListener('click',handleActivity));

populateList(items, itemsList);