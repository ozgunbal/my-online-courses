const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
const seconds = timeNodes
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [minute, second] = timeCode.split(':').map(parseFloat);
        return minute * 60 + second;
    })
    .reduce((total, second) => {
        return total + second;
    }, 0);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const minutes = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, minutes, secondsLeft);