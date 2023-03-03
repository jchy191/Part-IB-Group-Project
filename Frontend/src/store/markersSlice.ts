import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Category } from '../types/category';

// Define a type for the slice state
interface MarkersState {
  category: Category,
}

// Define the initial state using that type
const initialState: MarkersState = {
  category: Category.Open,
};

export const markerSlice = createSlice({
  name: 'markers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = markerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) => state.markers.category;

export default markerSlice.reducer;
