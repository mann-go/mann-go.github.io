export default class Gameboard {
  constructor() {
    this.width = 11;
    this.height = 11;
    this.ships = [];
    this.hits = [];
    this.misses = [];
  }

  getShips() {
    return this.ships;
  }

  placePiece(ship, x, y) {
    let convertXCoord = x.charCodeAt(0) - 64;
    if (ship.orientation === "horizontal" && convertXCoord + ship.length > this.width) {
      console.warn("Ship exceeds grid width!");
      x = this.width - ship.length;
      
      x = String.fromCharCode(x + 64);
    }
    if (ship.orientation === "vertical" && y + ship.length > this.height) {
      console.warn("Ship exceeds grid height! Coordinates changed.");
      y = this.height - ship.length;
    }

    if (
      this.ships.some((ship) =>
        ship.coords.some((coord) => coord.x === x && coord.y === y)
      )
    ) {
      console.warn("A ship is already placed here!");
      x = convertXCoord + 1;
      x = String.fromCharCode(x + 64);
      y = Number(y) + 1;
    }

    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === "horizontal") {
        let coordToNumber = x.charCodeAt(0);
        ship.coords.push({ x: String.fromCharCode(coordToNumber + i), y: y });
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
        if (coord.x === hit_x && Number(coord.y) === Number(hit_y)) {
          ship.hit();

          this.hits.push({ x: hit_x, y: hit_y });
          // If ship is sunk, end
          if (ship.isSunk() && this.ships.every((ship) => ship.isSunk())) {
            return "lost";
          } else if (ship.isSunk()) {
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
