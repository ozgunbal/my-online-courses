const tiemr = document.getElementById('timer');
const buttons = document.querySelectorAll('button');
const records = document.querySelector('.records');
let interval;
let elapsedTime = 0;
let isStarted = false;


function myTimer() {
    elapsedTime += 1; // add 10 miliseconds per interval cycle
    let second = Math.floor(elapsedTime / 100);
    let milisec = elapsedTime % 100;
    milisec = milisec < 10 ? `0${milisec}` : milisec;
    second = second % 60;    
    timer.innerHTML = `${second}.${milisec}`
}

function handleStartStop() {
    if(!isStarted) {
        interval = setInterval(myTimer, 10);
    }else {
        clearInterval(interval);
    }
    isStarted = !isStarted;
}

function handleRecord() {
    if(timer.innerHTML === '0') return; // avoid to record zero
    const elem = document.createElement("p");
    const record = document.createTextNode(timer.innerHTML);
    elem.appendChild(record);
    records.appendChild(elem);
}

function handleReset() {
    records.innerHTML = '';
    clearInterval(interval);
    isStarted = false;
    timer.innerHTML = '0';
    elapsedTime = 0;
}

function handleClick() {
    switch(this.classList.value) {
        case 'record':
            handleRecord();
            break;
        case 'reset':
            handleReset();
            break;
        case 'start-stop':
            handleStartStop();
            break;
        default:
            console.warn('Should not enter here!!');
    }
}

function handleKey(e) {
    switch(e.key){
        case 's':
            handleStartStop();
            break;
        case 't':
            handleRecord();
            break;
        case 'r':
            handleReset();
            break;
        default:
            return;
    }
}

buttons.forEach(button => button.addEventListener('click', handleClick))
window.addEventListener('keypress', handleKey);