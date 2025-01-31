import { getCitiesData, postCitiesData } from "@/api/weatheryApi";
import CityInput from "@/components/cities/CityInput";
import CityList from "@/components/cities/CityList";
import Layout from "@/layouts/Layout";
import { Box, Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Cities() {
  const queryClient = useQueryClient();

  const { data: cities, isLoading, error } = useQuery({
    queryKey: 'cities',
    queryFn: getCitiesData,
  });

  const mutation = useMutation({
    mutationFn: postCitiesData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'cities' });
    },
  });

  const addCity = async (city) => {
    mutation.mutate(city);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cities</div>;
  return (
    <Layout>
      <Flex marginTop={4} gap={3}>
        <Box minWidth={"400px"} height={"600px"}>
          <CityInput addCity={addCity} />
        </Box>
        <Box minWidth={"700px"} height={"600px"}>
          <CityList cities={cities} />
        </Box>
      </Flex>
    </Layout>
  );
}
