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
let isSidesWrapped = true;
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
    addOptionsToStructureSelector();

    prev = make2DArray(cols, rows);
    grid = make2DArray(cols, rows);
    handleStructureSelector();
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
            let col, row;
            if (isSidesWrapped) {
                col = (x + i + cols) % cols;
                row = (y + j + rows) % rows;
            } else {
                col = x + i;
                row = y + j;
            }
            if (!(col < 0 || row < 0 || col + 1 > cols || row > rows))
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
    if (key === 'D') {
        isNeedUpdateOneTime = true;
    }
}

function toggleGridDisplaying() {
    isNeedRedraw = true;
    isGridDisplayed = !isGridDisplayed;
}

function toggleSidesWrapping() {
    isSidesWrapped = !isSidesWrapped;
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
    //STRING READING
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
    }
    //RLE READING
    else if (typeof structure.rle == 'string') {
        const columns = structure.rle.split("$");
        for (var i = 0; i < columns.length; i++) {
            const column = columns[i];
            var num = '';
            var cellY = i;
            var xcountOffset = 0;
            for (let j = 0; j < column.length; j++) {
                const symbol = column[j];
                try {
                    if (symbol === 'b') {
                        if (num === '')
                            num = '1';
                        for (let cellX = 0; cellX < num; cellX++) {
                            grid[x - xOffset + cellX + xcountOffset][y - yOffset + cellY] = 0;
                        }
                        xcountOffset += parseInt(num);
                        num = '';
                    } else if (symbol === 'o') {
                        if (num === '')
                            num = '1';
                        for (let cellX = 0; cellX < num; cellX++) {
                            grid[x - xOffset + cellX + xcountOffset][y - yOffset + cellY] = 1;
                        }
                        xcountOffset += parseInt(num);
                        num = '';
                    } else num += symbol;
                } catch (e) {
                }
            }
        }
    }
    //ARRAY READING
    else {
        for (let i = 0; i < structure.length; i++) {
            grid[x - xOffset + structure[i][0]][y - yOffset + structure[i][1]] = 1;
        }
    }
}

function changeGenerationCounter() {
    document.getElementById('generationCounter').innerHTML = 'Generation: ' + generation;
}

function addOptionsToStructureSelector() {
    const select = document.getElementById('structure-selector');
    if (!localStorage.customTemplates) {
        localStorage.customTemplates = JSON.stringify([]);
    }
    const custom = JSON.parse(localStorage.customTemplates);
    for (let i = 0; i < custom.length; i++) {
        let needAdd = true;
        for (j = 0; j < select.length; j++) {
            if (select.options[j].text === custom[i].name) {
                needAdd = false;
                break;
            }
        }
        if (needAdd) {
            var opt = document.createElement('option');
            opt.value = custom[i].name;
            opt.innerHTML = custom[i].name;
            select.appendChild(opt);
        }
    }
}