export default class Ship {
  constructor(length, times_hit, hasSunk, orientation, coords = []) {
    this.length = length;
    this.times_hit = times_hit;
    this.hasSunk = hasSunk;
    this.orientation = orientation;
    this.coords = coords;
  }

  hit() {
    return ++this.times_hit;
  }

  isSunk() {
    this.hasSunk = this.times_hit >= this.length;
    return this.hasSunk;
  }
}
