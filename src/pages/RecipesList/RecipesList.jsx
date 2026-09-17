import { useEffect, useState } from "react";
import { Box, Button, Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { RecipeDetail } from "../../components/RecipeDetail/RecipeDetail";
import { API_URL } from "../../config/api";
import { Link as RouterLink } from "react-router-dom";
import { useAlert } from "../../components/common/AlertContext/AlertContext.js";

export function RecipesList() {
  const [data, setData] = useState(null)
  const { showAlert } = useAlert()



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/recipes-list`)

        if (!res.ok) {
          throw new Error("Error al obtener recetas de la lista" + res.message);
        }

        const jsonData = await res.json();

        setData(jsonData);
      } catch (error) {
        showAlert({ title: "No se pudo cargar la lista", description: error.message, status: "error" })
      }
    }
    fetchData()
  }, [showAlert])

  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Flex align="center" justify="space-between" gap={4} mb={8}>
          <Heading size="xl" color="gray.100">Lista de recetas</Heading>
          <Button
            asChild
            colorPalette="teal"
            variant="outline"
            disabled={!data?.recl_fec}
          >
            <RouterLink to={`/ingredients/list/${data?.recl_fec ?? ""}`}>
              Ver total de ingredientes
            </RouterLink>
          </Button>
        </Flex>

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