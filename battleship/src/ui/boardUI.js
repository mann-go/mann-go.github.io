export function createGameBoardUI(player, handleAttack) {
  let size = 11;
  let board_container = document.querySelector(".board-container");
  let board = document.createElement("div");
  board.className = `board ${player.name} inactive`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");

      if (i === 0 && j === 0) {
        // Empty corner cell
        cell.textContent = `${player.name}`;
        cell.className = "coordinate";
      } else if (i === 0) {
        // Column labels A-J
        cell.className = "coordinate";
        cell.innerText = String.fromCharCode(64 + j);
      } else if (j === 0) {
        // Row labels 1-10
        cell.className = "coordinate";
        cell.innerText = i;
      } else {
        // Game grid cells
        let letterToNumber = String.fromCharCode(64 + j);
        cell.className = "grid-box";
        cell.dataset.id = `${letterToNumber},${i}`;
        cell.addEventListener("click", () =>
          handleAttack(letterToNumber, i, cell)
        );
      }
      board.appendChild(cell);
    }
  }

  board_container.appendChild(board);
}

export function updateGrid(grid_box, isHit) {
  grid_box.className = isHit ? "hit" : "miss";
  grid_box.classList += " inactive";
}

export function drawShips(player, ships) {
  let player_container = document.querySelector(`.${player.name}`);

  let grid_boxes = player_container.querySelectorAll(".grid-box");

  ships.forEach((ship) => {
    let orientation = ship.orientation;
    ship.coords.forEach((coords) => {
      grid_boxes.forEach((box) => {
        let box_id = box.dataset.id.split(",");
        let box_id_object = { x: box_id[0], y: box_id[1] };

        if (
          letterToIndex(box_id_object.x) === letterToIndex(coords.x) &&
          Number(box_id_object.y) === Number(coords.y)
        ) {
          box.classList.add("ship");

          if (orientation === "horizontal") {
            box.classList.add("horizontal");
          } else {
            box.classList.add("vertical");
          }
        }
      });
    });
  });
}

export function playTurn(player) {
  let allBoards = document.querySelectorAll(".board");

  allBoards.forEach((board) => {
    if (board.classList.contains(player)) {
      // Enable opponent's board
      board.classList.add("active");
      board.classList.remove("inactive");
      board.style.pointerEvents = "auto";
    } else {
      // Disable active player's board
      board.classList.add("inactive");
      board.classList.remove("active");
      board.style.pointerEvents = "none";
    }
  });
}

export function createCombatLog() {
  let main = document.querySelector("main");

  // Not an elegant solution, but it works
  if (main.lastChild) {
    main.removeChild(main.lastChild);
  }

  let infoContainer = document.createElement("div");
  infoContainer.className = "info-container";

  // Create combat log
  let combatLogContainer = document.createElement("div");
  combatLogContainer.className = "combat-log-container";

  let combatLogTitle = document.createElement("h2");
  combatLogTitle.textContent = "Combat Log:";

  let combatLogList = document.createElement("ul");
  combatLogList.id = "combat-log";

  // Add combat log to info container
  combatLogContainer.appendChild(combatLogTitle);
  combatLogContainer.appendChild(combatLogList);
  infoContainer.appendChild(combatLogContainer);

  // Create active player 
  let activePlayer = document.createElement("h3");
  activePlayer.className = "active-player";

  // Add active player to info container
  combatLogContainer.appendChild(activePlayer);

  // Add combat log and active player to parent container
  infoContainer.appendChild(combatLogContainer);
  infoContainer.appendChild(activePlayer);

  // Finally add info container to main container
  main.appendChild(infoContainer);
}

export function updateCombatLog(currentPlayer, x, y, result) {
  let combat_log = document.querySelector("#combat-log");
  let attack = document.createElement("li");
  attack.className = "combat-log-item"; 

  if (result === "sunk") {
    attack.textContent = `${currentPlayer} ${result} a ship at (${x}, ${y})`;
    combat_log.appendChild(attack);
    return;
  }

  let has_hit = result ? "hit" : "missed";
  attack.textContent = `${currentPlayer} ${has_hit} (${x}, ${y})`;
  combat_log.appendChild(attack);
}

export function updateCurrentPlayerUI(currentPlayer) {
  let active_player = document.querySelector(".active-player");
  active_player.textContent = `${currentPlayer} is picking...`;
}

export function processWin(player) {
  let allBoards = document.querySelectorAll(".board");
  let winner = document.createElement("li");
  winner.className = "combat-log-item";
  winner.textContent = "The Winner is: " + player;
  let combat_log = document.querySelector("#combat-log");
  combat_log.appendChild(winner);
  document.querySelector(".active-player").textContent = "";

  allBoards.forEach((board) => {
    board.classList.add("active");
    board.classList.remove("inactive");
    board.style.pointerEvents = "none";
  });

  document.querySelector("#restart-game").style.display = "block";
}

export function startGame(players, p1, p1_ships, p2, p2_ships, handleAttack) {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.width = "100%";

  createGameBoardUI(players[p1], handleAttack);
  createGameBoardUI(players[p2], handleAttack);
  drawShips(players[p1], p1_ships);
  drawShips(players[p2], p2_ships);
  createCombatLog();

  playTurn(p1);
}

export function restartGame() {
  let board_container = document.querySelector(".board-container");
  while (board_container.firstChild) {
    board_container.removeChild(board_container.firstChild);
  }

  let player_names_container = document.querySelector(".player_names");
  player_names_container.style.display = "flex"; // Fix later
  document.querySelector("#restart-game").style.display = "none";
  document.querySelector("#start-game").style.display = "block";
}

/* Helper function to converted lettered coordinates to numbers */
function letterToIndex(letter) {
  return letter.trim().charCodeAt(0) - 65;
}
