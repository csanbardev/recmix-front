import { Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Ingredients } from './pages/Ingredients/Ingredients'
import { IngredientsList } from './pages/IngredientsList/IngredientsList'
import { RecipesList } from './pages/RecipesList/RecipesList'
import {AddRecipeList} from './pages/RecipesList/AddRecipeList'
import { AddRecipe } from './pages/Recipe/AddRecipe'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:recId" element={<Ingredients />} />
        <Route path="/ingredients/list/:reclFec" element={<IngredientsList />} />
        <Route path="/recipe-list" element={<RecipesList />} />
        <Route path="/recipe-list/add" element={<AddRecipeList />} />
        <Route path="/recipe/add" element={<AddRecipe />} />
      </Routes>

    </>
  )
}

export default App
