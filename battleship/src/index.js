import "./styles.css";
import {
  createGameBoardUI,
  drawShips,
  playTurn,
  processWin,
  updateCombatLog,
  updateCurrentPlayerUI,
  updateGrid,
} from "./ui/boardUI";
import Ship from "./classes/ship";
import Player from "./classes/player";

const players = {
  p1: new Player("p1", "player"),
  p2: new Player("p2", "player"),
};

let currentPlayer = "p1";

/* 
  TODO:
  Make CPU so game can be Player v.s CPU
    Basic AI, nothing fancy
    Make random guesses
    Checks are in place to prevent picking a spot which is already picked.

  Allow Players to drag 'n' drop ships
    Or allow them to plot with grid

  Grid reworked, now uses (letter, number) coordinates
*/

// P1
let ship1 = new Ship(2, 0, false, "vertical", "Patrol Boat");
let ship2 = new Ship(3, 0, false, "horizontal", "Submarine");
let ship3 = new Ship(4, 0, false, "horizontal", "Battleship");

players.p1.gameboard.placePiece(ship1, "B", 5);
players.p1.gameboard.placePiece(ship2, "H", 6);
players.p1.gameboard.placePiece(ship3, "F", 2);

players.p1.player_ships = players.p1.gameboard.getShips();

createGameBoardUI(players.p1, handleAttack);

// P2
let ship4 = new Ship(3, 0, false, "horizontal", "Submarine");
let ship5 = new Ship(2, 0, false, "vertical", "Patrol Boat");
let ship6 = new Ship(4, 0, false, "horizontal", "Battleship");
let ship7 = new Ship(5, 0, false, "vertical", "Carrier");

players.p2.gameboard.placePiece(ship4, "A", 1);
players.p2.gameboard.placePiece(ship5, "B", 3);
players.p2.gameboard.placePiece(ship6, "C", 8);
players.p2.gameboard.placePiece(ship7, "I", 2);

players.p2.player_ships = players.p2.gameboard.getShips();

createGameBoardUI(players.p2, handleAttack);

// Handle attack logic
function handleAttack(x, y, grid_box) {
  let defending_player = players[currentPlayer === "p1" ? "p2" : "p1"];
  let attacking_player = players[currentPlayer];
  console.log(`${attacking_player.name} hits ${defending_player.name}'s board at ${x}, ${y}`);

  let result = defending_player.gameboard.recieveAttack(x, y);
  updateGrid(grid_box, result);

  setTimeout(() => {
    playTurn(currentPlayer);
    updateCombatLog(currentPlayer, x, y, result);

    if (result === "lost") {
      processWin(currentPlayer);
      return;
    }

    currentPlayer = currentPlayer === "p1" ? "p2" : "p1";
    updateCurrentPlayerUI(currentPlayer);
  }, 1000);
}

drawShips(players.p1, players.p1.player_ships);
drawShips(players.p2, players.p2.player_ships);

let startButton = document.querySelector('#start-game');
startButton.addEventListener("click", startGame)

function startGame() {
  console.log("start game");
}