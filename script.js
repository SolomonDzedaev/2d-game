const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let soundStep = new Audio('./Sound/step.mp3');









let picBackground = new Image();
picBackground.src = "./pic/Background.jpg";

let picPlayerLeft = new Image();
picPlayerLeft.src = "./pic/playerLeft.png";
let picPlayerRight = new Image();
picPlayerRight.src = "./pic/playerRight.png";
let picEnemyLeft = new Image();
picEnemyLeft.src = "./pic/enemyLeft.png";
let picEnemyRight = new Image();
picEnemyRight.src = "./pic/enemyRight.png";
let arrPicPlayer = [];
arrPicPlayer['left'] = picPlayerLeft;
arrPicPlayer['right'] = picPlayerRight;
let arrPicEnemy = [];
arrPicEnemy['left'] = picEnemyLeft;
arrPicEnemy['right'] = picEnemyRight;


let picLife = new Image();
picLife.src = "./pic/Life.png";

let picCoin = new Image();
picCoin.src = "./pic/Coin.png";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

function generateRandomPosition(pic,xMin, xMax,yMin,yMax){
    let x =Math.random()*(xMax-xMin)+xMin,
    y=Math.random()*((yMax-pic.width)+yMin);
    return [x,y];
}

let PositionCoin=[0,0]
function newPositionCoin(){
    PositionCoin=generateRandomPosition(picCoin,0,innerWidth,innerHeight*0.5,innerHeight*0.88);
}

function resizeImg(img, percent) {
    let prop;
    if (img.width > img.height) {
        prop = img.width / img.height;
        img.height = window.innerHeight * percent / 100;
        img.width = img.height * prop;
    } else {
        prop = img.height / img.width;
        img.width = window.innerHeight * percent / 100;
        img.height = img.width * prop;
    }
}




function checkCollision(x1,x2,y1,y2,r1,r2,b1,b2) {
    if(r1>x2 && r2>x1 && b1>y2 && b2>y1){
        return true;
    }
    else{
        return false ;
    }

}

let startGame = false;

let xPlayer = 50,
yPlayer = 665,
    speedPlayer = 5, speedEnemy=50; navPlayer = 'right',
    navEnemy="left",
    xEnemy=660,
    yEnemy=665, boardPicPlayer=0,borderPicCoin=0, boardPicEnemy=0;
countLife = 9 , countCoin=0

    function boardPic(pic, x, y){
      let picRight, picBottom;
      picRight = x + pic.width;
      picBottom = y + pic.height;
      return  [picRight, picBottom] 
    }

    function draw() {
        let buttonStart = new Path2D;
        function drawButton(stokeColor, fillColor){
            ctx.clearRect(0,0, innerWidth, innerHeight);
            ctx.drawImage (picBackground, 0, 0, window.innerWidth, window.innerHeight);
            let widthButton = innerWidth*0.2, heightButton = innerHeight*0.1;
            let xButthon=innerWidth*0.5-widthButton/2,
            yButton = innerHeight*0.5 - heightButton/2;
                        buttonStart.rect(xButthon,yButton,widthButton, heightButton);
                        function fillButton(){
                            ctx.strokeStyle = stokeColor;
                            ctx.fillStyle = fillColor;
                            ctx.lineWidth = 5;
                            ctx.stroke(buttonStart)
                            ctx.fill(buttonStart);
                        }
                        fillButton();
                        printText('Start',xButthon+widthButton/2-20,yButton+heightButton/2+10,40,"black")
        }
        function printText(text,x,y,size,color) {
            ctx.font = size+"px Elephant ";
            ctx.fillStyle = color;
            ctx.fillText(text,x,y)
        }
        if(startGame){
        let picPlayer = arrPicPlayer[navPlayer]
        let picEnemy = arrPicEnemy[navEnemy]
        resizeImg(picPlayer, 8);
        resizeImg(picEnemy, 8);
        resizeImg(picLife, 5);
        resizeImg(picCoin, 5);
         boardPicPlayer = boardPic(picPlayer, xPlayer, yPlayer);
         
         boardPicEnemy = boardPic(picEnemy, xEnemy, yEnemy);
         boardPicCoin = boardPic(picCoin, PositionCoin[0], PositionCoin[1]);
        

        function startPosition(){
            xPlayer = window.innerWidth*0.05;
            yPlayer = window.innerHeight*0.88-picPlayer.height;

               xEnemy = window.innerWidth*0.85;
            yEnemy = window.innerHeight*0.88-picEnemy.height
        }
           
            

        function moveEnemy(){
            function collisionEnemy(){
                if(checkCollision(xPlayer,xEnemy,yPlayer,yEnemy,boardPicPlayer[0],boardPicEnemy[0],boardPicPlayer[1],boardPicEnemy[1])) {
                countLife--;
                if(countLife<+0){
                    let newGame = confirm('GamerOver:(/nХотите начать заново?');
                    if(newGame){
                        countLife=5;
                    }
                    else{
                        clesrTimeout(timerMoveEnemy);
                        startPosition();
                        return;
                    }
                }
                 
                startPosition();
                }
            }
            collisionEnemy();
            let timerMoveEnemy = setTimeout(()=>{
                if(xEnemy>(xPlayer+picPlayer.width)){
                    xEnemy--;
                    navEnemy='left'
                }else if((xEnemy+picEnemy.width)<xPlayer){
                    xEnemy++;
                    navEnemy='right'
                }
                draw();
            moveEnemy();
            },speedEnemy);
           
        }
        if(startGame){
            startPosition
            moveEnemy();
            newPositionCoin();
            startGame=false;
        }
        ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height);
        ctx.drawImage(picEnemy, xEnemy, yEnemy, picEnemy.width, picEnemy.height);
        ctx.drawImage(picCoin, PositionCoin[0], PositionCoin[1], picCoin.width, picCoin.height);

        for(let i=0; i<countLife;i++){
            let yLife = innerHeight*0.1;
            let xLife = innerWidth*0.05+picLife.width*1
            ctx.drawImage(picLife, xLife, yLife, picLife.width, picLife.height);
        }
        function collisionCoin() {
           if(checkCollision(xPlayer,PositionCoin[0],yPlayer,PositionCoin[1],boardPicPlayer[0],boardPicCoin[0],boardPicPlayer[1],boardPicCoin[1])){
               countCoin++;
            newPositionCoin();
           } 
        }
        collisionCoin();

printText("Count ="+countCoin,innerWidth*0.05,innerHeight*0.1,innerHeight*0.06,"Green")
    }else{
        canvas.addEventListener('mousemove',(event)=>{
            if(ctx.isPointInPath(buttonStart,event.clientX,event.clientY)){
                drawButton('Dark','Blue');
            }
            else{
                drawButton('Cyan','LightSeaGreen');
            }
                
            
        });
        
    }
}


picEnemyLeft.onload=picEnemyRight.onload=picPlayerLeft.onload = picPlayerRight.onload = picBackground.onload = draw;



document.addEventListener('keydown', (event) => {
    let keyPressed = event.code;
    switch (keyPressed) {
        case 'ArrowLeft':
            xPlayer -= speedPlayer;
            navPlayer = 'left';
  soundStep.play();
            break;
        case 'ArrowRight':
            xPlayer += speedPlayer;
            navPlayer = 'right'
              soundStep.play();
              break;
              case 'Enter':
                  startGame=true;
                  break;
    }
    draw();
});
document.addEventListener('keyup', (event) => {
    let keyPressed = event.code;
    switch (keyPressed) {
        case 'ArrowLeft':
            
  soundStep.pause();
            break;
        case 'ArrowRight':
        
              soundStep.pause();
              break;
    }
});
