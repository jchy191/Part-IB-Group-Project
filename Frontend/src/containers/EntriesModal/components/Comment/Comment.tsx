import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportNotification from '../ReportNotifcation/ReportNotification';
import { useReportCommentMutation } from '../../../../store/commentsSlice';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import CategoryDisplay from '../CategoryDisplay/CategoryDisplay';

function Comment({ entry }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

  const [trigger] = useReportCommentMutation();
  const date = moment(entry.created);

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
    <>
      <Box textAlign="start" key={entry.id} sx={{ mb: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="h6" sx={{ fontWeight: 'bold', mt: -1 }}>
            <AccountCircleIcon fontSize="inherit" />
            {` ${entry.title.substring(0, 45)}`}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {entry.pinned && (
            <PushPinRoundedIcon
              fontSize="small"
              sx={{ color: '#7b7b7b' }}
            />
            ) }
            <Typography variant="body2">
              {`${date.format('DD MMM YYYY')}`}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" component="p" mb={2}>
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
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={8}>
            <CategoryDisplay
              entry={entry}
            />
          </Grid>
          <Grid item xs={2} sm={1}>
            <Button
              variant="text"
              onClick={handleClickOpen}
              color="error"
              size="small"
              sx={{ mt: -1, mb: -1 }}
            >
              <FlagRoundedIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ReportNotification open={isNotifOpen} handleClose={handleCloseNotification} />
      <ConfirmationModal
        handleClose={handleClose}
        handleReport={handleReport}
        isOpen={isConfirmationOpen}
      />
    </>
  );
}

export default Comment;
