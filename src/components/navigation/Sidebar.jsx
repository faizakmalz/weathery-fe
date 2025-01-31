import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Grid,
  Card,
} from "@chakra-ui/react";
import {
  FaCloudRain,
  FaWind,
  FaHome,
  FaBlog,
  FaMap,
  FaCamera,
  FaVideo,
  FaPhone,
} from "react-icons/fa";
import { TiWeatherDownpour } from "react-icons/ti";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar flex flex-col gap-10 w-50 justify-start items-center bg-gray-800 bg-opacity-0 h-[750px] rounded-lg">
        <TiWeatherDownpour color="white" size={"100px"} />
        <Flex direction="column" className="text-white" gap={6}>
          <Text className="text-xl font-bold">Weather App</Text>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaHome /> <Text>Home</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaBlog /> <Text>Blogs</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaMap /> <Text>Map</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaCamera /> <Text>Photos</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaVideo /> <Text>Videos</Text>
          </Flex>
          <Flex
            align="center"
            className="gap-3 cursor-pointer hover:text-blue-400"
          >
            <FaPhone /> <Text>Phone</Text>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
