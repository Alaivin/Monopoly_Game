const startDieOne = Math.ceil(Math.random()*6);
const startDieTwo = Math.ceil(Math.random()*6);
const allPlayers = {
  playerOne : {},
  playerTwo : {}
};

const boardPosition = ['go', 'goldenGatePark', 'huntersPoint', 'chance3', 'sunset', 'nobHill', 'oneWayStreet', 'noeValley', 'missionDistrict', 'chance4', 'chinaTown','haightAshbury','fog','theCastro','civicCenter','chance1', 'alamoSquare', 'dogPatch', 'jail', 'northBeach', 'soma', 'chance2', 'financialDistrict', 'russianHill','go'];
let playerOnePositionCounter = 0;
let playerTwoPositionCounter = 0;
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

////CLick submit on the Player Info screen
const submitInfo = document.getElementById('submitInfo');
const playerOne = document.getElementById('playerOne');
const playerTwo = document.getElementById('playerTwo');
const playerOneShowName = document.getElementById('playerOneShowName');
const playerTwoShowName = document.getElementById('playerTwoShowName');
const playerOneGameCash = document.getElementById('playerOneGameCash');
const playerTwoGameCash = document.getElementById('playerTwoGameCash');
const playerOneGameDie = document.getElementById('playerOneGameDie');
const playerOneGameDieImage = document.getElementById('playerOneGameDieImage');
const playerTwoGameDie = document.getElementById('playerTwoGameDie');
const playerTwoGameDieImage = document.getElementById('playerTwoGameDieImage');
const containerMainGame = document.getElementById('containerMainGame');

submitInfo.addEventListener('click', event => {
  event.preventDefault();
  if (playerOne.value === '' || playerTwo.value === '') {
    errorAudio.play();
    alert('Введите имена игроков');
  } else if (allPlayers.playerOne.firstroll === undefined || allPlayers.playerTwo.firstroll === undefined) {
    errorAudio.play();
    alert('Нажмите на кости, чтобы разыграть первый ход')
  } else {
      allPlayers.playerOne.name = playerOne.value;
      allPlayers.playerTwo.name = playerTwo.value;
      allPlayers.playerOne.currentPosition = "go";
      allPlayers.playerTwo.currentPosition = "go";
      allPlayers.playerOne.cash = 1000;
      allPlayers.playerTwo.cash = 1000;
      playersContainer.style.display = 'none';
      playerOneShowName.text = allPlayers.playerOne.name;
      playerTwoShowName.text = allPlayers.playerTwo.name;
      playerOneGameCash.text = allPlayers.playerOne.cash;
      playerTwoGameCash.text = allPlayers.playerTwo.cash;
      displayPlayerPiece('playerOne', boardPosition[playerOnePositionCounter], 'show');
      displayPlayerPiece('playerTwo', boardPosition[playerOnePositionCounter], 'show');
        if (playerOneDie > playerTwoDie){
          allPlayers.playerOne.turn = true;
          allPlayers.playerTwo.turn = false;
          playerTwoGameDie.style.display = 'none';
          playerTwoGameDieImage.style.display = 'none';
      } else {
          allPlayers.playerOne.turn = false;
          allPlayers.playerTwo.turn = true;
          playerOneGameDie.style.display = 'none';
          playerOneGameDieImage.style.display = 'none';
      }
      containerMainGame.style.display = 'block';
    }
});