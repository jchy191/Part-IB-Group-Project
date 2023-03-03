/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
) => <MuiAlert icon={<FlagRoundedIcon />} variant="filled" elevation={6} ref={ref} {...props} />);

export default function ReportNotification({ open, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Comment has been Reported
      </Alert>
    </Snackbar>
  );
}
