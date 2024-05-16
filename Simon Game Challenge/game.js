buttonColours = ["red", "blue", "green", "yellow"];
//Create game array and users array
gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

//Start the game
$("body").on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true; //Make sure only first key can invoke the game
  }
});
//User interaction
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id"); //Get to know user's choice
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1); //Check current click's answer
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //if current answer is correct
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      //To check if the current level is end
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("false");
    var wrongAudio = new Audio("./sounds/wrong.mp3");
    wrongAudio.play();
    $("body").toggleClass("game-over");
    setTimeout(() => {
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = []; //Clear the last level's user pattern
  level++;
  $("#level-title").text("Level " + level);
  //Create one random color each round
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //flash the button
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //make the sound of button
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).toggleClass("pressed");
  }, 100);
}
