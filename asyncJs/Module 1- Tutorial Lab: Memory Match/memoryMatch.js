// global variables
const grid = document.querySelectorAll("td");
const restartButton = document.querySelector("[id=restart]")
    .addEventListener('click', restart);

let clickedArray, interval, started, time, ready, numCompleted;
function init() {
    clickedArray = [];
    started = false;
    time = 0;
    ready = true;
    numCompleted = 0;
}


// execute functions
setUp();

// function definitions
function startTimer() {
    if (!started) {
        interval = setInterval(() => {
            time++;
            document.getElementById("timer").innerHTML = `Time Elapsed: ${time}` 
        }, 1000)
        started = true;
    }
}

function restart () {
    location.reload();
}

function randomAnswers() {
    return [1, 1, 2, 2, 3, 3, 4, 4, 5].sort(() => .5 - Math.random());
}

// cell manupulation
function reveal (targetGrid) {
    targetGrid.style.background = "red";
    targetGrid.innerHTML = targetGrid.value;
    targetGrid.clicked = true;
}

function hide (targetGrid) {
    targetGrid.style.background = "blue";
    targetGrid.innerHTML = "";
    targetGrid.clicked = false;
}

function complete (targetGrid) {
    targetGrid.style.background = "purple";
    targetGrid.completed = true;
    numCompleted++;
}

// Event handlers
function handleClick (e) {
    if(!ready) return; // wait the timeout end
    startTimer();
    const targetGrid = e.target;
    if (!targetGrid.completed && !targetGrid.clicked) {
        clickedArray.push(targetGrid);
        reveal(targetGrid);
    }
    if(clickedArray.length === 2) {
        if (clickedArray[0].value === clickedArray[1].value) {
            complete(clickedArray[0]);
            complete(clickedArray[1]);
            clickedArray = [];
            if (numCompleted === 8) {
                alert(`You win in ${time} seconds!`);
                clearInterval(interval);
            }
        }else {
            ready = false;
            document.getElementById("gridTable").style.border = "5px solid red";

            setTimeout(() => {
                hide(clickedArray[0]);
                hide(clickedArray[1]);

                clickedArray = [];

                ready = true;
                document.getElementById("gridTable").style.border = "5px solid black";
            }, 500);
        }
        
    }
}

function handleMouse (e) {
    const targetGrid = e.target;
    if (!targetGrid.completed && !targetGrid.clicked) {
        if(e.type == "mouseenter") {
            targetGrid.style.background = "orange";
        }else if(e.type == "mouseleave") {
            targetGrid.style.background = "blue";
        }
    }
}
function handlekeypress (e) {
    if(e.key > 0 && e.key < 10) {
        document.getElementById(`grid${e.key}`).click();
    }
}

function setUp() {
    init();
    const answers = randomAnswers();
    let idx = 0;
    grid.forEach( (cell) => {
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[idx];
        idx++;

        cell.addEventListener('mouseenter', handleMouse);
        cell.addEventListener('mouseleave', handleMouse);
        cell.addEventListener('click', handleClick);
    });
}

window.addEventListener("keypress", handlekeypress);

