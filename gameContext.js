class GameContext {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this._board = this._robot = {};
  }

  get board() {
    return this._board;
  }

  get robot() {
    return this._robot;
  }

  getCell(x, y) {
    return this._board.getCell(x, y);
  }

  clear() {
    this.canvasContext.clearRect(0, 0, 600, 600);
  }

  setBoard(board) {
    this._board = board;
  }

  setRobot(robot) {
    this._robot = robot;
  }

}
