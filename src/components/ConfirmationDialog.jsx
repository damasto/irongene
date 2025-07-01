import {Dialog, DialogTitle, DialogContent, Typography} from "@mui/material"

export default function ConfirmationDialog ({open, message}) {
    return (
      <Dialog open={open} >
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {message}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };