export interface Coordinate {
  x: number;
  y: number;
}

export const compareCoordinates = (a: Coordinate, b: Coordinate): boolean => {
  return a.x === b.x && a.y === b.y;
}

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  null = "none"
}