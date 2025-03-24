export default class Gameboard {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.ships = []; // Stores player ship coords and whether it isSunk
        this.attacks = []; // Stores missed attacks
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

        if(this.ships.includes([x, y])) {
            return new Error("A ship is already placed here!");
        }

        for(let i = 0; i < ship.length; i++) {
            ship.coords.push({x: x + i, y: y});
        }

        this.ships.push(ship);
    }

    recieveAttack(hit_x, hit_y) {
        console.log("hitting", hit_x, hit_y);
        this.ships.forEach(ship => {
            ship.coords.forEach(coord => {
                if (coord.x === hit_x && coord.y === hit_y) {
                    ship.hit(); // Doesn't work
                    console.log("Hit", coord.x, coord.y);
                    return this.attacks.push([hit_x, hit_y]);
                } else {
                    console.log("Miss");
                    return this.attacks.push([hit_x, hit_y]);
                }
            })

        });
    }
}