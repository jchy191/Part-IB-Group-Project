import React, {useState, useCallback} from 'react';
import {GoogleMapsProvider} from '@ubilabs/google-maps-react-hooks';

function Map() {
  const [mapContainer, setMapContainer] = useState(null);
  const mapRef = useCallback(node => {
    node && setMapContainer(node);
  }, []);

  const mapOptions = {
    center: {
      lat: 52.1951,
      lng: 0.1313
    },
    zoom: 13,
    mapId: process.env.REACT_APP_MAP_ID
  };

  const onLoad = useCallback((map) => addZoneLayer(map), []);

  return (
    <GoogleMapsProvider
      googleMapsAPIKey={process.env.REACT_APP_MAP_API_KEY}
      mapContainer={mapContainer}
      mapOptions={mapOptions}
      version="beta"
      onLoadMap={onLoad}
      >
      
        <div ref={mapRef} style={{height: '100vh'}} />
      
    </GoogleMapsProvider>
  );
}

function addZoneLayer(map) {

  if (!map.getMapCapabilities().isDataDrivenStylingAvailable) return;


  const featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_4");
  featureLayer.style = (options) => {
    // const feature = options.feature;

    return;
    // return {
    //   strokeColor: "#810FCB",
    //   strokeOpacity: 1.0,
    //   strokeWeight: 3.0,
    //   fillColor: "#810FCB",
    //   fillOpacity: 0.5,
    // };
  }
}

export default Map;