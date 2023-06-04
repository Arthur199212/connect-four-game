import { Matrix, MatrixNode } from "./get-matrix"

export type Move = {
  done: boolean
  row: number
  col: number
  player: number
  count: number
}

export const NOT_DONE_MOVE: Move = {
  done: false,
  row: 0,
  col: 0,
  player: 0,
  count: 0,
}

export function makeMove(
  matrix: Matrix,
  col: number,
  player: number,
  prevMove: Move
): Move {
  // handle out of bound
  if (col < 0 || col >= matrix[0].length) {
    return NOT_DONE_MOVE
  }

  let row = matrix.length - 1
  for (; row >= 0; row--) {
    if (matrix[row][col].player !== 0) continue
    break
  }
  // column is already full
  if (row < 0) {
    return NOT_DONE_MOVE
  }

  const node = matrix[row][col]
  if (node) {
    node.player = player as MatrixNode["player"]
    const newCount = prevMove.count + 1
    return { done: true, row, col, count: newCount, player }
  }

  return NOT_DONE_MOVE
}
