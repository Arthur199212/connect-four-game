import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Rules } from "./components"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="rules" element={<Rules />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function NotFound() {
  return <div>404 Not Found</div>
}
