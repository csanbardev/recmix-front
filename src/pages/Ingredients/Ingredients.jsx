import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function Ingredients() {
  const { recId } = useParams() // id de la receta
  const [data, setData] = useState(null)

  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3006/ingredients-list-by-recipe/${recId}`)
        
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
  },[recId])

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