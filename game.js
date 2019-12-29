class Game {
  constructor(canvas) {
    this.gameContext = new GameContext(canvas);
    const board = new Board(this.gameContext);
    const robot = new Robot(this.gameContext, board.getCell(1, 1));

    this.gameContext.setBoard(board);
    this.gameContext.setRobot(robot);
  }

  start() {
    setInterval(() => this.update(), 20);
  }

  update() {
    this.clear();
    this.gameContext.board.update();
    this.gameContext.robot.update();
  }

  clear() {
    this.gameContext.clear();
  }

  sendInstructions() {
    this.gameContext.robot.processMovements(window.movementInput.getQueue());
  }
}

const canvas = document.querySelector('#game');
window.game = new Game(canvas);
window.game.start();

window.movementInput = new MovementInput(window.game);
window.movementInput.addMovements([Movement.DOWN, Movement.DOWN, Movement.RIGHT, Movement.UP, Movement.RIGHT, Movement.LEFT, Movement.LEFT, Movement.LEFT]);

//window.game.sendInstructions();
