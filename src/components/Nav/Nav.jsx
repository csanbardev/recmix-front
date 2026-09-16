import { Box, Container, Flex, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Inicio", path: "/", end: true },
  { label: "Lista", path: "/recipe-list" },
  { label: "Añadir receta", path: "/recipe/add" },
];

export function Nav() {
  const location = useLocation();

  return (
    <Box as="nav" bg="gray.900" boxShadow="sm" aria-label="Navegación principal">
      <Container maxW="6xl" px={{ base: 4, md: 8 }}>
        <Flex minH="72px" align="center" justify="space-between" gap={6}>
          <ChakraLink
            asChild
            color="white"
            fontSize="xl"
            fontWeight="bold"
            letterSpacing="tight"
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            <RouterLink to="/">RecMix</RouterLink>
          </ChakraLink>

          <HStack as="ul" listStyleType="none" gap={{ base: 1, md: 2 }}>
            {navigationItems.map(({ label, path, end }) => {
              const isActive = end
                ? location.pathname === path
                : location.pathname.startsWith(path);

              return (
                <Box as="li" key={path}>
                  <ChakraLink
                    asChild
                    display="block"
                    px={{ base: 3, md: 4 }}
                    py={2}
                    borderRadius="md"
                    color={isActive ? "white" : "gray.300"}
                    bg={isActive ? "teal.600" : "transparent"}
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight={isActive ? "semibold" : "medium"}
                    whiteSpace="nowrap"
                    _hover={{ color: "white", bg: "gray.700", textDecoration: "none" }}
                    _focusVisible={{ outline: "2px solid", outlineColor: "teal.300" }}
                  >
                    <RouterLink to={path}>{label}</RouterLink>
                  </ChakraLink>
                </Box>
              );
            })}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}