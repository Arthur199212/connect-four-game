import { Matrix } from "../game"
import { OFFSET, WINDOW_SIZE } from "./constants"

const CENTER_COST = 4
const TWO_IN_LINE_COST = 2
const TREE_IN_LINE_COST = 5
const WIN_COST = 1_000
const notTaken = 0

// todo: evaluate oponent markers
export function evaluateWindow(
  matrix: Matrix,
  col: number,
  player: number,
  window: number[][] // [y, x]
) {
  let score = 0
  if (window.length < WINDOW_SIZE) {
    return score
  }
  if (col === Math.floor(matrix[0].length / 2)) {
    score = CENTER_COST
  }

  const opponent = player === 1 ? 2 : 1
  const count = new Array(3).fill(0)
  let fast = 0
  let slow = fast

  while (fast < window.length) {
    const [row, col] = window[fast]
    const cur = matrix[row][col].player
    count[cur]++

    if (fast - slow === OFFSET) {
      // do evaluation
      if (
        count[player] === 3 &&
        count[opponent] === 0 &&
        count[notTaken] === 1
      ) {
        return WIN_COST
      }

      if (
        count[player] === 1 &&
        count[opponent] === 0 &&
        count[notTaken] === 3
      ) {
        score += TWO_IN_LINE_COST
      }

      if (
        count[player] === 2 &&
        count[opponent] === 0 &&
        count[notTaken] === 2
      ) {
        score += TREE_IN_LINE_COST
      }

      // move slow point furser
      const [rowSlow, colSlow] = window[slow]
      const prev = matrix[rowSlow][colSlow].player
      count[prev]--
      slow++
    }

    fast++
  }

  return score
}

// empty
// const m = getMatrix();
// const window = [
//   [5, 0],
//   [5, 1],
//   [5, 2],
//   [5, 3],
//   [5, 4],
//   [5, 5],
//   [5, 6],
// ];
// console.log(evaluateWindow(m, 3, 1, window)); // 4
// 2 in line
// const m = getMatrix();
// m[5][1].player = 1;
// const window = [
//   [5, 0],
//   [5, 1],
//   [5, 2],
//   [5, 3],
//   [5, 4],
//   [5, 5],
//   [5, 6],
// ];
// console.log(evaluateWindow(m, 3, 1, window)); // 8
// 3 in line, 2 in line, middle
// const m = getMatrix();
// m[5][4].player = 1;
// m[5][5].player = 1;
// const window = [
//   [5, 0],
//   [5, 1],
//   [5, 2],
//   [5, 3],
//   [5, 4],
//   [5, 5],
//   [5, 6],
// ];
// console.log(evaluateWindow(m, 3, 1, window)); // 16
// Y, win
// const m = getMatrix();
// m[2][1].player = 1;
// m[4][1].player = 1;
// m[5][1].player = 1;
// const window = [
//   [0, 1],
//   [1, 1],
//   [2, 1],
//   [3, 1],
//   [4, 1],
//   [5, 1],
// ];
// console.log(evaluateWindow(m, 1, 1, window)); // 100
// Y, 2 + 3 in line
// const m = getMatrix();
// m[4][1].player = 1;
// m[5][1].player = 1;
// const window = [
//   [0, 1],
//   [1, 1],
//   [2, 1],
//   [3, 1],
//   [4, 1],
//   [5, 1],
// ];
// console.log(evaluateWindow(m, 1, 1, window)); // 7
// diagonal
// const m = getMatrix();
// const window = [
//   [5, 0],
//   [4, 1],
//   [3, 2],
//   [4, 3],
//   [5, 4],
// ];
// console.log(evaluateWindow(m, 1, 1, window)); // 0
// diagonal, 2 in line
// const m = getMatrix();
// m[3][2].player = 1;
// const window = [
//   [5, 0],
//   [4, 1],
//   [3, 2],
//   [4, 3],
//   [5, 4],
// ];
// console.log(evaluateWindow(m, 1, 1, window)); // 4
// 2, 3 in line
// const m = getMatrix();
// m[3][2].player = 1;
// m[5][4].player = 1;
// const window = [
//   [5, 0],
//   [4, 1],
//   [3, 2],
//   [4, 3],
//   [5, 4],
// ];
// console.log(evaluateWindow(m, 1, 1, window)); // 7
