export function createGameBoardUI() {
    let board = document.querySelector('.board');

    for(let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grid_box = document.createElement('div');
            grid_box.className = "grid-box";
            grid_box.setAttribute("data-id", [i, j]);
            board.appendChild(grid_box);
        }
    }
}

export function drawShips(ships) {    
    let grid_boxes = document.querySelectorAll('.grid-box');
    ships.forEach(ship => {
        let length = ship.ship.length;
        let coords = ship.coord_x + "," + ship.coord_y;

        grid_boxes.forEach(box => {
            let box_id = box.dataset.id;
            if (box_id === coords) {
                let ship_boxes = [];
                for(let i = 0; i <= length; i++) {
                    ship_boxes.push({
                        x: ship.coord_x + i,
                        y: ship.coord_y,
                    });
                }

                ship_boxes.forEach(box => {
                    let coords = [box.x, box.y];
                    let box_to_place_ship = document.querySelector(`[data-id="${coords}"]`);
                    box_to_place_ship.className = "ship";
                });
                return;
            }
        })
    });
}