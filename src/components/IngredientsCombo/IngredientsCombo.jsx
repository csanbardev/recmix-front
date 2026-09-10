import { useEffect, useState } from "react";

export function IngredientsCombo({ id, onChange }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("http://localhost:3006/ingredients");
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        setIngredients(await response.json());
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  return (
    <select id={id} defaultValue="" onChange={(event) => onChange(event.target.value)} required>
      <option value="" disabled>Selecciona un ingrediente</option>
      {ingredients.map((ingredient) => (
        <option key={ingredient.ing_id} value={ingredient.ing_id}>
          {ingredient.ing_name}
        </option>
      ))}
    </select>
  );
}
