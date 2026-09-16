import { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { RecipeDetail } from "../../components/RecipeDetail/RecipeDetail";

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

        setData(jsonData);
      } catch (error) {
        window.alert(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Heading size="xl" color="gray.100" mb={8}>Lista de recetas</Heading>

        <SimpleGrid
          as="ul"
          columns={{ base: 1, md: 2 }}
          gap={4}
          listStyleType="none"
          m={0}
          p={0}
        >
          {data?.recipesList?.map((recipe) => (
            <Box as="li" key={recipe.rec_id}>
              <RecipeDetail name={recipe.rec_name} recId={recipe.rec_id} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}