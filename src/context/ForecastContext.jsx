import {
  get5DaysForecast,
  getCitiesData,
  getForecastbyCity,
} from "@/api/weatheryApi";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocationContext } from "./LocationContext";
import { useLocation } from "react-router-dom";

const ForecastContext = createContext();

export default function ForecastProvider({ children }) {
  const { city, refreshLocation } = useLocationContext();
  const [selectedCity, setSelectedCity] = useState(city || null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (city) {
      setSelectedCity(city);
    }
  }, [city]);

  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCitiesData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // fetch the current location weather for initial main weather data
  const { data: currentLocationWeather, isLoading: currentLocationLoading } =
    useQuery({
      queryKey: ["cityForecast", city],
      queryFn: () => {
        const cachedData = queryClient.getQueryData(["cityForecast", city]);
        if (cachedData) return cachedData;
        return getForecastbyCity(city);
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!city && !cities?.some((c) => c.name === city),
    });

  // all queries for the cities list
  const cityWeatherQueries = useQueries({
    queries: (cities || []).map((city) => ({
      queryKey: ["cityForecast", city.name],
      queryFn: () => {
        const cachedData = queryClient.getQueryData([
          "cityForecast",
          city.name,
        ]);
        if (cachedData) return cachedData;
        return getForecastbyCity(city.name);
      },
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    })),
    enabled: !!cities?.length,
  });

  // all combined data for the dashboard chart
  const combinedCityData = useMemo(() => {
    const citiesData =
      cities?.map((city, index) => ({
        ...city,
        weather: cityWeatherQueries[index]?.data?.data || null,
        isLoading: cityWeatherQueries[index]?.isLoading || false,
        error: cityWeatherQueries[index]?.error || null,
      })) || [];

    if (
      city &&
      !cities?.some((c) => c.name === city) &&
      currentLocationWeather
    ) {
      citiesData.push({
        name: city,
        weather: currentLocationWeather.data,
        isLoading: currentLocationLoading,
        error: null,
      });
    }

    return citiesData;
  }, [
    cities,
    cityWeatherQueries,
    city,
    currentLocationWeather,
    currentLocationLoading,
  ]);

  const selectedCityWeather = useMemo(() => {
    const selectedCityData = combinedCityData.find(
      (c) => c?.name === selectedCity
    );
    return selectedCityData?.weather || null;
  }, [combinedCityData, selectedCity]);

  // fetch 5 days forecast for the forecast menu
  const {
    data: forecast5DaysData,
    isLoading: forecast5DaysLoading,
    error: forecast5DaysError,
  } = useQuery({
    queryKey: ["5DaysForecast", selectedCity],
    queryFn: () => {
      const cachedData = queryClient.getQueryData([
        "5DaysForecast",
        selectedCity,
      ]);
      if (cachedData) return cachedData;
      return get5DaysForecast(selectedCity);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: !!selectedCity,
  });

  const contextValue = {
    cities: combinedCityData,
    citiesLoading,
    citiesError,
    selectedCity,
    setSelectedCity,
    selectedCityWeather,
    isLoading:
      citiesLoading ||
      cityWeatherQueries.some((q) => q.isLoading) ||
      currentLocationLoading,
    error:
      citiesError ||
      cityWeatherQueries.some((q) => q.error) ||
      (currentLocationWeather
        ? null
        : "Error fetching current location weather"),
    forecast5DaysData,
    forecast5DaysLoading,
    forecast5DaysError,
  };

  return (
    <ForecastContext.Provider value={contextValue}>
      {children}
    </ForecastContext.Provider>
  );
}

export const useForecastContext = () => {
  const context = useContext(ForecastContext);
  const location = useLocation();

  if (!context) {
    throw new Error(
      "useForecastContext have to be used within a ForecastProvider"
    );
  }

  return location.pathname === "/forecasts"
    ? {
        selectedCity: context.selectedCity,
        setSelectedCity: context.setSelectedCity,
        forecast5DaysData: context.forecast5DaysData,
        forecast5DaysLoading: context.forecast5DaysLoading,
        forecast5DaysError: context.forecast5DaysError,
        cities: context.cities,
      }
    : {
        selectedCity: context.selectedCity,
        setSelectedCity: context.setSelectedCity,
        selectedCityWeather: context.selectedCityWeather,
        cities: context.cities,
        isLoading: context.isLoading,
        error: context.error,
      };
};
