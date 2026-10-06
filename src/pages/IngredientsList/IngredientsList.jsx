import { useEffect, useState } from "react"
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { API_URL } from "../../config/api"
import { useAlert } from "../../components/common/AlertContext/AlertContext.js"

const euroFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})

export function IngredientsList() {
  const { reclFec } = useParams() // fecha de la lista de recetas
  const [data, setData] = useState(null)
  const { showAlert } = useAlert()
  const total = (data ?? []).reduce((sum, ingredient) => sum + (Number(ingredient.ing_value) || 0), 0)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/ingredients-list/${reclFec}`)
        
        if (!res.ok) {
          throw new Error("Error al obtener ingredientes de la lista" + res.message);
        }

        const jsonData = await res.json();

        setData(jsonData);
      } catch (error) {
        showAlert({ title: "No se pudieron cargar los ingredientes", description: error.message, status: "error" })
      }
    }
    fetchData()
  }, [reclFec, showAlert])

  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Heading size="xl" color="gray.100" mb={8}>Ingredientes de la lista</Heading>

        <Text color="gray.100" fontSize="lg" fontWeight="semibold" mb={4}>
          Total de la compra: {euroFormatter.format(total)}
        </Text>

        <SimpleGrid
          as="ul"
          columns={{ base: 1, md: 2 }}
          gap={4}
          listStyleType="none"
          m={0}
          p={0}
        >
          {data?.map((ingredient) => (
            <Box
              as="li"
              key={ingredient.ire_ing_id}
              p={5}
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="lg"
              bg="gray.900"
              boxShadow="sm"
            >
              <Text color="gray.100" fontSize="lg" fontWeight="semibold">
                {ingredient.ing_name}
              </Text>
              <Text color="gray.400" mt={1}>
                {ingredient.ire_quantity} {ingredient.ing_unit}
              </Text>
              <Text color="gray.300" mt={1}>
                {euroFormatter.format(Number(ingredient.ing_value) || 0)}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}