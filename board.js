class Board {
    constructor(gameContext) {
        this.cells = [
            new Cell(1, 1),
            new Cell(1, 2),
            new Cell(1, 3),
            new Cell(1, 4),

            new Cell(2, 1),
            new Cell(2, 2),
            new Cell(2, 3),
            new Cell(2, 4),

            new Cell(3, 1),
            new Cell(3, 2),
            new Cell(3, 3),
            new Cell(3, 4),

            new Cell(4, 1),
            new Cell(4, 2),
            new Cell(4, 3),
            new Cell(4, 4)
        ];

        const cellWidth = 100;
        const cellHeigth = 100;

        this.cells.forEach(cell => {
            const x = cell.column * cellWidth;
            const y = cell.line * cellHeigth;
            cell.setPosition(x, y);
            cell.setSize(cellWidth, cellHeigth)
        });

        this.gameContext = gameContext;
    }

    update() {
        this.cells.forEach(cell => {
            this.gameContext.canvasContext.beginPath();
            this.gameContext.canvasContext.lineWidth = '2';
            this.gameContext.canvasContext.strokeStyle = 'black';
            this.gameContext.canvasContext.rect(cell.x, cell.y, cell.width, cell.height);
            this.gameContext.canvasContext.stroke();
        });
    }

    getCell(line, column) {
        return this.cells.find(cell => cell.line === line && cell.column === column) || Cell.createAnEmptyObject();
    }
}
