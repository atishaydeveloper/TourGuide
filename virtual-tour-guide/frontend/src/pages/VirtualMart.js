import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Select,
  Input,
  HStack,
  VStack,
  Heading,
  Text,
  Spinner,
  useToast,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FaShoppingCart, FaPlus } from 'react-icons/fa';
import ProductCard from '../components/Product/ProductCard';
import CartDrawer from '../components/Cart/CartDrawer';
import { mockProducts } from '../mockData/products';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Handicrafts', 'Paintings', 'Textiles', 'Sculptures', 'Carpets'];

const VirtualMart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
  });
  const { cart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const renderVendorActions = () => {
    if (user?.role === 'vendor') {
      return (
        <Box mb={6}>
          <HStack spacing={4} justify="flex-end">
            <Button
              leftIcon={<FaPlus />}
              colorScheme="heritage"
              onClick={() => navigate('/add-product')}
            >
              Add New Product
            </Button>
            <Button
              colorScheme="heritage"
              variant="outline"
              onClick={() => navigate('/vendor/dashboard')}
            >
              Vendor Dashboard
            </Button>
          </HStack>
        </Box>
      );
    }
    return null;
  };

  useEffect(() => {
    filterProducts();
  }, [filters]);

  const filterProducts = () => {
    let filteredProducts = [...mockProducts];

    if (filters.search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    setProducts(filteredProducts);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4} color="heritage.500">
            Virtual Heritage Mart
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Discover authentic heritage products from local artisans
          </Text>
        </Box>

        {renderVendorActions()}

        <HStack justify="space-between">
          <Box>
            <Heading color="heritage.700" mb={2}>Heritage Virtual Mart</Heading>
            <Text color="gray.600">
              Discover and purchase authentic heritage crafts and artifacts
            </Text>
          </Box>
          <Button
            leftIcon={<FaShoppingCart />}
            colorScheme="heritage"
            onClick={onOpen}
            variant="outline"
          >
            Cart ({cart.length})
          </Button>
        </HStack>

        <HStack spacing={4} wrap="wrap">
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            flex={1}
          />

          <Select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            minW="200px"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </HStack>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" color="heritage.500" />
          </Box>
        ) : products.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.600">
              No products found. Try adjusting your filters.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </VStack>

      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default VirtualMart;
