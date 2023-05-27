import { useState } from "react"
import BoardWhiteImg from "../assets/board-layer-white-small.svg"
import BoardBlackImg from "../assets/board-layer-black-small.svg"
import {
  Board,
  Controller,
  Header,
  MoveMarker,
  Score,
  TurnBanner,
  WinBanner,
} from "."
import {
  getMatrix,
  isWinMove,
  makeMove,
  getNextPlayer,
  useCountDown,
  GameScore,
  NO_MOVE,
} from "../game-service"

const INITIAL_SCORE: GameScore = [0, 0]
const TIME_ON_MOVE_SECONDS = 30
const ROWS = 6
const COLS = 7
const allNodesCount = ROWS * COLS

export function Game() {
  const [player, setPlayer] = useState(1)
  const [isGameDone, setIsGameDone] = useState(false)
  const [matrix, setMatrix] = useState(getMatrix(ROWS, COLS))
  const [score, setScore] = useState<GameScore>(INITIAL_SCORE)
  const { timeLeft, restart, resume, stop } = useCountDown(TIME_ON_MOVE_SECONDS)
  const [prevMove, setPrevMove] = useState(NO_MOVE)
  const [winner, setWinner] = useState(0)
  const [moveCount, setMoveCount] = useState(1)

  if (!isGameDone && timeLeft < 0) {
    stop()
    const nextPlayer = getNextPlayer(player)
    setPlayer(nextPlayer)
    updateWinnersScore(nextPlayer)
    setIsGameDone(true)
  }

  function updateWinnersScore(player: number) {
    setScore((prevScore: GameScore) => {
      const score = prevScore.slice()
      if (score[player - 1] !== undefined) score[player - 1]++
      return score as GameScore
    })
  }

  function handleMove(col: number) {
    const move = makeMove(matrix, col, player)
    if (!move.done) {
      return
    }
    setPrevMove(move)
    setMoveCount((count) => count + 1)

    if (isWinMove(matrix, move.row, move.col, player)) {
      setWinner(player)
      setIsGameDone(true)
      stop()
      updateWinnersScore(player)
      return
    }
    if (moveCount >= allNodesCount) {
      setIsGameDone(true)
      stop()
    }
    restart()
    setPlayer(getNextPlayer)
  }

  function handleRestart() {
    setIsGameDone(false)
    setMatrix(getMatrix())
    setPlayer(getNextPlayer)
    setPrevMove(NO_MOVE)
    setMoveCount(1)
    restart()
  }

  const footerColor = isGameDone ? `bg-main-color-${player}` : "bg-[#5c2dd5]"

  return (
    <div className="flex w-full h-full flex-col min-h-screen">
      <Header
        handleRestart={handleRestart}
        onMenuOpen={stop}
        onMenuClose={resume}
      />
      <Score score={score} />
      <div className="w-full mt-12 mx-auto flex justify-center items-start">
        <div className="relative flex justify-center items-start">
          <BoardBlackImg className="absolute top-2" />
          <BoardWhiteImg className="z-10" />
          <MoveMarker player={player} move={prevMove} cols={COLS} />
          {!isGameDone && <Controller matrix={matrix} onClick={handleMove} />}
          <Board matrix={matrix} />
          {!isGameDone && <TurnBanner player={player} timeLeft={timeLeft} />}
          {isGameDone && (
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
