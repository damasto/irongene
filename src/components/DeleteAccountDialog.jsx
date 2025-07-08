import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';

export default function DeleteAccountDialog ({open, onClose, onConfirm, message, action, title}) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Return
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Yes, {action}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  