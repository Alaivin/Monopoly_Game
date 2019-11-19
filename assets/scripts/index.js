let startDieOne = Math.ceil(Math.random()*6);
let startDieTwo = Math.ceil(Math.random()*6);
const allPlayers = {
  playerOne : {},
  playerTwo : {}
};

const boardPosition = ['go', 'goldenGatePark', 'huntersPoint', 'chance3', 'sunset', 'nobHill', 'oneWayStreet', 'noeValley', 'missionDistrict', 'chance4', 'chinaTown','haightAshbury','fog','theCastro','civicCenter','chance1', 'alamoSquare', 'dogPatch', 'jail', 'northBeach', 'soma', 'chance2', 'financialDistrict', 'russianHill','go'];
const nonProperties = ['go','chance3','oneWayStreet','chance4','fog','chance1','jail','chance2']
let playerOnePositionCounter = 0;
let playerTwoPositionCounter = 0;
let startMove = 0;
let playerOneClickFlag = false;
let playerTwoClickFlag = false;
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
let playerOneGameDieImage = document.getElementById('playerOneGameDieImage');
const playerTwoGameDie = document.getElementById('playerTwoGameDie');
let playerTwoGameDieImage = document.getElementById('playerTwoGameDieImage');
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
      playerOneShowName.innerHTML = allPlayers.playerOne.name;
      playerTwoShowName.innerHTML = allPlayers.playerTwo.name;
      playerOneGameCash.innerHTML = allPlayers.playerOne.cash;
      playerTwoGameCash.innerHTML = allPlayers.playerTwo.cash;
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
      playerOneGameCash.innerHTML = allPlayers.playerOne.cash;
      getMoneyAudio.play();
  }
  if (startMove === 24 && player === 'playerTwo' && display === 'hide') {
      startMove = 0;
      playerPositionCounter = playerPositionCounter - 24;
      playerTwoPositionCounter = playerTwoPositionCounter - 24;
      allPlayers.playerTwo.cash += 200;
      playerTwoGameCash.innerHTML = allPlayers.playerTwo.cash;
      getMoneyAudio.play();
  }

  let position = player.property;

  if(startMove === playerPositionCounter) {
      clearInterval(hideInterval);
      clearInterval(showInterval);
      display = 'show';
      if (property == boardPosition[playerPositionCounter]) {
          playerEvent(player, property);
      }
  }

  const playerOneGo = document.getElementById('playerOne-go');
  const playerTwoGo = document.getElementById('playerTwo-go');

  if (display === 'show'){
      playerOneGo.style.display = 'block';
      startMove++;
  } else if (display === 'hide'){
      playerTwoGo.style.display = 'none';
  }    
}

// Game Start - Player1 rolls dice

  playerOneGameDieImage.addEventListener('click', () => {
  if(playerOneClickFlag) return;
  
  allPlayers.playerTwo.turn = 'false';
  allPlayers.playerOne.turn = 'true';
  let alreadyMissedTurn = 0;
  startMove = playerOnePositionCounter;
  
  startDieOne = Math.ceil(Math.random()*6);
  
  diceAudio.play();
  playerOneGameDieImage.setAttribute('src', `assets/images/dice/${startDieOne}.png`);
  playerOneGameDieImage.classList.add('die');
  // displayPlayerPiece('player1',boardPosition[playerOnePositionCounter],'hide');
  playerOnePositionCounter = playerOnePositionCounter + startDieOne; //startDieOne;
  allPlayers.playerOne.currentPosition = boardPosition[playerOnePositionCounter];
  // displayPlayerPiece('player1',boardPosition[playerOnePositionCounter],'show');

  hideInterval = setInterval(function() {
    displayPlayerPiece('playerOne', boardPosition[startMove], 'hide', playerOnePositionCounter);
  }, 800);
  showInterval = setInterval(function() {
    displayPlayerPiece('playerOne', boardPosition[startMove+1], 'show', playerOnePositionCounter);
  }, 1000);
  
  playerOneClickFlag = true;
})

