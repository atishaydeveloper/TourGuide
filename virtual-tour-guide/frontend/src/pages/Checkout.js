import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  HStack,
  Divider,
  Image,
  Badge,
  IconButton,
  useColorModeValue,
  Stack,
  Flex,
  Radio,
  RadioGroup,
  Progress,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'netbanking', name: 'Net Banking' },
  { id: 'cod', name: 'Cash on Delivery' },
];

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep(2);

    // Simulate order confirmation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep(3);

    // Clear cart and show success message
    clearCart();
    setLoading(false);

    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for shopping with us.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="md" mb={4}>Shipping Information</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input name="name" value={formData.name} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input name="address" value={formData.address} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input name="city" value={formData.city} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input name="state" value={formData.state} onChange={handleInputChange} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Pincode</FormLabel>
                    <Input name="pincode" value={formData.pincode} onChange={handleInputChange} />
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Box>
                <Heading size="md" mb={4}>Payment Method</Heading>
                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                  <VStack align="stretch" spacing={3}>
                    {PAYMENT_METHODS.map((method) => (
                      <Radio key={method.id} value={method.id}>
                        {method.name}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </Box>

              {paymentMethod === 'card' && (
                <Box>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Card Number</FormLabel>
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={16}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Expiry Date</FormLabel>
                      <Input
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>CVV</FormLabel>
                      <Input
                        name="cardCvv"
                        type="password"
                        maxLength={3}
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </SimpleGrid>
                </Box>
              )}

              <Button
                type="submit"
                colorScheme="heritage"
                size="lg"
                isLoading={loading}
                loadingText="Processing"
              >
                Place Order (INR {getCartTotal().toLocaleString()})
              </Button>
            </VStack>
          </form>
        );

      case 2:
        return (
          <VStack spacing={6} py={10}>
            <Progress size="xs" isIndeterminate w="100%" />
            <Text fontSize="lg">Processing your payment...</Text>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={8} py={10}>
            <Alert status="success">
              <AlertIcon />
              Order placed successfully!
            </Alert>
            <Image src="/success.gif" alt="Success" boxSize="200px" />
            <VStack spacing={4}>
              <Text fontSize="lg">
                Thank you for your purchase! Your order has been confirmed.
              </Text>
              <Button colorScheme="heritage" onClick={() => navigate('/')}>
                Continue Shopping
              </Button>
            </VStack>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={2}>Checkout</Heading>
          <Text color="gray.600">Complete your purchase</Text>
        </Box>

        {cart.length === 0 && step === 1 ? (
          <VStack py={10} spacing={4}>
            <Text>Your cart is empty</Text>
            <Button colorScheme="heritage" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </VStack>
        ) : (
          getStepContent()
        )}
      </VStack>
    </Container>
  );
};

export default Checkout;
