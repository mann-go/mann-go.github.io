export function createGameBoardUI(handleAttack) {
  let board = document.querySelector(".board");

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
}

export function updateGrid(grid_box, isHit) {
  grid_box.className = isHit ? "hit" : "miss";
}

export function drawShips(ships) {
  let grid_boxes = document.querySelectorAll(".grid-box");
  ships.forEach((ship) => {
    for (let i = 0; i < ship.coords.length; i++) {
      let coords = ship.coords[i];

      grid_boxes.forEach((box) => {
        let box_id = box.dataset.id.split(",").map(Number);
        let box_id_object = { x: box_id[0], y: box_id[1] };

        if (box_id_object.x === coords.x && box_id_object.y === coords.y) {
          let ship_boxes = [];
          for (let i = 0; i <= ship.coords.length; i++) {
            ship_boxes.push({
              x: coords.x,
              y: coords.y,
            });
          }
          ship_boxes.forEach((box) => {
            let coords = [box.x, box.y];
            let box_to_place_ship = document.querySelector(
              `[data-id="${coords}"]`
            );
            box_to_place_ship.className = "ship";
          });
          return;
        }
      });
    }
  });
}

export function playTurn() {}
