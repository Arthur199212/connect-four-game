import { TiTick } from "react-icons/ti"
import { Link } from "react-router-dom"

export function Rules() {
  return (
    <div className="h-full w-full flex justify-center items-center min-h-screen">
      <div className="w-[32rem] h-auto mx-2 mt-2 mb-12 py-12 px-5 bg-white border-2 border-black shadow-thick rounded-2xl relative">
        <h1 className="uppercase text-4xl text-center font-bold">Rules</h1>
        <h2 className="uppercase mt-9 text-xl font-bold text-primary-bg-color">
          Objective
        </h2>
        <p className="mt-4">
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
        <h2 className="uppercase mt-9 text-xl font-bold text-primary-bg-color">
          How to Play
        </h2>
        <p className="mt-4">1. Red goes first in the first game.</p>
        <p className="mt-4">
          2. Players must alternate turns, and only one disc can be dropped in
          each turn.
        </p>
        <p className="mt-4">
          3. The game ends when there is a 4-in-a-row or a stalemate.
        </p>
        <p className="my-4">
          4. The starter of the previous game goes second on the next game.
        </p>
        <Link to={"/"}>
          <div className="w-16 h-16 flex justify-center items-center rounded-full border-thick bg-main-color-1 absolute top-full right-1/2 translate-y-[-50%] translate-x-[50%] shadow-thick border-2 border-black btn-border">
            <TiTick className="w-8 h-8 text-white" />
          </div>
        </Link>
      </div>
    </div>
  )
}
