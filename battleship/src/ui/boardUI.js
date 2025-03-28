export function createGameBoardUI(player, handleAttack) {
  let size = 11;
  let board_container = document.querySelector(".board-container");
  let board = document.createElement("div");
  board.className = `board ${player.name}`;

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
        cell.addEventListener("click", () => handleAttack(letterToNumber, i, cell));
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

export function placeShips() {}

export function drawShips(player, ships) {
  let player_container = document.querySelector(`.${player.name}`);

  let grid_boxes = player_container.querySelectorAll(".grid-box");

  ships.forEach((ship) => {
    console.log(ship.coords);
    let orientation = ship.orientation;
    ship.coords.forEach((coords) => {
      grid_boxes.forEach((box) => {
        let box_id = box.dataset.id.split(",");
        let box_id_object = { x: box_id[0], y: box_id[1] };

        if (letterToIndex(box_id_object.x) === letterToIndex(coords.x) && Number(box_id_object.y) === Number(coords.y)) {
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
    // Disable active player's board
    if (board.classList.contains(player)) {
      board.classList.add("inactive");
      board.classList.remove("active");
      board.style.pointerEvents = "none";
    } else {
      // Enable opponent's board
      board.classList.add("active");
      board.classList.remove("inactive");
      board.style.pointerEvents = "auto";
    }
  });
}

export function updateCombatLog(currentPlayer, x, y, result) {
  let combat_log = document.querySelector("#combat-log");
  let attack = document.createElement("li");

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
  winner.textContent = "The Winner is: " + player;
  let combat_log = document.querySelector("#combat-log");
  combat_log.appendChild(winner);
  document.querySelector(".active-player").textContent = "";

  allBoards.forEach((board) => {
    board.classList.add("inactive");
    board.classList.remove("active");
    board.style.pointerEvents = "none";
  });
}

/* Helper function to converted lettered coordinates to numbers */
function letterToIndex(letter) {
  return letter.trim().charCodeAt(0) - 65;
}
