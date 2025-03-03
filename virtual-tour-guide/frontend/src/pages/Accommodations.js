import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Select,
  SimpleGrid,
  Badge,
  Image,
  Button,
  useToast,
  HStack,
  Icon,
  Divider,
  Card,
  CardBody,
  Stack,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { FaStar, FaHotel, FaMapMarkerAlt, FaRupeeSign, FaUserFriends } from 'react-icons/fa';

// Haversine formula to calculate distance between two coordinates
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const HERITAGE_SITES = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: { lat: 27.1751, lng: 78.0421 },
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: { lat: 15.3350, lng: 76.4600 },
  },
  {
    id: 'ellora',
    name: 'Ellora Caves',
    location: { lat: 20.0268, lng: 75.1779 },
  },
];

const hotels = [
  {
    "property_name": "The Oberoi Amarvilas",
    "latitude": 27.1825,
    "longitude": 78.0219,
    "min_cost": 28000,
    "rating": 4.9,
    "review_count": 2500,
    "room_type": "Luxury Suite",
    "image_src": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/82/79/c7/the-oberoi-amarvilas-agra.jpg?w=700&h=-1&s=1"
  },
  // Add more hotels from your JSON here
];

const Accommodations = () => {
  const [selectedSite, setSelectedSite] = useState('');
  const [nearbyHotels, setNearbyHotels] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (selectedSite) {
      const site = HERITAGE_SITES.find(site => site.id === selectedSite);
      if (site) {
        // Filter hotels within 10km radius
        const nearby = hotels.filter(hotel => {
          const distance = haversine(
            site.location.lat,
            site.location.lng,
            hotel.latitude,
            hotel.longitude
          );
          return distance <= 10; // 10km radius
        }).map(hotel => ({
          ...hotel,
          distance: haversine(
            site.location.lat,
            site.location.lng,
            hotel.latitude,
            hotel.longitude
          ).toFixed(2)
        }));

        setNearbyHotels(nearby);
      }
    } else {
      setNearbyHotels([]);
    }
  }, [selectedSite]);

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading color="heritage.700" mb={2}>
            Nearby Accommodations
          </Heading>
          <Text color="gray.600">
            Find comfortable stays near your favorite heritage sites
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" shadow="base">
          <VStack spacing={4} align="stretch">
            <HStack>
              <Icon as={FaHotel} color="heritage.500" boxSize={5} />
              <Text fontWeight="medium">Select Heritage Site</Text>
            </HStack>
            <Select
              placeholder="Choose a heritage site"
              value={selectedSite}
              onChange={handleSiteChange}
              size="lg"
            >
              {HERITAGE_SITES.map(site => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </Select>
          </VStack>
        </Box>

        {nearbyHotels.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {nearbyHotels.map((hotel, index) => (
              <Card
                key={index}
                overflow='hidden'
                variant='outline'
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
              >
                <Image
                  src={hotel.image_src}
                  alt={hotel.property_name}
                  height="200px"
                  objectFit="cover"
                />
                <CardBody>
                  <Stack spacing={4}>
                    <Heading size="md">{hotel.property_name}</Heading>
                    
                    <HStack>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text fontWeight="bold">{hotel.rating}</Text>
                      <Text color="gray.500">
                        ({hotel.review_count} reviews)
                      </Text>
                    </HStack>

                    <HStack>
                      <Icon as={FaMapMarkerAlt} color="heritage.500" />
                      <Text>{hotel.distance} km from site</Text>
                    </HStack>

                    <Divider />

                    <Stack>
                      <HStack justify="space-between">
                        <Text color="gray.600">{hotel.room_type}</Text>
                        <Badge colorScheme="heritage" fontSize="md" px={3} py={1}>
                          <HStack spacing={1}>
                            <Icon as={FaRupeeSign} />
                            <Text>{hotel.min_cost}</Text>
                          </HStack>
                        </Badge>
                      </HStack>
                    </Stack>

                    <Button
                      colorScheme="heritage"
                      onClick={() => window.open('https://www.booking.com', '_blank')}
                    >
                      Book Now
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : selectedSite ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.600">
              No accommodations found within 10km of this heritage site.
            </Text>
          </Box>
        ) : null}
      </VStack>
    </Container>
  );
};

export default Accommodations;
