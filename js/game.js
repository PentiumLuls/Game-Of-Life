function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let boardWidth = 40;
let boardHeight = 30;
let isPaused = false;
let isGridDisplayed = true;

function setup() {
    createCanvas(boardWidth * resolution, boardHeight * resolution);
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    generateRandomBoard();
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            stroke('#191919');
            if (isGridDisplayed)
                strokeWeight(1);
            else
                noStroke();
            if (grid[i][j] == 1) {
                fill('#ffe300');
                rect(x, y, resolution, resolution);
            } else {
                fill('#626262');
                rect(x, y, resolution, resolution);
            }
        }
    }

    if (!isPaused) {
        upgrade();
    }
}

function upgrade() {
    let next = make2DArray(cols, rows);
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            // Count live neighbors!
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function clearBoard() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function mousePressed() {
    const x = mouseX;
    const y = mouseY;
    const cellX = Math.floor(x / resolution);
    const cellY = Math.floor(y / resolution);
    if (grid[cellX][cellY] === 1) {
        grid[cellX][cellY] = 0;
    } else {
        grid[cellX][cellY] = 1;
    }
}

function keyPressed() {
    if (key === ' ') {
        isPaused = !isPaused;
    }
}

function toggleGridDisplaying() {
    isGridDisplayed = !isGridDisplayed;
}

function applySettings() {
    const newWidth = document.getElementById('board-width-input').value;
    const newHeight = document.getElementById('board-height-input').value;
    const newCellSize = document.getElementById('board-cell-size-input').value;

    if (!(newWidth === width && newHeight === height && newCellSize === resolution)) {
        boardHeight = newHeight;
        boardWidth = newWidth;
        resolution = newCellSize;
        setup();
    }
}

function generateRandomBoard() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function handleStructureSelector() {
    clearBoard();
    let x = Math.floor(cols / 2);
    let y = Math.floor(rows / 2);
    switch (document.getElementById('structure-selector').value) {
        case 'clear': {
            clearBoard();
            break;
        }
        case 'random': {
            generateRandomBoard();
            break;
        }
        case 'glider': {
            x -= 2;
            y -= 2;
            grid[x][y + 1] = 1;
            grid[x + 1][y + 2] = 1;
            grid[x + 2][y + 2] = 1;
            grid[x + 2][y + 1] = 1;
            grid[x + 2][y] = 1;
            break;
        }
        case 'small exploder': {
            x -= 2;
            y -= 2;
            grid[x + 1][y] = 1;
            grid[x][y + 1] = 1;
            grid[x + 1][y + 1] = 1;
            grid[x + 2][y + 1] = 1;
            grid[x][y + 2] = 1;
            grid[x + 2][y + 2] = 1;
            grid[x + 1][y + 3] = 1;
            break;
        }
        case 'exploder': {
            x -= 5;
            y -= 5;
            grid[x][y] = 1;
            grid[x + 2][y] = 1;
            grid[x + 4][y] = 1;
            grid[x][y + 1] = 1;
            grid[x + 4][y + 1] = 1;
            grid[x][y + 2] = 1;
            grid[x + 4][y + 2] = 1;
            grid[x][y + 3] = 1;
            grid[x + 4][y + 3] = 1;
            grid[x][y + 4] = 1;
            grid[x + 2][y + 4] = 1;
            grid[x + 4][y + 4] = 1;
            break;
        }
        case '10 cell row': {
            x -= 5;
            grid[x][y] = 1;
            grid[x + 1][y] = 1;
            grid[x + 2][y] = 1;
            grid[x + 3][y] = 1;
            grid[x + 4][y] = 1;
            grid[x + 5][y] = 1;
            grid[x + 6][y] = 1;
            grid[x + 7][y] = 1;
            grid[x + 8][y] = 1;
            grid[x + 9][y] = 1;
            break;
        }
        case 'lightweight spaceship': {
            x -= 3;
            y -= 3;
            grid[x + 1][y] = 1;
            grid[x + 2][y] = 1;
            grid[x + 3][y] = 1;
            grid[x + 4][y] = 1;
            grid[x][y + 1] = 1;
            grid[x + 4][y + 1] = 1;
            grid[x + 4][y + 2] = 1;
            grid[x][y + 3] = 1;
            grid[x + 3][y + 3] = 1;
            break;
        }
        case 'tumbler': {
            x -= 6;
            y -= 6;
            grid[x + 1][y] = 1;
            grid[x + 2][y] = 1;
            grid[x + 4][y] = 1;
            grid[x + 5][y] = 1;

            grid[x + 1][y + 1] = 1;
            grid[x + 2][y + 1] = 1;
            grid[x + 4][y + 1] = 1;
            grid[x + 5][y + 1] = 1;

            grid[x + 2][y + 2] = 1;
            grid[x + 4][y + 2] = 1;

            grid[x][y + 3] = 1;
            grid[x + 2][y + 3] = 1;
            grid[x + 4][y + 3] = 1;
            grid[x + 6][y + 3] = 1;

            grid[x][y + 4] = 1;
            grid[x + 2][y + 4] = 1;
            grid[x + 4][y + 4] = 1;
            grid[x + 6][y + 4] = 1;

            grid[x][y + 5] = 1;
            grid[x + 1][y + 5] = 1;
            grid[x + 5][y + 5] = 1;
            grid[x + 6][y + 5] = 1;
            break;
        }

        case 'gosper glider gun': {
            x -= 19;
            y -= 10;
            grid[x][y + 2] = 1;
            grid[x + 1][y + 2] = 1;
            grid[x][y + 3] = 1;
            grid[x + 1][y + 3] = 1;

            grid[x + 8][y + 3] = 1;
            grid[x + 8][y + 4] = 1;
            grid[x + 9][y + 2] = 1;
            grid[x + 9][y + 4] = 1;
            grid[x + 10][y + 2] = 1;
            grid[x + 10][y + 3] = 1;

            grid[x + 16][y + 4] = 1;
            grid[x + 16][y + 5] = 1;
            grid[x + 16][y + 6] = 1;
            grid[x + 17][y + 4] = 1;
            grid[x + 18][y + 5] = 1;

            grid[x + 22][y + 1] = 1;
            grid[x + 22][y + 2] = 1;
            grid[x + 23][y] = 1;
            grid[x + 23][y + 2] = 1;
            grid[x + 24][y] = 1;
            grid[x + 24][y + 1] = 1;

            grid[x + 24][y + 12] = 1;
            grid[x + 24][y + 13] = 1;
            grid[x + 25][y + 12] = 1;
            grid[x + 25][y + 14] = 1;
            grid[x + 26][y + 12] = 1;

            grid[x + 34][y] = 1;
            grid[x + 34][y + 1] = 1;
            grid[x + 35][y] = 1;
            grid[x + 35][y + 1] = 1;

            grid[x + 35][y + 7] = 1;
            grid[x + 35][y + 8] = 1;
            grid[x + 35][y + 9] = 1;
            grid[x + 36][y + 7] = 1;
            grid[x + 37][y + 8] = 1;
            break;
        }
    }

}