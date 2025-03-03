import React from 'react';
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleContact = (method) => {
    switch (method) {
      case 'whatsapp':
        window.open(`https://wa.me/${product.contactInfo.whatsapp}`, '_blank');
        break;
      case 'phone':
        window.location.href = `tel:${product.contactInfo.phone}`;
        break;
      case 'email':
        window.location.href = `mailto:${product.contactInfo.email}`;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        cursor="pointer"
        onClick={onOpen}
      >
        <Image
          src={product.images[0]?.url}
          alt={product.images[0]?.alt}
          height="200px"
          width="100%"
          objectFit="cover"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="heritage">
              {product.category}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {product.location}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {product.name}
          </Box>

          <Box>
            ₹{product.price}
            <Box as="span" color="gray.600" fontSize="sm">
              /-
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing={4}>
              <Image
                src={product.images[0]?.url}
                alt={product.images[0]?.alt}
                borderRadius="lg"
                width="100%"
                height="300px"
                objectFit="cover"
              />
              
              <Text>{product.description}</Text>
              
              <HStack>
                <Icon as={FaMapMarkerAlt} color="heritage.500" />
                <Text>{product.location}</Text>
              </HStack>

              <Box borderTopWidth={1} pt={4}>
                <Text fontWeight="bold" mb={2}>Contact Seller</Text>
                <VStack spacing={2} align="stretch">
                  {product.contactInfo.whatsapp && (
                    <Button
                      leftIcon={<FaWhatsapp />}
                      colorScheme="green"
                      onClick={() => handleContact('whatsapp')}
                    >
                      WhatsApp
                    </Button>
                  )}
                  {product.contactInfo.phone && (
                    <Button
                      leftIcon={<FaPhone />}
                      colorScheme="blue"
                      onClick={() => handleContact('phone')}
                    >
                      Call
                    </Button>
                  )}
                  {product.contactInfo.email && (
                    <Button
                      leftIcon={<FaEnvelope />}
                      colorScheme="heritage"
                      onClick={() => handleContact('email')}
                    >
                      Email
                    </Button>
                  )}
                </VStack>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
