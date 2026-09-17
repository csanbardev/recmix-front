import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DuplicateButton } from "../../components/DuplicateButton/DuplicateButton";
import { RecipesCombo } from "../../components/RecipesCombo/RecipesCombo";
import { useForm } from 'react-hook-form';
import { API_URL } from "../../config/api";
import { useAlert } from "../../components/common/AlertContext/AlertContext.js";


export function AddRecipeList() {
  const [recipesSelect, setRecipesSelect] = useState(1)
  const [recipes, setRecipes] = useState([""]);
  const { handleSubmit } = useForm()
  const { showAlert } = useAlert()

  const handleAddRecipe = () => {
    setRecipesSelect(prev => {
      return prev + 1;
    });
    setRecipes(prev => [...prev, ""]);
  };

  const handleChangeRecipe = (index, value) => {
    const newRecipes = [...recipes];
    newRecipes[index] = value;
    setRecipes(newRecipes);
  };

  const onSubmit = async (data) => {
    try {
      data.recipesList = recipes

      const res = await fetch(`${API_URL}/recipes-list`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

      if (res.status === 200) {
        showAlert({ title: "Lista creada", description: "La lista se ha creado con éxito.", status: "success" })
      }

      if (res.status === 500) {
        throw new Error(res.message, res.error)
      }
    } catch (error) {

      showAlert({ title: "No se pudo crear la lista", description: error.message, status: "error" })
    }
  }

  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="3xl" px={{ base: 5, md: 8 }}>
        <VStack align="stretch" gap={8}>
          <Heading size="xl" color="gray.100">Generar lista de recetas</Heading>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch" gap={6}>
              <Box as="section" id="recipes-selected-list">
                <Text as="h2" color="gray.100" fontSize="lg" fontWeight="semibold" mb={3}>
                  Recetas
                </Text>
                <VStack align="stretch" gap={3}>
                  {Array.from({ length: recipesSelect }).map((_, index) => (
                    <RecipesCombo
                      key={index}
                      id={`recipes-select-${index}`}
                      onChange={(value) => handleChangeRecipe(index, value)}
                    />
                  ))}
                </VStack>
              </Box>

              <DuplicateButton text="Añadir otra receta" onDuplicate={handleAddRecipe} />
              <Button type="submit" colorPalette="teal" alignSelf="flex-start" px={8}>
                Enviar
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}