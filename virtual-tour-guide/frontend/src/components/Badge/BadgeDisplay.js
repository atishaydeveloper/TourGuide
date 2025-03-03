import React from 'react';
import {
  Box,
  VStack,
  Text,
  SimpleGrid,
  useColorModeValue,
  Switch,
  FormControl,
  FormLabel,
  useToast,
  ScaleFade,
} from '@chakra-ui/react';
import axios from 'axios';

const BadgeCard = ({ badge, isNew }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <ScaleFade in={true} initialScale={0.9}>
      <Box
        p={4}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        position="relative"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      >
        {isNew && (
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="heritage.500"
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            fontSize="xs"
          >
            New!
          </Box>
        )}
        
        <VStack spacing={2} align="center">
          <Text fontSize="3xl">{badge.icon}</Text>
          <Text fontWeight="bold" textAlign="center">
            {badge.name}
          </Text>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {badge.description}
          </Text>
          <Text fontSize="xs" color="gray.400">
            Earned {new Date(badge.earnedAt).toLocaleDateString()}
          </Text>
        </VStack>
      </Box>
    </ScaleFade>
  );
};

const BadgeDisplay = ({ badges, enabled, onToggle }) => {
  const toast = useToast();

  const handleToggle = async () => {
    try {
      await axios.patch('/api/user/badges', { enabled: !enabled });
      onToggle(!enabled);
      
      toast({
        title: enabled ? 'Badges disabled' : 'Badges enabled',
        description: enabled 
          ? 'Badge system has been turned off'
          : 'Start earning badges as you explore!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update badge preferences',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <FormControl display="flex" alignItems="center" mb={6}>
        <FormLabel htmlFor="badge-toggle" mb="0">
          Enable Badge System
        </FormLabel>
        <Switch
          id="badge-toggle"
          colorScheme="heritage"
          isChecked={enabled}
          onChange={handleToggle}
        />
      </FormControl>

      {enabled && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {badges.map((badge) => (
            <BadgeCard
              key={badge.name}
              badge={badge}
              isNew={
                new Date().getTime() - new Date(badge.earnedAt).getTime() <
                24 * 60 * 60 * 1000
              }
            />
          ))}
        </SimpleGrid>
      )}

      {enabled && badges.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text color="gray.500">
            Start exploring heritage sites to earn your first badge!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default BadgeDisplay;
