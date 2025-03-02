import React, { useState } from 'react';
import { Box, VStack, Heading, List, ListItem, Text } from '@chakra-ui/react';

function SiteSelection({ onSiteSelect }) {
  const [selectedSite, setSelectedSite] = useState(null);

  // Sample heritage sites data with updated coordinates
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
      coordinates: { lat: 26.9239, lng: 75.8267 },
      streetViewParams: {
        position: { lat: 26.9239, lng: 75.8267 },
        pov: { heading: 100, pitch: 10 },
        zoom: 1
      }
    },
    {
      _id: '4',
      name: 'Ellora Caves',
      description: 'A UNESCO World Heritage Site featuring rock-cut temples from the 6th-8th century CE in Maharashtra, India.',
      coordinates: { lat: 20.0268, lng: 75.1779 },
      streetViewParams: {
        position: { lat: 20.0268, lng: 75.1779 },
        pov: { heading: 45, pitch: 10 },
        zoom: 1
      }
    }
  ];

  const handleSiteClick = (site) => {
    setSelectedSite(site);
    onSiteSelect(site);
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
            borderRadius="md"
            transition="all 0.2s"
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