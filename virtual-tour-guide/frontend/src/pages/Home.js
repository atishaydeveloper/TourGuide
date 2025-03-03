import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const FeatureCard = ({ title, description, image, link }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Image src={image} alt={title} height="200px" width="100%" objectFit="cover" />
      <Box p={6}>
        <Heading size="md" mb={2}>
          {title}
        </Heading>
        <Text mb={4}>{description}</Text>
        <Button as={RouterLink} to={link} colorScheme="heritage" width="full">
          Explore Now
        </Button>
      </Box>
    </Box>
  );
};

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="heritage.500"
        color="white"
        py={20}
        px={4}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            fontFamily="heading"
          >
            Discover India's Rich Heritage
          </Heading>
          <Text fontSize="xl" mb={8}>
            Explore historical sites, earn badges, and plan your perfect cultural journey
          </Text>
          <Button
            as={RouterLink}
            to="/virtual-tour"
            size="lg"
            bg="white"
            color="heritage.500"
            _hover={{ bg: 'gray.100' }}
          >
            Start Exploring
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <FeatureCard
            title="Virtual Tours"
            description="Experience 3D virtual tours of India's most iconic heritage sites with AI-powered guidance."
            image="/images/virtual-tour.jpg"
            link="/virtual-tour"
          />
          <FeatureCard
            title="Nearby Places"
            description="Discover hotels, restaurants, and attractions near heritage sites for a complete travel experience."
            image="/images/nearby-places.jpg"
            link="/nearby-places"
          />
          <FeatureCard
            title="Earn Badges"
            description="Track your exploration journey and earn exclusive badges as you discover more heritage sites."
            image="/images/badges.jpg"
            link="/profile"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
