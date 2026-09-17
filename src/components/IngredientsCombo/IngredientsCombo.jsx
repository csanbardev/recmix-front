import { useEffect, useState } from "react";
import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { API_URL } from "../../config/api";

export function IngredientsCombo({ id, onChange }) {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch(`${API_URL}/ingredients`);
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        setIngredients(await response.json());
      } catch (error) {
        console.log(error);
      }
    }

    fetchIngredients();
  }, []);

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.ing_name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setSelectedIngredient(null);
    onChange("");
  }

  function handleIngredientSelect(ingredient) {
    setSelectedIngredient(ingredient);
    setSearch(ingredient.ing_name);
    onChange(String(ingredient.ing_id));
  }

  return (
    <Box position="relative">
      <Input
        id={id}
        value={search}
        onChange={handleSearchChange}
        placeholder="Busca un ingrediente"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-controls={`${id}-results`}
        aria-expanded={search.length > 0 && !selectedIngredient}
        color="gray.100"
        borderColor="gray.700"
        bg="gray.900"
        _placeholder={{ color: "gray.500" }}
        _focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
      />

      {search && !selectedIngredient && (
        <VStack
          id={`${id}-results`}
          as="ul"
          align="stretch"
          gap={0}
          position="absolute"
          zIndex={1}
          top="calc(100% + 4px)"
          left={0}
          right={0}
          maxH="220px"
          overflowY="auto"
          listStyleType="none"
          m={0}
          p={1}
          borderWidth="1px"
          borderColor="gray.700"
          borderRadius="md"
          bg="gray.900"
          boxShadow="lg"
        >
          {filteredIngredients.length > 0 ? filteredIngredients.map((ingredient) => (
            <Box
              as="li"
              key={ingredient.ing_id}
              role="option"
              aria-selected={selectedIngredient?.ing_id === ingredient.ing_id}
              px={3}
              py={2}
              color="gray.100"
              cursor="pointer"
              borderRadius="sm"
              _hover={{ bg: "gray.700", color: "teal.200" }}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleIngredientSelect(ingredient)}
            >
              {ingredient.ing_name}
            </Box>
          )) : (
            <Text px={3} py={2} color="gray.400" fontSize="sm">
              No se encontraron ingredientes
            </Text>
          )}
        </VStack>
      )}
    </Box>
  );
}
