import {
  Modal, Box, Typography, Button, Grid,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import React from 'react';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import {
  closeLocationModal, openFormModal, selectIsLocationModalOpen, selectLocation,
} from '../../store/modalSlice';
import Comment from './components/Comment/Comment';
import { useGetCommentsQuery, useGetOverviewQuery } from '../../store/commentsSlice';
import accessCategories from '../../types/AccessCategories';

function CommentsModal() {
  const isOpen = useStoreSelector((state) => selectIsLocationModalOpen(state));
  const { placeId, name, address } = useStoreSelector((state) => selectLocation(state));
  const { isSuccess: isCommentsSuccess, data: comments } = useGetCommentsQuery(placeId);
  const { data: overview } = useGetOverviewQuery(placeId);
  console.log(overview);

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
        <Grid container sx={{ justifyContent: 'space-between' }}>
          {isCommentsSuccess && Object.entries(accessCategories).map(([, cat]) => (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <SquareRoundedIcon sx={{ color: cat.colour }} />
                <Typography>{cat.t}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {isCommentsSuccess
          && comments.filter((entry) => entry.title && entry.comment).map((entry) => (
            <Comment entry={entry} key={entry.id} />
          ))}

      </Box>
    </Modal>
  );
}

export default CommentsModal;
