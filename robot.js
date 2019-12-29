class Robot {
  constructor(gameContext, startCell) {
    this.idleSprite = new Sprite({
      gameContext: gameContext,
      spriteImage: 'sprites/idle_robot.png',
      ticksPerFrame: 20,
      numberOfFrames: 4,
      width: 498,
      height: 170
    });

    this.walkingSprite = new Sprite({
      gameContext: gameContext,
      spriteImage: 'sprites/walking_robot.png',
      ticksPerFrame: 10,
      numberOfFrames: 6,
      width: 800,
      height: 170,
      repeat: true,
      repeatAtIndex: 2
    });

    this.gameContext = gameContext;
    this.speed = 10;
    this.isMoving = false;
    this.sprite = this.idleSprite;
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

        if (movementQueue.hasNext)
          makeMove(movementQueue.getNext());
        else
          this.sprite = this.idleSprite;
      }, 500);
    }

    this.sprite = this.walkingSprite;
    makeMove(movementQueue.getNext());
75

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
