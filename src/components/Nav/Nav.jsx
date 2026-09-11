import { Link } from "react-router-dom";


export function Nav() {
  return (
    <nav>
      <ul>
        <Link to="/"><li>Inicio</li></Link>
        <Link to="/recipe-list"><li>Lista</li></Link>
        <Link to="/recipe/add"><li>Añadir receta</li></Link>
      </ul>
    </nav>
  )
}