class Game {
  constructor(canvas) {
    this.gameContext = new GameContext(canvas);
    this.board = new Board(this.gameContext);
    this.robot = new Robot(this.gameContext, this.board.getCell(1, 1));
  }

  start() {
    setInterval(() => this.update(), 20);
  }

  update() {
    this.clear();
    this.board.update();
    this.robot.update();
  }

  clear() {
    this.gameContext.clear();
  }

  sendInstructions(...movements) {
    const instructionMap = {};
    instructionMap[Movement.UP] = this.moveRobotUp;
    instructionMap[Movement.DOWN] = this.moveRobotDown;
    instructionMap[Movement.LEFT] = this.moveRobotLeft;
    instructionMap[Movement.RIGHT] = this.moveRobotRight;

    movements.forEach(movement => instructionMap[movement].apply(this, []));
  }

  moveRobotUp() {
    const destinationCell = this.board.getCell(this.robot.currentPosition.line - 1, this.robot.currentPosition.column);
    this.moveRobot(destinationCell);
  }

  moveRobotDown() {
    const destinationCell = this.board.getCell(this.robot.currentPosition.line + 1, this.robot.currentPosition.column);
    this.moveRobot(destinationCell);
  }

  moveRobotLeft() {
    const destinationCell = this.board.getCell(this.robot.currentPosition.line, this.robot.currentPosition.column - 1);
    this.moveRobot(destinationCell);
  }

  moveRobotRight() {
    const destinationCell = this.board.getCell(this.robot.currentPosition.line, this.robot.currentPosition.column + 1);
    this.moveRobot(destinationCell);
  }

  moveRobot(destinationCell) {
    this.robot.moveTo(destinationCell);
  }
}

const canvas = document.querySelector('#game');
window.game = new Game(canvas);
window.game.start();
window.game.sendInstructions(Movement.DOWN, Movement.DOWN, Movement.RIGHT, Movement.UP, Movement.RIGHT, Movement.LEFT, Movement.LEFT);
