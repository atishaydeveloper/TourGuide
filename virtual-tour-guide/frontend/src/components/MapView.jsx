import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';

function MapView() {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Default coordinates (Taj Mahal as example)
    const defaultLocation = { lat: 27.1751, lng: 78.0421 };

    if (window.google) {
      try {
        const panorama = new window.google.maps.StreetViewPanorama(
          mapRef.current,
          {
            position: defaultLocation,
            pov: {
              heading: 34,
              pitch: 10
            },
            zoom: 1
          }
        );
      } catch (err) {
        setError('Error loading Street View');
        console.error('Street View Error:', err);
      }
    } else {
      setError('Google Maps not loaded');
    }
  }, []);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      height="500px"
      position="relative"
      overflow="hidden"
    >
      {error ? (
        <Box p={4} color="red.500">{error}</Box>
      ) : (
        <Box ref={mapRef} position="absolute" top={0} left={0} right={0} bottom={0} />
      )}
    </Box>
  );
}

export default MapView;