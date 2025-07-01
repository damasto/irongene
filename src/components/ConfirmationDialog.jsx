import {Dialog, DialogTitle, DialogContent} from "@mui/material"

export default function ConfirmationDialog ({open, message}) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };