import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VendorDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    if (user?.role !== 'vendor') {
      navigate('/');
      return;
    }
    fetchVendorData();
  }, [user, navigate]);

  const fetchVendorData = async () => {
    try {
      // TODO: Replace with actual API calls
      // Mock data for now
      setProducts([
        {
          id: 1,
          name: 'Traditional Handicraft',
          price: 2999,
          stock: 15,
          status: 'active'
        },
        {
          id: 2,
          name: 'Heritage Painting',
          price: 5999,
          stock: 8,
          status: 'active'
        }
      ]);

      setStats({
        totalProducts: 2,
        totalOrders: 25,
        revenue: 45000
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch vendor data',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // TODO: Implement delete API call
      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={2}>Vendor Dashboard</Heading>
          <Text color="gray.600">Manage your heritage products</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat
            px={4}
            py={3}
            bg="white"
            shadow="base"
            borderRadius="lg"
          >
            <StatLabel>Total Products</StatLabel>
            <StatNumber>{stats.totalProducts}</StatNumber>
            <StatHelpText>Active listings</StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={3}
            bg="white"
            shadow="base"
            borderRadius="lg"
          >
            <StatLabel>Total Orders</StatLabel>
            <StatNumber>{stats.totalOrders}</StatNumber>
            <StatHelpText>Last 30 days</StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={3}
            bg="white"
            shadow="base"
            borderRadius="lg"
          >
            <StatLabel>Revenue</StatLabel>
            <StatNumber>₹{stats.revenue}</StatNumber>
            <StatHelpText>Last 30 days</StatHelpText>
          </Stat>
        </SimpleGrid>

        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="md">Your Products</Heading>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="heritage"
              onClick={handleAddProduct}
            >
              Add New Product
            </Button>
          </HStack>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th isNumeric>Price (₹)</Th>
                  <Th isNumeric>Stock</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map(product => (
                  <Tr key={product.id}>
                    <Td>{product.name}</Td>
                    <Td isNumeric>{product.price}</Td>
                    <Td isNumeric>{product.stock}</Td>
                    <Td>
                      <Badge
                        colorScheme={product.status === 'active' ? 'green' : 'red'}
                      >
                        {product.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<FaEdit />}
                          aria-label="Edit product"
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Delete product"
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default VendorDashboard;
