import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Textarea,
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    businessName: '',
    description: '',
    contactNumber: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        ...formData,
        role: 'vendor',
        vendorDetails: {
          businessName: formData.businessName,
          description: formData.description,
          contactNumber: formData.contactNumber,
          address: formData.address
        }
      });

      toast({
        title: 'Registration Successful',
        description: 'You can now login as a vendor',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/vendor/login');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2} color="heritage.500">Vendor Registration</Heading>
          <Text color="gray.600">Join our marketplace as a heritage product vendor</Text>
        </Box>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="base">
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Business Name</FormLabel>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter your business name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Business Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your business and products"
                  rows={4}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Business Address</FormLabel>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your business address"
                  rows={3}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="heritage"
                size="lg"
                width="full"
                isLoading={loading}
                loadingText="Registering"
              >
                Register as Vendor
              </Button>
            </VStack>
          </form>

          <VStack mt={6} spacing={4}>
            <Divider />
            <Text>
              Already have a vendor account?{' '}
              <ChakraLink as={Link} to="/vendor/login" color="heritage.500">
                Login here
              </ChakraLink>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default VendorRegister;
