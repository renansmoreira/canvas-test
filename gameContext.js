class GameContext {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
    }

    clear() {
        this.canvasContext.clearRect(0, 0, 600, 600);
    }
}