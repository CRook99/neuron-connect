import { Coordinate, Direction } from "./types";

export const augmentCoordWithDir = (coord: Coordinate, direction: Direction) => {
  let out = (() => {
    switch (direction) {
      case Direction.UP:
          return { row: coord.row - 1, col: coord.col };
        case Direction.DOWN:
          return { row: coord.row + 1, col: coord.col };
        case Direction.LEFT:
          return { row: coord.row, col: coord.col - 1 };
        case Direction.RIGHT:
          return { row: coord.row, col: coord.col + 1 };
        default:
          return null;
    }
  });

  return out;
}