export function searchForOptions(matrix: number[][]): number[][] {
  const options: number[][] = []

  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = matrix.length - 1; row >= 0; row--) {
      if (matrix[row][col] === 0) {
        options.push([row, col])
        break
      }
    }
  }

  return randomizeOptions(options)
}

function randomizeOptions(opts: number[][]): number[][] {
  for (let i = 0; i < opts.length; i++) {
    const j: number = Math.floor(Math.random() * opts.length)
    ;[opts[i], opts[j]] = [opts[j], opts[i]]
  }
  return opts
}