// Game Start - Player2 rolls dice
playerTwoGameDieImage.addEventListener('click', () => {
  
  if(playerTwoClickFlag) return;

  allPlayers.playerTwo.turn = 'true';
  allPlayers.playerOne.turn = 'false';
  let alreadyMissedTurn = 0;
  startMove = playerTwoPositionCounter;
  startDieTwo = Math.ceil(Math.random()*6);
  diceAudio.play();
  playerTwoGameDieImage.setAttribute('src', `assets/images/dice/${startDieTwo}.png`);
  playerTwoGameDieImage.classList.add('die');
  // displayPlayerPiece('player2',boardPosition[playerTwoPositionCounter],'hide');
  playerTwoPositionCounter = playerTwoPositionCounter + startDieTwo; //startDieTwo;
  allPlayers.playerTwo.currentPosition = boardPosition[playerTwoPositionCounter];
  // displayPlayerPiece('player2',boardPosition[playerTwoPositionCounter],'show');

  hideInterval = setInterval(function(){displayPlayerPiece('playerTwo',boardPosition[startMove],'hide',playerTwoPositionCounter);},800);
  showInterval = setInterval(function(){displayPlayerPiece('playerTwo',boardPosition[startMove+1],'show',playerTwoPositionCounter);},1000);
  playerTwoClickFlag = true;
})

