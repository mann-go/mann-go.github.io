export default class Ship {
  constructor(length, times_hit, hasSunk, orientation, ship_class, coords = []) {
    this.length = length;
    this.times_hit = times_hit;
    this.hasSunk = hasSunk;
    this.orientation = orientation;
    this.ship_class = ship_class;
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
