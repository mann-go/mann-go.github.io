import Ship from "../classes/ship";
import Gameboard from "../classes/gameboard";

const gameboard = new Gameboard();

const ship1 = new Ship(5, 0, false);
const ship2 = new Ship(2, 0, false);
const outOfBoundsShip = new Ship(4, 0, false);
const shipWithLengthLongerThanBounds = new Ship(5, 0, 0);
const shipWithIdenticalCoords = new Ship(5, 0, false);

test("ships should be placeable", () => {
  gameboard.placePiece(ship1, "A", 5);
  expect(gameboard.ships).toHaveLength(1);
  gameboard.placePiece(ship2, "B", 3);
  expect(gameboard.ships).toHaveLength(2);
});

test("ships cannot be placed out-of-bounds", () => {
  expect(() => {
    gameboard
      .placePiece(outOfBoundsShip, "Q", 10)
      .toThrow("Can't place ship out of bounds!");
  });
});

test("a ship with a length larger than the bounds cannot be placed", () => {
  expect(() => {
    gameboard
      .placePiece(shipWithLengthLongerThanBounds, "F", 5)
      .toThrow("Your ship cannot be placed here!");
  });
});

test("a ship cannot be placed on top of another ship", () => {
  expect(() => {
    gameboard
      .placePiece(shipWithIdenticalCoords, "A", 5)
      .toThrow("A ship is already placed here!");
  });
});

test("ships should be hittable", () => {
  gameboard.recieveAttack("A", 5);
  expect(gameboard.hits[0]).toEqual({ x: "A", y: 5 });
});

test("spots are marked as hit if no ship is present", () => {
  gameboard.recieveAttack("F", 10);
  expect(gameboard.misses[0]).toEqual({ x: "F", y: 10 });
});
