var buttonColors = [
    "red",
    "blue", 
    "green", 
    "yellow"
]

var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var gameLevel = -1;
var currentClick = 0;

//simon gives the next item in sequence
function nextSequence(){
    //change what level it is
    gameLevel++;
    $("h1").html("Level " + gameLevel);
    
    //add new item to game pattern
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(() => {
        animateButtonForSimon(randomChosenColor);
        playSoundForButtonWithColor(randomChosenColor); 
    }, 1000);

}

//user enters entire sequence including new simon item
$(".btn").click(function(event){
    var userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    animateButtonForUser(userChosenColor);
    playSoundForButtonWithColor(userChosenColor);
})

//ancillary functions
function animateButtonForSimon(c){
    $('#' + c).fadeOut();
    $('#' + c).fadeIn();
}
function animateButtonForUser(c){
    $('#' + c).addClass("pressed");
    setTimeout(() => {
        $('#' + c).removeClass("pressed");
    }, 100);
    currentClick++;
    checkAnswer(c);
}
function playSoundForButtonWithColor(c){
    var sound = new Audio("sounds/" + c + ".mp3");
    sound.play();
}

//start game if this is first time key pressed
$(document).keydown(function(key){
    if (gameStarted == false){
        gameStarted = true;
        nextSequence();
    }
})

//check answer
function checkAnswer(color){
    if (color != gamePattern[currentClick-1]){
        gamePattern = [];
        userClickedPattern = [];
        gameStarted = false;
        gameLevel = -1;
        currentClick = 0;
        playSoundForButtonWithColor("wrong");
        $("h1").html("Oh no! That's wrong! Press any key to start again.")
    }else{
        if (currentClick == gamePattern.length){
            currentClick = 0;
            nextSequence();
        }    
    }
    console.log("Pattern: " + gamePattern )
    console.log("User: " + userClickedPattern )

}