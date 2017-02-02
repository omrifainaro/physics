var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var WIDTH = 900;
var HEIGHT = 600;
var GRAVITY = 0.1;

var FLOOR = HEIGHT/2+200;
var balls = [];

function Ball(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
}


// console.log(ball.x);
// console.log(ball.y);

function init(){
    var ball = new Ball(0, 0, 20, 20, "blue");
    var ball2 = new Ball(100, 0, 20, 20, "red");
    var ball3 = new Ball(200, 0, 20, 20, "black");
    var ball4 = new Ball(300, 0, 20, 20, "white");
    balls.push(ball);
    balls.push(ball2);
    balls.push(ball3);
    balls.push(ball4);
}

function update(){
    balls.forEach(function(b) {
        b.x += b.dx;
        b.y += b.dy;
        b.x = clamp(b.x, 0, WIDTH - b.width);
        b.y = clamp(b.y, 0, (HEIGHT/2+200) - b.height);
        b.dy += GRAVITY;
        if(b.y + b.height >= FLOOR){
            b.dy *= -0.6;
            if(b.dy >= -0.4 && b.dy <= 0.4){
                b.dy = 0;
            }
        }
    }, this);
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