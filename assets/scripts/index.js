const startDieOne = Math.ceil(Math.random()*6);
const startDieTwo = Math.ceil(Math.random()*6);
const allPlayers = {
  playerOne : {},
  playerTwo : {}
};

const boardPosition = ['go', 'goldenGatePark', 'huntersPoint', 'chance3', 'sunset', 'nobHill', 'oneWayStreet', 'noeValley', 'missionDistrict', 'chance4', 'chinaTown','haightAshbury','fog','theCastro','civicCenter','chance1', 'alamoSquare', 'dogPatch', 'jail', 'northBeach', 'soma', 'chance2', 'financialDistrict', 'russianHill','go'];
const nonProperties = ['go','chance3','oneWayStreet','chance4','fog','chance1','jail','chance2']
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

// objects for each property

var allProperties = {
  go : {
      name: "GO!",
      action: "Pass go...",
      value: "collect $200!!",
      price: 200,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/go.jpg'
  },
  goldenGatePark : {
      name: "Golden Gate Park",
      price: 60,
      rent: 30,
      owner: '',
      pair: 'huntersPoint',
      url: 'assets/images/prop-imgs/goldenGatePark.jpg'
  },
  huntersPoint : {
      name: "Hunter's Point",
      price: 60,
      rent: 30,
      owner: '',
      pair: 'goldenGatePark',
      url: 'assets/images/prop-imgs/huntersPoint.jpg'
  },
  sunset : {
      name: "Sunset",
      price: 100,
      rent: 50,
      owner: '',
      pair: 'nobHill',
      url: 'assets/images/prop-imgs/sunset.jpg'
  },
  nobHill : {
      name: "Nob Hill",
      price: 120,
      rent: 60,
      owner: '',
      pair: 'sunset',
      url: 'assets/images/prop-imgs/nobHill.jpg'
  },
  oneWayStreet : {
      name: "Wrong way!",
      action: "One Way Street", 
      value: "Pay fine of $100",
      price: -100,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/oneWayStreet.jpg'
  },
  noeValley : {
      name: "Noe Valley",
      price: 140,
      rent: 70,
      owner: '',
      pair: 'missionDistrict',
      url: 'assets/images/prop-imgs/noeValley.jpg'
  },
  missionDistrict : {
      name: "Mission District",
      price: 160,
      rent: 80,
      owner: '',
      pair: 'noeValley',
      url: 'assets/images/prop-imgs/missionDistrict.jpg'
  },
  chinaTown : {
      name: "China Town",
      price: 180,
      rent: 90,
      owner: '',
      pair: 'haightAshbury',
      url: 'assets/images/prop-imgs/chinaTown.jpg'
  },
  haightAshbury : {
      name: "Haight Ashbury",
      price: 200,
      rent: 100,
      owner: '',
      pair: 'chinaTown',
      url: 'assets/images/prop-imgs/haightAshbury.jpg'
  },
  chance1 : {
      name: "Chance! Take a chance card and follow the instructions.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance2 : {
      name: "Chance! Take a chance card and follow the instructions.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance3 : {
      name: "Chance! Take a chance card and follow the instructions.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance4 : {
      name: "Chance! Take a chance card and follow the instructions.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  theCastro : {
      name: "The Castro",
      price: 220,
      rent: 110,
      owner: '',
      pair: 'civicCenter',
      url: 'assets/images/prop-imgs/theCastro.jpg'
  },
  civicCenter : {
      name: "Civic Center",
      price: 240,
      rent: 120,
      owner: '',
      pair: 'theCastro',
      url: 'assets/images/prop-imgs/civicCenter.jpg'
  },
  alamoSquare : {
      name: "Alamo Square",
      price: 260,
      rent: 130,
      owner: '',
      pair: 'dogPatch',
      url: 'assets/images/prop-imgs/alamoSquare.jpg'
  },
  dogPatch : {
      name: "Dog Patch",
      price: 280,
      rent: 140,
      owner: '',
      pair: 'alamoSquare',
      url: 'assets/images/prop-imgs/dogPatch.jpg'
  },
  fog : {
      name: "Lost in the fog",
      action: "Lose one turn",
      value: "",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/fog.jpg'
  },
  jail : {
      name: "Busted!",
      action: "Double parked",
      value: "Pay fine of $80",
      price: -80,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/fog.jpg'
  },
  northBeach : {
      name: "North Beach",
      price: 300,
      rent: 150,
      owner: '',
      pair: 'soma',
      url: 'assets/images/prop-imgs/northBeach.jpg'
  },
  soma : {
      name: "SOMA",
      price: 320,
      rent: 160,
      owner: '',
      pair: 'northBeach',
      url: 'assets/images/prop-imgs/northBeach.jpg'
  },
  financialDistrict : {
      name: "Financial District",
      price: 350,
      rent: 180,
      owner: '',
      pair: 'russianHill',
      url: 'assets/images/prop-imgs/financialDistrict.jpg'
  },
  russianHill : {
      name: "Russian Hill",
      price: 400,
      rent: 200,
      owner: '',
      pair: 'financialDistrict',
      url: 'assets/images/prop-imgs/russianHill.jpg'
  }
  };

  // Object  for chance cards
  
  var chanceCard = [
  {
     name: 'Parking Expired', 
     action: 'Pay the meter.',
     value: -20
  },
  {
      name: 'Work perk: free catered meals!',
      action: 'Save on lunch cost.',
      value: 100
  },
  {
      name: 'BART is delayed.',
      action: 'Take Uber instead.',
      value: -30
  },
  {
      name: 'Cross Golden Gate Bridge.',
      action: 'Pay the bridge toll.',
      value: -50
  },
  {
      name: 'Missed the Ferry.',
      action: 'Stay the night in the city.',
      value: -250
  },
  {
      name: 'Take second job to afford rent.',
      action: 'Pay day!',
      value: 300
  },
  {
      name: 'Giants Game today!',
      action: 'Tailgate at AT&T Park.',
      value: -100
  },
  {
      name: 'Ride bike on commute.',
      action: 'Save money on gas.',
      value: 80
  },
  {
      name: 'Sightseeing at Pier 39',
      action: 'Buy souvenirs.',
      value: -150
  },
  {
      name: 'Go Organic.',
      action: 'Buy whole organic foods only.',
      value: -200
  }
  ];

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

function displayPlayerPiece(player, property, display, playerPositionCounter) {

  if (startMove === 24 && player === 'playerOne' && display === 'hide') {
      startMove = 0;
      playerPositionCounter = playerPositionCounter - 24;
      playerOnePositionCounter = playerOnePositionCounter - 24;
      allPlayers.playerOne.cash += 200;
      playerOneGameCash.text = allPlayers.playerOne.cash;
      getMoneyAudio.play();
  }
  if (startMove === 24 && player === 'playerTwo' && display === 'hide') {
      startMove = 0;
      playerPositionCounter = playerPositionCounter - 24;
      playerTwoPositionCounter = playerTwoPositionCounter - 24;
      allPlayers.playerTwo.cash += 200;
      playerTwoGameCash.text = allPlayers.playerTwo.cash;
      getMoneyAudio.play();
  }

  let position = player + "-" + property;

  if(startMove === playerPositionCounter) {
      clearInterval(hideInterval);
      clearInterval(showInterval);
      display = 'show';
      if (property == boardPosition[playerPositionCounter]) {
          playerEvent(player, property);
      }
  }

  if (display === 'show'){
      position.style.display = 'block';
      startMove++;
  } else if (display === 'hide'){
      position.style.display = 'none';
  }    
}