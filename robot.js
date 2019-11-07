class Robot {
  constructor(gameContext, startCell) {
    this.gameContext = gameContext;
    this.speed = 10;
    this.isMoving = false;
    this.sprite = new Sprite({
      gameContext: gameContext,
      spriteImage: 'sprites/coin.png',
      ticksPerFrame: 4,
      numberOfFrames: 10,
      width: 440,
      height: 40
    });
    this.currentPosition = startCell;
    this.x = startCell.x;
    this.y = startCell.y;
  }

  update() {
    this.isMoving = this.x !== this.currentPosition.x
      || this.y !== this.currentPosition.y;

    if (this.x !== this.currentPosition.x) {
      this.x = this.x > this.currentPosition.x
        ? this.x - this.speed
        : this.x + this.speed;
      this.isMoving = true;
    }

    if (this.y !== this.currentPosition.y) {
      this.y = this.y > this.currentPosition.y
        ? this.y - this.speed
        : this.y + this.speed;
      this.isMoving = true;
    }

    this.gameContext.canvasContext.beginPath();
    this.gameContext.canvasContext.lineWidth = '3';
    this.gameContext.canvasContext.strokeStyle = 'red';
    this.gameContext.canvasContext.rect(this.x, this.y, 50, 50);
    this.gameContext.canvasContext.stroke();

    this.sprite.update(this.x, this.y);
  }

  processMovements(movementQueue) {
    const instructionMap = {};
    instructionMap[Movement.UP] = this.moveUp;
    instructionMap[Movement.DOWN] = this.moveDown;
    instructionMap[Movement.LEFT] = this.moveLeft;
    instructionMap[Movement.RIGHT] = this.moveRight;

    const makeMove = (movement) => {
      setTimeout(() => {
        if (this.isMoving)
          return makeMove(movement);

        instructionMap[movement].apply(this, []);

        if (movementQueue.hasNext) {
          makeMove(movementQueue.getNext());
        }
      }, 500);
    }

    makeMove(movementQueue.getNext());
  }

  moveUp() {
    const destinationCell = this.gameContext.getCell(this.currentPosition.line - 1, this.currentPosition.column);
    this.moveTo(destinationCell);
  }

  moveDown() {
    const destinationCell = this.gameContext.getCell(this.currentPosition.line + 1, this.currentPosition.column);
    this.moveTo(destinationCell);
  }

  moveLeft() {
    const destinationCell = this.gameContext.getCell(this.currentPosition.line, this.currentPosition.column - 1);
    this.moveTo(destinationCell);
  }

  moveRight() {
    const destinationCell = this.gameContext.getCell(this.currentPosition.line, this.currentPosition.column + 1);
    this.moveTo(destinationCell);
  }


  moveTo(cell) {
    if (cell.doesNotExistInBoard)
      return this.crash();

    this.currentPosition = cell;
  }

  crash() {
    console.log('robot crashed');
  }
}
