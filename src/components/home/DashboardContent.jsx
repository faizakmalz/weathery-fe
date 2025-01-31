import { useState } from "react"
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FaWind } from "react-icons/fa";
import {
  Chart as ChartJS,
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
import CityList, { cities } from "../cities/CityList";
import WeatherIcon from "../WeatherIcon";
import { useLocationContext } from "@/context/LocationContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//dummy
const mainCityData = {
  city: "Jakarta",
  temperature: 34,
  weather_description: "Partly Cloudy"
}

export default function DashboardContent() {
  const [cities2, setCities2] = useState([]);
  const { location, city, geoLoading, geoCodeLoading, geoError, geoCodeError, refreshLocation } = useLocationContext();

  if (geoLoading || geoCodeLoading) {
    return <div>Loading...</div>;
  }

  if (geoError || geoCodeError) {
    return <div>Error: {geoError || geoCodeError}</div>;
  }
  
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
        <Flex alignItems="center" textAlign={"center"} gap={4} direction={"column"}>
          <WeatherIcon weatherDescription={mainCityData.weather_description}/>
          <Box>
            <Text onClick={() => refreshLocation()} fontSize={"48px"} fontWeight={800}>
              {mainCityData.city}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {mainCityData.temperature}°
            </Text>
            <Text fontSize="lg">{mainCityData.weather_description}</Text>
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
    
      <Box>
        <CityList cities={cities2}/>

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
