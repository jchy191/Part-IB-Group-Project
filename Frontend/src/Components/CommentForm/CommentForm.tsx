import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import accessCategories from '../AccessCategories/AccessCategories';
import AddCategories from '../AddCategories/AddCategories';

export default function CommentForm() {
  const [comments, setComments] = useState([
    {
      id: 1,
      heading: 'Place A',
      categories: [
        accessCategories.pub.t,
        accessCategories.free.f,
        accessCategories.friend.f,
      ],
      content:
        'This is the first comment. It is short and does not require a read more button.',
      expanded: false,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddComment = () => {
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        heading: 'testheading',
        categories: [
          accessCategories.pub.t,
          accessCategories.free.t,
          accessCategories.quiet.t,
        ],
        content: newComment,
        expanded: false,
      },
    ]);
    setNewComment('');
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
      >
        Share your view
      </Button>
      <Modal
        open={open}
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
            Add Comment
          </Typography>
          <Divider sx={{ mb: 2, m: 2 }} />
          <TextField
            variant="standard"
            fullWidth
            label="Comment Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Divider sx={{ mb: 2, m: 2 }} />
          <TextField
            multiline
            variant="filled"
            fullWidth
            label="Comment on Access"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Divider sx={{ mb: 2, m: 2 }} />
          <Typography variant="h6" component="h6">
            Categories
          </Typography>
          <FormGroup sx={{ ml: 2 }}>
            {Object.entries(accessCategories).map(([, cat]) => (
              <AddCategories cat={cat} />
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
    </div>
  );
}
