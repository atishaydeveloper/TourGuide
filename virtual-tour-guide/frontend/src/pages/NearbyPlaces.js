import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  Button,
  Select,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHotel, FaUtensils, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';

const PlaceCard = ({ place }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      p={6}
      borderRadius="lg"
      bg={cardBg}
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md" color="heritage.500">
            {place.name}
          </Heading>
          <Icon
            as={place.type === 'hotel' ? FaHotel : FaUtensils}
            color="heritage.500"
            boxSize={6}
          />
        </HStack>

        <HStack spacing={2}>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <Icon
                key={i}
                as={FaStar}
                color={i < place.rating ? 'yellow.400' : 'gray.300'}
              />
            ))}
          <Text ml={2} color="gray.500">
            ({place.reviews} reviews)
          </Text>
        </HStack>

        <VStack align="stretch" spacing={2}>
          <HStack>
            <Icon as={FaMapMarkerAlt} color="gray.500" />
            <Text>{place.address}</Text>
          </HStack>
          <HStack>
            <Icon as={FaPhone} color="gray.500" />
            <Text>{place.phone}</Text>
          </HStack>
        </VStack>

        <HStack spacing={2}>
          {place.amenities.map((amenity, index) => (
            <Badge key={index} colorScheme="heritage" variant="subtle">
              {amenity}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

const NearbyPlaces = () => {
  const [location, setLocation] = useState('');
  const [placeType, setPlaceType] = useState('all');
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: 'Heritage Hotel',
      type: 'hotel',
      rating: 4,
      reviews: 128,
      address: '123 Heritage Street, Agra',
      phone: '+91 123-456-7890',
      amenities: ['WiFi', 'Pool', 'Restaurant'],
    },
    {
      id: 2,
      name: 'Traditional Restaurant',
      type: 'restaurant',
      rating: 5,
      reviews: 256,
      address: '456 Culture Road, Agra',
      phone: '+91 098-765-4321',
      amenities: ['Outdoor Seating', 'Vegetarian', 'Bar'],
    },
    // Add more sample places
  ]);

  const handleSearch = () => {
    // In a real implementation, this would make an API call to the recommendation system
    console.log('Searching for', placeType, 'near', location);
  };

  const filteredPlaces = places.filter(
    (place) => placeType === 'all' || place.type === placeType
  );

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="2xl" mb={4} color="heritage.500">
            Nearby Places
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Discover hotels, restaurants, and attractions near heritage sites
          </Text>
        </Box>

        <HStack spacing={4}>
          <Input
            placeholder="Enter location or heritage site"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Select
            value={placeType}
            onChange={(e) => setPlaceType(e.target.value)}
            width="200px"
          >
            <option value="all">All Places</option>
            <option value="hotel">Hotels</option>
            <option value="restaurant">Restaurants</option>
          </Select>
          <Button colorScheme="heritage" onClick={handleSearch}>
            Search
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default NearbyPlaces;
