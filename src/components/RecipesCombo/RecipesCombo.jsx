import { useEffect, useState } from "react";


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
    <>
      <select id={id} onChange={(e) => onChange(e.target.value)}>
        {data?.map((item) => (
          <option key={item.rec_id} value={item.rec_id} >{item.rec_name}</option>
        ))}
      </select>
    </>
  )
}