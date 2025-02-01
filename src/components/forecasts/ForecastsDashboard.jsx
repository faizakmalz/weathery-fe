import { Box, Flex } from "@chakra-ui/react";
import CityList from "../cities/CityList";
import { useForecastContext } from "@/context/ForecastContext";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ForecastCharts from "./ForecastChart";

export default function ForecastDashboard() {
  const { forecast5DaysData } = useForecastContext();
  const forecastArray = forecast5DaysData?.data;

  useEffect(() => {
    console.log("forecast5 days page", forecast5DaysData);
  }, []);

  return (
    <Box
      marginTop={4}
      minWidth={"700px"}
      height={"600px"}
      color={"white"}
      spaceY={5}
    >
      <Flex justify={"space-between"}>
        <Box minWidth={"700px"}>
          <ForecastCharts forecast5DaysData={forecastArray} />
        </Box>
        <Box minWidth={"355px"}>
          <CityList />
        </Box>
      </Flex>
    </Box>
  );
}
