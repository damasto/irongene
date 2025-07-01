import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';

export default function DeleteAccountDialog ({open, onClose, onConfirm}) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  