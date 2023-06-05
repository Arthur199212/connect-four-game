import { WIN_COST } from "./constants"
import { evaluatePosition } from "./evaluate-postion"
import { isWinMove } from "./is-win-move"
import { searchForOptions } from "./search-for-options"
import { curPlayer } from "./utils"

export function minimax(
  m: number[][],
  turn: number,
  depth: number,
  alpha: number,
  beta: number
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
      const sign = turn % 2 !== 0 ? 1 : -1
      return { move: col, score: WIN_COST * sign }
    }
  }

  const randOpt = opts[Math.floor(Math.random() * opts.length)][1]

  if (depth === 0) {
    const score = evaluatePosition(m, turn)
    return { move: randOpt, score }
  }

  if (turn % 2 !== 0) {
    const best = {
      move: randOpt,
      score: -Infinity,
    }

    for (const [row, col] of opts) {
      m[row][col] = curPlayer(turn)
      const res = minimax(m, turn + 1, depth - 1, alpha, beta)
      m[row][col] = 0

      if (res.score > best.score) {
        best.score = res.score
        best.move = col

        alpha = Math.max(alpha, best.score)
        if (beta <= alpha) {
          break
        }
      }
    }

    return best
  } else {
    const best = {
      move: randOpt,
      score: Infinity,
    }

    for (const [row, col] of opts) {
      m[row][col] = curPlayer(turn)

      const res = minimax(m, turn + 1, depth - 1, alpha, beta)
      m[row][col] = 0

      if (res.score < best.score) {
        best.score = res.score
        best.move = col

        beta = Math.min(beta, best.score)
        if (beta <= alpha) {
          break
        }
      }
    }

    return best
  }
}
