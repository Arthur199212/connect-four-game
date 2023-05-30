import { Matrix } from "../game"
import { evaluateWindow } from "./evaluate-window"
import { formWindows } from "./form-windows"
import { searchForOptions } from "./search-for-options"

export function minimax() {
  // update
  const m = [] as Matrix
  const col = 3
  const player = 1
  //

  const options = searchForOptions(m)
  const windows = formWindows(m, options)

  let maxEvaluation = 0
  let bestChoise = 0
  for (const w of windows) {
    const evaluation = evaluateWindow(m, col, player, w)
    if (maxEvaluation < evaluation) {
      bestChoise = col
      maxEvaluation = evaluation
    }
  }
  console.log(bestChoise)
}
