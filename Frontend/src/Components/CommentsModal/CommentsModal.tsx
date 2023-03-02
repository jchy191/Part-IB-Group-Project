import { Modal, Box } from '@mui/material';
import React from 'react';
import CommentSection from '../CommentSection/CommentSection';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import { closeModal, selectIsModalOpen } from '../../store/modalSlice';

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
      <Box
        textAlign="center"
        overflow="scroll"
        sx={{
          bgcolor: 'white',
          boxShadow: 3,
          p: 2,
          margin: 'auto',
          height: 0.8,
          width: 0.8,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CommentSection />
      </Box>
    </Modal>
  );
}

export default CommentsModal;
