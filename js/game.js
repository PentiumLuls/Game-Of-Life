let cellSize = 20;
let canvasWidth;
let canvasHeight;
let size;
let isGameOver;
let grid;
let generation;
let fps = 10;
let boardWidth = 40;
let boardHeight = 30;
let loop;
const keyMap = {
    32: 'space'
};
const pressedKeys = {
    space: false,
};

function run() {
    setup(boardWidth, boardHeight, cellSize);
    const canvas = document.getElementById('canvas');
    canvas.addEventListener("mouseup", handleCanvasClick, false);
    window.addEventListener("keyup", keyup, false);
    loop = setInterval(gameLoop, 1000 / fps);

    document.getElementById('board-width-input').oninput = function () {
        if (this.value > 500) {
            this.value = 500;
        } else if (this.value < 1) {
            this.value = 1;
        }
    };
    document.getElementById('board-height-input').oninput = function () {
        if (this.value > 500) {
            this.value = 500;
        } else if (this.value < 1) {
            this.value = 1;
        }
    };
    document.getElementById('board-cell-size-input').oninput = function () {
        if (this.value > 100) {
            this.value = 100;
        } else if (this.value < 5) {
            this.value = 5;
        }
    };
    document.getElementById('speed-input').oninput = function () {
        if (this.value > 100) {
            this.value = 100;
        } else if (this.value < 1) {
            this.value = 1;
        }
    };
}

function gameLoop() {
    draw();
    if (pressedKeys.space === false)
        update();
}

function setup(width, height, newCellSize) {
    cellSize = newCellSize;
    boardWidth = width;
    boardHeight = height;

    const canvas = document.getElementById('canvas');
    canvasWidth = cellSize * boardWidth;
    canvasHeight = cellSize * boardHeight;
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
            grid[x][y].prev = grid[x][y].alive;
            grid[x][y].alive = grid[x][y].next;
        }
    }
    generation++;
}

function draw() {
    const canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d", {alpha: false});
    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            if (grid[x][y].alive !== grid[x][y].prev || generation === 1)
                grid[x][y].draw(ctx, cellSize);
            else if (grid[x][y].needRedraw) {
                grid[x][y].draw(ctx, cellSize);
                grid[x][y].needRedraw = false;
            }
        }
    }
    const generationCounterCanvas = document.getElementById('generationCounter');
    var ctx2 = generationCounterCanvas.getContext("2d");
    ctx2.clearRect(0, 0, 100, 50);
    ctx2.font = "24px Georgia";
    ctx2.fillStyle = 'red';
    ctx2.fillText(generation, 10, 30);
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
        grid[cellX][cellY].alive = !grid[cellX][cellY].alive;
        grid[cellX][cellY].needRedraw = true;
    } else if (btnCode === 2) {
        //RIGHT CLICK
        //PLACE DIFFERENT STRUCTURE

        grid[cellX][cellY].needRedraw = true;
    }
}

function applySettings() {
    const width = document.getElementById('board-width-input').value;
    const height = document.getElementById('board-height-input').value;
    const newCellSize = document.getElementById('board-cell-size-input').value;
    fps = document.getElementById('speed-input').value;

    if (!(width === boardWidth && height === boardHeight && newCellSize === cellSize)) {
        setup(width, height, newCellSize);
    }
    clearInterval(loop);
    loop = setInterval(gameLoop, 1000 / fps);
}

function clearBoard() {
    for (var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y].alive = false;
            grid[x][y].next = false;
            grid[x][y].needRedraw = true;
        }
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

function create2DArray(size) {
    const grid = new Array(size.cols);
    for (var x = 0; x < size.cols; x++) {
        grid[x] = new Array(size.rows);
    }
    return grid;
}