//Display the appropriate content in the dynamic player event window for player to take action
function playerEvent(player, property) {
  // $(document).on('click','#playerOneGameDieImage');
  // $(document).on('click','#playerTwoGameDieImage');
  playerOneClickFlag = false;
  playerTwoClickFlag = false;

  currentProperty = property;
  let interactionElementID = document.getElementById(`${player}-interactions`);
  let dieElementID = document.getElementById(`${player}GameDie`);
  let dieImageElementID = document.getElementById(`${player}GameDieImage`);
  let interactionImageID = document.getElementById(`${player}InteractionsImage`);
  let interactionProperty = document.getElementById(`${player}InteractionProperty`);
  let interactionPriceText = document.getElementById(`${player}InteractionPrice`);
  let interactionContinueButton = document.getElementById(`${player}InteractionContinue`);
  let interactionNoButton = document.getElementById(`${player}InteractionNo`);
  let interactionYesButton = document.getElementById(`${player}InteractionYes`);
  let interactionBuyText = document.getElementById(`${player}InteractionBuyText`);
  let interactionRentText = document.getElementById(`${player}InteractionRentText`);
  let interactionPropertyText = document.getElementById(`${player}InteractionPropertyText`);
  let interactionRent = document.getElementById(`${player}Rent`);
  let interactionBuy = document.getElementById(`${player}Buy`);
  let interactionChanceName = document.getElementById(`${player}ChanceName`);
  let interactionChanceAction = document.getElementById(`${player}ChanceAction`);
  let interactionChanceAmount = document.getElementById(`${player}ChanceAmount`);
  let interactionAlert = document.getElementById(`${player}Alert`);
  
  if (player === "playerOne") {
      ownedProperty = "playerTwoOwnedProperties";
  }
  else {
      ownedProperty = "playerOneOwnedProperties";
  }
  playerOneGameDieImage.setAttribute('src', 'assets/images/dice/BeforeRolled.png');
  playerOneGameDieImage.classList.remove('die');
  playerTwoGameDieImage.setAttribute('src', 'assets/images/dice/BeforeRolled.png');
  playerTwoGameDieImage.classList.remove('die');
  dieElementID.style.display = 'none';
  dieImageElementID.style.display = 'none';

  //if player lands on a Property, excluding corner squares and chances
  if (nonProperties.indexOf(property) < 0) {
      
      //if Property is not already owned
      if (allProperties[property].owner == '') {
          interactionChanceName.style.display = 'none';
          interactionChanceAction.style.display = 'none';
          interactionChanceAmount.style.display = 'none';
          interactionImageID.setAttribute('src', allProperties[property].url);
          interactionAlert.style.display = 'none';
          interactionProperty.innerHTML = allProperties[property].name;
          interactionPriceText.innerHTML = allProperties[property].price;
          interactionNoButton.innerHTML = 'No';
          interactionNoButton.classList.remove('btn-warning');
          interactionNoButton.classList.add('btn-danger');
          interactionNoButton.style.cssText = 'width: 80px; margin-left: 5%';
          interactionContinueButton.style.display = 'none';
          interactionRent.style.display = 'none';
          interactionImageID.style.display = 'block';
          interactionBuy.style.display = 'block';
          interactionNoButton.style.display = 'block';
          interactionYesButton.style.display = 'block';
          interactionElementID.style.display = 'block';
      }
      //if Property is already owned
      else{
          if (allProperties[currentProperty].owner === player) {
              interactionImageID.style.display = 'none';
              interactionYesButton.style.display = 'none';
              interactionBuy.style.display = 'none';
              interactionAlert.style.display = 'none';
              interactionChanceName.style.display = 'none';
              interactionChanceAction.style.display = 'none';
              interactionChanceAmount.style.display = 'none';
              interactionContinueButton.style.display = 'none';
              interactionNoButton.innerHTML = 'Continue';
              interactionNoButton.classList.remove('btn-danger');
              interactionNoButton.classList.add('btn-warning');
              interactionNoButton.style.cssText = 'width: 90px; margin-left: 30%';
              interactionPropertyText.innerHTML = 'You own '+ allProperties[currentProperty].name + '.';
              interactionPropertyText.style.display = 'block';
              interactionRentText.innerHTML = 'No rent due';
              interactionRentText.style.display = 'block';
              interactionRent.style.display = 'block';
              interactionNoButton.style.display = 'block'; //USE No button
              interactionElementID.style.display = 'block';
          }
          else {
              if (eval(ownedProperty).indexOf(currentProperty) >= 0 && eval(ownedProperty).indexOf(allProperties[currentProperty].pair) >= 0) {
                rentOwed = allProperties[currentProperty].rent + ((allProperties[currentProperty].rent)*.5);
              }
              else{
                rentOwed = allProperties[currentProperty].rent;
              }
              interactionImageID.style.display = 'none';
              interactionNoButton.style.display = 'none';
              interactionYesButton.style.display = 'none';
              interactionBuy.style.display = 'none';
              interactionAlert.style.display = 'none';
              interactionChanceName.style.display = 'none';
              interactionChanceAction.style.display = 'none';
              interactionChanceAmount.style.display = 'none';
              interactionProperty.innerHTML = allProperties[property].name + ' is owned by the other player. $';
              interactionProperty.style.display = 'block';
              interactionRent.innerHTML = rentOwed + ' rent is due.';
              interactionRent.style.display = 'block';
              interactionRent.style.display = 'block';
              interactionContinueButton.innerHTML = 'Pay Rent';
              interactionContinueButton.style.display = 'block';
              interactionElementID.style.display = 'block';
          }
          
      }        
  }
  //if square is a corner or Chance square
  else {
      //if square is One Way Street or Fog or Jail or Go
      if (property === "oneWayStreet" || property === "fog" || property === "jail" || property === "go"){
          if (property === "fog") {
              fogAudio.play();
          }else if (property === "oneWayStreet") {
              honkAudio.play();
          }else if (property === "jail") {
              jailAudio.play();
          }else if (property === "go") {
              getMoneyAudio.play();
          }
          interactionImageID.style.display = 'none';
          interactionNoButton.style.display = 'none';
          interactionYesButton.style.display = 'none';
          interactionBuy.style.display = 'none';
          interactionRent.style.display = 'none';
          interactionAlert.style.display = 'none';
          interactionChanceName.innerHTML = allProperties[property].name;
          interactionChanceAction.innerHTML = allProperties[property].action;
          interactionChanceAmount.innerHTML = allProperties[property].value;
          interactionContinueButton.innerHTML = 'Continue';
          interactionChanceName.style.display = 'block';
          interactionChanceAction.style.display = 'block';
          interactionChanceAmount.style.display = 'block';
          interactionContinueButton.style.display = 'block';
          interactionElementID.style.display = 'block';
      }
      //if square is a chance card
      else {
          ranChanceCard = Math.floor(Math.random()*9);
          randomChanceCard = chanceCard[ranChanceCard];
          chanceName = chanceCard[ranChanceCard].name;

          interactionImageID.style.display = 'none';
          interactionNoButton.style.display = 'none';
          interactionYesButton.style.display = 'none';
          interactionBuy.style.display = 'none';
          interactionRent.style.display = 'none';
          interactionAlert.style.display = 'none';
          interactionChanceName.innerHTML = chanceName;
          interactionChanceAction.innerHTML = chanceCard[ranChanceCard].action;

          if (chanceCard[ranChanceCard].value < 0){
              interactionChanceAmount.innerHTML = 'You owe $' + ((chanceCard[ranChanceCard].value)*-1);
          }
          else {
              interactionChanceAmount.innerHTML = 'You get $' + chanceCard[ranChanceCard].value;
          }
          interactionContinueButton.innerHTML = 'Continue';
          interactionChanceName.style.display = 'block';
          interactionChanceAction.style.display = 'block';
          interactionChanceAmount.style.display = 'block';
          interactionContinueButton.style.display = 'block';
          interactionElementID.style.display = 'block';
      }
  }
}

