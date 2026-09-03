import { useNavigate } from "react-router-dom";

export function RecipeDetail({ name, recId }) {
  const navigate = useNavigate();

  function handleIngredientsList() {  
    navigate(`/ingredients/${encodeURIComponent(recId)}`);
  }

  return (
    <article>
      <p>{name}</p>
      <button type="button" onClick={handleIngredientsList}>
        Ver ingredientes
      </button>
    </article>
  );
}