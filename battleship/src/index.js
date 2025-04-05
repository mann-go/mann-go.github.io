import "./styles.css";
import {
  playTurn,
  processWin,
  updateCombatLog,
  updateCurrentPlayerUI,
  updateGrid,
  restartGame,
  startGame,
} from "./ui/boardUI";
import { generateCPUCoordinates, cpuAttacks } from "./classes/cpu";
import Ship from "./classes/ship";
import Player from "./classes/player";
import processFormData from "./ui/processShipPlacementForm";

const players = {};
let currentPlayer = "";

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
  patrol_boat: {
    length: 2,
  },
};


// Start Game by getting player names first
let plotShipModal = document.querySelector("#plot-ships-modal");
let startButton = document.querySelector("#start-game");
let plotShipsButton = document.querySelector("#plot-ships");
let playerNamesContainer = document.querySelector(".player-names");
let restartGameButton = document.querySelector("#restart-game");
let howToPlayContainer = document.querySelector(".how-to-play");
document.querySelector(".how-to-play").style.display = "block";

startButton.addEventListener("click", function (e) {
  e.preventDefault();

  let playerForm = document.querySelector("#form-get-player-names");
  let checkPlayerFormValidity = playerForm.checkValidity();
  playerForm.reportValidity();

  // Prevent empty values for names being submitted
  if (!checkPlayerFormValidity) {
    console.warn("Player names have not been selected!");
    return;
  }

  getPlayerNames();

  plotShipModal.style.display = "block";

  playerNamesContainer.style.display = "none";
  startButton.style.display = "none";
});

plotShipsButton.addEventListener("click", function (e) {
  processForm(e);
});

restartGameButton.addEventListener("click", function (e) {
  e.preventDefault();
  restartGame();
});

function getPlayerNames() {
  let player1_name = document.querySelector("#player1_name").value.trim();
  let player2_name;
  let vsOppenentType = document.querySelector("#vs_type").value;

  let isCPU = vsOppenentType === "CPU" ? true : false;

  if (vsOppenentType === "CPU") {
    player2_name = "p2";
  } else {
    player2_name = document.querySelector("#player2_name").value.trim();
  }

  players[player1_name] = new Player(player1_name, "Player");
  players[player2_name] = new Player(player2_name, vsOppenentType);

  // Store names for future use
  sessionStorage.setItem("player1_name", player1_name);
  sessionStorage.setItem(
    "player2_name",
    JSON.stringify({ name: player2_name, isCPU: isCPU })
  );

  document.querySelector("#plot-ships-modal-player-name").textContent =
    player1_name;
}

function processForm(event) {
  event.preventDefault();

  let shipPlacementForm = document.querySelector("#plot-ships-form");
  let checkPlayerFormValidity = shipPlacementForm.checkValidity();
  shipPlacementForm.reportValidity();

  // Prevent empty values for names being submitted
  if (!checkPlayerFormValidity) {
    console.warn("Invalid placement(s)");
    return;
  }

  let playerName = document.querySelector(
    "#plot-ships-modal-player-name"
  ).textContent;

  const formData = new FormData(shipPlacementForm);
  const shipPlacementData = Object.fromEntries(formData);

  // Process form data into suitable objects for placing ships
  let processedShipPlacementData = processFormData(shipPlacementData);

  // Place the processed ship objects
  processShipPlacements(playerName, processedShipPlacementData);

  // Get the current players ships
  players[playerName].ships = players[playerName].gameboard.getShips();

  currentPlayer = players[playerName];

  shipPlacementForm.reset();

  let player2Data = JSON.parse(sessionStorage.getItem("player2_name"));
  let player2Name = player2Data.name;

  // Move to next player or start game
  if (
    JSON.parse(sessionStorage.getItem("player2_name")).isCPU === false &&
    players[player2Name].ships == null
  ) {
    // Switch to Player 2
    document.querySelector("#plot-ships-modal-player-name").textContent =
      player2Name;
    shipPlacementForm.reset();
    return;
  } else if (
    playerName === sessionStorage.getItem("player1_name") &&
    JSON.parse(sessionStorage.getItem("player2_name")).isCPU === true
  ) {
    let cpuCoodinates = generateCPUCoordinates(ship_data);
    processShipPlacements(player2Name, cpuCoodinates);
    players["p2"].ships = players["p2"].gameboard.getShips();
  }

  // Both players have submitted ship placements
  plotShipModal.style.display = "none";
  howToPlayContainer.style.display = "none";

  let p1 = sessionStorage.getItem("player1_name");
  let p2 = JSON.parse(sessionStorage.getItem("player2_name")).name;

  // Stinky fix, ensures player 1 doesn't get a free shot at the start of the game.
  currentPlayer = players[p1];

  let p1_ships = players[p1].ships;
  let p2_ships = players[p2].ships;

  startGame(players, p1, p1_ships, p2, p2_ships, handleAttack);
}

function processShipPlacements(playerName, ships) {
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
  let result;
  let p1 = sessionStorage.getItem("player1_name");
  let p2Data = JSON.parse(sessionStorage.getItem("player2_name"));
  let p2 = p2Data.name;
  let isCPU = p2Data.isCPU;

  let defending_player = players[currentPlayer.name === p1 ? p2 : p1];

  // Player attack
  result = defending_player.gameboard.recieveAttack(x, y);
  updateGrid(grid_box, result);

  setTimeout(() => {
    updateCombatLog(currentPlayer.name, x, y, result);

    if (result === "lost") {
      processWin(currentPlayer.name);
      return;
    }

    // Switch players
    currentPlayer = players[currentPlayer.name === p1 ? p2 : p1];
    updateCurrentPlayerUI(currentPlayer.name);
    playTurn(currentPlayer.name);

    // If the new current player is CPU, make it attack
    if (isCPU) {
      document.querySelector(".active").style.pointerEvents = "none";
      setTimeout(() => {
        let cpuTurn = cpuAttacks(players);
        updateGrid(cpuTurn.gridBox, cpuTurn.result);
        updateCombatLog(
          "CPU",
          cpuTurn.nextAttack.x,
          cpuTurn.nextAttack.y,
          cpuTurn.result
        );

        setTimeout(() => {
          if (cpuTurn.result === "lost") {
            processWin("CPU");
            return;
          }

          // Switch back to player
          currentPlayer = players[cpuTurn.playerName];
          updateCurrentPlayerUI(cpuTurn.playerName);
          playTurn(currentPlayer.name);
        }, 1000);
      }, 1000);
    }
  }, 1000);
}
