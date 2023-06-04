export type GameScore = [number, number]

export type Matrix = MatrixNode[][]

export type MatrixNode = {
  player: 0 | 1 | 2
  win?: boolean
}

export const ROWS = 6
export const COLS = 7

export function getMatrix(rows = ROWS, cols = COLS): Matrix {
  const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0))
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const cell: MatrixNode = { player: 0 }
      matrix[row][col] = cell
    }
  }
  return matrix
}
