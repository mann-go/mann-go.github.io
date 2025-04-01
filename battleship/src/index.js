import "./styles.css";
import {
  createGameBoardUI,
  drawShips,
  playTurn,
  processWin,
  updateCombatLog,
  updateCurrentPlayerUI,
  updateGrid,
  restartGame,
} from "./ui/boardUI";
import Ship from "./classes/ship";
import Player from "./classes/player";

const players = {};

const ship_data = {
  carrier: {
    length: 5,
  },
  battleship: {
    length: 4,
  },
  destroyer: {
    length: 3,
  },
  submarine: {
    length: 3,
  },
  patrol_board: {
    length: 2,
  },
};

let currentPlayer = "";

// Start Game by getting player names first
let plotShipModal = document.querySelector("#plot-ships-modal");
let startButton = document.querySelector("#start-game");
let plotShipsButton = document.querySelector("#plot-ships");
let closeModalButton = document.querySelector(".close");
let settings = document.querySelector(".player_names");
let restartGameButton = document.querySelector("#restart-game");

closeModalButton.onclick = function () {
  plotShipModal.style.display = "none";
};

startButton.addEventListener("click", function (e) {
  e.preventDefault();

  let player1_name = document.querySelector("#player1_name").value.trim();
  let player2_name = document.querySelector("#player2_name").value.trim();

  players[player1_name] = new Player(player1_name, "player");
  players[player2_name] = new Player(player2_name, "player");

  // Store names for future use
  sessionStorage.setItem("player1_name", player1_name);
  sessionStorage.setItem("player2_name", player2_name);

  document.querySelector("#plot-ships-modal-player-name").textContent =
    player1_name;
  plotShipModal.style.display = "block";

  settings.style.display = "none";
});

restartGameButton.addEventListener("click", function (e) {
  e.preventDefault();
  restartGame();
})

plotShipsButton.addEventListener("click", function (e) {
  processForm(e);
});

function processForm(event) {
  event.preventDefault();

  let playerName = document.querySelector(
    "#plot-ships-modal-player-name"
  ).textContent;
  let form = document.querySelector("#plot-ships-form");

  const formData = new FormData(form);
  const shipPlacementData = Object.fromEntries(formData);

  processShipPlacements(playerName, shipPlacementData);

  players[playerName].ships = players[playerName].gameboard.getShips();

  currentPlayer = players[playerName];

  // Move to next player or start game
  if (playerName === sessionStorage.getItem("player1_name")) {
    // Switch to Player 2
    document.querySelector("#plot-ships-modal-player-name").textContent =
      sessionStorage.getItem("player2_name");
    form.reset();
    return;
  } else {
    // Both players have submitted ship placements
    plotShipModal.style.display = "none";

    let p1 = sessionStorage.getItem("player1_name");
    let p2 = sessionStorage.getItem("player2_name");

    let p1_ships = players[p1].ships;
    let p2_ships = players[p2].ships;

    createGameBoardUI(players[p1], handleAttack);
    createGameBoardUI(players[p2], handleAttack);
    drawShips(players[p1], p1_ships);
    drawShips(players[p2], p2_ships);

    playTurn(p1);
  }
}

function processShipPlacements(playerName, dataObj) {
  let ships = {};

  for (const key in dataObj) {
    const [shipName, property] = key.split("-");
    const value = dataObj[key];

    if (!ships[shipName]) {
      ships[shipName] = {};
    }

    if (property === "x") {
      // Ensures user input is correctly formatted
      ships[shipName].x = value.toUpperCase();
    } else if (property === "y") {
      ships[shipName].y = value;
    } else if (property === "orientation") {
      ships[shipName].orientation = value;
    }
  }

  for (const ship_type in ships) {
    if (Object.hasOwn(ship_data, ship_type)) {
      let length = ship_data[ship_type].length;
      let x = ships[ship_type].x;
      let y = ships[ship_type].y;
      let direction = ships[ship_type].orientation;

      let ship = new Ship(length, 0, false, direction, ship_type);
      players[playerName].gameboard.placePiece(ship, x, y);
    }
  }
}

// Handle attack logic
function handleAttack(x, y, grid_box) {
  let p1 = sessionStorage.getItem("player1_name");
  let p2 = sessionStorage.getItem("player2_name");

  let defending_player = players[currentPlayer.name === p1 ? p2 : p1];

  let result = defending_player.gameboard.recieveAttack(x, y);
  updateGrid(grid_box, result);

  setTimeout(() => {
    playTurn(currentPlayer.name);
    updateCombatLog(currentPlayer.name, x, y, result);

    if (result === "lost") {
      processWin(currentPlayer.name);
      return;
    }

    currentPlayer = players[currentPlayer.name === p1 ? p2 : p1];
    updateCurrentPlayerUI(currentPlayer.name);
  }, 1000);
}
