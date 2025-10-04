const canvas=document.getElementById("myCanvas");
const ctx=canvas.getContext("2d");

const btn=document.getElementById("btn1");
const paddleLenght=86;
const paddleWidth=25;
var PaddleX=(canvas.width-paddleLenght)/2;

const brick=[];
const padding_brick=10;
const left_margin=20;
const top_margin=20;
const brick_length=180;
const brick_width=30;
const count_brick=4;

let score=0;

var right_key=false;
var left_key=false;

let interval=0;
let x=canvas.width/5;
let y=canvas.height-150;
var paddleY=canvas.height-10;
var dx=10;
var dy=-10;
const radius=10;
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,true);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}
function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawBall();
        drawPaddle();
        draw_bricks();
        score_board();

        if(score==(count_brick**2)*10){
            alert("You won the game wohooo !! ");
            document.location.reload();
            
        }
        x+=dx;
        y+=dy;


        if(x+radius>=canvas.width||x-radius<=0){
            dx=-dx;
        }
        if(y-radius<=0){
            dy=-dy;
        }
        else if(y+radius>canvas.height){
            
            if(x>=PaddleX &&x<=paddleLenght+PaddleX){
                dy=-dy;
            }
        else{
                    alert(`Game is Over your Score is ${score}: `);
                    document.location.reload();
                    clearInterval(interval);
                }
            }

        if(right_key){
            PaddleX=Math.min(PaddleX+15,canvas.width-paddleLenght);
        }
        if(left_key){
            PaddleX=Math.max(PaddleX-15,0);
        }

        drawPaddle();
        collosion_detection();
        
    }


// defining the a live score board;
function score_board(){
    ctx.beginPath();
   
    ctx.font="bold 20px serif";
    ctx.fillStyle="white";
    ctx.fillText(`Score is : ${score}`,20,400);
}


//defining the shape of the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(PaddleX,paddleY,paddleLenght,paddleWidth);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();

}

//intitalizing the array of the bricks
for(let c=0;c<count_brick;c++){
    brick[c]=[];
    for(let r=0;r<count_brick;r++){
        brick[c][r]={x:0,y:0,status:1};
    }
}

//creating the brick elements
function draw_bricks(){
for(let c=0;c<count_brick;c++){
    for(let r=0;r<count_brick;r++){

        brick[c][r].x=c*(brick_length+padding_brick)+left_margin;
        brick[c][r].y=r*(brick_width+padding_brick)+top_margin;
        //draw only if the ball is not hit the brick
        if(brick[c][r].status==1){
        ctx.beginPath();
        ctx.rect(brick[c][r].x,brick[c][r].y,brick_length,brick_width);
        ctx.fillStyle="#91C4C3";
        ctx.fill();
        ctx.closePath();
        }
    }
}
}
function collosion_detection(){

    for(let c=0;c<count_brick;c++){
        for(let r=0;r<count_brick;r++){
            const b=brick[c][r];
            if(b.status==1){
            if(x>=b.x && x<=b.x+brick_length && y>=b.y && y<=b.y+brick_width){
                b.status=0;
               score+=10;
                dy=-dy;
            }
        }
        }
    }

}



//function for the movement of the paddle
document.addEventListener("keydown",downHandller);
document.addEventListener("keyup",upHandller);

function downHandller(e){
if(e.key=="right"||e.key=="ArrowRight"){
    right_key=true;
}
else{
    left_key=true;
}
}

function upHandller(e){
    if(e.key=="right"||e.key=="ArrowRight"){
        right_key=false;
    }
    else{
        left_key=false;
    }
}


//startingg button
btn.addEventListener("click",()=>{
 interval=setInterval(draw,50);
btn.disabled=true;
});