function handleStructureSelector() {
    clearBoard();
    let x = Math.floor(boardWidth / 2);
    let y = Math.floor(boardHeight / 2);
    switch (document.getElementById('structure-selector').value) {
        case 'clear': {
            break;
        }
        case 'glider': {
            x -= 2;
            y -= 2;
            grid[x][y+1].alive = true;
            grid[x+1][y+2].alive = true;
            grid[x+2][y+2].alive = true;
            grid[x+2][y+1].alive = true;
            grid[x+2][y].alive = true;
            break;
        }
        case 'small exploder': {
            x -= 2;
            y -= 2;
            grid[x+1][y].alive = true;
            grid[x][y+1].alive = true;
            grid[x+1][y+1].alive = true;
            grid[x+2][y+1].alive = true;
            grid[x][y+2].alive = true;
            grid[x+2][y+2].alive = true;
            grid[x+1][y+3].alive = true;
            break;
        }
        case 'exploder': {
            x -= 5;
            y -= 5;
            grid[x][y].alive = true;
            grid[x+2][y].alive = true;
            grid[x+4][y].alive = true;
            grid[x][y+1].alive = true;
            grid[x+4][y+1].alive = true;
            grid[x][y+2].alive = true;
            grid[x+4][y+2].alive = true;
            grid[x][y+3].alive = true;
            grid[x+4][y+3].alive = true;
            grid[x][y+4].alive = true;
            grid[x+2][y+4].alive = true;
            grid[x+4][y+4].alive = true;
            break;
        }
        case '10 cell row': {
            x -= 5;
            grid[x][y].alive = true;
            grid[x+1][y].alive = true;
            grid[x+2][y].alive = true;
            grid[x+3][y].alive = true;
            grid[x+4][y].alive = true;
            grid[x+5][y].alive = true;
            grid[x+6][y].alive = true;
            grid[x+7][y].alive = true;
            grid[x+8][y].alive = true;
            grid[x+9][y].alive = true;
            break;
        }
        case 'lightweight spaceship': {
            x -= 3;
            y -= 3;
            grid[x+1][y].alive = true;
            grid[x+2][y].alive = true;
            grid[x+3][y].alive = true;
            grid[x+4][y].alive = true;
            grid[x][y+1].alive = true;
            grid[x+4][y+1].alive = true;
            grid[x+4][y+2].alive = true;
            grid[x][y+3].alive = true;
            grid[x+3][y+3].alive = true;
            break;
        }
        case 'tumbler': {
            x -= 6;
            y -= 6;
            grid[x+1][y].alive = true;
            grid[x+2][y].alive = true;
            grid[x+4][y].alive = true;
            grid[x+5][y].alive = true;

            grid[x+1][y+1].alive = true;
            grid[x+2][y+1].alive = true;
            grid[x+4][y+1].alive = true;
            grid[x+5][y+1].alive = true;

            grid[x+2][y+2].alive = true;
            grid[x+4][y+2].alive = true;

            grid[x][y+3].alive = true;
            grid[x+2][y+3].alive = true;
            grid[x+4][y+3].alive = true;
            grid[x+6][y+3].alive = true;

            grid[x][y+4].alive = true;
            grid[x+2][y+4].alive = true;
            grid[x+4][y+4].alive = true;
            grid[x+6][y+4].alive = true;

            grid[x][y+5].alive = true;
            grid[x+1][y+5].alive = true;
            grid[x+5][y+5].alive = true;
            grid[x+6][y+5].alive = true;
            break;
        }

        case 'gosper glider gun': {
            x -= 19;
            y -= 10;
            grid[x][y+2].alive = true;
            grid[x+1][y+2].alive = true;
            grid[x][y+3].alive = true;
            grid[x+1][y+3].alive = true;

            grid[x+8][y+3].alive = true;
            grid[x+8][y+4].alive = true;
            grid[x+9][y+2].alive = true;
            grid[x+9][y+4].alive = true;
            grid[x+10][y+2].alive = true;
            grid[x+10][y+3].alive = true;

            grid[x+16][y+4].alive = true;
            grid[x+16][y+5].alive = true;
            grid[x+16][y+6].alive = true;
            grid[x+17][y+4].alive = true;
            grid[x+18][y+5].alive = true;

            grid[x+22][y+1].alive = true;
            grid[x+22][y+2].alive = true;
            grid[x+23][y].alive = true;
            grid[x+23][y+2].alive = true;
            grid[x+24][y].alive = true;
            grid[x+24][y+1].alive = true;

            grid[x+24][y+12].alive = true;
            grid[x+24][y+13].alive = true;
            grid[x+25][y+12].alive = true;
            grid[x+25][y+14].alive = true;
            grid[x+26][y+12].alive = true;

            grid[x+34][y].alive = true;
            grid[x+34][y+1].alive = true;
            grid[x+35][y].alive = true;
            grid[x+35][y+1].alive = true;

            grid[x+35][y+7].alive = true;
            grid[x+35][y+8].alive = true;
            grid[x+35][y+9].alive = true;
            grid[x+36][y+7].alive = true;
            grid[x+37][y+8].alive = true;
            break;
        }
    }
}

run();
