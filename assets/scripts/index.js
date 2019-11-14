//Press start game
const startButton = document.getElementById('start');
const mainContainer = document.getElementsByClassName('main-container')[0];
const containerInstructions = document.getElementsByClassName('container-instructions')[0];
startButton.addEventListener('click', event => {
    event.preventDefault();
    mainContainer.style.display = 'none';
    containerInstructions.style.display = 'block';
});