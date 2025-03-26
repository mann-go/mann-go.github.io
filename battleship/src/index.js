import "./styles.css";
import { createGameBoardUI, drawShips, updateGrid } from "./ui/boardUI";
import Ship from "./classes/ship";
import Player from "./classes/player";

const players = {
  p1: new Player("One", "player"),
  p2: new Player("Two", "player"),
};

let currentPlayer = "p1";

let ship1 = new Ship(2, 0, false);
let ship2 = new Ship(3, 0, false);
let ship3 = new Ship(4, 0, false);

players.p1.gameboard.placePiece(ship1, 4, 2, "vertical");
players.p1.gameboard.placePiece(ship2, 6, 4);
players.p1.gameboard.placePiece(ship3, 1, 8);

players.p1.player_ships = players.p1.gameboard.getShips();

// Handle attack logic
function handleAttack(x, y, grid_box) {
  let isHit = players[currentPlayer].gameboard.recieveAttack(x, y);
  updateGrid(grid_box, isHit);
}

createGameBoardUI(handleAttack);
drawShips(players.p1.player_ships);

/* 
  TODO:
  Make second game board and visually take turns 
*/
// P2
let ship4 = new Ship(3, 0, false);
let ship5 = new Ship(2, 0, false);
let ship6 = new Ship(2, 0, false);
let ship7 = new Ship(5, 0, false);

players.p2.gameboard.placePiece(ship4, 9, 1);
players.p2.gameboard.placePiece(ship5, 7, 3);
players.p2.gameboard.placePiece(ship6, 3, 5);
players.p2.gameboard.placePiece(ship7, 4, 2);

players.p2.player_ships = players.p2.gameboard.getShips();

// createGameBoardUI(handleAttack);
// drawShips(players.p2.player_ships);
