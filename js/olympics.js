var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 900;
var HEIGHT = 600;
var GRAVITY = 0.1;
var SPEED = 2;

var FLOOR = HEIGHT/2+200;
var balls = [];

var counter = 0;

function Ball(x, y, width, height, color){
    this.x = x;
    this.y = FLOOR - height;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = SPEED;
}

function init(){
    counter = 0;
    document.getElementById("pam").innerHTML = "Number of times: " + counter;
    balls = []
    var ball = new Ball(0, 0, 20, 20, "blue");
    var ball2 = new Ball(200, 0, 20, 20, "red");
    var ball3 = new Ball(400, 0, 20, 20, "black");
    var ball4 = new Ball(600, 0, 20, 20, "white");
    balls.push(ball);
    balls.push(ball2);
    balls.push(ball3);
    balls.push(ball4);
}

function update(){
    for(i = 0; i < balls.length; i++){
        balls[i].x += balls[i].dx;
        balls.forEach(function(b) {
            if((balls[i].x > b.x) && 
                (balls[i].x < b.x + b.width) ||
                (balls[i].x + b.width > b.x) && 
                (balls[i].x + b.width < b.x + b.width))
                    balls[i].dx *= -1;
        }, this);
        if(balls[i].x + balls[i].width >= WIDTH){
            counter++;
            document.getElementById("pam").innerHTML = "Number of times: " + counter;
            balls[i].dx *= -1;
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    //draw floor
    ctx.moveTo(0,FLOOR);
    ctx.lineTo(WIDTH,FLOOR);
    ctx.stroke();
    //draw each ball;
    balls.forEach(function(element) {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    }, this);
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

init();
var gameloop = function(){
    update();
    draw();
    window.requestAnimationFrame(gameloop, c);
}
window.requestAnimationFrame(gameloop, c);