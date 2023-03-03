import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface ModalState {
  isOpen: boolean,
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
  isOpen: false,
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
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModal: (state, action) => {
      state.isOpen = true;
      state.location = action.payload;
    },
    setPlaceId: (state, action: PayloadAction<string>) => {
      state.location.placeId = action.payload;
    },
  },
});

export const { closeModal, openModal, setPlaceId } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectLocation = (state: RootState) => state.modal.location;

export default modalSlice.reducer;
