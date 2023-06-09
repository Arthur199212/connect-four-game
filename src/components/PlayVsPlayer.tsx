import { useState } from "react"
import BoardWhiteImg from "../assets/board-layer-white-small.svg"
import BoardBlackImg from "../assets/board-layer-black-small.svg"
import {
  getMatrix,
  getWinPath,
  makeMove,
  getNextPlayer,
  useCountDown,
  GameScore,
  NOT_DONE_MOVE,
  Matrix,
  drawWinCombination,
  ROWS,
  COLS,
  INITIAL_SCORE,
  TIME_ON_MOVE_SECONDS,
  allNodesCount,
} from "../services/game"
import {
  Board,
  Controller,
  Header,
  MoveMarker,
  ScoreForTwoPlayers,
  TurnBanner,
  WinBanner,
} from "."

export function PlayVsPlayer() {
  const [player, setPlayer] = useState(1)
  const [isGameDone, setIsGameDone] = useState(false)
  const [matrix, setMatrix] = useState<Matrix>(getMatrix(ROWS, COLS))
  const [score, setScore] = useState<GameScore>(INITIAL_SCORE)
  const timer = useCountDown(TIME_ON_MOVE_SECONDS)
  const [prevMove, setPrevMove] = useState(NOT_DONE_MOVE)
  const [winner, setWinner] = useState(0)

  if (!isGameDone && timer.timeLeft < 0) {
    timer.stop()
    const nextPlayer = getNextPlayer(player)
    setPlayer(nextPlayer)
    setWinner(nextPlayer)
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
    const move = makeMove(matrix, col, player, prevMove)
    if (!move.done) {
      return
    }
    setPrevMove(move)

    const winPath = getWinPath(matrix, move.row, move.col, player)
    if (winPath.length) {
      drawWinCombination(matrix, move.row, move.col, winPath)

      setWinner(player)
      setIsGameDone(true)
      timer.stop()
      updateWinnersScore(player)
      return
    }
    if (move.count >= allNodesCount) {
      setIsGameDone(true)
      timer.stop()
      return
    }
    timer.restart()
    setPlayer(getNextPlayer)
  }

  function handleRestart() {
    setIsGameDone(false)
    setMatrix(getMatrix())
    setPlayer(getNextPlayer)
    setPrevMove(NOT_DONE_MOVE)
    timer.restart()
  }

  const footerColor = isGameDone ? `bg-main-color-${player}` : "bg-[#5c2dd5]"

  return (
    <div className="flex w-full h-full flex-col min-h-screen">
      <Header
        handleRestart={handleRestart}
        onMenuOpen={timer.stop}
        onMenuClose={timer.resume}
      />
      <ScoreForTwoPlayers score={score} />
      <div className="w-full mt-12 mx-auto flex justify-center items-start">
        <div className="relative flex justify-center items-start">
          <BoardBlackImg className="absolute top-2" />
          <BoardWhiteImg className="z-10" />
          <MoveMarker move={prevMove} cols={COLS} />
          {!isGameDone && <Controller matrix={matrix} onClick={handleMove} />}
          <Board matrix={matrix} />
          {!isGameDone && (
            <TurnBanner player={player} timeLeft={timer.timeLeft} />
          )}
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
