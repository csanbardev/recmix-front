import { useEffect, useState } from "react";
import { NativeSelect } from "@chakra-ui/react";

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
    <NativeSelect.Root>
      <NativeSelect.Field
        id={id}
        defaultValue=""
        onChange={(event) => onChange(event.target.value)}
        required
        color="gray.100"
        borderColor="gray.700"
        bg="gray.900"
        _focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
      >
        <option value="" disabled>Selecciona un ingrediente</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.ing_id} value={ingredient.ing_id}>
            {ingredient.ing_name}
          </option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}
