import { Link } from "react-router-dom"
import LogoImg from "../assets/logo.svg"

export function Header({ handleRestart }: { handleRestart: () => void }) {
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
