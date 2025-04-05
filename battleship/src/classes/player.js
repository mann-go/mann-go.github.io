import Gameboard from "./gameboard";

export default class Player {
  constructor(name, type) {
    const allowedTypes = ["Player", "CPU"];

    if(!allowedTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}. Type must be either "Player" or "CPU".`);
    }

    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }

}
