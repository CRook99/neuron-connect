import { Coordinate, Direction } from "./types";

export const generateAxonPath = (start: Coordinate, end: Coordinate, direction: Direction = Direction.UP): Coordinate[] => {
  const genPath: Coordinate[] = [];

  genPath.push(start);

  let { x: currentRow, y: currentCol } = genPath[genPath.length - 1];

  while (currentCol !== end.y) {
    genPath.push({ x: currentRow, y: currentCol });
    currentCol += currentCol < end.y ? 1 : -1; // Handles leftwards movement
  }

  while (currentRow !== end.x) {
    genPath.push({ x: currentRow, y: currentCol });
    currentRow += currentRow < end.x ? 1 : -1; // Handles upwards movement
  }

  genPath.push({ x: currentRow, y: currentCol});

  return genPath;
}