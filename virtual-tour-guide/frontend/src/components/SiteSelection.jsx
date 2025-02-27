import React, { useState } from 'react';
import { Box, VStack, Heading, List, ListItem, Text } from '@chakra-ui/react';

function SiteSelection() {
  const [selectedSite, setSelectedSite] = useState(null);

  // Sample heritage sites data
  const sampleSites = [
    {
      _id: '1',
      name: 'Taj Mahal',
      description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India.',
      coordinates: { lat: 27.1751, lng: 78.0421 }
    },
    {
      _id: '2',
      name: 'Qutub Minar',
      description: 'A minaret and victory tower that forms part of the Qutub complex in Delhi, India.',
      coordinates: { lat: 28.5244, lng: 77.1855 }
    },
    {
      _id: '3',
      name: 'Hawa Mahal',
      description: 'Palace in Jaipur, India, built from red and pink sandstone.',
      coordinates: { lat: 26.9239, lng: 75.8267 }
    }
  ];

  const handleSiteClick = (site) => {
    setSelectedSite(site);
    // You can add logic here to update the map view
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={4}>Heritage Sites</Heading>
      <List spacing={3}>
        {sampleSites.map((site) => (
          <ListItem 
            key={site._id} 
            p={2} 
            _hover={{ bg: 'gray.50', cursor: 'pointer' }}
            bg={selectedSite?._id === site._id ? 'gray.100' : 'transparent'}
            onClick={() => handleSiteClick(site)}
          >
            <Text fontWeight="medium">{site.name}</Text>
            <Text fontSize="sm" color="gray.600">{site.description}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SiteSelection;