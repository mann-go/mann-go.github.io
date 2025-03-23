export default class Gameboard {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.ships = []; // Stores player ship coords and whether it isSunk
        this.attacks = []; // Stores missed attacks
    }

    placePiece(ship, x, y) {
        if (x > this.width || y > this.height || x < 0 || y < 0) {
            return new Error("Can't place ship out of bounds!");
        }

        if (ship.length > x || ship.length > y) {
            return new Error("Your ship cannot be placed here!");
        }

        if(this.ships.includes([x, y])) {
            return new Error("A ship is already placed here!");
        }

        this.ships.push([ship, x, y]);
    }

    recieveAttack(hit_x, hit_y) {
        for (let ship in this.ships) {
            if (ship.x === hit_x && ship.y === hit_y) {
                ship.piece.isHit();
                return this.attacks.push([hit_x, hit_y]);
            } else {
                return this.attacks.push([hit_x, hit_y]);
            }
        } 
    }
}