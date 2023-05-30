import { Matrix } from "./get-matrix"

const winCount = 4
const allDirections = [
  [
    [0, -1], // left
    [0, 1], // right
  ],
  [
    [-1, 0], // up
    [1, 0], // down
  ],
  [
    [-1, -1], // up left
    [1, 1], // down right
  ],
  [
    [1, -1], // down left
    [-1, 1], // up right
  ],
]

export function isWinMove(
  matrix: Matrix,
  row: number,
  col: number,
  player: number
) {
  let winCombinationFound = false
  let path: number[][] = []

  for (const directions of allDirections) {
    traverse(matrix, row, col, directions[0], player, path)
    traverse(matrix, row, col, directions[1], player, path)
    if (path.length >= winCount - 1) {
      winCombinationFound = true
      break
    }
    path = []
  }
  if (!winCombinationFound) return false

  matrix[row][col].win = true
  for (const [row, col] of path) {
    matrix[row][col].win = true
  }
  return true
}

function traverse(
  matrix: Matrix,
  row: number,
  col: number,
  directions: number[],
  player: number,
  path?: number[][]
) {
  let i = 1
  while (i <= winCount) {
    const [dy, dx] = directions
    const newRow = row + dy * i
    const newCol = col + dx * i
    if (
      newRow < 0 ||
      newRow >= matrix.length ||
      newCol < 0 ||
      newCol >= matrix[0].length ||
      matrix[newRow][newCol].player !== player
    ) {
      break
    }
    path && path.push([newRow, newCol])
    i++
  }
  return i - 1
}
