import { BrowserRouter, Route, Routes } from "react-router-dom"
import LogoImg from "./assets/logo.svg"
import YouImg from "./assets/you.svg"
import CpuImg from "./assets/cpu.svg"
import BoardWhiteImg from "./assets/board-layer-white-small.svg"
import BoardBlackImg from "./assets/board-layer-black-small.svg"
import MarkerRedImg from "./assets/marker-red.svg"
import CounterRedImg from "./assets/counter-red-small.svg"
import CounterYellowImg from "./assets/counter-yellow-small.svg"
import { Home, Rules } from "./components"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="rules" element={<Rules />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Game() {
  return (
    <div>
      <div className="flex w-full max-w-sm justify-around items-center my-0 mx-auto py-5">
        <div className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none">
          Menu
        </div>
        <LogoImg />
        <div className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none">
          Restart
        </div>
      </div>
      <div className="flex w-full max-w-sm justify-center items-center mt-3 mx-auto">
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold mr-12">
          <YouImg className="absolute translate-x-[-100%]" />
          You
          <div className="font-bold text-3xl">1</div>
        </div>
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-thick border-[3px] border-black uppercase flex justify-center items-center flex-col font-bold">
          <CpuImg className="absolute translate-x-[100%]" />
          CPU
          <div className="font-bold text-3xl">0</div>
        </div>
      </div>
      <div className="relative w-full mt-10 mx-auto flex justify-center items-start">
        {/* <CounterRedImg className="absolute z-10" /> */}
        {/* <CounterYellowImg className="absolute z-10" /> */}
        <BoardBlackImg className="absolute top-2" />
        <BoardWhiteImg className="z-10" />
        <MarkerRedImg className="absolute z-10" />
      </div>
    </div>
  )
}

function NotFound() {
  return <div>404 Not Found</div>
}
