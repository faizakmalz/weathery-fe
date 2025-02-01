import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const WeatherOverviewChart = ({ data }) => {
  //weather scoring (not really based on professional analytics)
  const getWeatherScore = (day) => {
    let score = 75;

    const tempDiff = Math.abs(day.avg_temp_c - 22.5);
    score -= tempDiff * 2;

    if (day.wind_kph > 30) score -= 10;
    if (day.wind_kph > 20) score -= 5;

    if (day.humidity > 80) score -= 10;
    if (day.humidity < 30) score -= 10;

    if (day.condition.toLowerCase().includes("rain")) score -= 10;
    if (day.condition.toLowerCase().includes("storm")) score -= 30;
    if (day.condition.toLowerCase().includes("clear")) score += 30;
    if (day.condition.toLowerCase().includes("sunny")) score += 10;

    return Math.max(0, Math.min(100, score));
  };

  const chartData = {
    labels: data.map((day) => day.date),
    datasets: [
      {
        type: "bar",
        label: "Weather Analysis",
        data: data.map((day) => getWeatherScore(day)),
        backgroundColor: "rgba(0, 132, 255, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Temperature Trend",
        data: data.map((day) => day.avg_temp_c),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "white" },
      },
      title: {
        display: true,
        text: "Weather Overview - Comfort Score & Temperature",
        color: "white",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          afterBody: (tooltipItems) => {
            const dataIndex = tooltipItems[0].dataIndex;
            return `Condition: ${data[dataIndex].condition}\nWind: ${data[dataIndex].wind_kph} km/h\nHumidity: ${data[dataIndex].humidity}%`;
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Comfort Score",
          color: "white",
        },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
      y1: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "white",
        },
        grid: { drawOnChartArea: false },
        ticks: { color: "white" },
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "white" },
      },
    },
  };

  return (
    <Box
      p={4}
      className="bg-gray-800 bg-opacity-15"
      borderRadius="lg"
      height="400px"
    >
      <Bar data={chartData} options={options} />
    </Box>
  );
};

const WeatherChart = ({ labels, data, label, color, min, max, title }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: color.replace("1)", "0.2)"),
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        min,
        max,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <Box
      p={4}
      className="bg-gray-800 bg-opacity-15"
      borderRadius="lg"
      height="400px"
      width={"100%"}
    >
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default function ForecastCharts({ forecast5DaysData }) {
  if (!forecast5DaysData || forecast5DaysData.length === 0) {
    return <div>No forecast data available</div>;
  }

  const labels = forecast5DaysData.map((day) => day.date);
  const avgTemps = forecast5DaysData.map((day) => day.avg_temp_c);
  const windSpeeds = forecast5DaysData.map((day) => day.wind_kph);
  const humidityLevels = forecast5DaysData.map((day) => day.humidity);

  return (
    <SimpleGrid
      columns={1}
      spacing={6}
      width="full"
      maxW="1200px"
      mx="auto"
      gap={5}
    >
      <WeatherOverviewChart data={forecast5DaysData} />

      <WeatherChart
        labels={labels}
        data={avgTemps}
        label="Temperature"
        color="rgba(255, 99, 132, 1)"
        min={Math.min(...avgTemps) - 2}
        max={Math.max(...avgTemps) + 2}
        title="Temperature (°C) over 5 Days"
      />
      <WeatherChart
        labels={labels}
        data={windSpeeds}
        label="Wind Speed"
        color="rgba(54, 162, 235, 1)"
        min={Math.min(...windSpeeds) - 5}
        max={Math.max(...windSpeeds) + 5}
        title="Wind Speed (km/h) over 5 Days"
      />
      <WeatherChart
        labels={labels}
        data={humidityLevels}
        label="Humidity"
        color="rgba(255, 206, 86, 1)"
        min={Math.min(...humidityLevels) - 5}
        max={Math.max(...humidityLevels) + 5}
        title="Humidity (%) over 5 Days"
      />
    </SimpleGrid>
  );
}
