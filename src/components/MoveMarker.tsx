import { useRef } from "react"
import { Move } from "../game-service"

const MARKER_WIDTH = 38
const MARKER_HEIGHT = 35.773

export function MoveMarker({ cols, move }: { cols: number; move: Move }) {
  const markerRef = useRef<SVGSVGElement>(null)

  const display = !move.done ? "none" : "block"
  const color = move.player === 1 ? "#fd6687" : "#ffce67"
  const xPos = getMarkerXPosition(cols, move, MARKER_WIDTH, markerRef.current)

  return (
    <svg
      style={{
        position: "absolute",
        zIndex: "10",
        top: "-33px",
        left: xPos ? xPos + "px" : "0px",
        display,
      }}
      ref={markerRef}
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="36"
      fill="none"
      viewBox="0 0 38 36"
    >
      <g filter="url(#a)">
        <path
          fill={color}
          fillRule="evenodd"
          d="M3 14.616a5 5 0 0 0 2.01 4.007l10.932 8.157a5 5 0 0 0 5.96.015l11.068-8.173A5 5 0 0 0 35 14.6V8a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v6.616Z"
          clipRule="evenodd"
        />
        <path
          stroke="#000"
          strokeWidth="3"
          d="M4.113 19.826a6.5 6.5 0 0 1-2.613-5.21V8A6.5 6.5 0 0 1 8 1.5h22A6.5 6.5 0 0 1 36.5 8v6.6a6.5 6.5 0 0 1-2.639 5.23l-11.068 8.172a6.5 6.5 0 0 1-7.748-.02L4.113 19.827Z"
        />
      </g>
      <defs>
        <filter
          id="a"
          width={MARKER_WIDTH}
          height={MARKER_HEIGHT}
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="5" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5_4619"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_5_4619"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

function getMarkerXPosition(
  cols: number,
  move: Move,
  makerWidthPx: number,
  boardEl: SVGSVGElement | null
): number | undefined {
  if (!boardEl) return undefined
  const parentEl = boardEl.parentNode as HTMLDivElement
  if (!parentEl || parentEl.offsetWidth === undefined) return undefined

  const colWidth = parentEl.offsetWidth / cols
  const colPosition = colWidth * (move.col + 1)
  const center = Math.round(colPosition - colWidth / 2 - makerWidthPx / 2)
  return center
}
