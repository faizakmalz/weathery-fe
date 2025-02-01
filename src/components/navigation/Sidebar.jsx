import { Flex, Text } from "@chakra-ui/react";
import { FaHome, FaCity, FaCalendarDay, FaUser } from "react-icons/fa";
import { TiWeatherDownpour } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="sidebar flex flex-col gap-10 w-50 justify-start items-center bg-gray-800 bg-opacity-5 h-[750px] rounded-lg">
        <TiWeatherDownpour color="white" size={"100px"} />
        <Flex direction="column" className="text-white" gap={6}>
          <Text className="text-xl font-bold">Weathery App</Text>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            <FaHome /> <Text>Home</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/cities")}
          >
            <FaCity /> <Text>Cities</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/forecasts")}
          >
            <FaCalendarDay /> <Text>Forecasts</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/profile")}
          >
            <FaUser /> <Text>Profile</Text>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
