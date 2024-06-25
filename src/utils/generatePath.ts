import { Point } from "./types";

export const generatePath = (start: Point, end: Point): Point[] => {
  const path: Point[] = [];

  let { row: currentRow, col: currentCol } = start;

  while (currentCol !== end.col) {
    path.push({ row: currentRow, col: currentCol });
    currentCol += currentCol < end.col ? 1 : -1; // Handles leftwards movement
  }

  while (currentRow !== end.row) {
    path.push({ row: currentRow, col: currentCol });
    currentRow += currentRow < end.row ? 1 : -1; // Handles upwards movement
  }

  path.push({ row: currentRow, col: currentCol});

  return path;
}