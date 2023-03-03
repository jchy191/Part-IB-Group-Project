import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import Marker from '../types/marker';
import { Category } from '../types/category';

// Define a type for the slice state
interface MarkersState {
  markersList: Marker[],
  category: Category,
}

// Define the initial state using that type
const initialState: MarkersState = {
  markersList: [
    {
      placeId: 'ChIJf5XEHL1w2EcRfXafrah-TUg',
      latLng: { lat: 52.20373006412609, lng: 0.1176785438453587 },
      address: '58 Trumpington St, Cambridge CB2 1RH, UK',
      name: 'The Corpus Clock',
      [Category.A]: true,
      [Category.B]: true,
      [Category.C]: true,
      [Category.D]: true,
      [Category.E]: true,
    },
    {
      placeId: 'ChIJmxZmlr1w2EcRoYdWLTCzDvU',
      latLng: { lat: 52.2053745, lng: 0.1190324 },
      address: 'Market Hill, Cambridge CB1 0SS, UK',
      name: 'Cambridge Market Square',
      [Category.A]: false,
      [Category.B]: false,
      [Category.C]: false,
      [Category.D]: false,
      [Category.E]: false,
    },
  ],
  category: Category.B,
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
    changeCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
  },
});

// Define a service using a base URL and expected endpoints
// export const markersApi = createApi({
//   reducerPath: 'markers',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
//   tagTypes: ['Comments'],
//   endpoints: (builder) => ({
//     getMarkers: builder.query<Comment[], string>({
//       query: () => 'all',
//       providesTags: ['Comments'],
//     }),
//   }),
// });

// export const { useGetMarkersQuery } = markersApi;

export const { addMarker, changeCategory } = markerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMarkers = (state: RootState) => state.markers.markersList;
export const selectCategory = (state: RootState) => state.markers.category;

export default markerSlice.reducer;
