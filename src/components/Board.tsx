import { Matrix, MatrixNode } from "../services/game"

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

function Node({ node, i }: { node: MatrixNode; i: number }) {
  const color = colors[node.player || 0]
  const marginLeft = (i !== 0 && "ml-[7px]") || ""
  return (
    <div
      className={`${marginLeft} w-[40px] h-[41px] rounded-full ${color} flex justify-center items-center`}
      style={{
        boxShadow: "inset 0px 11px 0px -3px rgba(0,0,0,0.44)",
      }}
    >
      {node.win && <DonutShapeSvg />}
    </div>
  )
}

function DonutShapeSvg() {
  return (
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path
        id="p"
        fill="white"
        d="M100 100m-54,0a54,54,0 1,0 108,0a 54,54 0 1,0 -108,0zM100 100m-29,0a29,29,0 0,1 58,0a 29,29 0 0,1 -58,0z"
      />
    </svg>
  )
}
