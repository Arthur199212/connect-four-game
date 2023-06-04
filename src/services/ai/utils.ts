import { Matrix } from "../game"

export function curPlayer(turn: number): number {
  return 1 + (turn % 2)
}

export function nextPlayer(turn: number): number {
  return 2 - (turn % 2)
}

export function isInbound(
  m: number[][] | Matrix,
  row: number,
  col: number
): boolean {
  return row >= 0 && row < m.length && col >= 0 && col < m[0].length
}
