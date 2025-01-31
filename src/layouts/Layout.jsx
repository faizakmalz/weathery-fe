import DashboardContent from "@/components/home/DashboardContent";
import Sidebar from "@/components/navigation/Sidebar";
import Topbar from "@/components/navigation/Topbar";
import { Button, Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Flex gap={4} justify={"center"}>
      <Sidebar />
      <Flex direction={"column"}>
        <Topbar />
        {children}
      </Flex>
    </Flex>
  );
}
