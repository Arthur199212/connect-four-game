import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Game, Rules, NotFound } from "./components"

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
