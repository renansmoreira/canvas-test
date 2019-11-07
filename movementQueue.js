class MovementQueue {
  constructor(movements) {
    this.currentIndex = 0;
    this.movements = movements;
  }

  get hasNext() {
    return this.currentIndex <= this.movements.length - 1;
  }

  getNext() {
    const movement = this.movements[this.currentIndex];
    this.currentIndex++;
    return movement;
  }
}
