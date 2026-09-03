import { Link } from "react-router-dom";
import { AddRecipeList } from "../RecipesList/AddRecipeList";
import { RecipesList } from "../RecipesList/RecipesList";


export function Home() {
  return (
    <section>
      <article>
        <Link to="/recipe-list">Lista de recetas</Link>
        <Link to="/recipe-list/add">Crear lista de recetas</Link>
      </article>
    </section>
  )
}