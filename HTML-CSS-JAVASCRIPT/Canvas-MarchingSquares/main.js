let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#aaa";

let resolution = 50;
let cols = canvas.width / resolution;
let rows = canvas.height / resolution;
let grid = [];

let c = canvas.getContext("2d");

let colorArray = [
    '#000',
    '#fff'
];

Grid();
CalculateLines();

// Marching Squares grid
function Grid() {
    grid = [cols];

    for (let i = 0; i < cols; i++) {
        grid[i] = [rows];

        for (let j = 0; j < rows; j++) {
            let index = grid[i][j] = Math.floor(Math.random() * 2);
            Dots(i * resolution, j * resolution, index);
            // console.log(index);
        }
    }
}

function getState(a, b, c, d) {
    return a * 8 + b * 4 + c * 2 + d * 1;
}

// Marching Squares CalculateLines
function CalculateLines() {
    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
            let x = i * resolution;
            let y = j * resolution;

            let a = new PVector(x + resolution / 2, y);
            let b = new PVector(x + resolution, y + resolution / 2);
            let c = new PVector(x + resolution / 2, y + resolution);
            let d = new PVector(x, y + resolution / 2);

            let state = getState(grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]);

            switch (state) {
                case 1:
                    Lines(c, d, state);
                    break;
                case 2:
                    Lines(b, c, state);
                    break;
                case 3:
                    Lines(b, d, state);
                    break;
                case 4:
                    Lines(a, b, state);
                    break;
                case 5:
                    Lines(a, d, state);
                    Lines(b, c, state);
                    break;
                case 6:
                    Lines(a, c, state);
                    break;
                case 7:
                    Lines(a, d, state);
                    break;
                case 8:
                    Lines(a, d, state);
                    break;
                case 9:
                    Lines(a, c, state);
                    break;
                case 10:
                    Lines(a, b, state);
                    Lines(c, d, state);
                    break;
                case 11:
                    Lines(a, b, state);
                    break;
                case 12:
                    Lines(b, d, state);
                    break;
                case 13:
                    Lines(b, c, state);
                    break;
                case 14:
                    Lines(c, d, state);
                    break;
            }
        }
    }
}

// Marching Squares draw lines
function Lines(x, y, index) {
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x.x, x.y);
    c.lineTo(y.x, y.y);
    c.closePath();
    c.strokeStyle = colorArray[index];
    c.stroke();
}

function Dots(x, y, color) {
    c.beginPath();
    c.arc(x, y, 2, 0, Math.PI * 2, false);
    c.fillStyle = colorArray[color];
    c.fill();
}

function PVector(x, y) {
    this.x = x;
    this.y = y;
}