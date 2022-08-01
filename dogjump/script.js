const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 300;

console.log(ctx);

const playerImage = new Image();
playerImage.src = ('assets/shadow_dog.png');

function animate(){
    ctx.clearReact(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.fillRect(100,50,100,100);
    ctx.drawImage(playerImage, 0 , 0);
    requestAnimationFrame(animate);
};
animate();
