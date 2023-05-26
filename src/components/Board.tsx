import { Matrix, MatrixNode } from "../game-service/game.service"

export function Board({ matrix }: { matrix: Matrix }) {
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
