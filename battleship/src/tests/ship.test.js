import Ship from "../classes/ship";

const mediumShip = new Ship(3, 0, false);
const sunkShip = new Ship(2, 1, false);

test("ship with less hits than its length should not sink", () => {
  expect(mediumShip.isSunk()).toBeFalsy();
});

test("ship with hits equal to its length should sink", () => {
  sunkShip.hit();
  expect(sunkShip.isSunk()).toBeTruthy();
});
