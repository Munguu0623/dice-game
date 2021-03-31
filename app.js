var isNewGame;

var activePlayer;
var scores;
var roundScore;

var diceDom = document.querySelector(".dice");

initGame();
// Togloom ehllee gedeg tuluwt oruulana
isNewGame = true;
// Togloom shiner ehlhede beltgene
function initGame() {
  // Тоглогчийн ээлжийг хадгалах хувьсагч
  activePlayer = 0;

  // Тоглогчийн цуглуулсан оноог хадгалах
  scores = [0, 0];

  // Тоглогчийн ээлжин дээр цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;

  // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.

  // Програм эхлэхэд бэлтгэе
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    // 1 - 6 доторх санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    // Шооны зургыг вэб дээр гаргаж ирнэ
    diceDom.style.display = "block";

    // Буусан санассаргүй тоонд харгалзах шооны зургийг вэб дээр гаргаж ирнэ6
    diceDom.src = "dice-" + diceNumber + ".png";
    // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн ээлжийн оноог нэмэгдүүлнэ.
    if (diceNumber != 1) {
      // 1-ээс ялгаатай  тоо  буулаа. Буусан тоог тоглогчид нэмж өгнөө
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. New Game товчыг дарна уу?");
  }
});

// HOLD товчны эвэнт листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    //Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь нэмж өгнө.
    scores[activePlayer] = scores[activePlayer] + roundScore;

    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Togloomiig duussan tuuwt oruulna
      isNewGame = false;

      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".palyer-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".palyer-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна. New Game товчыг дарна уу?");
  }
});

function switchToNextPlayer() {
  // 1 буусан тул тоглогчийн ээлжийг энэ хэсэгт сольж өгнө.
  // Энэ тоглогчийн ээлжиндээ цуглуулсан оноог 0 болгоно.
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // Тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлнэ
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгох
  diceDom.style.display = "none";
}

// New Game Шинэ тоглоом эхлүүлэх
document.querySelector(".btn-new").addEventListener("click", initGame);
