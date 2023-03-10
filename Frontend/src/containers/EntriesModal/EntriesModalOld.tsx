import {
  Modal, Box, Typography, Button, Grid,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import React from 'react';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';
import {
  closeLocationModal, openFormModal, selectIsLocationModalOpen, selectLocation,
} from '../../store/modalSlice';
import Comment from './components/Comment/Comment';
import { useGetCommentsQuery, useGetOverviewQuery } from '../../store/commentsSlice';
import accessCategories from '../../types/AccessCategories';

function EntriesModal() {
  const isOpen = useStoreSelector((state) => selectIsLocationModalOpen(state));
  const { placeId, name, address } = useStoreSelector((state) => selectLocation(state));
  const {
    isSuccess: isCommentsSuccess,
    currentData: comments,
    isFetching: isCommentsFetching,
  } = useGetCommentsQuery(placeId);
  const {
    currentData: overview,
    isSuccess: isOverviewSuccess,
    isFetching: isOverviewFetching,

  } = useGetOverviewQuery(placeId);

  const dispatch = useStoreDispatch();

  const handleClose = () => {
    dispatch(closeLocationModal());
  };

  const handleOpenFormModal = () => {
    dispatch(openFormModal());
  };

  if (isOverviewFetching || isCommentsFetching) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

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
        <Typography variant="h4" component="h4" mb={3}>
          <PlaceIcon fontSize="large" sx={{ mt: 1 }} />
          {`${name} ${address}`}
        </Typography>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          {isOverviewSuccess && overview && Object.entries(accessCategories).map(([, cat]) => (
            <>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex' }}>
                  <CheckBoxRoundedIcon sx={{ color: cat.true_colour }} />
                  {overview[`${cat.name}_type`] ? <Typography fontWeight="bold">{cat.t}</Typography> : <Typography>{cat.t}</Typography>}
                  <Typography fontWeight="bold">{` (${overview[`${cat.name}1`]})`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex' }}>
                  <DisabledByDefaultRoundedIcon sx={{ color: cat.false_colour }} />
                  {(overview[`${cat.name}_type`] !== null && !overview[`${cat.name}_type`]) ? <Typography fontWeight="bold">{cat.f}</Typography> : <Typography>{cat.f}</Typography>}
                  <Typography fontWeight="bold">{` (${overview[`${cat.name}0`]})`}</Typography>
                </Box>
              </Grid>

            </>
          ))}
        </Grid>
        <Button
          onClick={handleOpenFormModal}
          variant="contained"
          color="primary"
          sx={{ m: 2 }}
        >
          Share your view
        </Button>
        {isCommentsSuccess
          && comments
          && comments.filter((entry) => entry.title && entry.comment).map((entry) => (
            <Comment entry={entry} key={entry.id} />
          ))}

      </Box>
    </Modal>
  );
}

export default EntriesModal;
