const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 600;
canvas.height = 600;

// canvas settings
ctx.fillStyle = '#ccc';
ctx.strokeStyle = '#ccc';
ctx.lineWidth = 1;

class Particle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 4 + 1);
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * 60 + 20);
        this.angle = 0;
        this.newAngle = 0;
        this.angleCorrector = Math.random() * 0.5 + 0.01;
        this.timer = this.maxLength * 2;
        this.colors = ['#4e1bda', '#4e5bda', '#4e9eda', '#4ed9da', '#4edaae', '#4eda6e', '#4e9e4e'];
        // this.colors = ['#B70404', '#DB005B', '#F79327', '#FFE569'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    draw(context) {
        // context.fillRect(this.x, this.y, 10, 10);
        context.beginPath();
        // context.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
        // context.stroke();
        context.moveTo(this.history[0].x, this.history[0].y);

        for (let i = 1; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }

        context.strokeStyle = this.color;
        context.stroke();
    }

    update() {
        this.timer--;
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize);
            let y = Math.floor(this.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;

            if (this.effect.flowField[index]) {
                this.angle = this.effect.flowField[index].colorAngle;

                if (this.angle > this.newAngle) {
                    this.newAngle -= this.angleCorrector;
                } else if (this.angle < this.newAngle) {
                    this.newAngle += this.angleCorrector;
                } else {
                    this.angle = this.newAngle;
                }
            }

            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);

            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            // this.angle += 0.01;
            // this.x += this.speedX + Math.floor(Math.random() * 10) - 5;
            // this.y += this.speedY + Math.floor(Math.random() * 10) - 5;
            this.history.push({ x: this.x, y: this.y });

            if (this.history.length > this.maxLength) {
                this.history.shift();
            }
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }
    }

    reset() {
        let attempts = 0;
        let resetSuccess = false;

        while (attempts < 10 && !resetSuccess) {
            attempts++;
            let testIndex = Math.floor(Math.random() * this.effect.flowField.length);
            if (this.effect.flowField[testIndex].alpha > 0) {
                this.x = this.effect.flowField[testIndex].x;
                this.y = this.effect.flowField[testIndex].y;
                this.history = [{ x: this.x, y: this.y }];
                this.timer = this.maxLength * 2;
                resetSuccess = true;
            }
        }

        if (!resetSuccess) {
            this.x = Math.floor(Math.random() * this.effect.width);
            this.y = Math.floor(Math.random() * this.effect.height);
            this.history = [{ x: this.x, y: this.y }];
            this.timer = this.maxLength * 2;
        }
    }
}

class Effect {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.context = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 2000;
        this.cellSize = 5;
        this.rows;
        this.cols;
        this.flowField = [];
        // this.curve = 0.6;
        // this.zoom = 0.1;
        this.debug = true;
        this.init();

        window.addEventListener('keydown', (e) => {
            if (e.key === 'd') {
                this.debug = !this.debug;
            }
        });

        window.addEventListener('resize', (e) => {
            // this.resize(e.target.innerWidth, e.target.innerHeight);
        });
    }

    drawText(context) {
        this.context.font = '500px Impact';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';

        const gradient1 = this.context.createLinearGradient(0, 0, this.width, this.height);
        gradient1.addColorStop(0.4, '#ff0000');
        gradient1.addColorStop(0.6, '#ffff00');
        gradient1.addColorStop(0.8, '#00ff00');
        gradient1.addColorStop(1, '#0000ff');

        const gradient2 = this.context.createLinearGradient(0, 0, this.width, this.height);
        gradient2.addColorStop(0.4, '#ffaaff');
        gradient2.addColorStop(0.6, '#00cc00');
        gradient2.addColorStop(0.8, '#00ffcc');
        gradient2.addColorStop(1, '#ff00ff');

        const gradient3 = this.context.createRadialGradient(this.width * 0.5, this.height * 0.5, 10, this.width * 0.5, this.height * 0.5, this.width);
        gradient3.addColorStop(0.02, '#00f');
        gradient3.addColorStop(0.3, '#00cc00');
        gradient3.addColorStop(0.4, '#ff0');

        this.context.fillStyle = gradient2;

        ctx.fillText('FM', this.width * 0.5, this.height * 0.5);
    }

    init() {
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];

        // draw text
        this.drawText(this.context);

        // scan pixel data
        const pixels = this.context.getImageData(0, 0, this.width, this.height).data;

        // loop through pixels
        for (let y = 0; y < this.height; y += this.cellSize) {
            for (let x = 0; x < this.width; x += this.cellSize) {
                const index = (x + y * this.width) * 4;
                const red = pixels[index];
                const green = pixels[index + 1];
                const blue = pixels[index + 2];
                const alpha = pixels[index + 3];
                const grayscale = (red + green + blue) / 3;

                // ! Welche ist die bessere Formel?
                const colorAngle = (Math.PI * 2 * (grayscale / 255)).toFixed(5);
                // const colorAngle = (6.28 * (grayscale / 255)).toFixed(5);
                // console.log(`ColorAngel: ${colorAngle} - ColorAngle2: ${colorAngle2}`);

                this.flowField.push({
                    x: x,
                    y: y,
                    alpha: alpha,
                    colorAngle: colorAngle,
                });
            }
        }

        // for (let y = 0; y < this.rows; y++) {
        //     for (let x = 0; x < this.cols; x++) {
        //         let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        //         this.flowField.push(angle);
        //     }
        // }

        // create particles
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }

        this.particles.forEach(particle => particle.reset());
    }

    drawGrid() {
        this.context.save();
        this.context.strokeStyle = '#022232';
        this.context.lineWidth = 0.3;

        for (let c = 0; c < this.cols + 1; c++) {
            this.context.beginPath();
            this.context.moveTo(c * this.cellSize, 0);
            this.context.lineTo(c * this.cellSize, this.height);
            this.context.stroke();
        }

        for (let r = 0; r < this.rows + 1; r++) {
            this.context.beginPath();
            this.context.moveTo(0, r * this.cellSize);
            this.context.lineTo(this.width, r * this.cellSize);
            this.context.stroke();
        }
        this.context.restore();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }

    render() {
        if (this.debug) {
            this.drawGrid();
            this.drawText();
        }

        this.particles.forEach(particle => {
            particle.draw(this.context);
            particle.update();
        });
    }
}

const effect = new Effect(canvas, ctx);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
}

animate();