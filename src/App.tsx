import { Route, Routes } from "react-router-dom"
import StocksPage from "./pages/StocksPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/stocks" element={<StocksPage />}  />
      </Routes>
    </>
  )
}

export default App
