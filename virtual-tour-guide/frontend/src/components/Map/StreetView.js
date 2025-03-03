import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const StreetView = ({ location }) => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=streetview`;
    script.async = true;
    script.onload = initStreetView;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (panoramaRef.current && location) {
      panoramaRef.current.setPosition({
        lat: location.latitude,
        lng: location.longitude
      });
    }
  }, [location]);

  const initStreetView = () => {
    if (!window.google || !location) return;

    panoramaRef.current = new window.google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        position: {
          lat: location.latitude,
          lng: location.longitude
        },
        pov: {
          heading: 34,
          pitch: 10
        },
        zoom: 1
      }
    );
  };

  return (
    <Box
      ref={streetViewRef}
      h="400px"
      w="100%"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="base"
    />
  );
};

export default StreetView;
