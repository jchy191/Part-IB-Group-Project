import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface ModalState {
  isLocationModalOpen: boolean,
  isFormModalOpen: boolean,
  location: {
    placeId: string,
    name: string,
    address: string,
    lat: number,
    lng: number,
  }
}

// Define the initial state using that type
const initialState: ModalState = {
  isLocationModalOpen: false,
  isFormModalOpen: false,
  location: {
    placeId: '',
    name: '',
    address: '',
    lat: 0,
    lng: 0,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    closeLocationModal: (state) => {
      state.isLocationModalOpen = false;
    },
    openLocationModal: (state) => {
      state.isLocationModalOpen = true;
    },
    closeFormModal: (state) => {
      state.isFormModalOpen = false;
    },
    openFormModal: (state) => {
      state.isFormModalOpen = true;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  closeLocationModal,
  openLocationModal,
  closeFormModal,
  openFormModal,
  setLocation,
} = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLocationModalOpen = (state: RootState) => state.modal.isLocationModalOpen;
export const selectIsFormModalOpen = (state: RootState) => state.modal.isFormModalOpen;
export const selectLocation = (state: RootState) => state.modal.location;

export default modalSlice.reducer;
