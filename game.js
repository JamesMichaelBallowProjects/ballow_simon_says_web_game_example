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
var semaphore_lock = true;
let hermioneGif = document.getElementById('hermione-gif-leviosa');

var gamePieces = [
    "gryffindor",
    "slytherin",
    "hufflepuff",
    "ravenclaw"
]
var sounds = {
    "gryffindor": "",
    "slytherin": "",
    "hufflepuff": "",
    "ravenclaw": ""
}
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
    // userPattern = [];
    gameStarted = false;
    gameLevel = 0;
    currentClick = 0;
    gameActive = true;
    semaphore_lock = true;  //lockout user
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
        semaphore_lock = false;  // release game pieces to player
    }, gamePieceActivationTimeout);
}

function check_user_pattern_this_click(seleted_game_piece) {
    if (!semaphore_lock) {
        // increment click count
        currentClick++;

        // animate
        activate_game_piece(seleted_game_piece)

        // check answer
        check_selected_game_piece(seleted_game_piece.id)
    }
}

function check_selected_game_piece(game_piece_id){
    if (gameActive) {
        // last clicked game piece was not what Ballow Says
        if (game_piece_id != gamePattern[currentClick-1]){
            gracefully_end_game()
        }else{
            // entire sequence is what Ballow Says
            if (currentClick == gamePattern.length){
                console.log("CORRECT SEQUENCE.")
                currentClick = 0;
                // userPattern = [];
                semaphore_lock = true;
                setTimeout(() => {
                    ballow_says_next_game_piece();
               }, gamePieceActivationTimeout);

            // answer so far is what Ballow Says, but user not done yet
            } else {
                console.log("Keep clicking")
            }
        }
    }
}

function gracefully_end_game() {
    console.log(`You achieved a score of: ${gameLevel-1}`)
    gameActive = false;
    semaphore_lock = true;
    setTimeout(() => {
        hermioneGif.hidden = false;
        setTimeout(() => {
            sound = new Audio('./sounds/leviosa_not_leviosaaa.mp3');
            sound.play();
        }, 340);
        setTimeout(() => {
            hermioneGif.hidden = true;
        }, 4400)
    }, gamePieceActivationTimeout)

}
