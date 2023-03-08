import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PlaceIcon from '@mui/icons-material/Place';
import { DialogContentText } from '@mui/material';
import accessCategories from '../../types/AccessCategories';
import AddCategories from './components/AddCategories/AddCategories';
import {
  useAddNewCommentMutation, useGetAllMarkersQuery, useGetCommentsQuery, useGetOverviewQuery,
} from '../../store/commentsSlice';
import {
  closeFormModal, openLocationModal, selectIsFormModalOpen, selectLocation,
} from '../../store/modalSlice';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';

export default function FormModal() {
  const [newComment, setNewComment] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newOpen, setNewOpen] = useState(null);
  const [newFriendly, setNewFriendly] = useState(null);
  const [newQuiet, setNewQuiet] = useState(null);
  const [newGroups, setNewGroups] = useState(null);
  const [newSpend, setNewSpend] = useState(null);
  const handlers = {
    open: setNewOpen,
    friendly: setNewFriendly,
    quiet: setNewQuiet,
    groups: setNewGroups,
    spend: setNewSpend,
  };
  const categoryState = {
    open: newOpen,
    friendly: newFriendly,
    quiet: newQuiet,
    groups: newGroups,
    spend: newSpend,
  };

  const [addNewComment] = useAddNewCommentMutation();
  const {
    placeId, name, address, lat, lng,
  } = useStoreSelector((state) => selectLocation(state));
  const { refetch } = useGetCommentsQuery(placeId);
  const { refetch: refetchMarkers } = useGetAllMarkersQuery(0);
  const { refetch: refetchOverview } = useGetOverviewQuery(placeId);

  const dispatch = useStoreDispatch();
  const isOpen = useStoreSelector((state) => selectIsFormModalOpen(state));

  useEffect(() => {
    setNewComment('');
    setNewTitle('Anonymous');
    setNewOpen(null);
    setNewFriendly(null);
    setNewQuiet(null);
    setNewGroups(null);
    setNewSpend(null);
  }, [placeId]);

  const handleClose = () => {
    dispatch(closeFormModal());
    dispatch(openLocationModal());
  };

  const handleAddComment = async () => {
    const entry = {
      comment: newComment,
      title: newTitle,
      pid: placeId,
      name,
      address,
      lat,
      lng,
      open: newOpen,
      friendly: newFriendly,
      quiet: newQuiet,
      groups: newGroups,
      spend: newSpend,
    };
    await addNewComment(entry);
    setNewComment('');
    setNewTitle('Anonymous');
    setNewOpen(null);
    setNewFriendly(null);
    setNewQuiet(null);
    setNewGroups(null);
    setNewSpend(null);
    refetch();
    refetchMarkers();
    refetchOverview();
    handleClose();
  };

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
        <Typography display={{ xs: 'none', sm: 'block' }} variant="h5" component="h5" mb={2}>
          <PlaceIcon fontSize="medium" sx={{ mt: 1, position: 'relative', right: '5px' }} />
          {`${name} ${address}`}
        </Typography>
        <Typography display={{ xs: 'block', sm: 'none' }} variant="h6" component="h5" mb={1}>
          <PlaceIcon fontSize="small" sx={{ mt: 1, position: 'relative', right: '5px' }} />
          {`${name} ${address}`}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          variant="standard"
          fullWidth
          label="Tell us about yourself (e.g., Mother of four)"
          value={newTitle}
          inputProps={{ maxLength: 45 }}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Divider sx={{ mb: 2, m: 2 }} />
        <TextField
          multiline
          variant="standard"
          fullWidth
          label="Share your views on this place"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Divider sx={{ mb: 2, m: 2 }} />
        <Typography variant="h6" component="h6">
          Categories
        </Typography>
        <FormGroup sx={{ ml: 2 }}>
          {Object.entries(accessCategories).map(([, cat]) => (
            <AddCategories
              cat={cat}
              state={categoryState[cat.name]}
              handler={handlers[cat.name]}
            />
          ))}
        </FormGroup>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Close</Button>
        <Button onClick={handleAddComment}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
