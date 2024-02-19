const balloon = document.getElementById('balloon');
let score = 0;
let backgroundAudio = document.getElementById('backgroundAudio');
let MemeAudio = document.getElementById("MemeAudio");
let OutAudio = document.getElementById("OutAudio");
let gamePaused = false;

window.onload = function () {
    backgroundAudio.play()
};


function moveBalloon(direction) {
    if (gamePaused) return;

    const currentLeft = parseFloat(getComputedStyle(balloon).left);
    const currentBottom = parseFloat(getComputedStyle(balloon).bottom);
    const step = 80;

    if (direction === 'left') {
        const newLeft = Math.max(0, currentLeft - step);
        balloon.style.left = `${newLeft}px`;
    } else if (direction === 'right') {
        const newLeft = Math.min(window.innerWidth - parseFloat(getComputedStyle(balloon).width), currentLeft + step);
        balloon.style.left = `${newLeft}px`;
    } else if (direction === 'up') {
        const newBottom = Math.max(50, currentBottom + step);
        balloon.style.bottom = `${newBottom}px`;
    } else if (direction === 'down') {
        const newBottom = Math.max(50, currentBottom - step);
        balloon.style.bottom = `${newBottom}px`;
    }

    checkCollision();
}

function createStone() {
    if (gamePaused) return;

    const stone = document.createElement('div');
    stone.classList.add('stone');
    const randomLeft = Math.random() * (410 - 30); // Adjusted width for mobile
    stone.style.left = `${randomLeft}px`;
    document.body.appendChild(stone);

    stone.addEventListener('animationiteration', () => {
        document.body.removeChild(stone);
        // score++;
        // updateScore();
    });

    return stone;
}

function checkCollision() {
    if (gamePaused) return;

    const balloonRect = balloon.getBoundingClientRect();
    const stones = document.querySelectorAll('.stone');

    stones.forEach((stone) => {
        const stoneRect = stone.getBoundingClientRect();

        if (
            balloonRect.bottom > stoneRect.top &&
            balloonRect.top < stoneRect.bottom &&
            balloonRect.right > stoneRect.left &&
            balloonRect.left < stoneRect.right
        ) {
            gameOver();
        }
    });
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}


function gameOver() {
    gamePaused = true;
    document.querySelector("#result").innerHTML = `Game Over! Your score is ${score}`;
    document.querySelector("#reset").classList.add("reset-btn-show");
    balloon.classList.add("balloon-out");
    backgroundAudio.pause();
    MemeAudio.play();
    setTimeout(()=>{OutAudio.play();}, 700)
}

document.querySelector("#reset").addEventListener("click", ()=>{
    gamePaused = false;
    resetGame();
    console.log("Resettt")
});


function resetGame() {
    score = 0;
    document.getElementById('score').innerText = 'Score: 0';
    document.querySelector("#result").innerHTML = ``;
    document.querySelector("#reset").classList.remove("reset-btn-show");
    balloon.classList.remove("balloon-out");
    backgroundAudio.play();
    OutAudio.pause();
    balloon.style.left = '50%';
    document.querySelectorAll('.stone').forEach((stone) => {
        document.body.removeChild(stone);
    });
}


setInterval(() => {
    const stone = createStone();
    stone.style.animationDuration = `${Math.random() * 2 + 1}s`; // Randomize stone speed
}, 3000);

setInterval(() => {
    if (gamePaused) return;
    checkCollision();
    score++;
    updateScore();
}, 100);

// // Background
// const background = document.createElement('div');
// background.classList.add('background');
// document.body.appendChild(background);