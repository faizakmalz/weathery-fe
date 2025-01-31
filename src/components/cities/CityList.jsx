import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const cities = [
    { city: "New York", temperature: 28 },
    { city: "Jakarta", temperature: 32 },
    { city: "New Delhi", temperature: 24 },
    { city: "Surabaya", temperature: 34 },
  ];

export default function CityList ({cities}) {
    const navigate = useNavigate();

    const getSize = () => {
        switch (location.pathname) {
          case '/cities':
            return "full";
          case '/':
            return "350px";
          default:
            return "full";
        }
    };
    const size = getSize();

    return (
        <Box
        p={6}
        className="bg-gray-800 bg-opacity-15"
        borderRadius="lg"
        height={size}
        overflow={"auto"}
        gridColumn={{ base: "span 1", md: "span 1" }}
      >
        <Flex direction={"column"} gap={3}>
          <Flex justify={"space-between"}>
            <Text fontSize={30} fontWeight={700}>
              Cities
            </Text>
            <IconButton onClick={() => navigate("/cities")} bg={"none"}>
              <FaPlus color="white"/>
            </IconButton>
          </Flex>
          <Box spaceY={4}>
            {Array.isArray(cities) ? cities.map((city) => (
              <Flex key={city.id} p={4} gap={4} bg={"gray.700"} borderRadius={"lg"}>
                <Text fontSize="lg">{city.name}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {city.country}°
                </Text>
              </Flex>
            )) : (
                <Text>No cities available</Text>
              )}
          </Box>
        </Flex>
      </Box>
    )

}