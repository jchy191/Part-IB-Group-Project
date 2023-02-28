import { Modal, Box } from '@mui/material';
import React from 'react';
import CommentSection from '../CommentSection/CommentSection';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import { closeModal, selectIsModalOpen } from '../../store/modalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CommentsModal() {
  const isOpen = useStoreSelector((state) => selectIsModalOpen(state));
  const dispatch = useStoreDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <Box sx={style}>
        <CommentSection />
      </Box>
    </Modal>
  );
}

export default CommentsModal;
