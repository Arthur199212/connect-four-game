import { Matrix } from "../services/game"

export function Controller({
  disabled,
  matrix,
  onClick,
}: {
  disabled: boolean
  matrix: Matrix
  onClick: (col: number) => void
}) {
  return (
    <div className="absolute flex max-w-sm px-6 w-[50rem] h-[94%] justify-center z-10">
      {matrix?.length > 0 &&
        matrix[0].map((_, i) => (
          <div
            key={`ctrl_col_${i}`}
            className="w-[47px] h-full bg-transparent rounded-2xl cursor-pointer select-none"
            onClick={() => {
              if (disabled) return
              onClick(i)
            }}
          ></div>
        ))}
    </div>
  )
}
