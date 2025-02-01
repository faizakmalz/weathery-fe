import Layout from "@/layouts/Layout";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Layout>
      <Box
        marginTop={4}
        className="bg-gray-800 bg-opacity-5 rounded-lg"
        padding={"40px 60px"}
        color={"white"}
      >
        <Flex justify={"space-between"}>
          <Box width={"550px"} spaceY={10}>
            <Text fontSize={"30px"} fontWeight={700}>
              Hi! My Name is Faza
            </Text>
            <p className="text-justify">
              Hello everyone, my name is Faza, i am a dedicated and
              results-oriented professional with a background in Full Stack
              Development, Digital Marketing and IT. I had years experience on
              exploring those industries with dedication and known for proactive
              approach, attention to detail, and ability to thrive in fast-paced
              environments. I am committed to delivering high-quality results
              and contributing to wherever enviroment that i pursue.
            </p>
            <Text>
              More Information :{" "}
              <a
                style={{ color: "lightblue" }}
                href="https://www.linkedin.com/in/faiza-akmal/"
              >
                My Linkedin Page
              </a>
            </Text>
          </Box>
          <img src="/profile.png" alt="" width={"300px"} />
        </Flex>
      </Box>
      <Box
        marginTop={4}
        className="bg-gray-800 bg-opacity-5 rounded-lg"
        padding={"40px 60px"}
        color={"white"}
      >
        <Flex justify={"space-between"}>
          <img className="w-84" src="/PMAcceleratorLogo.png" alt="" />
          <Box width={"550px"} spaceY={10}>
            <Text fontSize={"30px"} fontWeight={700}>
              About PM Accelerator
            </Text>
            <p className="text-justify">
              The Product Manager Accelerator Program is designed to support PM
              professionals through every stage of their careers. From students
              looking for entry-level jobs to Directors looking to take on a
              leadership role, our program has helped over hundreds of students
              fulfill their career aspirations. Our Product Manager Accelerator
              community are ambitious and committed. Through our program they
              have learnt, honed and developed new PM and leadership skills,
              giving them a strong foundation for their future endeavors.
            </p>
            <Text>
              More Information :{" "}
              <a
                style={{ color: "orange" }}
                href="https://www.linkedin.com/school/pmaccelerator/"
              >
                PM Accelerator Linkedin
              </a>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}
