import { useLocationContext } from "@/context/LocationContext";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const { city, country, geoLoading, geoCodeLoading, geoError, geoCodeError } =
    useLocationContext();

  if (geoLoading || geoCodeLoading) {
    return <div>Loading...</div>;
  }

  if (geoError || geoCodeError) {
    return <div>Error: {geoError || geoCodeError}</div>;
  }
  return (
    <Flex
      className="p-8 bg-gray-800 bg-opacity-15 text-white min-w-[70vw] h-24 rounded-lg"
      paddingInline={18}
      justify="space-between"
      align="center"
    >
      <Text className="text-xl font-bold">{`${city}, ${country}`}</Text>
      <Flex gap={7} alignItems={"center"} marginRight={3}>
        <Text fontSize={30}>
          Hi! <b>Faza</b>
        </Text>
        <IconButton onClick={() => navigate("/profile")}>
          <FaUser />
        </IconButton>
      </Flex>
    </Flex>
  );
}
