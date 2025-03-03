import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  SimpleGrid,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProductForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      price: '',
      category: '',
      location: '',
      contactInfo: {
        phone: '',
        email: '',
        whatsapp: '',
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price (₹)</FormLabel>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Select category"
          >
            <option value="Handicrafts">Handicrafts</option>
            <option value="Paintings">Paintings</option>
            <option value="Textiles">Textiles</option>
            <option value="Sculptures">Sculptures</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Contact Phone</FormLabel>
          <Input
            name="contact.phone"
            value={formData.contactInfo.phone}
            onChange={handleChange}
            placeholder="Enter contact phone"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Contact Email</FormLabel>
          <Input
            name="contact.email"
            value={formData.contactInfo.email}
            onChange={handleChange}
            placeholder="Enter contact email"
          />
        </FormControl>

        <FormControl>
          <FormLabel>WhatsApp</FormLabel>
          <Input
            name="contact.whatsapp"
            value={formData.contactInfo.whatsapp}
            onChange={handleChange}
            placeholder="Enter WhatsApp number"
          />
        </FormControl>

        <Button type="submit" colorScheme="heritage" size="lg" width="full">
          {isEdit ? 'Update Product' : 'Add Product'}
        </Button>
      </VStack>
    </form>
  );
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/products/seller');
      setProducts(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching products',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await axios.post('/api/products', productData);
      toast({
        title: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
      onClose();
    } catch (error) {
      toast({
        title: 'Error adding product',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      await axios.put(`/api/products/${selectedProduct._id}`, productData);
      toast({
        title: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating product',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${productId}`);
        toast({
          title: 'Product deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        fetchProducts();
      } catch (error) {
        toast({
          title: 'Error deleting product',
          description: error.response?.data?.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Box>
            <Heading color="heritage.700">Seller Dashboard</Heading>
            <Text color="gray.600">Manage your traditional art products</Text>
          </Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="heritage"
            onClick={() => {
              setSelectedProduct(null);
              onOpen();
            }}
          >
            Add Product
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {products.map((product) => (
            <Box
              key={product._id}
              p={6}
              bg="white"
              borderRadius="lg"
              shadow="md"
            >
              <VStack align="stretch" spacing={4}>
                <Heading size="md">{product.name}</Heading>
                <Text noOfLines={2}>{product.description}</Text>
                <Text fontWeight="bold">₹{product.price}</Text>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => {
                      setSelectedProduct(product);
                      onOpen();
                    }}
                    colorScheme="blue"
                    variant="ghost"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteProduct(product._id)}
                    colorScheme="red"
                    variant="ghost"
                  />
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <ProductForm
                initialData={selectedProduct}
                onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
                isEdit={!!selectedProduct}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default SellerDashboard;
