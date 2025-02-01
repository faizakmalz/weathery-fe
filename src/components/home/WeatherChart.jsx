import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";
import WeatherIcon from "../WeatherIcon";

const WeatherBarChart = ({ cities }) => {
  const chartData =
    cities
      ?.filter((city) => !city.isLoading && !city.error && city.weather)
      .slice(0, 5)
      .map((city) => ({
        name: city.name,
        temperature: city.weather.temperature,
        weather_description: city.weather.weather_descriptions[0],
      })) || [];

  const CustomBar = (props) => {
    const { x, y, width, height, weather_description } = props;
    const iconX = x + width / 2 - 37.5;
    const iconY = y - 120;

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#60A5FA" rx={2} />
        <foreignObject x={iconX} y={iconY} width={75} height={75}>
          <WeatherIcon size="75px" weatherDescription={weather_description} />
        </foreignObject>
      </g>
    );
  };

  return (
    <Box className="w-full p-6 bg-gray-800 bg-opacity-15 rounded-lg">
      <div className="w-full h-148">
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ paddingTop: 50 }}
        >
          <BarChart margin={{ top: 100 }} data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#fff"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#fff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit="°"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar
              dataKey="temperature"
              shape={<CustomBar />}
              label={{
                position: "top",
                fill: "#fff",
                fontSize: 12,
                formatter: (value) => `${value}°`,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default WeatherBarChart;
