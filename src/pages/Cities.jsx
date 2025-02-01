import { getCitiesData, postCitiesData, updateCity } from "@/api/weatheryApi";
import CityInput from "@/components/cities/CityInput";
import CityList from "@/components/cities/CityList";
import ForecastProvider from "@/context/ForecastContext";
import Layout from "@/layouts/Layout";
import { Box, Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Cities() {
  const queryClient = useQueryClient();
  const [editingCity, setEditingCity] = useState(null);

  const mutation = useMutation({
    mutationFn: postCitiesData,
    onSuccess: () => {
      queryClient.invalidateQueries(["cities"]);
    },
  });

  const addCity = async (city) => {
    mutation.mutate(city, {
      onSuccess: (newCity) => {
        queryClient.setQueryData(["cities"], (oldCities) =>
          oldCities ? [...oldCities, newCity] : [newCity]
        );
        queryClient.prefetchQuery(["cityForecast", newCity.name], () =>
          getForecastbyCity(newCity.name)
        );
      },
    });
  };

  const editMutation = useMutation({
    mutationFn: updateCity,
    onSuccess: (updatedCity) => {
      queryClient.setQueryData(["cities"], (oldCities) =>
        oldCities
          ? oldCities.map((c) => (c.id === updatedCity.id ? updatedCity : c))
          : [updatedCity]
      );

      queryClient.invalidateQueries(["cityForecast", updatedCity.name]);
      setEditingCity(null);
    },
  });

  const handleEdit = (city) => {
    setEditingCity(city);
  };

  const resetEditing = () => setEditingCity(null);

  return (
    <ForecastProvider>
      <Layout>
        <Flex marginTop={4} gap={3}>
          <Box minWidth={"400px"} height={"600px"}>
            <CityInput
              addCity={addCity}
              editingCity={editingCity}
              onEdit={editMutation.mutate}
              resetEditing={resetEditing}
            />
          </Box>
          <Box minWidth={"700px"} height={"600px"}>
            <CityList onEdit={handleEdit} />
          </Box>
        </Flex>
      </Layout>
    </ForecastProvider>
  );
}
