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
  Divider,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { vendorLogin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await vendorLogin(email, password);
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back to your vendor dashboard!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to virtual mart for vendors
      navigate('/virtual-mart');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2} color="heritage.500">Vendor Login</Heading>
          <Text color="gray.600">Access your vendor dashboard</Text>
        </Box>

        <Box bg="white" p={8} borderRadius="lg" boxShadow="base">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              <Button
                type="submit"
                colorScheme="heritage"
                size="lg"
                width="full"
                isLoading={loading}
                loadingText="Logging in"
              >
                Login as Vendor
              </Button>
            </VStack>
          </form>

          <VStack mt={6} spacing={4}>
            <Divider />
            <Text>
              Don't have a vendor account?{' '}
              <ChakraLink as={Link} to="/vendor/register" color="heritage.500">
                Register here
              </ChakraLink>
            </Text>
            <Text>
              Customer?{' '}
              <ChakraLink as={Link} to="/login" color="heritage.500">
                Login here
              </ChakraLink>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default VendorLogin;
