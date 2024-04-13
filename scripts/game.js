// welcome page
// -- disappear and play music
// let welcomePage = document.getElementById('welcome-page')
// document.getElementById('play-game-button').addEventListener('click', () => {
//     var sound = new Audio('./sounds/main_theme.mp3');
//     sound.play();
// })
// function transition_to_game() {
//     welcomePage.classList.add('hide-page')
// }

// background image selector
let backgroundSelector = document.getElementById("background-img-selector")
backgroundSelector.addEventListener('change', () => {
  document.getElementById("body-elem").style.backgroundImage = `url(${backgroundSelector.value})`;
})

// start game button
let startGameButton = document.getElementById("start-game-button")
startGameButton.addEventListener('click', () => {
    start_game();
})

// GAMING LOGIC
// initialization
// -- statics
var gamePattern;
var gameLevel;
var currentClick;
var sound;
var gameActive = false;
var semaphore_lock = true;
var gamePieceActivationTimeout = 1000
var gamePieces = [
    "gryffindor",
    "slytherin",
    "hufflepuff",
    "ravenclaw"
]
var sounds = {
    "gryffindor": "./sounds/expelliarmus.mp3",
    "slytherin": "./sounds/accio.mp3",
    "hufflepuff": "./sounds/confringo.mp3",
    "ravenclaw": "./sounds/wingardium_leviosa.mp3"
}

// -- html
let hermioneGif = document.getElementById('hermione-gif-leviosa');
let scoreCard = document.getElementById('score-card');
let feathers = document.getElementsByClassName('score-piece');

// game piece animations
function activate_game_piece(game_piece_element){
    // colorize game piece
    $(game_piece_element).addClass("ignite");
    setTimeout(() => {
        $(game_piece_element).removeClass("ignite");
    }, gamePieceActivationTimeout);

    // play sound
    var sound = new Audio(sounds[game_piece_element.id]);
    sound.play();
}

// setup new game
function setup_new_game() {
    gameActive = true;
    gameLevel = 0;
    gamePattern = [];
    currentClick = 0;
    semaphore_lock = true;  //lockout user
    replace_all_feathers();
    scoreCard.innerHTML = gameLevel;
}
function start_game() {
    setup_new_game();  // reset memory
    ballow_says_next_game_piece(); // start pattern creation
}

// handle pattern (game)
function ballow_says_next_game_piece(){
    gameLevel++; // increment level

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
    // if user is allowed to be playing right now
    if (!semaphore_lock) {
        currentClick++;  // increment click count
        activate_game_piece(seleted_game_piece); // animate
        check_selected_game_piece(seleted_game_piece.id); // check answer
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
                // prepare for next round
                currentClick = 0;
                semaphore_lock = true;

                // congratulate
                add_feather_to_counter(gameLevel);
                scoreCard.innerHTML = gameLevel;

                // continue to next pattern
                setTimeout(() => {
                    ballow_says_next_game_piece();
               }, gamePieceActivationTimeout);
            }
        }
    }
}

function gracefully_end_game() {
    gameActive = false;
    semaphore_lock = true;
    setTimeout(() => {
        hermioneGif.hidden = false;
        setTimeout(() => {
            sound = new Audio('./sounds/leviosa_not_leviosaaa.mp3');
            sound.play();
            drop_all_feathers();
        }, 340);
        setTimeout(() => {
            hermioneGif.hidden = true;
            replace_all_feathers();
        }, 4400)
    }, gamePieceActivationTimeout)

}

// other effects
function add_feather_to_counter() {
    document.getElementById(`score-${gameLevel}`).classList.remove('hidden-score');
}

function drop_all_feathers() {
    for (let index = 0; index < feathers.length; index++) {
        feathers[index].classList.add('animate');
    }
}

function replace_all_feathers() {
    for (let index = 0; index < feathers.length; index++) {
        feathers[index].classList.add('hidden-score');
        feathers[index].classList.remove('animate');
    }
}