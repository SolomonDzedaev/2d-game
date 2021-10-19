const canvas  = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let picBackground = new Image();
picBackground.src = "./pic/Background.jpg";

let picPlayer = new Image();
picPlayer.src = "./pic/player.png";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;



function draw(){
    ctx.drawImage(picBackground,0,0,window.innerWidth, window.innerHeight);
    ctx.drawImage(picPlayer, 40, 665, picPlayer.width, picPlayer.height);
}
picPlayer.onload = picBackground.onload = draw;

