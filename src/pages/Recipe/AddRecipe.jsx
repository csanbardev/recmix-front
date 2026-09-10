import '../RecipesList/AddRecipeList.css'

import { useState } from "react";
import { DuplicateButton } from "../../components/DuplicateButton/DuplicateButton";
import { IngredientsCombo } from "../../components/IngredientsCombo/IngredientsCombo";
import { useForm } from 'react-hook-form';


export function AddRecipe() {
  const [ingredients, setIngredients] = useState([{ id: "", quantity: "" }])
  const { register, handleSubmit } = useForm()

  const handleAddIngredient = () => {
    setIngredients(prev => [...prev, { id: "", quantity: "" }]);
  }

  const handleIngredientChange = (index, value) => {
    setIngredients(prev => prev.map((ingredient, ingredientIndex) => (
      ingredientIndex === index ? { ...ingredient, id: value } : ingredient
    )));
  }

  const handleQuantityChange = (index, value) => {
    setIngredients(prev => prev.map((ingredient, ingredientIndex) => (
      ingredientIndex === index ? { ...ingredient, quantity: value } : ingredient
    )));
  }

  const onSubmit = async ({ rec_name }) => {
    try {
      const data = {
        rec_name,
        ingredients: ingredients.map(({ id, quantity }) => ({
          ire_ing_id: Number(id),
          ire_quantity: Number(quantity)
        }))
      }

      const res = await fetch(`http://localhost:3006/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error(`Error al crear la receta. Estado: ${res.status}`)
      }

      window.alert("Receta creada con éxito.")
    } catch (error) {
      window.alert(error.message)
    }
  }

  return (
    <section>
      <h2>Añadir receta</h2>
      <form onSubmit={handleSubmit(onSubmit)} >
        <label htmlFor="rec-name">Nombre de la receta:</label>
        <input id="rec-name" type="text" {...register('rec_name', { required: true })} />

        <section id="ingredients-selected-list">
          <h3>Ingredientes</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <IngredientsCombo
                id={`ingredient-select-${index}`}
                onChange={(value) => handleIngredientChange(index, value)}
              />
              <input
                type="number"
                min="0"
                value={ingredient.quantity}
                onChange={(event) => handleQuantityChange(index, event.target.value)}
                placeholder="Cantidad"
                required
              />
            </div>
          ))}
          <DuplicateButton text="Añadir ingrediente" onDuplicate={handleAddIngredient} />
        </section>

        <button type="submit">Guardar receta</button>
      </form>
    </section>
  )
}