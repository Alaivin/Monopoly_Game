//Press to show the rules

const startButton = document.getElementById('start');
const mainContainer = document.getElementsByClassName('main-container')[0];
const containerInstructions = document.getElementsByClassName('container-instructions')[0];
startButton.addEventListener('click', event => {
  event.preventDefault();
  mainContainer.style.display = 'none';
  containerInstructions.style.display = 'block';
});

//Press to enter players information

const goGame = document.getElementById('goGame');
const playersContainer = document.getElementsByClassName('players-container')[0];
goGame.addEventListener('click', event => {
  event.preventDefault();
    containerInstructions.style.display = 'none';
    playersContainer.style.display = 'block';
  });