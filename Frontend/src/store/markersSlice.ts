import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import Marker from '../types/marker';

// Define a type for the slice state
interface MarkersState {
  markersList: Marker[]
}

// Define the initial state using that type
const initialState: MarkersState = {
  markersList: [
    {
      placeId: 'ChIJf5XEHL1w2EcRfXafrah-TUg',
      latLng: { lat: 52.20373006412609, lng: 0.1176785438453587 },
      address: '58 Trumpington St, Cambridge CB2 1RH, UK',
      name: 'The Corpus Clock',
    },
  ],
};

export const markerSlice = createSlice({
  name: 'markers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<Marker>) => {
      if (!state.markersList.find((marker) => marker.placeId === action.payload.placeId)) {
        state.markersList.push(action.payload);
      }
    },
  },
});

export const { addMarker } = markerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMarkers = (state: RootState) => state.markers.markersList;

export default markerSlice.reducer;
