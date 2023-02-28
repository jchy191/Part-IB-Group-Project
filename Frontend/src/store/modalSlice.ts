import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface ModalState {
  isOpen: boolean,
}

// Define the initial state using that type
const initialState: ModalState = {
  isOpen: true,
};

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModal: (state) => {
      state.isOpen = true;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
