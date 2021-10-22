const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let soundStep = new Audio('./Sound/step.mp3');









let picBackground = new Image();
picBackground.src = "./pic/Background.jpg";

let picPlayerLeft = new Image();
picPlayerLeft.src = "./pic/playerLeft.png";
let picPlayerRight = new Image();
picPlayerRight.src = "./pic/playerRight.png";
let arrPicPlayer = [];
arrPicPlayer['left'] = picPlayerLeft;
arrPicPlayer['right'] = picPlayerRight;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

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
let xPlayer = 50,
yPlayer = 665,
    speedPlayer = 5, navPlayer = 'right';
    function draw() {
        let picPlayer = arrPicPlayer[navPlayer]
        resizeImg(picPlayer, 8)
        ctx.drawImage(picBackground, 0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(picPlayer, xPlayer, yPlayer, picPlayer.width, picPlayer.height);
    }



picPlayerLeft.onload = picPlayerRight.onload = picBackground.onload = draw;



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
