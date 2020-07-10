var commands = [];
var counter = 0;
var GreenSound = new Audio("SimonSaysSounds/green.mp3");
var RedSound = new Audio("SimonSaysSounds/red.mp3");
var YellowSound = new Audio("SimonSaysSounds/yellow.mp3");
var BlueSound = new Audio("SimonSaysSounds/blue.mp3");
var WrongSound = new Audio("SimonSaysSounds/wrong.mp3");

$(".btn").on("click", start);

function start() {
  $(".btn").off("click", start);
  generateCommands();
}

function generateCommands() {
  var randomBtn = Math.floor(Math.random() * 4) + 1;
  commands.push(randomBtn);
  setTimeout(function() {
    playCommands();
    print();
  }, 1000);
}

function playCommands() {
  for (let i = 0; i < commands.length; i++) {
    let whichButton;
    let audio;
    if (commands[i] === 1) {
      whichButton = ".green";
      audio = GreenSound;
    } else if (commands[i] === 2) {
      whichButton = ".red";
      audio = RedSound;
    } else if (commands[i] === 3) {
      whichButton = ".yellow";
      audio = YellowSound;
    } else {
      whichButton = ".blue";
      audio = BlueSound;
    }
    setTimeout(function() {
      $(whichButton).addClass("pressed");
      audio.play();
    }, (i * 1000));
    setTimeout(function() {
      $(whichButton).removeClass("pressed");
    }, (i * 1000 + 500));
  }
  setTimeout(function() {
    $("#level-title").text("Your turn:");
    checkCommands();
  }, (commands.length * 1000 - 500));
}

function checkCommands() {
  $(".btn").on("click", checkEachCommand);
}

function checkEachCommand(event) {
  var chosenBtn = event.currentTarget.classList[1];
  if (chosenBtn == commands[counter]) {
    if (chosenBtn == 1) {
      GreenSound.play();
    } else if (chosenBtn == 2) {
      RedSound.play();
    } else if (chosenBtn == 3) {
      YellowSound.play();
    } else {
      BlueSound.play();
    }

    $("." + chosenBtn).addClass("pressed");
    counter++;
    setTimeout(function() {
      $("." + chosenBtn).removeClass("pressed");
      if (counter === commands.length) {
        $(".btn").off("click", checkEachCommand);
        $("#level-title").text("Good Job! My turn:");
        counter = 0;
        generateCommands();
      }
    }, 500);
  } else {
    WrongSound.play();
    $("." + chosenBtn).addClass("pressed");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("." + chosenBtn).removeClass("pressed");
      $("body").removeClass("game-over");
      $(".btn").off("click", checkEachCommand);
      error();
    }, 500);
  }
}

function error() {
  var arrayLength = commands.length;
  for (var i = 0; i < arrayLength; i++) {
    commands.pop();
  }
  counter = 0;
  $("#level-title").text("WRONG! Press a key to restart");
  $(".btn").on("click", start);
}

function print(){
  console.log(commands);
  console.log(counter);
}
