import { useEffect, useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FaWind } from "react-icons/fa";
import CityList from "../cities/CityList";
import WeatherIcon from "../WeatherIcon";
import { useLocationContext } from "@/context/LocationContext";
import { useForecastContext } from "@/context/ForecastContext";
import WeatherBarChart from "./WeatherChart";

export default function DashboardContent() {
  const {
    city,
    geoLoading,
    geoCodeLoading,
    geoError,
    geoCodeError,
    refreshLocation,
  } = useLocationContext();

  const {
    cities,
    selectedCity,
    selectedCityWeather,
    isLoading,
    error,
    setSelectedCity,
  } = useForecastContext();

  useEffect(() => {
    if (!selectedCity) {
      if (city) {
        setSelectedCity(city);
      } else if (cities.length > 0) {
        setSelectedCity(cities[0].name);
      }
    }
    console.log("Updated selected city:", selectedCity);
  }, [cities, selectedCity]);

  if (geoLoading || geoCodeLoading) {
    return <div>Loading...</div>;
  }

  if (geoError || geoCodeError) {
    return <div>Error: {geoError || geoCodeError}</div>;
  }

  const mainForecast = selectedCityWeather
    ? {
        city: selectedCity || "N/A",
        temperature: selectedCityWeather.temperature || "N/A",
        weather_description:
          selectedCityWeather.weather_descriptions?.[0] || "Clear",
        wind_speed: selectedCityWeather.wind_speed || "N/A",
        humidity: selectedCityWeather.humidity || "N/A",
      }
    : null;

  if (!mainForecast) {
    return <div>Loading or no weather data available...</div>;
  }

  if (isLoading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error loading weather data</div>;
  }

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
        <Flex
          alignItems="center"
          textAlign={"center"}
          gap={4}
          direction={"column"}
        >
          <WeatherIcon weatherDescription={mainForecast.weather_description} />
          <Box>
            <Text
              onClick={() => refreshLocation()}
              fontSize={"48px"}
              fontWeight={800}
            >
              {mainForecast.city}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {mainForecast.temperature}°
            </Text>
            <Text fontSize="lg">{mainForecast.weather_description}</Text>
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
                {mainForecast.wind_speed} km/h
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
                {mainForecast.humidity}%
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
              <Text fontSize="sm">Temperature</Text>
              <Text fontSize="lg" fontWeight="bold">
                {mainForecast.temperature}°
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>

      <Box>
        <CityList />
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
          <WeatherBarChart cities={cities} />
        </Box>
      </Box>
    </Grid>
  );
}
