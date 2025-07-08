import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
  } from '@mui/material';
  
  export default function AdminDialog ({open, onClose, onConfirm, message, onNew, onEdit, title}) {


      return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>What do you want to do</DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button OnConfirm={onNew} variant="outlined">
              Create new
            </Button>
            <Button OnConfirm ={onEdit} variant="contained">
              Edit existing 
            </Button>
          </DialogActions>
        </Dialog>
      );
    };