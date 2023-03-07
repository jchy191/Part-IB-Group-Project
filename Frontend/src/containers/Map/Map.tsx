import React, { useState, useCallback } from 'react';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import MapMarkers from './components/MapMarkers/MapMarkers';
import { useStoreDispatch } from '../../store/hooks';
import { openLocationModal } from '../../store/modalSlice';

function Map() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback((node) => {
    if (node) setMapContainer(node);
  }, []);
  const dispatch = useStoreDispatch();

  const mapOptions = {
    center: {
      lat: 52.1951,
      lng: 0.1313,
    },
    zoom: 13,
    mapId: process.env.REACT_APP_MAP_ID,
    disableDefaultUI: true,
    clickableIcons: true,
    restriction: {
      latLngBounds: {
        north: 52.26,
        south: 52.14,
        east: 0.226,
        west: 0.004,
      },
      strictBounds: true,
    },
  };

  const onLoad = (map) => {
    map.addListener('click', async (e) => {
      e.stop();
      if (e.placeId) {
        const placesService = new google.maps.places.PlacesService(map);
        placesService.getDetails({ placeId: e.placeId }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const { formatted_address: formattedAddress, name, geometry } = place;
            const location = {
              placeId: e.placeId,
              name,
              address: formattedAddress,
              lat: geometry.location.lat(),
              lng: geometry.location.lng(),
            };
            dispatch(openLocationModal(location));
          }
        });
        e.stop(); // Hide default infowindow
      }
    });
  };

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_MAP_API_KEY}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
      onLoadMap={onLoad}
      libraries={['places']}
    >

      <div ref={mapRef} style={{ height: '100vh' }} />
      <MapMarkers />
    </GoogleMapsProvider>
  );
}

export default Map;
