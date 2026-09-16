import { Box, Button, Container, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DuplicateButton } from "../../components/DuplicateButton/DuplicateButton";
import { IngredientsCombo } from "../../components/IngredientsCombo/IngredientsCombo";
import { useForm } from 'react-hook-form';
import { API_URL } from "../../config/api";


export function AddRecipe() {
  const [ingredients, setIngredients] = useState([{ id: "", quantity: "" }])
  const { register, handleSubmit, reset } = useForm()

  const handleAddIngredient = () => {
    setIngredients(prev => [...prev, { id: "", quantity: "" }]);
  }

  const handleIngredientChange = (index, value) => {
    setIngredients(prev => prev.map((ingredient, ingredientIndex) => (
      ingredientIndex === index ? { ...ingredient, id: value } : ingredient
    )));
  }

  const handleQuantityChange = (index, value) => {
    setIngredients(prev => prev.map((ingredient, ingredientIndex) => (
      ingredientIndex === index ? { ...ingredient, quantity: value } : ingredient
    )));
  }

  const onSubmit = async ({ rec_name }) => {
    try {
      const data = {
        rec_name,
        ingredients: ingredients.map(({ id, quantity }) => ({
          ire_ing_id: Number(id),
          ire_quantity: Number(quantity)
        }))
      }

      const res = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error(`Error al crear la receta. Estado: ${res.status}`)
      }

      window.alert("Receta creada")
      reset()
      setIngredients([{ id: "", quantity: "" }])
    } catch (error) {
      window.alert(error.message)
    }
  }

  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="3xl" px={{ base: 5, md: 8 }}>
        <VStack align="stretch" gap={8}>
          <Heading size="xl" color="gray.100">Añadir receta</Heading>

          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <VStack align="stretch" gap={6}>
              <Box>
                <Text as="label" display="block" htmlFor="rec-name" mb={2} color="gray.300" fontWeight="medium">
                  Nombre de la receta
                </Text>
                <Input
                  id="rec-name"
                  type="text"
                  color="gray.100"
                  borderColor="gray.700"
                  _placeholder={{ color: "gray.500" }}
                  _focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
                  {...register('rec_name', { required: true })}
                />
              </Box>

              <Box as="section" id="ingredients-selected-list">
                <Text as="h2" color="gray.100" fontSize="lg" fontWeight="semibold" mb={3}>
                  Ingredientes
                </Text>
                <VStack align="stretch" gap={3}>
          {ingredients.map((ingredient, index) => (
            <Box key={index} display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 160px" }} gap={3}>
              <IngredientsCombo
                id={`ingredient-select-${index}`}
                onChange={(value) => handleIngredientChange(index, value)}
              />
              <Input
                type="number"
                min="0"
                value={ingredient.quantity}
                onChange={(event) => handleQuantityChange(index, event.target.value)}
                placeholder="Cantidad"
                required
                color="gray.100"
                borderColor="gray.700"
                _placeholder={{ color: "gray.500" }}
                _focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
              />
            </Box>
          ))}
          <DuplicateButton text="Añadir ingrediente" onDuplicate={handleAddIngredient} />
                </VStack>
              </Box>

              <Button type="submit" colorPalette="teal" alignSelf="flex-start" px={8}>
                Guardar receta
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}