//When player clicks Yes to buy property

let interactionYesButton = document.getElementsByClassName('interactionYesButton')[0];
interactionYesButton.addEventListener('click', function(event) {
  var noMoneycounter;

  if (this.getAttribute('data-player') === "one") {
      player = "playerOne";
  } else {
      player = "playerTwo";
  }

  if (allPlayers[player].cash < allProperties[currentProperty].price || ((allPlayers[player].cash) - (allProperties[currentProperty].price)) < 0) {
      noMoneyAudio.play();
      interactionChanceName.style.display = 'none';
      interactionChanceAction.style.display = 'none';
      interactionChanceAmount.style.display = 'none';
      interactionYesButton.style.display = 'none';
      interactionRent.style.display = 'none';
      interactionBuy.style.display = 'none';
      interactionAlert.innerHTML = 'Unfortunately, you do not have enough money to buy ' + allProperties[currentProperty].name;
      interactionContinueButton.style.display = 'none';
      interactionBuy.style.display = 'none';
      interactionImageID.style.display = 'none';
      interactionNoButton.innerHTML = 'Continue';
      interactionNoButton.classList.remove('btn-danger');
      interactionNoButton.classList.add('btn-warning');
      interactionNoButton.style.cssText = 'width: 90px; margin-left: 30%';
      interactionAlert.style.display = 'block';
      interactionNoButton.style.display = 'block';
      interactionElementID.style.display = 'block';
      noMoneycounter++;
  }
  else {
      buyAudio.play();
      allProperties[currentProperty].owner = player;
      allPlayers[player].cash = (allPlayers[player].cash)-(allProperties[currentProperty].price); 
      document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;
      if (this.getAttribute('data-player') === "one") {
          player = "playerOne";
          var url = allProperties[currentProperty].url;
          allProperties[currentProperty].owner = player;
          playerOneOwnedProperties.push(currentProperty);
          let playerOneGameOwnedPropertiesDiv = document.getElementById('playerOneGameOwnedPropertiesDiv');
          playerOneGameOwnedPropertiesDiv.append('img');
          playerOneGameOwnedPropertiesDiv.setAttribute('class', 'propertiesOwnedImage');
          playerOneGameOwnedPropertiesDiv.setAttribute('src', url);
          playerOneGameOwnedPropertiesDiv.setAttribute('title',allProperties[currentProperty].name);
      }
      else{
          player = "playerTwo";
          var url = allProperties[currentProperty].url;
          allProperties[currentProperty].owner = player;
          playerTwoOwnedProperties.push(currentProperty);
          let playerTwoGameOwnedPropertiesDiv = document.getElementById('playerTwoGameOwnedPropertiesDiv');
          playerTwoGameOwnedPropertiesDiv.append('img');
          playerTwoGameOwnedPropertiesDiv.setAttribute('class', 'propertiesOwnedImage');
          playerTwoGameOwnedPropertiesDiv.setAttribute('src', url);
          playerTwoGameOwnedPropertiesDiv.setAttribute('title',allProperties[currentProperty].name);
      }

      let playerInteractionModule = document.getElementById(player+'-interactions');
      playerInteractionModule.style.display = 'none';

      switchPlayer(player, 'false');
  }
})

