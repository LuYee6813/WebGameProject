const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = ('assets/shadow_dog.png');
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = "idle";

let imageX = 0;
let imageY = 0;

let gameFrames = 0;
const staggerFrames = 5;
const spriteAnimation = [];
const animationStatus = [
    {
        name: 'idle', // 閒置
        frames: 7,
    },
    {
        name: 'up', // 跳起
        frames: 7,
    },
    {
        name: 'down', //墜落
        frames: 7,
    },
    {
        name: 'run', //跑步
        frames: 9,
    },
    {
        name: 'dizzy', //暈眩
        frames:11,
    },
    {
        name: 'sit', //坐下
        frames:5,
    },
    {
        name: 'roll', //滾動
        frames:7,
    },    
    {
        name: 'bite',
        frames:7,
    },
    {
        name: 'ko',
        frames:12,
    },
    {
        name: 'getHit',
        frames:4,
    },
];


animationStatus.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimation[state.name] = frames;
});
console.log(spriteAnimation);


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    let position = Math.floor(gameFrames/staggerFrames) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, 
    spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT
    );

    gameFrames ++;
    requestAnimationFrame(animate);
};
animate();
