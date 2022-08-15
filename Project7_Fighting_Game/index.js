const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 5

class Sprite {
    constructor({position,velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else {
            this.position.y += gravity
        }
    }
}


const playerA = new Sprite({
    position: {
        x: 150,
        y: 300
    },
    velocity: {
        x: 0,
        y: 10
    }
});



const playerB = new Sprite({
    position: {
        x: canvas.width-200,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.clearRect(0,0,canvas.width,canvas.height)
    playerA.update()
    playerB.update()

    playerA.velocity.x = 0
    if (keys.a.pressed && lastKey === 'a'){
        playerA.velocity.x = -5
    } else if (keys.d.pressed && lastKey === 'd'){
        playerA.velocity.x = 5
    } 
}

animate()


window.addEventListener('keydown', (event)=>{
    // playerA
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'w':
            playerA.velocity.y = -5
            break
    }
    //playerB
    // if(event.key === "ArrowUp"){}
    // if(event.key === "ArrowDown"){}
    // if(event.key === "ArrowLeft"){}
    // if(event.key === "ArrowRight"){}
})

window.addEventListener('keyup', (event)=>{
    // playerA
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            playerA.velocity.y = 0
            break
    }

})