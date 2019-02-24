const cellSize = 40;
let canvasWidth;
let canvasHeight;
let size;
let isGameOver;
let grid;
let generation;
const keyMap = {
    32: 'space'
};
const pressedKeys = {
    space: false,
}

function run() {
    setup();
    const canvas = document.getElementById('canvas');
    canvas.addEventListener("mouseup", handleCanvasClick, false);
    window.addEventListener("keyup", keyup, false);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    draw();
    if (pressedKeys.space === false)
        update();
    window.requestAnimationFrame(gameLoop);
}

function setup() {
    const canvas = document.getElementById('canvas');
    canvasWidth = cellSize * 10;
    canvasHeight = cellSize * 10;
    size = {cols: canvasWidth / cellSize, rows: canvasHeight / cellSize};
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    grid = create2DArray(size);
    generation = 1;
    isGameOver = false;
    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y] = new Cell(x * cellSize, y * cellSize);
        }
    }
    initializeFirstBoardState();
}

function update() {
    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            const neighbors = countAliveNeighbors(x, y);
            if (grid[x][y].alive === true) {
                if (neighbors === 2 || neighbors === 3) {
                    grid[x][y].next = true;
                } else {
                    grid[x][y].next = false;
                }
            } else {
                if (neighbors === 3) {
                    grid[x][y].next = true;
                } else {
                    grid[x][y].next = false;
                }
            }
        }
    }

    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y].alive = grid[x][y].next;
        }
    }
    generation++;
}

function draw() {
    const canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y].draw(ctx, cellSize);
        }
    }
    ctx.font = "24px Georgia";
    ctx.fillStyle = 'red';
    ctx.fillText(generation, 30, 30);
}

function keyup(event) {
    var key = keyMap[event.keyCode];
    pressedKeys[key] = !pressedKeys[key];
}

function handleCanvasClick(event) {
    const btnCode = event.button;

    const x = event.offsetX;
    const y = event.offsetY;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);

    if (btnCode === 0) {
        //LEFT CLICK
        grid[cellX][cellY].alive = true;
    } else if (btnCode === 2) {
        //RIGHT CLICK
        grid[cellX][cellY].alive = false;
    }
}

function countAliveNeighbors(x, y) {
    var result = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            try {
                if (i === 0 && j === 0) continue;
                if (grid[x + i][y + j].alive === true) {
                    result++;
                }
            } catch (e) {
            }
        }
    }
    return result;
}

function initializeFirstBoardState() {
    //GLIDER
    grid[1][2].alive = true;
    grid[2][3].alive = true;
    grid[3][3].alive = true;
    grid[3][2].alive = true;
    grid[3][1].alive = true;
}

function create2DArray(size) {
    const grid = new Array(size.cols);
    for (var x = 0; x < size.cols; x++) {
        grid[x] = new Array(size.rows);
    }
    return grid;
}

run();