//when player clicks no to buy a property
let interactionNoButton = document.getElementsByClassName('interactionNoButton')[0];
interactionNoButton.addEventListener('click', function(event) {
  if (this.getAttribute('data-player') === 'one') {
      player = "playerOne";
  }
  else {
      player = "playerTwo";
  }
  let playerInteractionModule = document.getElementById(player + '-interactions');
  playerInteractionModule.style.display = 'none';

  switchPlayer(player, 'false')
})

//player clicks on Chance continue or Pay Rent button 
let interactionContinueButton = document.getElementsByClassName('interactionContinueButton')[0];
interactionContinueButton.addEventListener('click', function(event) {
  if (this.getAttribute('data-player') === "one") {
      player = "playerOne";
      otherPlayer = "playerTwo";
  }
  else {
      player = "playerTwo";
      otherPlayer = "playerOne";
  }

  // Corner Squares
  if (currentProperty === "oneWayStreet" || currentProperty === "fog" || currentProperty === "jail" || currentProperty === "go") {
      if( currentProperty === "fog"){
          allPlayers[player].missTurn = true;
      }
      else if (currentProperty === 'go'){
          allPlayers[player].cash = (allPlayers[player].cash) + 200;
          document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;
      }
      else if (currentProperty === "oneWayStreet"){
          if (((allPlayers[player].cash) - 100) < 0){
              allPlayers[player].cash = 0;
              // alert(player+' Losses');
              gameOver(player);
          }
          else{
              allPlayers[player].cash = (allPlayers[player].cash) - 100;
              $('#'+player+'GameCash').innerHTML(allPlayers[player].cash);
          }            
      }
      else if (currentProperty === "jail"){
          if(((allPlayers[player].cash) - 80) < 0){
              allPlayers[player].cash = 0;
              // alert(player+' Losses');
              gameOver(player);
          }
          else{
              allPlayers[player].cash = (allPlayers[player].cash) - 80;
              document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;
          }            
      }
  }
  //IF Chance Card and ELSE Rent due
  else{
      if (allProperties[currentProperty].owner == '') {
          if((allPlayers[player].cash) + (chanceCard[ranChanceCard].value) < 0) {
              allPlayers[player].cash = 0;
              // alert(player+' Losses');
              gameOver(player);
          }
          else {
              allPlayers[player].cash = (allPlayers[player].cash) + (chanceCard[ranChanceCard].value);
              document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;
          }
          
      }
      else{
          if((allPlayers[player].cash) - (rentOwed) < 0){
              allPlayers[player].cash = 0;
              // alert(player+' Losses');
              gameOver(player);
          }
          else {
              allPlayers[player].cash = (allPlayers[player].cash) - (rentOwed);
              document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;
              getMoneyAudio.play();
              allPlayers[otherPlayer].cash = (allPlayers[otherPlayer].cash) + (rentOwed);
              document.getElementById(otherPlayer + 'GameCash').innerHTML = allPlayers[otherPlayer].cash;
          }            
      }
  }
  
  let playerInteractionModule = document.getElementById(player+'-interactions');
  playerInteractionModule.style.display = 'none';
  switchPlayer(player, 'false');
})

