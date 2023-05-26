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
