let startDieOne = Math.ceil(Math.random()*6);
let startDieTwo = Math.ceil(Math.random()*6);
const playerOneOwnedProperties = [];
const playerTwoOwnedProperties = [];
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
let otherPlayer;
let winner;
let loser;
const diceAudio = document.getElementById("audioDice");
const fogAudio = document.getElementById("audioFog");
const jailAudio = document.getElementById("audioJail");
const errorAudio = document.getElementById("audioError");
const getMoneyAudio = document.getElementById("audioGo");
const buyAudio = document.getElementById("audioBuy");
const noMoneyAudio = document.getElementById("audioNoMoney");
const honkAudio = document.getElementById("audioHonk");

// handling winners score

if (!localStorage.getItem('storageScore')) {
  const storageScore = {
    Kate: 840,
    Mike: 900
  }
  localStorage.setItem('storageScore', JSON.stringify(storageScore));
}

const updateStorageScore = (playerName, score) => {
  const storageScore = JSON.parse(localStorage.getItem('storageScore'));
  storageScore.playerName = score;
  localStorage.setItem('storageScore', storageScore);
};

const showScoreResults = () => {
  const winnersContainer = document.getElementById('winnersContainer');
  const storageScore = JSON.parse(localStorage.getItem('storageScore'));
  for (let key in storageScore) {
      const p = document.createElement('p');
      p.innerHTML = key + '   ' + storageScore[key];
      winnersContainer.append(p);
  }
}
showScoreResults();

// objects for each property

