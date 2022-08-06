window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;

    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown',e => {
                if ((   e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                        && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            });

            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight'){
                        this.keys.splice(this.keys.indexOf(e.key),1);
                }
                console.log(e.key, this.keys);
            });
            
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('player');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 1;
            this.vy = 0;
            this.weight = 1;
        }
        draw(context){
            // context.fillStyle = 'white';
            // context.fillRect(this.x, this.y, this.width,this.height);
            context.drawImage(
                this.image,                 //image
                this.frameX * this.width,   //sx
                this.frameY * this.height,  //sy
                this.width,                 //sw
                this.height,                //sh
                this.x,                     //dx
                this.y - 25,                //dy
                this.width,                 //dw
                this.height                 //dh
            );
        }
        update(input){
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 32;
            }else {
                this.speed =0;
            }
            // horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()){
                this.frameX = 0;
                this.vy += this.weight;
                this.frameY = 1;
            } else {
                this.frameX > 7 ? this.frameX = 0 : this.frameX++;
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemy');
            this.x = this.gameWidth - this.width;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 1;
        };
        draw(context){
            context.drawImage(
                this.image,                 
                this.frameX * this.width,                            
                this.frameY * this.height,                            
                this.width,                            
                this.height,
                this.x,
                this.y - 25,                            
                this.width,
                this.height                            
            );
        }
        update(){
            this.frameX > 4 ? this.frameX = 0 : this.frameX++;
            this.x -= this.speed;
        };

    }
    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('background');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 15;
        }
        draw(context){
            context.drawImage(this.image, this.x,this.y, this.width,this.height);
            context.drawImage(this.image, this.x + this.width - this.speed,this.y, this.width,this.height);
        }
        update(){
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.x = 0;
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.weight, canvas.height);
    const enemy1 = new Enemy(canvas.width, canvas.height);

    function handleEnemies() {

    }

    function 

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input); 
        enemy1.draw(ctx);
        enemy1.update();
        requestAnimationFrame(animate);    
    }
    animate();
});
