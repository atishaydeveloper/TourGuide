import React, { useState } from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import MapView from '../components/MapView';
import SiteSelection from '../components/SiteSelection';

function Home() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelect = (site) => {
    setSelectedSite(site);
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Box mb={8}>
        <Heading as="h1" mb={4}>Virtual Tour Guide</Heading>
        <Text fontSize="lg">Explore heritage sites with our interactive guide</Text>
      </Box>
      
      <Box display="flex" gap={6} flexDirection={{ base: 'column', md: 'row' }}>
        <Box flex={1}>
          <SiteSelection onSiteSelect={handleSiteSelect} />
        </Box>
        <Box flex={2}>
          <MapView site={selectedSite} />
        </Box>
      </Box>
    </Container>
  );
}

export default Home;