// Get the canvas element from the HTML file
const canvas = document.getElementById('canvas1');

// Set the canvas width and height to the window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the canvas context
const ctx = canvas.getContext('2d');

// GLOBAL VARIABLES
const particleArray = [];

let numberOfParticles = 100;
const maxDistance = 100;

const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#aaa');
gradient.addColorStop(0.5, '#08f');
gradient.addColorStop(0.8, '#60c');
ctx.fillStyle = gradient;

// Mouse object
const mouse = {
    x: undefined,
    y: undefined
}

// Create a class Particle
class Particle {
    constructor(effect) {
        this.effect = effect;
        this.size = Math.random() * 10 + 1;
        this.x = this.size + Math.random() * (this.effect.width - this.size * 2); // canvas.width
        this.y = this.size + Math.random() * (this.effect.height - this.size * 2); // canvas.height
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.speedX = Math.random() * 1 - .5;
        this.speedY = Math.random() * 1 - .5;
        this.hue = Math.random() * 360;
        this.velocityX = this.size * this.speedX / 4;
        this.velocityY = this.size * this.speedY / 4;
    }

    draw() {
        // ctx.fillStyle = '#fff';
        // ctx.fillStyle = 'hsl(' + this.x + ', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
    }

    update() {
        if (this.x + this.size > innerWidth || this.x - this.size < 0) {
            this.velocityX = -this.velocityX;
        }

        if (this.y + this.size > innerHeight || this.y - this.size < 0) {
            this.velocityY = -this.velocityY;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.createParticles();
    }

    createParticles() {
        for (let i = 0; i < numberOfParticles; i++) {
            particleArray.push(new Particle(this));
        }
    }

    handleParticles(ctx) {
        this.connectParticles(ctx);

        particleArray.forEach(particleArray => {
            particleArray.draw(ctx);
            particleArray.update(ctx);
        });
    }

    connectParticles(ctx) {
        let opacityValue = 1;
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                const dx = particleArray[a].x - particleArray[b].x;
                const dy = particleArray[a].y - particleArray[b].y;
                let distance = Math.hypot(dx, dy);

                if (distance < maxDistance) {
                    opacityValue = 1 - (distance / maxDistance);
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}

// Event listener for mouse movement
// window.addEventListener('mousemove', function (event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

// Event listener for resizing the canvas
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const effect = new Effect(canvas);

// function animate to be called each frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // What to do each frame
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}

animate();