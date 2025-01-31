import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function Topbar() {
  return (
    <Flex
      className="p-4 bg-gray-800 bg-opacity-15 text-white w-full h-24 rounded-lg"
      paddingInline={18}
      justify="space-between"
      align="center"
    >
      <Text className="text-xl font-bold">London, UK</Text>
      <Flex gap={3}>
        <Input
          placeholder="Search here"
          className="bg-gray-700 border-none text-white"
        />
        <IconButton>
          <FaSearch />
        </IconButton>
      </Flex>
    </Flex>
  );
}
