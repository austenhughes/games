const colorOne = document.getElementById("color1");
const colorTwo = document.getElementById("color2");
const colorThree = document.getElementById("color3");
const colorFour = document.getElementById("color4");

const score = document.getElementById("score");
const lives = document.getElementById("lives");
const highScores = document.getElementById("highScoresList");
const highScoresNames = document.getElementById("highScoresListNames");

let computer = "";
let player = "";
let level = 0;

function signal(next) {
    setTimeout(function(){
    switch(next) {
        case 1:
            colorOne.style.backgroundColor='rgb(208, 252, 237)';
            setTimeout(function(){ colorOne.style.backgroundColor='aquamarine' }, 500);
            break;
        case 2:
            colorTwo.style.backgroundColor='rgb(248, 224, 228)';
            setTimeout(function(){ colorTwo.style.backgroundColor='pink' }, 500);
            break;
        case 3:
            colorThree.style.backgroundColor='rgb(233, 219, 248)';
            setTimeout(function(){ colorThree.style.backgroundColor='rgb(190, 162, 223)' }, 500);
            break;
        case 4:
            colorFour.style.backgroundColor='rgb(253, 253, 183)';
            setTimeout(function(){ colorFour.style.backgroundColor='yellow' }, 500);
            break;
        default:
            console.log("start")
      }
    }, 750);
  }

colorOne.addEventListener("click", function() {
    colorOne.style.backgroundColor='rgb(208, 252, 237)';
    setTimeout(function(){ colorOne.style.backgroundColor='aquamarine' }, 500);
    player = player + "1";
    // console.log(player);
    checkEach();
  });

colorTwo.addEventListener("click", function() {
    colorTwo.style.backgroundColor='rgb(248, 224, 228)';
    setTimeout(function(){ colorTwo.style.backgroundColor='pink' }, 500);
    player = player + "2";
    // console.log(player);
    checkEach();
  });

colorThree.addEventListener("click", function() {
    colorThree.style.backgroundColor='rgb(233, 219, 248)';
    setTimeout(function(){ colorThree.style.backgroundColor='rgb(190, 162, 223)' }, 500);
    player = player + "3";
    // console.log(player);
    checkEach();
  });

colorFour.addEventListener("click", function() {
    colorFour.style.backgroundColor='rgb(253, 253, 183)';
    setTimeout(function(){ colorFour.style.backgroundColor='yellow' }, 500);
    player = player + "4";
    // console.log(player);
    checkEach();
  });

computerMove();
function computerMove() {
    let topScores = localStorage.getItem("highScores")
    highScores.innerHTML = topScores;
    let name = localStorage.getItem("name")
    highScoresNames.innerHTML = name;
    
    getRandomInt(1,5);
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let next = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        computer = computer + next;
        // console.log(computer);
        player = "";
        let computerArray = computer.split("");
        runLights(computerArray);
        };
}

function runLights(computerArray) {
        computerArray.forEach((element,i) => {
            const light = parseInt(element)
            setTimeout(
                function(){
                    signal(light);  
                }
            , i * 1000);
        });
}

function checkEach() {
        let playerArray = player.split("");
        let computerArray = computer.split("");
        for (let index = 0; index < playerArray.length; index++) {
            if (computerArray[index] === playerArray[index]){
                levelUp();
            }else{
                endGame ();
            }
        }
}

function endGame (){

    let highScoresStored = localStorage.getItem("highScores")
    let highScoresNamesStored = localStorage.getItem("name")
    console.log(highScoresStored);
    console.log(highScoresNamesStored);

    let highScoresArray = highScoresStored.split(" ");
    let highScoresNameArray = highScoresNamesStored.split(" ");
    console.log(highScoresArray);
    console.log(highScoresNameArray);

        // if (level>highScoresStored){
            if (level>highScoresArray[0]){
            let name = window.prompt("high score! enter your name here :");
            
            // let levelString = level.toString;
            let newHighScores = highScoresStored + " " + level;
            
            let highScoreNameList = (highScoresNamesStored + " " + name);
            
            localStorage.setItem("highScores", newHighScores);
            localStorage.setItem("name", highScoreNameList);

            let newHighScoresList = localStorage.getItem("highScores");
            let newNameList = localStorage.getItem("name")

            console.log(newHighScoresList);
            console.log(newNameList);

            // needed for once through
            // localStorage.setItem("highScores", level);
            // localStorage.setItem("name", name);
            
            // console.log("New high score " + level);
            highScores.innerHTML = level;
            highScoresNames.innerHTML = name;
            score.innerHTML = 0;
        }
  

    window.alert("game over ... play again?")
    player = "";
    computer = "";
    level = 0;
    computerMove();
}

function levelUp() {
       setTimeout(function(){
        if (computer.length === player.length) {
            level = level+1;
            // console.log(level);
            score.innerHTML = level;
            computerMove();
           }
       }, 1000);
      }

