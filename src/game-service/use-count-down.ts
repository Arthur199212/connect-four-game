import { useEffect, useRef, useState } from "react"

const ONE_SECOND = 1000
const DEFAULT_TIME_SEC = 35

export function useCountDown(seconds = DEFAULT_TIME_SEC): {
  timeLeft: number
  restart: () => void
  stop: () => void
} {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const timerRef = useRef<number | undefined>()

  const restart = () => {
    stop()
    setTimeLeft(seconds)
    timerRef.current = setTimeout(tickerFunc, ONE_SECOND)
  }

  const stop = () => {
    clearInterval(timerRef.current)
    timerRef.current = undefined
  }

  const tickerFunc = () => {
    setTimeLeft((time) => {
      const newTime = time - 1
      if (newTime >= 0) {
        stop()
        timerRef.current = setTimeout(tickerFunc, ONE_SECOND)
      }
      return time - 1
    })
  }

  useEffect(() => {
    if (timeLeft <= 0) return
    timerRef.current = setTimeout(tickerFunc, ONE_SECOND)

    return () => clearInterval(timerRef.current)
  }, [])

  return { timeLeft, restart, stop }
}
