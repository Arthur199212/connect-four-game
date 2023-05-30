import { Matrix } from "../game"

export async function searchForOptions(matrix: Matrix): Promise<number[][]> {
  const options: number[][] = []

  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col].player === 0) {
        options.push([row, col])
        break
      }
    }
  }

  return options
}
