export function createGameBoardUI(player, handleAttack) {
  let board_container = document.querySelector(".board-container");
  let board = document.createElement("div");
  board.className = `board ${player.name}`;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let grid_box = document.createElement("div");
      grid_box.className = "grid-box";
      grid_box.id = "grid-box";
      grid_box.dataset.id = `${i},${j}`;
      grid_box.addEventListener("click", () => handleAttack(i, j, grid_box));
      board.appendChild(grid_box);
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
        let box_id = box.dataset.id.split(",").map(Number);
        let box_id_object = { x: box_id[0], y: box_id[1] };

        if (box_id_object.x === coords.x && box_id_object.y === coords.y) {
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
  let winner = document.createElement('li');
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
