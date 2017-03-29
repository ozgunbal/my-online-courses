const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
console.log(checkboxes);

function handleCheck (e){
    // check if shift key down
    // and they are checking not unchecking
    let inBetween = false;
    if(e.shiftKey && this.checked) {
        // loop over every single checkbox
        checkboxes.forEach(checkbox =>  {
            if(checkbox === this || checkbox === lastChecked){
                inBetween = !inBetween;
            }
            if(inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
}

let lastChecked;

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

