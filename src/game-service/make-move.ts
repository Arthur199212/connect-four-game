import { Matrix, MatrixNode } from "./get-matrix"

export type Move = {
  done: boolean
  row: number
  col: number
}

export const NO_MOVE: Move = { done: false, row: 0, col: 0 }

export function makeMove(matrix: Matrix, col: number, player: number): Move {
  // handle out of bound
  if (col < 0 || col >= matrix[0].length) {
    return NO_MOVE
  }

  let row = matrix.length - 1
  for (; row >= 0; row--) {
    if (matrix[row][col].player !== 0) continue
    break
  }
  // column is already full
  if (row < 0) {
    return NO_MOVE
  }

  const node = matrix[row][col]
  if (node) {
    node.player = player as MatrixNode["player"]
    return { done: true, row, col }
  }

  return NO_MOVE
}
