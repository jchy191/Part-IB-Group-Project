import { useState, useEffect } from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import { selectMarkers } from '../../store/markersSlice';
import Marker from '../../types/marker';
import { openModal } from '../../store/modalSlice';

function MapMarkers() {
  const map = useGoogleMap();
  const [, setMarkers] = useState<google.maps.Marker[]>([]);
  const locations: Marker[] = useStoreSelector((state) => selectMarkers(state));
  const dispatch = useStoreDispatch();

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
        // eslint-disable-next-line no-console
        console.log(`Name: ${name}`);
        // eslint-disable-next-line no-console
        console.log(`Address: ${address}`);
        dispatch(openModal());
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
