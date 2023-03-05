import { useState, useEffect } from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useStoreDispatch, useStoreSelector } from '../../../../store/hooks';
import { openLocationModal } from '../../../../store/modalSlice';
import accessCategories from '../../../../types/AccessCategories';
import { useGetAllMarkersQuery } from '../../../../store/commentsSlice';
import { selectCategory } from '../../../../store/markersSlice';

function MapMarkers() {
  const map = useGoogleMap();
  const [, setMarkers] = useState<google.maps.Marker[]>([]);
  const { data: locations, isFetching } = useGetAllMarkersQuery(0);

  const category = useStoreSelector((state) => selectCategory(state));
  const dispatch = useStoreDispatch();
  // Add markers to the map
  useEffect(() => {
    if (!map || isFetching) {
      return () => {};
    }

    const markers = locations.map((location) => {
      const {
        lat, lng, address, name, pid,
      } = location;
      // const color = location[`${accessCategories[category].name}_type`] ? 'green' : 'red';
      const markerOptions:google.maps.MarkerOptions = {
        map,
        position: { lat, lng },
        clickable: true,
        title: name,
        icon: location[`${accessCategories[category].name}_type`] ? `${process.env.PUBLIC_URL}/green.png` : `${process.env.PUBLIC_URL}/red.png`,
      };

      const marker = new window.google.maps.Marker(markerOptions);

      marker.addListener('click', () => {
        dispatch(openLocationModal({
          placeId: pid, name, address, lat, lng,
        }));
      });

      return marker;
    });

    setMarkers(markers);
    console.log('render');

    // Clean up markers
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, locations, category]);

  return null;
}

export default MapMarkers;
