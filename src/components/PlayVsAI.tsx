import { useEffect, useRef, useState } from "react"
import BoardWhiteImg from "../assets/board-layer-white-small.svg"
import BoardBlackImg from "../assets/board-layer-black-small.svg"
import { getNextMove } from "../services/ai"
import {
  getMatrix,
  getWinPath,
  makeMove,
  getNextPlayer,
  useCountDown,
  GameScore,
  NOT_DONE_MOVE,
  Matrix,
  COLS,
  ROWS,
  INITIAL_SCORE,
  TIME_ON_MOVE_SECONDS,
  allNodesCount,
  drawWinCombination,
} from "../services/game"
import {
  Board,
  Controller,
  Header,
  MoveMarker,
  ScoreOnePlayer,
  TurnBanner,
  WinBanner,
} from "."

export function PlayVsAI() {
  const [player, setPlayer] = useState(1)
  const isGameDone = useRef(false)
  const [matrix, setMatrix] = useState<Matrix>(getMatrix(ROWS, COLS))
  const [score, setScore] = useState<GameScore>(INITIAL_SCORE)
  const timer = useCountDown(TIME_ON_MOVE_SECONDS)
  const [prevMove, setPrevMove] = useState(NOT_DONE_MOVE)
  const [winner, setWinner] = useState(0)
  const [pos, setPos] = useState("")

  useAI(pos, player, handleMove)

  if (!isGameDone.current && timer.timeLeft < 0) {
    timer.stop()
    const nextPlayer = getNextPlayer(player)
    setPlayer(nextPlayer)
    setWinner(nextPlayer)
    updateWinnersScore(nextPlayer)
    isGameDone.current = true
  }

  function updateWinnersScore(player: number) {
    setScore((prevScore: GameScore) => {
      const score = prevScore.slice()
      if (score[player - 1] !== undefined) score[player - 1]++
      return score as GameScore
    })
  }

  function handleMove(col: number) {
    if (isGameDone.current) return

    const move = makeMove(matrix, col, player, prevMove)
    if (!move.done) {
      return
    }
    setPos(pos + String(move.col))
    setPrevMove(move)

    const winPath = getWinPath(matrix, move.row, move.col, player)
    if (winPath.length) {
      drawWinCombination(matrix, move.row, move.col, winPath)

      setWinner(player)
      isGameDone.current = true
      timer.stop()
      updateWinnersScore(player)
      return
    }
    if (move.count >= allNodesCount) {
      isGameDone.current = true
      timer.stop()
      return
    }
    timer.restart()
    setPlayer(getNextPlayer)
  }

  function handleRestart() {
    setPos("")
    isGameDone.current = false
    setMatrix(getMatrix())
    setPlayer(getNextPlayer)
    setPrevMove(NOT_DONE_MOVE)
    timer.restart()
  }

  const footerColor = isGameDone.current
    ? `bg-main-color-${player}`
    : "bg-[#5c2dd5]"

  return (
    <div className="flex w-full h-full flex-col min-h-screen">
      <Header
        handleRestart={handleRestart}
        onMenuOpen={timer.stop}
        onMenuClose={timer.resume}
      />
      <ScoreOnePlayer score={score} />
      <div className="w-full mt-12 mx-auto flex justify-center items-start">
        <div className="relative flex justify-center items-start">
          <BoardBlackImg className="absolute top-2" />
          <BoardWhiteImg className="z-10" />
          <MoveMarker move={prevMove} cols={COLS} />
          {!isGameDone.current && (
            <Controller
              disabled={player !== 1}
              matrix={matrix}
              onClick={handleMove}
            />
          )}
          <Board matrix={matrix} />
          {!isGameDone.current && (
            <TurnBanner player={player} timeLeft={timer.timeLeft} />
          )}
          {isGameDone.current && (
            <WinBanner player={winner} handleRestart={handleRestart} />
          )}
        </div>
      </div>
      <div
        className={`${footerColor} min-h-[11rem] max-w-lg mx-auto rounded-t-[3rem] w-full flex-1`}
      ></div>
    </div>
  )
}

const ONE_SEC = 1000
function randomDelay() {
  const depayMs = Math.round(Math.random() * ONE_SEC + ONE_SEC / 2)
  return new Promise((res) => {
    setTimeout(() => {
      res(undefined)
    }, depayMs)
  })
}

function useAI(pos: string, player: number, handleMove: (col: number) => void) {
  async function getNextMoveWithDelay(pos: string) {
    const [move] = await Promise.all([
      new Promise<number>((res) => {
        res(getNextMove(pos).move)
      }),
      randomDelay(),
    ])
    handleMove(move)
  }

  useEffect(() => {
    if (player !== 2) {
      return
    }
    getNextMoveWithDelay(pos)
  }, [player])
}
