class Sprite {
    constructor(options) {
        this.gameContext = options.gameContext;

        const sprite = new Image();
        sprite.src = options.spriteImage;
        this.sprite = sprite;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame;
        this.numberOfFrames = options.numberOfFrames;
        this.width = options.width;
        this.height = options.height;
    }

    update(x, y) {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1)
                this.frameIndex++;
            else
                this.frameIndex = 0;
        }
        this.gameContext.canvasContext.drawImage(
            this.sprite,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            x,
            y,
            this.width / this.numberOfFrames,
            this.height);
    }
}