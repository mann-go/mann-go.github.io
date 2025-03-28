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
    if (ship.orientation === "horizontal" && x + ship.length > this.width) {
      return new Error("Ship exceeds grid width!");
    }
    if (ship.orientation === "vertical" && y + ship.length > this.height) {
      return new Error("Ship exceeds grid height!");
    }

    if (
      this.ships.some((ship) =>
        ship.coords.some((coord) => coord.x === x && coord.y === y)
      )
    ) {
      return new Error("A ship is already placed here!");
    }

    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "horizontal") {
        let coordToNumber = x.charCodeAt(0);
        ship.coords.push({ x: String.fromCharCode(coordToNumber + i), y: y});
      } else {
        ship.coords.push({ x: x, y: y + i });
      }
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

          // console.log("Hit", coord.x, coord.y);
          this.hits.push({ x: hit_x, y: hit_y });
          // If ship is sunk, end
          if (ship.isSunk()) {
            console.log("Sunk battleship!");
            if (this.ships.every((ship) => ship.isSunk())) {
              return "lost";
            }
            return "sunk";
          }

          // If ship can take more hits
          return true;
        }
      }
    }

    // Missed
    this.misses.push({ x: hit_x, y: hit_y });
    return false;
  }
}
