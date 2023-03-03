import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PlaceIcon from '@mui/icons-material/Place';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import ReportNotification from '../ReportNotifcation/ReportNotification';

function Comment({ entry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleReport = () => {
    setOpen(true);
  };

  const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        <Button onClick={handleReport} color="error" size="small" sx={{ mb: 2 }}>
          <FlagRoundedIcon />
        </Button>
        <ReportNotification open={open} handleClose={handleCloseNotification} />
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
