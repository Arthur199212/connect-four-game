import { useState } from "react"
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
} from "./game.service"

export function Game() {
  const [player, setPlayer] = useState(1)
  const [isGameDone, setIsGameDone] = useState(false)
  const [matrix, setMatrix] = useState(getMatrix())
  const [counts, setCounts] = useState([0, 0])

  const handleMove = (col: number) => {
    const move = makeMove(matrix, col, player)
    if (!move.done) {
      return
    }
    if (isWinMove(matrix, move.row, move.col, player)) {
      setIsGameDone(true)

      const newCounts = counts.slice()
      if (newCounts[player - 1] !== undefined) newCounts[player - 1]++
      setCounts(newCounts)
      return
    }
    setPlayer(getNextPlayer)
  }

  const handleRestart = () => {
    setIsGameDone(false)
    setMatrix(getMatrix())
    setPlayer(getNextPlayer)
  }

  return (
    <div>
      <div className="flex w-full max-w-sm justify-around items-center my-0 mx-auto py-5">
        <div className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none">
          Menu
        </div>
        <LogoImg />
        <div className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none">
          Restarl
        </div>
      </div>
      <div className="flex w-full max-w-sm justify-center items-center mt-3 mx-auto">
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold mr-12">
          <YouImg className="absolute translate-x-[-100%]" />
          You
          <div className="font-bold text-3xl">{counts[0]}</div>
        </div>
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold">
          <CpuImg className="absolute translate-x-[100%]" />
          CPU
          <div className="font-bold text-3xl">{counts[1]}</div>
        </div>
      </div>
      <div className="relative w-full mt-10 mx-auto flex justify-center items-start">
        <BoardBlackImg className="absolute top-2" />
        <BoardWhiteImg className="z-10" />
        <MarkerRedImg className="absolute z-10 top-[-33px]" />
        {!isGameDone && <Controller matrix={matrix} onClick={handleMove} />}
        <Board matrix={matrix} />
      </div>
      {isGameDone && (
        <WinBanner player={player} handleRestart={handleRestart} />
      )}
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
    <div className="w-[15rem] h-[10rem] my-0 mx-auto bg-white shadow-thick border-2 border-black rounded-3xl z-10 relative top-[-10px]">
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
