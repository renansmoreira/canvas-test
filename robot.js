class Robot {
    constructor(gameContext, startCell) {
        this.gameContext = gameContext;
        this.speed = 1;
        this.isMoving = false;
        this.sprite = new Sprite({
            gameContext: gameContext,
            spriteImage: 'sprites/coin.png',
            ticksPerFrame: 5,
            numberOfFrames: 10,
            width: 400,
            height: 100
        });
        this.currentPosition = startCell;
        this.x = startCell.x;
        this.y = startCell.y;
    }

    update() {
        this.isMoving = this.x === this.currentPosition.x
            && this.y === this.currentPosition.y;

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
        this.gameContext.canvasContext.rect(this.x, this.y, 40, 40);
        this.gameContext.canvasContext.stroke();

        this.sprite.update(this.x, this.y);
    }

    moveTo(cell) {
        this.currentPosition = cell;
    }
}