import { Coordinate, Direction } from "./types";

export const generateAxonPath = (start: Coordinate, end: Coordinate, direction: Direction = Direction.UP): Coordinate[] => {
  const genPath: Coordinate[] = [];

  genPath.push(start);

  let { row: currentRow, col: currentCol } = genPath[genPath.length - 1];

  while (currentCol !== end.col) {
    genPath.push({ row: currentRow, col: currentCol });
    currentCol += currentCol < end.col ? 1 : -1; // Handles leftwards movement
  }

  while (currentRow !== end.row) {
    genPath.push({ row: currentRow, col: currentCol });
    currentRow += currentRow < end.row ? 1 : -1; // Handles upwards movement
  }

  genPath.push({ row: currentRow, col: currentCol});

  return genPath;
}