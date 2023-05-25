export type Matrix = MatrixNode[][]
export type MatrixNode = {
  player: 0 | 1 | 2
}
export function getMatrix(rows = 6, cols = 7): Matrix {
  const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const cell: MatrixNode = { player: 0 }
      matrix[row][col] = cell
    }
  }
  return matrix
}

export function getNextPlayer(player: number) {
  return player === 1 ? 2 : 1
}

export function makeMove(
  matrix: { player: number }[][],
  col: number,
  player: number
): { done: boolean; row: number; col: number } {
  // handle out of bound
  if (col < 0 || col >= matrix[0].length) {
    return { done: false, row: 0, col: 0 }
  }

  let row = matrix.length - 1
  for (; row >= 0; row--) {
    if (matrix[row][col].player !== 0) continue
    break
  }
  // column is already full
  if (row < 0) {
    return { done: false, row: 0, col: 0 }
  }

  const circle = matrix[row][col]
  if (circle) {
    circle.player = player
    return { done: true, row, col }
  }

  return { done: false, row: 0, col: 0 }
}

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
