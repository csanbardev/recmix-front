import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function RecipeDetail({ name, recId }) {
  const navigate = useNavigate();

  function handleIngredientsList() {  
    navigate(`/ingredients/${encodeURIComponent(recId)}`);
  }

  return (
    <Box
      as="article"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={4}
      minH="120px"
      p={5}
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="lg"
      bg="gray.900"
      boxShadow="sm"
    >
      <Text color="gray.100" fontSize="lg" fontWeight="semibold">
        {name}
      </Text>
      <Button colorPalette="teal" variant="outline" onClick={handleIngredientsList}>
        Ver ingredientes
      </Button>
    </Box>
  );
}