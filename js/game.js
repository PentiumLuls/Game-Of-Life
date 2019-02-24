const cellSize = 40;
let canvasWidth;
let canvasHeight;
let size;
let isGameOver;
let grid;

function run() {
    setup();
    const canvas = document.getElementById('canvas');
    canvas.addEventListener("mouseup", handleCanvasClick, false);
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
}

function setup() {
    const canvas = document.getElementById('canvas');
    canvasWidth = cellSize * 10;
    canvasHeight = cellSize * 10;
    size = {cols: canvasWidth / cellSize, rows: canvasHeight / cellSize};
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    grid = create2DArray(size);
    isGameOver = false;
    for(var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y] = new Cell(x * cellSize, y * cellSize);
        }
    }
}

function update() {
    for(var x = 0; x < size.cols; x++) {
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

    for(var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y].alive = grid[x][y].next;
        }
    }
}

function draw() {
    const canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for(var x = 0; x < size.cols; x++) {
        for (var y = 0; y < size.rows; y++) {
            grid[x][y].draw(ctx, cellSize);
        }
    }
}

function handleCanvasClick(event) {
    btnCode = event.button;

    const x = event.offsetX;
    const y = event.offsetY;
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);


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
            } catch (e) {}
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

run();