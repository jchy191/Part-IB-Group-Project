import React, { useState, useCallback } from 'react';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';

function Map() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback((node) => {
    if (node) setMapContainer(node);
  }, []);

  const mapOptions = {
    center: {
      lat: 52.1951,
      lng: 0.1313,
    },
    zoom: 13,
    mapId: process.env.REACT_APP_MAP_ID,
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_MAP_API_KEY}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
    >

      <div ref={mapRef} style={{ height: '100vh' }} />

    </GoogleMapsProvider>
  );
}

export default Map;
