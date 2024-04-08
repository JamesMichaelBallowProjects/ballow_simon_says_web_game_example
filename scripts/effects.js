// main song playing in background
let beat = new Audio('./sounds/main_theme.mp3');

document.getElementById('play-game-button').addEventListener('click', () => {
    beat.play();
})



// transition between welcome page -> game
function transition_to_game() {
    
}