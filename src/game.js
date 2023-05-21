const boardEl = document.getElementById("board")

function Cirlce(val = 0, el = null) {
  // 0 - empty, 1 - first player, 2 - second player
  this.val = val
  // null, DOM element
  this.el = el
}

const columns = 7
const rows = 6
const matrix = new Array(rows).fill(0).map(() => new Array(columns).fill(0))
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[0].length; col++) {
    matrix[row][col] = new Cirlce()
  }
}

// default player 1
let player = 1

startGame()

function startGame() {
  drawBoard(boardEl, matrix)

  const collumns = document.querySelectorAll(".col")
  for (let col of collumns) {
    col.onclick = handleColumnClick
  }
}

function cleanUp() {
  const collumns = document.querySelectorAll(".col")
  for (let col of collumns) {
    col.onclick = null
  }
}

function handleColumnClick(e) {
  let t = e.target
  while (!t.classList.contains("col")) {
    t = t.parentElement
    // for safety
    if (t.tagName === "document") break
  }
  const col = Number(t.id[t.id.length - 1])

  const move = makeMove(matrix, col, player)
  if (!move.done) {
    return
  }
  if (isWinMove(matrix, move.row, move.col, player)) {
    console.log("Player %d WIN", player)
    cleanUp(player)
    return
  }
  // flip users
  player = player === 1 ? 2 : 1
}

// check state of the game
const winCount = 4
const allDirections = [
  [
    [0, -1], // left
    [0, 1], // right
  ],
  [
    [-1, 0], // up
    [1, 0], // down
  ],
  [
    [-1, -1], // up left
    [1, 1], // down right
  ],
  [
    [1, -1], // down left
    [-1, 1], // up right
  ],
]

function isWinMove(matrix, row, col, player) {
  for (let directions of allDirections) {
    const a = traverse(matrix, row, col, directions[0], player)
    const b = traverse(matrix, row, col, directions[1], player)
    if (a + b + 1 >= winCount) return true
  }
  return false
}

function traverse(matrix, row, col, directions, player) {
  let i = 1
  while (i <= winCount) {
    const [dy, dx] = directions
    const newRow = row + dy * i
    const newCol = col + dx * i
    if (
      newRow < 0 ||
      newRow >= matrix.length ||
      newCol < 0 ||
      newCol >= matrix[0].length ||
      matrix[newRow][newCol].val !== player
    )
      break
    i++
  }
  return i - 1
}

// return [isMoveDone: bool, row: int, col: int]
function makeMove(matrix, col, player) {
  // handle out of bound
  if (col < 0 || col >= matrix[0].length) {
    return { done: false, row: 0, col: 0 }
  }

  let row = matrix.length - 1
  for (; row >= 0; row--) {
    if (matrix[row][col].val !== 0) continue
    break
  }
  // column is already full
  if (row < 0) {
    return { done: false, row: 0, col: 0 }
  }

  const circle = matrix[row][col]
  if (circle) {
    circle.val = player
    circle.el.classList.add("fill_" + player)
    return { done: true, row, col }
  }

  return { done: false, row: 0, col: 0 }
}

function drawBoard(boardEl, matrix) {
  for (let col = 0; col < matrix[0].length; col++) {
    const colEl = document.createElement("div")
    colEl.classList.add("col")
    colEl.id = "col_" + col

    for (let row = 0; row < matrix.length; row++) {
      const circleEl = document.createElement("div")
      circleEl.classList.add("circle")
      matrix[row][col].el = circleEl

      colEl.appendChild(circleEl)
    }

    boardEl.appendChild(colEl)
  }
}
