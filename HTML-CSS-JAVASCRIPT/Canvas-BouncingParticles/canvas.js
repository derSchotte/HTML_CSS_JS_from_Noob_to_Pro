let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "rgba(10, 115, 115, 1)";

let c = canvas.getContext("2d");

// Filled Rectangle, x, y, width, height
// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 100);

// Line, x1, y1, x2, y2
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// Arc / Circle, x, y, radius, startAngle, endAngle, drawCounterClockwise
// c.beginPath();
// c.arc(400, 400, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 0; i < 100; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = "red";
//     c.stroke();
// }

// bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// c.beginPath();
// c.moveTo(50, 300);
// c.bezierCurveTo(50, 300, 200, 100, 300, 300);
// c.strokeStyle = "blue";
// c.stroke();

// Quadratic Curve, quadraticCurveTo(cp1x, cp1y, x, y)
// c.beginPath();
// c.moveTo(50, 300);
// c.quadraticCurveTo(200, 100, 300, 300);
// c.strokeStyle = "green";
// c.stroke();

// Path2D
// let path = new Path2D();
// path.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke(path);

// filled circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.fillStyle = "red";
// c.fill();

let distanceToCircle = 50;
let rangeVelocity = 2;
const minRadius = 8;
const maxRadius = 50;
let radius = minRadius;
let halfRangeVelocity = rangeVelocity / 2;
const maxCircle = 1000;
let circleArray = [];

let colorArray = [
    '#010221',
    '#b7bf99',
    '#edaa25',
    '#c43302',
];

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, velocityX, velocityY, radius, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.velocityX = -this.velocityX;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.velocityY = -this.velocityY;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        // interactivity
        if (mouse.x - this.x < distanceToCircle && mouse.x - this.x > -distanceToCircle
            && mouse.y - this.y < distanceToCircle && mouse.y - this.y > -distanceToCircle) {
            if (this.radius < maxRadius) {
                this.radius += 1;
                console.log("Radius: " + this.radius);
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

for (let i = 0; i < maxCircle; i++) {
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let velocityX = Math.random() * rangeVelocity - halfRangeVelocity;
    let velocityY = Math.random() * rangeVelocity - halfRangeVelocity;
    radius = Math.random() * minRadius + 1;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];

    circleArray.push(new Circle(x, y, velocityX, velocityY, radius, color));
}

function Animate() {
    requestAnimationFrame(Animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

Animate();