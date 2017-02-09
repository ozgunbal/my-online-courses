const panels = document.querySelectorAll('.panel');

function toggleOpen () {
  // if there's already active panel deactivate it
  const activePanel = document.querySelector('.open-active');
  if(activePanel) {
    activePanel.classList.toggle('open');
  }

  this.classList.toggle('open');  
}

function toggleActive (e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach( panel => panel.addEventListener('click', toggleOpen));

panels.forEach( panel => panel.addEventListener('transitionend', toggleActive));
