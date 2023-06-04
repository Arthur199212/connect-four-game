import { isWinMove } from "./is-win-move"
import { searchForOptions } from "./search-for-options"
import { curPlayer, nextPlayer } from "./utils"

export function evaluatePosition(m: number[][], turn: number): number {
  let winMoves = 0
  const opts = searchForOptions(m)

  for (const [row, col] of opts) {
    m[row][col] = curPlayer(turn)
    if (isWinMove(m, row, col)) {
      winMoves += 1
    }

    m[row][col] = nextPlayer(turn)
    if (isWinMove(m, row, col)) {
      winMoves -= 1
    }

    m[row][col] = 0
  }

  return winMoves
}
