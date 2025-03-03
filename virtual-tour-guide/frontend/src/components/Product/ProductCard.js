import React, { useState } from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Heading,
  Flex,
  Tooltip,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { FaStar, FaMapMarkerAlt, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    currency,
    image,
    description,
    seller,
    stock,
    origin,
    category,
  } = product;

  const { addToCart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLiked, setIsLiked] = useState(false);
  const toast = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${name} has been added to your cart`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from Wishlist' : 'Added to Wishlist',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleContactSeller = () => {
    toast({
      title: 'Seller Contact Information',
      description: `Phone: ${seller.phone}\nEmail: ${seller.email}\nWhatsApp: ${seller.whatsapp}`,
      status: 'info',
      duration: 10000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={useColorModeValue('white', 'gray.800')}
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
        onClick={onOpen}
        position="relative"
      >
        <IconButton
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          position="absolute"
          top={2}
          right={2}
          colorScheme={isLiked ? "red" : "gray"}
          onClick={handleLike}
          zIndex={2}
        />

        <Image
          src={image || 'https://via.placeholder.com/300x200?text=Heritage+Product'}
          alt={name}
          height="200px"
          width="100%"
          objectFit="cover"
        />

        <VStack p={4} spacing={3} align="stretch">
          <Badge colorScheme="heritage" alignSelf="start">
            {category}
          </Badge>

          <Heading size="md" noOfLines={2}>
            {name}
          </Heading>

          <Text color="gray.600" noOfLines={2}>
            {description}
          </Text>

          <HStack justify="space-between" align="center">
            <Heading size="md" color="heritage.600">
              {currency} {price.toLocaleString()}
            </Heading>
            <Badge colorScheme={stock > 0 ? 'green' : 'red'}>
              {stock > 0 ? `${stock} in stock` : 'Out of stock'}
            </Badge>
          </HStack>

          <Box>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Seller: {seller.name}
            </Text>
            <HStack spacing={2}>
              <Icon as={FaStar} color="yellow.400" />
              <Text fontSize="sm">{seller.rating}/5</Text>
              <Text fontSize="sm" color="gray.500">
                ({seller.totalSales} sales)
              </Text>
            </HStack>
          </Box>

          <Tooltip label={origin} placement="top">
            <HStack color="gray.500" fontSize="sm">
              <Icon as={FaMapMarkerAlt} />
              <Text noOfLines={1}>{origin}</Text>
            </HStack>
          </Tooltip>

          <Flex gap={2}>
            <Button
              leftIcon={<FaShoppingCart />}
              colorScheme="heritage"
              variant="outline"
              flex={1}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button colorScheme="heritage" flex={1}>
              Buy Now
            </Button>
          </Flex>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Image
                src={image || 'https://via.placeholder.com/600x400?text=Heritage+Product'}
                alt={name}
                borderRadius="md"
                objectFit="cover"
              />

              <Text>{description}</Text>

              <Box>
                <Heading size="md" mb={2}>Specifications</Heading>
                <VStack align="stretch" spacing={2}>
                  <HStack>
                    <Text fontWeight="bold">Category:</Text>
                    <Text>{category}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Origin:</Text>
                    <Text>{origin}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="bold">Stock:</Text>
                    <Badge colorScheme={stock > 0 ? 'green' : 'red'}>
                      {stock > 0 ? `${stock} available` : 'Out of stock'}
                    </Badge>
                  </HStack>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={2}>Seller Information</Heading>
                <VStack align="stretch" spacing={2}>
                  <Text fontWeight="bold">{seller.name}</Text>
                  <HStack>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text>{seller.rating}/5 ({seller.totalSales} sales)</Text>
                  </HStack>
                  <Button colorScheme="heritage" onClick={handleContactSeller}>
                    Contact Seller
                  </Button>
                </VStack>
              </Box>

              <Flex gap={4} mt={4}>
                <Button
                  leftIcon={<FaShoppingCart />}
                  colorScheme="heritage"
                  variant="outline"
                  flex={1}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button colorScheme="heritage" flex={1}>
                  Buy Now
                </Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
