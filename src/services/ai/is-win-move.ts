import { isInbound } from "./utils"

const winThreshold = 4

export function isWinMove(m: number[][], row: number, col: number): boolean {
  const player = m[row][col]
  return (
    checkWindow(m, row, col, 1, 0, player) >= winThreshold ||
    checkWindow(m, row, col, 1, -1, player) >= winThreshold ||
    checkWindow(m, row, col, 0, 1, player) >= winThreshold ||
    checkWindow(m, row, col, 1, 1, player) >= winThreshold
  )
}

function checkWindow(
  m: number[][],
  row: number,
  col: number,
  dy: number,
  dx: number,
  player: number
): number {
  let count = 1
  let i = 1
  while (isInbound(m, row + i * dy, col + i * dx)) {
    if (m[row + i * dy][col + i * dx] !== player) {
      break
    }
    count++
    i++
  }
  i = -1
  while (isInbound(m, row + i * dy, col + i * dx)) {
    if (m[row + i * dy][col + i * dx] !== player) {
      break
    }
    count++
    i--
  }
  return count
}