var allProperties = {
  go : {
      name: "GO!",
      action: "Проходи...",
      value: "Получи $200!!",
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
      name: "Неправильное направление!",
      action: "One Way Street", 
      value: "Заплати штраф $100",
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
      name: "Шанс! Возьми карту и следуй инструкциям.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance2 : {
      name: "Шанс! Возьми карту и следуй инструкциям.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance3 : {
      name: "Шанс! Возьми карту и следуй инструкциям.",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/chance.jpg'
  },
  chance4 : {
      name: "Шанс! Возьми карту и следуй инструкциям.",
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
      action: "Пропусти ход",
      value: "",
      price: 0,
      rent: 0,
      owner: '',
      url: 'assets/images/prop-imgs/fog.jpg'
  },
  jail : {
      name: "Busted!",
      action: "Парковка в неразрешенном месте",
      value: "Оплати штраф $80",
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

  // Object for chance cards

  var chanceCard = [
  {
     name: 'Просроченная парковка.', 
     action: 'Оплатите штраф.',
     value: -20
  },
  {
      name: 'Плюшки в работе: бесплатные ланчи!',
      action: 'Экономьте на стоимости ланчей.',
      value: 100
  },
  {
      name: 'Ваш автомобиль сломался.',
      action: 'Закажите UBER.',
      value: -30
  },
  {
      name: 'Прогулка по Golden Gate Bridge.',
      action: 'Заплатите за вход.',
      value: -50
  },
  {
      name: 'Опоздание на паром.',
      action: 'Оставайтесь на ночь в городе.',
      value: -250
  },
  {
      name: 'Получение второй работы для оплаты аренды дома.',
      action: 'Получи зарплату!',
      value: 300
  },
  {
      name: 'Большая Игра сегодня!',
      action: 'Погуляй по AT&T Park.',
      value: -100
  },
  {
      name: 'Проезд на общественном транспорте.',
      action: 'Сэкономь на бензине.',
      value: 80
  },
  {
      name: 'Экскурсия по городу',
      action: 'Купи сувениры.',
      value: -150
  },
  {
      name: 'Поход в магазин здорового питания.',
      action: 'Купи продуктов и береги здоровье!',
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

  position = player + "-" + property;

// Show tokens on card after die rolls

  if (startMove === playerPositionCounter) {
      clearInterval(hideInterval);
      clearInterval(showInterval);
      display = 'show';
      if (property == boardPosition[playerPositionCounter]) {
          playerEvent(player, property);
      }
  }

  const currentTokenStyle = document.getElementById(position).style;
    if (display === 'show'){
      currentTokenStyle.display = 'block';
        startMove++;
    } else if (display === 'hide'){
      currentTokenStyle.display = 'none';
    }    
}

// Game Start - Player1 rolls dice

  playerOneGameDieImage.addEventListener('click', () => {
  if (playerOneClickFlag) return;
  
  allPlayers.playerTwo.turn = 'false';
  allPlayers.playerOne.turn = 'true';
  let alreadyMissedTurn = 0;
  startMove = playerOnePositionCounter;
  
  startDieOne = Math.ceil(Math.random()*6);
  
  diceAudio.play();
  playerOneGameDieImage.setAttribute('src', `assets/images/dice/${startDieOne}.png`);
  playerOneGameDieImage.classList.add('die');
  playerOnePositionCounter = playerOnePositionCounter + startDieOne; //startDieOne;
  allPlayers.playerOne.currentPosition = boardPosition[playerOnePositionCounter];

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
  playerTwoPositionCounter = playerTwoPositionCounter + startDieTwo; //startDieTwo;
  allPlayers.playerTwo.currentPosition = boardPosition[playerTwoPositionCounter];

  hideInterval = setInterval(function() {
    displayPlayerPiece('playerTwo', boardPosition[startMove], 'hide', playerTwoPositionCounter);
  }, 800);
  showInterval = setInterval(function() {
    displayPlayerPiece('playerTwo', boardPosition[startMove+1],'show', playerTwoPositionCounter);
  }, 1000);
  playerTwoClickFlag = true;
})

//Display the appropriate content in the dynamic player event window for player to take action

function playerEvent (player, property) {
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
          interactionNoButton.innerHTML = 'Нет';
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
      else {
          if (allProperties[currentProperty].owner === player) {
              interactionImageID.style.display = 'none';
              interactionYesButton.style.display = 'none';
              interactionBuy.style.display = 'none';
              interactionAlert.style.display = 'none';
              interactionChanceName.style.display = 'none';
              interactionChanceAction.style.display = 'none';
              interactionChanceAmount.style.display = 'none';
              interactionContinueButton.style.display = 'none';
              interactionNoButton.innerHTML = 'Продолжить';
              interactionNoButton.classList.remove('btn-danger');
              interactionNoButton.classList.add('btn-warning');
              interactionNoButton.style.cssText = 'width: 90px; margin-left: 30%';
              interactionPropertyText.innerHTML = 'Ты теряешь '+ allProperties[currentProperty].name + '.';
              interactionPropertyText.style.display = 'block';
              interactionRentText.innerHTML = 'Без арендной платы';
              interactionRentText.style.display = 'block';
              interactionRent.style.display = 'block';
              interactionNoButton.style.display = 'block'; //USE No button
              interactionElementID.style.display = 'block';
          }
          else {
              if (eval(ownedProperty).indexOf(currentProperty) >= 0 && eval(ownedProperty).indexOf(allProperties[currentProperty].pair) >= 0) {
                rentOwed = allProperties[currentProperty].rent + ((allProperties[currentProperty].rent) * 0.5);
              }
              else {
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
              interactionProperty.innerHTML = allProperties[property].name + ' принадлежит другому игроку. $';
              interactionProperty.style.display = 'block';
              interactionRent.innerHTML = rentOwed + 'аренды.';
              interactionRent.style.display = 'block';
              interactionRent.style.display = 'block';
              interactionContinueButton.innerHTML = 'Оплати аренду';
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
          interactionContinueButton.innerHTML = 'Продолжить';
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
              interactionChanceAmount.innerHTML = 'Ты теряешь $' + ((chanceCard[ranChanceCard].value) * -1);
          }
          else {
              interactionChanceAmount.innerHTML = 'Ты получаешь $' + chanceCard[ranChanceCard].value;
          }
          interactionContinueButton.innerHTML = 'Продолжить';
          interactionChanceName.style.display = 'block';
          interactionChanceAction.style.display = 'block';
          interactionChanceAmount.style.display = 'block';
          interactionContinueButton.style.display = 'block';
          interactionElementID.style.display = 'block';
      }
  }
}

//When player clicks Yes to buy property

let interactionYesButtons = document.getElementsByClassName('interactionYesButton');
for (let i = 0; i < interactionYesButtons.length; i++) {
  interactionYesButtons[i].addEventListener('click', function(event) {
    let noMoneycounter;
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
        interactionAlert.innerHTML = 'К сожалению, у Вас недостаточно денег для покупки ' + allProperties[currentProperty].name;
        interactionContinueButton.style.display = 'none';
        interactionBuy.style.display = 'none';
        interactionImageID.style.display = 'none';
        interactionNoButton.innerHTML = 'Продолжить';
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
        allPlayers[player].cash = (allPlayers[player].cash) - (allProperties[currentProperty].price); 
        document.getElementById(player + 'GameCash').innerHTML = allPlayers[player].cash;

        const isPlayerOne = this.getAttribute('data-player') === "one";
        player = isPlayerOne ? 'playerOne' : 'playerTwo';
        const url = allProperties[currentProperty].url;
        allProperties[currentProperty].owner = player;
        isPlayerOne ? playerOneOwnedProperties.push(currentProperty) : playerTwoOwnedProperties.push(currentProperty);
        const playerOwnedProperties = isPlayerOne ? document.getElementById('playerOneGameOwnedPropertiesDiv') : document.getElementById('playerTwoGameOwnedPropertiesDiv');
        const image = document.createElement("img");
        image.setAttribute('class', 'propertiesOwnedImage');
        image.setAttribute('src', url);
        image.setAttribute('title',allProperties[currentProperty].name);
        playerOwnedProperties.append(image);
  
      let playerInteractionModule = document.getElementById(player+'-interactions');
      playerInteractionModule.style.display = 'none';
      switchPlayer(player, 'false');
    }
  })
}

//when player clicks no to buy a property
let interactionNoButtons = document.getElementsByClassName('interactionNoButton');
for (let i = 0; i < interactionNoButtons.length; i++) {
  interactionNoButtons[i].addEventListener('click', function(event) {
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
}

//player clicks on Chance continue or Pay Rent button 
const interactionContinueButtons = document.getElementsByClassName('interactionContinueButton');
for (let i = 0; i < interactionContinueButtons.length; i++) {
  interactionContinueButtons[i].addEventListener('click', function(event) {
    const isPlayerOne = this.getAttribute('data-player') === 'one';
    player = isPlayerOne && 'playerOne' || 'playerTwo';
    otherPlayer = isPlayerOne && 'playerTwo' || 'playerOne';

    const gameCashDiv = document.getElementById(player + 'GameCash')
  
  // Corner Squares
  if (currentProperty === "oneWayStreet" || currentProperty === "fog" || currentProperty === "jail" || currentProperty === "go") {
      if ( currentProperty === "fog") {
          allPlayers[player].missTurn = true;
      }
      else if (currentProperty === 'go') {
            const updatedCash = allPlayers[player].cash + 200
            allPlayers[player].cash = updatedCash;
            gameCashDiv.innerHTML = updatedCash;
      }
      else if (currentProperty === "oneWayStreet") {
            if ((allPlayers[player].cash - 100) < 0) {
              allPlayers[player].cash = 0;
              gameOver(player);
          }
          else {
              allPlayers[player].cash = (allPlayers[player].cash) - 100;
                gameCashDiv.innerHTML = allPlayers[player].cash;
          }            
      }
      else if (currentProperty === "jail") {
            if ((allPlayers[player].cash - 80) < 0) {
              allPlayers[player].cash = 0;
              gameOver(player);
          }
          else {
                allPlayers[player].cash = allPlayers[player].cash - 80;
                gameCashDiv.innerHTML = allPlayers[player].cash;
          }            
      }
  }
  //IF Chance Card and ELSE Rent due
  else {
      if (allProperties[currentProperty].owner == '') {
          if ((allPlayers[player].cash) + (chanceCard[ranChanceCard].value) < 0) {
              allPlayers[player].cash = 0;
              // alert(player+' Losses');
              gameOver(player);
          }
          else {
              allPlayers[player].cash = (allPlayers[player].cash) + (chanceCard[ranChanceCard].value);
                gameCashDiv.innerHTML = allPlayers[player].cash;
          }
          
      }
      else {
          if ((allPlayers[player].cash) - (rentOwed) < 0) {
              allPlayers[player].cash = 0;
              gameOver(player);
          }
          else {
              allPlayers[player].cash = (allPlayers[player].cash) - (rentOwed);
                gameCashDiv.innerHTML = allPlayers[player].cash;
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

}

//switch turns, miss a turn
function switchPlayer (player, value) {
  if (player == 'playerOne') {
      if (allPlayers.playerTwo.missTurn == true) {
          allPlayers.playerOne.turn = true;
          allPlayers.playerTwo.turn = value;
          allPlayers.playerTwo.missTurn = false;
      }
      else {
          allPlayers.playerOne.turn = value;
          allPlayers.playerTwo.turn = true;
      }
      
  }
  else if (player === 'playerTwo') {
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

  if (allPlayers.playerOne.turn === true) {
      document.getElementById('playerOneGameDie').style.display = 'block';
      document.getElementById('playerOneGameDieImage').style.display = 'inline-block';
  }
  else if (allPlayers.playerTwo.turn === true) {
    document.getElementById('playerTwoGameDie').style.display = 'block';
    document.getElementById('playerTwoGameDieImage').style.display = 'inline-block';
  }
}

// Game over page displays

function gameOver (player) { // loser
  if (player === "playerOne") {
      otherPlayer = "playerTwo";
      winner = (allPlayers[otherPlayer].name).toUpperCase();
      loser = (allPlayers[player].name).toUpperCase();
      const winnerImg = document.getElementById('winnerImg');
      winnerImg.setAttribute('src', winnerImg.getAttribute('data-playerTwo'));
      updateStorageScore(winner, allPlayers.playerTwo.cash); // add a winner data to Local Storage
  } else {
      otherPlayer = "playerOne";
      winner = (allPlayers[otherPlayer].name).toUpperCase();
      loser = (allPlayers[player].name).toUpperCase();
      winnerImg.setAttribute('src', winnerImg.getAttribute('data-playerOne'));
      updateStorageScore(winner, allPlayers.playerOne.cash);
    }

  goGame.setAttribute('data-gamestart', 'no');
  containerMainGame.style.display = 'none';

  const showWinner = document.getElementById('winner');
  const showLoser = document.getElementById('loser');
  showWinner.innerHTML = winner;
  showLoser.innerHTML = loser;
  const containersEndGame = document.getElementsByClassName('containerEndGame');
  for (let i = 0; i < containersEndGame.length; i++) {
    containersEndGame.style.display = 'block';
  }
}