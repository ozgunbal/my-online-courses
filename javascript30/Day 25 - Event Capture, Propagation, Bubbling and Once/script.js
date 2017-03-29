const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

function logText(e) {
    // e.stopPropagation(); // stops bubbling
    console.log(this.classList.value);
}


divs.forEach(div => div.addEventListener('click', logText, {
    capture: true
}));

button.addEventListener('click', () => {
    console.log('Click!!');    
}, {
    once: true
});