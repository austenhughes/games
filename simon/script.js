const colorOne = document.getElementById("color1");
const colorTwo = document.getElementById("color2");
const colorThree = document.getElementById("color3");
const colorFour = document.getElementById("color4");

const score = document.getElementById("score");
const lives = document.getElementById("lives");
const highScores1 = document.getElementById("highScoresList1");
const highScores2 = document.getElementById("highScoresList2");
const highScores3 = document.getElementById("highScoresList3");
const highScoresNames1 = document.getElementById("highScoresListNames1");
const highScoresNames2 = document.getElementById("highScoresListNames2");
const highScoresNames3 = document.getElementById("highScoresListNames3");

let computer = "";
let player = "";
let level = 0;

function signal(next) {
  setTimeout(function () {
    switch (next) {
      case 1:
        colorOne.style.backgroundColor = "rgb(208, 252, 237)";
        setTimeout(function () {
          colorOne.style.backgroundColor = "aquamarine";
        }, 500);
        break;
      case 2:
        colorTwo.style.backgroundColor = "rgb(248, 224, 228)";
        setTimeout(function () {
          colorTwo.style.backgroundColor = "pink";
        }, 500);
        break;
      case 3:
        colorThree.style.backgroundColor = "rgb(233, 219, 248)";
        setTimeout(function () {
          colorThree.style.backgroundColor = "rgb(190, 162, 223)";
        }, 500);
        break;
      case 4:
        colorFour.style.backgroundColor = "rgb(253, 253, 183)";
        setTimeout(function () {
          colorFour.style.backgroundColor = "yellow";
        }, 500);
        break;
      default:
        console.log("start");
    }
  }, 750);
}

colorOne.addEventListener("click", function () {
  colorOne.style.backgroundColor = "rgb(208, 252, 237)";
  setTimeout(function () {
    colorOne.style.backgroundColor = "aquamarine";
  }, 500);
  player = player + "1";
  checkEach();
});

colorTwo.addEventListener("click", function () {
  colorTwo.style.backgroundColor = "rgb(248, 224, 228)";
  setTimeout(function () {
    colorTwo.style.backgroundColor = "pink";
  }, 500);
  player = player + "2";
  checkEach();
});

colorThree.addEventListener("click", function () {
  colorThree.style.backgroundColor = "rgb(233, 219, 248)";
  setTimeout(function () {
    colorThree.style.backgroundColor = "rgb(190, 162, 223)";
  }, 500);
  player = player + "3";
  checkEach();
});

colorFour.addEventListener("click", function () {
  colorFour.style.backgroundColor = "rgb(253, 253, 183)";
  setTimeout(function () {
    colorFour.style.backgroundColor = "yellow";
  }, 500);
  player = player + "4";
  checkEach();
});

computerMove();
function computerMove() {
  if(localStorage.getItem("highScores") !== null){
  let topScores = localStorage.getItem("highScores");
  let topScoresArray = topScores.split(" ");
  console.log(topScoresArray[0]);
  console.log(topScoresArray[1]);
  console.log(topScoresArray[2]);
  let name = localStorage.getItem("name");
  let nameArray = name.split(" ");
  highScoresNames1.innerHTML = nameArray[0];
  highScoresNames2.innerHTML = nameArray[1];
  highScoresNames3.innerHTML = nameArray[2];
  }
  getRandomInt(1, 5);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let next = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    computer = computer + next;
    player = "";
    let computerArray = computer.split("");
    runLights(computerArray);
  }
}

function runLights(computerArray) {
  computerArray.forEach((element, i) => {
    const light = parseInt(element);
    setTimeout(function () {
      signal(light);
    }, i * 1000);
  });
}

function checkEach() {
  let playerArray = player.split("");
  let computerArray = computer.split("");
  for (let index = 0; index < playerArray.length; index++) {
    if (computerArray[index] === playerArray[index]) {
      levelUp();
    } else {
      endGame();
    }
  }
}

function endGame() {
  let highScoresStored = localStorage.getItem("highScores");
  let highScoresNamesStored = localStorage.getItem("name");

  let highScoresArray = highScoresStored.split(" ");
  let highScoresNameArray = highScoresNamesStored.split(" ");

  for (let index = 0; index < highScoresArray.length; index++) {
    const element = highScoresArray[index];
    if (highScoresArray.length >= 3) {
      if (level > element) {
        let name = window.prompt("high score! enter your name here :");
        highScoresArray[index] = level;
        highScoresNameArray[index] = name;
        let savingHighScoreString = highScoresArray.join(" ");
        let savingHighScoreNamesString = highScoresNameArray.join(" ");
        localStorage.setItem("highScores", savingHighScoreString);
        localStorage.setItem("name", savingHighScoreNamesString);
        score.innerHTML = 0;
        break;
      }
    } else if (highScoresArray.length <= 2) {
      if (level > element) {
        let name = window.prompt("high score! enter your name here :");
        let newHighScores = highScoresStored + " " + level;
        let highScoreNameList = highScoresNamesStored + " " + name;
        localStorage.setItem("highScores", newHighScores);
        localStorage.setItem("name", highScoreNameList);
        score.innerHTML = 0;
      }
    } else {
      console.log("nothing yet");
    }
  }
  // let name = window.prompt("high score! enter your name here :");
  window.alert("game over ... play again?");
  player = "";
  computer = "";
  level = 0;
  computerMove();

  // for clear out
  // localStorage.setItem("highScores", level);
  // localStorage.setItem("name", name);
}

function levelUp() {
  setTimeout(function () {
    if (computer.length === player.length) {
      level = level + 1;
      // console.log(level);
      score.innerHTML = level;
      computerMove();
    }
  }, 1000);
}
