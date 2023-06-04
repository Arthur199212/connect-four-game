import { Matrix } from "./get-matrix"

export function drawWinCombination(
  matrix: Matrix,
  row: number,
  col: number,
  path: number[][]
) {
  matrix[row][col].win = true
  for (const [row, col] of path) {
    matrix[row][col].win = true
  }
}
