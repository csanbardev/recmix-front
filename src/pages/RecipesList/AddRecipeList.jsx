import './AddRecipeList.css'

import { useState } from "react";
import { DuplicateButton } from "../../components/DuplicateButton/DuplicateButton";
import { RecipesCombo } from "../../components/RecipesCombo/RecipesCombo";
import { SaveButton } from '../../components/SaveButton/SaveButton';
import { useForm } from 'react-hook-form';


export function AddRecipeList() {
  const [recipesSelect, setRecipesSelect] = useState(1)
  const [recipes, setRecipes] = useState([""]);
  const { handleSubmit } = useForm()

  const handleAddRecipe = () => {
    setRecipesSelect(prev => {
      return prev + 1;
    });
  };

  const handleChangeRecipe = (index, value) => {
    const newRecipes = [...recipes];
    newRecipes[index] = value;
    setRecipes(newRecipes);
  };

  const processRecipes = async () => {
    const recipesContainer = document.querySelector('#recipes-selected-list')
    const selects = recipesContainer.querySelectorAll('select') // Obtener todos los selects
    console.log(selects)
    const recipes = Array.from(selects).map(select => select.value) // Convertir a array y obtener valores

    return recipes
  }


  const onSubmit = async (data) => {
    try {
      let recipesList = await processRecipes() // get recipes selected by user
      data.recipesList = recipesList

      const res = await fetch(`http://localhost:3006/recipes-list`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

      if (res.status === 200) {
        window.alert("Lista creada con éxito.")
      }

      if (res.status === 500) {
        throw new Error(res.message, res.error)
      }
    } catch (error) {

      window.alert(error.message)
    }
  }

  return (
    <section>
      <h2>Generar lista de recetas</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="">Receta:
          <div id="recipes-selected-list">
            {Array.from({ length: recipesSelect }).map((_, index) => (
              <RecipesCombo key={index} id={`recipes-select-${index}`} onChange={handleChangeRecipe} />
            ))}
          </div>
          <DuplicateButton text="Añadir otra recetas" onDuplicate={handleAddRecipe} />
          <button type='submit'>Enviar</button>
        </label>
      </form>
    </section>
  )
}