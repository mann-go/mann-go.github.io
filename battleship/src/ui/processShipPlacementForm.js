export default function processFormData(shipPlacementData) {
    let ships = {};
  
    for (const key in shipPlacementData) {
      // Get ship name and property
      const [shipName, property] = key.split("-");
      // Get the value
      const value = shipPlacementData[key];
  
      // Init ship object
      if (!ships[shipName]) {
        ships[shipName] = {};
      }
  
      // Assign x, y, or orientation
      if (property === "x") {
        ships[shipName].x = value;
      } else if (property === "y") {
        ships[shipName].y = value;
      } else if (property === "orientation") {
        ships[shipName].orientation = value;
      }
    }
  
    return ships;
  }