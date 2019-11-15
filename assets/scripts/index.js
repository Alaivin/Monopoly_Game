const startDieOne = Math.ceil(Math.random()*6);
const startDieTwo = Math.ceil(Math.random()*6);
const allPlayers = {
  playerOne : {},
  playerTwo : {}
};
const diceAudio = document.getElementById("audioDice");
const fogAudio = document.getElementById("audioFog");
const jailAudio = document.getElementById("audioJail");
const errorAudio = document.getElementById("audioError");
const getMoneyAudio = document.getElementById("audioGo");
const buyAudio = document.getElementById("audioBuy");
const noMoneyAudio = document.getElementById("audioNoMoney");
const honkAudio = document.getElementById("audioHonk");

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

//Player One rolls die on the Info screen
let playerOneDie = document.getElementById('playerOneDie');
playerOneDie.addEventListener('click', function() {
  diceAudio.pause();
  diceAudio.currentTime = 0;
  if (startDieOne === startDieTwo){
      startDieOne = Math.ceil(Math.random() * 6);
  } else {
      playerOneDie = startDieOne;
      diceAudio.play();
      this.setAttribute('src', `assets/images/dice/${startDieOne}.png`);
      this.classList.add('die');
      allPlayers.playerOne.firstroll = startDieOne;
  }
});

//Player Two rolls die on the Info screen
let playerTwoDie = document.getElementById('playerTwoDie');
playerTwoDie.addEventListener('click', function() {
  diceAudio.pause();
  diceAudio.currentTime = 0;
  if (startDieTwo === startDieOne){
      startDieTwo = Math.ceil(Math.random() * 6);
  } else {
      playerTwoDie = startDieTwo;
      diceAudio.play();
      this.setAttribute('src', `assets/images/dice/${startDieTwo}.png`);
      this.classList.add('die');
      allPlayers.playerTwo.firstroll = startDieTwo;
  }
});