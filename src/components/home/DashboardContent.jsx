import { Box, Card, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { FaCloudRain, FaPlus, FaWind } from "react-icons/fa";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const cities = [
  { city: "New York", temperature: 28 },
  { city: "Jakarta", temperature: 32 },
  { city: "New Delhi", temperature: 24 },
  { city: "Surabaya", temperature: 34 },
];

const chartData = {
  labels: cities.map((city) => city.city),
  datasets: [
    {
      label: "Temperature (°C)",
      data: cities.map((city) => city.temperature),
      fill: false,
      backgroundColor: "lightblue",
      borderColor: "blue",
    },
  ],
};

export default function DashboardContent() {
  const navigate = useNavigate();

  return (
    <Grid
      marginTop={4}
      gap={6}
      templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
      color={"white"}
    >
      {/* Current Weather */}
      <Box
        p={6}
        className="bg-gray-800 bg-opacity-15"
        borderRadius="lg"
        gridColumn={{ base: "span 1", md: "span 1" }}
      >
        <Flex align="center">
          <FaCloudRain size={50} color="lightblue" />
          <Box ml={4}>
            <Text fontSize="3xl" fontWeight="bold">
              28°
            </Text>
            <Text fontSize="lg">Partly Cloudy</Text>
          </Box>
        </Flex>
      </Box>

      <Box p={6} borderRadius="lg" className="bg-gray-800 bg-opacity-15">
        <Text fontSize="lg" fontWeight="bold">
          Today’s Highlights
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
          <Box
            p={4}
            bg="gray.700"
            borderRadius="lg"
            display="flex"
            alignItems="center"
          >
            <FaWind size={24} color="lightblue" />
            <Box ml={3}>
              <Text fontSize="sm">Wind</Text>
              <Text fontSize="lg" fontWeight="bold">
                26 km/h
              </Text>
            </Box>
          </Box>
          <Box
            p={4}
            bg="gray.700"
            borderRadius="lg"
            display="flex"
            alignItems="center"
          >
            <Text fontSize="2xl" color="lightblue">
              💧
            </Text>
            <Box ml={3}>
              <Text fontSize="sm">Humidity</Text>
              <Text fontSize="lg" fontWeight="bold">
                65%
              </Text>
            </Box>
          </Box>
          <Box
            p={4}
            bg="gray.700"
            borderRadius="lg"
            display="flex"
            alignItems="center"
          >
            <Text fontSize="2xl" color="lightblue">
              🌡️
            </Text>
            <Box ml={3}>
              <Text fontSize="sm">Pressure</Text>
              <Text fontSize="lg" fontWeight="bold">
                1012 hPa
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Box
        p={6}
        className="bg-gray-800 bg-opacity-15"
        borderRadius="lg"
        gridColumn={{ base: "span 1", md: "span 1" }}
      >
        <Flex direction={"column"} gap={3}>
          <Flex justify={"space-between"}>
            <Text fontSize={30} fontWeight={700}>
              Cities
            </Text>
            <IconButton onClick={() => navigate("/cities")} bg={"none"}>
              <FaPlus />
            </IconButton>
          </Flex>
          <Box spaceY={4}>
            {cities.map((city, i) => (
              <Flex key={i} p={4} gap={4} bg={"gray.700"} borderRadius={"lg"}>
                <Text fontSize="lg">{city.city}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {city.temperature}°
                </Text>
              </Flex>
            ))}
          </Box>
        </Flex>
      </Box>

      <Box
        p={6}
        className="bg-gray-800 bg-opacity-15"
        borderRadius="md"
        gridColumn={{ base: "span 1", md: "span 3" }}
      >
        <Text fontSize="lg" fontWeight="bold">
          Temperature Trends
        </Text>
        <Box mt={4}>
          <Line data={chartData} />
        </Box>
      </Box>
    </Grid>
  );
}
