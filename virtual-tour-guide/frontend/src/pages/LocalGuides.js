import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Select,
  Input,
  HStack,
  VStack,
  Heading,
  Text,
  Spinner,
  useToast,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaSearch, FaLanguage, FaFilter } from 'react-icons/fa';
import GuideCard from '../components/Guide/GuideCard';
import { mockGuides } from '../mockData/guides';

const LANGUAGES = ['All', 'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'French', 'Arabic', 'Urdu'];

const LocalGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    heritageSite: '',
    language: 'All',
    availability: 'all',
  });
  const toast = useToast();

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      filterGuides();
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterGuides();
  }, [filters]);

  const filterGuides = () => {
    let filteredGuides = [...mockGuides];

    if (filters.heritageSite) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.heritageSites.some(site => 
          site.toLowerCase().includes(filters.heritageSite.toLowerCase())
        )
      );
    }

    if (filters.language !== 'All') {
      filteredGuides = filteredGuides.filter(guide =>
        guide.languages.includes(filters.language)
      );
    }

    if (filters.availability !== 'all') {
      filteredGuides = filteredGuides.filter(guide =>
        filters.availability === 'available' ? guide.availability : !guide.availability
      );
    }

    setGuides(filteredGuides);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      heritageSite: '',
      language: 'All',
      availability: 'all',
    });
    toast({
      title: 'Filters Reset',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading color="heritage.700" mb={2}>Local Heritage Guides</Heading>
          <Text color="gray.600">
            Connect with experienced local guides for an authentic heritage experience
          </Text>
        </Box>

        <Box bg="white" p={4} borderRadius="lg" shadow="sm">
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search by heritage site..."
                value={filters.heritageSite}
                onChange={(e) => handleFilterChange('heritageSite', e.target.value)}
              />
            </InputGroup>

            <HStack spacing={4} wrap="wrap" width="100%">
              <Box flex={1} minW="200px">
                <HStack spacing={2} mb={2}>
                  <Icon as={FaLanguage} color="heritage.500" />
                  <Text fontSize="sm" fontWeight="medium">Language</Text>
                </HStack>
                <Select
                  value={filters.language}
                  onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                  {LANGUAGES.map(language => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box flex={1} minW="200px">
                <HStack spacing={2} mb={2}>
                  <Icon as={FaFilter} color="heritage.500" />
                  <Text fontSize="sm" fontWeight="medium">Availability</Text>
                </HStack>
                <Select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                >
                  <option value="all">All Guides</option>
                  <option value="available">Available Now</option>
                  <option value="unavailable">Currently Busy</option>
                </Select>
              </Box>

              <Button
                colorScheme="heritage"
                variant="outline"
                onClick={resetFilters}
                minW="120px"
              >
                Reset Filters
              </Button>
            </HStack>
          </VStack>
        </Box>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" color="heritage.500" />
          </Box>
        ) : guides.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.600">
              No guides found matching your criteria. Try adjusting your filters.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {guides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default LocalGuides;
