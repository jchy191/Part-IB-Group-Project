/*
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

// eslint-disable-next-line react/jsx-props-no-spreading
 <Alert
 onClose={handleClose}
 severity="error"
  sx={{ width: '100%' }}
   icon={<FlagRoundedIcon />}
    variant="filled" elevation={6}/>;

export default function ReportComment() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick} color="error" size="small" sx={{ mb: 2 }}>
        <FlagRoundedIcon />
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert>
          Comment Reported
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
*/
