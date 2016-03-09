$(document).ready(function(){
  $('.start-game').on('click', function(){
    start();
  })

  for(var i = 0; i < 10; i++) {
    $('.game-table').prepend('<tr><td class="square"><img id="' + i + '1"></img></td><td class="square"><img id="' + i + '2"></img></td><td class="square"><img id="' + i + '3"></img></td><td class="square"><img id="' + i + '4"></img></td><td class="square"><img id="' + i + '5"></img></td></tr>');
  }
})

//Initialize first coin
var firstCoin = {
    posX: Math.floor(Math.random()*5 + 1),
    posY: 9
}

//array to hold coin objects
var coins = [firstCoin];

//Finds position of object on game board
function findPosition(object){
  return object.posY.toString() + object.posX.toString();
}

var highScore = 0;

var pouch = {
  posX: 3,
  posY: 0,
  coins: 0,
  missed: 0,
  stepsTaken: 0
}

//made move its own function so that restartGame would work
var move = function(direction) {

    //only allow movement if player did not miss 5 or more coins
    if (pouch.missed < 5) {

      clearImages();

      //movement functions for pouch
      switch (direction){
        case 'left':
          if (pouch.posX != 1) {
            pouch.posX -= 1;
          }
          break;
        case 'right':
          if (pouch.posX != 5) {
            pouch.posX += 1;
          }
          break;
      }

      showObjects();

    }
}

var drop, spawn;

//Starts dropping coins and spawning new coins over time
function start() {
  restartGame();
  drop = setInterval(dropCoins, 200);
  spawn = setInterval(spawnCoin, 5000);
}

//Drops each coin down one space
function dropCoins() {

      clearImages();

      for (var i = 0; i < coins.length; i++) {
        coins[i].posY -= 1;
        checkCoin(coins[i]);
      }

      //Updates scorescreen
      document.getElementById("missed").innerHTML = "Missed: " + pouch.missed;
      document.getElementById("high-score").innerHTML = "High Score: " + highScore;
      showObjects();

      //prints game over message and stops the game
      if (pouch.missed >= 5) {
      document.getElementById("game-log").innerHTML = "Game over! You collected " + pouch.coins + " coins total!";
        //Updates high score if new high score
        if (highScore < pouch.coins) {
          highScore = pouch.coins;
        }
        //Stops coins from dropping and spawning
        clearInterval(drop);
        clearInterval(spawn);
      }
      //Updates scorescreen
      else {
        document.getElementById("game-log").innerHTML = "You've collected " + pouch.coins + " coins.";
      }
}

//check if player collected coin when coin reaches bottom
function checkCoin(coin) {
  if(coin.posY === 0) {
    if (pouch.posX === coin.posX && pouch.posY === coin.posY){
      pouch.coins += 1;
    }
    else {
      pouch.missed += 1;
    }
    //spawn a new coin at top
    coin.posX = Math.floor(Math.random() * 5 + 1);
    coin.posY = 9;
  }
}

//creates a new coin object to drop
function spawnCoin() {
  var coin = {
    posX: Math.floor(Math.random()*5 + 1),
    posY: 9
  }
  coins.push(coin);
}

//Display coin and pouch positions
function showObjects() {
  document.getElementById(findPosition(pouch)).src = "/img/Pouch.png";
  for (var i = 0; i < coins.length; i++) {
    if (coins[i].posY != 0) {
      document.getElementById(findPosition(coins[i])).src = "/img/Coin.png";
    }
  }
}

//Clear images from coin and pouch positions
function clearImages() {
  document.getElementById(findPosition(pouch)).src = "";
  for (var i = 0; i < coins.length; i++) {
    document.getElementById(findPosition(coins[i])).src = "";
  };
}

//Lets user control with left and right arrow keys
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        move('left');
        break;
      case 39:
        move('right');
        break;
    }
}

//Resets game to original values
var restartGame = function() {

  clearImages();

  pouch = {
    posX: 3,
    posY: 0,
    coins: 0,
    missed: 0,
    stepsTaken: 0,
  }

  firstCoin = {
    posX: Math.floor(Math.random()*5 + 1),
    posY: 9
  }

  coins = [firstCoin];

  showObjects();

}
