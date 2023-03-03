import {
  Modal, Box, Typography,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import { closeModal, selectIsModalOpen, selectLocation } from '../../store/modalSlice';
import CommentForm from './components/CommentForm/CommentForm';
import Comment from './components/Comment/Comment';
import { useGetCommentsQuery } from '../../store/commentsSlice';

function CommentsModal() {
  const isOpen = useStoreSelector((state) => selectIsModalOpen(state));
  const { placeId, name, address } = useStoreSelector((state) => selectLocation(state));
  const { isSuccess, data: comments } = useGetCommentsQuery(placeId);
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
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h4" component="h4">
          <PlaceIcon fontSize="large" sx={{ mt: 1 }} />
          {name}
          {address}
        </Typography>
        <CommentForm />
        {isSuccess ? comments.map((entry) => (
          <Comment entry={entry} />
        ),
        // eslint-disable-next-line react/jsx-no-useless-fragment, function-paren-newline
        ) : <></> }

      </Box>
    </Modal>
  );
}

export default CommentsModal;
