import "./styles.css";
import {
  createGameBoardUI,
  drawShips,
  playTurn,
  updateGrid,
} from "./ui/boardUI";
import Ship from "./classes/ship";
import Player from "./classes/player";

const players = {
  p1: new Player("p1", "player"),
  p2: new Player("p2", "player"),
};

let currentPlayer = "p1";

// P1
let ship1 = new Ship(2, 0, false, "vertical");
let ship2 = new Ship(3, 0, false, "horizontal");
let ship3 = new Ship(4, 0, false, "horizontal");

players.p1.gameboard.placePiece(ship1, 4, 2);
players.p1.gameboard.placePiece(ship2, 6, 4);
players.p1.gameboard.placePiece(ship3, 1, 8);

players.p1.player_ships = players.p1.gameboard.getShips();

createGameBoardUI(players.p1, handleAttack);
drawShips(players.p1, players.p1.player_ships);

// P2
let ship4 = new Ship(3, 0, false, "horizontal");
let ship5 = new Ship(2, 0, false, "horizontal");
let ship6 = new Ship(2, 0, false, "horizontal");
let ship7 = new Ship(5, 0, false, "horizontal");

players.p2.gameboard.placePiece(ship4, 1, 1);
players.p2.gameboard.placePiece(ship5, 6, 3);
players.p2.gameboard.placePiece(ship6, 7, 5);
players.p2.gameboard.placePiece(ship7, 1, 8);

players.p2.player_ships = players.p2.gameboard.getShips();

createGameBoardUI(players.p2, handleAttack);
drawShips(players.p2, players.p2.player_ships);

// Handle attack logic
function handleAttack(x, y, grid_box) {
  // Get parent board
  let player_container = grid_box.closest(".board");
  let player_name = player_container.classList.contains("p1") ? "p1" : "p2";
  let attacking_player = players[player_name];

  console.log(`Attack at (${x}, ${y}) on ${player_name}`);

  let is_hit = attacking_player.gameboard.recieveAttack(x, y);

  updateGrid(grid_box, is_hit);
  playTurn(currentPlayer);

  // Swap turns
  currentPlayer = currentPlayer === "p1" ? "p2" : "p1";
}
