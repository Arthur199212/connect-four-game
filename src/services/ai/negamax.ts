import { WIN_COST } from "./constants"
import { evaluatePosition } from "./evaluate-postion"
import { isWinMove } from "./is-win-move"
import { searchForOptions } from "./search-for-options"
import { curPlayer } from "./utils"

export function negamax(
  m: number[][],
  turn: number,
  depth: number
): { move: number; score: number } {
  const opts = searchForOptions(m)
  // stalemate
  if (opts.length === 0) {
    return { move: 0, score: 0 }
  }

  // win next move
  for (const [row, col] of opts) {
    m[row][col] = curPlayer(turn)
    const winMove = isWinMove(m, row, col)
    m[row][col] = 0

    if (winMove) {
      return { move: col, score: WIN_COST }
    }
  }

  const randOpt = opts[Math.floor(Math.random() * opts.length)][1]

  if (depth === 0) {
    const score = evaluatePosition(m, turn)
    return { move: randOpt, score }
  }

  const best = {
    move: randOpt,
    score: -WIN_COST * 2,
  }

  for (const [row, col] of opts) {
    m[row][col] = curPlayer(turn)

    const res = negamax(m, turn + 1, depth - 1)
    m[row][col] = 0
    res.score *= -1 // flip player

    if (res.score > best.score) {
      best.score = res.score
      best.move = col
    }
  }

  return best
}
