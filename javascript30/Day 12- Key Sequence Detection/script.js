const pressed = [];
const secretCode = 'özgün';
window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(- secretCode.length - 1, pressed.length - secretCode.length);
    console.log(pressed);

    if(pressed.join('') === secretCode) {
        console.log('DING DING');
        cornify_add();
    }
});