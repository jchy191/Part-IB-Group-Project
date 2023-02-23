import { useState, useEffect } from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useStoreSelector } from '../../store/hooks';
import { selectMarkers } from '../../store/markersSlice';
import Marker from '../../types/marker';

function MapMarkers() {
  const map = useGoogleMap();
  const [, setMarkers] = useState<google.maps.Marker[]>([]);
  const locations: Marker[] = useStoreSelector((state) => selectMarkers(state));

  // Add markers to the map
  useEffect(() => {
    if (!map) {
      return () => {};
    }

    const markers = locations.map((location) => {
      const { latLng, address, name } = location;
      const markerOptions:google.maps.MarkerOptions = {
        map,
        position: latLng,
        clickable: true,
        title: name,
      };

      const marker = new window.google.maps.Marker(markerOptions);

      marker.addListener('click', () => {
        console.log(`Name: ${name}`);
        console.log(`Address: ${address}`);
      });

      return marker;
    });

    setMarkers(markers);

    // Clean up markers
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, locations]);

  return null;
}

export default MapMarkers;
