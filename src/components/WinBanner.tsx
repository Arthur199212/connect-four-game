export function WinBanner({
  player,
  handleRestart,
}: {
  player: number
  handleRestart: () => void
}) {
  const isStalemate = player === 0
  return (
    <div className="absolute bottom-[-145px] w-[15rem] h-[10rem] my-0 mx-auto bg-white shadow-thick border-2 border-black rounded-3xl z-10">
      {isStalemate && (
        <div className="mt-8 mb-5 flex w-full justify-center items-center font-bold uppercase text-3xl">
          Stalemate
        </div>
      )}
      {!isStalemate && (
        <>
          <div className="mt-4 flex w-full justify-center items-center font-bold uppercase">
            Player {player}
          </div>
          <div className="mt-1 flex w-full justify-center items-center font-bold uppercase text-5xl">
            Wins
          </div>
        </>
      )}
      <div
        className="flex mx-auto mt-2 justify-center items-center w-32 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none"
        onClick={handleRestart}
      >
        Play Again
      </div>
    </div>
  )
}
