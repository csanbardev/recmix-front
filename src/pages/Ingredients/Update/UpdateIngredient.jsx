import { useEffect, useState } from "react"
import { Box, Button, Container, Heading, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { API_URL } from "../../../config/api"
import { useAlert } from "../../../components/common/AlertContext/AlertContext.js"

export function UpdateIngredient() {
	const [ingredients, setIngredients] = useState([])
	const [search, setSearch] = useState("")
	const [selectedIngredient, setSelectedIngredient] = useState(null)
	const [isLoadingIngredients, setIsLoadingIngredients] = useState(true)
	const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
	const { showAlert } = useAlert()

	useEffect(() => {
		async function fetchIngredients() {
			try {
				const response = await fetch(`${API_URL}/ingredients`)
				if (!response.ok) {
					throw new Error(`Error al cargar ingredientes. Estado: ${response.status}`)
				}

				setIngredients(await response.json())
			} catch (error) {
				showAlert({ title: "No se pudieron cargar los ingredientes", description: error.message, status: "error" })
			} finally {
				setIsLoadingIngredients(false)
			}
		}

		fetchIngredients()
	}, [showAlert])

	const filteredIngredients = ingredients.filter((ingredient) =>
		ingredient.ing_name?.toLowerCase().includes(search.toLowerCase())
	)

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
		setSelectedIngredient(null)
		reset({ ing_name: "", ing_unit: "", ing_value: "" })
	}

	const handleIngredientSelect = (ingredient) => {
		setSelectedIngredient(ingredient)
		setSearch(ingredient.ing_name)
		reset({
			ing_name: ingredient.ing_name ?? "",
			ing_unit: ingredient.ing_unit ?? "",
			ing_value: ingredient.ing_value ?? "",
		})
	}

	const onSubmit = async (values) => {
		try {
			const response = await fetch(`${API_URL}/ingredients/${encodeURIComponent(selectedIngredient.ing_id)}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ing_name: values.ing_name,
					ing_unit: values.ing_unit,
					ing_value: Number(values.ing_value),
				}),
			})

			if (!response.ok) {
				throw new Error(`Error al actualizar el ingrediente. Estado: ${response.status}`)
			}

			const updatedIngredient = { ...selectedIngredient, ...values, ing_value: Number(values.ing_value) }
			setSelectedIngredient(updatedIngredient)
			setIngredients((currentIngredients) => currentIngredients.map((ingredient) =>
				ingredient.ing_id === updatedIngredient.ing_id ? updatedIngredient : ingredient
			))
			setSearch(updatedIngredient.ing_name)
			showAlert({ title: "Ingrediente actualizado", description: "Los cambios se guardaron correctamente.", status: "success" })
		} catch (error) {
			showAlert({ title: "No se pudo actualizar el ingrediente", description: error.message, status: "error" })
		}
	}

	return (
		<Box as="main" flex="1" bg="gray.950" py={{ base: 10, md: 16 }}>
			<Container maxW="3xl" px={{ base: 5, md: 8 }}>
				<VStack align="stretch" gap={8}>
					<Heading size="xl" color="gray.100">Editar ingrediente</Heading>

					<Box>
						<Text as="label" display="block" htmlFor="ingredient-search" mb={2} color="gray.300" fontWeight="medium">
							Buscar ingrediente
						</Text>
						<Box position="relative">
							<Input
								id="ingredient-search"
								value={search}
								onChange={handleSearchChange}
								placeholder="Escribe el nombre de un ingrediente"
								autoComplete="off"
								role="combobox"
								aria-autocomplete="list"
								aria-controls="ingredient-search-results"
								aria-expanded={search.length > 0 && !selectedIngredient}
								color="gray.100"
								borderColor="gray.700"
								_focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
							/>
							{search && !selectedIngredient && (
								<VStack
									id="ingredient-search-results"
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
									{isLoadingIngredients ? (
										<Text px={3} py={2} color="gray.400" fontSize="sm">Cargando ingredientes...</Text>
									) : filteredIngredients.length > 0 ? filteredIngredients.map((ingredient) => (
										<Box
											as="li"
											key={ingredient.ing_id}
											role="option"
											aria-selected={false}
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
										<Text px={3} py={2} color="gray.400" fontSize="sm">No se encontraron ingredientes</Text>
									)}
								</VStack>
							)}
						</Box>
					</Box>

					{selectedIngredient && (
						<Box as="form" onSubmit={handleSubmit(onSubmit)}>
							<VStack align="stretch" gap={6}>
								<Box>
									<Text as="label" display="block" htmlFor="ingredient-name" mb={2} color="gray.300" fontWeight="medium">
										Nombre
									</Text>
									<Input
										id="ingredient-name"
										type="text"
										required
										color="gray.100"
										borderColor="gray.700"
										_focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
										{...register("ing_name", { required: true })}
									/>
								</Box>

								<Box>
									<Text as="label" display="block" htmlFor="ingredient-unit" mb={2} color="gray.300" fontWeight="medium">
										Unidad
									</Text>
									<Input
										id="ingredient-unit"
										type="text"
										required
										color="gray.100"
										borderColor="gray.700"
										_focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
										{...register("ing_unit", { required: true })}
									/>
								</Box>

								<Box>
									<Text as="label" display="block" htmlFor="ingredient-value" mb={2} color="gray.300" fontWeight="medium">
										Valor
									</Text>
									<Input
										id="ingredient-value"
										type="number"
										min="0"
										step="any"
										required
										color="gray.100"
										borderColor="gray.700"
										_focusVisible={{ borderColor: "teal.400", boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)" }}
										{...register("ing_value", { required: true, min: 0 })}
									/>
								</Box>

								<Button type="submit" colorPalette="teal" alignSelf="flex-start" px={8} loading={isSubmitting}>
									Guardar cambios
								</Button>
							</VStack>
						</Box>
					)}
				</VStack>
			</Container>
		</Box>
	)
}
