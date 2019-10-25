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

    moveRobotUp() {
        const destinationCell = this.board.getCell(this.robot.currentPosition.line - 1, this.robot.currentPosition.column);
        this.robot.moveTo(destinationCell);
    }

    moveRobotDown() {
        const destinationCell = this.board.getCell(this.robot.currentPosition.line + 1, this.robot.currentPosition.column);
        this.robot.moveTo(destinationCell);
    }

    moveRobotLeft() {
        const destinationCell = this.board.getCell(this.robot.currentPosition.line, this.robot.currentPosition.column - 1);
        this.robot.moveTo(destinationCell);
    }

    moveRobotRight() {
        const destinationCell = this.board.getCell(this.robot.currentPosition.line, this.robot.currentPosition.column + 1);
        this.robot.moveTo(destinationCell);
    }
}

const canvas = document.querySelector('#game');
window.game = new Game(canvas);
window.game.start();