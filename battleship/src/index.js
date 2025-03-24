import "./styles.css";
import { createGameBoardUI, drawShips } from "./ui/boardUI";
import Ship from "./classes/ship";
import Player from "./classes/player";

const player1 = new Player("One", "Real");

let ship1 = new Ship(2, 0, false);
let ship2 = new Ship(3, 0, false);
let ship3 = new Ship(4, 0, false);

player1.gameboard.placePiece(ship1, 5, 2);
player1.gameboard.placePiece(ship2, 4, 3);
player1.gameboard.placePiece(ship3, 5, 2);

let player1_ships = player1.gameboard.getShips();

createGameBoardUI();
drawShips(player1_ships);