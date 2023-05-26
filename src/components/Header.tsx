import { useRef } from "react"
import LogoImg from "../assets/logo.svg"
import { useNavigate } from "react-router"

type HeaderProps = {
  handleRestart: () => void
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

export function Header({
  handleRestart,
  onMenuOpen,
  onMenuClose,
}: HeaderProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()

  function handleClick() {
    if (!modalRef.current) return
    if (!modalRef.current.open) {
      modalRef.current.showModal()
      onMenuOpen && onMenuOpen()
      return
    }
    modalRef.current.close()
    onMenuClose && onMenuClose()
  }

  return (
    <div>
      <div className="flex w-full max-w-sm justify-around items-center my-0 mx-auto py-5">
        <div
          className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none"
          onClick={handleClick}
        >
          Menu
        </div>
        <LogoImg />
        <div
          className="flex justify-center items-center w-28 px-4 h-10 rounded-3xl bg-[#5c2dd5] hover:bg-main-color-1 transition-colors ease-linear cursor-pointer text-white uppercase font-bold select-none"
          onClick={handleRestart}
        >
          Restart
        </div>
      </div>
      <dialog
        ref={modalRef}
        className="px-8 py-12 rounded-[2rem] max-w-[22.5rem] shadow-thick border-[3px] border-black bg-[#7945ff] backdrop:bg-black/50"
      >
        <div className="text-6xl font-bold text-white text-center">PAUSE</div>
        <button
          className="mt-9 p-4 w-full bg-white cursor-pointer uppercase font-bold text-2xl rounded-xl shadow-thick border-[3px] border-black hover:border-violet-800 transition-all ease-linear hover:shadow-thick-2 select-none"
          onClick={() => {
            modalRef.current?.close()
          }}
        >
          Continue game
        </button>
        <button
          className="mt-6 p-4 w-full bg-white cursor-pointer uppercase font-bold text-2xl rounded-xl shadow-thick border-[3px] border-black hover:border-violet-800 transition-all ease-linear hover:shadow-thick-2 select-none"
          onClick={() => {
            handleRestart()
            modalRef.current?.close()
          }}
        >
          Restart
        </button>
        <button
          className="mt-6 p-4 w-full bg-main-color-1 cursor-pointer uppercase font-bold text-2xl rounded-xl shadow-thick border-[3px] border-black hover:border-violet-800 transition-all ease-linear hover:shadow-thick-2 select-none"
          onClick={() => {
            navigate("/")
          }}
        >
          Quit game
        </button>
      </dialog>
    </div>
  )
}
