import { Route, Routes } from "react-router-dom"
import ChartPage from "./pages/ChartPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/stocks" element={<ChartPage />}  />
      </Routes>
    </>
  )
}

export default App
