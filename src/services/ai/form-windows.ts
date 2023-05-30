import { Matrix } from "../game"
import { OFFSET } from "./constants"

export type OptionWithWindow = {
  col: number
  window: number[][]
}

export async function formWindows(
  matrix: Matrix,
  options: number[][]
): Promise<OptionWithWindow[]> {
  const res: OptionWithWindow[] = []

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
    window.length > 3 && res.push({ col, window })
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
    window.length > 3 && res.push({ col, window })
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
    window.length > 3 && res.push({ col, window })
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
    window.length > 3 && res.push({ col, window })
  }

  return res
}
