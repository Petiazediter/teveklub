let gameStarted = false;

const colors = JSON.parse(document.getElementById('gamescreen').dataset.colors);
const playerColor1 = colors['player1'];
const playerColor2 = colors['player2'];
let musicStarted = false;
let mc_sound = new sound ('static/mc.mp3');
mc_sound.volume = 10;
let death = new sound('static/death.mp3');
let mcdeath = new sound('static/mcDeath.mp3');

const defaultSpeed = 50;
const boostedSpeed = 20;

let player1 = {};
let player2 = {};

player1.direction = 2;
player1.lastRow = 80;
player1.lastCol = 20;

player2.direction = 1;

player2.lastRow = 20;
player2.lastCol = 80;

player1.boostPressed = false;
player2.boostPressed = false;
player1.boosts = 3;
player2.boosts = 3;

document.getElementById( `${player1.lastRow}-${player1.lastCol}`).classList.toggle(playerColor1);
document.getElementById( `${player2.lastRow}-${player2.lastCol}`).classList.toggle(playerColor2);

document.getElementById('ad2').addEventListener('click',function () {
    document.getElementById('gamescreen').classList.toggle('mcbg');
    if (musicStarted){
        mc_sound.stop();
        musicStarted = false;
    } else {
        mc_sound.play();
        musicStarted = true;
    }
});

let mafia = false;
document.getElementById('ad1').addEventListener('click',function () {
    if (!mafia){
        mafia = true;
        const body = document.getElementsByTagName('body')[0];
        let pic = document.createElement('img');
        pic.setAttribute('src', 'static/mafia.gif');
        pic.setAttribute('id', 'mafiaad');
        body.appendChild(pic);

        setTimeout(function () {
            document.getElementById('mafiaad').remove();
            mafia = false
        },2000)
    }
});


function resetDefaults() {
    document.getElementById('mcLoot').style.visibility = 'hidden';
    for (let element of document.getElementsByTagName('td')){
        element.classList.remove(playerColor1);
        element.classList.remove(playerColor2);
    }

    player1.direction = 2;
    player1.lastRow = 80;
    player1.lastCol = 20;

    player2.direction = 1;

    player2.lastRow = 20;
    player2.lastCol = 80;
    clearInterval(player1.interval);
    clearInterval(player2.interval);
    player1.boostPressed = false;
    player2.boostPressed = false;
    player1.boosts = 3;
    player2.boosts = 3;

    document.getElementById( `${player1.lastRow}-${player1.lastCol}`).classList.toggle(playerColor1);
    document.getElementById( `${player2.lastRow}-${player2.lastCol}`).classList.toggle(playerColor2);

    document.getElementById('player1boost').textContent = `Player1 Boosts: ${player1.boosts}`;
    document.getElementById('player2boost').textContent = `Player2 Boosts: ${player2.boosts}`;
}

async function player2Move(){
        if (!gameStarted){clearInterval(player2.interval)}
        let plusRow = 0;
        let plusCol = 0;
        // PLAYER 2 MOVEMENT \\\
        if (player2.direction == 1){
            plusRow = 1
        }else if(player2.direction == 2){
            plusRow = -1
        }else if (player2.direction == 3){
            plusCol = -1
        } else if (player2.direction == 4){
            plusCol = 1
        }

        if (isValidBlock(player2,player2.lastCol + plusCol,player2.lastRow + plusRow)) {
            document.getElementById(`${player2.lastRow + plusRow}-${player2.lastCol + plusCol}`).classList.toggle(playerColor2);
            player2.lastRow = player2.lastRow + plusRow;
            player2.lastCol = player2.lastCol + plusCol;
        }else{
            stop('Player1')
        }
}

async function player1Move(){
        if (!gameStarted){clearInterval(player1.interval)}
        let plusCol1 = 0;
        let plusRow1 = 0;

        if (player1.direction == 1){
            plusRow1 = 1
        }else if(player1.direction == 2){
            plusRow1 = -1
        }else if (player1.direction == 3){
            plusCol1 = -1
        } else if (player1.direction == 4){
            plusCol1 = 1
        }

        if (isValidBlock(player1,player1.lastCol + plusCol1,player1.lastRow + plusRow1)) {
            document.getElementById(`${player1.lastRow + plusRow1}-${player1.lastCol + plusCol1}`).classList.toggle(playerColor1);
            player1.lastRow = player1.lastRow + plusRow1;
            player1.lastCol = player1.lastCol + plusCol1;
        }else{
            stop('Player2')
        }
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function isValidBlock(player,col,row){
    if ((col >= 0 && col < 100) && (row >= 0 && row < 100)){
        const block = document.getElementById(`${row}-${col}`);
        if (hasClass(block, playerColor1) || hasClass(block, playerColor2)) {
            return false
        }
        return true
    }else{
        return false
    }
}

function start() {
    resetDefaults();
    player1.interval = setInterval(player1Move, defaultSpeed);

    player2.interval = setInterval(player2Move,defaultSpeed);

    document.getElementById('buttonPress').textContent = ``;

}

function stop(winner){

    if (musicStarted){
        mcdeath.play();
        document.getElementById('mcLoot').style.visibility = 'visible';
    }else{
        death.play();
    }
    document.getElementById('buttonPress').innerHTML = `${winner} won!<br>Press Space to start!`;

    gameStarted = false;
    clearInterval(player1.interval);
    clearInterval(player2.interval);
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;
    if (!gameStarted) {
        if (e.keyCode == 32){
            gameStarted = true;
            resetDefaults();
            start();
        }
    }else{
        if (e.keyCode == '38') {
            // up
            if (player2.direction != 1){
                player2.direction = 2;
            }
        }
        else if (e.keyCode == '40') {
            if (player2.direction != 2) {
                player2.direction = 1;
            }
            // down arrow
        }
        else if (e.keyCode == '37') {
           // left arrow
            if (player2.direction != 4){
                player2.direction = 3;
            }
        }
        else if (e.keyCode == '39') {
           // right arrow
            if (player2.direction != 3){
                player2.direction = 4;
            }
        }
        else if (e.keyCode == 65){
            if (player1.direction != 4){
                player1.direction = 3
            }
        }
        else if (e.keyCode == 68){
            if (player1.direction != 3){
                player1.direction = 4
            }
        }
        else if (e.keyCode == 87){
            if (player1.direction != 1){
                player1.direction = 2
            }
        }
        else if (e.keyCode == 83){
            if (player1.direction != 2){
                player1.direction = 1
            }
        }
        else if(e.keyCode == 75){
            if (player2.boosts > 0 && !(player2.boostPressed)){
                player2.boosts -= 1;
                document.getElementById('player2boost').textContent = `Player2 Boosts: ${player2.boosts}`;
                player2.boostPressed = true;
                clearInterval(player2.interval);
                player2.interval = setInterval(player2Move,boostedSpeed);
                setTimeout(async () =>{
                    player2.boostPressed = false;
                    clearInterval(player2.interval);
                    player2.interval = setInterval(player2Move,defaultSpeed);
                },2000)
            }
        }
        else if (e.keyCode == 69){
            if (player1.boosts > 0 && !(player1.boostPressed)){
                player1.boosts -= 1;
                document.getElementById('player1boost').textContent = `Player1 Boosts: ${player1.boosts}`;
                player1.boostPressed = true;
                clearInterval(player1.interval);
                player1.interval = setInterval(player1Move,boostedSpeed);
                setTimeout(async () =>{
                    player1.boostPressed = false;
                    clearInterval(player1.interval);
                    player1.interval = setInterval(player1Move,defaultSpeed);
                },2000)
            }
        }
    }
}


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}