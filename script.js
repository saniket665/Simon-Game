const btns = document.querySelectorAll(".btn");
const title = document.querySelector("#title");
const audio = document.querySelector("#audio");
const colors = ["red", "green", "blue", "grey", "pink", "violet", "orange", "purple", "skyblue"]
let started = false;
let sequence = [];
let level = 1;
let userClickedPattern = [];
window.addEventListener("keypress", (e) => {
    if(!started) {
        if(e.key == 'Enter') {
            started = true;
            nextSequence();
        }
    }
})
function removeClickAnimation() {
    for(let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("click");
    }
}
let i = 0;
btns.forEach(function(btn, index) {
    btn.addEventListener("click", (e) => {
        btn.classList.add("click");
        playSound("clicked");
        userClickedPattern.push(colors[index]);
        if(JSON.stringify(userClickedPattern) === JSON.stringify(sequence)) {
            level++;
            setTimeout(nextSequence, 1000)
        }
        else {
            if(userClickedPattern[i] == sequence[i]) {
                i++;
            }
            else {
                title.innerHTML = "Game Over, Press Enter to Restart";
                gameOver();
            }
        }
        setTimeout(removeClickAnimation, 100)
    })
})
function removeAnimation(randomNumber) {
    console.log("called");
    for(let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("animate");
    }
}
function playSound(check) {
    if(check == "clicked") {
        audio.setAttribute("src", "Sounds/blue.mp3");
    }
    else if(check == "gameOver") {
        audio.setAttribute("src", "Sounds/wrong.mp3");
    }
    else {
        audio.setAttribute("src", "Sounds/grey.mp3");
    }
    audio.play();
}
function nextSequence() {
    title.innerHTML = `Level: ${level}`;
    i = 0;
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*9);
    btns[randomNumber].classList.add("animate");
    sequence.push(colors[randomNumber]);
    playSound(colors[randomNumber]);
    setTimeout(removeAnimation, 100);
}
function gameOver() {
    playSound("gameOver");
    started = false;
    sequence = [];
    userClickedPattern = [];
    i = 0;
    level = 1;
}