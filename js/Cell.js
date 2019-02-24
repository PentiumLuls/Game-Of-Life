function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.alive = false;
}

Cell.prototype.draw = function (ctx, cellSize) {
    if (this.alive) {
        ctx.fillStyle = '#000';
    } else {
        ctx.fillStyle = '#ffffff';
    }
    ctx.fillRect(this.x, this.y, cellSize, cellSize);
    ctx.strokeStyle = '#191919';
    ctx.rect(this.x, this.y, cellSize, cellSize);
    ctx.stroke();
};