//switch turns, miss a turn
function switchPlayer (player, value) {
  if (player == 'playerOne') {
      if(allPlayers.playerTwo.missTurn == true) {
          allPlayers.playerOne.turn = true;
          allPlayers.playerTwo.turn = value;
          allPlayers.playerTwo.missTurn = false;
      }
      else{
          allPlayers.playerOne.turn = value;
          allPlayers.playerTwo.turn = true;
      }
      
  }
  else if (player == 'playerTwo') {
      if (allPlayers.playerOne.missTurn === true) {
          allPlayers.playerTwo.turn = true;
          allPlayers.playerOne.turn = value;
          allPlayers.playerOne.missTurn = false;
      }
      else {
          allPlayers.playerOne.turn = true;
          allPlayers.playerTwo.turn = value;
      }
      
  }

  if(allPlayers.playerOne.turn === true) {
      document.getElementById('playerOneGameDie').style.display = 'block';
      document.getElementById('playerOneGameDieImage').style.display = 'block';
  }
  else if(allPlayers.playerTwo.turn === true) {
    document.getElementById('playerTwoGameDie').style.display = 'block';
    document.getElementById('playerTwoGameDieImage').style.display = 'block';
  }
}

// //Game over page displays
// function gameOver(player){
//   if (player == "playerOne"){
//       otherPlayer = "playerTwo";
//       winner = (allPlayers[otherPlayer].name).toUpperCase();
//       loser = (allPlayers[player].name).toUpperCase();
//       $('#winnerImg').attr('src',$('#winnerImg').attr('data-playerOne'));
//   }
//   else{
//       otherPlayer = "playerOne";
//       winner = (allPlayers[otherPlayer].name).toUpperCase();
//       $('#winnerImg').attr('src',$('#winnerImg').attr('data-playerTwo'));
//       loser = (allPlayers[player].name).toUpperCase();
//   }
//   playerOneEndPosition = '#playerOne-'+allPlayers.playerOne.currentPosition;
//   playerTwoEndPosition = '#playerTwo-'+allPlayers.playerTwo.currentPosition;

//   $('#goGame').attr('data-gamestart','no');
//   $('#containerMainGame').hide();
//   $(playerOneEndPosition).hide();
//   $(playerTwoEndPosition).hide();
//   $('.winner').innerHTML(winner);
//   $('.loser').innerHTML(loser);
//   $('.containerEndGame').show();
// }

// database.ref('highscores').limitToLast(1).on('child_added',function(snapshot){
//   var p = $('<p>');
//   var winnerScore = snapshot.val().name + ': ';
//   winnerScore += snapshot.val().cash;
//   p.innerHTML(winnerScore);
//   $('#winnerScore').html(p);
// });

// database.ref('highscores').orderByChild('cash').limitToLast(10).on('child_added',function(snapshot){
//   var p = $('<p>');
//   var highScores = snapshot.val().name + ': ';
//   highScores += snapshot.val().cash;
//   p.innerHTML(highScores);
//   $('#scores').prepend(p);
// });

// $(document).on('click','#modalButton',function(){
//   var name = winner;
//   var cash = allPlayers[otherPlayer].cash;

//   console.log(name);
//   console.log(cash);
  
//   database.ref('highscores').push({
//       name: name,
//       cash: cash
//   })
//   $('#highScoresModal').show();
// })

// $(document).on('click','#closeModal',function(){
//   $('#highScoresModal').hide();
// })

// $(document).click(function(event) {
//     if(event.target == $('#highScoresModal')){
//         $('#highScoresModal').hide();
//     }
  
// })