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
  for (const directions of allDirections) {
    const a = traverse(matrix, row, col, directions[0], player)
    const b = traverse(matrix, row, col, directions[1], player)
    if (a + b + 1 >= winCount) return true
  }
  return false
}

function traverse(
  matrix: Matrix,
  row: number,
  col: number,
  directions: number[],
  player: number
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
    )
      break
    i++
  }
  return i - 1
}
