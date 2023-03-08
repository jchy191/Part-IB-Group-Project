import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
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
    dispatch(closeLocationModal());
    dispatch(openFormModal());
  };

  if (isOverviewFetching || isCommentsFetching) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        {' '}
        <Typography variant="h5" component="h5" mb={3}>
          <PlaceIcon fontSize="medium" sx={{ mt: 1 }} />
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
      </DialogTitle>
      <DialogContent dividers>
        {isCommentsSuccess
                      && comments
                      && comments.filter((entry) => entry.title && entry.comment).map((entry) => (
                        <Comment entry={entry} key={entry.id} />
                      ))}
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Close</Button>
        <Button onClick={handleOpenFormModal}>Share your view</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntriesModal;
