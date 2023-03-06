import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import {
  Modal,
} from '@mui/material';
import ReportNotification from '../ReportNotifcation/ReportNotification';
import { useReportCommentMutation } from '../../../../store/commentsSlice';

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

function Comment({ entry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

  const [trigger] = useReportCommentMutation();

  const handleClickOpen = () => {
    setIsConfirmationOpen(true);
  };

  const handleClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleReport = async () => {
    setIsConfirmationOpen(false);
    setIsNotifOpen(true);
    const count = entry.reported + 1;
    await trigger({ id: entry.id, count });
  };

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsNotifOpen(false);
  };

  return (
    <Box textAlign="start" key={entry.id} sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h6">
          <PlaceIcon fontSize="small" />
          {' '}
          {entry.title}
        </Typography>
        <Button onClick={handleClickOpen} color="error" size="small" sx={{ mb: 2 }}>
          <FlagRoundedIcon />
        </Button>
        <ReportNotification open={isNotifOpen} handleClose={handleCloseNotification} />
        <Modal
          open={isConfirmationOpen}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={style}>
            <h2 id="child-modal-title">Are you sure you want to report this comment?</h2>
            <Button onClick={handleReport}>Report Comment</Button>
          </Box>
        </Modal>
      </Box>

      <Typography variant="body2" component="p">
        {isExpanded || entry.comment.length < 100
          ? entry.comment
          : `${entry.comment.substring(0, 100)}...`}
        {entry.comment.length > 100 && (
        <Button
          variant="text"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
        )}
      </Typography>
    </Box>
  );
}

export default Comment;
