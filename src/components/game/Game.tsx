import { useState } from "react"
import { Link } from "react-router-dom"
import LogoImg from "../../assets/logo.svg"
import YouImg from "../../assets/you.svg"
import CpuImg from "../../assets/cpu.svg"
import BoardWhiteImg from "../../assets/board-layer-white-small.svg"
import BoardBlackImg from "../../assets/board-layer-black-small.svg"
import MarkerRedImg from "../../assets/marker-red.svg"
import {
  MatrixNode,
  getMatrix,
  isWinMove,
  makeMove,
  getNextPlayer,
  Matrix,
  useCountDown,
} from "./game.service"

type GameScore = [number, number]
export function Game() {
  const [player, setPlayer] = useState(1)
  const [isGameDone, setIsGameDone] = useState(false)
  const [matrix, setMatrix] = useState(getMatrix())
  const [score, setScore] = useState<GameScore>([0, 0])
  const { timeLeft, restart, stop } = useCountDown(5)

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
      <Header handleRestart={handleRestart} />
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
        className={`${footerColor} max-w-lg mx-auto rounded-t-[3rem] w-full flex-1`}
      ></div>
    </div>
  )
}

function Header({ handleRestart }: { handleRestart: () => void }) {
  return (
    <div className="flex w-full max-w-sm justify-around items-center my-0 mx-auto py-5">
      <Link to="/">
        <div className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none">
          Menu
        </div>
      </Link>
      <LogoImg />
      <div
        className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none"
        onClick={handleRestart}
      >
        Restart
      </div>
    </div>
  )
}
function Score({ score }: { score: GameScore }) {
  return (
    <div className="flex w-full max-w-sm justify-center items-center mt-3 mx-auto">
      <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold mr-12">
        <YouImg className="absolute translate-x-[-100%]" />
        You
        <div className="font-bold text-3xl">{score[0]}</div>
      </div>
      <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold">
        <CpuImg className="absolute translate-x-[100%]" />
        CPU
        <div className="font-bold text-3xl">{score[1]}</div>
      </div>
    </div>
  )
}
function Controller({
  matrix,
  onClick,
}: {
  matrix: Matrix
  onClick: (col: number) => void
}) {
  return (
    <div className="absolute flex max-w-sm px-6 w-[50rem] h-[94%] justify-center z-10">
      {matrix?.length > 0 &&
        matrix[0].map((_, i) => (
          <ControllerColumn key={`ctrl_col_${i}`} onClick={() => onClick(i)} />
        ))}
    </div>
  )
}
function ControllerColumn({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-[47px] h-full bg-transparent rounded-2xl cursor-pointer select-none"
      onClick={onClick}
    ></div>
  )
}
function Board({ matrix }: { matrix: Matrix }) {
  return (
    <div className="flex absolute top-[6px] w-[320px] h-[275px] flex-col">
      {matrix.map((rows, i) => (
        <Row key={`column_${i}`} rows={rows} i={i} />
      ))}
    </div>
  )
}
function Row({ rows, i }: { rows: MatrixNode[]; i: number }) {
  const marginTop = (i !== 0 && "mt-[6px]") || ""
  return (
    <div
      className={`${marginTop} flex h-[41px] w-full bg-transparent select-none`}
    >
      {rows.map((node, i) => (
        <Node key={`node_${i}`} node={node} i={i} />
      ))}
    </div>
  )
}
const colors = ["bg-transparent", "bg-main-color-1", "bg-main-color-2"]
function Node({ node, i }: { node: { player: number }; i: number }) {
  const marginLeft = (i !== 0 && "ml-[7px]") || ""
  return (
    <div
      className={`${marginLeft} w-[40px] h-[41px] rounded-full ${
        colors[node.player || 0]
      }`}
    ></div>
  )
}
function WinBanner({
  player,
  handleRestart,
}: {
  player: number
  handleRestart: () => void
}) {
  return (
    <div className="absolute bottom-[-145px] w-[15rem] h-[10rem] my-0 mx-auto bg-white shadow-thick border-2 border-black rounded-3xl z-10">
      <div className="mt-4 flex w-full justify-center items-center font-bold uppercase">
        Player {player}
      </div>
      <div className="mt-1 flex w-full justify-center items-center font-bold uppercase text-5xl">
        Wins
      </div>
      <div
        className="flex mx-auto mt-2 justify-center items-center w-32 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none"
        onClick={handleRestart}
      >
        Play Again
      </div>
    </div>
  )
}
function TurnBanner({
  player = 1,
  timeLeft,
}: {
  player: number
  timeLeft: number
}) {
  const color = player === 1 ? "#fd6687" : "#ffce67"
  const textColor = player === 1 ? "text-white" : "text-black"
  return (
    <div className="absolute bottom-[-145px] z-10 w-[197px] h-[165px] flex justify-center">
      <svg
        width="197"
        height="165"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <filter
            x="-4.2%"
            y="-4.2%"
            width="108.4%"
            height="116.2%"
            filterUnits="objectBoundingBox"
            id="a"
          >
            <feMorphology
              radius="3"
              operator="dilate"
              in="SourceAlpha"
              result="shadowSpreadOuter1"
            />
            <feOffset
              dy="10"
              in="shadowSpreadOuter1"
              result="shadowOffsetOuter1"
            />
            <feComposite
              in="shadowOffsetOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              in="shadowOffsetOuter1"
            />
          </filter>
          <path
            d="M12.239 34.847 87.279 3.25a20 20 0 0 1 15.454-.029l75.96 31.65A20 20 0 0 1 191 53.333V130c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V53.28a20 20 0 0 1 12.239-18.433Z"
            id="b"
          />
        </defs>
        <g
          transform="translate(3 2)"
          fill={color}
          fillRule="evenodd"
          className="transition ease-linear duration-[70ms]"
        >
          <g
            fill="#FFF"
            fontFamily="SpaceGrotesk-Bold, Space Grotesk"
            fontWeight="bold"
          ></g>
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <path
            stroke="#000"
            strokeWidth="3"
            d="M86.697 1.868a21.5 21.5 0 0 1 16.613-.03l75.96 31.65a21.478 21.478 0 0 1 9.62 7.92 21.478 21.478 0 0 1 3.61 11.925V130a21.433 21.433 0 0 1-6.297 15.203A21.433 21.433 0 0 1 171 151.5H20a21.433 21.433 0 0 1-15.203-6.297A21.433 21.433 0 0 1-1.5 130V53.28c0-4.326 1.296-8.44 3.589-11.893a21.478 21.478 0 0 1 9.568-7.923Z"
          />
        </g>
      </svg>
      <div className="absolute w-full flex flex-col items-center">
        <div className={`mt-12 ${textColor} font-bold uppercase select-none`}>
          Player&apos;s {player} turn
        </div>
        <div
          className={`mt-2 ${textColor} flex px-5 font-bold uppercase text-5xl justify-center items-end select-none`}
        >
          {timeLeft}{" "}
          <span className="ml-1 font-bold uppercase text-3xl flex items-end select-none">
            s
          </span>
        </div>
      </div>
    </div>
  )
}
