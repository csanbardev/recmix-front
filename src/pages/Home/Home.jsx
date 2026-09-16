import { Box, Container, Heading, Link as ChakraLink, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export function Home() {
  return (
    <Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
      <Container maxW="lg" px={{ base: 5, md: 8 }}>
        <VStack align="stretch" gap={2} mb={8}>
          <Heading size="2xl" color="gray.100">¿Qué quieres preparar?</Heading>
          <Text color="gray.400" fontSize="lg">
            Organiza tus recetas y crea listas para cocinar sin complicaciones.
          </Text>
        </VStack>

        <VStack as="ul" align="stretch" gap={3} listStyleType="none" p={0}>
          <Box as="li">
            <ChakraLink
              asChild
              display="block"
              px={6}
              py={5}
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="lg"
              bg="gray.900"
              color="gray.100"
              fontSize="lg"
              fontWeight="semibold"
              boxShadow="sm"
              _hover={{ borderColor: "teal.400", color: "teal.200", bg: "gray.800", textDecoration: "none", transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              <RouterLink to="/recipe-list">Lista de recetas</RouterLink>
            </ChakraLink>
          </Box>
          <Box as="li">
            <ChakraLink
              asChild
              display="block"
              px={6}
              py={5}
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="lg"
              bg="gray.900"
              color="gray.100"
              fontSize="lg"
              fontWeight="semibold"
              boxShadow="sm"
              _hover={{ borderColor: "teal.400", color: "teal.200", bg: "gray.800", textDecoration: "none", transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              <RouterLink to="/recipe-list/add">Crear lista de recetas</RouterLink>
            </ChakraLink>
          </Box>
          <Box as="li">
            <ChakraLink
              asChild
              display="block"
              px={6}
              py={5}
              borderWidth="1px"
              borderColor="gray.700"
              borderRadius="lg"
              bg="gray.900"
              color="gray.100"
              fontSize="lg"
              fontWeight="semibold"
              boxShadow="sm"
              _hover={{ borderColor: "teal.400", color: "teal.200", bg: "gray.800", textDecoration: "none", transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              <RouterLink to="/recipe/add">Añadir receta</RouterLink>
            </ChakraLink>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}