// background image selector
let backgroundSelector = document.getElementById("background-img-selector")
backgroundSelector.addEventListener('change', () => {
  document.getElementById("body-elem").style.backgroundImage = `url(${backgroundSelector.value})`;
})

// start button
let startGameButton = document.getElementById("start-game-button")
startGameButton.addEventListener('click', () => {
    start_game();
})



// GAMING LOGIC
// initialization
var gamePattern;
var userPattern;
var gameLevel;
var currentClick;
var sound;
var gameActive = false;

var gamePieces = [
    "gryffindor",
    "slytherin",
    "hufflepuff",
    "ravenclaw"
]
var gamePieceActivationTimeout = 1000

// game piece animations
function activate_game_piece(game_piece_element){
    // colorize game piece
    $(game_piece_element).addClass("ignite");
    setTimeout(() => {
        $(game_piece_element).removeClass("ignite");
    }, gamePieceActivationTimeout);

    // play sound
    var sound = new Audio('./sounds/confringo.mp3');
    sound.play();
}

// setup new game
function setup_new_game(params) {
    gamePattern = [];
    userPattern = [];
    gameStarted = false;
    gameLevel = -1;
    currentClick = -1;
    gameActive = true;
}
function start_game(params) {
    // reset memory
    setup_new_game();

    // start pattern creation
    ballow_says_next_game_piece();
}

// handle pattern (game)
function ballow_says_next_game_piece(){
    // increment level
    gameLevel++;

    // $("h1").html("Level " + gameLevel);

    // append new element to pattern
    var r = Math.floor(Math.random()*4);
    var gamePieceId = gamePieces[r];
    gamePattern.push(gamePieceId);

    // show user selected game piece
    setTimeout(() => {
        activate_game_piece(document.getElementById(gamePieceId))
    }, gamePieceActivationTimeout);
    console.log(`Ballow says next piece is: ${gamePieceId}`)
}

function check_user_pattern_this_click(seleted_game_piece) {
    // todo only permit execution of this if lock is not locked

    // increment click count
    currentClick++;

    // animate
    activate_game_piece(seleted_game_piece)

    // check answer
    check_selected_game_piece(seleted_game_piece.id)

    // add answer to list
}

function check_selected_game_piece(game_piece_id){
    console.log(`Checking Selection: ${game_piece_id}`)
    if (gameActive) {
        if (game_piece_id != gamePattern[currentClick]){
            console.log("LOSE!")
            gameActive = false;
            sound = new Audio('./sounds/green.mp3');
            // $("h1").html("Oh no! That's wrong! Press any key to start again.")
        }else{
            console.log("CORRECT PIECE.")
            // they are equal so far, so add it to list
            userPattern.push(game_piece_id)
            if (currentClick+1 == gamePattern.length){
                console.log("CORRECT SEQUENCE.")
                currentClick = 0;
                ballow_says_next_game_piece();
            } else {
                console.log("Keep clicking")
            }
        }
    }
}
