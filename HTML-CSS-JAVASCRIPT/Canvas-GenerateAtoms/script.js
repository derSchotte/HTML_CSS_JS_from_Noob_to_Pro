// Get the canvas element from the HTML file
const canvas = document.getElementById('canvas1');

// Set the canvas width and height to the window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the canvas context
const ctx = canvas.getContext('2d');

// GLOBAL VARIABLES
const particleArray = [];
let degree = 0;

// Mouse object
const mouse = {
    x: undefined,
    y: undefined
}

const point = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

// Create a class Particle
class Particle {
    constructor() {
        point.x = Math.cos(degree / 180 * Math.PI);
        point.y = Math.sin(degree / 180 * Math.PI);
        this.x = canvas.width / 2 + (point.x * 200); //Math.random() * canvas.width;
        this.y = canvas.height / 2 + (point.y * 200); //Math.random() * canvas.height;
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.size = Math.random() * 8 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    draw() {
        ctx.fillStyle = '#ccc';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    updateSpeed() {
        if (this.x + this.size > innerWidth || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }

        if (this.y + this.size > innerHeight || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }

        this.x += this.speedX;
        this.y += this.speedY;
    }

    updateSize() {
        this.size -= 0.1;
        if (this.size < 0.02) {
            this.size = 0.01;
            particleArray.splice(particleArray.indexOf(this), 1);
        }
    }

    update() {
        this.updateSpeed();
        this.updateSize();

        if (particleArray.length < 100) {
            // particleArray.push(new Particle());
            init();
            console.log("Hello Update");
        }

        degree++;
    }

}

function init() {
    const maxParticles = 100;
    const minDelay = 100;
    const maxDelay = 500;
    let particlesCreated = 0;

    function createParticle() {
        particleArray.push(new Particle());
        particlesCreated++;

        if (particlesCreated < maxParticles) {
            setTimeout(createParticle, Math.random() * (maxDelay - minDelay) + minDelay);
        }
    }

    createParticle();

    console.log("Hello Init");
}

init();

function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }

}

// Event listener for mouse movement
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Event listener for resizing the canvas
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// function animate to be called each frame
function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0110160f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // What to do each frame
    handleParticles();
    requestAnimationFrame(animate);
}

animate();