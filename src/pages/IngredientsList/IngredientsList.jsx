import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function IngredientsList() {
  const { reclFec } = useParams() // fecha de la lista de recetas
  const [data, setData] = useState(null)

  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3006/ingredients-list/${reclFec}`)
        
        if (!res.ok) {
          throw new Error("Error al obtener ingredientes de la lista" + res.message);
        }

        const jsonData = await res.json();

        console.log(jsonData)
        setData(jsonData);
      } catch (error) {
        window.alert(error.message)
      }
    }
    fetchData()
  },[reclFec])

  return (
    <section>
      <ul>

        {
          data?.map((ingredient) => (
            <li key={ingredient.ire_ing_id}>{ingredient.ing_name} - Cantidad: {ingredient.ire_quantity}.</li>
          ))
        }
      </ul>
    </section>
  )
}