import {
  Modal, Box, Typography, Button,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import {
  closeLocationModal, openFormModal, selectIsLocationModalOpen, selectLocation,
} from '../../store/modalSlice';
import Comment from './components/Comment/Comment';
import { useGetCommentsQuery } from '../../store/commentsSlice';

function CommentsModal() {
  const isOpen = useStoreSelector((state) => selectIsLocationModalOpen(state));
  const { placeId, name, address } = useStoreSelector((state) => selectLocation(state));
  const { isSuccess, data: comments } = useGetCommentsQuery(placeId);
  const dispatch = useStoreDispatch();

  const handleClose = () => {
    dispatch(closeLocationModal());
  };

  const handleOpenFormModal = () => {
    dispatch(openFormModal());
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
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h4" component="h4">
          <PlaceIcon fontSize="large" sx={{ mt: 1 }} />
          {`${name} ${address}`}
        </Typography>
        <Button
          onClick={handleOpenFormModal}
          variant="contained"
          color="primary"
          sx={{ m: 2 }}
        >
          Share your view
        </Button>
        {isSuccess ? comments.filter((entry) => entry.title && entry.comment).map((entry) => (
          <Comment entry={entry} />
        ),
        // eslint-disable-next-line react/jsx-no-useless-fragment, function-paren-newline
        ) : <></> }

      </Box>
    </Modal>
  );
}

export default CommentsModal;
