import { Point } from "./types";

export const generateAxonPath = (start: Point, end: Point): Point[] => {
  const genPath: Point[] = [];

  let { row: currentRow, col: currentCol } = start;

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