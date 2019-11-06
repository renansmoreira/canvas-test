class Cell {
  constructor(line, column) {
    this.line = line;
    this.column = column;
    this.x = this.y = this.width = this.height = 0;
    this.doesNotExistInBoard = false;
    this.isBlocked = false;
  }

  static createAnEmptyObject() {
    const cell = new Cell(-1, -1);
    cell.doesNotExistInBoard = true;
    return cell;
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
