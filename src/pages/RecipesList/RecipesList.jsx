import { useEffect, useState } from "react";

export function RecipesList() {
  const [data, setData] = useState(null)



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3006/recipes-list`)

        if (!res.ok) {
          throw new Error("Error al obtener recetas de la lista" + res.message);
        }

        const jsonData = await res.json();

        console.log(jsonData)
        setData(jsonData);
      } catch (error) {
        window.alert(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <ul>
        {
          data?.recipesList?.map((recipe) => {
            return <li key={recipe.rec_id}>{recipe.rec_name}</li>
          })
        }
      </ul>
    </section>
  )
}