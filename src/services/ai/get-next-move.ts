import { COLS, ROWS } from "../game"
import { negamax } from "./negamax"
import { curPlayer } from "./utils"

type Result = { score: number; move: number }

const DEPTH = 5

export function getNextMove(pos: string, depth?: number): Result {
  const m = getMatrix()
  fillMatrix(pos, m)
  if (depth === undefined) depth = DEPTH
  return negamax(m, pos.length, DEPTH)
}

function getMatrix(): number[][] {
  const m = new Array(ROWS).fill(0)
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(COLS).fill(0)
  }
  return m
}

function fillMatrix(pos: string, m: number[][]) {
  for (let turn = 0; turn < pos.length; turn++) {
    const col = +pos[turn]
    let row = ROWS - 1
    while (m[row][col] !== 0 && row >= 0) {
      row--
    }
    if (m[row][col] !== 0) {
      throw new Error("unexpected postion")
    }

    m[row][col] = curPlayer(turn)
  }
}
