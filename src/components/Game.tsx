import { useState } from "react"
import BoardWhiteImg from "../assets/board-layer-white-small.svg"
import BoardBlackImg from "../assets/board-layer-black-small.svg"
import MarkerRedImg from "../assets/marker-red.svg"
import { Board, Controller, Header, Score, TurnBanner, WinBanner } from "."
import {
  getMatrix,
  isWinMove,
  makeMove,
  getNextPlayer,
  useCountDown,
  GameScore,
} from "../game-service"

const INITIAL_SCORE: GameScore = [0, 0]
const TIME_ON_MOVE_SECONDS = 35

export function Game() {
  const [player, setPlayer] = useState(1)
  const [isGameDone, setIsGameDone] = useState(false)
  const [matrix, setMatrix] = useState(getMatrix())
  const [score, setScore] = useState<GameScore>(INITIAL_SCORE)
  const { timeLeft, restart, resume, stop } = useCountDown(TIME_ON_MOVE_SECONDS)

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
    if (isWinMove(matrix, move.row, move.col, player)) {
      setIsGameDone(true)
      stop()

      updateWinnersScore(player)
      return
    }
    restart()
    setPlayer(getNextPlayer)
  }

  function handleRestart() {
    setIsGameDone(false)
    setMatrix(getMatrix())
    setPlayer(getNextPlayer)
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
      <div className="relative w-full mt-10 mx-auto flex justify-center items-start">
        <BoardBlackImg className="absolute top-2" />
        <BoardWhiteImg className="z-10" />
        <MarkerRedImg className="absolute z-10 top-[-33px]" />
        {!isGameDone && <Controller matrix={matrix} onClick={handleMove} />}
        <Board matrix={matrix} />
        {!isGameDone && <TurnBanner player={player} timeLeft={timeLeft} />}
        {isGameDone && (
          <WinBanner player={player} handleRestart={handleRestart} />
        )}
      </div>
      <div
        className={`${footerColor} min-h-[11rem] max-w-lg mx-auto rounded-t-[3rem] w-full flex-1`}
      ></div>
    </div>
  )
}
