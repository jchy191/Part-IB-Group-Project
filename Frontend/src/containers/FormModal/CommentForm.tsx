import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import accessCategories from '../../types/AccessCategories';
import AddCategories from './components/AddCategories/AddCategories';
import { useAddNewCommentMutation, useGetAllMarkersQuery, useGetCommentsQuery } from '../../store/commentsSlice';
import { closeFormModal, selectIsFormModalOpen, selectLocation } from '../../store/modalSlice';
import { useStoreDispatch, useStoreSelector } from '../../store/hooks';

export default function CommentForm() {
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
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
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
        <Typography variant="h4" component="h4" align="center">
          {`${name} ${address}`}
        </Typography>
        <Divider sx={{ mb: 2, m: 2 }} />
        <TextField
          variant="standard"
          fullWidth
          label="Tell us about yourself (e.g., Mother of four)"
          value={newTitle}
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
            <AddCategories cat={cat} state={categoryState[cat.name]} handler={handlers[cat.name]} />
          ))}
        </FormGroup>
        <Divider sx={{ mb: 2, m: 2 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ ml: 2 }}
        >
          Submit Comment
        </Button>
      </Box>
    </Modal>
  );
}
