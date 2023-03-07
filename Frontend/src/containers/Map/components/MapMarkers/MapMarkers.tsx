import { useState, useEffect } from 'react';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useStoreDispatch, useStoreSelector } from '../../../../store/hooks';
import { openLocationModal, setLocation } from '../../../../store/modalSlice';
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
      const categoryValue = location[`${accessCategories[category].name}_type`];
      let icon = `${process.env.PUBLIC_URL}/grey.png`;
      if (categoryValue) {
        icon = `${process.env.PUBLIC_URL}/${accessCategories[category].name}_true.png`;
      }
      if (categoryValue !== null && !categoryValue) {
        icon = `${process.env.PUBLIC_URL}/${accessCategories[category].name}_false.png`;
      }

      // const color = location[`${accessCategories[category].name}_type`] ? 'green' : 'red';
      const markerOptions:google.maps.MarkerOptions = {
        map,
        position: { lat, lng },
        clickable: true,
        title: name,
        icon,
      };

      const marker = new window.google.maps.Marker(markerOptions);

      marker.addListener('click', () => {
        dispatch(setLocation({
          placeId: pid, name, address, lat, lng,
        }));
        dispatch(openLocationModal());
      });

      return marker;
    });

    setMarkers(markers);

    // Clean up markers
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [map, locations, category]);

  return null;
}

export default MapMarkers;
