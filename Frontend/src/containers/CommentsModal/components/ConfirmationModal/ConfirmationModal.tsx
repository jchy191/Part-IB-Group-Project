import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ConfirmationModal({ isOpen, handleClose, handleReport }) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={style}>
        <h2 id="child-modal-title">Are you sure you want to report this comment?</h2>
        <Button onClick={handleReport}>Report Comment</Button>
      </Box>
    </Modal>
  );
}

export default ConfirmationModal;
