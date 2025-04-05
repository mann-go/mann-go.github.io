// Generates a random attack based on the available coordinates
export function generateCPUAttack() {
  let attack;
  let availableXCoordinates = "ABCDEFGHIJ";
  let availableYCoordinates = "123456789";

  let x = availableXCoordinates.charAt(
    Math.floor(Math.random() * availableXCoordinates.length)
  );
  let y = availableYCoordinates.charAt(
    Math.floor(Math.random() * availableYCoordinates.length)
  );

  attack = { x, y };

  return attack;
}

// Generate an attacks direction based on the previous attack
export function generateAttackDirection(prevAttack) {
  let nextAttack;
  let edgeCases = ["@", "K", "0", "11"];
  let directions = ["left", "up", "right", "down"];
  let nextAttackDirection =
    directions[Math.floor(Math.random() * directions.length)];

  let xCoordinateToNumber = letterToIndex(prevAttack.x);

  switch (nextAttackDirection) {
    case "left":
      nextAttack = {
        x: String.fromCharCode(64 + xCoordinateToNumber - 1),
        y: prevAttack.y,
      };
      break;
    case "up":
      nextAttack = { x: prevAttack.x, y: String(Number(prevAttack.y) - 1) };
      break;
    case "right":
      nextAttack = {
        x: String.fromCharCode(64 + xCoordinateToNumber + 1),
        y: prevAttack.y,
      };
      break;
    case "down":
      nextAttack = { x: prevAttack.x, y: String(Number(prevAttack.y) + 1) };
      break;
    default:
      break;
  }

  if (edgeCases.includes(nextAttack.x) || edgeCases.includes(nextAttack.y)) {
    return (nextAttack = generateCPUAttack());
  }

  return nextAttack;
}

// Helper function to converted lettered coordinates to numbers
function letterToIndex(letter) {
  return letter.trim().charCodeAt(0) - 64;
}

// Generates ship placements for CPU
export function generateCPUCoordinates(ship_data) {
  let coordinates = {};
  let availableXCoordinates = "ABCDEFGHIJ";
  let availableYCoordinates = "123456789";
  let availableOrientation = ["horizontal", "vertical"];
  let occupiedPositions = new Set();

  for (const ship in ship_data) {
    let isValidPlacement = false;

    while (!isValidPlacement) {
      let xCoordinate = availableXCoordinates.charAt(
        Math.floor(Math.random() * availableXCoordinates.length)
      );
      let yCoordinate = availableYCoordinates.charAt(
        Math.floor(Math.random() * availableYCoordinates.length)
      );
      let orientation =
        availableOrientation[
          Math.floor(Math.random() * availableOrientation.length)
        ];

      let shipLength = ship_data[ship].length;
      let shipPositions = [];

      // Convert x coordinate to index
      let xCoordinateIndex = availableXCoordinates.indexOf(xCoordinate);

      // Find occupied ship positions
      for (let i = 0; i < shipLength; i++) {
        if (orientation === "horizontal") {
          let newX = availableXCoordinates[xCoordinateIndex + 1];
          // Out of bounds
          if (!newX) break;
          shipPositions.push(`${newX}${yCoordinate}`);
        } else {
          let newY = String(Number(yCoordinate) + i);
          // Out of bounds
          if (!availableYCoordinates.includes(newY)) break;
          shipPositions.push(`${xCoordinate}${newY}`);
        }
      }

      // Check if placement is valid
      if (
        shipPositions.length === shipLength &&
        shipPositions.every((pos) => !occupiedPositions.has(pos))
      ) {
        isValidPlacement = true;
        coordinates[ship] = {
          x: xCoordinate,
          y: yCoordinate,
          orientation: orientation,
        };
        shipPositions.forEach((pos) => occupiedPositions.add(pos));
      }
    }
  }

  return coordinates;
}

// Creates an attack for the CPU using the methods in this file
export function cpuAttacks(players) {
  let playerName = sessionStorage.getItem("player1_name");
  let humanPlayer = players[playerName];

  let hitsArray = players[playerName].gameboard.hits;
  let missesArray = players[playerName].gameboard.misses;
  let nextAttack;
  let attempts = 0;

  do {
    // Break out clause
    if (attempts > 4) {
      nextAttack = generateCPUAttack();
      break;
    }

    if (hitsArray.length !== 0) {
      // Make an educated guess based on previous hit
      let prevAttack = hitsArray[hitsArray.length - 1];
      console.log("Previously hit: ", prevAttack);
      nextAttack = generateAttackDirection(prevAttack);
    } else {
      // Get random coordinates
      nextAttack = generateCPUAttack();
    }

    attempts++;
  } while (
    hitsArray.some(
      (value) => value.x === nextAttack.x && value.y === nextAttack.y
    ) ||
    missesArray.some(
      (value) => value.x === nextAttack.x && value.y === nextAttack.y
    )
  );

  let result = humanPlayer.gameboard.recieveAttack(nextAttack.x, nextAttack.y);

  let gridBox = document.querySelector(
    `[data-id="${nextAttack.x},${nextAttack.y}"]`
  );

  return { result, gridBox, playerName, nextAttack };
}
