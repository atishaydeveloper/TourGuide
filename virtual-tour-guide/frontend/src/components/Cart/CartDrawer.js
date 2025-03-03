import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Box,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Shopping Cart ({cart.length} items)</DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {cart.length === 0 ? (
              <Text color="gray.500" textAlign="center" py={8}>
                Your cart is empty
              </Text>
            ) : (
              cart.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  position="relative"
                >
                  <HStack spacing={4}>
                    <Image
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <VStack align="start" flex={1}>
                      <Text fontWeight="bold" noOfLines={2}>
                        {item.name}
                      </Text>
                      <Text color="heritage.600" fontWeight="semibold">
                        {item.currency} {item.price.toLocaleString()}
                      </Text>
                      <HStack>
                        <IconButton
                          icon={<FaMinus />}
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        />
                        <Text>{item.quantity}</Text>
                        <IconButton
                          icon={<FaPlus />}
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        />
                        <IconButton
                          icon={<FaTrash />}
                          size="sm"
                          colorScheme="red"
                          onClick={() => removeFromCart(item.id)}
                        />
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              ))
            )}
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <VStack width="full" spacing={4}>
            <HStack justify="space-between" width="full">
              <Text fontWeight="bold">Total:</Text>
              <Text fontWeight="bold" color="heritage.600">
                INR {getCartTotal().toLocaleString()}
              </Text>
            </HStack>
            <Button
              colorScheme="heritage"
              width="full"
              onClick={handleCheckout}
              isDisabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
