import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Button,
  useToast,
  AspectRatio,
  HStack,
  IconButton,
  Badge,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaSearch, FaHeart, FaRegHeart, FaStreetView, FaTimes } from 'react-icons/fa';
import { mockHeritages } from '../mockData/heritages';

const HERITAGE_SITES = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: { lat: 27.1751, lng: 78.0421 },
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/800px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg',
    facts: [
      'Built between 1632 and 1653',
      'UNESCO World Heritage Site',
      'One of the New Seven Wonders of the World',
    ],
    coordinates: { lat: 27.1751, lng: 78.0421 },
    tags: ['Mughal Architecture', 'UNESCO World Heritage Site']
  },
  {
    id: 'hampi',
    name: 'Hampi',
    location: { lat: 15.3350, lng: 76.4600 },
    description: 'The former capital of the Vijayanagara Empire, featuring stunning ruins of temples and palaces. A UNESCO World Heritage Site known for its architectural magnificence.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Hampi_virupaksha.jpg/800px-Hampi_virupaksha.jpg',
    facts: [
      'Founded in the 14th century',
      'Home to over 1,600 surviving remains',
      'Spread over 4,100 hectares'
    ],
    coordinates: { lat: 15.3350, lng: 76.4600 },
    tags: ['Vijayanagara Empire', 'UNESCO World Heritage Site']
  },
  {
    id: 'ellora',
    name: 'Ellora Caves',
    location: { lat: 20.0268, lng: 75.1779 },
    description: 'A complex of 34 monasteries and temples, extending over more than 2 km, showcasing Buddhist, Hindu, and Jain monuments dating from 600-1000 CE.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kailasha_temple_at_ellora.jpg/800px-Kailasha_temple_at_ellora.jpg',
    facts: [
      '34 rock-cut temples and monasteries',
      'UNESCO World Heritage Site',
      'Features the largest single monolithic excavation in the world'
    ],
    coordinates: { lat: 20.0268, lng: 75.1779 },
    tags: ['Buddhist', 'Hindu', 'Jain']
  },
  {
    id: 'kumbhalgarh',
    name: 'Kumbhalgarh Fort',
    location: { lat: 25.1482, lng: 73.5883 },
    description: 'A massive fort in Rajasthan with walls extending over 38 kilometers, making it the second-longest continuous wall after the Great Wall of China.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kumbhalgarh_Fort_Walls.jpg/800px-Kumbhalgarh_Fort_Walls.jpg',
    facts: [
      'Built in the 15th century',
      'Part of Hill Forts of Rajasthan UNESCO site',
      'Contains over 360 temples within its walls'
    ],
    coordinates: { lat: 25.1482, lng: 73.5883 },
    tags: ['Rajasthan', 'UNESCO World Heritage Site']
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho Temples',
    location: { lat: 24.8318, lng: 79.9199 },
    description: 'A group of Hindu and Jain temples famous for their Nagara-style architectural symbolism and erotic sculptures.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Khajuraho_Temples.jpg/800px-Khajuraho_Temples.jpg',
    facts: [
      'Built between 950 and 1050 CE',
      'UNESCO World Heritage Site',
      'Known for intricate architectural details'
    ],
    coordinates: { lat: 24.8318, lng: 79.9199 },
    tags: ['Hindu', 'Jain', 'UNESCO World Heritage Site']
  }
];

const VirtualTour = () => {
  const [selectedSite, setSelectedSite] = useState('');
  const [showStreetView, setShowStreetView] = useState(false);
  const [map, setMap] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const mapRef = useRef(null);
  const streetViewRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (!window.google || !window.google.maps) {
      toast({
        title: "Google Maps not loaded",
        description: "Please check your internet connection",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const initialMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 5,
      mapTypeId: 'roadmap',
      tilt: 45
    });

    setMap(initialMap);
  }, [toast]);

  const handleSiteChange = (event) => {
    const siteId = event.target.value;
    setSelectedSite(siteId);

    if (siteId && map) {
      const site = HERITAGE_SITES.find(site => site.id === siteId);
      if (site) {
        map.setCenter(site.location);
        map.setZoom(18);
        map.setTilt(45);
      }
    }
  };

  const openStreetView = (site) => {
    if (!window.google || !window.google.maps) {
      toast({
        title: "Google Maps not loaded",
        description: "Please check your internet connection",
        status: "error",
        duration: 3000,
      });
      return;
    }

    setShowStreetView(true);

    // Wait for modal to be rendered
    setTimeout(() => {
      const streetViewService = new window.google.maps.StreetViewService();
      streetViewService.getPanorama(
        {
          location: site.location,
          radius: 50,
          source: window.google.maps.StreetViewSource.OUTDOOR
        },
        (data, status) => {
          if (status === 'OK') {
            const panoramaInstance = new window.google.maps.StreetViewPanorama(
              document.getElementById('street-view'),
              {
                position: data.location.latLng,
                pov: {
                  heading: 34,
                  pitch: 10
                },
                fullscreenControl: true,
                zoomControl: true,
                panControl: true,
                addressControl: false,
                showRoadLabels: false,
                motionTracking: false
              }
            );
            setPanorama(panoramaInstance);
          } else {
            setShowStreetView(false);
            toast({
              title: 'Street View not available',
              description: 'This location does not have street view coverage',
              status: 'info',
              duration: 3000,
              isClosable: true,
            });
          }
        }
      );
    }, 100);
  };

  const handleCloseStreetView = () => {
    setShowStreetView(false);
    if (panorama) {
      panorama.setVisible(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading color="heritage.700" mb={2}>Virtual Heritage Tour</Heading>
          <Text color="gray.600">
            Explore India's magnificent heritage sites in immersive 3D
          </Text>
        </Box>

        <Box>
          <Select
            placeholder="Select a heritage site"
            value={selectedSite}
            onChange={handleSiteChange}
            mb={4}
          >
            {HERITAGE_SITES.map(site => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </Select>

          <Box
            ref={mapRef}
            id="map"
            h="500px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="base"
          />
        </Box>

        {selectedSite && (
          <Button
            colorScheme="heritage"
            leftIcon={<FaStreetView />}
            onClick={() => openStreetView(HERITAGE_SITES.find(site => site.id === selectedSite))}
            size="lg"
            w="full"
          >
            Open Street View
          </Button>
        )}

        <Modal 
          isOpen={showStreetView} 
          onClose={handleCloseStreetView}
          size="full"
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader display="flex" alignItems="center" justifyContent="space-between">
              {selectedSite && HERITAGE_SITES.find(site => site.id === selectedSite)?.name}
              <ModalCloseButton size="lg" />
            </ModalHeader>
            <ModalBody p={0} position="relative">
              <Box 
                id="street-view" 
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default VirtualTour;
