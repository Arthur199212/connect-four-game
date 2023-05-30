import { Matrix } from "../game"
import { OFFSET } from "./constants"

export function formWindows(matrix: Matrix, options: number[][]) {
  const res = []

  for (const [row, col] of options) {
    // x
    let l = col - OFFSET
    let r = col + OFFSET
    let window = []
    while (l <= r) {
      if (matrix[row] === undefined || matrix[row][l] === undefined) {
        l++
        continue
      }
      window.push([row, l])
      l++
    }
    window.length > 3 && res.push(window)
    window = []

    // y -> only down for optimization
    l = row
    r = row + OFFSET
    while (l <= r) {
      if (matrix[l] === undefined || matrix[l][col] === undefined) {
        l++
        continue
      }
      window.push([l, col])
      l++
    }
    window.length > 3 && res.push(window)
    window = []

    // lowering diagonal
    let lR = row - OFFSET
    let lC = col - OFFSET
    let rR = row + OFFSET
    let rC = col + OFFSET
    while (lR <= rR && lC <= rC) {
      if (matrix[lR] === undefined || matrix[lR][lC] === undefined) {
        lR++
        lC++
        continue
      }
      window.push([lR, lC])
      lR++
      lC++
    }
    window.length > 3 && res.push(window)
    window = []

    // rising diagonal
    lR = row + OFFSET
    lC = col - OFFSET
    rR = row - OFFSET
    rC = col + OFFSET
    while (lR >= rR && lC <= rC) {
      if (matrix[lR] === undefined || matrix[lR][lC] === undefined) {
        lR--
        lC++
        continue
      }
      window.push([lR, lC])
      lR--
      lC++
    }
    window.length > 3 && res.push(window)
  }

  return res
}
