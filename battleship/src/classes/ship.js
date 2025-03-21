export default class Ship {
    constructor(length, times_hit, hasSunk) {
        this.length = length;
        this.times_hit = times_hit;
        this.hasSunk = hasSunk;
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