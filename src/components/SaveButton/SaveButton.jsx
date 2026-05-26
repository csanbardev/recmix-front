import { useState } from "react";

export function SaveButton({ data, url }) {
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error en la petición");

      console.log("Guardado OK");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={onSave} disabled={loading}>
      {loading ? "Guardando..." : "Guardar"}
    </button>
  );
}