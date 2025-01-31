import { FaCloud, FaCloudSunRain, FaSun } from "react-icons/fa";

export default function WeatherIcon(weatherDescription) {
    const large = "100px"

    if (weatherDescription === "Partly Cloudy") {
        return (
            <FaCloud size={large}/>
        )
    } else if (weatherDescription === "Sunny") {
        return (
            <FaSun size={large}/>
        )
    } else return <FaCloudSunRain size={"100px"}/>

}