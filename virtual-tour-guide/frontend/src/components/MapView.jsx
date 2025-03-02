import React, { useEffect, useRef, useState } from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

function MapView({ site }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initMap = () => {
      const location = site?.coordinates || { lat: 27.1751, lng: 78.0421 };

      if (!window.google) {
        setError('Google Maps not loaded yet');
        return;
      }

      try {
        setIsLoading(false);
        const panorama = new window.google.maps.StreetViewPanorama(
          mapRef.current,
          {
            position: location,
            pov: site?.streetViewParams?.pov || {
              heading: 34,
              pitch: 10
            },
            zoom: site?.streetViewParams?.zoom || 1,
            visible: true
          }
        );

        // Create a Street View service to check for nearby panoramas
        const streetViewService = new window.google.maps.StreetViewService();

        // Check if Street View is available at this location
        streetViewService.getPanorama({ location: location, radius: 50 }, (data, status) => {
          if (status === 'OK') {
            panorama.setPosition(data.location.latLng);
          } else {
            // If Street View is not available, show a regular map
            const map = new window.google.maps.Map(mapRef.current, {
              center: location,
              zoom: 18,
              mapTypeId: 'satellite'
            });

            // Add a marker
            new window.google.maps.Marker({
              position: location,
              map: map,
              title: site?.name || 'Heritage Site'
            });
          }
        });

      } catch (err) {
        setError('Error loading map view');
        console.error('Map View Error:', err);
      }
    };

    // Check if Google Maps API is loaded
    if (window.google) {
      initMap();
    } else {
      // Wait for Google Maps to load
      const checkGoogleMaps = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);

      // Clear interval after 10 seconds if Google Maps doesn't load
      setTimeout(() => {
        clearInterval(checkGoogleMaps);
        if (!window.google) {
          setError('Failed to load Google Maps');
          setIsLoading(false);
        }
      }, 10000);
    }

    return () => {
      // Cleanup
      setIsLoading(true);
      setError(null);
    };
  }, [site]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      height="500px"
      position="relative"
      overflow="hidden"
    >
      {isLoading ? (
        <VStack justify="center" height="100%">
          <Spinner size="xl" />
          <Text>Loading map...</Text>
        </VStack>
      ) : error ? (
        <VStack justify="center" height="100%" color="red.500">
          <Text>{error}</Text>
        </VStack>
      ) : (
        <Box ref={mapRef} position="absolute" top={0} left={0} right={0} bottom={0} />
      )}
    </Box>
  );
}

export default MapView;