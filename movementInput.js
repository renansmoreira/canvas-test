class MovementInput {
  constructor(game) {
    this.game = game;
    this.movements = [];
  }

  addMovement(newMovement) {
    this.movements.push(newMovement);
    this.updateScreenList();
  }

  addMovements(movements) {
    this.movements = movements;
    this.updateScreenList();
  }

  clear() {
    this.movements = [];
    this.updateScreenList();
  }

  updateScreenList() {
    document.querySelector('#currentInstructions').innerHTML = this.movements.join(', ');
  }

  getQueue() {
    return new MovementQueue(this.movements);
  }
}
