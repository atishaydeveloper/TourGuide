import React, { useEffect, useRef } from 'react';

function MapView({ site }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (site && site.streetViewCoordinates) {
      const google = window.google; // Access google from window
      const panorama = new google.maps.StreetViewPanorama(
        mapRef.current,
        {
          position: site.streetViewCoordinates,
          pov: { heading: 34, pitch: 10 },
        }
      );
    }
  }, [site]);

  return (
    <div
      ref={mapRef}
      style={{ height: '500px', width: '100%' }} // Adjust size as needed
    />
  );
}

export default MapView;