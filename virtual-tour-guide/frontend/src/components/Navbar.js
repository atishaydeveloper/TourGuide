import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        position="sticky"
        top={0}
        zIndex="sticky"
        boxShadow="sm"
      >
        <Flex flex={{ base: 1 }} justify="start">
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontSize="xl"
            fontWeight="bold"
            color="heritage.700"
            as={RouterLink}
            to="/"
            _hover={{
              textDecoration: 'none',
              color: 'heritage.600',
            }}
          >
            Heritage Explorer
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={6}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link 
                as={RouterLink} 
                to="/virtual-tour"
                _hover={{
                  textDecoration: 'none',
                  color: 'heritage.600',
                }}
              >
                Virtual Tour
              </Link>
              <Link 
                as={RouterLink} 
                to="/virtual-mart"
                _hover={{
                  textDecoration: 'none',
                  color: 'heritage.600',
                }}
              >
                Virtual Mart
              </Link>
              <Link 
                as={RouterLink} 
                to="/local-guides"
                _hover={{
                  textDecoration: 'none',
                  color: 'heritage.600',
                }}
              >
                Tour Guides
              </Link>
              <Link 
                as={RouterLink} 
                to="/accommodations"
                _hover={{
                  textDecoration: 'none',
                  color: 'heritage.600',
                }}
              >
                Accommodations
              </Link>
            </HStack>
          </HStack>
        </Stack>

        <Flex alignItems={'center'}>
          {!user ? (
            <HStack spacing={4}>
              <Button 
                as={RouterLink} 
                to="/auth" 
                variant="ghost"
                _hover={{
                  bg: 'heritage.50',
                }}
              >
                Login / Sign Up
              </Button>
              <Button 
                as={RouterLink} 
                to="/vendor/login" 
                variant="solid" 
                colorScheme="heritage"
              >
                Vendor Login
              </Button>
            </HStack>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                _hover={{
                  bg: 'heritage.50',
                }}
              >
                {user.username}
              </MenuButton>
              <MenuList>
                {user.role === 'vendor' && (
                  <>
                    <MenuItem as={RouterLink} to="/vendor/dashboard">
                      Vendor Dashboard
                    </MenuItem>
                    <MenuItem as={RouterLink} to="/add-product">
                      Add Product
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
                <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
