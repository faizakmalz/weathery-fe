import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const CitySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'City name too short')
    .max(50, 'City name too long')
    .required('City name is required'),
  country: Yup.string()
    .min(2, 'Country name too short')
    .max(50, 'Country name too long')
    .required('Country is required'),
});

export default function CityInput({ addCity }) {
  const handleSubmit = async (values, { resetForm }) => {
    console.log('Form values:', values);
    try {
      const response = await addCity(values);
      console.log('success input post', response);
      resetForm();
    } catch (e) {
      console.log('error', e);
    }
    resetForm();
  };

  return (
    <>
      <Flex>
        <Box 
        className="bg-gray-800 bg-opacity-15 rounded-lg" 
        minWidth={"400px"} 
        height={"600px"}
        p={6}
        spaceY={5}
        >
          <Text
          fontSize={20}
          fontWeight={800}
          >Add New City</Text>
          
          <Formik
            initialValues={{ name: '', country: '' }}
            validationSchema={CitySchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Box>
                  <Flex direction="column" gap={3} mb={4}>
                    <label htmlFor="name">City Name</label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      w="300px"
                      color="white"
                      border="1px solid white"
                    />
                    {errors.name && touched.name ? (
                      <Text color="red.300" fontSize="sm">
                        {errors.name}
                      </Text>
                    ) : null}
                  </Flex>

                  <Flex direction="column" gap={3} mb={4}>
                    <label htmlFor="country">Country</label>
                    <Field
                      as={Input}
                      id="country"
                      name="country"
                      w="300px"
                      color="white"
                      border="1px solid white"
                    />
                    {errors.country && touched.country ? (
                      <Text color="red.300" fontSize="sm">
                        {errors.country}
                      </Text>
                    ) : null}
                  </Flex>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                    w="300px"
                  >
                    Add City
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
      
    </>
  );
}
