import {
  FaCloud,
  FaCloudRain,
  FaSun,
  FaCloudSun,
  FaBolt,
  FaSmog,
  FaSnowflake,
} from "react-icons/fa";

export default function WeatherIcon({
  weatherDescription,
  size = "100px",
  color = "white",
}) {
  const description = (weatherDescription || "").toLowerCase();

  const getWeatherIcon = () => {
    if (description.includes("cloud") && description.includes("sun")) {
      return <FaCloudSun size={size} color={color} />;
    } else if (description.includes("cloud")) {
      return <FaCloud size={size} color={color} />;
    } else if (description.includes("rain")) {
      return <FaCloudRain size={size} color={color} />;
    } else if (
      description.includes("storm") ||
      description.includes("thunder")
    ) {
      return <FaBolt size={size} color={color} />;
    } else if (description.includes("snow")) {
      return <FaSnowflake size={size} color={color} />;
    } else if (description.includes("fog") || description.includes("mist")) {
      return <FaSmog size={size} color={color} />;
    } else if (description.includes("sun") || description.includes("clear")) {
      return <FaSun size={size} color={color} />;
    }
    return <FaCloudSun size={size} color={color} />;
  };

  return getWeatherIcon();
}
