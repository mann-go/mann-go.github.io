export default class Gameboard {
  constructor() {
    this.width = 10;
    this.height = 10;
    this.ships = [];
    this.hits = [];
    this.misses = [];
  }

  getShips() {
    return this.ships;
  }

  placePiece(ship, x, y) {
    if (x > this.width || y > this.height || x < 0 || y < 0) {
      return new Error("Can't place ship out of bounds!");
    }

    if (ship.length > x || ship.length > y) {
      return new Error("Your ship cannot be placed here!");
    }

    if (this.ships.includes([x, y])) {
      return new Error("A ship is already placed here!");
    }

    for (let i = 0; i < ship.length; i++) {
      ship.coords.push({ x: x + i, y: y });
    }

    this.ships.push(ship);
  }

  recieveAttack(hit_x, hit_y) {
    // Check if hit already
    if (this.hits.some((hit) => hit.x === hit_x && hit.y === hit_y)) {
      console.log("This coordinate has already been hit!");
      return true;
    }

    // Check if missed already
    if (this.misses.some((miss) => miss.x === hit_x && miss.y === hit_y)) {
      console.log("This coordinate has already been hit!");
      return false;
    }

    // Stinky
    // Process each ship in array
    for (let ship of this.ships) {
      // Get coords of ship
      for (let coord of ship.coords) {
        // If coords match, process hit
        if (coord.x === hit_x && coord.y === hit_y) {
          ship.hit();

          console.log("Hit", coord.x, coord.y);
          this.hits.push({ x: hit_x, y: hit_y });
          // If ship is sunk, end
          if (ship.isSunk()) {
            console.log("Sunk battleship!");
            return true;
          }

          // If ship can take more hits
          return true;
        }
      }
    }

    // Missed
    console.log("Miss");
    this.misses.push({ x: hit_x, y: hit_y });
    return false;
  }
}
