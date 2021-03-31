
var activePlayer = 0;


var scores = [0, 0];


var roundScore = 0;


document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

var diceDom = document.querySelector(".dice");
diceDom.style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {

  var diceNumber = Math.floor(Math.random() * 6) + 1;


  diceDom.style.display = "block";


  diceDom.src = "dice-" + diceNumber + ".png";


  if (diceNumber !== 1) {
    
    roundScore = roundScore + diceNumber;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
  } else {
  
    switchToNextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {


  scores[activePlayer] = scores[activePlayer] + roundScore;


  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];


  if (scores[activePlayer] >= 10) {
  
    document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {

    switchToNextPlayer();
  }
});


function switchToNextPlayer() {

  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;


  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);


  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");


  diceDom.style.display = "none";
}