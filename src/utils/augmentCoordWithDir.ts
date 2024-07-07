import { Coordinate, Direction } from "./types";

export const augmentCoordWithDir = (coord: Coordinate, direction: Direction) => {
  let out = (() => {
    switch (direction) {
      case Direction.UP:
          return { row: coord.x - 1, col: coord.y };
        case Direction.DOWN:
          return { row: coord.x + 1, col: coord.y };
        case Direction.LEFT:
          return { row: coord.x, col: coord.y - 1 };
        case Direction.RIGHT:
          return { row: coord.x, col: coord.y + 1 };
        default:
          return null;
    }
  });

  return out;
}