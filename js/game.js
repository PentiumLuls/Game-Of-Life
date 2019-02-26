function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let prev;
let cols;
let rows;
let resolution = 20;
let boardWidth = 40;
let boardHeight = 30;

let generation;
let isPaused = false;
let isGridDisplayed = false;
let isNeedUpdateOneTime = false; //TO HANDLE STEPPING OVER ONE GENERATION
let isNeedRedraw = false;

function setup() {
    boardWidth = document.getElementById('board-width-input').value;
    boardHeight = document.getElementById('board-height-input').value;
    resolution = document.getElementById('board-cell-size-input').value;
    isGridDisplayed = document.getElementById('is-grid-displayed').checked;
    createCanvas(boardWidth * resolution, boardHeight * resolution);
    cols = width / resolution;
    rows = height / resolution;
    generation = 1;
    changeGenerationCounter();

    prev = make2DArray(cols, rows);
    grid = make2DArray(cols, rows);
    handleStructureSelector();
    //generateRandomBoard();
}

function draw() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (prev[i][j] !== grid[i][j] || generation === 1 || isNeedRedraw) {
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
    }
    if (isNeedRedraw)
        isNeedRedraw = false;

    if (!isPaused) {
        upgrade();
    } else if (isNeedUpdateOneTime) {
        isNeedUpdateOneTime = false;
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
    prev = grid;
    grid = next;
    generation++;
    changeGenerationCounter();
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
    if (key === 'D' || keyCode === RIGHT_ARROW) {
        isNeedUpdateOneTime = true;
    }
}

function toggleGridDisplaying() {
    isNeedRedraw = true;
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

function applyStructureToBoard(structure, xOffset, yOffset) {
    let x = Math.floor(cols / 2);
    let y = Math.floor(rows / 2);
    if (typeof structure == 'string') {
        var cellX = 0;
        var cellY = 0;
        for (let i = 0; i < structure.length; i++) {
            const cell = structure[i];
            if (cell === 'E') {
                cellX = 0;
                cellY++;
            } else {
                cellX++;
            }
            if (cell === '*')
                grid[x - xOffset + cellX][y - yOffset + cellY] = 1;
            else if (cell === '.')
                grid[x - xOffset + cellX][y - yOffset + cellY] = 0;
        }
    } else {
        for (let i = 0; i < structure.length; i++) {
            grid[x - xOffset + structure[i][0]][y - yOffset + structure[i][1]] = 1;
        }
    }
}

function changeGenerationCounter() {
    document.getElementById('generationCounter').innerHTML = 'Generation: ' + generation;
}

function handleStructureSelector() {
    clearBoard();
    generation = 1;
    changeGenerationCounter();
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
            applyStructureToBoard(glider, 2, 2);
            break;
        }
        case 'small exploder': {
            applyStructureToBoard(smallExploder, 2, 2);
            break;
        }
        case 'exploder': {
            applyStructureToBoard(exploder, 5, 5);
            break;
        }
        case '10 cell row': {
            applyStructureToBoard(tenCellRow, 5, 0);
            break;
        }
        case 'lightweight spaceship': {
            applyStructureToBoard(lightweightSpaceship, 3, 3);
            break;
        }
        case 'tumbler': {
            applyStructureToBoard(tumbler, 6, 6);
            break;
        }
        case 'gosper glider gun': {
            applyStructureToBoard(gosperGliderGun, 19, 10);
            break;
        }
        case 'flower': {
            applyStructureToBoard(flower, 10, 10);
            break;
        }
        case 'verage': {
            applyStructureToBoard(verage, 7, 9);
            break;
        }
    }

}