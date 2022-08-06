window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    let enemies = [];

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
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 800/this.fps;
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
        update(input,deltaTime){
            // sprite animation
            // run
            if(this.frameTimer > this.frameInterval) {
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer+=deltaTime;
            }

            // jump
            if(this.frameTimer > this.frameInterval) {
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer+=deltaTime;
            }

            // controls
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
            if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
            this.y += this.vy;

            if (!this.onGround()){
                this.frameY = 1;
                this.vy += this.weight;
                this.maxFrame = 6;
            } else {
                this.vy = 0;
                this.frameY = 0;
                this.maxFrame = 8;
            }

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
            this.speed = 5;
            this.fps = 20;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 5;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.markedForDeletion = false;
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
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
            else this.markedForDeletion = false;
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
            this.speed = 8;
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

    
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        })
    }

    function displayText(context){  
        context.fillStyle = 'black';
        context.font = '40px Helvetica';
        context.fillText('Score: ',20,50);
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.weight, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input,deltaTime); 
        handleEnemies(deltaTime);
        displayText(ctx);
        requestAnimationFrame(animate);    
    }
    animate(0);
});