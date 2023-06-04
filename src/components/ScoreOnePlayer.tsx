import YouImg from "../assets/you.svg"
import CpuImg from "../assets/cpu.svg"
import { GameScore } from "../services/game"

export function ScoreOnePlayer({ score }: { score: GameScore }) {
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
