import { HashRouter, Route, Routes } from "react-router-dom"
import { Home, PlayVsAI, Rules, NotFound, PlayVsPlayer } from "./components"

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="rules" element={<Rules />} />
          <Route path="play-vs-ai" element={<PlayVsAI />} />
          <Route path="play-vs-player" element={<PlayVsPlayer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
