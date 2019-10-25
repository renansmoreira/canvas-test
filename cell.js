class Cell {
    constructor(line, column) {
        this.line = line;
        this.column = column;
        this.x = this.y = this.width = this.height = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
    }
}