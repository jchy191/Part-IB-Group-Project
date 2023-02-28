import { configureStore } from '@reduxjs/toolkit';
import markerReducer from './markersSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    markers: markerReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
