import { Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { IngredientsList } from './pages/IngredientsList/IngredientsList'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/list/:reclFec" element={<IngredientsList />} />
      </Routes>

    </>
  )
}

export default App
