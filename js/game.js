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

function draw() {
    const canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
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

function create2DArray(size) {
    const grid = new Array(size.cols);
    for (var x = 0; x < size.cols; x++) {
        grid[x] = new Array(size.rows);
    }
    return grid;
}

run();