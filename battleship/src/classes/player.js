import Gameboard from "./gameboard";

export default class Player {
  constructor(name, type) {
    const allowedTypes = ["player", "cpu"];

    if(!allowedTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Type must be either "player" or "cpu".`);
    }

    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
    this.player_ships = []; // Might not need this
  }
}
