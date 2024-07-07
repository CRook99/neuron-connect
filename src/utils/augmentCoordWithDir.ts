import { Coordinate, Direction } from "./types";

export const augmentCoordWithDir = (coord: Coordinate, direction: Direction): Coordinate => {
  switch (direction) {
    case Direction.UP:
        return { x: coord.x - 1, y: coord.y };
      case Direction.DOWN:
        return { x: coord.x + 1, y: coord.y };
      case Direction.LEFT:
        return { x: coord.x, y: coord.y - 1 };
      case Direction.RIGHT:
        return { x: coord.x, y: coord.y + 1 };
      default:
        return { x: -1, y: -1 };
  }
};