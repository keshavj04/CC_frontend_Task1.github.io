var size = 25;
var rows = 25;
var cols = 40;
var gameBoard;
var ctx;
var headX = size*5;
var headY = size*5;
var snakeBody = [];
var gameOver = false;
let scoreEle = document.getElementById("score");
var score = 0;
var velX = 0;
var velY = 0;
var foodX;
var foodY;
var leftBtn = document.getElementById("left-btn");
var rightBtn = document.getElementById("right-btn");
var upBtn = document.getElementById("up-btn");
var downBtn = document.getElementById("down-btn");
let gameOverPara = document.getElementById("game-over");
let audioPlay = document.getElementById("audio-play");
a = document.getElementById("audio-play");
a.onended = function(){setTimeout("a.play()", 10)};
let appleAudio = document.getElementById("A");
let gameOverAudio = document.getElementById("B");

window.onload = function() {
    gameBoard = document.getElementById("canvas")
    gameBoard.height = rows*size;
    gameBoard.width = cols*size;
    ctx = gameBoard.getContext("2d");


    placeFood();
    document.addEventListener("keyup", moveSnake);
    leftBtn.addEventListener("click",moveSnakeLeft);
    rightBtn.addEventListener("click",moveSnakeRight);
    upBtn.addEventListener("click",moveSnakeUp);
    downBtn.addEventListener("click",moveSnakeDown);    
    setInterval(render, 900/10); 
}
function reloadPage() {
    location.reload();
}
function render() {

    if (gameOver === true){
        gameOverAudio.play();
        return;
    }
    
    let my_gradient = ctx.createLinearGradient(0, 0, 0, 1170);
    my_gradient.addColorStop(0.02, "black");
    my_gradient.addColorStop(1, "white");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, gameBoard.width , gameBoard.height);

    ctx.fillStyle = "red";
    ctx.fillRect(foodX , foodY, size, size);

    if (headX === foodX && headY === foodY){
        snakeBody.push([foodX , foodY]);
        placeFood();
        score++ ;
        scoreEle.innerHTML = `SCORE: ${score}`;
    }

    for(let i = snakeBody.length-1 ; i>0 ; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length){
        snakeBody[0] = [headX,headY];
    }

    ctx.fillStyle="lime";
    headX += velX*size;
    headY += velY*size;
    ctx.fillRect(headX, headY, size, size);
    for(let i = 0 ; i<snakeBody.length; i++){
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], size, size);
    }

    if (headX < 0 || headX >= (cols* size) || headY < 0 || headY >= rows* size) {
        gameOver = true;
        gameOverPara.innerText = 'Game_Over';
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (headX === snakeBody[i][0] && headY === snakeBody[i][1]) {
            gameOver = true;
            gameOverPara.innerText = 'Game_Over';
        }
    }
}

function moveSnake(e) {
    if ((e.code === "ArrowUp" || e.key === "w"|| e.key==="W")){
        moveSnakeUp();
    }
    if (e.code === "ArrowDown"|| e.key === "s"|| e.key==="S"){
        moveSnakeDown();
    }
    if (e.code === "ArrowLeft"|| e.key === "a"|| e.key==="A"){
        moveSnakeLeft();
    }
    if (e.code === "ArrowRight"|| e.key === "d"|| e.key==="D"){
       moveSnakeRight();
    }
}
function moveSnakeUp() {
    if (velY != 1){
        velX = 0;
        velY = -1;
    }
}
function moveSnakeDown() {
    if (velY != 1){
        velX = 0;
        velY = 1;
    }
}

function moveSnakeLeft() {
    if(velX != 1){
        velX = -1;
        velY = 0;
    }
}

function moveSnakeRight() {
    if(velX != -1){
        velX = 1;
        velY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random()*cols)*size;
    foodY = Math.floor(Math.random()*rows)*size;
}