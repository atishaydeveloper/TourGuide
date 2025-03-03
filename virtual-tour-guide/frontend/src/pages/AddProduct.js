import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  useToast,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  HStack,
  Image,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaRupeeSign, FaImage, FaTimes } from 'react-icons/fa';

const CATEGORIES = ['Handicrafts', 'Paintings', 'Textiles', 'Sculptures', 'Carpets'];

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    materials: '',
    dimensions: '',
    origin: '',
    stock: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Product Added Successfully',
        description: 'Your product has been listed on the marketplace',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        materials: '',
        dimensions: '',
        origin: '',
        stock: '',
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add product. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Add New Product</Heading>
          <Text color="gray.600">List your heritage product on the marketplace</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Select category"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>Price (INR)</FormLabel>
              <InputGroup>
                <InputLeftElement children={<FaRupeeSign />} />
                <NumberInput min={0} width="100%">
                  <NumberInputField
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product"
                rows={4}
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>Materials Used</FormLabel>
                <Input
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  placeholder="e.g., Cotton, Wood, etc."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dimensions</FormLabel>
                <Input
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 30cm x 20cm"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl>
                <FormLabel>Origin</FormLabel>
                <Input
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="e.g., Jaipur, Rajasthan"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Stock Quantity</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                  />
                </NumberInput>
              </FormControl>
            </SimpleGrid>

            <FormControl>
              <FormLabel>Product Image</FormLabel>
              <HStack spacing={4}>
                <Button
                  as="label"
                  leftIcon={<FaImage />}
                  cursor="pointer"
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {imagePreview && (
                  <Box position="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <IconButton
                      icon={<FaTimes />}
                      size="sm"
                      position="absolute"
                      top={-2}
                      right={-2}
                      colorScheme="red"
                      onClick={removeImage}
                    />
                  </Box>
                )}
              </HStack>
            </FormControl>

            <Button
              type="submit"
              colorScheme="heritage"
              size="lg"
              isLoading={loading}
              loadingText="Adding Product"
            >
              Add Product
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default AddProduct;
