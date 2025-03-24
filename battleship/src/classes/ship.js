export default class Ship {
    constructor(length, times_hit, hasSunk, coords = []) {
        this.length = length;
        this.times_hit = times_hit;
        this.hasSunk = hasSunk;
        this.coords = coords;
    }

    hit() {
        return this.times_hit++;
    }

    isSunk() {
        if (this.length === this.times_hit) {
            return this.hasSunk = true;
        }
    }

}