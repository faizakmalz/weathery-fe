import { deleteCity, getCitiesData } from "@/api/weatheryApi";
import { useForecastContext } from "@/context/ForecastContext";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaLocationArrow, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CityList({ onEdit }) {
  const navigate = useNavigate();
  const { setSelectedCity } = useForecastContext();
  const queryClient = useQueryClient();

  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCitiesData,
    refetchOnMount: true,
  });

  const deleteMutation = useMutation({
    mutationFn: (city) => deleteCity(city),
    onSuccess: (_, deletedCity) => {
      queryClient.invalidateQueries(["cities"]);
      queryClient.invalidateQueries(["cityForecast", deletedCity.name]);
    },
  });

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    queryClient.invalidateQueries(["cityForecast", city]);
  };

  const handleDelete = async (city) => {
    deleteMutation.mutate(city, {
      onSuccess: () => {
        queryClient.setQueryData(["cities"], (oldCities) =>
          oldCities ? oldCities.filter((c) => c.id !== city) : []
        );

        queryClient.removeQueries(["cityForecast", city], { exact: true });
      },
    });
  };

  const getSize = () => {
    switch (location.pathname) {
      case "/cities":
        return "full";
      case "/":
        return "350px";
      default:
        return "full";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cities</div>;
  const size = getSize();

  return (
    <Box
      p={6}
      className="bg-gray-800 bg-opacity-15"
      borderRadius="lg"
      height={size}
      overflow={"auto"}
      color={"white"}
      gridColumn={{ base: "span 1", md: "span 1" }}
    >
      <Flex direction={"column"} gap={3}>
        <Flex justify={"space-between"}>
          <Text fontSize={30} fontWeight={700}>
            Cities
          </Text>
          <IconButton onClick={() => navigate("/cities")} bg={"none"}>
            <FaPlus color="white" />
          </IconButton>
        </Flex>
        <Box spaceY={4}>
          {Array.isArray(cities) ? (
            cities.map((city) => (
              <Flex
                key={city.id}
                p={4}
                gap={4}
                bg={"gray.700"}
                justify={"space-between"}
                borderRadius={"lg"}
              >
                <Flex gap={2}>
                  <Text fontSize="lg">{city.name}</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {city.country}
                  </Text>
                </Flex>
                {location.pathname !== "/cities" ? (
                  <IconButton onClick={() => handleSelectCity(city.name)}>
                    <FaLocationArrow />
                  </IconButton>
                ) : (
                  <Flex gap={3}>
                    <IconButton onClick={() => onEdit(city)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(city.id)}>
                      <FaTrash />
                    </IconButton>
                  </Flex>
                )}
              </Flex>
            ))
          ) : (
            <Text>No cities available</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
