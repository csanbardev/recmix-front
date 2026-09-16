import { useEffect, useState } from "react";
import { NativeSelect } from "@chakra-ui/react";


export function RecipesCombo({ id, onChange }) {
  const [data, setData] = useState(null);
  // const [error, setError] = useState(null);


  useEffect(() => {
    // Define una función asincrónica para hacer la llamada a la API.
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3006/recipes`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        // setError(error.message);
        console.log(error)
      }
    }

    fetchData();
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
        <option value="" disabled>Selecciona una receta</option>
        {data?.map((item) => (
          <option key={item.rec_id} value={item.rec_id}>{item.rec_name}</option>
        ))}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  )
}