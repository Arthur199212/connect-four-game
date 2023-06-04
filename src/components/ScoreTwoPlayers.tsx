import PlayerOneImg from "../assets/player-one.svg"
import PlayerTwoImg from "../assets/player-two.svg"
import { GameScore } from "../services/game"

export function ScoreForTwoPlayers({ score }: { score: GameScore }) {
  return (
    <div className="flex w-full max-w-sm justify-center items-center mt-3 mx-auto">
      <div className="relative w-32 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold mr-12">
        <PlayerOneImg className="absolute translate-x-[-125%]" />
        Player 1
        <div className="font-bold text-3xl">{score[0]}</div>
      </div>
      <div className="relative w-32 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold">
        <PlayerTwoImg className="absolute translate-x-[125%]" />
        Player 2
        <div className="font-bold text-3xl">{score[1]}</div>
      </div>
    </div>
  )
}
