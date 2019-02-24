function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.alive = false;
    this.next = false;
    this.prev = false;
    this.needRedraw = false; //to fix bug with 'dead but alive' cell
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