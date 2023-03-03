import { configureStore } from '@reduxjs/toolkit';
import markerReducer from './markersSlice';
import modalReducer from './modalSlice';
import { commentsApi } from './commentsSlice';

export const store = configureStore({
  reducer: {
    markers: markerReducer,
    modal: modalReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    // [markersApi.reducerPath]: markersApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
